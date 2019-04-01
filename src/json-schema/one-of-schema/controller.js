class Controller {
  $onInit() {
    this.options = [];
    this.activeIndex = 1;
  }

  onSchemaChange(newSchema) {
    if (newSchema.properties) {
      clearPropertiesNotInObjectSchema(this.model, newSchema);
    } else {
      // Tricky to clear model intelligently in this case, just reset it
      this.model = {};
    }

    this.onModelChange(this.model);
  }

  onModelChange(model) {
    if (this.onChange) {
      this.onChange({ model });
    }
  }

  onRefreshRequirements(model) {
    if (this.onRefresh) {
      this.onRefresh({ model });
    }
  }
}

function clearPropertiesNotInObjectSchema(model, objectSchema) {
  const existingProps = Object.keys(model);
  existingProps.forEach((existingProp) => {
    if (!objectSchema.properties[existingProp]) {
      delete model[existingProp];
    }
  });
}

export default Controller;
