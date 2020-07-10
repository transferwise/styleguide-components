import { getValidationFailures } from '../../json-schema/validation/validation-failures';
import { isNull, isUndefined } from '../../json-schema/validation/type-validators';

class FieldController {
  constructor(RequirementsService) {
    this.RequirementsService = RequirementsService;
    this.changed = false;
    this.touched = false;
  }

  $onChanges(changes) {
    if (changes.initialField) {
      this.field = this.RequirementsService.prepField(this.initialField);

      this.control = this.RequirementsService.getControlType(changes.initialField.currentValue);

      // TODO we should probably do this at fieldset level, so the model is available
      if (this.field.valuesAsync) {
        this.RequirementsService.prepValuesAsync(this.field, {});
      }

      // If the field is required, and only allows one value, set it to that
      if (this.required && this.field.enum && this.field.enum.length === 1) {
        this.model = this.field.enum[0];
      }

      if (this.field.default && !this.model) {
        this.model = this.field.default;
      }

      const globalValidationMessages = this.validationMessages || {};
      const fieldValidationMessages = this.field.validationMessages || {};

      this.validationStrings = { ...globalValidationMessages, ...fieldValidationMessages };

      this.validate(this.model);
    }
  }

  onFocus() {
    if (this.focusHandler) {
      this.focusHandler();
    }
  }

  onBlur() {
    this.touched = true;

    if (this.blurHandler) {
      this.blurHandler();
    }
  }

  onChange(newValue) {
    this.changed = true;
    this.validate(newValue);

    if (this.changeHandler) {
      this.changeHandler({ value: newValue });
    }
    if (this.errorMessage) {
      delete this.errorMessage;
    }
  }

  validate(value) {
    // Our controls return null for invalid values
    if (isNull(value) || isUndefined(value)) {
      if (this.required) {
        this.failures = ['required'];
        return;
      }

      if (this.field.type === 'string') {
        value = '';
      }
    }

    this.failures = getValidationFailures(value, this.field, this.required);
  }

  onPersistAsyncFailure(response) {
    // Interrogate response and extract error message
    if (!this.uploadOptions) {
      this.uploadOptions = {};
    }

    if (response.originalData) {
      // frontend-common has an interceptor that sometimes changes the response
      // format, moving the response data under a new key 'originalData'
      this.extractErrors(response.originalData);
    } else if (response.data) {
      // When we do id pre eval, we get error messages and validations back in
      // the response, extract them and pass back to be shown in the upload.
      this.extractErrors(response.data);
    }
  }

  extractErrors(data) {
    // Note: error data can manipulated by interceptors, this ensures we still get data needed
    if (data.message) {
      this.uploadOptions.failureText = data.message;
    }

    if (Array.isArray(data.errors)) {
      // Only show the first two validation messages
      this.uploadOptions.validationMessages = data.errors.map(error => error.message).slice(0, 2);
    }
  }

  onPersistAsyncSuccess(response) {
    if (!this.uploadOptions) {
      this.uploadOptions = {};
    }

    // These are too specific to one use case.
    if (response) {
      this.uploadOptions.successText = response.data.message;
    }
  }

  // eslint-disable-next-line
  isLabelShown(controlType) {
    if (controlType === 'file' || controlType === 'checkbox') {
      return false;
    }
    return true;
  }

  isHelpShown() {
    return !!this.field.help;
  }

  isDesriptionShown() {
    return (
      this.description
      && !this.isErrorShown()
      && !this.isWarningShown()
      && this.field.type !== 'boolean'
    );
  }

  isWarningShown() {
    return !!this.warningMessage;
  }

  isErrorShown() {
    return (
      ((this.submitted || (this.touched && this.changed)) && this.failures.length > 0)
      || this.errorMessage
    );
  }

  isAlertShown() {
    return this.isErrorShown();
  }

  getOptions() {
    if (this.field.type === 'array' && this.field.items) {
      return this.field.items.values;
    }

    return this.field.values;
  }
}

FieldController.$inject = ['TwRequirementsService'];

export default FieldController;
