(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twSelect', TwSelectDirective);

	function TwSelectDirective() {
		return {
			require: 'ngModel',
			bindToController: true,
			controller: function() {},
			controllerAs: '$ctrl',
			link: TwSelectLink,
			replace: false,
			restrict: 'EA',
			scope: {
				ngModel: '=',
				ngRequired: '=',
				ngDisabled: '=',
				ngChange: '&',
				ngBlur: '&',
				options: '=',
				name: "@",
				disabled: '@',
				required: '@',
				placeholder: '@'
			},
			template: " \
				<div class='btn-group btn-block'> \
					<button type='button' class='btn btn-input dropdown-toggle' \
						data-toggle='dropdown' aria-expanded='false' \
						ng-disabled='$ctrl.ngDisabled' \
						tw-focusable> \
						<i class='icon {{$ctrl.selected.icon}}' ng-if='$ctrl.selected && $ctrl.selected.icon'> \
						</i><span class='selected' ng-if='$ctrl.ngModel'>{{$ctrl.selected.label}}</span> \
						<span class='form-control-placeholder' ng-if='!$ctrl.ngModel'>{{$ctrl.placeholder}}</span> \
						<span class='caret'></span> \
					</button> \
					<ul class='dropdown-menu' role='menu'> \
						<li ng-class='{active: !$ctrl.ngModel}' \
							ng-if='$ctrl.placeholder && !$ctrl.ngRequired'> \
							<a href='' value='' tw-focusable> \
								{{$ctrl.placeholder}} \
							</a> \
						</li> \
						<li \
							ng-repeat='option in $ctrl.options' \
							ng-class='{active: $ctrl.ngModel === option.value}'> \
							<a href='' value='{{option.value}}' class='tw-select-option' tw-focusable> \
								<i class='icon {{option.icon}}' ng-if='option.icon'></i>{{option.label}} \
							</a> \
						</li> \
					</ul> \
					<input type='hidden' name='{{$ctrl.name}}' value='{{$ctrl.ngModel}}' \
					 	ng-disabled='$ctrl.ngDisabled' /> \
				</div>"
		};
	}

	function TwSelectLink(scope, element, attrs, ngModel) {
		var $ctrl = scope.$ctrl,
			options = scope.$ctrl.options;

		preSelectModelValue(ngModel, $ctrl, options);
		setDefaultIfRequired(ngModel, $ctrl, element, attrs);

		// Update pristine/touched status of ngModel
		element.find('.btn').on('keypress click', function(event) {
			// TODO better to do on blur like HTML select
			ngModel.$setTouched();
		});

		element.find('.btn').on('keypress', function(event) {
			higlightFirstItemMatcingLetter(
				ngModel, $ctrl, element, options, event.key
			);
			element.find(".active a").focus();
		});

		scope.$watch('$ctrl.ngModel', function(newValue, oldValue) {
			if (newValue !== oldValue) {
				ngModel.$setDirty();
			}

			modelChange(newValue, oldValue, $ctrl);
		});

		element.find('.btn').on('click', function() {
			// This hack makes test pass., but should be handled by dropdown.js,
			//$(this).closest('.btn-group').addClass('open');

			// Once dropdown is open, focus on active/selected option for keyboard support
			setTimeout(function() {
				element.find('.active a').focus();
			});
		});

		element.find('.btn').on('blur', function() {
			// If user clicked button loses focus but btn-group is open
			// If they keyed or clicked away it is closed and component blurred
			scope.$evalAsync(function() {
				if (!element.find('.btn-group').hasClass('open')) {
					blur(ngModel, element, $ctrl);
				}
			}, 100); // Timeout required as werely on dropdown.js
		});

		element.find('ul').on('click', 'a', function(event) {
			if ($(event.target).hasClass('tw-select-option')) {
				var option = findOptionFromValue(options, this.getAttribute('value'));
				selectOption(ngModel, $ctrl, option);
			} else {
				resetOption(ngModel, $ctrl);
			}
			element.find('.btn').focus();
		});

		element.find('ul').on('focus', 'a', function(event) {
			if ($(event.target).hasClass('tw-select-option')) {
				var option = findOptionFromValue(options, this.getAttribute('value'));
				selectOption(ngModel, $ctrl, option);
			} else {
				resetOption(ngModel, $ctrl);
			}
		});

		element.find('ul').on('blur', 'a', function(event) {
			scope.$evalAsync(function() {
				// If drop down closed and btton not focussed we just blurred
				if (element.find('.btn:focus').length === 0 &&
					!element.find('.btn-group').hasClass("open")) {
					blur(ngModel, element, $ctrl);
				}
			}, 100); // Timeout required as werely on dropdown.js
		});

		element.find('ul').on('keypress', 'a', function(event) {
			higlightFirstItemMatcingLetter(
				ngModel, $ctrl, element, options, event.key
			);
			element.find(".active a").focus();
		});
	}

	function preSelectModelValue(ngModel, $ctrl, options) {
		if ($ctrl.ngModel) {
			var option = findOptionFromValue(options, $ctrl.ngModel);
			selectOption(ngModel, $ctrl, option);
		}
	}

	function modelChange(newVal, oldVal, $ctrl) {
		if (newVal === oldVal) {
			return;
		}

		var option = findOptionFromValue($ctrl.options, newVal);
		if (option) {
			$ctrl.selected = option;
		} else {
			$ctrl.selected = null;
		}
	}

	function findOptionFromValue(options, value) {
		var optionMatch = false;
		options.forEach(function(option) {
			if (String(option.value) === String(value)) {
				optionMatch = option;
			}
		});
		return optionMatch;
	}

	function setDefaultIfRequired(ngModel, $ctrl, $element, $attrs) {
		// If required and model empty, select first option
		if (($ctrl.ngRequired || $attrs.required)
			&& !$ctrl.ngModel
			&& options[0]) {
			selectOption(ngModel, $ctrl, options[0]);
		}
	}

	function selectOption(ngModel, $ctrl, option) {
		ngModel.$setViewValue(option.value);
		$ctrl.selected = option;
	}

	function resetOption(ngModel, $ctrl) {
		ngModel.$setViewValue('');
		$ctrl.selected = false;
	}

	function higlightFirstItemMatcingLetter(ngModel, $ctrl, element, options, letter) {
		var letterLower = letter ? letter.toLowerCase() : "";
		var found = false;
		options.forEach(function(option) {
			if (found) {
				return;
			}
			if (option.label.substring(0,1).toLowerCase() === letterLower) {
				found = true;
				selectOption(ngModel, $ctrl, option);
			}
		});
	}

	function blur(ngModel, $element, $ctrl) {
		$ctrl.ngBlur();
		// TODO would like to trigger touched here, but doesn't work because of
		// timeout, need timeout because using dropdown.js,
		//ngModel.$setTouched();
	}

})(window.angular);
