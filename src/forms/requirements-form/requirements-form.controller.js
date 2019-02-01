import angular from 'angular';

class RequirementsFormController {
  constructor(RequirementsService) {
    this.RequirementsService = RequirementsService;

    if (!this.model) {
      this.model = {};
    }
  }

  $onInit() {
    if (this.requirements && this.requirements.length > 0) {
      this.activeIndex = 0;
    }
  }

  $onChanges(changes) {
    if (changes.requirements) {
      this.onRequirementsChange(
        changes.requirements.currentValue,
        changes.requirements.previousValue
      );
    }
  }

  onTabChange(index) {
    this.switchTab(index, this.activeIndex);
    this.activeIndex = index;
  }

  switchTab(newIndex, oldIndex) {
    if (newIndex === oldIndex) {
      return;
    }

    cleanRequirementsModel(
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
  onFieldsetModelChange(model) {
    if (this.onModelChange) {
      this.onModelChange({ model });
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
    this.tabs = this.requirements.map(requirement => requirement.title);

    // If activeIndex is invalid, correct it
    if ((!this.activeIndex ||
      (this.activeIndex && !this.requirements[this.activeIndex])) &&
      this.requirements.length > 0
    ) {
      this.activeIndex = 0;
    }

    cleanRequirementsModel(
      this.model,
      oldPrepared[this.activeIndex],
      newPrepared[this.activeIndex]
    );
  }
}

function cleanRequirementsModel(model, oldRequirements, newRequirements) {
  if (!oldRequirements ||
    !newRequirements ||
    !oldRequirements.properties ||
    !newRequirements.properties) {
    return;
  }

  const oldFieldNames = getFieldNamesFromRequirement(oldRequirements);
  const newFieldNames = getFieldNamesFromRequirement(newRequirements);

  const obsoleteFieldNames =
    oldFieldNames.filter(fieldName => newFieldNames.indexOf(fieldName) < 0);

  obsoleteFieldNames.forEach((fieldName) => {
    delete model[fieldName];
  });
}

function getFieldNamesFromRequirement(modelRequirement) {
  if (!modelRequirement || !modelRequirement.properties) {
    return [];
  }

  return Object.keys(modelRequirement.properties) || [];
}

RequirementsFormController.$inject = [
  'TwRequirementsService'
];

export default RequirementsFormController;
