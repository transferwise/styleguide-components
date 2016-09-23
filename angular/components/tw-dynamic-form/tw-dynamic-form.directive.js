(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twDynamicForm', TwDynamicForm);

	function TwDynamicForm() {
		return {
			restrict: 'E',
			//replace: true,
			scope: {
				requirements: '=',
				model: '='
			},
			controller: ['$scope', '$http', TwDynamicFormController],
			controllerAs : '$ctrl',
			bindToController: true,
			template: " \
			<ul class='nav nav-tabs m-b-3' \
				ng-if='$ctrl.requirements && $ctrl.requirements.length > 1'> \
				<li ng-repeat='requirementType in $ctrl.requirements' \
					ng-class='{\"active\": $ctrl.model.type === requirementType.type}'> \
					<a href='' ng-click='$ctrl.switchTab(requirementType.type)'> \
						{{requirementType.type}} \
					</a> \
				</li> \
			</ul> \
			<div class='tab-content'> \
				<div class='tab-pane' id='{{requirementType.type}}' \
					ng-class='{\"active\": $ctrl.model.type == requirementType.type}' \
					ng-repeat='requirementType in $ctrl.requirements' \
					ng-if='$ctrl.model.type == requirementType.type'> \
					<div class='row'> \
						<div class='form-group' \
							ng-repeat='fieldGroup in requirementType.fields' \
							ng-class='{ \
								\"col-sm-6\": fieldGroup.maxlength && fieldGroup.maxlength <= 10, \
								\"col-sm-12\": !fieldGroup.maxlength || fieldGroup.maxlength > 10 \
							}'> \
							<label class='control-label'> \
								{{fieldGroup.name}} \
							</label> \
							<div class='row'> \
								<div class='col-xs-{{field.columns}}' \
									ng-repeat='field in fieldGroup.group'> \
									<tw-dynamic-form-control \
										name='{{field.key}}' \
										type='{{field.type | lowercase}}' \
										placeholder='{{field.placeholder}}' \
										options='field.valuesAllowed' \
										ng-model='$ctrl.model[field.key]' \
										ng-change='$ctrl.onChange(field)' \
										ng-required='field.required' \
										ng-disabled='field.disabled' \
										ng-minlength='field.minLength' \
										ng-maxlength='field.maxLength' \
										ng-pattern='field.validationRegexp' \
										tw-validation \> \
										<!-- tw-dynamic-async-validator='field.validationAsync' --> \
									</tw-dynamic-form-control> \
									<div class='error-messages'> \
										<div class='error-minlength'>Minimum {{field.minlength}} characters</div> \
										<div class='error-maxlength'>Maximum {{field.maxlength}} characters</div> \
										<div class='error-required'>{{fieldGroup.name}} is required</div> \
										<div class='error-pattern'>Incorrect format</div> \
									</div> \
									<div class='help-block' \
										ng-if='field.tooltip'> \
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
			</div>"
		};
	}

	function TwDynamicFormController($scope, $http) {
		var $ctrl = this;
		$ctrl.switchTab = switchTab;

		function init() {
			if (!$ctrl.model) {
				$ctrl.model = {};
			}
			$scope.$watch('$ctrl.requirements', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					prepRequirements($ctrl.requirements);
					if (!$ctrl.model.type) {
						$ctrl.model.type =
							$ctrl.requirements.length ? $ctrl.requirements[0].type : false;
					}
				}
			});

			// TODO can we add asyncvalidator here? - prob not
		}

		$ctrl.onChange = function(field) {
			if (!field.refreshOnChangeGUESS) {
				return;
			}
			// POST the current model to the requirements endpoint and refresh
			// the form with updated values
			$http.post($ctrl.requirementsUrl, $ctrl.model).then(function(requirements) {
				$ctrl.requirements = requirements;
			}).catch(function() {
				// TODO
			});
		};

		function prepRequirements(types) {
			types.forEach(function(type) {
				type.fields.forEach(function(fieldGroup) {
					fieldGroup.group.forEach(function(field) {
						prepRegExp(field);
						prepValuesAsync(field);
						prepValuesAllowed(field);
					});
				});
			});
		}

		function prepRegExp(field) {
			if (field.validationRegexp) {
				try {
					field.validationRegexp = new RegExp(ield.validationRegexp);
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

		function switchTab(newType) {
			var oldRequirements = findRequirementByType($ctrl.model.type);
			var newRequirements = findRequirementByType(newType);
			$ctrl.model.type = newType;

			removeObsoletePropertiesFromModel(oldRequirements, newRequirements);
		}

		function removeObsoletePropertiesFromModel(oldRequirements, newRequirements) {
			var oldFieldNames = getFieldNamesFromRequirement(oldRequirements);
			var newFieldNames = getFieldNamesFromRequirement(newRequirements);
			var obsoleteFieldNames = oldFieldNames.filter(function(fieldName) {
				return newFieldNames.indexOf(fieldName) < 0;
			});
			obsoleteFieldNames.forEach(function(fieldName) {
				delete $ctrl.model[fieldName];
			});
		}

		function findRequirementByType(type) {
			for (var i=0; i < $ctrl.requirements.length; i++) {
				var modelType = $ctrl.requirements[i];
				if (modelType.type === type) {
					return modelType;
				}
			}
		}

		function getFieldNamesFromRequirement(modelRequirement) {
			var names = modelRequirement.fields.map(function(fieldGroup) {
				return fieldGroup.group.map(function(field) {
					return field.key;
				});
			});
			return Array.prototype.concat.apply([], names);
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
