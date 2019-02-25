import { validateSchema } from '../validation/validation.js';

class Controller {
  $onInit() {
    if (this.required) {
      // TODO necessary until we change how twField work
      this.schema.required = true;
    }
  }

  onModelChange(model) {
    this.validationKeys = validateSchema(model, this.schema);

    console.log('validationKeys:', this.validationKeys); // eslint-disable-line

    if (this.onChange) {
      this.onChange({ model });
    }

    if (this.schema.onRefreshRequirements && this.onRefresh) {
      this.onRefresh({ model });
    }
  }
}

export default Controller;
