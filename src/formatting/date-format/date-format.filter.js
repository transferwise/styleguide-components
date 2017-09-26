import angular from 'angular';
import DateFormatService from './date-format.service.js';

function DateFormatFilter(TwDateFormatService) {
  return (date, locale, patternName, hasWeekday, hasDayTime, hasSuffix) => {
    if (!date) {
      return date;
    }

    return TwDateFormatService.getDateFormat(
      date,
      locale,
      patternName,
      hasWeekday,
      hasDayTime,
      hasSuffix
    );
  };
}

DateFormatFilter.$inject = ['TwDateFormatService'];

export default angular
  .module('tw.styleguide.formatting.date-format', [DateFormatService])
  .filter('twDateFormat', DateFormatFilter).name;
