const simpleTypes = ['string', 'number', 'integer', 'boolean'];

class Controller {
  $onInit() {
    if (!Array.isArray(this.model)) {
      const arrayType = getArrayType(this.schema);
      const newItem = getNewItem(arrayType);

      this.model = [];
      if (newItem) {
        // Seed the array with a newItem to show one empty form
        this.model.push(newItem);
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
    const arrayType = getArrayType(this.schema);
    const newItem = getNewItem(arrayType);
    if (newItem) {
      this.model.push(newItem);
    }
  }

  isSimpleType(type) { // eslint-disable-line
    return simpleTypes.indexOf(type) >= 0;
  }
}

function getArrayType(schema) {
  return schema && schema.items && schema.items.type;
}

function getNewItem(arrayType) {
  if (arrayType === 'object') {
    return {};
  }
  if (arrayType === 'array') {
    return [];
  }

  return null;
}

export default Controller;
