import angular from 'angular';

import TextFormatDirective from './text-format/text-format.directive.js';
import TextFormatFilter from './text-format/text-format.filter.js';
import DateFormat from './date-format/';
import NumberFormat from './number-format/';

export default angular.module('tw.styleguide.formatting', [
  TextFormatDirective,
  TextFormatFilter,
  DateFormat,
  NumberFormat
]).name;
