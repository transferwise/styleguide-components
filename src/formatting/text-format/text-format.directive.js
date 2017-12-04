import TextFormatController from './text-format.controller.js';

function TextFormat() {
  return {
    restrict: 'A',
    require: 'ngModel',
    bindToController: true,
    controllerAs: '$ctrl',
    scope: {
      ngModel: '<',
      twTextFormat: '@'
    },
    controller: TextFormatController
  };
}

export default TextFormat;
