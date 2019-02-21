class Controller {
  $onInit() {
    if (!this.model) {
      this.model = {};
    }
  }

  onChildChange(model) {
    angular.extend(this.model, model);

    if (this.onChange) {
      this.onChange({ model: this.model });
    }
  }
}

export default Controller;
