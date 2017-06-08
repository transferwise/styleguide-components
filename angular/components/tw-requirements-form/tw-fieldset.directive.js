(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twFieldset', TwFieldset);

	function TwFieldset() {
		return {
			restrict: 'E',
			scope: {
				legend: '@',
				model: '=',
				fields: '<',
				uploadOptions: '<',
				locale: '@',
				onRefreshRequirements: '&',
				validationMessages: '<',
				errorMessages: '<',
				isValid: '=?'
			},
			controller: ['$scope', TwFieldsetController],
			controllerAs : '$ctrl',
			bindToController: true,
			template: " \
				<fieldset ng-form='twFieldset'> \
					<legend ng-if='$ctrl.legend'>{{$ctrl.legend}}</legend> \
					<div class='row row-equal-height'> \
						<div ng-repeat='fieldGroup in $ctrl.fields' \
							ng-class='{ \
								\"col-sm-4\": fieldGroup.width === \"sm\", \
								\"col-sm-6\": fieldGroup.width === \"md\" || fieldGroup.maxlength && fieldGroup.maxlength <= 10, \
								\"col-sm-12\": fieldGroup.width === \"lg\" || !fieldGroup.maxlength || fieldGroup.maxlength > 10 \
							}'> \
							<div class='form-group tw-form-group-{{fieldGroup.key}}' style='width: 100%;' \
								ng-class='{\"has-error\": $ctrl.errorMessages[fieldGroup.key]}'> \
								<label class='control-label' \
									ng-if='fieldGroup.type !== \"upload\"'> \
									{{fieldGroup.name}} \
								</label> \
								<div class='row'> \
									<div class='col-xs-{{field.columns}}' \
										ng-repeat='field in fieldGroup.group'> \
										<tw-dynamic-form-control \
											name='{{field.key}}' \
											label='{{fieldGroup.name}}' \
											type='{{field.type | lowercase}}' \
											placeholder='{{field.placeholder || field.example}}' \
											help-text='{{field.helpText}}' \
											locale='{{$ctrl.locale}}' \
											upload-accept='{{field.accept}}' \
											upload-icon='{{field.icon}}' \
											upload-too-large-message='{{field.tooLargeMessage}}' \
											options='field.valuesAllowed' \
											upload-options='$ctrl.uploadOptions' \
											ng-model='$ctrl.model[field.key]' \
											ng-blur='$ctrl.onBlur(field)' \
											ng-required='field.required' \
											ng-disabled='field.disabled' \
											tw-minlength='field.minLength' \
											tw-maxlength='field.maxLength' \
											ng-min='field.min' \
											ng-max='field.max' \
											ng-pattern='field.validationRegexp' \
											tw-validation> \
											<!-- tw-dynamic-async-validator='field.validationAsync' --> \
										</tw-dynamic-form-control> \
										<div class='error-messages'> \
											<div ng-repeat='(validationType, validationMessage) in $ctrl.validationMessages' \
												class='error-{{validationType}}'> \
												{{validationMessage}} \
											</div> \
											<div class='error-provided' ng-if='$ctrl.errorMessages[field.key]'> \
												{{ $ctrl.errorMessages[field.key] }} \
											</div> \
										</div> \
										<div ng-if='field.tooltip' \
											class='help-block'> \
											<a role='button' \
												tabindex='0' \
												data-toggle='popover' \
												data-placement='top' \
												title='{{field.tooltip}}'> \
												<span class='glyphicon glyphicon-question-sign'></span> \
											</a> \
										</div> \
									</div> \
								</div> \
							</div> \
						</div> \
					</div> \
				</div> \
			</fieldset>"
		};
	}

	function TwFieldsetController($scope) {
		var $ctrl = this;

		function init() {
			if (!$ctrl.model) {
				$ctrl.model = {};
			}

			if ($ctrl.fields) {
				prepFields($ctrl.fields);
			}

			$scope.$watch('$ctrl.fields', function(newValue, oldValue) {
				if (!angular.equals(newValue, oldValue)) {
					prepFields($ctrl.fields);
				}
			});

			$scope.$watch('twFieldset.$valid', function(validity) {
				$ctrl.isValid = validity;
			});

			// TODO can we add asyncvalidator here? - prob not

			if (!$ctrl.validationMessages) {
				$ctrl.validationMessages = {
					'required': 'Required',
					'pattern': 'Incorrect format',
					'min': 'The value is too low',
					'max': 'The value is too high',
					'minlength': 'The value is too short',
					'maxlength': 'The value is too long'
				};
			}
		}

		/**
		 * Perform the refreshRequirementsOnChange check on blur
		 */
		$ctrl.onBlur = function(field) {
			if (!field.refreshRequirementsOnChange) {
				return;
			}
			// TODO disabled the form while we refresh requirements?

			if (false && $ctrl.onRefreshRequirements) {
				// Should post the current model back to the requirements end
				// point and update the requirements.
				// TODO Can we handle this internally?
				$ctrl.onRefreshRequirements();
			}
		};

		function prepFields(fields) {
			fields.forEach(function(fieldGroup) {
				if (fieldGroup.group.length) {
					fieldGroup.key = fieldGroup.group[0].key;
				}
				fieldGroup.group.forEach(function(field) {
					if (field.type === 'upload') {
						fieldGroup.type = 'upload';
					}
					prepRegExp(field);
					prepValuesAsync(field);
					prepValuesAllowed(field);
				});
			});
		}

		function prepRegExp(field) {
			if (field.validationRegexp) {
				try {
					field.validationRegexp = new RegExp(field.validationRegexp);
				} catch(ex) {
					console.log("API regexp is invalid");
					field.validationRegexp = false;
				}
			} else {
				field.validationRegexp = false;
			}
		}
		function prepValuesAsync(field) {
			if (!field.valuesAsync) {
				return;
			}
			var postData = {};
			if (field.valuesAsync.params &&
				field.valuesAsync.params.length) {
				postData = getParamValuesFromModel($ctrl.model, field.valuesAsync.params);
			}

			$http.post(field.valuesAsync.url, postData).then(function(response) {
				field.valuesAllowed = response.data;
				prepValuesAllowed(field);
			}).catch(function() {
				// TODO - RETRY?
			});
		}

		function prepValuesAllowed(field) {
			if (!angular.isArray(field.valuesAllowed)) {
				return;
			}
			field.valuesAllowed.forEach(function(valueAllowed) {
				valueAllowed.value = valueAllowed.key;
				valueAllowed.label = valueAllowed.name;
			});
		}

		function getParamValuesFromModel(model, params) {
			var data = {};
			params.forEach(function(param) {
				if (model[param.key]) {
					data[param.parameterName] = model[param.key];
				} else if (param.required) {
					// TODO Problem, parameter is required, but data is missing.
				}
			});
			return data;
		}

		init();
	}
})(window.angular);
