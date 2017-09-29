import angular from 'angular';
import DateService from '../../services/date/index.js';

function DateTimeFormatFilter(TwDateService) {
  return (date, locale) => {
    if (!date) {
      return date;
    }

    if (typeof date === 'string' && new Date(date)) {
      date = new Date(date);
    }

    const dateText = TwDateService.getLocaleDateString(date, locale);
    const timeText = TwDateService.getLocaleTimeString(date, locale);
    return `${dateText} ${timeText}`;
  };
}

DateTimeFormatFilter.$inject = ['TwDateService'];

export default angular
  .module('tw.styleguide.formatting.date-time', [DateService])
  .filter('twDateTime', DateTimeFormatFilter).name;
