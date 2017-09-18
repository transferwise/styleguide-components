import ValidationController from './control-validation.controller.js';

function TwValidation() {
  return {
    restrict: 'A',
    require: {
      $ngModel: 'ngModel',
    },
    controller: ValidationController
  };
}

export default TwValidation;
