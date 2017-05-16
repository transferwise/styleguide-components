(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twRequirementsForm', TwRequirementsForm);

	function TwRequirementsForm() {
		return {
			restrict: 'E',
			scope: {
				requirements: '=',
				model: '=',
				uploadOptions: '=',
				locale: '@',
				onRefreshRequirements: '&'
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
			<div class='tab-content'> \
				<div ng-repeat='requirementType in $ctrl.requirements'\
					ng-if='$ctrl.model.type == requirementType.type' \
					class='tab-pane' \
					id='{{requirementType.type}}' \
					ng-class='{\"active\": $ctrl.model.type == requirementType.type}'> \
					<p>{{requirementType.description}}</p> \
					<tw-dynamic-form-section \
						fields='requirementType.fields' \
						model='$ctrl.model' \
						upload-options='$ctrl.uploadOptions' \
						locale='{{$ctrl.locale}}' \
						onRefreshRequirements='$ctrl.onRefreshRequirements()'> \
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

			$scope.$watch('$ctrl.requirements', function(newValue, oldValue) {
				console.log("change: " + newValue[0].label);
				if (!angular.equals(newValue, oldValue)) {
					TwRequirementsService.prepRequirements($ctrl.requirements);
					$ctrl.model.type =
						$ctrl.requirements.length ? $ctrl.requirements[0].type : null;
				}
			});

			$scope.$watch('$ctrl.model.type', function(newType, oldType) {
				switchTab(newType, oldType);
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
			var oldRequirements = TwRequirementsService.findRequirementByType(oldType, $ctrl.requirements);
			var newRequirements = TwRequirementsService.findRequirementByType(newType, $ctrl.requirements);

			if (!oldRequirements || !newRequirements) {
				$ctrl.model = {type: newType};
				return;
			}

			TwRequirementsService.cleanRequirementsModel(
				$ctrl.model,
				oldRequirements,
				newRequirements
			);
		}

		init();
	}
})(window.angular);
