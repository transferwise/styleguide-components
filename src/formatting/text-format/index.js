import angular from 'angular';
import UndoStackFactory from './undo-stack.service.js';
import TextFormatService from './text-format.service.js';
import TextFormatDirective from './text-format.directive.js';
import TextFormatFilter from './text-format.filter.js';

export default angular
  .module('tw.styleguide.formatting.text-format', [])
  .service('TwUndoStackFactory', UndoStackFactory)
  .service('TwTextFormatService', TextFormatService)
  .directive('twTextFormat', TextFormatDirective)
  .filter('twTextFormat', TextFormatFilter).name;
