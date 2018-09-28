import angular from 'angular';

class RequirementsFormController {
  constructor($scope, TwRequirementsFormService, RequirementsService) {
    this.RequirementsFormService = TwRequirementsFormService;
    this.RequirementsService = RequirementsService;

    if (!this.model) {
      this.model = {};
    }

    // TODO move watches to $onChanges
    $scope.$watch('$ctrl.requirements', (newRequirements, oldRequirements) => {
      if (!angular.equals(newRequirements, oldRequirements)) {
        this.requirements = this.RequirementsService.prepRequirements(this.requirements);

        const oldType = this.model.type;
        const newType =
          this.requirements.length ? this.requirements[0].type : null;

        this.model.type = newType;

        if (oldRequirements && newRequirements) {
          this.RequirementsFormService.cleanModel(
            this.model,
            oldRequirements, oldType,
            newRequirements, newType
          );
        }
      }
    });

    $scope.$watch('$ctrl.model.type', (newType, oldType) => {
      this.switchTab(newType, oldType);
    });

    $scope.$watch('twForm.$valid', (validity) => {
      this.isValid = validity;
    });

    // TODO can we add asyncvalidator here? - prob not
  }

  switchTab(newType, oldType) {
    const oldRequirementType = this.RequirementsFormService.findRequirementByType(
      oldType,
      this.requirements
    );
    const newRequirementType = this.RequirementsFormService.findRequirementByType(
      newType,
      this.requirements
    );

    if (!oldRequirementType || !newRequirementType) {
      if (!this.model) {
        this.model = {};
      }
      this.model.type = newType;
    }

    this.RequirementsFormService.cleanRequirementsModel(
      this.model,
      oldRequirementType,
      newRequirementType
    );
  }

  onFieldsetRefreshRequirements() {
    if (this.onRefreshRequirements) {
      this.onRefreshRequirements();
    }
  }
}

RequirementsFormController.$inject = [
  '$scope',
  'TwRequirementsFormService',
  'TwRequirementsService'
];

export default RequirementsFormController;
