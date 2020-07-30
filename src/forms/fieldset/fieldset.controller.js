import angular from 'angular';

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
    this.internalModel = this.parseModel();
    if (!this.requiredFields) {
      this.requiredFields = [];
    }

    if (!this.validationMessages) {
      this.validationMessages = {
        required: 'Required',
        pattern: 'Incorrect format',
        minimum: 'The value is too low',
        maximum: 'The value is too high',
        minLength: 'The value is too short',
        maxLength: 'The value is too long'
      };
    }

    this.$scope.$watch('twFieldset.$valid', (validity) => {
      this.isValid = validity;
    });

    this.submitted = false;

    // TODO can we add asyncvalidator here? - prob not
  }

  $onChanges(changes) {
    const fieldsChanged = changes.initialFields;
    if (fieldsChanged) {
      if (!angular.equals(fieldsChanged.currentValue, fieldsChanged.previousValue)) {
        this.fields = this.RequirementsService.prepFields(
          fieldsChanged.currentValue,
          this.model,
          this.validationMessages
        );
        this.internalModel = this.parseModel();

        if (!this.requiredFields || !this.requiredFields.length) {
          this.requiredFields = this.RequirementsService.getRequiredFields(this.fields);
        }
      }
    }
  }

  parseModel() {
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
    return { ...this.model, ...parsedValues };
  }

  stringifyObjectsInModel() {
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

    return { ...this.internalModel, ...stringifiedValues };
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
      this.model = this.stringifyObjectsInModel();
      if (this.onFieldChange) {
        if (field && field.control === 'checkbox-group') {
          this.onFieldChange({ value: JSON.stringify(value), key, field });
        } else {
          this.onFieldChange({ value, key, field });
        }
      }

      if (this.onModelChange) {
        this.onModelChange({ model: this.model });
      }

      if (field.refreshRequirementsOnChange && this.onRefreshRequirements) {
        this.onRefreshRequirements({ model: this.model });
      }
    });
  }

  refreshRequirements() {
    if (this.onRefreshRequirements) {
      this.onRefreshRequirements();
    }
  }

  isRequired(key) {
    return Array.isArray(this.requiredFields) && this.requiredFields.indexOf(key) >= 0;
  }

  setSubmitted() {
    this.submitted = true;
  }
}

FieldsetController.$inject = ['TwRequirementsService', '$scope', '$timeout'];

export default FieldsetController;
