class Controller {
  $onInit() {
    this.options = [];
    this.activeIndex = 1;
  }

  onSchemaChange(newSchema) {
    if (newSchema.properties) {
      this.onModelChange(getModelWithOnlyCurrentProps(this.model, newSchema.properties));
    } else {
      // Tricky to clear model intelligently in this case, just reset it
      this.onModelChange({});
    }
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

function getModelWithOnlyCurrentProps(model, properties) {
  const newModel = {};
  const propsInNewSchema = Object.keys(properties);

  propsInNewSchema.forEach((prop) => {
    if (typeof model[prop] !== 'undefined') {
      newModel[prop] = model[prop];
    }
  });

  return newModel;
}

export default Controller;
