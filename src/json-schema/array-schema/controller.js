const simpleTypes = ['string', 'number', 'integer', 'boolean'];

class Controller {
  $onInit() {
    if (!Array.isArray(this.model)) {
      const arrayType = this.schema && this.schema.items && this.schema.items.type;

      if (!arrayType || this.isSimpleType(arrayType)) {
        // If we're dealing with simple types, oneOf or allOf, leave it to them.
        this.model = [];
      } else if (arrayType === 'object') {
        // Seed the array with one object, to show one empty form.
        this.model = [{}];
      } else if (arrayType === 'array') {
        // Seed the array with one array (I hope we never do this).
        this.model = [[]];
      }
    }
  }

  onModelChange(index, model, schema) {
    this.model[index] = model;
    if (this.onChange) {
      this.onChange({ model: this.model, schema });
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
