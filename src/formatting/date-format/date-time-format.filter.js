import angular from 'angular';
import DateService from '../../services/date/index.js';

function DateTimeFormatFilter(TwDateService) {
  return (date, locale) => {
    if (!date) {
      return date;
    }

    const dateText = TwDateService.getDateFormat(date, locale);
    const timeText = TwDateService.getTimePresentation(
      date.getHours(),
      date.getMinutes(),
      locale
    );
    return `${dateText} ${timeText}`;
  };
}

DateTimeFormatFilter.$inject = ['TwDateService'];

export default angular
  .module('tw.styleguide.formatting.date-time-format', [DateService])
  .filter('twDateTime', DateTimeFormatFilter).name;
