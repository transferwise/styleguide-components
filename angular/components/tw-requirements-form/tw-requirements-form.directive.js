(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twRequirementsForm', TwRequirementsForm);

	function TwRequirementsForm() {
		return {
			restrict: 'E',
			scope: {
				model: '=',
				requirements: '<',
				uploadOptions: '<',
				locale: '@',
				onRefreshRequirements: '&',
				validationMessages: '<',
				fieldErrors: '<',
				isValid: '=?'
			},
			controller: ['$scope', 'TwRequirementsService', TwRequirementsFormController],
			controllerAs : '$ctrl',
			bindToController: true,
			template: " \
			<tw-tabs \
				ng-if='$ctrl.requirements.length > 1' \
				tabs='$ctrl.requirements' \
				active='$ctrl.model.type'> \
			</tw-tabs> \
			<div class='tab-content' ng-form='twForm'> \
				<div ng-repeat='requirementType in $ctrl.requirements' \
					ng-if='$ctrl.model.type == requirementType.type' \
					class='tab-pane active' \
					id='{{requirementType.type}}'> \
					<p>{{requirementType.description}}</p> \
					<tw-dynamic-form-section \
						fields='requirementType.fields' \
						model='$ctrl.model' \
						upload-options='$ctrl.uploadOptions' \
						locale='{{$ctrl.locale}}' \
						onRefreshRequirements='$ctrl.onRefreshRequirements()' \
						validation-messages='$ctrl.validationMessages' \
						field-errors='$ctrl.fieldErrors'> \
					</tw-dynamic-form-section> \
				</div> \
			</div>"
		};
	}

	function TwRequirementsFormController($scope, TwRequirementsService) {
		var $ctrl = this;
		$ctrl.switchTab = switchTab;

		function init() {
			if (!$ctrl.model) {
				$ctrl.model = {};
			}

			if ($ctrl.requirements) {
				TwRequirementsService.prepRequirements($ctrl.requirements);
			}

			$scope.$watch('$ctrl.requirements', function(newRequirements, oldRequirements) {
				if (!angular.equals(newRequirements, oldRequirements)) {
					TwRequirementsService.prepRequirements($ctrl.requirements);
					var oldType = $ctrl.model.type;
					var newType =
						$ctrl.requirements.length ? $ctrl.requirements[0].type : null;

					$ctrl.model.type = newType;

					if (oldRequirements && newRequirements) {
						TwRequirementsService.cleanModel(
							$ctrl.model,
							oldRequirements, oldType,
							newRequirements, newType
						);
					}
				}
			});

			$scope.$watch('$ctrl.model.type', function(newType, oldType) {
				switchTab(newType, oldType);
			});

			$scope.$watch('twForm.$valid', function(validity) {
				$ctrl.isValid = validity;
			});

			// TODO can we add asyncvalidator here? - prob not
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

		function switchTab(newType, oldType) {
			var oldRequirementType = TwRequirementsService.findRequirementByType(
				oldType, $ctrl.requirements
			);
			var newRequirementType = TwRequirementsService.findRequirementByType(
				newType, $ctrl.requirements
			);

			if (!oldRequirementType || !newRequirementType) {
				if (!$ctrl.model) {
						$ctrl.model = {};
				}
				$ctrl.model.type = newType;
			}

			TwRequirementsService.cleanRequirementsModel(
				$ctrl.model,
				oldRequirementType,
				newRequirementType
			);
		}

		init();
	}
})(window.angular);
