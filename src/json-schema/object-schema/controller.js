class Controller {
  $onInit() {
    if (!this.model) {
      this.model = {};
    }
  }

  onModelChange(property, model, schema) {
    this.model[property] = model;

    if (this.onChange) {
      this.onChange({ model: this.model, schema });
    }
  }

  isRequired(property) {
    return this.schema.required && this.schema.required.includes(property);
  }
}

export default Controller;
