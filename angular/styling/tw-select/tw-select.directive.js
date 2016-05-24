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
			transclude: true,
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
						</i><i class='currency-flag currency-flag-{{$ctrl.selected.currency | lowercase}}' ng-if='$ctrl.selected && $ctrl.selected.currency'> \
						</i><span class='selected-label' ng-if='$ctrl.ngModel != null'>{{$ctrl.selected.label}}</span> \
						<span class='form-control-placeholder' ng-if='$ctrl.ngModel == null'>{{$ctrl.placeholder}}</span> \
						<span class='caret'></span> \
					</button> \
					<ul class='dropdown-menu' role='menu'> \
						<li ng-class='{active: !$ctrl.ngModel}' \
							ng-if='$ctrl.placeholder && !$ctrl.ngRequired'> \
							<a href='' value='' class='tw-select-placeholder' tw-focusable> \
								{{$ctrl.placeholder}} \
							</a> \
						</li> \
						<li ng-if='$ctrl.placeholder && !$ctrl.ngRequired' class='divider'></li> \
						<li \
							ng-repeat='option in $ctrl.options' \
							ng-class='{active: $ctrl.ngModel === option.value}'> \
							<a href='' value='{{option.value}}' class='tw-select-option' tw-focusable> \
								<i class='icon {{option.icon}}' ng-if='option.icon'> \
								</i><i class='currency-flag currency-flag-{{option.currency | lowercase}}' ng-if='option.currency'> \
								</i>{{option.label}} \
							</a> \
						</li> \
						<li ng-if='$ctrl.hasTranscluded' class='divider'></li> \
						<li ng-transclude ng-if='$ctrl.hasTranscluded' class='transcluded'></li> \
					</ul> \
					<input type='hidden' name='{{$ctrl.name}}' value='{{$ctrl.ngModel}}' \
					 	ng-disabled='$ctrl.ngDisabled' /> \
				</div>"
		};
	}

	function TwSelectLink(scope, element, attrs, ngModel, $transclude) {
		var $ctrl = scope.$ctrl,
			options = scope.$ctrl.options;

		preSelectModelValue(ngModel, $ctrl, options);
		setDefaultIfRequired(ngModel, $ctrl, element, attrs);

		$transclude(function(clone) {
			if (clone.length) {
				$ctrl.hasTranscluded = true;
			}
		});

		element.find('.btn, .dropdown-menu').on('focusout', function() {
			setTimeout(function() {
				// If button isn't focused and dropdown not open, blur
				if (element.find('.btn:focus').length === 0 &&
					!element.find('.btn-group').hasClass("open")) {
					element.trigger('blur');
				}
			}, 150); 	// need timeout because using dropdown.js,
		});

		element.on('blur', function(event) {
			ngModel.$setTouched();
		});

		element.find('.btn').on('keypress', function(event) {
			continueSearchAndSelectMatch(
				ngModel, $ctrl, options, event.key
			);
			element.find(".active a").focus();
		});

		scope.$watch('$ctrl.ngModel', function(newValue, oldValue) {
			if ((newValue || oldValue) && newValue !== oldValue) {
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

		element.find('ul').on('click', 'a', function(event) {
			element.find('.btn').focus();
		});

		element.find('ul').on('focus', 'a', function(event) {
			optionFocus(event, options, ngModel, $ctrl, this);
		});

		element.find('ul').on('keypress', 'a', function(event) {
			continueSearchAndSelectMatch(
				ngModel, $ctrl, options, event.key
			);
			element.find(".active a").focus();
		});
	}

	function optionFocus(event, options, ngModel, $ctrl, optionElement) {
		if ($(event.target).hasClass('tw-select-option')) {
			var option = findOptionFromValue(options, optionElement.getAttribute('value'));
			selectOption(ngModel, $ctrl, option);
		} else if ($(event.target).hasClass('tw-select-placeholder')) {
			resetOption(ngModel, $ctrl);
		}
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
			&& $ctrl.options[0]) {
			selectOption(ngModel, $ctrl, $ctrl.options[0]);
		}
	}

	function selectOption(ngModel, $ctrl, option) {
		ngModel.$setViewValue(option.value);
		$ctrl.selected = option;
	}

	function resetOption(ngModel, $ctrl) {
		ngModel.$setViewValue(null);
		$ctrl.selected = false;
	}

	function continueSearchAndSelectMatch(ngModel, $ctrl, options, letter) {
		var found = searchAndSelect(ngModel, $ctrl, options, $ctrl.search + letter);
		if (found) {
			$ctrl.search += letter;
		} else {
			$ctrl.search = letter;
			found = searchAndSelect(ngModel, $ctrl, options, $ctrl.search);
		}
		return found;
	}
	function searchAndSelect(ngModel, $ctrl, options, term) {
		var found = false;
		var searchTerm = term.toLowerCase();
		options.forEach(function(option) {
			if (found) {
				return;
			}
			if (option.label.toLowerCase().indexOf(searchTerm) === 0) {
				selectOption(ngModel, $ctrl, option);
				found = true;
			}
		});
		return found;
	}
})(window.angular);
