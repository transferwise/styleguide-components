import angular from 'angular';

import TextFormatDirective from './text-format/tw-text-format.directive.js';
import TextFormatFilter from './text-format/tw-text-format.filter.js';

export default angular.module('tw.styleguide.formatting', [
  TextFormatDirective,
  TextFormatFilter
]).name;
