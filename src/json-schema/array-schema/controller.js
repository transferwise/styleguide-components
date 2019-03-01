class Controller {
  $onInit() {
    this.simpleTypes = ['string', 'number', 'integer', 'boolean'];

    if (!Array.isArray(this.model)) {
      if (this.isSimpleType(this.schema.items.type)) {
        this.model = [];
      } else {
        this.model = [{}];
      }
    }
  }

  onModelChange(model, index) {
    this.model[index] = model;
    if (this.onChange) {
      this.onChange({ model: this.model });
    }
  }


  onRefreshRequirements(model, index) {
    this.model[index] = model; // TODO doing this twice...
    if (this.onRefresh) {
      this.onRefresh({ model: this.model });
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

  isSimpleType(type) {
    return this.simpleTypes.includes(type);
  }
}

export default Controller;
