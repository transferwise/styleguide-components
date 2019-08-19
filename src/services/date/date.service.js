
function DateService() {
  this.getLocaleDate = (date) => {
    if (!date) { date = new Date(); }
    return date.getDate();
  };

  this.getLocaleMonth = (date) => {
    if (!date) { date = new Date(); }
    return date.getMonth();
  };

  this.getLocaleFullYear = (date) => {
    if (!date) { date = new Date(); }
    return date.getFullYear();
  };

  // get UTC date for users current day
  this.getLocaleToday = () => {
    const now = new Date();
    return this.getUTCDateFromParts(
      this.getLocaleFullYear(now),
      this.getLocaleMonth(now),
      this.getLocaleDate(now)
    );
  };

  this.getUTCDate = (date) => {
    if (!date) { date = new Date(); }
    return date.getUTCDate();
  };

  this.getUTCMonth = (date) => {
    if (!date) { date = new Date(); }
    return date.getUTCMonth();
  };

  this.getUTCFullYear = (date) => {
    if (!date) { date = new Date(); }
    return date.getUTCFullYear();
  };

  this.getUTCToday = () => {
    const now = new Date();
    return this.getUTCDateFromParts(
      this.getUTCFullYear(now),
      this.getUTCMonth(now),
      this.getUTCDate(now)
    );
  };

  this.getLastDayOfMonth = (year, month) => {
    const lastDay = this.getUTCDateFromParts(year, month + 1, 0);
    return lastDay.getUTCDate();
  };

  this.getUTCDateFromParts = (year, month, day, hours, minutes, seconds) => {
    const date = new Date();
    date.setUTCFullYear(year, month, day);
    date.setUTCHours(hours || 0);
    date.setUTCMinutes(minutes || 0);
    date.setUTCSeconds(seconds || 0);
    date.setUTCMilliseconds(0);
    return date;
  };

  this.getLocaleDateFromParts = (year, month, day, hours, minutes, seconds) => {
    const date = new Date();
    date.setFullYear(year, month, day);
    date.setHours(hours || 0);
    date.setMinutes(minutes || 0);
    date.setSeconds(seconds || 0);
    date.setMilliseconds(0);
    return date;
  };

  this.getDatePartsFromIso = (isoDate) => {
    let hoursOffset = 0;
    let minutesOffset = 0;

    const year = parseInt(isoDate.substr(0, 4), 10);
    const month = parseInt(isoDate.substr(5, 2), 10) - 1;
    const day = parseInt(isoDate.substr(8, 2), 10);
    const hours = parseInt(isoDate.substr(11, 2), 10) || 0;
    const minutes = parseInt(isoDate.substr(14, 2), 10) || 0;
    const seconds = parseInt(isoDate.substr(17, 2), 10) || 0;

    // It's possible for the date to match the offset regex
    const stringAfterDate = isoDate.substring(10);
    const offsetRegex = '[+-]{1}[0-9]{2}(:[0-9]{2})?$';
    const offset = stringAfterDate.match(offsetRegex);

    if (offset) {
      // TODO if there are milliseconds, need to adjust this
      hoursOffset = parseInt(offset[0].substr(1, 2), 10) || 0;
      minutesOffset = parseInt(offset[0].substr(4, 2), 10) || 0;

      if (offset[0].substr(0, 1) === '-') {
        hoursOffset *= -1;
        minutesOffset *= -1;
      }
    }

    return [year, month, day, hours, minutes, seconds, hoursOffset, minutesOffset];
  };

  this.isIsoStringValid = (isoDate) => {
    const dateSection = '[0-9]{4}-[0-9]{2}-[0-9]{2}';
    const timeSection = 'T[0-9]{2}:[0-9]{2}:[0-9]{2}';
    const millisecondSection = '(.[0-9]{3})?';
    const zoneSection = '(Z|[+,-][0-9]{2}(:[0-9]{2})?)';
    const regex = new RegExp(`^${dateSection}(${timeSection}${millisecondSection}${zoneSection})?$`);
    return regex.test(isoDate);
  };

  this.getUTCDateFromIso = (isoDate) => {
    if (!this.isIsoStringValid(isoDate)) {
      return null;
    }

    const [
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
      hoursOffset,
      minutesOffset
    ] = this.getDatePartsFromIso(isoDate);

    return this.getUTCDateFromParts(
      year, month, day,
      hours + hoursOffset, minutes + minutesOffset, seconds
    );
  };


  // Sunday is first day of the week in JS
  this.getDayNamesForLocale = (locale, format) => {
    const days = [];
    const validFormat = getValidDateFormat(format);
    for (let day = 0; day < 7; day++) {
      days.push(this.getDayNameForLocale(day, locale, validFormat));
    }
    return days;
  };

  this.getDayNameForLocale = (dayOfWeek, locale, format) => {
    const defaultDayName = getDefaultDayName(dayOfWeek, locale, format);
    if (defaultDayName) {
      return defaultDayName;
    }

    const validLocale = getValidLocale(locale);
    const validFormat = getValidDateFormat(format);

    const date = this.getUTCDateFromParts(2006, 0, dayOfWeek + 1); // 2006 started with a Sunday

    const localDateName = getLocalisedDateName(date, validLocale, { weekday: 'long' });

    return localDateName || getDefaultDayName(dayOfWeek, 'en-GB', validFormat);
  };

  function getDefaultDayName(dayOfWeek, locale, format) {
    let defaultDayName;
    const language = getLanguageFromLocale(locale);

    if (DEFAULT_DAY_NAMES_BY_LANGUAGE[language]) {
      defaultDayName = DEFAULT_DAY_NAMES_BY_LANGUAGE[language][dayOfWeek];
    }

    if (defaultDayName) {
      if (format === 'short') {
        return defaultDayName.substr(0, 3);
      }
      if (format === 'narrow') {
        return defaultDayName.substr(0, 1);
      }
      return defaultDayName;
    }

    return null;
  }

  this.getMonthNamesForLocale = (locale, format) => {
    const months = [];
    const validFormat = getValidDateFormat(format);

    for (let month = 0; month < 12; month++) {
      months.push(this.getMonthNameForLocale(month, locale, validFormat));
    }

    return months;
  };

  this.getMonthNameForLocale = (month, locale, format) => {
    const defaultMonthName = getDefaultMonthName(month, locale, format);

    if (defaultMonthName) {
      return defaultMonthName;
    }

    const validLocale = getValidLocale(locale);
    const validFormat = getValidDateFormat(format);

    // Day in middle of month avoids timezone issues
    const date = this.getUTCDateFromParts(2000, month, 15);
    if (format === 'short') {
      month = getLocalisedDateName(date, validLocale, { month: 'long' });
      return (month.length > 4) ? month.slice(0, 3) : month;
    }
    const localMonthName = getLocalisedDateName(date, validLocale, { month: 'long' });

    return localMonthName || getDefaultMonthName(month, 'en-GB', validFormat);
  };

  function getDefaultMonthName(month, locale, format) {
    const language = getLanguageFromLocale(locale);

    if (language
      && DEFAULT_MONTH_NAMES_BY_LANGUAGE[language]
      && (format !== 'short' || language === 'ja')) {
      return DEFAULT_MONTH_NAMES_BY_LANGUAGE[language][month];
    }

    return null;
  }


  this.getWeekday = (year, month, day) => {
    const utcDate = this.getUTCDateFromParts(year, month, day);
    return utcDate.getUTCDay();
  };

  this.isMonthBeforeDay = (locale) => {
    const lang = getLanguageFromLocale(locale);
    return ((lang === 'ja') || (locale && locale.indexOf('US', locale.length - 2) !== -1));
  };

  this.isYearBeforeMonth = (locale) => {
    const lang = getLanguageFromLocale(locale);
    return (lang === 'ja');
  };

  this.addYears = (date, years) => this.addToDate(date, years, 0, 0);
  this.addMonths = (date, months) => this.addToDate(date, 0, months, 0);
  this.addDays = (date, days) => this.addToDate(date, 0, 0, days);

  this.addToDate = (date, years, months, days) => this.getUTCDateFromParts(
    date.getUTCFullYear() + years,
    date.getUTCMonth() + months,
    date.getUTCDate() + days
  );

  this.getLocaleTimeString = (date, locale) => this.getTimeString(
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    locale
  );

  this.getTimeString = (hours, minutes, seconds, locale) => {
    const lang = getLanguageFromLocale(locale);

    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (lang === 'en') {
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours %= 12;
      if (hours === 0) {
        hours = 12;
      }
      if (minutes === '00') {
        return `${hours}${ampm}`;
      }
      return `${hours}:${minutes}${ampm}`;
    }
    return `${hours}:${minutes}`;
  };

  this.getYearAndMonthPresentation = (year, month, locale, format) => {
    const yearName = getYearName(year, locale);
    const monthName = this.getMonthNameForLocale(month, locale, format || 'long');

    const language = getLanguageFromLocale(locale);
    const delimiter = getDelimiter(language);

    if (this.isYearBeforeMonth(locale)) {
      return [yearName, monthName].join(delimiter);
    }
    return [monthName, yearName].join(delimiter);
  };

  this.getYearMonthDatePresentation = (year, month, day, locale, format) => {
    const yearName = getYearName(year, locale);
    const monthName = this.getMonthNameForLocale(month, locale, format || 'long');
    const dateName = getDateName(day, locale);

    const language = getLanguageFromLocale(locale);
    const delimiter = getDelimiter(language);

    if (this.isYearBeforeMonth(locale)) {
      return [yearName, monthName, dateName].join(delimiter);
    }
    if (this.isMonthBeforeDay(locale)) {
      const dateString = [monthName, dateName].join(delimiter);
      return `${dateString}, ${yearName}`;
    }
    return [dateName, monthName, yearName].join(delimiter);
  };

  this.getLocaleNow = () => new Date();

  this.getUTCNow = () => {
    const now = new Date();
    return this.getUTCDateFromParts(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    );
  };

  this.getLocaleDateString = (date, locale, format) => {
    // Check that the date exists
    if (!date.getFullYear) {
      return date;
    }

    // Initialize variables
    const now = this.getLocaleNow();

    return this.getDateString(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getDay(),
      locale,
      date - now,
      now.getFullYear(),
      format
    );
  };

  this.getUTCDateString = (date, locale, format) => {
    // Check that the date exists
    if (!date) {
      return date;
    }

    const now = this.getUTCNow();

    return this.getDateString(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCDay(),
      locale,
      date - now,
      now.getUTCFullYear(),
      format
    );
  };

  this.getDateString = (
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    dayOfWeek,
    locale,
    offset,
    currentYear,
    format
  ) => {
    const sixDays = 144 * 60 * 60 * 1000;
    const eightDays = 8 * 24 * 60 * 60 * 1000;

    const hasTime = Math.abs(offset) < sixDays && format !== 'long';
    const hasDate = !hasTime;
    const hasWeekday = Math.abs(offset) < eightDays || format === 'long';
    const hasMonth = !hasWeekday || format === 'long';
    const hasYear = (!hasWeekday && currentYear !== year) || format === 'long';

    const yearName = hasYear ? getYearName(year, locale) : '';
    const monthName = hasMonth ? this.getMonthNameForLocale(
      month,
      locale,
      format === 'short' ? 'short' : 'long'
    ) : '';
    const dateName = hasDate ? getDateName(day, locale) : '';
    const weekdayName = hasWeekday ? this.getDayNameForLocale(
      dayOfWeek,
      locale,
      format === 'short' ? 'short' : 'long'
    ) : '';
    const timeName = hasTime ? this.getTimeString(hours, minutes, seconds, locale) : '';

    return this.combineDateParts(yearName, monthName, dateName, timeName, weekdayName, locale);
  };

  this.combineDateParts = (yearName, monthName, dateName, timeName, dayName, locale) => {
    const lang = getLanguageFromLocale(locale);
    const delimiter = getDelimiter(lang);

    let dateString;

    if (this.isYearBeforeMonth(locale)) {
      dateString = [yearName, monthName, dateName].join(delimiter).trim();
    } else if (this.isMonthBeforeDay(locale)) {
      dateString = [monthName, dateName].join(delimiter).trim();
      if (yearName) {
        dateString += `, ${yearName}`;
      }
    } else {
      dateString = [dateName, monthName, yearName].join(delimiter).trim();
    }

    if (dayName) {
      if (lang === 'ja') {
        return `${dateString} ${timeName} (${dayName})`.trim();
      }
      // For longer dates use a comma
      if (monthName || yearName) {
        dateString = `${dayName}, ${dateString}`.trim();
      } else {
        dateString = `${dayName} ${dateString}`.trim();
      }
    }
    dateString = `${dateString} ${timeName}`;

    return dateString.trim();
  };

  function getDateName(dayOfMonth, locale) {
    const lang = getLanguageFromLocale(locale);
    const suffix = getSuffix(DAY_SUFFIXES_BY_LANGUAGE, dayOfMonth, lang) || '';
    return `${dayOfMonth}${suffix}`;
  }

  function getYearName(year, locale) {
    const lang = getLanguageFromLocale(locale);
    const suffix = getSuffix(YEAR_SUFFIXES_BY_LANGUAGE, year, lang);
    return `${year}${suffix}`;
  }

  function getLocalisedDateName(date, locale, formattingObject) {
    if (!date.toLocaleDateString) {
      return null;
    }

    let name = date.toLocaleDateString(locale, formattingObject);

    if (isLocaleTranslationRequiresStripping(locale)) {
      // strip out any numbers, spaces, commas and dots in case browser (cough...Safari)
      // doesn't respect format
      name = name.replace(/[0-9]|\s|,|\./g, '');
    }

    return name[0].toUpperCase() + name.substring(1);
  }

  function getValidDateFormat(format) {
    const validFormats = ['narrow', 'short', 'long'];
    if (!format || validFormats.indexOf(format) < 0) {
      return 'long';
    }
    return format;
  }

  function getValidLocale(locale) {
    if (!isIntlSupportedForLocale(locale)) {
      return 'en-GB';
    }
    return locale;
  }

  function isIntlSupportedForLocale(locale) {
    try {
      const supportedLocales = window.Intl.DateTimeFormat.supportedLocalesOf([locale]);
      return supportedLocales.length > 0;
    } catch (error) {
      return false;
    }
  }

  function isLocaleTranslationRequiresStripping(locale) {
    if (!locale) {
      return true;
    }

    const lang = getLanguageFromLocale(locale);
    if (lang === 'ja') {
      return false;
    }

    return true;
  }

  function getLanguageFromLocale(locale) {
    if (!locale) {
      return 'en';
    }
    return locale.substring(0, 2);
  }

  function getDelimiter(lang) {
    return (DELIMITERS_BY_LANGUAGE[lang] !== undefined) ? DELIMITERS_BY_LANGUAGE[lang] : ' ';
  }

  function getSuffix(suffixes, value, lang) {
    if (!suffixes[lang]) {
      return '';
    }
    if (suffixes[lang].exactMatch && suffixes[lang].exactMatch[value]) {
      return suffixes[lang].exactMatch[value];
    }
    if (suffixes[lang].endsWith && suffixes[lang].endsWith[value % 10]) {
      return suffixes[lang].endsWith[value % 10];
    }
    return suffixes[lang].default;
  }

  const DEFAULT_MONTH_NAMES_BY_LANGUAGE = {
    en: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    ja: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月'
    ]
  };

  const DEFAULT_DAY_NAMES_BY_LANGUAGE = {
    en: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    ja: [
      '日', '月', '火', '水', '木', '金', '土'
    ]
  };

  const DAY_SUFFIXES_BY_LANGUAGE = {
    en: {
      exactMatch: {
        11: 'th',
        12: 'th',
        13: 'th'
      },
      endsWith: {
        1: 'st',
        2: 'nd',
        3: 'rd'
      },
      default: 'th'
    },
    de: {
      default: '.'
    },
    fi: {
      default: '.'
    },
    ja: {
      default: '日'
    }
  };

  const YEAR_SUFFIXES_BY_LANGUAGE = {
    ja: {
      default: '年'
    }
  };

  const DELIMITERS_BY_LANGUAGE = {
    ja: ''
  };
}

export default DateService;
