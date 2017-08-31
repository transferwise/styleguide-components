import RequirementsService from './requirements.service.js';

class RequirementsFormController {
  constructor($scope, TwRequirementsService) {
    this.RequirementsService = TwRequirementsService;

    if (!this.model) {
      this.model = {};
    }

    if (this.requirements) {
      this.RequirementsService.prepRequirements(this.requirements);
    }

    $scope.$watch('$ctrl.requirements', (newRequirements, oldRequirements) => {
      if (!angular.equals(newRequirements, oldRequirements)) {
        this.RequirementsService.prepRequirements(this.requirements);
        var oldType = this.model.type;
        var newType =
          this.requirements.length ? this.requirements[0].type : null;

        this.model.type = newType;

        if (oldRequirements && newRequirements) {
          this.RequirementsService.cleanModel(
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

  /**
   * Perform the refreshRequirementsOnChange check on blur
   */
  onBlur(field) {
    if (!field.refreshRequirementsOnChange) {
      return;
    }
    // TODO disabled the form while we refresh requirements?

    if (false && this.onRefreshRequirements) {
      // Should post the current model back to the requirements end
      // point and update the requirements.
      // TODO Can we handle this internally?
      this.onRefreshRequirements();
    }
  }

  switchTab(newType, oldType) {
    var oldRequirementType = this.RequirementsService.findRequirementByType(
      oldType, this.requirements
    );
    var newRequirementType = this.RequirementsService.findRequirementByType(
      newType, this.requirements
    );

    if (!oldRequirementType || !newRequirementType) {
      if (!this.model) {
          this.model = {};
      }
      this.model.type = newType;
    }

    this.RequirementsService.cleanRequirementsModel(
      this.model,
      oldRequirementType,
      newRequirementType
    );
  }
}

RequirementsFormController.$inject = ['$scope', 'TwRequirementsService'];

export default RequirementsFormController;
