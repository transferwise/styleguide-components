import { validateSchema } from '../validation/validation.js';

class Controller {
  $onInit() {
    this.key = Math.floor(100000000 * Math.random());
  }

  onModelChange(model) {
    this.validationKeys = validateSchema(model, this.schema);

    // console.log('validationKeys:', this.validationKeys); // eslint-disable-line

    if (this.onChange) {
      this.onChange({ model });
    }

    if (this.schema.refreshRequirementsOnChange && this.onRefresh) {
      this.onRefresh({ model });
    }
  }

  getValidationMessages() {
    return (this.schema && this.schema.validationMessages) ||
      (this.translations && this.translations.validation) || false;
  }
}

export default Controller;
