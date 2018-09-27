
function RequirementsFormService(RequirementsService) {
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

  this.prepRequirements = types => RequirementsService.prepRequirements(types);

  function getFieldNamesFromRequirement(modelRequirement) {
    if (!modelRequirement.fields) {
      return [];
    }

    const names = Object.keys(modelRequirement.fields);

    return Array.prototype.concat.apply([], names);
  }
}

RequirementsFormService.$inject = ['TwRequirementsService'];

export default RequirementsFormService;
