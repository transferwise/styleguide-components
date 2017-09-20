import angular from 'angular';
import TextFormatDirective from './text-format.directive.js';
import TextFormatFilter from './text-format.filter.js';

export default angular
  .module('tw.styleguide.formatting.text-format', [
    TextFormatDirective,
    TextFormatFilter
  ]);
