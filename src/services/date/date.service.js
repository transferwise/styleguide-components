
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

  this.getUTCDateFromParts = (year, month, day) => {
    const date = new Date();
    date.setUTCFullYear(year, month, day);
    date.setUTCHours(0);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
    return date;
  };

  this.getDayNamesForLocale = (locale, format) => {
    let date;
    const days = [];
    const language = getLanguageFromLocale(locale);

    if (DEFAULT_DAY_NAMES_BY_LANGUAGE[language]) {
      return DEFAULT_DAY_NAMES_BY_LANGUAGE[language];
    }

    format = getValidDateFormat(format);
    locale = getValidLocale(locale);

    for (let i = 1; i <= 7; i++) {
      date = this.getUTCDateFromParts(2001, 0, i); // This day was a monday
      days.push(getLocalisedDateName(date, locale, { weekday: format }));
    }
    return days;
  };

  this.getMonthNamesForLocale = (locale, format) => {
    let date;
    let month;
    const months = [];
    const language = getLanguageFromLocale(locale);

    if (DEFAULT_MONTH_NAMES_BY_LANGUAGE[language] &&
      (format === 'long' || language === 'ja')) {
      return DEFAULT_MONTH_NAMES_BY_LANGUAGE[language];
    }

    format = getValidDateFormat(format);
    locale = getValidLocale(locale);

    for (let i = 0; i < 12; i++) {
      // Day in middle of month avoids timezone issues
      date = this.getUTCDateFromParts(2000, i, 15);
      if (format === 'short') {
        month = getLocalisedDateName(date, locale, { month: 'long' });
        month = (month.length > 4) ? month.slice(0, 3) : month;
        months.push(month);
      } else {
        months.push(getLocalisedDateName(date, locale, { month: format }));
      }
    }
    return months;
  };

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

  this.getLocaleTimeString = (date, locale) => {
    const lang = getLanguageFromLocale(locale);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (lang === 'ja') {
      return `${hours}:${minutes}の`;
    }

    if (lang === 'en') {
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours %= 12;
      if (hours === 0) {
        hours = 12;
      }
      return `${hours}:${minutes}${ampm}`;
    }
    return `${hours}:${minutes}`;
  };

  this.getYearAndMonthPresentation = (year, monthName, locale) => {
    const lang = getLanguageFromLocale(locale);
    const yearSuffix = getSuffix(YEAR_SUFFIXES_BY_LANGUAGE, year, lang);
    const delimiter = getDelimiter(lang);

    return this.isYearBeforeMonth(locale)
      ? `${year}${yearSuffix}${delimiter}${monthName}`
      : `${monthName}${delimiter}${year}${yearSuffix}`;
  };

  this.getYearMonthDatePresentation = (year, monthName, day, locale) => {
    const lang = getLanguageFromLocale(locale);
    const yearSuffix = getSuffix(YEAR_SUFFIXES_BY_LANGUAGE, year, lang);
    const daySuffix = getSuffix(DAY_SUFFIXES_BY_LANGUAGE, day, lang);
    const delimiter = getDelimiter(lang);

    if (this.isYearBeforeMonth(locale)) {
      return `${year}${yearSuffix}${delimiter}${monthName}${delimiter}${day}${daySuffix}`;
    }
    if (this.isMonthBeforeDay(locale)) {
      return `${monthName}${delimiter}${day}${daySuffix},${delimiter}${year}${yearSuffix}`;
    }
    return `${day}${daySuffix}${delimiter}${monthName}${delimiter}${year}${yearSuffix}`;
  };

  this.getMonthDatePresentation = (monthName, day, locale) => {
    const lang = getLanguageFromLocale(locale);
    const daySuffix = getSuffix(DAY_SUFFIXES_BY_LANGUAGE, day, lang);
    const delimiter = getDelimiter(lang);

    return this.isMonthBeforeDay(locale)
      ? `${monthName}${delimiter}${day}${daySuffix}`
      : `${day}${daySuffix}${delimiter}${monthName}`;
  };

  this.getLocaleDateString = (date, locale) => {
    // Check that the date exists
    if (!date) {
      return date;
    }

    // Initialize variables
    const weekday = this.getDayNamesForLocale(locale, 'long')[date.getDay()];
    const year = date.getFullYear();
    const month = this.getMonthNamesForLocale(locale, 'long')[date.getMonth()];
    const monthDate = date.getDate();
    const now = new Date();
    const hasWeekday = (now - date) < 604800000; // 1 week in milliseconds
    const hasYear = now.getFullYear() !== year;

    // Return the result
    const lang = getLanguageFromLocale(locale);
    const result = hasYear
      ? this.getYearMonthDatePresentation(year, month, monthDate, locale)
      : this.getMonthDatePresentation(month, monthDate, locale);
    if (hasWeekday) {
      if (lang === 'ja') {
        return `${result} (${weekday})`;
      }
      return `${weekday} ${result}`;
    }
    return result;
  };

  function getLocalisedDateName(date, locale, formattingObject) {
    let name = date.toLocaleDateString(locale, formattingObject);

    if (isLocaleTranslationRequiresStripping(locale)) {
      // strip out any numbers, spaces and commas in case browser (cough...Safari)
      // doesn't respect format
      name = name.replace(/[0-9]|\s|,/g, '');
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
      return null;
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
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    ja: [
      '月', '火', '水', '木', '金', '土', '日'
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
