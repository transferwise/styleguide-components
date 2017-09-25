import angular from 'angular';

function DateFormatService() {
  this.getDefaultFormat = (patternName) => {
    switch (patternName) {
      case 'LongDate':
        return 'D MMMM YYYY';
      case 'LongDateShortYear':
        return 'D MMMM YY';
      case 'LongDateWeekday':
        return 'dddd D MMMM YYYY';
      default:
        return 'D MMMM YYYY';
    }
  };

  this.getJaFormat = (patternName) => {
    switch (patternName) {
      case 'LongDate':
        return 'YYYY MMMM Do';
      case 'LongDateShortYear':
        return 'YY MMMM Do';
      case 'LongDateWeekday':
        return 'YYYY MMMM Do dddd';
      default:
        return 'YYYY MMMM Do';
    }
  };
}

export default angular
  .module('tw.styleguide.formatting.date-format.service', [])
  .service('TwDateFormatService', DateFormatService).name;
