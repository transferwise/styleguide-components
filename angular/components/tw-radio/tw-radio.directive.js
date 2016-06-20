
(function(angular) {
	//'use strict';

	angular
		.module('tw.form-styling')
		.directive('twRadio', TwRadioDirective);

	function TwRadioDirective() {

		function TwRadioController($scope, $element) {
			var $ctrl = this,
				$ngModel = $element.controller('ngModel');
				labelSelector = '.radio label';

			$ctrl.buttonClick = function($event) {
				if ($ctrl.ngDisabled) {
					return;
				}
				$ngModel.$setViewValue($ctrl.value);
			};
			$ctrl.buttonFocus = function() {
				$element.closest(labelSelector).addClass('focus');
				$element.trigger('focus');
			};
			$ctrl.buttonBlur = function() {
				$element.closest(labelSelector).removeClass('focus');
				$element.trigger('blur');
			};

			$element.on('blur', function(event) {
				$ngModel.$setTouched();
			});

			$scope.$watch('$ctrl.ngModel', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					$ngModel.$setDirty();
				}

				if ($ctrl.ngModel === $ctrl.value) {
					//$element.addClass('checked');
					$element.attr('checked', true);
				} else {
					//$element.removeClass('checked');
					$element.removeAttr('checked');
				}
			});

			$scope.$watch('$ctrl.ngDisabled', function(newValue, oldValue) {
				if (newValue && !oldValue) {
					$element.closest(labelSelector).addClass('disabled');
				} else if (!newValue && oldValue) {
					$element.closest(labelSelector).removeClass('disabled');
				}
			});
		}

		return {
			restrict: 'E',
			replace: true,
			require: 'ngModel',
			controller: ['$scope', '$element', TwRadioController],
			controllerAs: '$ctrl',
			bindToController: true,
			scope: {
				name: "@",
				value: "@",
				ngModel: '=',
				ngRequired: '=',
				ngDisabled: '='
			},
			template: " \
			<span class='tw-radio' \
				ng-class='{checked: $ctrl.ngModel == $ctrl.value}'> \
				<input type='radio' class='sr-only' \
					name='{{$ctrl.name}}' \
					value='{{$ctrl.value}}' \
					ng-model='$ctrl.ngModel' \ /> \
				<button type='button' class='tw-radio-button' tw-focusable \
					ng-click='$ctrl.buttonClick($event)' \
					ng-focus='$ctrl.buttonFocus()' \
					ng-blur='$ctrl.buttonBlur()' \
					ng-disabled='$ctrl.ngDisabled' \
					ng-class='{checked: $ctrl.ngModel == $ctrl.value}' \
					aria-pressed='{{$ctrl.ngModel == $ctrl.value}}'> \
					<span class='tw-radio-check'></span> \
				</button> \
			</span>"
		};
	}
})(window.angular);
