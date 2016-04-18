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
				twOptions: '=',
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
						</i><span ng-if='$ctrl.selected' class='selected'>{{$ctrl.selected.label}}</span> \
						<span class='form-control-placeholder' ng-if='!$ctrl.selected'>{{$ctrl.placeholder}}</span> \
						<span class='caret'></span> \
					</button> \
					<ul class='dropdown-menu' role='menu'> \
						<li ng-repeat='option in $ctrl.twOptions' \
							ng-class='{active: $ctrl.ngModel === option.value || !$ctrl.ngModel && option.value === \"\"}'> \
							<a href='' value='{{option.value}}'> \
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
		preSelectModelValue(ngModel, scope.$ctrl, scope.$ctrl.twOptions);
		setDefaultIfRequired(ngModel, scope.$ctrl, element, attrs);

		// Update pristine/touched status of ngModel
		element.find('.btn').on('keypress click', function(event) {
			// TODO blur would be slightly more aligned with HTML input
			ngModel.$setTouched();
		});

		element.find('.btn').on('keypress', function(event) {
			higlightFirstItemMatcingLetter(
				ngModel, scope.$ctrl, element, scope.$ctrl.twOptions, event.key
			);
			element.find(".active a").focus();
		});

		scope.$watch('$ctrl.ngModel', function(newValue, oldValue) {
			if (newValue !== oldValue) {
				ngModel.$setDirty();
			}

			modelChange(newValue, oldValue, scope.$ctrl);
		});

		element.find('.btn').on('click', function() {
			// Once dropdown is open, focus on active/selected option for keyboard support
			setTimeout(function() {
				element.find('.active a').focus();
			});
		});

		element.find('ul').on('click', 'a', function() {
			var option = findOptionFromValue(scope.$ctrl.twOptions, this.getAttribute('value'));
			selectOption(ngModel, scope.$ctrl, option);
			element.find('.btn').focus();
		});
		element.find('ul').on('focus', 'a', function() {
			var option = findOptionFromValue(scope.$ctrl.twOptions, this.getAttribute('value'));
			selectOption(ngModel, scope.$ctrl, option);
		});
		element.find('ul').on('keypress', 'a', function(event) {
			higlightFirstItemMatcingLetter(
				ngModel, scope.$ctrl, element, scope.$ctrl.twOptions, event.key
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

		var option = findOptionFromValue($ctrl.twOptions, newVal);
		if (option) {
			$ctrl.selected = option;
		} else {
			$ctrl.selected = null;
		}
	}

	function findOptionFromValue(options, value) {
		return options.find(function(option) {
			return String(option.value) === String(value);
		});
	}

	function setDefaultIfRequired(ngModel, $ctrl, $element, $attrs) {
		// If required and model empty, select first option
		if (($ctrl.ngRequired || $attrs.required)
			&& !$ctrl.ngModel
			&& $ctrl.twOptions[0]) {

			selectOption(ngModel, $ctrl, $ctrl.twOptions[0]);
		}
	}

	function selectOption(ngModel, $ctrl, option) {
		ngModel.$setViewValue(option.value);
		$ctrl.selected = option;
	}

	function higlightFirstItemMatcingLetter(ngModel, $ctrl, element, options, letter) {
		var letterLower = letter ? letter.toLowerCase() : "";

		options.find(function(option, index) {
			if (option.label.substring(0,1).toLowerCase() === letterLower) {
				selectOption(ngModel, $ctrl, option);
				return true;
			}
		});
	}

})(window.angular);
