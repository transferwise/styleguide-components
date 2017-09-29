import angular from 'angular';
import DateService from '../../services/date/index.js';

function DateFormatFilter(TwDateService) {
  return (date, locale) => {
    if (!date) {
      return date;
    }

    if (typeof date === 'string' && new Date(date)) {
      date = new Date(date);
    }

    return TwDateService.getLocaleDateString(date, locale);
  };
}

DateFormatFilter.$inject = ['TwDateService'];

export default angular
  .module('tw.styleguide.formatting.date', [DateService])
  .filter('twDate', DateFormatFilter).name;
