class Controller {
  $onInit() {
    if (!Array.isArray(this.model)) {
      this.model = [{}];
    }
  }
  onItemChange(index, model) {
    this.model[index] = model;
    if (this.onChange) {
      this.onChange({ model: this.model });
    }
  }
  remove(index) {
    if (this.model[index]) {
      this.model.splice(index, 1);
    }
  }
  add() {
    this.model.push({});
  }
}

export default Controller;
