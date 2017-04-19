(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twDynamicFormControl', TwDynamicFormControl);

	function TwDynamicFormControl() {
		return {
			restrict: 'E',
			require: 'ngModel',
			transclude: true,
			controllerAs: "$ctrl",
			bindToController: true,
			controller: "TwDynamicFormControlController",
			link: TwDynamicFormControlLink,
			scope: {
				type: "@",
				name: "@",
				id: "@",
				placeholder: "@",
				step: "@",
				locale: "@",
				options: "=",
				ngModel: "=",
				ngRequired: "=",
				ngDisabled: "=",
				ngMinlength: "=",
				ngMaxlength: "=",
				ngMin: "=",
				ngMax: "=",
				ngPattern: "=",
				uploadOptions: "="
			},
			template:
			"<div ng-switch='$ctrl.type'> \
				<input ng-switch-when='text'  \
					name='{{$ctrl.name}}'  \
					type='text' \
					class='form-control' \
					placeholder='{{$ctrl.placeholder}}' \
					ng-model='$ctrl.ngModel' \
					ng-model-options='{ allowInvalid: true }' \
					ng-required='$ctrl.ngRequired' \
					ng-disabled='$ctrl.ngDisabled' \
					ng-pattern='$ctrl.ngPattern' \
					ng-change='$ctrl.change()' \
					ng-focus='$ctrl.focus()' \
					ng-blur='$ctrl.blur()' \
					ng-minlength='$ctrl.ngMinlength' \
					ng-maxlength='$ctrl.ngMaxlength' />  \
				<input ng-switch-when='password'  \
					name='{{$ctrl.name}}'  \
					type='password' \
					class='form-control' \
					placeholder='{{$ctrl.placeholder}}' \
					ng-model='$ctrl.ngModel' \
					ng-model-options='{ allowInvalid: true }' \
					ng-required='$ctrl.ngRequired' \
					ng-disabled='$ctrl.ngDisabled' \
					ng-change='$ctrl.change()' \
					ng-focus='$ctrl.focus()' \
					ng-blur='$ctrl.blur()' \
					ng-minlength='$ctrl.ngMinlength' \
					ng-maxlength='$ctrl.ngMaxlength' />  \
				<input ng-switch-when='number'  \
					name='{{$ctrl.name}}'  \
					type='number' \
					step='{{$ctrl.step}}' \
					class='form-control' \
					placeholder='{{$ctrl.placeholder}}' \
					ng-model='$ctrl.ngModel' \
					ng-model-options='{ allowInvalid: true }' \
					ng-required='$ctrl.ngRequired' \
					ng-disabled='$ctrl.ngDisabled' \
					ng-change='$ctrl.change()' \
					ng-focus='$ctrl.focus()' \
					ng-blur='$ctrl.blur()' \
					ng-min='$ctrl.ngMin' \
					ng-max='$ctrl.ngMax' />  \
				<div ng-switch-when='radio' \
					class='radio' \
					ng-class='{disabled: $ctrl.ngDisabled}' \
					ng-repeat='option in $ctrl.options'> \
					<label> \
						<tw-radio \
							name='{{$ctrl.name}}' \
							ng-value='option.value' \
							ng-model='$ctrl.ngModel' \
							ng-required='$ctrl.ngRequired' \
							ng-disabled='$ctrl.ngDisabled' \
							ng-change='$ctrl.change()' \
							ng-click='$ctrl.change()' \
							ng-focus='$ctrl.focus()' \
							ng-blur='$ctrl.blur()' /> \
						{{option.label}} \
					</label> \
				</div> \
				<div ng-switch-when='checkbox' \
					class='checkbox' \
					ng-class='{disabled: $ctrl.ngDisabled}'> \
					<label> \
						<tw-checkbox \
							name='{{$ctrl.name}}' \
							ng-model='$ctrl.ngModel' \
							ng-required='$ctrl.ngRequired' \
							ng-disabled='$ctrl.ngDisabled' \
							ng-change='$ctrl.change()' \
							ng-click='$ctrl.change()' \
							ng-focus='$ctrl.focus()' \
							ng-blur='$ctrl.blur()' /> \
						{{$ctrl.placeholder}} \
					</label> \
				</div> \
				<div ng-switch-when='select'> \
					<tw-select \
						name='{{$ctrl.name}}' \
						options='$ctrl.options' \
						placeholder='{{$ctrl.placeholder}}' \
						ng-model='$ctrl.ngModel' \
						ng-required='$ctrl.ngRequired' \
						ng-disabled='$ctrl.ngDisabled' \
						ng-change='$ctrl.change()' \
						ng-focus='$ctrl.focus()' \
						ng-blur='$ctrl.blur()' /> \
				</div> \
				<div ng-switch-when='upload'> \
					<tw-upload \
						name='{{$ctrl.name}}' \
						description='{{$ctrl.placeholder}}' \
						icon='{{$ctrl.uploadOptions.icon}}' \
						instructions='{{$ctrl.uploadOptions.instructions}}' \
						button-text='{{$ctrl.uploadOptions.buttonText}}' \
						processing-text='{{$ctrl.uploadOptions.processingText}}' \
						complete-text='{{$ctrl.placeholder}}' \
						cancel-text='{{$ctrl.uploadOptions.cancelText}}' \
						too-larger-message='{{$ctrl.uploadOptions.tooLargeMessage}}' \
						accept='{{$ctrl.uploadOptions.accept}}' \
						max-size='$ctrl.uploadOptions.maxSize' \
						ng-model='$ctrl.ngModel' \
						ng-required='$ctrl.ngRequired' \
						ng-disabled='$ctrl.ngDisabled' \
						ng-change='$ctrl.change()' \
						ng-focus='$ctrl.focus()' \
						ng-blur='$ctrl.blur()' /> \
				</div> \
				<div ng-switch-when='date'> \
					<tw-date \
						name='{{$ctrl.name}}' \
						locale='{{$ctrl.locale}}' \
						ng-min='$ctrl.ngMin' \
						ng-max='$ctrl.ngMax' \
						ng-model='$ctrl.ngModel' \
						ng-required='$ctrl.ngRequired' \
						ng-disabled='$ctrl.ngDisabled' \
						ng-change='$ctrl.change()' \
						ng-focus='$ctrl.focus()' \
						ng-blur='$ctrl.blur()' /> \
				</div> \
				<ng-transclude class='error-messages'></ng-transclude> \
			</div>"
		};
	}

	angular
		.module('tw.form-components')
		.controller('TwDynamicFormControlController', TwDynamicFormControlController);

	TwDynamicFormControlController.$inject = ['$element', '$scope'];

	function TwDynamicFormControlController($element, $scope) {
		var $ctrl = this;
		var ngModelController = $element.controller('ngModel');
		$ctrl.change = function() {
			ngModelController.$setDirty();
			if ($ctrl.ngChange) {
				$ctrl.ngChange();
			}
		};
		$ctrl.focus = function() {
			$element.triggerHandler('focus');
		};
		$ctrl.blur = function() {
			ngModelController.$setTouched();
			$element.triggerHandler('blur');
		};
	}

	function TwDynamicFormControlLink(scope, element, attrs, ngModel) {
		// Min and max do not work on custom elements, add manual validators
		ngModel.$validators.min = function(modelValue, viewValue) {
			if (typeof scope.$ctrl.ngMin === "undefined") {
				return true;
			}
			if (typeof viewValue === "number" &&
				typeof scope.$ctrl.ngMin === "number" &&
				viewValue < scope.$ctrl.ngMin) {
				return false;
			}
			// TODO add comparisons for Date type controls
			return true;
		};
		ngModel.$validators.max = function(modelValue, viewValue) {
			if (typeof scope.$ctrl.ngMax === "undefined") {
				return true;
			}
			if (typeof viewValue === "number" &&
				typeof scope.$ctrl.ngMax === "number" &&
				viewValue > scope.$ctrl.ngMax) {
				return false;
			}
			// TODO add comparisons for Date type controls
			return true;
		};

		/*
		// Attempt to override minlength/maxlength so not applied if not text
		// TODO doesn't work, must return bool!.
		ngModel.$validators.minlength = function(modelValue, viewValue) {
			if (scope.$ctrl.type !== 'text' || !scope.$ctrl.ngMinlength) {
				return true;
			}
			return scope.$ctrl.ngMinlength();
		};
		ngModel.$validators.maxlength = function(modelValue, viewValue) {
			if (scope.$ctrl.type !== 'text' || !scope.$ctrl.ngMaxlength) {
				return true;
			}
			return scope.$ctrl.ngMaxlength();
		};
		*/
	}
})(window.angular);
