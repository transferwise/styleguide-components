import { validateSchema } from '../validation/validation.js';

class Controller {
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
