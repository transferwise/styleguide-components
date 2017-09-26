
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
    if (locale.indexOf('US', locale.length - 2) !== -1) {
      return true;
    } else if (getLanguageFromLocale(locale) === 'ja') {
      return true;
    }

    return false;
  };

  this.addYears = (date, years) => this.addToDate(date, years, 0, 0);
  this.addMonths = (date, months) => this.addToDate(date, 0, months, 0);
  this.addDays = (date, days) => this.addToDate(date, 0, 0, days);

  this.addToDate = (date, years, months, days) => this.getUTCDateFromParts(
    date.getUTCFullYear() + years,
    date.getUTCMonth() + months,
    date.getUTCDate() + days
  );

  this.getDateTimePresentation = (hours, minutes, locale) => {
    const lang = getLanguageFromLocale(locale);
    if (hours < 10) {
      hours += '0';
    }
    if (minutes < 10) {
      minutes += '0';
    }

    if (lang === 'ja') {
      return `${hours}:${minutes}の`;
    }

    if (locale.startsWith('en')) {
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours %= 12;
      if (hours === 0) {
        hours = 12;
      }
      return `${hours}:${minutes} ${ampm}`;
    }

    return `${hours}:${minutes}`;
  };

  this.getYearAndMonthPresentation = (year, monthName, locale) => {
    locale = getValidLocale(locale);
    const lang = getLanguageFromLocale(locale);
    if (lang === 'ja') {
      return `${year}年${monthName}`;
    }

    return `${monthName} ${year}`;
  };

  this.getYearAndMonthShortPresentation = (year, month, locale) => {
    locale = getValidLocale(locale);
    const lang = getLanguageFromLocale(locale);
    if (lang === 'ja') {
      return `${year}年${month}月`;
    }

    return `${month}/${year}`;
  };

  this.getYearMonthDatePresentation = (year, monthName, date, locale) => {
    locale = getValidLocale(locale);
    const lang = getLanguageFromLocale(locale);
    if (lang === 'ja') {
      return `${year}年${monthName}${date}日`;
    }

    if (locale.indexOf('US', locale.length - 2) !== -1) {
      return `${monthName} ${date}, ${year}`;
    }

    return `${date} ${monthName} ${year}`;
  };

  this.getYearMonthDateShortPresentation = (year, month, date, locale) => {
    locale = getValidLocale(locale);
    const lang = getLanguageFromLocale(locale);
    if (lang === 'ja') {
      return `${year}年${month}月${date}日`;
    }

    if (locale.indexOf('US', locale.length - 2) !== -1) {
      return `${month}/${date}/${year}`;
    }

    return `${date}/${month}/${year}`;
  };

  this.getMonthDatePresentation = (monthName, date, locale) => {
    locale = getValidLocale(locale);
    const lang = getLanguageFromLocale(locale);
    if (lang === 'ja') {
      return `${monthName}${date}日`;
    }

    if (locale.indexOf('US', locale.length - 2) !== -1) {
      return `${monthName} ${date}`;
    }

    return `${date} ${monthName}`;
  };

  this.getMonthDateShortPresentation = (month, date, locale) => {
    locale = getValidLocale(locale);
    const lang = getLanguageFromLocale(locale);
    if (lang === 'ja') {
      return `${month}月${date}日`;
    }

    if (locale.indexOf('US', locale.length - 2) !== -1) {
      return `${month}/${date}`;
    }

    return `${date}/${month}`;
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
}

export default DateService;
