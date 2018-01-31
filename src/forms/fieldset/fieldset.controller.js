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

    if (!this.validationMessages) {
      this.validationMessages = {
        required: 'Required',
        pattern: 'Incorrect format',
        minimum: 'The value is too low',
        maximum: 'The value is too high',
        minlength: 'The value is too short',
        maxlength: 'The value is too long'
      };
    }

    this.$scope.$watch('twFieldset.$valid', (validity) => {
      this.isValid = validity;
    });

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
      }
    }
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
    if (field.refreshRequirementsOnChange &&
      this.onRefreshRequirements) {
      this.onRefreshRequirements();
    }
  }

  fieldChange(value, key, field) {
    if (typeof value === 'undefined') {
      delete this.model[key];
    }
    if (this.onFieldChange) {
      this.onFieldChange({ value, key, field });
    }

    if (controlRefreshesOnChange(field.control) &&
      field.refreshRequirementsOnChange &&
      this.onRefreshRequirements) {
      this.onRefreshRequirements();
    }

    // We remove custom error messages on change, as they're no longer relevant
    if (this.errorMessages && this.errorMessages[key]) {
      delete this.errorMessages[key];
    }

    // Delay so model can update
    this.$timeout(() => {
      if (this.onModelChange) {
        this.onModelChange({ model: this.model });
      }
    });
  }
}

function controlRefreshesOnChange(control) {
  return control === 'select' ||
    control === 'checkbox' ||
    control === 'radio' ||
    control === 'date' ||
    control === 'upload';
}

FieldsetController.$inject = [
  'TwRequirementsService',
  '$scope',
  '$timeout'
];

export default FieldsetController;
