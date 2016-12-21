
(function(angular) {
	//'use strict';

	angular
		.module('tw.form-components')
		.directive('twCheckbox', TwCheckboxDirective);

	function TwCheckboxDirective() {

		function TwCheckboxController($scope, $element) {
			var $ctrl = this,
				$ngModel = $element.controller('ngModel'),
				buttonElement = $element.find('.tw-checkbox-button');
				labelSelector = '.checkbox';

			$ctrl.isChecked = function() {
				return ($ctrl.ngTrueValue && $ctrl.ngTrueValue === $ctrl.ngModel) ||
					!$ctrl.ngTrueValue && $ctrl.ngModel || false;
			};

			$ctrl.checked = $ctrl.isChecked();

			$ctrl.buttonClick = function($event) {
				if ($ctrl.checked) {
					$ctrl.checked = false;
					//$ctrl.ngModel = $ctrl.ngFalseValue || false;
					$ngModel.$setViewValue($ctrl.ngFalseValue || false);
				} else {
					$ctrl.checked = true;
					//$ctrl.ngModel = $ctrl.ngTrueValue || true;
					$ngModel.$setViewValue($ctrl.ngTrueValue || true);
				}
				$ngModel.$setTouched();

				if ($event) {
					// Prevent button click propgation from firing label
					$event.stopPropagation();
				}
				validateCheckbox($ctrl.checked, $element, $ngModel, $ctrl);
			};
			$ctrl.buttonFocus = function() {
				$element.closest('.checkbox').find('label').addClass('focus');
				$element.triggerHandler('focus');
			};
			$ctrl.buttonBlur = function() {
				$element.closest('.checkbox').find('label').removeClass('focus');
				$element.triggerHandler('blur');
				$ngModel.$setTouched();

				validateCheckbox($ctrl.checked, $element, $ngModel, $ctrl);
			};

			// IE 'clicks' the hidden input when label is clicked
			$ctrl.hiddenClick = function($event) {
				$event.stopPropagation();
			};

			$element.closest('label').on('click', function(event) {
				// Trigger our button, prevent default label behaviour
				$element.find('button').trigger('click');
				event.preventDefault();
				event.stopPropagation();
			});

			$scope.$watch('$ctrl.ngModel', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					$ngModel.$setDirty();
					validateCheckbox($ctrl.checked, $element, $ngModel, $ctrl);
					$ctrl.checked = $ctrl.isChecked();
				}
			});

			$scope.$watch('$ctrl.ngDisabled', function(newValue, oldValue) {
				if (newValue && !oldValue) {
					$element.closest('.checkbox').addClass('disabled').addClass('disabled', true);
				} else if (!newValue && oldValue) {
					$element.closest('.checkbox').removeClass('disabled').removeClass('disabled');
				}
			});
			$scope.$watch('$ctrl.ngRequired', function(newValue, oldValue) {
				if (newValue !== oldValue && newValue) {
					validateCheckbox($ctrl.checked, $element, $ngModel, $ctrl);
				}
			});
		}

		function validateCheckbox(isChecked, $element, $ngModel, $ctrl) {
			if (!$ngModel.$touched) {
				return;
			}

			if (!isChecked && $ctrl.ngRequired) {
				$ngModel.$setValidity('required', false);
				$element.find('.tw-checkbox-button').addClass('has-error');
				$element.closest('.checkbox').addClass('has-error');
				$element.closest('.form-group').addClass('has-error');
			} else {
				$ngModel.$setValidity('required', true);
				$element.find('.tw-checkbox-button').removeClass('has-error');
				$element.closest('.checkbox').removeClass('has-error');
				$element.closest('.form-group').removeClass('has-error');
			}
		}

		return {
			restrict: 'EA',
			require: 'ngModel',
			controller: ['$scope', '$element', TwCheckboxController],
			controllerAs: '$ctrl',
			bindToController: true,
			scope: {
				name: "@",
				ngModel: '=',
				ngTrueValue: '=',
				ngFalseValue: '=',
				ngRequired: '=',
				ngDisabled: '='
			},
			template: " \
				<input type='hidden' class='sr-only' \
					name='{{$ctrl.name}}' \
					ng-model='$ctrl.ngModel' \
					ng-click='$ctrl.hiddenClick($event)' \
					ng-disabled='$ctrl.ngDisabled'/> \
				<button type='button' class='tw-checkbox-button' tw-focusable \
					ng-click='$ctrl.buttonClick($event)' \
					ng-focus='$ctrl.buttonFocus()' \
					ng-blur='$ctrl.buttonBlur()' \
					ng-disabled='$ctrl.ngDisabled' \
					ng-class='{\"checked\": $ctrl.checked}' \
					aria-pressed='{{$ctrl.checked}}'> \
					<span class='tw-checkbox-check glyphicon glyphicon-ok'></span> \
				</button>"
		};
	}
})(window.angular);
