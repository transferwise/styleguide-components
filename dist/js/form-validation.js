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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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

var _domService = __webpack_require__(9);

var _domService2 = _interopRequireDefault(_domService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.services.dom', []).service('TwDomService', _domService2.default).name;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _date = __webpack_require__(8);

var _date2 = _interopRequireDefault(_date);

var _currency = __webpack_require__(6);

var _currency2 = _interopRequireDefault(_currency);

var _dom = __webpack_require__(1);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.services', [_date2.default, _currency2.default, _dom2.default]).name;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _formValidation = __webpack_require__(16);

var _formValidation2 = _interopRequireDefault(_formValidation);

var _controlValidation = __webpack_require__(14);

var _controlValidation2 = _interopRequireDefault(_controlValidation);

var _asyncValidation = __webpack_require__(11);

var _asyncValidation2 = _interopRequireDefault(_asyncValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.validation', [_formValidation2.default, _controlValidation2.default, _asyncValidation2.default]).name;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _validation = __webpack_require__(3);

var _validation2 = _interopRequireDefault(_validation);

var _services = __webpack_require__(2);

var _services2 = _interopRequireDefault(_services);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.form-validation', [_validation2.default, _services2.default]).name; /* This module is deprecated, but in use in several places */

/***/ }),
/* 5 */
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
    if (currency.toUpperCase && typeof currencyDecimals[currency.toUpperCase()] !== 'undefined') {
      return currencyDecimals[currency.toUpperCase()];
    }
    return 2;
  };
}

exports.default = CurrencyService;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _currencyService = __webpack_require__(5);

var _currencyService2 = _interopRequireDefault(_currencyService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.services.currency', []).service('TwCurrencyService', _currencyService2.default).name;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

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

  this.getUTCDateFromParts = function (year, month, day) {
    var date = new Date();
    date.setUTCFullYear(year, month, day);
    date.setUTCHours(0);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
    return date;
  };

  this.getDayNamesForLocale = function (locale, format) {
    var date = void 0;
    var days = [];
    var language = getLanguageFromLocale(locale);

    if (DEFAULT_DAY_NAMES_BY_LANGUAGE[language]) {
      return DEFAULT_DAY_NAMES_BY_LANGUAGE[language];
    }

    format = getValidDateFormat(format);
    locale = getValidLocale(locale);

    for (var i = 1; i <= 7; i++) {
      date = _this.getUTCDateFromParts(2001, 0, i); // This day was a monday
      days.push(getLocalisedDateName(date, locale, { weekday: format }));
    }
    return days;
  };

  this.getMonthNamesForLocale = function (locale, format) {
    var date = void 0;
    var month = void 0;
    var months = [];
    var language = getLanguageFromLocale(locale);

    if (DEFAULT_MONTH_NAMES_BY_LANGUAGE[language] && (format === 'long' || language === 'ja')) {
      return DEFAULT_MONTH_NAMES_BY_LANGUAGE[language];
    }

    format = getValidDateFormat(format);
    locale = getValidLocale(locale);

    for (var i = 0; i < 12; i++) {
      // Day in middle of month avoids timezone issues
      date = _this.getUTCDateFromParts(2000, i, 15);
      if (format === 'short') {
        month = getLocalisedDateName(date, locale, { month: 'long' });
        month = month.length > 4 ? month.slice(0, 3) : month;
        months.push(month);
      } else {
        months.push(getLocalisedDateName(date, locale, { month: format }));
      }
    }
    return months;
  };

  this.getWeekday = function (year, month, day) {
    var utcDate = _this.getUTCDateFromParts(year, month, day);
    return utcDate.getUTCDay();
  };

  this.isMonthBeforeDay = function (locale) {
    if (locale.indexOf('US', locale.length - 2) !== -1) {
      return true;
    } else if (getLanguageFromLocale(locale) === 'ja') {
      return true;
    }

    return false;
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

  this.getYearAndMonthPresentation = function (year, monthName, locale) {
    var lang = getLanguageFromLocale(locale);
    if (lang === 'ja') {
      return year + '\u5E74' + monthName;
    }

    return monthName + ' ' + year;
  };

  this.getYearMonthDatePresentation = function (year, monthName, date, locale) {
    var lang = getLanguageFromLocale(locale);
    if (lang === 'ja') {
      return year + '\u5E74' + monthName + date + '\u65E5';
    }

    if (locale.indexOf('US', locale.length - 2) !== -1) {
      return monthName + ' ' + date + ', ' + year;
    }

    return date + ' ' + monthName + ' ' + year;
  };

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
      return null;
    }
    return locale.substring(0, 2);
  }

  var DEFAULT_MONTH_NAMES_BY_LANGUAGE = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    ja: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  };

  var DEFAULT_DAY_NAMES_BY_LANGUAGE = {
    en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    ja: ['月', '火', '水', '木', '金', '土', '日']

  };
}

exports.default = DateService;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _dateService = __webpack_require__(7);

var _dateService2 = _interopRequireDefault(_dateService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.services.date', []).service('TwDateService', _dateService2.default).name;

/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AsyncValidatorController =
// eslint-disable-next-line no-useless-constructor
function AsyncValidatorController() {
  // console.log("this.twDynamicAsyncValidator");
  // console.log(ctrl.twDynamicAsyncValidator);

  _classCallCheck(this, AsyncValidatorController);
};

function AsyncValidation($log, $q, $http) {
  return {
    /* require: 'ngModel', */
    link: AsyncValidationLink,
    restrict: 'A',
    controller: AsyncValidatorController,
    contollerAs: 'ctrl',
    bindToController: {
      twDynamicAsyncValidator: '='
    }
  };

  // eslint-disable-next-line no-unused-vars
  function AsyncValidationLink(scope, element, attrs, ngModel) {
    // eslint-disable-next-line no-unused-vars
    var validatorSetting = attrs['tw-dynamic-async-validator'];
    // ngModel.$asyncValidators.async = dynamicAsyncValidator;
    // console.log(ngModel);
    // console.log(ngModel.twDynamicAsyncValidator);
  }

  // eslint-disable-next-line no-unused-vars
  function dynamicAsyncValidator(modelValue, viewValue) {
    var req = {
      method: 'GET',
      url: 'partials/requirements.json', // TODO!!!!!
      params: {
        email: null
      }
    };
    req.params.email = modelValue || viewValue;
    return $http(req).catch(function (response) {
      $log.warn('emailValidValidator', 'response', response);
      return response;
    }).then(function (response) {
      if (response.data.errors) {
        return $q.reject(response.data.errors[0].message);
      }
      return true;
    });
  }
}

AsyncValidation.$inject = ['$log', '$q', '$http'];

exports.default = AsyncValidation;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _asyncValidationDirective = __webpack_require__(10);

var _asyncValidationDirective2 = _interopRequireDefault(_asyncValidationDirective);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.validation.async', []).directive('twAsyncValidation', _asyncValidationDirective2.default).name;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = __webpack_require__(1);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// eslint-disable-line no-unused-vars

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controlValidationController = __webpack_require__(12);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _controlValidationDirective = __webpack_require__(13);

var _controlValidationDirective2 = _interopRequireDefault(_controlValidationDirective);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.stylguide.validation.control', []).directive('twValidation', _controlValidationDirective2.default).name;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = __webpack_require__(1);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _formValidationDirective = __webpack_require__(15);

var _formValidationDirective2 = _interopRequireDefault(_formValidationDirective);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.validation.form', []).directive('form', _formValidationDirective2.default).name;

/***/ })
/******/ ]);