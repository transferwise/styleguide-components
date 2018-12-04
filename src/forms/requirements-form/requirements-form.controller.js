import angular from 'angular';

class RequirementsFormController {
  constructor($scope, TwRequirementsFormService, RequirementsService) {
    this.RequirementsFormService = TwRequirementsFormService;
    this.RequirementsService = RequirementsService;

    if (!this.model) {
      this.model = {};
    }

    $scope.$watch(
      '$ctrl.activeIndex',
      (newVal, oldVal) => this.switchTab(newVal, oldVal)
    );
  }

  $onChanges(changes) {
    if (changes.requirements) {
      this.onRequirementsChange(
        changes.requirements.currentValue,
        changes.requirements.previousValue
      );
    }
  }

  switchTab(newIndex, oldIndex) {
    if (!newIndex) {
      return;
    }

    this.RequirementsFormService.cleanRequirementsModel(
      this.model,
      this.requirements && this.requirements[oldIndex],
      this.requirements && this.requirements[newIndex]
    );
  }

  onFieldsetRefreshRequirements() {
    if (this.onRefreshRequirements) {
      this.onRefreshRequirements();
    }
  }

  onRequirementsChange(newRequirements, oldRequirements) {
    if (angular.equals(newRequirements, oldRequirements)) {
      return;
    }

    // We need to prepare the new AND old, because the the binding is not
    // updated when we prepare, so the oldValue will not be prepped.
    const newPrepared = this.RequirementsService.prepRequirements(newRequirements);
    const oldPrepared = this.RequirementsService.prepRequirements(oldRequirements);

    this.requirements = newPrepared;

    // If activeIndex is invalid, correct it
    if ((!this.activeIndex ||
      (this.activeIndex && !this.requirements[this.activeIndex])) &&
      this.requirements.length > 0
    ) {
      this.activeIndex = 0;
    }

    this.RequirementsFormService.cleanRequirementsModel(
      this.model,
      oldPrepared[this.activeIndex],
      newPrepared[this.activeIndex]
    );
  }
}

RequirementsFormController.$inject = [
  '$scope',
  'TwRequirementsFormService',
  'TwRequirementsService'
];

export default RequirementsFormController;
