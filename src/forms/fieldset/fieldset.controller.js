import angular from 'angular';
import { getValidModelParts } from '../../json-schema/validation/valid-model';
import { isUndefined } from '../../json-schema/validation/type-validators';
import { isValidSchema } from '../../json-schema/validation/schema-validators';

class FieldsetController {
  constructor(TwRequirementsService, $scope, $timeout) {
    this.RequirementsService = TwRequirementsService;
    this.$scope = $scope;
    this.$timeout = $timeout;
  }

  $onInit() {
    if (!this.model) {
      this.model = {};
    }

    this.internalModel = this.parseArrayStringsInModel(this.model);

    const defaultMessages = {
      required: 'Required',
      pattern: 'Incorrect format',
      minimum: 'The value is too low',
      maximum: 'The value is too high',
      minLength: 'The value is too short',
      maxLength: 'The value is too long'
    };

    this.validationMessages = { ...defaultMessages, ...this.validationMessages };

    this.submitted = false;
    // TODO can we add asyncvalidator here? - prob not

    this.validate();
    this.triggerOnModelChange();
  }

  $onChanges(changes) {
    if (changes.initialFields) {
      this.onPropsFieldChange(changes.initialFields);
    }

    if (changes.model) {
      this.onPropsModelChange(changes.model);
    }
  }

  onPropsFieldChange(fieldChanges) {
    // Deep compare, do nothing if no changes
    if (angular.equals(fieldChanges.currentValue, fieldChanges.previousValue)) {
      return;
    }

    this.fields = this.RequirementsService.prepFields(
      fieldChanges.currentValue,
      this.model,
      this.validationMessages
    );

    this.requiredFields = this.RequirementsService.getRequiredFields(this.fields);

    this.validate();

    // Remove any model values that are now invalid
    const oldModel = this.internalModel;
    const schema = convertFieldsToObject(this.fields, this.requiredFields);
    const newModel = getValidModelParts(oldModel, schema);

    // Valid model returns null, not undefined so we must check oldModel
    if (!isUndefined(oldModel) && !angular.equals(newModel, oldModel)) {
      this.internalModel = newModel;
      this.model = newModel;

      this.validate(); // Revalidate if the model changed
      this.triggerOnModelChange();
    }
  }

  onPropsModelChange(modelChanges) {
    // When the model changes convert array strings to real arrays (for checkbox-group)
    this.internalModel = this.parseArrayStringsInModel(modelChanges.currentValue);
    this.validate();
  }

  /**
   * We have a limitation in V2 dynamic forms where the server needs a string
   * { a: "[1]"} => { a: [1] }
   */
  parseArrayStringsInModel(model) {
    const parsedValues = {};
    Object.keys(this.fields).forEach((key) => {
      if (
        this.fields[key].control === 'checkbox-group'
        && this.model
        && typeof this.model[key] === 'string'
      ) {
        parsedValues[key] = JSON.parse(this.model[key]);
      }
    });
    return { ...model, ...parsedValues };
  }

  /**
   * We have a limitation in V2 dynamic forms where the server needs a string
   * { a: [1]} => { a: "[1]"" }
   */
  stringifyArraysInModel(model) {
    const stringifiedValues = {};
    Object.keys(this.fields).forEach((key) => {
      if (
        this.fields[key].control === 'checkbox-group'
        && this.internalModel
        && this.internalModel[key]
      ) {
        stringifiedValues[key] = JSON.stringify(this.internalModel[key]);
      }
    });

    return { ...model, ...stringifiedValues };
  }

  fieldFocus(key, field) {
    if (this.onFieldFocus) {
      this.onFieldFocus({ key, field });
    }
  }

  fieldBlur(key, field) {
    if (this.onFieldBlur) {
      this.onFieldBlur({ key, field });
    }
  }

  fieldChange(value, key, field) {
    if (typeof value === 'undefined') {
      delete this.internalModel[key];
    }

    // We remove custom error messages on change, as they're no longer relevant
    if (this.errorMessages && this.errorMessages[key]) {
      delete this.errorMessages[key];
    }

    // Delay so model can update
    this.$timeout(() => {
      this.model = this.stringifyArraysInModel(this.internalModel);
      if (this.onFieldChange) {
        if (field && field.control === 'checkbox-group') {
          this.onFieldChange({ value: JSON.stringify(value), key, field });
        } else {
          this.onFieldChange({ value, key, field });
        }
      }

      this.validate();
      this.triggerOnModelChange();

      if (field.refreshRequirementsOnChange) {
        this.triggerRefreshRequirements();
      }
    });
  }

  validate() {
    const schema = convertFieldsToObject(this.fields, this.requiredFields);

    const oldIsValid = this.isValid;
    this.isValid = isValidSchema(this.internalModel, schema);

    if (oldIsValid !== this.isValid && this.onValidityChange) {
      this.onValidityChange({ isValid: this.isValid });
    }
  }

  triggerOnModelChange() {
    if (this.onModelChange) {
      this.onModelChange({ model: this.model, isValid: this.isValid });
    }
  }

  triggerRefreshRequirements() {
    if (this.onRefreshRequirements) {
      this.onRefreshRequirements({ model: this.model });
    }
  }

  isRequired(key) {
    return Array.isArray(this.requiredFields) && this.requiredFields.indexOf(key) >= 0;
  }

  setSubmitted() {
    this.submitted = true;
  }
}

function convertFieldsToObject(fields, requiredFields) {
  return {
    type: 'object',
    properties: fields,
    required: requiredFields
  };
}

FieldsetController.$inject = ['TwRequirementsService', '$scope', '$timeout'];

export default FieldsetController;
