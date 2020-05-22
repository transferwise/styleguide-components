import { isUndefined } from '../validation/type-validators';
import { getValidationFailures } from '../validation/validation-failures';
import { getValidModelParts } from '../validation/valid-model';

class Controller {
  $onInit() {
    this.key = Math.floor(100000000 * Math.random());

    this.lastModel = isUndefined(this.model) ? null : this.model;

    if (!this.model && this.schema.default) {
      this.onModelChange(this.schema.default);
    }
  }

  onModelChange(model) {
    const validModel = getValidModelParts(model, this.schema);

    this.validationKeys = getValidationFailures(validModel, this.schema, this.required);

    const broadcastModel = this.validationKeys.length ? null : validModel;

    if (this.onChange && broadcastModel !== this.lastModel) {
      this.onChange({ model: broadcastModel, schema: this.schema });
    }

    this.lastModel = broadcastModel;
  }

  getValidationMessages() {
    return (
      (this.schema && this.schema.validationMessages)
      || (this.translations && this.translations.validation)
      || null
    );
  }
}

export default Controller;
