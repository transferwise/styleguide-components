import angular from 'angular';
import DateService from '../../services/date/index.js';

function DateFormatFilter(TwDateService) {
  return (date, locale) => {
    if (!date) {
      return date;
    }

    return TwDateService.getDateFormat(date, locale);
  };
}

DateFormatFilter.$inject = ['TwDateService'];

export default angular
  .module('tw.styleguide.formatting.date-format', [DateService])
  .filter('twDate', DateFormatFilter).name;
