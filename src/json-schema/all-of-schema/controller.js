class Controller {
  $onInit() {
    if (!this.model) {
      this.model = {};
    }
  }

  onModelChange(model) {
    angular.extend(this.model, model);

    if (this.onChange) {
      this.onChange({ model: this.model });
    }
  }


  onRefreshRequirements(model) {
    angular.extend(this.model, model); // TOOO doing this twice

    if (this.onRefresh) {
      this.onRefresh({ model: this.model });
    }
  }
}

export default Controller;
