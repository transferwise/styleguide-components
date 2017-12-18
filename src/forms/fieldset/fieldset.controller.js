import angular from 'angular';

class FieldsetController {
  constructor($scope, $http, TwRequirementsService) {
    this.$scope = $scope;
    this.$http = $http;
    this.RequirementsService = TwRequirementsService;
  }

  $onInit() {
    if (!this.model) {
      this.model = {};
    }

    if (!this.validationMessages) {
      this.validationMessages = {
        required: 'Required',
        pattern: 'Incorrect format',
        min: 'The value is too low',
        max: 'The value is too high',
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

    this.$scope.$watch('$ctrl.fields', (newValue, oldValue) => {
      if (!angular.equals(newValue, oldValue)) {
        this.fields = this.RequirementsService.prepFields(
          this.rawFields,
          this.model,
          this.validationMessages
        );
      }
    });

    this.$scope.$watch('twFieldset.$valid', (validity) => {
      this.isValid = validity;
    });

    // TODO can we add asyncvalidator here? - prob not
  }

  onBlur(field) {
    this.removeFieldError(field.key);

    if (!field.refreshRequirementsOnChange) {
      // eslint-disable-next-line no-useless-return
      return;
    }
    // TODO disabled the form while we refresh requirements?
    if (this.onRefreshRequirements) {
      // Should post the current model back to the requirements end
      // point and update the requirements.
      if (!fieldTypeRefreshesOnChange(field.type)) {
        this.onRefreshRequirements();
      }
    }
  }

  onChange(field) {
    this.removeFieldError(field.key);
    if (fieldTypeRefreshesOnChange(field.type)) {
      this.onRefreshRequirements();
    }
  }

  removeFieldError(fieldKey) {
    if (this.errorMessages) {
      delete this.errorMessages[fieldKey];
    }
  }
}

function fieldTypeRefreshesOnChange(fieldType) {
  return fieldType === 'select' ||
    fieldType === 'checkbox' ||
    fieldType === 'radio' ||
    fieldType === 'date' ||
    fieldType === 'upload';
}

FieldsetController.$inject = [
  '$scope',
  '$http',
  'TwRequirementsService'
];

export default FieldsetController;
