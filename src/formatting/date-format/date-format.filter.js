import angular from 'angular';
import moment from 'moment';
import DateFormatService from './date-format.service.js';

function DateFormatFilter(TwDateFormatService) {
  return (date, locale, patternName) => {
    let format;
    if (!date) {
      return date;
    }

    if (locale) {
      moment.locale(locale);
    }

    switch (moment.locale()) {
      case 'ja':
        format = TwDateFormatService.getJaFormat(patternName);
        break;
      default:
        format = TwDateFormatService.getDefaultFormat(patternName);
        break;
    }

    return moment(date).format(format);
  };
}

DateFormatFilter.$inject = ['TwDateFormatService'];

export default angular
  .module('tw.styleguide.formatting.date-format', [DateFormatService])
  .filter('twDateFormat', DateFormatFilter).name;
