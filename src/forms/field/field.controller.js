class FieldController {
  constructor(RequirementsService) {
    this.RequirementsService = RequirementsService;
  }

  $onChanges(changes) {
    if (changes.initialField) {
      this.field = copyJSON(this.initialField);

      this.control = this.RequirementsService.getControlType(
        changes.initialField.currentValue
      );

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

      if (this.validationMessages && !this.field.validationMessages) {
        this.field.validationMessages = this.validationMessages;
      }
    }
  }

  onFocus() {
    if (this.focusHandler) {
      this.focusHandler();
    }
  }

  onBlur() {
    if (this.blurHandler) {
      this.blurHandler();
    }
  }

  onChange(newValue) {
    if (this.changeHandler) {
      this.changeHandler({ value: newValue });
    }
    if (this.errorMessage) {
      delete this.errorMessage;
    }
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
  sizeOf(obj) {
    return obj ? Object.keys(obj).length : 0;
  }

  getOptions() {
    if (this.field.type === 'array' && this.field.items) {
      return this.field.items.values;
    }

    return this.field.values;
  }

  // eslint-disable-next-line
  isFeedbackDetached(controlType) {
    if (controlType === 'date'
        || controlType === 'file'
        || controlType === 'radio'
        || controlType === 'tel') {
      return true;
    }
    return false;
  }
}

function copyJSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}

FieldController.$inject = ['TwRequirementsService'];

export default FieldController;
