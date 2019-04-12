import { getValidationFailures } from '../utils/validation-failures';

class Controller {
  $onInit() {
    this.key = Math.floor(100000000 * Math.random());

    if (!this.model && this.schema.default) {
      this.onModelChange(this.schema.default);
    }
  }

  onModelChange(model) {
    this.validationKeys = getValidationFailures(model, this.schema, this.required);

    if (this.onChange) {
      this.onChange({ model, schema: this.schema });
    }
  }

  getValidationMessages() {
    return (this.schema && this.schema.validationMessages) ||
      (this.translations && this.translations.validation) || null;
  }
}

export default Controller;
