import angular from 'angular';

class FieldsetController {
  constructor(TwRequirementsService, $scope) {
    this.RequirementsService = TwRequirementsService;
    this.$scope = $scope;
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

    if (this.rawFields) {
      this.fields = this.RequirementsService.prepFields(
        this.rawFields,
        this.model,
        this.validationMessages
      );
    }

    this.$scope.$watch('twFieldset.$valid', (validity) => {
      this.isValid = validity;
    });

    // TODO can we add asyncvalidator here? - prob not
  }

  $onChanges(changes) {
    if (changes.rawFields) {
      if (!angular.equals(changes.rawFields.currentValue, changes.rawFields.previousValue)) {
        this.fields = this.RequirementsService.prepFields(
          this.rawFields,
          this.model,
          this.validationMessages
        );
      }
    }
  }

  // eslint-disable-next-line
  fieldFocus(field) {
    if (this.onFieldFocus) {
      this.onFieldFocus({ field });
    }
  }

  fieldBlur(field) {
    if (this.onFieldBlur) {
      this.onFieldBlur({ field });
    }
    if (field.refreshRequirementsOnChange &&
      this.onRefreshRequirements) {
      this.onRefreshRequirements();
    }
  }

  fieldChange(field) {
    if (this.onFieldChange) {
      this.onFieldChange({ field });
    }
    if (controlRefreshesOnChange(field.control) &&
      field.refreshRequirementsOnChange &&
      this.onRefreshRequirements) {
      this.onRefreshRequirements();
    }
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
  '$scope'
];

export default FieldsetController;
