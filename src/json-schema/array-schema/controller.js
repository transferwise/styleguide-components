const simpleTypes = ['string', 'number', 'integer', 'boolean'];

class Controller {
  $onInit() {
    if (!Array.isArray(this.model)) {
      if (this.schema && this.schema.items && this.isSimpleType(this.schema.items.type)) {
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

  isSimpleType(type) { // eslint-disable-line
    return simpleTypes.indexOf(type) >= 0;
  }
}

export default Controller;
