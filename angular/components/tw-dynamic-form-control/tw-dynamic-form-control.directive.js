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
			controller: function($element) {
				var vm = this;

				this.change = function() {
					change(vm.type, $element);
				};
			},
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
					ng-disabled='vm.ngDisabled' \
					ng-change='vm.change()' />  \
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
					ng-change='vm.change()' \
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
					ng-disabled='vm.ngDisabled' \
					ng-change='vm.change()'> \
					<option ng-if='vm.placeholder' value=''> \
						{{vm.placeholder}} \
					</option> \
				</select> \
			</div>"
		};
	}

	function change(type, $element) {
		var formGroup = $element.closest(".form-group");
		console.log("change");
		setTimeout(function() {
			$element.removeClass("ng-untouched");

			if (type === "number") {

				// Types other than test don't work without extra effort
				var input = $element.find("input");
				console.log(input);

				if (input.hasClass("ng-invalid")) {
					formGroup.addClass("has-error");
				} else {
					formGroup.removeClass("has-error");
				}

				$element.removeClass("ng-invalid");
				//$element.removeClass("ng-invalid-minlength");
				//$element.removeClass("ng-invalid-maxlength");

				if (input.hasClass("ng-invalid-required")) {
					$element.addClass("ng-invalid-required");
					$element.addClass("ng-invalid");
				} else {
					$element.removeClass("ng-invalid-required");
				}

				if (input.hasClass("ng-invalid-min")) {
					$element.addClass("ng-invalid-min");
					$element.addClass("ng-invalid");
				} else {
					$element.removeClass("ng-invalid-min");
				}

				if (input.hasClass("ng-invalid-max")) {
					$element.addClass("ng-invalid-max");
					$element.addClass("ng-invalid");
				} else {
					$element.removeClass("ng-invalid-max");
				}

				if (input.hasClass("ng-invalid-number")) {
					$element.addClass("ng-invalid-number");
					$element.addClass("ng-invalid");
				} else {
					$element.removeClass("ng-invalid-number");
				}

			} else {
				console.log("type not number");
				if ($element.hasClass("ng-invalid")) {
					formGroup.addClass("has-error");
				} else {
					formGroup.removeClass("has-error");
				}
			}
		},10);
	}
})(window.angular);
