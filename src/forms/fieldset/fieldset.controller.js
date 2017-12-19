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

    // this.$scope.$watch('$ctrl.fields', (newValue, oldValue) => {
    //   if (!angular.equals(newValue, oldValue)) {
    //     this.fields = this.RequirementsService.prepFields(
    //       this.rawFields,
    //       this.model,
    //       this.validationMessages
    //     );
    //   }
    // });

    // this.$scope.$watch('twFieldset.$valid', (validity) => {
    //   this.isValid = validity;
    // });

    // TODO can we add asyncvalidator here? - prob not
  }

  $onChanges(changes) {
    if (changes.$valid) {
      console.log(`validity changed: ${changes.$valid.currentValue}`);
      this.isValid = changes.$valid.currentValue;
    }

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
  onFieldFocus(field) {

  }

  onFieldBlur(field) {
    if (field.refreshRequirementsOnChange &&
      this.onRefreshRequirements) {
      this.onRefreshRequirements();
    }
  }

  onFieldChange(field) {
    if (fieldTypeRefreshesOnChange(field.type) &&
      field.refreshRequirementsOnChange &&
      this.onRefreshRequirements) {
      this.onRefreshRequirements();
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
