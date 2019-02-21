class Controller {
  $onInit() {
    if (!this.model) {
      this.model = {};
    }
  }

  onPropertyChange(property, model) {
    //console.log(this.model, property, model);

    this.model[property] = model;

    if (this.onChange) {
      this.onChange({ model: this.model });
    }
  }
}

export default Controller;
