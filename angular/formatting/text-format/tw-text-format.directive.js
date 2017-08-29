import TwTextFormatController from './tw-text-format.controller.js';
import TwUndoStackFactory from './undo-stack.service.js';
import TwTextFormatService from './tw-text-format.service.js';

function TwTextFormat() {
  return {
    restrict: 'A',
    require: 'ngModel',
    bindToController: true,
    controllerAs: '$ctrl',
    scope: {
      ngModel: '<',
      twTextFormat: "@"
    },
    controller: TwTextFormatController
  };
}

export default angular
  .module('tw.styleguide.styling.text-format', [])
  .service('TwUndoStackFactory', TwUndoStackFactory)
  .service('TwTextFormatService', TwTextFormatService)
  .directive('twTextFormat', TwTextFormat).name;
