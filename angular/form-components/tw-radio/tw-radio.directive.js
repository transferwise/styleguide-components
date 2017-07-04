
(function(angular) {
	//'use strict';

	angular
		.module('tw.form-components')
		.directive('twRadio', TwRadioDirective);

	function TwRadioDirective() {

		function TwRadioController($scope, $element) {
			var $ctrl = this,
				$ngModel = $element.controller('ngModel'),
				radioSelector = '.radio',
				labelSelector = 'label';

			$ctrl.isChecked = function() {
				return ($ctrl.ngValue && $ctrl.ngModel === $ctrl.ngValue) ||
					$ctrl.value === $ctrl.ngModel;
			};
			$ctrl.checked = $ctrl.isChecked();
			$ctrl.buttonClick = function($event) {
				if ($ctrl.ngDisabled) {
					return;
				}

				$ctrl.checked = true;
				$ngModel.$setViewValue($ctrl.ngValue || $ctrl.value);
			};
			$ctrl.buttonFocus = function() {
				$element.closest(labelSelector).addClass('focus');
				$element.triggerHandler('focus');
			};
			$ctrl.buttonBlur = function() {
				$element.closest(labelSelector).removeClass('focus');
				$element.triggerHandler('blur');
			};
			$ctrl.hiddenInputChange = function() {
				// This only fires on label click
				// Normal change handler doesn't, so trigger manually
				if ($ctrl.ngChange) {
					$ctrl.ngChange();
				}
			};

			$element.on('blur', function(event) {
				$ngModel.$setTouched();
			});

			$scope.$watch('$ctrl.ngModel', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					$ngModel.$setDirty();
				}
				$ctrl.checked = $ctrl.isChecked();
			});

			$scope.$watch('$ctrl.ngDisabled', function(newValue, oldValue) {
				if (newValue && !oldValue) {
					$element.closest(radioSelector).addClass('disabled');
				} else if (!newValue && oldValue) {
					$element.closest(radioSelector).removeClass('disabled');
				}
			});
		}

		return {
			restrict: 'E',
			require: 'ngModel',
			controller: ['$scope', '$element', TwRadioController],
			controllerAs: '$ctrl',
			bindToController: true,
			scope: {
				name: "@",
				value: "@",
				ngModel: '=',
				ngValue: '=',
				ngRequired: '=',
				ngDisabled: '=',
				ngChange: '&'
			},
			template: " \
				<input type='radio' class='sr-only' \
					name='{{$ctrl.name}}' \
					ng-value='$ctrl.ngValue || $ctrl.value' \
					ng-model='$ctrl.ngModel' \
					ng-disabled='$ctrl.ngDisabled' \
					ng-change='$ctrl.hiddenInputChange()' \
					tabindex='-1' /> \
				<button type='button' class='tw-radio-button' tw-focusable \
					ng-click='$ctrl.buttonClick($event)' \
					ng-focus='$ctrl.buttonFocus()' \
					ng-blur='$ctrl.buttonBlur()' \
					ng-disabled='$ctrl.ngDisabled' \
					ng-class='{checked: $ctrl.checked}' \
					aria-pressed='{{$ctrl.checked}}'> \
					<span class='tw-radio-check'></span> \
				</button>"
		};
	}
})(window.angular);
