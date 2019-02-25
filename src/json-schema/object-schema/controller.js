class Controller {
  $onInit() {
    if (!this.model) {
      this.model = {};
    }
  }

  onModelChange(model, property) {
    this.model[property] = model;

    if (this.onChange) {
      this.onChange({ model: this.model });
    }
  }

  onRefreshRequirements(model, property) {
    this.model[property] = model; // TODO doing this twice

    if (this.onRefresh) {
      this.onRefresh({ model: this.model });
    }
  }
}

export default Controller;
