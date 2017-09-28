import angular from 'angular';

import TextFormatDirective from './text-format/text-format.directive.js';
import TextFormatFilter from './text-format/text-format.filter.js';
import DateFormatFilter from './date-format/date-format.filter.js';
import DateTimeFormatFilter from './date-format/date-time-format.filter.js';

export default angular.module('tw.styleguide.formatting', [
  TextFormatDirective,
  TextFormatFilter,
  DateFormatFilter,
  DateTimeFormatFilter
]).name;
