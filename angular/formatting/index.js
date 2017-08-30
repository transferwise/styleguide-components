import angular from 'angular';

import TextFormatDirective from './text-format/text-format.directive.js';
import TextFormatFilter from './text-format/text-format.filter.js';

export default angular.module('tw.styleguide.formatting', [
  TextFormatDirective,
  TextFormatFilter
]).name;