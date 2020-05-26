import { isUndefined, isNull } from '../validation/type-validators';
import { getValidationFailures } from '../validation/validation-failures';
import { getValidModelParts } from '../validation/valid-model';

class Controller {
  $onInit() {
    this.key = Math.floor(100000000 * Math.random());
  }

  $onChanges(changes) {
    if (changes.model) {
      this.handleNewModelFromParent(changes.model.currentValue);
    }
  }

  handleNewModelFromParent(model) {
    if (isUndefined(model) || isNull(model)) {
      // Don't overwrite internal model when receiving invalid
      if (!isUndefined(this.internalModel) && !isNull(this.internalModel)) {
        return;
      }

      if (this.schema.default) {
        this.onModelChange(this.schema.default);
      } else {
        this.lastModel = null;
        this.internalModel = null;
      }
    } else {
      this.lastModel = model;
      this.internalModel = model;
    }
  }

  onModelChange(model) {
    const validModel = getValidModelParts(model, this.schema);

    this.validationKeys = getValidationFailures(validModel, this.schema, this.required);

    const broadcastModel = this.validationKeys.length ? null : validModel;

    if (!isNull(broadcastModel)) {
      this.internalModel = model;
    }

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
