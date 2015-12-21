(function(angular) {
	//'use strict';

	angular
		.module('tw.form-components')
		.directive('twDynamicFormControl', TwDynamicFormControl);

	function TwDynamicFormControl() {
		return {
			restrict: 'E',
			controllerAs: "vm",
			bindToController: true,
			controller: function() { },
			scope: {
				type: "@",
				name: "@",
				id: "@",
				placeholder: "@",
				step: "@",
				options: "=",
				ngModel: "=",
				ngRequired: "=",
				ngDisabled: "=",
				ngMinlength: "=",
				ngMaxlength: "=",
				ngMin: "=",
				ngMax: "=",
				ngPattern: "="
			},
			link: function(scope, element) {

			},
			template:
			"<div ng-switch='vm.type'> \
				<input ng-switch-when='text'  \
					name='{{vm.name}}'  \
					id='{{vm.id}}' \
					type='text' \
					class='form-control' \
					placeholder='{{vm.placeholder}}' \
					ng-model='vm.ngModel' \
					ng-required='vm.ngRequired' \
					ng-disabled='vm.ngDisabled' \
					ng-minlength='vm.ngMinlength' \
					ng-maxlength='vm.ngMaxlength' \
					ng-pattern='vm.ngPattern' />  \
				<input ng-switch-when='number'  \
					name='{{vm.name}}'  \
					id='{{vm.id}}' \
					type='number' \
					step='{{vm.step}}' \
					class='form-control' \
					placeholder='{{vm.placeholder}}' \
					ng-model='vm.ngModel' \
					ng-required='vm.ngRequired' \
					ng-disabled='vm.ngDisabled' \
					ng-min='vm.ngMin' \
					ng-max='vm.ngMax' />  \
				<div ng-switch-when='radio' \
					class='radio' \
					ng-class='{disabled: vm.ngDisabled}' \
					ng-repeat='(value, label) in vm.options track by $index'> \
					<label> \
						<input type='radio' \
							name='{{vm.name}}' \
							value='{{value}}' \
							ng-model='vm.ngModel' \
							ng-required='vm.ngRequired' \
							ng-disabled='vm.ngDisabled' /> \
						{{label}} \
					</label> \
				</div> \
				<div ng-switch-when='checkbox' \
					class='checkbox' \
					ng-class='{disabled: vm.ngDisabled}'> \
					<label> \
						<input type='checkbox' \
							name='{{vm.name}}' \
							id='{{vm.id}}' \
							ng-model='vm.ngModel' \
							ng-required='vm.ngRequired' \
							ng-disabled='vm.ngDisabled' /> \
						{{vm.placeholder}} \
					</label> \
				</div> \
				<select ng-switch-when='select' \
					name='{{vm.name}}' \
					id='{{vm.id}}' \
					class='form-control' \
					ng-options='value as label for (value, label) in vm.options track by $index' \
					ng-model='vm.ngModel' \
					ng-required='vm.ngRequired' \
					ng-disabled='vm.ngDisabled'> \
					<option ng-if='vm.placeholder' value=''> \
						{{vm.placeholder}} \
					</option> \
				</select> \
			</div>"
		};
	}
})(window.angular);
