import TextFormatController from './text-format.controller.js';
import UndoStackFactory from './undo-stack.service.js';
import TextFormatService from './text-format.service.js';

function TextFormat() {
  return {
    restrict: 'A',
    require: 'ngModel',
    bindToController: true,
    controllerAs: '$ctrl',
    scope: {
      ngModel: '<',
      twTextFormat: "@"
    },
    controller: TextFormatController
  };
}

export default angular
  .module('tw.styleguide.formatting.text-format', [])
  .service('TwUndoStackFactory', UndoStackFactory)
  .service('TwTextFormatService', TextFormatService)
  .directive('twTextFormat', TextFormat).name;
