import angular from 'angular';
import DateService from '../../services/date/date.service.js';

function DateFormatService() {
  this.getDateFormat = (date, locale, patternName, hasWeekday, hasDayTime, hasSuffix) => {
    const dateService = new DateService();
    const weekday = dateService.getDayNamesForLocale(locale, 'long')[date.getDay()];
    let hasYear = true;
    let isShort = false;
    let year = date.getFullYear();
    let month = dateService.getMonthNamesForLocale(locale, 'long')[date.getMonth()];
    let monthDate = date.getDate();
    let result;

    // Apply the pattern
    switch (patternName) {
      case 'LongDateShortYear':
        if (locale !== 'ja') {
          year = date.getFullYear() % 100;
        }
        break;
      case 'LongDateNoYear':
        hasYear = false;
        break;
      case 'ShortDate':
        if (locale !== 'ja') {
          year = date.getFullYear() % 100;
        }
        month = date.getMonth();
        isShort = true;
        break;
      case 'ShortDateLongYear':
        month = date.getMonth();
        isShort = true;
        break;
      case 'ShortDateNoYear':
        month = date.getMonth();
        hasYear = false;
        isShort = true;
        break;
      default: // Includes 'LongDate'
        break;
    }

    // Add the suffix
    if (hasSuffix) {
      monthDate = addSuffix(monthDate, locale);
    }

    // Return the result
    if (isShort) {
      result = hasYear
        ? dateService.getYearMonthDateShortPresentation(year, month, monthDate, locale)
        : dateService.getMonthDateShortPresentation(month, monthDate, locale);
    } else {
      result = hasYear
        ? dateService.getYearMonthDatePresentation(year, month, monthDate, locale)
        : dateService.getMonthDatePresentation(month, monthDate, locale);
    }
    if (hasWeekday) {
      if (locale === 'ja') {
        result = `${result} (${weekday})`;
      } else {
        result = `${weekday} ${result}`;
      }
    }
    if (hasDayTime) {
      const dayTime = dateService.getDateTimePresentation(
        date.getHours(),
        date.getMinutes(),
        locale
      );
      result = `${result} ${dayTime}`;
    }
    return result;
  };

  function addSuffix(monthDate, locale) {
    let suffix;
    if (locale.startsWith('en')) {
      if ((monthDate >= 10) && (monthDate <= 20)) {
        suffix = 'th';
      } else {
        switch (monthDate % 10) {
          case 1:
            suffix = 'st';
            break;
          case 2:
            suffix = 'nd';
            break;
          case 3:
            suffix = 'rd';
            break;
          default:
            suffix = 'th';
            break;
        }
      }
      return `${monthDate}${suffix}`;
    }
    return monthDate;
  }
}

export default angular
  .module('tw.styleguide.formatting.date-format.service', [])
  .service('TwDateFormatService', DateFormatService).name;
