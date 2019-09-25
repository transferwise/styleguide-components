class Controller {
  $onInit() {
    this.outputModel = angular.extend({}, this.model || {});
  }

  onModelChange(property, model, schema) {
    this.outputModel[property] = model;

    if (this.onChange) {
      this.onChange({ model: this.outputModel, schema });
    }
  }

  isRequired(property) {
    return this.schema.required && this.schema.required.includes(property);
  }
}

export default Controller;
