import { validateSchema } from '../validation/validation.js';

class Controller {
  $onInit() {
    this.key = Math.floor(100000000 * Math.random());

    if (!this.model && this.schema.default) {
      this.onModelChange(this.schema.default);
    }
  }

  onModelChange(model) {
    this.validationKeys = validateSchema(model, this.schema);

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
