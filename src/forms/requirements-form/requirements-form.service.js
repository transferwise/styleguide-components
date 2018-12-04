
function RequirementsFormService() {
  /**
   * Delete properties that were in the old requirements, but are not in the new
   */
  this.cleanRequirementsModel = (model, oldRequirements, newRequirements) => {
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
  };

  function getFieldNamesFromRequirement(modelRequirement) {
    if (!modelRequirement || !modelRequirement.properties) {
      return [];
    }

    return Object.keys(modelRequirement.properties) || [];
  }
}

export default RequirementsFormService;
