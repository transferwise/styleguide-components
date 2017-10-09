
function RequirementsService() {
  this.cleanRequirementsModel = (model, oldRequirements, newRequirements) => {
    const oldFieldNames = getFieldNamesFromRequirement(oldRequirements);
    const newFieldNames = getFieldNamesFromRequirement(newRequirements);
    const obsoleteFieldNames =
      oldFieldNames.filter(fieldName => newFieldNames.indexOf(fieldName) < 0);

    obsoleteFieldNames.forEach((fieldName) => {
      delete model[fieldName];
    });
  };

  this.cleanModel = (
    model,
    oldRequirements, oldType,
    newRequirements, newType
  ) => {
    const oldRequirementType = this.findRequirementByType(oldType, oldRequirements);
    const newRequirementType = this.findRequirementByType(newType, newRequirements);

    this.cleanRequirementsModel(model, oldRequirementType, newRequirementType);
  };

  this.findRequirementByType = (type, requirements) => {
    if (!requirements) {
      return false;
    }

    for (let i = 0; i < requirements.length; i++) {
      const modelType = requirements[i];
      if (modelType.type === type) {
        return modelType;
      }
    }

    return false;
  };

  this.prepRequirements = (types) => {
    types.forEach((type) => {
      prepType(type);
    });
  };

  function getFieldNamesFromRequirement(modelRequirement) {
    if (!modelRequirement.fields) {
      return [];
    }
    const names = modelRequirement.fields.map((field) => {
      if (field.group) {
        return field.group.map(fieldSection => fieldSection.key);
      }
      return field.key;
    });

    return Array.prototype.concat.apply([], names);
  }

  function prepType(type) {
    if (!type.label) {
      type.label = getTabName(type.type);
    }
  }

  function getTabName(tabType) {
    if (tabType && tabType.length > 0) {
      const tabNameWithSpaces = tabType.toLowerCase().split('_').join(' '); // String.replace method only replaces first instance
      return tabNameWithSpaces.charAt(0).toUpperCase() + tabNameWithSpaces.slice(1);
    }
    return '';
  }
}

export default RequirementsService;
