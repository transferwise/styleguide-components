/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _domService = __webpack_require__(10);

var _domService2 = _interopRequireDefault(_domService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.services.dom', []).service('TwDomService', _domService2.default).name;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Polyfill for IE 9, 10, 11 CustomEvents, see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
(function initCustomEventPolyfill() {
  if (typeof window.CustomEvent === 'function') {
    return false;
  }

  function CustomEvent(event, params) {
    var evt = document.createEvent('CustomEvent');
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
  return true;
})();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _date = __webpack_require__(9);

var _date2 = _interopRequireDefault(_date);

var _currency = __webpack_require__(7);

var _currency2 = _interopRequireDefault(_currency);

var _locale = __webpack_require__(11);

var _locale2 = _interopRequireDefault(_locale);

var _dom = __webpack_require__(1);

var _dom2 = _interopRequireDefault(_dom);

var _requirements = __webpack_require__(13);

var _requirements2 = _interopRequireDefault(_requirements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.services', [_date2.default, _currency2.default, _locale2.default, _dom2.default, _requirements2.default]).name;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _formValidation = __webpack_require__(19);

var _formValidation2 = _interopRequireDefault(_formValidation);

var _controlValidation = __webpack_require__(17);

var _controlValidation2 = _interopRequireDefault(_controlValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AsyncValidation from './async-validation/';

exports.default = _angular2.default.module('tw.styleguide.validation', [_formValidation2.default, _controlValidation2.default
// ,AsyncValidation
]).name;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

__webpack_require__(2);

var _validation = __webpack_require__(4);

var _validation2 = _interopRequireDefault(_validation);

var _services = __webpack_require__(3);

var _services2 = _interopRequireDefault(_services);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* This module is deprecated, but in use in several places */

exports.default = _angular2.default.module('tw.form-validation', [_validation2.default, _services2.default]).name;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function CurrencyService() {
  var currencyDecimals = {
    BIF: 0,
    BYR: 0,
    CLP: 0,
    DJF: 0,
    GNF: 0,
    JPY: 0,
    KMF: 0,
    KRW: 0,
    MGA: 0,
    PYG: 0,
    RWF: 0,
    VND: 0,
    VUV: 0,
    XAF: 0,
    XOF: 0,
    XPF: 0,
    // technically HUF does have decimals, but due to the exchange rate banks
    // do not accept decimal amounts
    HUF: 0,

    BHD: 3,
    JOD: 3,
    KWD: 3,
    OMR: 3,
    TND: 3
  };

  this.getDecimals = function (currency) {
    if (currency && currency.toUpperCase && typeof currencyDecimals[currency.toUpperCase()] !== 'undefined') {
      return currencyDecimals[currency.toUpperCase()];
    }
    return 2;
  };
}

exports.default = CurrencyService;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _currencyService = __webpack_require__(6);

var _currencyService2 = _interopRequireDefault(_currencyService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.services.currency', []).service('TwCurrencyService', _currencyService2.default).name;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function DateService() {
  var _this = this;

  this.getLocaleDate = function (date) {
    if (!date) {
      date = new Date();
    }
    return date.getDate();
  };

  this.getLocaleMonth = function (date) {
    if (!date) {
      date = new Date();
    }
    return date.getMonth();
  };

  this.getLocaleFullYear = function (date) {
    if (!date) {
      date = new Date();
    }
    return date.getFullYear();
  };

  // get UTC date for users current day
  this.getLocaleToday = function () {
    var now = new Date();
    return _this.getUTCDateFromParts(_this.getLocaleFullYear(now), _this.getLocaleMonth(now), _this.getLocaleDate(now));
  };

  this.getUTCDate = function (date) {
    if (!date) {
      date = new Date();
    }
    return date.getUTCDate();
  };

  this.getUTCMonth = function (date) {
    if (!date) {
      date = new Date();
    }
    return date.getUTCMonth();
  };

  this.getUTCFullYear = function (date) {
    if (!date) {
      date = new Date();
    }
    return date.getUTCFullYear();
  };

  this.getUTCToday = function () {
    var now = new Date();
    return _this.getUTCDateFromParts(_this.getUTCFullYear(now), _this.getUTCMonth(now), _this.getUTCDate(now));
  };

  this.getLastDayOfMonth = function (year, month) {
    var lastDay = _this.getUTCDateFromParts(year, month + 1, 0);
    return lastDay.getUTCDate();
  };

  this.getUTCDateFromParts = function (year, month, day, hours, minutes, seconds) {
    var date = new Date();
    date.setUTCFullYear(year, month, day);
    date.setUTCHours(hours || 0);
    date.setUTCMinutes(minutes || 0);
    date.setUTCSeconds(seconds || 0);
    date.setUTCMilliseconds(0);
    return date;
  };

  this.getLocaleDateFromParts = function (year, month, day, hours, minutes, seconds) {
    var date = new Date();
    date.setFullYear(year, month, day);
    date.setHours(hours || 0);
    date.setMinutes(minutes || 0);
    date.setSeconds(seconds || 0);
    date.setMilliseconds(0);
    return date;
  };

  this.getDatePartsFromIso = function (isoDate) {
    var hoursOffset = 0;
    var minutesOffset = 0;

    var year = parseInt(isoDate.substr(0, 4), 10);
    var month = parseInt(isoDate.substr(5, 2), 10) - 1;
    var day = parseInt(isoDate.substr(8, 2), 10);
    var hours = parseInt(isoDate.substr(11, 2), 10) || 0;
    var minutes = parseInt(isoDate.substr(14, 2), 10) || 0;
    var seconds = parseInt(isoDate.substr(17, 2), 10) || 0;

    // It's possible for the date to match the offset regex
    var stringAfterDate = isoDate.substring(10);
    var offsetRegex = '[+-]{1}[0-9]{2}(:[0-9]{2})?$';
    var offset = stringAfterDate.match(offsetRegex);

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

  this.isIsoStringValid = function (isoDate) {
    var dateSection = '[0-9]{4}-[0-9]{2}-[0-9]{2}';
    var timeSection = 'T[0-9]{2}:[0-9]{2}:[0-9]{2}';
    var millisecondSection = '(.[0-9]{3})?';
    var zoneSection = '(Z|[+,-][0-9]{2}(:[0-9]{2})?)';
    var regex = new RegExp('^' + dateSection + '(' + timeSection + millisecondSection + zoneSection + ')?$');
    return regex.test(isoDate);
  };

  this.getUTCDateFromIso = function (isoDate) {
    if (!_this.isIsoStringValid(isoDate)) {
      return null;
    }

    var _getDatePartsFromIso = _this.getDatePartsFromIso(isoDate),
        _getDatePartsFromIso2 = _slicedToArray(_getDatePartsFromIso, 8),
        year = _getDatePartsFromIso2[0],
        month = _getDatePartsFromIso2[1],
        day = _getDatePartsFromIso2[2],
        hours = _getDatePartsFromIso2[3],
        minutes = _getDatePartsFromIso2[4],
        seconds = _getDatePartsFromIso2[5],
        hoursOffset = _getDatePartsFromIso2[6],
        minutesOffset = _getDatePartsFromIso2[7];

    return _this.getUTCDateFromParts(year, month, day, hours + hoursOffset, minutes + minutesOffset, seconds);
  };

  // Sunday is first day of the week in JS
  this.getDayNamesForLocale = function (locale, format) {
    var days = [];
    var validFormat = getValidDateFormat(format);
    for (var day = 0; day < 7; day++) {
      days.push(_this.getDayNameForLocale(day, locale, validFormat));
    }
    return days;
  };

  this.getDayNameForLocale = function (dayOfWeek, locale, format) {
    var defaultDayName = void 0;
    var language = getLanguageFromLocale(locale);
    if (DEFAULT_DAY_NAMES_BY_LANGUAGE[language]) {
      defaultDayName = DEFAULT_DAY_NAMES_BY_LANGUAGE[language][dayOfWeek];
    }

    if (defaultDayName) {
      if (format === 'short') {
        return defaultDayName.substr(0, 3);
      } else if (format === 'narrow') {
        return defaultDayName.substr(0, 1);
      }
      return defaultDayName;
    }

    var validLocale = getValidLocale(locale);
    var date = _this.getUTCDateFromParts(2006, 0, dayOfWeek + 1); // 2006 started with a Sunday

    return getLocalisedDateName(date, validLocale, { weekday: format });
  };

  this.getMonthNamesForLocale = function (locale, format) {
    var months = [];
    var validFormat = getValidDateFormat(format);

    for (var month = 0; month < 12; month++) {
      months.push(_this.getMonthNameForLocale(month, locale, validFormat));
    }

    return months;
  };

  this.getMonthNameForLocale = function (month, locale, format) {
    var language = getLanguageFromLocale(locale);
    if (DEFAULT_MONTH_NAMES_BY_LANGUAGE[language] && (format !== 'short' || language === 'ja')) {
      return DEFAULT_MONTH_NAMES_BY_LANGUAGE[language][month];
    }

    var validLocale = getValidLocale(locale);
    // Day in middle of month avoids timezone issues
    var date = _this.getUTCDateFromParts(2000, month, 15);
    if (format === 'short') {
      month = getLocalisedDateName(date, validLocale, { month: 'long' });
      return month.length > 4 ? month.slice(0, 3) : month;
    }
    return getLocalisedDateName(date, validLocale, { month: format });
  };

  this.getWeekday = function (year, month, day) {
    var utcDate = _this.getUTCDateFromParts(year, month, day);
    return utcDate.getUTCDay();
  };

  this.isMonthBeforeDay = function (locale) {
    var lang = getLanguageFromLocale(locale);
    return lang === 'ja' || locale && locale.indexOf('US', locale.length - 2) !== -1;
  };

  this.isYearBeforeMonth = function (locale) {
    var lang = getLanguageFromLocale(locale);
    return lang === 'ja';
  };

  this.addYears = function (date, years) {
    return _this.addToDate(date, years, 0, 0);
  };
  this.addMonths = function (date, months) {
    return _this.addToDate(date, 0, months, 0);
  };
  this.addDays = function (date, days) {
    return _this.addToDate(date, 0, 0, days);
  };

  this.addToDate = function (date, years, months, days) {
    return _this.getUTCDateFromParts(date.getUTCFullYear() + years, date.getUTCMonth() + months, date.getUTCDate() + days);
  };

  this.getLocaleTimeString = function (date, locale) {
    return _this.getTimeString(date.getHours(), date.getMinutes(), date.getSeconds(), locale);
  };

  this.getTimeString = function (hours, minutes, seconds, locale) {
    var lang = getLanguageFromLocale(locale);

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (lang === 'en') {
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours %= 12;
      if (hours === 0) {
        hours = 12;
      }
      if (minutes === '00') {
        return '' + hours + ampm;
      }
      return hours + ':' + minutes + ampm;
    }
    return hours + ':' + minutes;
  };

  this.getYearAndMonthPresentation = function (year, month, locale, format) {
    var yearName = getYearName(year, locale);
    var monthName = _this.getMonthNameForLocale(month, locale, format || 'long');

    var language = getLanguageFromLocale(locale);
    var delimiter = getDelimiter(language);

    if (_this.isYearBeforeMonth(locale)) {
      return [yearName, monthName].join(delimiter);
    }
    return [monthName, yearName].join(delimiter);
  };

  this.getYearMonthDatePresentation = function (year, month, day, locale, format) {
    var yearName = getYearName(year, locale);
    var monthName = _this.getMonthNameForLocale(month, locale, format || 'long');
    var dateName = getDateName(day, locale);

    var language = getLanguageFromLocale(locale);
    var delimiter = getDelimiter(language);

    if (_this.isYearBeforeMonth(locale)) {
      return [yearName, monthName, dateName].join(delimiter);
    }
    if (_this.isMonthBeforeDay(locale)) {
      var dateString = [monthName, dateName].join(delimiter);
      return dateString + ', ' + yearName;
    }
    return [dateName, monthName, yearName].join(delimiter);
  };

  this.getLocaleNow = function () {
    return new Date();
  };

  this.getUTCNow = function () {
    var now = new Date();
    return _this.getUTCDateFromParts(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
  };

  this.getLocaleDateString = function (date, locale, format) {
    // Check that the date exists
    if (!date.getFullYear) {
      return date;
    }

    // Initialize variables
    var now = _this.getLocaleNow();

    return _this.getDateString(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getDay(), locale, date - now, now.getFullYear(), format);
  };

  this.getUTCDateString = function (date, locale, format) {
    // Check that the date exists
    if (!date) {
      return date;
    }

    var now = _this.getUTCNow();

    return _this.getDateString(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCDay(), locale, date - now, now.getUTCFullYear(), format);
  };

  this.getDateString = function (year, month, day, hours, minutes, seconds, dayOfWeek, locale, offset, currentYear, format) {
    var fourtyEightHours = 48 * 60 * 60 * 1000;
    var eightDays = 8 * 24 * 60 * 60 * 1000;

    var hasTime = Math.abs(offset) < fourtyEightHours && format !== 'long';
    var hasDate = !hasTime;
    var hasWeekday = Math.abs(offset) < eightDays || format === 'long';
    var hasMonth = !hasWeekday || format === 'long';
    var hasYear = !hasWeekday && currentYear !== year || format === 'long';

    var yearName = hasYear ? getYearName(year, locale) : '';
    var monthName = hasMonth ? _this.getMonthNameForLocale(month, locale, format === 'short' ? 'short' : 'long') : '';
    var dateName = hasDate ? getDateName(day, locale) : '';
    var weekdayName = hasWeekday ? _this.getDayNameForLocale(dayOfWeek, locale, format === 'short' ? 'short' : 'long') : '';
    var timeName = hasTime ? _this.getTimeString(hours, minutes, seconds, locale) : '';

    return _this.combineDateParts(yearName, monthName, dateName, timeName, weekdayName, locale);
  };

  this.combineDateParts = function (yearName, monthName, dateName, timeName, dayName, locale) {
    var lang = getLanguageFromLocale(locale);
    var delimiter = getDelimiter(lang);

    var dateString = void 0;

    if (_this.isYearBeforeMonth(locale)) {
      dateString = [yearName, monthName, dateName].join(delimiter).trim();
    } else if (_this.isMonthBeforeDay(locale)) {
      dateString = [monthName, dateName].join(delimiter).trim();
      if (yearName) {
        dateString += ', ' + yearName;
      }
    } else {
      dateString = [dateName, monthName, yearName].join(delimiter).trim();
    }

    if (dayName) {
      if (lang === 'ja') {
        return (dateString + ' ' + timeName + ' (' + dayName + ')').trim();
      }
      // For longer dates use a comma
      if (monthName || yearName) {
        dateString = (dayName + ', ' + dateString).trim();
      } else {
        dateString = (dayName + ' ' + dateString).trim();
      }
    }
    dateString = dateString + ' ' + timeName;

    return dateString.trim();
  };

  function getDateName(dayOfMonth, locale) {
    var lang = getLanguageFromLocale(locale);
    var suffix = getSuffix(DAY_SUFFIXES_BY_LANGUAGE, dayOfMonth, lang) || '';
    return '' + dayOfMonth + suffix;
  }

  function getYearName(year, locale) {
    var lang = getLanguageFromLocale(locale);
    var suffix = getSuffix(YEAR_SUFFIXES_BY_LANGUAGE, year, lang);
    return '' + year + suffix;
  }

  function getLocalisedDateName(date, locale, formattingObject) {
    var name = date.toLocaleDateString(locale, formattingObject);

    if (isLocaleTranslationRequiresStripping(locale)) {
      // strip out any numbers, spaces and commas in case browser (cough...Safari)
      // doesn't respect format
      name = name.replace(/[0-9]|\s|,/g, '');
    }

    return name[0].toUpperCase() + name.substring(1);
  }

  function getValidDateFormat(format) {
    var validFormats = ['narrow', 'short', 'long'];
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
      var supportedLocales = window.Intl.DateTimeFormat.supportedLocalesOf([locale]);
      return supportedLocales.length > 0;
    } catch (error) {
      return false;
    }
  }

  function isLocaleTranslationRequiresStripping(locale) {
    if (!locale) {
      return true;
    }

    var lang = getLanguageFromLocale(locale);
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
    return DELIMITERS_BY_LANGUAGE[lang] !== undefined ? DELIMITERS_BY_LANGUAGE[lang] : ' ';
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

  var DEFAULT_MONTH_NAMES_BY_LANGUAGE = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ja: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  };

  var DEFAULT_DAY_NAMES_BY_LANGUAGE = {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    ja: ['日', '月', '火', '水', '木', '金', '土']
  };

  var DAY_SUFFIXES_BY_LANGUAGE = {
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

  var YEAR_SUFFIXES_BY_LANGUAGE = {
    ja: {
      default: '年'
    }
  };

  var DELIMITERS_BY_LANGUAGE = {
    ja: ''
  };
}

exports.default = DateService;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _dateService = __webpack_require__(8);

var _dateService2 = _interopRequireDefault(_dateService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.services.date', []).service('TwDateService', _dateService2.default).name;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function DomService() {
  this.getClosestParentByTagName = function (element, tagName) {
    var tagNameUpper = tagName.toUpperCase();
    var parent = element;

    while (parent) {
      parent = parent.parentNode;
      if (parent && parent.tagName && parent.tagName.toUpperCase() === tagNameUpper) {
        return parent;
      }
    }
    return null;
  };

  this.getClosestParentByClassName = function (element, className) {
    var parent = element;

    while (parent) {
      parent = parent.parentNode;
      if (parent && parent.classList && parent.classList.contains(className)) {
        return parent;
      }
    }
    return null;
  };

  this.getPreviousSiblingWithClassName = function (element, className) {
    var sibling = element.previousElementSibling;

    while (sibling) {
      if (sibling.classList.contains(className)) {
        return sibling;
      }
      sibling = sibling.previousElementSibling;
    }
    return null;
  };

  this.getNextSiblingWithClassName = function (element, className) {
    var sibling = element.nextElementSibling;

    while (sibling) {
      if (sibling.classList.contains(className)) {
        return sibling;
      }
      sibling = sibling.nextElementSibling;
    }
    return null;
  };
}

exports.default = DomService;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _localeService = __webpack_require__(12);

var _localeService2 = _interopRequireDefault(_localeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.services.locale', []).service('TwLocaleService', _localeService2.default).name;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function LocaleService() {
  var _this = this;

  this.locale = 'en-GB';
  this.regex = /^[a-z]{2}(-[A-Z][A-Z])?$/;
  this.lowerCaseCountry = /^[a-z]{2}(-[a-z][a-z])?$/;

  this.getCurrent = function () {
    return _this.locale;
  };

  this.setCurrent = function (newLocale) {
    if (_this.isValid(newLocale)) {
      _this.locale = newLocale;
      return _this.locale;
    }

    if (_this.lowerCaseCountry.test(newLocale)) {
      _this.locale = changeCountryToUpperCase(newLocale);
      return _this.locale;
    }

    if (console && console.warn) {
      // eslint-disable-line
      console.warn('Incorrect locale: ' + newLocale); // eslint-disable-line
    }
    _this.locale = 'en-GB';
    return _this.locale;
  };

  this.isValid = function (testLocale) {
    return _this.regex.test(testLocale);
  };

  function changeCountryToUpperCase(lowerCaseLocale) {
    return lowerCaseLocale.slice(0, 3) + lowerCaseLocale.slice(3, 5).toUpperCase();
  }
}

exports.default = LocaleService;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _requirementsService = __webpack_require__(14);

var _requirementsService2 = _interopRequireDefault(_requirementsService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.services.requirements', []).service('TwRequirementsService', _requirementsService2.default).name;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RequirementsService($http) {
  var _this = this;

  this.prepRequirements = function (alternatives) {
    alternatives.forEach(function (alternative) {
      _this.prepFields(alternative.fields);
    });
  };

  this.prepFields = function (fields, model, validationMessages) {
    if (!fields) {
      return [];
    }

    return fields.map(function (field) {
      return _this.prepField(field, model, validationMessages);
    });
  };

  this.prepField = function (field, model, validationMessages) {
    // Copy object, Object.assign is nicer, but lacks ie support
    var preparedField = JSON.parse(JSON.stringify(field));

    if (preparedField.group && preparedField.group[0]) {
      _angular2.default.extend(preparedField, preparedField.group[0]);
      delete preparedField.group;
    }

    _this.prepLegacyProps(preparedField);

    _this.prepType(preparedField);
    _this.prepPattern(preparedField);
    _this.prepValuesAsync(preparedField, model);
    _this.prepValues(preparedField);
    _this.prepValidationMessages(preparedField, validationMessages);

    return preparedField;
  };

  this.prepType = function (field) {
    switch (field.type) {
      case 'date':
        field.type = 'string';
        field.format = 'date';
        break;
      case 'password':
        field.type = 'string';
        field.format = 'password';
        break;
      case 'checkbox':
        field.type = 'boolean';
        break;
      case 'select':
        field.control = 'select';
        break;
      case 'radio':
        field.control = 'radio';
        break;
      case 'upload':
        field.type = 'string';
        field.format = 'base64url';
        break;
      default:
    }

    if (!field.control) {
      field.control = getControlType(field);
    }
  };

  this.prepLegacyProps = function (field) {
    if (field.validationRegexp) {
      field.pattern = field.validationRegexp;
      delete field.validationRegexp;
    }

    if (field.min) {
      field.minimum = field.min;
      delete field.min;
    }

    if (field.max) {
      field.maximum = field.max;
      delete field.max;
    }

    if (field.example && !field.placeholder) {
      field.placeholder = field.example;
      delete field.example;
    }

    if (field.tooltip && !field.helpText) {
      field.helpText = field.tooltip;
      delete field.tooltip;
    }

    if (field.valuesAllowed && !field.values) {
      field.values = field.valuesAllowed;
      delete field.valuesAllowed;
    }
  };

  this.prepPattern = function (field) {
    if (field.pattern) {
      try {
        RegExp(field.pattern);
      } catch (ex) {
        // eslint-disable-next-line no-console
        console.warn('API regexp is invalid');
        field.pattern = false;
      }
    } else {
      field.pattern = false;
    }
  };

  this.prepValuesAsync = function (field, model) {
    if (!field.valuesAsync) {
      return;
    }

    var postData = {};
    if (field.valuesAsync.params && field.valuesAsync.params.length) {
      postData = _this.getParamValuesFromModel(model, field.valuesAsync.params);
    }

    _this.fetchValuesAsync(field, postData).catch(function () {
      return (
        // Retry once on failure
        _this.fetchValuesAsync(field, postData)
      );
    });
  };

  this.fetchValuesAsync = function (field, postData) {
    return $http({
      method: field.valuesAsync.method || 'GET',
      url: field.valuesAsync.url,
      data: postData || {}
    }).then(function (response) {
      console.log('here');
      field.values = response.data;
      _this.prepValues(field);
    });
  };

  this.prepValues = function (field) {
    if (!_angular2.default.isArray(field.values)) {
      return;
    }
    field.values.forEach(function (option) {
      option.value = option.value || option.key;
      option.label = option.label || option.name;
    });
  };

  this.getParamValuesFromModel = function (model, params) {
    var data = {};
    params.forEach(function (param) {
      if (model[param.key]) {
        data[param.parameterName] = model[param.key];
      } else if (param.required) {
        // TODO Problem, parameter is required, but data is missing.
      }
    });
    return data;
  };

  this.prepValidationMessages = function (field, validationMessages) {
    field.validationMessages = field.validationMessages ? field.validationMessages : validationMessages;
  };
}

function getControlType(field) {
  if (field.control) {
    return field.control;
  }
  if (field.hidden) {
    return 'hidden';
  }
  if (field.values && field.values.length) {
    return getSelectionType(field);
  }

  switch (field.type) {
    case 'string':
      return getControlForStringFormat(field.format);
    case 'number':
    case 'integer':
      return 'number';
    case 'boolean':
      return 'checkbox';
    default:
      return 'text';
  }
}

function getControlForStringFormat(format) {
  switch (format) {
    case 'date':
      return 'date';
    case 'base64url':
      return 'file';
    case 'password':
      return 'password';
    case 'uri':
      return 'text'; // 'url'; - not implemented
    case 'email':
      return 'text'; // 'email'; - not implemented
    case 'phone':
      return 'text'; // 'tel'; - not implemented
    default:
      return 'text';
  }
}

function getSelectionType(field) {
  if (field.control) {
    return field.control;
  } else if (field.type === 'select') {
    return 'select';
  } else if (field.type === 'radio') {
    return 'radio';
  }

  var values = field.enum || field.values;
  if (values) {
    return values.length > 3 ? 'select' : 'radio';
  }
  return 'select';
}

RequirementsService.$inject = ['$http'];

exports.default = RequirementsService;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidationController = function ValidationController($scope, $element, TwDomService) {
  _classCallCheck(this, ValidationController);

  var element = $element[0];
  var formGroup = TwDomService.getClosestParentByClassName(element, 'form-group');
  var $ngModel = $element.controller('ngModel');

  element.addEventListener('invalid', function (event) {
    // Prevent default validation tooltips
    event.preventDefault();
  });

  $ngModel.$validators.validation = function () {
    // Evaluate after ngModel updates, we are still in validation chain
    $scope.$evalAsync(function () {
      checkModelAndUpdate($ngModel, formGroup, element);
    });
    return true;
  };

  // The first time we blur, model is still pristine when validation occurs, so perform again.
  var onBlur = function onBlur() {
    // Custom elements must trigger blur manually for correct behaviour
    $scope.$evalAsync(function () {
      checkModelAndUpdate($ngModel, formGroup, element);
    });
  };

  element.addEventListener('blur', onBlur);
};

function checkModelAndUpdate(ngModel, formGroup, element) {
  if (ngModel.$valid) {
    if (formGroup) {
      formGroup.classList.remove('has-error');
    }
    element.removeAttribute('aria-invalid');
    return;
  }

  if (ngModel.$touched && ngModel.$dirty) {
    if (formGroup) {
      formGroup.classList.add('has-error');
    }
    // Set aria invalid for screen readers
    element.setAttribute('aria-invalid', 'true');
  }
}

ValidationController.$inject = ['$scope', '$element', 'TwDomService'];

exports.default = ValidationController;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controlValidationController = __webpack_require__(15);

var _controlValidationController2 = _interopRequireDefault(_controlValidationController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TwValidation() {
  return {
    restrict: 'A',
    require: {
      $ngModel: 'ngModel'
    },
    controller: _controlValidationController2.default
  };
}

exports.default = TwValidation;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _controlValidationDirective = __webpack_require__(16);

var _controlValidationDirective2 = _interopRequireDefault(_controlValidationDirective);

var _dom = __webpack_require__(1);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.stylguide.validation.control', [_dom2.default]).directive('twValidation', _controlValidationDirective2.default).name;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function FormValidation(TwDomService) {
  return {
    restrict: 'E',
    link: function link(scope, $element) {
      var form = $element[0];

      // Submitting the form won't trigger form controls own validation, so check them
      form.addEventListener('submit', function () {
        var formGroup = void 0;
        var checkboxContainer = void 0;
        var radioContainer = void 0;

        var controls = form.querySelectorAll('[tw-validation].ng-invalid');

        // Shouldn't be necessary, but PhantomJS was complaining
        if (!controls.forEach) {
          return true;
        }

        controls.forEach(function (control) {
          formGroup = TwDomService.getClosestParentByClassName(control, 'form-group');
          radioContainer = TwDomService.getClosestParentByClassName(control, 'radio');
          checkboxContainer = TwDomService.getClosestParentByClassName(control, 'checkbox');

          if (formGroup) {
            formGroup.classList.add('has-error');
          }
          if (radioContainer) {
            radioContainer.classList.add('has-error');
          }
          if (checkboxContainer) {
            checkboxContainer.classList.add('has-error');
          }
        });

        return true;
      });
    }
  };
}

FormValidation.$inject = ['TwDomService'];

exports.default = FormValidation;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _formValidationDirective = __webpack_require__(18);

var _formValidationDirective2 = _interopRequireDefault(_formValidationDirective);

var _dom = __webpack_require__(1);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.validation.form', [_dom2.default]).directive('form', _formValidationDirective2.default).name;

/***/ })
/******/ ]);