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
/******/ 	return __webpack_require__(__webpack_require__.s = 87);
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

var _domService = __webpack_require__(104);

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

var _currencyService = __webpack_require__(102);

var _currencyService2 = _interopRequireDefault(_currencyService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.services.currency', []).service('TwCurrencyService', _currencyService2.default).name;

/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _date = __webpack_require__(6);

var _date2 = _interopRequireDefault(_date);

var _currency = __webpack_require__(2);

var _currency2 = _interopRequireDefault(_currency);

var _locale = __webpack_require__(22);

var _locale2 = _interopRequireDefault(_locale);

var _dom = __webpack_require__(1);

var _dom2 = _interopRequireDefault(_dom);

var _requirements = __webpack_require__(7);

var _requirements2 = _interopRequireDefault(_requirements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.services', [_date2.default, _currency2.default, _locale2.default, _dom2.default, _requirements2.default]).name;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _selectComponent = __webpack_require__(73);

var _selectComponent2 = _interopRequireDefault(_selectComponent);

var _dom = __webpack_require__(1);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.forms.select', [_dom2.default]).component('twSelect', _selectComponent2.default).name;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _dateService = __webpack_require__(103);

var _dateService2 = _interopRequireDefault(_dateService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.services.date', []).service('TwDateService', _dateService2.default).name;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _requirementsService = __webpack_require__(106);

var _requirementsService2 = _interopRequireDefault(_requirementsService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.services.requirements', []).service('TwRequirementsService', _requirementsService2.default).name;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _textFormat = __webpack_require__(36);

var _textFormat2 = _interopRequireDefault(_textFormat);

var _dateFormat = __webpack_require__(33);

var _dateFormat2 = _interopRequireDefault(_dateFormat);

var _numberFormat = __webpack_require__(12);

var _numberFormat2 = _interopRequireDefault(_numberFormat);

var _currencyFormat = __webpack_require__(30);

var _currencyFormat2 = _interopRequireDefault(_currencyFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.formatting', [_textFormat2.default, _dateFormat2.default, _numberFormat2.default, _currencyFormat2.default]).name;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _checkbox = __webpack_require__(13);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _radio = __webpack_require__(19);

var _radio2 = _interopRequireDefault(_radio);

var _select = __webpack_require__(5);

var _select2 = _interopRequireDefault(_select);

var _upload = __webpack_require__(20);

var _upload2 = _interopRequireDefault(_upload);

var _date = __webpack_require__(14);

var _date2 = _interopRequireDefault(_date);

var _dateLookup = __webpack_require__(52);

var _dateLookup2 = _interopRequireDefault(_dateLookup);

var _currencyInput = __webpack_require__(49);

var _currencyInput2 = _interopRequireDefault(_currencyInput);

var _amountCurrencySelect = __webpack_require__(44);

var _amountCurrencySelect2 = _interopRequireDefault(_amountCurrencySelect);

var _dynamicFormControl = __webpack_require__(15);

var _dynamicFormControl2 = _interopRequireDefault(_dynamicFormControl);

var _field = __webpack_require__(16);

var _field2 = _interopRequireDefault(_field);

var _fieldset = __webpack_require__(17);

var _fieldset2 = _interopRequireDefault(_fieldset);

var _requirementsForm = __webpack_require__(69);

var _requirementsForm2 = _interopRequireDefault(_requirementsForm);

var _focusable = __webpack_require__(66);

var _focusable2 = _interopRequireDefault(_focusable);

var _definitionList = __webpack_require__(57);

var _definitionList2 = _interopRequireDefault(_definitionList);

var _telephone = __webpack_require__(134);

var _telephone2 = _interopRequireDefault(_telephone);

var _uploadDroppable = __webpack_require__(76);

var _uploadDroppable2 = _interopRequireDefault(_uploadDroppable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.forms', [_checkbox2.default, _radio2.default, _select2.default, _upload2.default, _date2.default, _dateLookup2.default, _currencyInput2.default, _amountCurrencySelect2.default, _dynamicFormControl2.default, _field2.default, _fieldset2.default, _requirementsForm2.default, _focusable2.default, _definitionList2.default, _telephone2.default, _uploadDroppable2.default]).name;

// Deprecated

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _loader = __webpack_require__(95);

var _loader2 = _interopRequireDefault(_loader);

var _process = __webpack_require__(97);

var _process2 = _interopRequireDefault(_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.loading', [_loader2.default, _process2.default]).name;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _formValidation = __webpack_require__(111);

var _formValidation2 = _interopRequireDefault(_formValidation);

var _controlValidation = __webpack_require__(109);

var _controlValidation2 = _interopRequireDefault(_controlValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AsyncValidation from './async-validation/';

exports.default = _angular2.default.module('tw.styleguide.validation', [_formValidation2.default, _controlValidation2.default
// ,AsyncValidation
]).name;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _numberFormat = __webpack_require__(34);

var _numberFormat2 = _interopRequireDefault(_numberFormat);

var _numberFormat3 = __webpack_require__(35);

var _numberFormat4 = _interopRequireDefault(_numberFormat3);

var _locale = __webpack_require__(22);

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.formatting.number', [_locale2.default]).component('twNumberFormat', _numberFormat2.default).filter('twNumberFormat', _numberFormat4.default).name;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _checkboxComponent = __webpack_require__(45);

var _checkboxComponent2 = _interopRequireDefault(_checkboxComponent);

var _dom = __webpack_require__(1);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.forms.checkbox', [_dom2.default]).component('twCheckbox', _checkboxComponent2.default).name;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _dateComponent = __webpack_require__(53);

var _dateComponent2 = _interopRequireDefault(_dateComponent);

var _date = __webpack_require__(6);

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.forms.date', [_date2.default]).component('twDate', _dateComponent2.default).name;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _select = __webpack_require__(5);

var _select2 = _interopRequireDefault(_select);

var _radio = __webpack_require__(19);

var _radio2 = _interopRequireDefault(_radio);

var _checkbox = __webpack_require__(13);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _date = __webpack_require__(14);

var _date2 = _interopRequireDefault(_date);

var _upload = __webpack_require__(20);

var _upload2 = _interopRequireDefault(_upload);

var _formControlComponent = __webpack_require__(58);

var _formControlComponent2 = _interopRequireDefault(_formControlComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.forms.form-control', [_select2.default, _radio2.default, _checkbox2.default, _date2.default, _upload2.default]).component('twFormControl', _formControlComponent2.default).component('twDynamicFormControl', _formControlComponent2.default) // Deprecated
.name;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _dynamicFormControl = __webpack_require__(15);

var _dynamicFormControl2 = _interopRequireDefault(_dynamicFormControl);

var _fieldComponent = __webpack_require__(60);

var _fieldComponent2 = _interopRequireDefault(_fieldComponent);

var _requirements = __webpack_require__(7);

var _requirements2 = _interopRequireDefault(_requirements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.forms.field', [_dynamicFormControl2.default, _requirements2.default]).component('twField', _fieldComponent2.default).name;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _field = __webpack_require__(16);

var _field2 = _interopRequireDefault(_field);

var _fieldsetComponent = __webpack_require__(62);

var _fieldsetComponent2 = _interopRequireDefault(_fieldsetComponent);

var _requirements = __webpack_require__(7);

var _requirements2 = _interopRequireDefault(_requirements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.forms.fieldset', [_field2.default, _requirements2.default]).component('twFieldset', _fieldsetComponent2.default).name;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FocusableController = function FocusableController($element, TwDomService) {
  _classCallCheck(this, FocusableController);

  var element = $element[0];
  var formGroup = TwDomService.getClosestParentByClassName(element, 'form-group');

  if (formGroup && element) {
    element.addEventListener('focus', function () {
      formGroup.classList.add('focus');
    });
    element.addEventListener('blur', function () {
      formGroup.classList.remove('focus');
    });
  }
};

FocusableController.$inject = ['$element', 'TwDomService'];

exports.default = FocusableController;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _radioComponent = __webpack_require__(67);

var _radioComponent2 = _interopRequireDefault(_radioComponent);

var _dom = __webpack_require__(1);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.forms.radio', [_dom2.default]).component('twRadio', _radioComponent2.default).name;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _uploadComponent = __webpack_require__(79);

var _uploadComponent2 = _interopRequireDefault(_uploadComponent);

var _fileInputDirective = __webpack_require__(78);

var _fileInputDirective2 = _interopRequireDefault(_fileInputDirective);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.forms.upload', []).directive('twFileInput', _fileInputDirective2.default).component('twUpload', _uploadComponent2.default).name;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _tabsComponent = __webpack_require__(100);

var _tabsComponent2 = _interopRequireDefault(_tabsComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.navigation.tabs', []).component('twTabs', _tabsComponent2.default).name;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _localeService = __webpack_require__(105);

var _localeService2 = _interopRequireDefault(_localeService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.services.locale', []).service('TwLocaleService', _localeService2.default).name;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

__webpack_require__(3);

var _forms = __webpack_require__(9);

var _forms2 = _interopRequireDefault(_forms);

var _loading = __webpack_require__(10);

var _loading2 = _interopRequireDefault(_loading);

var _services = __webpack_require__(4);

var _services2 = _interopRequireDefault(_services);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.form-components', [_forms2.default, _loading2.default, _services2.default]).name; /* This module is deprecated, but in use in several places */

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

__webpack_require__(3);

var _validation = __webpack_require__(11);

var _validation2 = _interopRequireDefault(_validation);

var _services = __webpack_require__(4);

var _services2 = _interopRequireDefault(_services);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* This module is deprecated, but in use in several places */

exports.default = _angular2.default.module('tw.form-validation', [_validation2.default, _services2.default]).name;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _popOver = __webpack_require__(81);

var _popOver2 = _interopRequireDefault(_popOver);

var _toolTip = __webpack_require__(85);

var _toolTip2 = _interopRequireDefault(_toolTip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.help', [_popOver2.default, _toolTip2.default]).name;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _affix = __webpack_require__(89);

var _affix2 = _interopRequireDefault(_affix);

var _cards = __webpack_require__(94);

var _cards2 = _interopRequireDefault(_cards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.layout', [_affix2.default, _cards2.default]).name;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _tabs = __webpack_require__(21);

var _tabs2 = _interopRequireDefault(_tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.navigation', [_tabs2.default]).name;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _currencyFormat = __webpack_require__(112);

var _currencyFormat2 = _interopRequireDefault(_currencyFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CurrencyFormat = {
  template: _currencyFormat2.default,
  bindings: {
    amount: '<',
    currency: '<',
    locale: '<'
  }
};

exports.default = CurrencyFormat;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function CurrencyFormatFilter($filter, CurrencyService, numberFormatFilter) {
  return function (number, currency, locale) {
    var precision = void 0;

    if (typeof number === 'string' && Number(number)) {
      number = Number(number);
    }

    // If the number is an integer don't show decimals
    if (number === parseInt(number, 10)) {
      precision = 0;
    } else {
      precision = CurrencyService.getDecimals(currency);
    }

    return numberFormatFilter(number, precision, locale) + ' ' + currency;
  };
}

CurrencyFormatFilter.$inject = ['$filter', 'TwCurrencyService', 'twNumberFormatFilter'];

exports.default = CurrencyFormatFilter;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _currencyFormat = __webpack_require__(28);

var _currencyFormat2 = _interopRequireDefault(_currencyFormat);

var _currencyFormat3 = __webpack_require__(29);

var _currencyFormat4 = _interopRequireDefault(_currencyFormat3);

var _currency = __webpack_require__(2);

var _currency2 = _interopRequireDefault(_currency);

var _numberFormat = __webpack_require__(12);

var _numberFormat2 = _interopRequireDefault(_numberFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.formatting.currency', [_currency2.default, _numberFormat2.default]).component('twCurrencyFormat', _currencyFormat2.default).filter('twCurrencyFormat', _currencyFormat4.default).name;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dateFormat = __webpack_require__(113);

var _dateFormat2 = _interopRequireDefault(_dateFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateDisplay = {
  template: _dateFormat2.default,
  bindings: {
    date: '<',
    locale: '<',
    format: '<'
  }
};

exports.default = DateDisplay;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function DateFormatFilter(TwDateService) {
  return function (dateSupplied, locale, format) {
    if (!dateSupplied) {
      return dateSupplied;
    }
    var date = dateSupplied;

    if (typeof date === 'string') {
      date = TwDateService.getUTCDateFromIso(date);

      var dateOnly = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'); // yyyy-mm-dd
      if (dateOnly.test(dateSupplied)) {
        return TwDateService.getUTCDateString(date, locale, format);
      }
    }

    if (!date) {
      return dateSupplied;
    }
    // Use locale timezone
    return TwDateService.getLocaleDateString(date, locale, format);
  };
}

DateFormatFilter.$inject = ['TwDateService'];

exports.default = DateFormatFilter;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _dateFormat = __webpack_require__(31);

var _dateFormat2 = _interopRequireDefault(_dateFormat);

var _dateFormat3 = __webpack_require__(32);

var _dateFormat4 = _interopRequireDefault(_dateFormat3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.formatting.date', []).component('twDateFormat', _dateFormat2.default).filter('twDateFormat', _dateFormat4.default).name;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _numberFormat = __webpack_require__(114);

var _numberFormat2 = _interopRequireDefault(_numberFormat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NumberDisplay = {
  template: _numberFormat2.default,
  bindings: {
    amount: '<',
    precision: '<',
    locale: '<'
  }
};

exports.default = NumberDisplay;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function NumberFormatFilter(LocaleService) {
  return function (number, precision, locale) {
    if (!number) {
      return number;
    }

    if (typeof number === 'string' && Number(number)) {
      number = Number(number);
    }

    var options = {};
    if (typeof precision === 'number') {
      options.minimumFractionDigits = precision;
      options.maximumFractionDigits = precision;

      if (!isNumberLocaleSupported()) {
        return number.toFixed(precision);
      }
    }

    if (locale) {
      return number.toLocaleString(locale, options);
    }

    return number.toLocaleString(LocaleService.getCurrent(), options);
  };
}

function isNumberLocaleSupported() {
  var num = 1234;
  var numString = num.toLocaleString('en-GB');
  return numString === '1,234';
}

NumberFormatFilter.$inject = ['TwLocaleService'];

exports.default = NumberFormatFilter;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _undoStackService = __webpack_require__(41);

var _undoStackService2 = _interopRequireDefault(_undoStackService);

var _textFormatService = __webpack_require__(40);

var _textFormatService2 = _interopRequireDefault(_textFormatService);

var _textFormatDirective = __webpack_require__(38);

var _textFormatDirective2 = _interopRequireDefault(_textFormatDirective);

var _textFormatFilter = __webpack_require__(39);

var _textFormatFilter2 = _interopRequireDefault(_textFormatFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.formatting.text-format', []).service('TwUndoStackFactory', _undoStackService2.default).service('TwTextFormatService', _textFormatService2.default).directive('twTextFormat', _textFormatDirective2.default).filter('twTextFormat', _textFormatFilter2.default).name;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextFormatController = function () {
  function TextFormatController($element, $timeout, $scope, TwTextFormatService, TwUndoStackFactory) {
    var _this = this;

    _classCallCheck(this, TextFormatController);

    this.keydownCount = 0;
    this.pattern = '';

    this.undoStack = TwUndoStackFactory.new();
    this.$ngModel = $element.controller('ngModel');
    this.$timeout = $timeout;
    this.TextFormatService = TwTextFormatService;

    this.element = $element[0];

    // We need the formatter for external model changes
    this.$ngModel.$formatters.push(function (value) {
      return _this.pattern ? TwTextFormatService.formatUsingPattern(value, _this.pattern) : value;
    });

    this.$ngModel.$parsers.push(function (value) {
      return _this.pattern ? TwTextFormatService.unformatUsingPattern(value, _this.pattern) : value;
    });

    this.element.addEventListener('change', function (event) {
      _this.onChange(event);
    });
    this.element.addEventListener('keydown', function (event) {
      _this.onKeydown(event);
    });
    this.element.addEventListener('paste', function (event) {
      _this.onPaste(event);
    });
    this.element.addEventListener('cut', function (event) {
      _this.onCut(event);
    });
    this.element.addEventListener('copy', function (event) {
      _this.onCopy(event);
    });

    // min/max length validators use viewValue which is still formatted.
    // After instantiation override them to unformat view value.
    this.replaceLengthValidators(this.$ngModel, this.TextFormatService, this.$timeout);

    $scope.$watch('$ctrl.twTextFormat', function (newValue) {
      _this.onPatternChange(newValue);
    });
    $scope.$watch('$ctrl.ngModel', function (newValue, oldValue) {
      _this.onModelChange(newValue, oldValue);
    });

    this.undoStack.reset(this.element.value);
  }

  _createClass(TextFormatController, [{
    key: 'onModelChange',
    value: function onModelChange(newModel, oldModel) {
      if (newModel === oldModel || !this.pattern) {
        return;
      }

      // Preserve selection range after formatting
      var selectionStart = this.element.selectionStart;
      var selectionEnd = this.element.selectionEnd;

      this.reformatControl(this.element, newModel);
      this.setSelection(selectionStart, selectionEnd);
    }
  }, {
    key: 'onPatternChange',
    value: function onPatternChange(newPattern, oldPattern) {
      if (newPattern === oldPattern) {
        this.pattern = newPattern;
        return;
      }

      if (newPattern && newPattern.indexOf('||') > 0) {
        this.pattern = newPattern.substring(0, newPattern.indexOf('||'));
      } else {
        this.pattern = newPattern;
      }

      var viewValue = this.element.value;
      if (oldPattern) {
        viewValue = this.TextFormatService.unformatUsingPattern(viewValue, oldPattern);
      }
      if (newPattern) {
        // this.pattern is correct here as we process the newPattern
        viewValue = this.TextFormatService.formatUsingPattern(viewValue, this.pattern);
      }

      this.undoStack.reset(viewValue);
      this.element.value = viewValue;
    }
  }, {
    key: 'reformatControl',
    value: function reformatControl(element, originalValue) {
      if (!originalValue) {
        originalValue = element.value;
      }

      var newValue = this.TextFormatService.reformatUsingPattern(originalValue, this.pattern);

      // Don't reset value unless we need to.
      if (newValue !== originalValue) {
        element.value = newValue;
      }
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      if (!this.pattern) {
        return;
      }
      this.reformatControl(this.element);
      this.undoStack.add(this.element.value);
    }
  }, {
    key: 'onPaste',
    value: function onPaste(event) {
      var _this2 = this;

      if (!this.pattern) {
        return;
      }
      var selectionStart = this.element.selectionStart;
      var clipboardData = event.clipboardData || window.clipboardData;
      var pastedData = clipboardData.getData('Text');

      var separatorsInPaste = this.TextFormatService.countSeparatorsInAppendedValue(this.pattern, selectionStart, pastedData);

      this.$timeout(function () {
        var newPosition = selectionStart + pastedData.length + separatorsInPaste;
        _this2.reformatControl(_this2.element);
        _this2.undoStack.add(_this2.element.value);
        _this2.setSelection(newPosition, newPosition);
      });
    }
  }, {
    key: 'onKeydown',
    value: function onKeydown(event) {
      var _this3 = this;

      if (!this.pattern) {
        return;
      }
      this.keydownCount++;
      var currentKeydownCount = this.keydownCount;
      var key = event.keyCode || event.which;
      var selectionStart = event.target.selectionStart;
      var selectionEnd = event.target.selectionEnd;

      if (reservedKeys.indexOf(key) >= 0 || event.metaKey || event.ctrlKey) {
        if (key === keys.z && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          event.stopPropagation();
          this.element.value = this.undoStack.undo();
        }
        if (key === keys.y && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          event.stopPropagation();
          this.element.value = this.undoStack.redo();
        }
        return;
      }

      this.$timeout(function () {
        _this3.afterKeydown(key, currentKeydownCount, _this3.element, _this3.pattern, selectionStart, selectionEnd);
      });
    }
  }, {
    key: 'afterKeydown',
    value: function afterKeydown(key, currentKeydownCount, element, pattern, selectionStart, selectionEnd) {
      var newVal = void 0;
      // If deleting move back
      if (key === keys.backspace) {
        newVal = this.doBackspace(element, pattern, selectionStart, selectionEnd);

        // Also trigger model update, not sure why necessary...
        this.$ngModel.$setViewValue(newVal);
      } else if (key === keys.delete) {
        newVal = this.doDelete(element, pattern, selectionStart, selectionEnd);

        // Also trigger model update, not sure why necessary...
        this.$ngModel.$setViewValue(newVal);
      } else if (this.keydownCount === currentKeydownCount) {
        // If another keydown occurred before we were able to reposition the
        // cursor, we do not want to set it to an out of date value.
        this.doKeypress(element, pattern, selectionStart, selectionEnd);
      }
    }
  }, {
    key: 'doBackspace',
    value: function doBackspace(element, pattern, selectionStart, selectionEnd) {
      element.value = this.getFormattedValueAfterBackspace(element, pattern, selectionStart, selectionEnd);

      this.undoStack.add(element.value);

      var newPosition = this.getPositionAfterBackspace(pattern, element, selectionStart, selectionEnd);

      this.setSelection(newPosition, newPosition);

      return element.value;
    }
  }, {
    key: 'getFormattedValueAfterBackspace',
    value: function getFormattedValueAfterBackspace(element, pattern, selectionStart, selectionEnd) {
      var removeStart = void 0;
      var removeEnd = void 0;
      var newVal = element.value;
      var separatorsBeforeCursor = this.TextFormatService.countSeparatorsBeforeCursor(pattern, selectionStart);

      if (separatorsBeforeCursor) {
        // If we have more separators, we must remove one less character
        var adjust = separatorsBeforeCursor > 1 ? 1 : 0;

        if (selectionStart !== selectionEnd) {
          // A range is selected, remove one less character from start
          removeStart = selectionStart - separatorsBeforeCursor + 1;
          removeEnd = selectionStart - adjust;
        } else {
          removeStart = selectionStart - separatorsBeforeCursor;
          removeEnd = selectionStart - adjust;
        }
        newVal = removeCharacters(element.value, removeStart, removeEnd);
      }

      return this.TextFormatService.reformatUsingPattern(newVal, pattern);
    }
  }, {
    key: 'doDelete',
    value: function doDelete(element, pattern, selectionStart, selectionEnd) {
      element.value = this.getFormattedValueAfterDelete(element, pattern, selectionStart, selectionEnd);

      this.undoStack.add(element.value);
      // Put cursor back where it started
      this.setSelection(selectionStart, selectionStart);

      return element.value;
    }
  }, {
    key: 'setSelection',
    value: function setSelection(start, end) {
      this.element.setSelectionRange(start, end);
    }
  }, {
    key: 'getFormattedValueAfterDelete',
    value: function getFormattedValueAfterDelete(element, pattern, selectionStart, selectionEnd) {
      var removeStart = void 0;
      var removeEnd = void 0;
      var newVal = element.value;
      var separatorsAfterCursor = this.TextFormatService.countSeparatorsAfterCursor(pattern, selectionStart);

      if (separatorsAfterCursor) {
        // If we have more separators, we must remove one less character
        var adjust = separatorsAfterCursor > 1 ? 0 : 1;

        if (selectionStart !== selectionEnd) {
          // A range is selected, remove one less character from start
          removeStart = selectionStart + adjust;
          removeEnd = selectionStart + separatorsAfterCursor + adjust;
        } else {
          // Remove the character after the separators
          removeStart = selectionStart + separatorsAfterCursor;
          removeEnd = selectionStart + separatorsAfterCursor + 1;
        }

        newVal = removeCharacters(element.value, removeStart, removeEnd);
      }
      return this.TextFormatService.reformatUsingPattern(newVal, pattern);
    }
  }, {
    key: 'doKeypress',
    value: function doKeypress(element, pattern, selectionStart, selectionEnd) {
      // The parser already called this, but doing it after appends the next separator
      this.reformatControl(element);
      this.undoStack.add(element.value);

      var newPosition = this.getPositionAfterKeypress(pattern, element, selectionStart, selectionEnd);
      this.setSelection(newPosition, newPosition);
    }
  }, {
    key: 'getPositionAfterBackspace',
    value: function getPositionAfterBackspace(pattern, element, selectionStart, selectionEnd) {
      var separatorsBefore = this.TextFormatService.countSeparatorsBeforeCursor(pattern, selectionStart);
      var isRange = selectionStart !== selectionEnd;
      // If a range was selected, we don't delete a character before cursor
      var proposedPosition = selectionStart - separatorsBefore - (isRange ? 0 : 1);
      return proposedPosition + this.TextFormatService.countSeparatorsAfterCursor(pattern, proposedPosition);
    }
  }, {
    key: 'getPositionAfterKeypress',
    value: function getPositionAfterKeypress(pattern, element, selectionStart, selectionEnd) {
      var separatorsAfter = void 0;
      if (selectionStart !== selectionEnd) {
        separatorsAfter = this.TextFormatService.countSeparatorsAfterCursor(pattern, selectionStart);
      } else {
        // TODO this works but is hard to understand
        separatorsAfter = this.TextFormatService.countSeparatorsAfterCursor(pattern, selectionStart);
        if (separatorsAfter === 0) {
          separatorsAfter = this.TextFormatService.countSeparatorsAfterCursor(pattern, selectionStart + 1);
        }
      }
      return selectionStart + 1 + separatorsAfter;
    }
  }, {
    key: 'onCut',
    value: function onCut() {
      var _this4 = this;

      if (!this.pattern) {
        return;
      }
      var selectionStart = this.element.selectionStart;
      this.$timeout(function () {
        _this4.reformatControl(_this4.element);
        _this4.undoStack.add(_this4.element.value);

        // Also move cursor to the right of any separators
        var newPosition = selectionStart + _this4.TextFormatService.countSeparatorsAfterCursor(_this4.pattern, selectionStart);
        _this4.setSelection(newPosition, newPosition);
      });
    }
  }, {
    key: 'onCopy',
    value: function onCopy() {
      var _this5 = this;

      if (!this.pattern) {
        return;
      }
      // Reset selection as otherwise lost
      var selectionStart = this.element.selectionStart;
      var selectionEnd = this.element.selectionEnd;

      this.$timeout(function () {
        _this5.setSelection(selectionStart, selectionEnd);
      });
    }
  }, {
    key: 'replaceLengthValidators',
    value: function replaceLengthValidators($ngModel, TextFormatService, $timeout) {
      var _this6 = this;

      // We must wait until the default directives have loaded before replacing
      $timeout(function () {
        var originalMinLength = $ngModel.$validators.minlength;
        var originalMaxLength = $ngModel.$validators.maxlength;
        var originalPattern = $ngModel.$validators.pattern;

        if (originalMinLength) {
          $ngModel.$validators.minlength = function (modelValue, viewValue) {
            return originalMinLength(modelValue, TextFormatService.unformatUsingPattern(viewValue, _this6.pattern));
          };
        }
        if (originalMaxLength) {
          $ngModel.$validators.maxlength = function (modelValue, viewValue) {
            return originalMaxLength(modelValue, TextFormatService.unformatUsingPattern(viewValue, _this6.pattern));
          };
        }
        if (originalPattern) {
          $ngModel.$validators.pattern = function (modelValue, viewValue) {
            return originalPattern(modelValue, TextFormatService.unformatUsingPattern(viewValue, _this6.pattern));
          };
        }
      });
    }
  }]);

  return TextFormatController;
}();

function removeCharacters(value, first, last) {
  return value.substring(0, first - 1) + value.substring(last - 1, value.length);
}

var keys = {
  cmd: 224,
  cmdLeft: 91,
  cmdRight: 93,
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  delete: 46,
  y: 89,
  z: 90
};

var reservedKeys = [keys.cmd, keys.cmdLeft, keys.cmdRight, keys.enter, keys.shift, keys.ctrl, keys.alt, keys.left, keys.up, keys.right, keys.down];

TextFormatController.$inject = ['$element', '$timeout', '$scope', 'TwTextFormatService', 'TwUndoStackFactory'];

exports.default = TextFormatController;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _textFormatController = __webpack_require__(37);

var _textFormatController2 = _interopRequireDefault(_textFormatController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TextFormat() {
  return {
    restrict: 'A',
    require: 'ngModel',
    bindToController: true,
    controllerAs: '$ctrl',
    scope: {
      ngModel: '<',
      twTextFormat: '@'
    },
    controller: _textFormatController2.default
  };
}

exports.default = TextFormat;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function TextFormatFilter(TextFormatService) {
  return function (input, pattern) {
    input = input || '';
    if (!pattern) {
      return input;
    }
    if (pattern.indexOf('||') > 0) {
      pattern = pattern.substring(0, pattern.indexOf('||'));
    }
    return TextFormatService.formatUsingPattern(input, pattern);
  };
}

TextFormatFilter.$inject = ['TwTextFormatService'];

exports.default = TextFormatFilter;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function TextFormatService() {
  var _this = this;

  this.formatUsingPattern = function (value, pattern) {
    if (!value) {
      value = '';
    }
    if (typeof pattern !== 'string') {
      return value;
    }

    var newValue = '';
    var separators = 0;
    var charactersToAllocate = value.length;
    var position = 0;

    while (charactersToAllocate) {
      if (positionIsSeparator(pattern, position)) {
        newValue += pattern[position];
        separators++;
      } else {
        newValue += value[position - separators];
        charactersToAllocate--;
      }
      position++;
    }

    var separatorsAfterCursor = _this.countSeparatorsAfterCursor(pattern, position);
    if (separatorsAfterCursor) {
      newValue += pattern.substr(position, separatorsAfterCursor);
    }
    return newValue;
  };

  this.unformatUsingPattern = function (value, pattern) {
    if (!value) {
      return '';
    }
    if (typeof pattern !== 'string') {
      return value;
    }
    for (var i = 0; i < pattern.length; i++) {
      if (positionIsSeparator(pattern, i)) {
        // Not very efficient, but regex tricky because of special characters
        while (value.indexOf(pattern[i]) >= 0) {
          value = value.replace(pattern[i], '');
        }
      }
    }
    return value;
  };

  this.reformatUsingPattern = function (value, newPattern, oldPattern) {
    if (typeof oldPattern === 'undefined') {
      oldPattern = newPattern;
    }
    return _this.formatUsingPattern(_this.unformatUsingPattern(value, oldPattern), newPattern);
  };

  this.countSeparatorsBeforeCursor = function (pattern, position) {
    var separators = 0;
    while (positionIsSeparator(pattern, position - separators - 1)) {
      separators++;
    }
    return separators;
  };

  this.countSeparatorsAfterCursor = function (pattern, position) {
    var separators = 0;
    while (positionIsSeparator(pattern, position + separators)) {
      separators++;
    }
    return separators;
  };

  // How long will a value be after separators have been inserted
  this.countSeparatorsInAppendedValue = function (pattern, position, value) {
    var separators = 0;
    var i = 0;
    var toAllocate = value.length;
    while (toAllocate) {
      if (positionIsSeparator(pattern, position + i)) {
        separators++;
      } else {
        toAllocate--;
      }
      i++;
    }
    return separators;
  };

  this.countSeparatorsInPattern = function (pattern) {
    var separators = 0;
    for (var i = 0; i < pattern.length; i++) {
      if (positionIsSeparator(pattern, i)) {
        separators++;
      }
    }
    return separators;
  };

  function positionIsSeparator(pattern, position) {
    return pattern[position] && pattern[position] !== '*';
  }
}

exports.default = TextFormatService;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function UndoStackFactory() {
  this.new = function () {
    return new UndoStack();
  };
}

/**
 * Browsers seem to implement undo as an async function, it wasn't
 * possible to get adequate behaviour using the default event, so we build
 * our own undo stack.
 */
function UndoStack() {
  var pointer = 0;
  var stack = [];

  this.reset = function (value) {
    stack = [value];
    pointer = 0;
  };

  this.add = function (value) {
    if (stack.length - 1 > pointer) {
      stack = stack.slice(0, pointer + 1);
    }
    if (stack[pointer] !== value) {
      stack.push(value);
      pointer++;
    }
  };

  this.undo = function () {
    if (pointer >= 0 && typeof stack[pointer - 1] !== 'undefined') {
      pointer--;
    }
    return stack[pointer];
  };

  this.redo = function () {
    if (pointer < stack.length && typeof stack[pointer + 1] !== 'undefined') {
      pointer++;
    }
    return stack[pointer];
  };
}

exports.default = UndoStackFactory;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _amountCurrencySelectController = __webpack_require__(43);

var _amountCurrencySelectController2 = _interopRequireDefault(_amountCurrencySelectController);

var _amountCurrencySelect = __webpack_require__(115);

var _amountCurrencySelect2 = _interopRequireDefault(_amountCurrencySelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AmountCurrencySelect = {
  controller: _amountCurrencySelectController2.default,
  template: _amountCurrencySelect2.default,
  require: {
    $ngModel: 'ngModel'
  },
  transclude: {
    addon: '?addon'
  },
  bindings: {
    ngModel: '=',
    ngMin: '<',
    ngMax: '<',
    ngRequired: '<',
    ngDisabled: '<',
    ngChange: '&',

    /* Begin deprecated */
    amountReadOnly: '<',
    onAmountChange: '&',
    /* End deprecated */

    currency: '=',
    currencies: '<',
    onCurrencyChange: '&',
    currencyFilterPlaceholder: '@',

    customActionLabel: '<',
    onCustomAction: '&',

    placeholder: '@',

    size: '@',
    locale: '@'
  }
};

exports.default = AmountCurrencySelect;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AmountCurrencySelectController = function () {
  function AmountCurrencySelectController($element, $scope, $timeout, TwCurrencyService) {
    var _this = this;

    _classCallCheck(this, AmountCurrencySelectController);

    var $ngModel = $element.controller('ngModel');

    this.element = $element[0];
    this.$timeout = $timeout;
    this.showDecimals = true;
    this.CurrencyService = TwCurrencyService;

    $scope.$watch('$ctrl.ngModel', function (newValue, oldValue) {
      if (newValue !== oldValue) {
        $ngModel.$setDirty();
      }
    });

    $scope.$watch('$ctrl.currency', function (newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        _this.showDecimals = _this.CurrencyService.getDecimals(newValue) > 0;
      }
    });

    var input = $element[0].getElementsByTagName('input')[0];
    input.addEventListener('blur', function () {
      $ngModel.$setTouched();
      _this.element.dispatchEvent(new CustomEvent('blur'));
    });

    $ngModel.$validators.min = function (modelValue, viewValue) {
      if (typeof _this.ngMin === 'undefined' || _this.ngMin === null || !isNumber(viewValue)) {
        return true;
      }

      return viewValue >= _this.ngMin;
    };

    $ngModel.$validators.max = function (modelValue, viewValue) {
      if (typeof _this.ngMax === 'undefined' || _this.ngMax === null || !isNumber(viewValue)) {
        return true;
      }

      return viewValue <= _this.ngMax;
    };

    // eslint-disable-next-line no-console
    if (this.element.getAttribute('on-amount-change') && console && console.log) {
      // eslint-disable-next-line no-console
      console.log('onAmountChange is deprecated in twAmountCurrencySelect, please use ngChange.');
    }
  }

  _createClass(AmountCurrencySelectController, [{
    key: 'changedAmount',
    value: function changedAmount() {
      if (this.ngChange) {
        // $timeout is needed to get the last ngModel value.
        // See: https://github.com/angular/angular.js/issues/4558
        this.$timeout(this.ngChange);
      }
      /* Deprecated */
      if (this.onAmountChange) {
        // $timeout is needed to get the last ngModel value.
        // See: https://github.com/angular/angular.js/issues/4558
        this.$timeout(this.onAmountChange);
      }
    }
  }, {
    key: 'changedCurrency',
    value: function changedCurrency() {
      if (this.onCurrencyChange) {
        this.$timeout(this.onCurrencyChange);
      }
    }
  }, {
    key: 'customAction',
    value: function customAction() {
      if (this.onCustomAction) {
        this.onCustomAction();
      }
    }
  }]);

  return AmountCurrencySelectController;
}();

function isNumber(value) {
  return !isNaN(parseFloat(value)); // eslint-disable-line no-restricted-globals
}

AmountCurrencySelectController.$inject = ['$element', '$scope', '$timeout', 'TwCurrencyService'];

exports.default = AmountCurrencySelectController;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _select = __webpack_require__(5);

var _select2 = _interopRequireDefault(_select);

var _amountCurrencySelectComponent = __webpack_require__(42);

var _amountCurrencySelectComponent2 = _interopRequireDefault(_amountCurrencySelectComponent);

var _currency = __webpack_require__(2);

var _currency2 = _interopRequireDefault(_currency);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.forms.amount-currency-select', [_select2.default, _currency2.default]).component('twAmountCurrencySelect', _amountCurrencySelectComponent2.default).name;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _checkboxController = __webpack_require__(46);

var _checkboxController2 = _interopRequireDefault(_checkboxController);

var _checkbox = __webpack_require__(116);

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = {
  controller: _checkboxController2.default,
  template: _checkbox2.default,
  require: {
    $ngModel: 'ngModel'
  },
  bindings: {
    name: '@',
    ngModel: '=',
    ngTrueValue: '<',
    ngFalseValue: '<',
    ngRequired: '<',
    ngDisabled: '<'
  }
};

exports.default = Checkbox;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CheckboxController = function () {
  function CheckboxController($scope, $element, TwDomService) {
    _classCallCheck(this, CheckboxController);

    var $ngModel = $element.controller('ngModel');

    this.dom = TwDomService;
    this.$element = $element;
    this.element = $element[0];
    this.checked = this.isChecked();

    this.addLabelHandler();
    this.addWatchers($scope, $element, $ngModel);

    this.checkboxContainer = this.dom.getClosestParentByClassName(this.element, 'checkbox');

    this.label = this.checkboxContainer ? this.checkboxContainer.getElementsByTagName('label')[0] : false;
  }

  _createClass(CheckboxController, [{
    key: 'isChecked',
    value: function isChecked() {
      return this.ngTrueValue && this.ngTrueValue === this.ngModel || !this.ngTrueValue && this.ngModel || false;
    }
  }, {
    key: 'buttonClick',
    value: function buttonClick(event) {
      if (this.checked) {
        this.checked = false;
        this.$ngModel.$setViewValue(this.ngFalseValue || false);
      } else {
        this.checked = true;
        this.$ngModel.$setViewValue(this.ngTrueValue || true);
      }
      this.$ngModel.$setTouched();

      if (event) {
        // Prevent button click propgation from firing label
        event.stopPropagation();
      }

      validateCheckbox(this.checked, this.$element, this.$ngModel, this.ngRequired, this.dom);
    }
  }, {
    key: 'buttonFocus',
    value: function buttonFocus() {
      if (this.label) {
        this.label.classList.add('focus');
      }

      this.element.dispatchEvent(new CustomEvent('focus'));
    }
  }, {
    key: 'buttonBlur',
    value: function buttonBlur() {
      if (this.label) {
        this.label.classList.remove('focus');
      }

      this.element.dispatchEvent(new CustomEvent('blur'));
      this.$ngModel.$setTouched();

      validateCheckbox(this.checked, this.$element, this.$ngModel, this.ngRequired, this.dom);
    }

    // IE 'clicks' the hidden input when label is clicked

  }, {
    key: 'addLabelHandler',
    value: function addLabelHandler() {
      var _this = this;

      var label = this.dom.getClosestParentByTagName(this.element, 'label');

      if (!label) {
        return;
      }
      label.addEventListener('click', function (event) {
        var isDisabled = label.getAttribute('disabled');
        if (!isDisabled) {
          var button = _this.element.getElementsByTagName('button')[0];
          // Trigger our button, prevent default label behaviour
          button.dispatchEvent(new CustomEvent('click'));
        }
        event.preventDefault();
        event.stopPropagation();
      });
    }
  }, {
    key: 'addWatchers',
    value: function addWatchers($scope, $element, $ngModel) {
      var _this2 = this;

      $scope.$watch('$ctrl.ngModel', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          $ngModel.$setDirty();
          validateCheckbox(_this2.checked, $element, $ngModel, _this2.ngRequired, _this2.dom);
          _this2.checked = _this2.isChecked();
        }
      });

      $scope.$watch('$ctrl.ngDisabled', function (newValue, oldValue) {
        var element = $element[0];
        var checkbox = _this2.dom.getClosestParentByClassName(element, 'checkbox');
        var label = _this2.dom.getClosestParentByTagName(element, 'label');

        if (!checkbox) {
          return;
        }
        if (newValue && !oldValue) {
          checkbox.classList.add('disabled');
          // checkbox.setAttribute('disabled', true);
          label.setAttribute('disabled', 'true');
        } else if (!newValue && oldValue) {
          checkbox.classList.remove('disabled');
          // checkbox.removeAttribute('disabled');
          label.removeAttribute('disabled');
        }
      });

      $scope.$watch('$ctrl.ngRequired', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          validateCheckbox(_this2.checked, $element, $ngModel, _this2.ngRequired, _this2.dom);
        }
      });
    }
  }], [{
    key: 'hiddenClick',
    value: function hiddenClick($event) {
      $event.stopPropagation();
    }
  }]);

  return CheckboxController;
}();

function validateCheckbox(isChecked, $element, $ngModel, isRequired, dom) {
  if (!$ngModel.$touched) {
    return;
  }
  var element = $element[0];
  var button = element.getElementsByClassName('tw-checkbox-button')[0];
  var checkboxLabel = dom.getClosestParentByClassName(element, 'checkbox');
  var formGroup = dom.getClosestParentByClassName(element, 'form-group');

  if (!isChecked && isRequired) {
    $ngModel.$setValidity('required', false);
    button.classList.add('has-error');
    if (checkboxLabel) {
      checkboxLabel.classList.add('has-error');
    }
    if (formGroup) {
      formGroup.classList.add('has-error');
    }
  } else {
    $ngModel.$setValidity('required', true);
    button.classList.remove('has-error');
    if (checkboxLabel) {
      checkboxLabel.classList.remove('has-error');
    }
    if (formGroup) {
      formGroup.classList.remove('has-error');
    }
  }
}

CheckboxController.$inject = ['$scope', '$element', 'TwDomService'];

exports.default = CheckboxController;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _currencyInputController = __webpack_require__(48);

var _currencyInputController2 = _interopRequireDefault(_currencyInputController);

var _currencyInput = __webpack_require__(117);

var _currencyInput2 = _interopRequireDefault(_currencyInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CurrencyInput = {
  controller: _currencyInputController2.default,
  template: _currencyInput2.default,
  require: {
    $ngModel: 'ngModel'
  },
  transclude: {
    addon: '?addon'
  },
  bindings: {
    ngModel: '=',
    ngChange: '&',
    ngMin: '<',
    ngMax: '<',
    ngRequired: '<',
    ngDisabled: '<',
    currency: '=',
    currencyCode: '@',
    placeholder: '@',
    size: '@',
    locale: '@'
  }
};

exports.default = CurrencyInput;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CurrencyInputController = function () {
  function CurrencyInputController($element, $scope, $timeout, TwCurrencyService) {
    var _this = this;

    _classCallCheck(this, CurrencyInputController);

    var $ngModel = $element.controller('ngModel');
    var element = $element[0];

    this.CurrencyService = TwCurrencyService;
    this.$timeout = $timeout;
    this.showDecimals = true;

    $scope.$watch('$ctrl.ngModel', function (newValue, oldValue) {
      if (newValue !== oldValue) {
        $ngModel.$setDirty();
      }
    });
    $scope.$watch('$ctrl.currency', function (newValue, oldValue) {
      if (newValue !== oldValue) {
        _this.showDecimals = _this.CurrencyService.getDecimals(newValue) > 0;
      }
    });

    var input = element.getElementsByTagName('input')[0];
    input.addEventListener('blur', function () {
      $ngModel.$setTouched();
      element.dispatchEvent(new CustomEvent('blur'));
    });

    // eslint-disable-next-line no-console
    if (element.getAttribute('currency-code') && console && console.log) {
      // eslint-disable-next-line no-console
      console.log('currency code is deprecated in twCurrencyInput, please use currency.');
    }

    $ngModel.$validators.min = function (modelValue, viewValue) {
      if (typeof _this.ngMin === 'undefined' || _this.ngMin === null || !isNumber(viewValue)) {
        return true;
      }

      return viewValue >= _this.ngMin;
    };

    $ngModel.$validators.max = function (modelValue, viewValue) {
      if (typeof _this.ngMax === 'undefined' || _this.ngMax === null || !isNumber(viewValue)) {
        return true;
      }

      return viewValue <= _this.ngMax;
    };
  }

  _createClass(CurrencyInputController, [{
    key: 'changedInputValue',
    value: function changedInputValue() {
      if (this.ngChange) {
        // $timeout is needed to get the last ngModel value.
        // See: https://github.com/angular/angular.js/issues/4558
        this.$timeout(this.ngChange);
      }
    }
  }]);

  return CurrencyInputController;
}();

function isNumber(value) {
  return !isNaN(parseFloat(value)); // eslint-disable-line no-restricted-globals
}

CurrencyInputController.$inject = ['$element', '$scope', '$timeout', 'TwCurrencyService'];

exports.default = CurrencyInputController;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _currencyInputComponent = __webpack_require__(47);

var _currencyInputComponent2 = _interopRequireDefault(_currencyInputComponent);

var _currency = __webpack_require__(2);

var _currency2 = _interopRequireDefault(_currency);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.forms.currency-input', [_currency2.default]).component('twCurrencyInput', _currencyInputComponent2.default).name;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dateLookupController = __webpack_require__(51);

var _dateLookupController2 = _interopRequireDefault(_dateLookupController);

var _dateLookup = __webpack_require__(118);

var _dateLookup2 = _interopRequireDefault(_dateLookup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateLookup = {
  controller: _dateLookupController2.default,
  template: _dateLookup2.default,
  require: {
    $ngModel: 'ngModel'
  },
  bindings: {
    ngModel: '=',
    ngChange: '&',
    ngMin: '<',
    ngMax: '<',
    ngRequired: '<',
    ngDisabled: '<',
    placeholder: '@',
    size: '@',
    locale: '@',
    label: '@',
    shortDate: '<'
  }
};

exports.default = DateLookup;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateLookupController = function () {
  function DateLookupController($element, $scope, $timeout, TwDateService, TwDomService) {
    var _this = this;

    _classCallCheck(this, DateLookupController);

    var $ngModel = $element.controller('ngModel');

    this.DateService = TwDateService;
    this.$element = $element;
    this.element = $element[0];
    this.$timeout = $timeout;
    this.yearOffset = 0;

    this.addValidators($ngModel, $element);
    this.addWatchers($scope, $ngModel);

    $ngModel.$formatters.push(function (newDate) {
      _this.updateCalendarView(newDate);
      return newDate;
    });

    this.formGroup = TwDomService.getClosestParentByClassName(this.element, 'form-group');

    var button = this.element.getElementsByClassName('btn')[0];
    var buttonGroup = this.element.getElementsByClassName('btn-group')[0];
    var dropdown = this.element.getElementsByClassName('dropdown-menu')[0];

    var onFocusOut = function onFocusOut() {
      $timeout(function () {
        // If button isn't focused and dropdown not open, then blur
        if (button !== document.activeElement && !buttonGroup.classList.contains('open')) {
          if (_this.formGroup) {
            _this.formGroup.classList.remove('focus');
          }
          _this.element.dispatchEvent(new CustomEvent('blur'));
        }
      }, 150); // need timeout because using dropdown.js,
    };

    button.addEventListener('focusout', onFocusOut);
    dropdown.addEventListener('focusout', onFocusOut);

    this.setLocale(this.locale);

    this.updateMinDateView(this.ngMin);
    this.updateMaxDateView(this.ngMax);

    this.button = button;
  }

  _createClass(DateLookupController, [{
    key: 'openLookup',
    value: function openLookup() {
      var _this2 = this;

      this.$ngModel.$setTouched();
      this.mode = 'day';

      var viewDate = this.ngModel;
      if (this.ngMin && this.ngModel < this.ngMin) {
        viewDate = this.ngMin;
      }
      if (this.ngMax && this.ngModel > this.ngMax) {
        viewDate = this.ngMax;
      }
      this.updateCalendarView(viewDate);

      this.$timeout(function () {
        var monthLabel = _this2.element.getElementsByClassName('tw-date-lookup-month-label')[0];
        monthLabel.focus();
      });
    }
  }, {
    key: 'selectDay',
    value: function selectDay($event, day, month, year) {
      if (this.isDayDisabled(day, month, year)) {
        // Don't close dropdown, don't set model
        $event.stopPropagation();
        return;
      }
      this.day = day;
      // Always set model to UTC dates
      this.setModel(this.DateService.getUTCDateFromParts(year, month, day));
      resetFocus(this.element);
      this.updateCalendarDatePresentation();
    }
  }, {
    key: 'selectMonth',
    value: function selectMonth($event, month, year) {
      $event.stopPropagation();
      if (this.isMonthDisabled(month, year)) {
        return;
      }
      this.month = month;
      this.weeks = this.getTableStructure();
      this.mode = 'day';
      this.updateCalendarDatePresentation();
    }
  }, {
    key: 'selectYear',
    value: function selectYear($event, year) {
      $event.stopPropagation();
      if (this.isYearDisabled(year)) {
        return;
      }
      this.year = year;
      this.mode = 'month';
      this.updateCalendarDatePresentation();
    }
  }, {
    key: 'monthBefore',
    value: function monthBefore($event) {
      // Prevent dropdown closing
      $event.stopPropagation();
      if (this.month === 0) {
        this.year--;
        this.month = 11;
      } else {
        this.month--;
      }
      this.weeks = this.getTableStructure();
      this.updateCalendarDatePresentation();
    }
  }, {
    key: 'yearBefore',
    value: function yearBefore($event) {
      // Prevent dropdown closing
      $event.stopPropagation();
      this.year--;
      this.weeks = this.getTableStructure();
      this.updateCalendarDatePresentation();
    }
  }, {
    key: 'monthAfter',
    value: function monthAfter($event) {
      // Prevent dropdown closing
      $event.stopPropagation();
      if (this.month === 11) {
        this.year++;
        this.month = 0;
      } else {
        this.month++;
      }
      this.weeks = this.getTableStructure();
      this.updateCalendarDatePresentation();
    }
  }, {
    key: 'yearAfter',
    value: function yearAfter($event) {
      // Prevent dropdown closing
      $event.stopPropagation();
      this.year++;
      this.weeks = this.getTableStructure();
      this.updateCalendarDatePresentation();
    }
  }, {
    key: 'isCurrentlySelected',
    value: function isCurrentlySelected(day, month, year) {
      return day === this.selectedDate && month === this.selectedMonth && year === this.selectedYear;
    }
  }, {
    key: 'isDayDisabled',
    value: function isDayDisabled(day, month, year) {
      return this.isYearDisabled(year) || this.isMonthDisabled(month, year) || year === this.minYear && month === this.minMonth && day < this.minDay || year === this.maxYear && month === this.maxMonth && day > this.maxDay;
    }
  }, {
    key: 'isMonthDisabled',
    value: function isMonthDisabled(month, year) {
      return this.isYearDisabled(year) || year === this.minYear && month < this.minMonth || year === this.maxYear && month > this.maxMonth;
    }
  }, {
    key: 'isYearDisabled',
    value: function isYearDisabled(year) {
      return this.minYear && year < this.minYear || this.maxYear && year > this.maxYear;
    }
  }, {
    key: 'switchToMonths',
    value: function switchToMonths(event) {
      this.findActiveLink();
      event.stopPropagation();
      this.mode = 'month';
    }
  }, {
    key: 'switchToYears',
    value: function switchToYears(event) {
      this.findActiveLink();
      event.stopPropagation();
      this.mode = 'year';
    }
  }, {
    key: 'setYearOffset',
    value: function setYearOffset($event, addtionalOffset) {
      $event.stopPropagation();
      this.yearOffset += addtionalOffset;
    }
  }, {
    key: 'buttonFocus',
    value: function buttonFocus() {
      if (this.formGroup) {
        this.formGroup.classList.add('focus');
      }
      this.element.dispatchEvent(new CustomEvent('focus'));
    }
  }, {
    key: 'addValidators',
    value: function addValidators($ngModel) {
      var _this3 = this;

      $ngModel.$validators.min = function (modelValue, viewValue) {
        var value = modelValue || viewValue;
        if (value && _this3.ngMin && value < _this3.ngMin) {
          if (_this3.formGroup) {
            _this3.formGroup.classList.add('has-error');
          }
          return false;
        }
        return true;
      };
      $ngModel.$validators.max = function (modelValue, viewValue) {
        var value = modelValue || viewValue;
        if (value && _this3.ngMax && value > _this3.ngMax) {
          if (_this3.formGroup) {
            _this3.formGroup.classList.add('has-error');
          }
          return false;
        }
        return true;
      };
    }
  }, {
    key: 'addWatchers',
    value: function addWatchers($scope, $ngModel) {
      var _this4 = this;

      $scope.$watch('$ctrl.locale', function (newValue, oldValue) {
        if (newValue && newValue !== oldValue) {
          _this4.setLocale(newValue);
        }
      });

      $scope.$watch('$ctrl.ngRequired', function () {
        $ngModel.$validate();
      });

      $scope.$watch('$ctrl.ngMin', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          _this4.updateMinDateView(_this4.ngMin);
          $ngModel.$validate();
        }
      });

      $scope.$watch('$ctrl.shortDate', function () {
        _this4.updateSelectedDatePresentation();
      });

      $scope.$watch('$ctrl.ngMax', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          _this4.updateMaxDateView(_this4.ngMax);
          $ngModel.$validate();
        }
      });

      $scope.$watch('$ctrl.ngModel', function (newValue) {
        if (newValue) {
          _this4.selectedDate = _this4.DateService.getUTCDate(newValue);
          _this4.selectedMonth = _this4.DateService.getUTCMonth(newValue);
          _this4.selectedYear = _this4.DateService.getUTCFullYear(newValue);
          _this4.updateSelectedDatePresentation();
        }
      });
    }
  }, {
    key: 'updateCalendarView',
    value: function updateCalendarView(viewDate) {
      if (!viewDate || !viewDate.getUTCDate) {
        // We want user's 'today' in UTC
        viewDate = this.DateService.getLocaleToday();
      }

      // Provided dates should use UTC
      this.day = this.DateService.getUTCDate(viewDate);
      this.month = this.DateService.getUTCMonth(viewDate);
      this.year = this.DateService.getUTCFullYear(viewDate);

      this.weeks = this.getTableStructure();

      this.updateCalendarDatePresentation();
    }
  }, {
    key: 'getTableStructure',
    value: function getTableStructure() {
      var firstDayOfMonth = this.DateService.getWeekday(this.year, this.month, 1);
      if (firstDayOfMonth === 0) {
        firstDayOfMonth = 7;
      }
      var daysInMonth = this.DateService.getLastDayOfMonth(this.year, this.month);

      var week = [];
      var weeks = [];
      var i = void 0;

      // Pad first week
      for (i = 1; i < firstDayOfMonth; i++) {
        week.push(false);
      }
      // Fill in days
      for (i = 1; i <= daysInMonth; i++) {
        week.push(i);
        if ((firstDayOfMonth + i - 1) % 7 === 0) {
          weeks.push(week);
          week = [];
        }
      }
      if (week.length) {
        // Pad last week
        for (i = week.length; i < 7; i++) {
          week.push(false);
        }
        weeks.push(week);
      }
      return weeks;
    }
  }, {
    key: 'setLocale',
    value: function setLocale(locale) {
      if (!locale) {
        this.locale = 'en-GB';
      }
      this.monthBeforeDay = this.DateService.isMonthBeforeDay(this.locale);
      this.monthsOfYear = this.DateService.getMonthNamesForLocale(this.locale, 'long');
      this.shortMonthsOfYear = this.DateService.getMonthNamesForLocale(this.locale, 'short');

      // JS days start from Sunday, but we present from Monday
      var jsDays = this.DateService.getDayNamesForLocale(this.locale, 'short');
      var jsShortDays = this.DateService.getDayNamesForLocale(this.locale, 'narrow');
      jsDays.push(jsDays.shift());
      jsShortDays.push(jsShortDays.shift());
      this.daysOfWeek = jsDays;
      this.shortDaysOfWeek = jsShortDays;
      this.updateSelectedDatePresentation();
    }
  }, {
    key: 'updateSelectedDatePresentation',
    value: function updateSelectedDatePresentation() {
      this.selectedDateFormatted = this.DateService.getYearMonthDatePresentation(this.selectedYear, this.selectedMonth, this.selectedDate, this.locale, this.shortDate ? 'short' : 'long');
    }
  }, {
    key: 'updateCalendarDatePresentation',
    value: function updateCalendarDatePresentation() {
      this.yearMonthFormatted = this.DateService.getYearAndMonthPresentation(this.year, this.month, this.locale, this.shortDate ? 'short' : 'long');
    }
  }, {
    key: 'moveDateToWithinRange',
    value: function moveDateToWithinRange(date, min, max) {
      if (!date) {
        date = this.DateService.getLocaleToday();
      }
      if (min && min > date) {
        return min;
      }
      if (max && max < date) {
        return max;
      }
      return date;
    }
  }, {
    key: 'setModel',
    value: function setModel(modelDate) {
      modelDate = this.moveDateToWithinRange(modelDate, this.ngMin, this.ngMax);
      this.$ngModel.$setViewValue(modelDate);
      this.$ngModel.$setDirty();

      this.updateCalendarView(modelDate);
    }
  }, {
    key: 'updateMinDateView',
    value: function updateMinDateView(minDate) {
      if (minDate && minDate.getUTCDate) {
        this.minDay = this.DateService.getUTCDate(minDate);
        this.minMonth = this.DateService.getUTCMonth(minDate);
        this.minYear = this.DateService.getUTCFullYear(minDate);
      } else {
        this.minDay = null;
        this.minMonth = null;
        this.minYear = null;
      }
    }
  }, {
    key: 'updateMaxDateView',
    value: function updateMaxDateView(maxDate) {
      if (maxDate && maxDate.getUTCDate) {
        this.maxDay = this.DateService.getUTCDate(maxDate);
        this.maxMonth = this.DateService.getUTCMonth(maxDate);
        this.maxYear = this.DateService.getUTCFullYear(maxDate);
      } else {
        this.maxDay = null;
        this.maxMonth = null;
        this.maxYear = null;
      }
    }

    // Keydown as keypress did not work in chrome/safari

  }, {
    key: 'keyHandler',
    value: function keyHandler(event) {
      if (!this.ngModel) {
        // Always set model to UTC dates
        var newDate = this.DateService.getUTCDateFromParts(this.year, this.month, this.day);
        this.setModel(newDate);
        return;
      }

      var characterCode = event.which || event.charCode || event.keyCode;

      if (characterCode === 37) {
        // Left arrow key
        this.adjustDate(this.mode, this.ngModel, -1, -1, -1);
      } else if (characterCode === 38) {
        // Up arrow key
        event.preventDefault(); // Prevent browser scroll
        this.adjustDate(this.mode, this.ngModel, -7, -4, -4);
      } else if (characterCode === 39) {
        // Right arrow key
        this.adjustDate(this.mode, this.ngModel, 1, 1, 1);
      } else if (characterCode === 40) {
        // Down arrow key
        event.preventDefault(); // Prevent browser scroll
        this.adjustDate(this.mode, this.ngModel, 7, 4, 4);
      }

      this.findActiveLink();
    }
  }, {
    key: 'findActiveLink',
    value: function findActiveLink() {
      var _this5 = this;

      // Perform after current digest
      this.$timeout(function () {
        var activeLink = _this5.element.getElementsByClassName('active')[0];
        if (activeLink) {
          activeLink.focus();
        }
      });
    }
  }, {
    key: 'adjustDate',
    value: function adjustDate(mode, date, days, months, years) {
      var newDate = date;
      if (mode === 'day') {
        newDate = this.DateService.addDays(date, days);
      }
      if (mode === 'month') {
        newDate = this.DateService.addMonths(date, months);
      }
      if (mode === 'year') {
        newDate = this.DateService.addYears(date, years);
      }
      this.setModel(newDate);
    }
  }, {
    key: 'calculateYear',
    value: function calculateYear(row, column) {
      return this.year - this.year % 20 + row + column + this.yearOffset;
    }
  }]);

  return DateLookupController;
}();

function resetFocus(element) {
  var button = element.getElementsByTagName('button')[0];
  if (button) {
    button.focus();
  }
}

DateLookupController.$inject = ['$element', '$scope', '$timeout', 'TwDateService', 'TwDomService'];

exports.default = DateLookupController;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _dateLookupComponent = __webpack_require__(50);

var _dateLookupComponent2 = _interopRequireDefault(_dateLookupComponent);

var _date = __webpack_require__(6);

var _date2 = _interopRequireDefault(_date);

var _dom = __webpack_require__(1);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.forms.date-lookup', [_date2.default, _dom2.default]).component('twDateLookup', _dateLookupComponent2.default).name;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dateController = __webpack_require__(54);

var _dateController2 = _interopRequireDefault(_dateController);

var _date = __webpack_require__(119);

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateControl = {
  controller: _dateController2.default,
  template: _date2.default,
  require: {
    $ngModel: 'ngModel'
  },
  bindings: {
    ngModel: '=',
    required: '@',
    ngRequired: '<',
    disabled: '@',
    ngDisabled: '<',
    locale: '@',
    twLocale: '<',
    min: '@',
    ngMin: '<',
    max: '@',
    ngMax: '<',
    modelType: '@'
  }
};

exports.default = DateControl;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateController = function () {
  function DateController($element, $log, $scope, TwDateService) {
    _classCallCheck(this, DateController);

    var $ngModel = $element.controller('ngModel');

    this.DateService = TwDateService;
    this.initialisedWithDate = false;

    if (this.ngModel) {
      this.applyDateModelIfValidOrThrowError();
      this.initialisedWithDate = true;
    } else {
      if (this.modelType) {
        if (this.modelType === STRING_TYPE || this.modelType === OBJECT_TYPE) {
          this.dateModelType = this.modelType;
        } else {
          throw new Error('Invalid modelType, should be ' + STRING_TYPE + ' or ' + OBJECT_TYPE);
        }
      } else {
        this.dateModelType = OBJECT_TYPE;
      }

      this.day = null;
      this.month = 0;
      this.year = null;
    }

    this.setDateRequired();
    this.setDateDisabled();
    this.setDateLocale();

    this.setMonths();

    this.addValidators($ngModel);
    this.addWatchers($scope, $ngModel);
    addFocusHandlers($element);
    addBlurHandlers($element, $ngModel);
  }

  _createClass(DateController, [{
    key: 'applyDateModelIfValidOrThrowError',
    value: function applyDateModelIfValidOrThrowError() {
      if (validDate(this.ngModel)) {
        this.dateModelType = typeof this.ngModel === 'string' ? STRING_TYPE : OBJECT_TYPE;

        this.explodeDateModel(this.ngModel);
      } else {
        throw new Error('date model passed should either be instance of ' + 'Date or valid ISO8601 string');
      }
    }
  }, {
    key: 'setMonths',
    value: function setMonths() {
      this.dateMonths = this.getMonthsBasedOnIntlSupportForLocale();
    }
  }, {
    key: 'setDateRequired',
    value: function setDateRequired() {
      this.dateRequired = this.ngRequired !== undefined ? this.ngRequired : this.required !== undefined;
    }
  }, {
    key: 'setDateDisabled',
    value: function setDateDisabled() {
      this.dateDisabled = this.ngDisabled !== undefined ? this.ngDisabled : this.disabled !== undefined;
    }
  }, {
    key: 'setDateLocale',
    value: function setDateLocale() {
      if (!this.locale) {
        this.locale = DEFAULT_LOCALE_EN;
      }
      this.monthBeforeDay = this.DateService.isMonthBeforeDay(this.locale);
    }
  }, {
    key: 'explodeDateModel',
    value: function explodeDateModel(date) {
      var dateObj = typeof date === 'string' ? new Date(date) : date;

      this.day = dateObj.getUTCDate();
      this.month = dateObj.getUTCMonth();
      this.year = dateObj.getUTCFullYear();
    }
  }, {
    key: 'addValidators',
    value: function addValidators($ngModel) {
      var _this = this;

      $ngModel.$validators.min = function (value) {
        var limit = prepDateLimitForComparison(_this.ngMin, _this.min);
        var dateValue = prepDateValueForComparison(value);

        return !limit || !dateValue || dateValue >= limit;
      };

      $ngModel.$validators.max = function (value) {
        var limit = prepDateLimitForComparison(_this.ngMax, _this.max);
        var dateValue = prepDateValueForComparison(value);

        return !limit || !dateValue || dateValue <= limit;
      };
    }
  }, {
    key: 'addWatchers',
    value: function addWatchers($scope, $ngModel) {
      var _this2 = this;

      $scope.$watch('$ctrl.day', function (newValue, oldValue) {
        if (newValue !== oldValue && _this2.initialisedWithDate) {
          $ngModel.$setDirty();
        }
      });

      $scope.$watch('$ctrl.month', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          _this2.adjustLastDay();
          $ngModel.$setTouched(); // Input watcher doesn't work for month
          if (_this2.initialisedWithDate) {
            $ngModel.$setDirty();
          }
        }
      });

      $scope.$watch('$ctrl.year', function (newValue, oldValue) {
        if (newValue !== oldValue && _this2.initialisedWithDate) {
          $ngModel.$setDirty();
        }
      });

      $scope.$watch('$ctrl.ngModel', function (newValue, oldValue) {
        if (newValue === oldValue) {
          return;
        }

        if (validDate(_this2.ngModel)) {
          $ngModel.$setDirty();
          _this2.explodeDateModel(_this2.ngModel);
        }
      });

      $scope.$watch('$ctrl.ngRequired', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          _this2.setDateRequired();
        }
      });

      $scope.$watch('$ctrl.ngDisabled', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          _this2.setDateDisabled();
        }
      });

      $scope.$watch('$ctrl.locale', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          _this2.setDateLocale();
          _this2.setMonths();
        }
      });
    }
  }, {
    key: 'getMonthsBasedOnIntlSupportForLocale',
    value: function getMonthsBasedOnIntlSupportForLocale() {
      var monthNames = this.DateService.getMonthNamesForLocale(this.locale);

      return extendMonthsWithIds(monthNames);
    }
  }, {
    key: 'combineDate',
    value: function combineDate() {
      return this.DateService.getUTCDateFromParts(Number(this.year), Number(this.month), Number(this.day));
    }
  }, {
    key: 'updateDateModelAndValidationClasses',
    value: function updateDateModelAndValidationClasses() {
      this.adjustLastDay();

      if (!isExplodedDatePatternCorrect(this.year, this.month, this.day)) {
        this.$ngModel.$setViewValue(null);
        return;
      }

      var dateObj = this.combineDate();

      if (this.dateModelType === STRING_TYPE) {
        var isoString = dateObj.toISOString();
        var dateString = isoString.substring(0, isoString.indexOf('T'));

        this.$ngModel.$setViewValue(dateString);
      } else {
        this.$ngModel.$setViewValue(dateObj);
      }
    }
  }, {
    key: 'adjustLastDay',
    value: function adjustLastDay() {
      var day = Number(this.day);
      var month = Number(this.month);
      var year = Number(this.year);

      var lastUTCDayForMonthAndYear = this.DateService.getLastDayOfMonth(year, month);

      if (day > lastUTCDayForMonthAndYear) {
        // Using setViewValue does not update DOM, only model.
        this.day = parseInt(lastUTCDayForMonthAndYear, 10);
      }
    }
  }]);

  return DateController;
}();

var DEFAULT_LOCALE_EN = 'en';
var STRING_TYPE = 'string';
var OBJECT_TYPE = 'object';

function isNumber(value) {
  return typeof value === 'number';
}

function isNumericString(value) {
  // eslint-disable-next-line no-restricted-globals
  return typeof value === 'string' && !isNaN(Number(value));
}

function isExplodedDatePatternCorrect(year, month, day) {
  return isNumber(year) && isNumber(day) && (isNumber(month) || isNumericString(month));
}

function validDate(date) {
  return validDateObject(date) || validDateString(date);
}

function validDateObject(dateObj) {
  return Object.prototype.toString.call(dateObj) === '[object Date]' && !isNaN(dateObj.getTime()); // eslint-disable-line no-restricted-globals
}

function validDateString(dateString) {
  return typeof dateString === 'string' && validDateObject(new Date(dateString));
}

function prepDateLimitForComparison(ngLimit, attrLimit) {
  var limit = ngLimit || attrLimit;

  if (!limit) {
    return false;
  }
  limit = typeof limit === 'string' ? new Date(limit) : limit;
  if (!validDateObject(limit)) {
    return false;
  }
  return limit;
}

function prepDateValueForComparison(dateValue) {
  return typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
}

function extendMonthsWithIds(monthNames) {
  // eslint-disable-next-line arrow-body-style
  return monthNames.map(function (monthName, index) {
    return {
      value: index,
      label: monthName
    };
  });
}

// TODO behaviour of focus/blur could be improved to prevent multiple fires
function addFocusHandlers($element) {
  var element = $element[0];
  var dayInput = element.querySelector('input[name=day]');
  var yearInput = element.querySelector('input[name=year]');

  dayInput.addEventListener('focus', function () {
    element.dispatchEvent(new CustomEvent('focus'));
  });

  yearInput.addEventListener('focus', function () {
    element.dispatchEvent(new CustomEvent('focus'));
  });
}

function addBlurHandlers($element, $ngModel) {
  var dayTouched = void 0;
  var yearTouched = void 0;

  var element = $element[0];
  var dayInput = element.querySelector('input[name=day]');
  var yearInput = element.querySelector('input[name=year]');

  dayInput.addEventListener('blur', function () {
    dayTouched = true;
    if (dayTouched && yearTouched) {
      $ngModel.$setTouched();
      element.dispatchEvent(new CustomEvent('blur'));
    }
  });

  yearInput.addEventListener('blur', function () {
    yearTouched = true;
    $ngModel.$setTouched();
    element.dispatchEvent(new CustomEvent('blur'));
  });
}

DateController.$inject = ['$element', '$log', '$scope', 'TwDateService'];

exports.default = DateController;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _definitionListController = __webpack_require__(56);

var _definitionListController2 = _interopRequireDefault(_definitionListController);

var _definitionList = __webpack_require__(120);

var _definitionList2 = _interopRequireDefault(_definitionList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefinitionList = {
  controller: _definitionListController2.default,
  template: _definitionList2.default,
  bindings: {
    model: '<',
    initialFields: '<fields',
    locale: '@',
    title: '@',
    narrow: '<'
  }
};

exports.default = DefinitionList;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DefinitionListController = function () {
  function DefinitionListController(TwRequirementsService) {
    _classCallCheck(this, DefinitionListController);

    this.RequirementsService = TwRequirementsService;
  }

  _createClass(DefinitionListController, [{
    key: '$onChanges',
    value: function $onChanges(changes) {
      var fieldsChanged = changes.initialFields;
      if (fieldsChanged) {
        if (!_angular2.default.equals(fieldsChanged.currentValue, fieldsChanged.previousValue)) {
          this.fields = this.RequirementsService.prepFields(fieldsChanged.currentValue, this.model);
        }
      }
    }

    // eslint-disable-next-line

  }, {
    key: 'getValueLabel',
    value: function getValueLabel(options, value) {
      for (var i = 0; i < options.length; i++) {
        if (options[i].value === value) {
          return options[i].label;
        }
      }
      return value;
    }

    // eslint-disable-next-line

  }, {
    key: 'mask',
    value: function mask(value) {
      return new Array(value.length + 1).join('*');
    }
  }]);

  return DefinitionListController;
}();

DefinitionListController.$inject = ['TwRequirementsService'];

exports.default = DefinitionListController;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _definitionListComponent = __webpack_require__(55);

var _definitionListComponent2 = _interopRequireDefault(_definitionListComponent);

var _formatting = __webpack_require__(8);

var _formatting2 = _interopRequireDefault(_formatting);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.requirements.definition-list', [_formatting2.default]).component('twDefinitionList', _definitionListComponent2.default).name;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formControlController = __webpack_require__(59);

var _formControlController2 = _interopRequireDefault(_formControlController);

var _formControl = __webpack_require__(121);

var _formControl2 = _interopRequireDefault(_formControl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormControl = {
  controller: _formControlController2.default,
  template: _formControl2.default,
  require: {
    $ngModel: 'ngModel'
  },
  bindings: {
    type: '@',
    name: '@',
    id: '@',
    label: '@',
    placeholder: '@',
    helpText: '@',
    step: '@',
    locale: '@',
    uploadAccept: '@',
    uploadIcon: '@',
    uploadTooLargeMessage: '@',
    helpImage: '@',
    options: '<',
    ngModel: '=',
    ngChange: '&',
    ngRequired: '<',
    ngDisabled: '<',
    // ngMinlength/ngMaxlength have default behaviour that cannot be overridden
    ngMinlength: '<twMinlength',
    ngMaxlength: '<twMaxlength',
    ngMin: '<',
    ngMax: '<',
    ngPattern: '<',
    uploadOptions: '<',
    textFormat: '<',
    validationAsync: '<'
  }
};

exports.default = FormControl;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FormControlController = function () {
  function FormControlController($element) {
    _classCallCheck(this, FormControlController);

    this.$element = $element;
    this.element = $element[0];
  }

  _createClass(FormControlController, [{
    key: '$onInit',
    value: function $onInit() {
      this.$ngModel = this.$element.controller('ngModel');
      this.addValidators();
    }
  }, {
    key: 'change',
    value: function change() {
      this.$ngModel.$setDirty();

      // Pass internal value through our validators
      this.$ngModel.$setViewValue(this.internalModel);
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.element.dispatchEvent(new CustomEvent('focus'));
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.$ngModel.$setTouched();
      this.element.dispatchEvent(new CustomEvent('blur'));
    }
  }, {
    key: 'addValidators',
    value: function addValidators() {
      var _this = this;

      var $ngModel = this.$ngModel;

      $ngModel.$validators.required = function (modelValue, viewValue) {
        var value = modelValue || viewValue;
        return !value || !_this.ngRequired;
      };

      $ngModel.$validators.minlength = function (modelValue, viewValue) {
        var value = modelValue || viewValue;
        if (_this.type !== 'text' || !_this.ngMinlength) {
          return true;
        }
        return !value || value.length >= _this.ngMinlength;
      };

      $ngModel.$validators.maxlength = function (modelValue, viewValue) {
        var value = modelValue || viewValue;
        if (_this.type !== 'text' || !_this.ngMaxlength) {
          return true;
        }
        return !value || value.length <= _this.ngMaxlength;
      };

      // Min and max do not work on custom elements, add manual validators
      $ngModel.$validators.min = function (modelValue, viewValue) {
        var value = modelValue || viewValue;
        if (typeof _this.ngMin === 'undefined') {
          return true;
        }
        if (typeof value === 'number' && typeof _this.ngMin === 'number') {
          return value >= _this.ngMin;
        }
        if (_this.type === 'date' && typeof value === 'string' && typeof _this.ngMin === 'string') {
          return value >= _this.ngMin;
        }
        if (_this.type === 'date' && value instanceof Date && _this.ngMin instanceof Date) {
          return value >= _this.ngMin;
        }
        return true;
      };

      $ngModel.$validators.max = function (modelValue, viewValue) {
        var value = modelValue || viewValue;
        if (typeof _this.ngMax === 'undefined') {
          return true;
        }
        if (typeof value === 'number' && typeof _this.ngMax === 'number') {
          return value <= _this.ngMax;
        }
        if (_this.type === 'date' && typeof value === 'string' && typeof _this.ngMax === 'string') {
          return value <= _this.ngMax;
        }
        if (_this.type === 'date' && value instanceof Date && _this.ngMax instanceof Date) {
          return value <= _this.ngMax;
        }
        return true;
      };

      $ngModel.$formatters.push(function (modelValue) {
        _this.internalModel = modelValue;
        return modelValue;
      });
    }
  }]);

  return FormControlController;
}();

FormControlController.$inject = ['$element'];

exports.default = FormControlController;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fieldController = __webpack_require__(61);

var _fieldController2 = _interopRequireDefault(_fieldController);

var _field = __webpack_require__(122);

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Field = {
  controller: _fieldController2.default,
  template: _field2.default,
  bindings: {
    name: '@',
    model: '=',
    initialField: '<field',
    uploadOptions: '<',
    locale: '@',
    changeHandler: '&?onChange',
    focusHandler: '&?onFocus',
    blurHandler: '&?onBlur',
    errorMessage: '<',
    warningMessage: '<'
  }
};

exports.default = Field;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FieldController = function () {
  function FieldController(RequirementsService) {
    _classCallCheck(this, FieldController);

    this.RequirementsService = RequirementsService;
  }

  _createClass(FieldController, [{
    key: '$onChanges',
    value: function $onChanges(changes) {
      if (changes.initialField) {
        this.field = copyJSON(this.initialField);
        this.control = this.field.control ? this.field.control : this.RequirementsService.getControlType(changes.initialField.currentValue);

        // TODO we should probably do this at fieldset level, so the model is available
        if (this.field.valuesAsync) {
          this.RequirementsService.prepValuesAsync(this.field, {});
        }
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      if (this.focusHandler) {
        this.focusHandler();
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      if (this.blurHandler) {
        this.blurHandler();
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(newValue) {
      if (this.changeHandler) {
        this.changeHandler({ value: newValue });
      }
      if (this.errorMessage) {
        delete this.errorMessage;
      }
    }

    // eslint-disable-next-line

  }, {
    key: 'sizeOf',
    value: function sizeOf(obj) {
      return obj ? Object.keys(obj).length : 0;
    }
  }]);

  return FieldController;
}();

function copyJSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}

FieldController.$inject = ['TwRequirementsService'];

exports.default = FieldController;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fieldsetController = __webpack_require__(63);

var _fieldsetController2 = _interopRequireDefault(_fieldsetController);

var _fieldset = __webpack_require__(123);

var _fieldset2 = _interopRequireDefault(_fieldset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fieldset = {
  controller: _fieldsetController2.default,
  template: _fieldset2.default,
  bindings: {
    model: '=',
    initialFields: '<fields',
    uploadOptions: '<',
    locale: '@',
    title: '@',
    description: '@',
    onModelChange: '&?',
    onRefreshRequirements: '&?',
    onFieldFocus: '&?',
    onFieldBlur: '&?',
    onFieldChange: '&?',
    validationMessages: '<',
    errorMessages: '<',
    isValid: '=?',
    narrow: '<'
  }
};

exports.default = Fieldset;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FieldsetController = function () {
  function FieldsetController(TwRequirementsService, $scope, $timeout) {
    _classCallCheck(this, FieldsetController);

    this.RequirementsService = TwRequirementsService;
    this.$scope = $scope;
    this.$timeout = $timeout;
  }

  _createClass(FieldsetController, [{
    key: '$onInit',
    value: function $onInit() {
      var _this = this;

      if (!this.model) {
        this.model = {};
      }

      if (!this.validationMessages) {
        this.validationMessages = {
          required: 'Required',
          pattern: 'Incorrect format',
          minimum: 'The value is too low',
          maximum: 'The value is too high',
          minlength: 'The value is too short',
          maxlength: 'The value is too long'
        };
      }

      this.$scope.$watch('twFieldset.$valid', function (validity) {
        _this.isValid = validity;
      });

      // TODO can we add asyncvalidator here? - prob not
    }
  }, {
    key: '$onChanges',
    value: function $onChanges(changes) {
      var fieldsChanged = changes.initialFields;
      if (fieldsChanged) {
        if (!_angular2.default.equals(fieldsChanged.currentValue, fieldsChanged.previousValue)) {
          this.fields = this.RequirementsService.prepFields(fieldsChanged.currentValue, this.model, this.validationMessages);
        }
      }
    }
  }, {
    key: 'fieldFocus',
    value: function fieldFocus(key, field) {
      if (this.onFieldFocus) {
        this.onFieldFocus({ key: key, field: field });
      }
    }
  }, {
    key: 'fieldBlur',
    value: function fieldBlur(key, field) {
      if (this.onFieldBlur) {
        this.onFieldBlur({ key: key, field: field });
      }
      if (field.refreshRequirementsOnChange && this.onRefreshRequirements) {
        this.onRefreshRequirements();
      }
    }
  }, {
    key: 'fieldChange',
    value: function fieldChange(value, key, field) {
      var _this2 = this;

      if (typeof value === 'undefined') {
        delete this.model[key];
      }
      if (this.onFieldChange) {
        this.onFieldChange({ value: value, key: key, field: field });
      }

      if (controlRefreshesOnChange(field.control) && field.refreshRequirementsOnChange && this.onRefreshRequirements) {
        this.onRefreshRequirements();
      }

      // We remove custom error messages on change, as they're no longer relevant
      if (this.errorMessages && this.errorMessages[key]) {
        delete this.errorMessages[key];
      }

      // Delay so model can update
      this.$timeout(function () {
        if (_this2.onModelChange) {
          _this2.onModelChange({ model: _this2.model });
        }
      });
    }
  }]);

  return FieldsetController;
}();

function controlRefreshesOnChange(control) {
  return control === 'select' || control === 'checkbox' || control === 'radio' || control === 'date' || control === 'upload';
}

FieldsetController.$inject = ['TwRequirementsService', '$scope', '$timeout'];

exports.default = FieldsetController;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _focusableController = __webpack_require__(18);

var _focusableController2 = _interopRequireDefault(_focusableController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Focusable() {
  return {
    restrict: 'A',
    controller: _focusableController2.default
  };
}

exports.default = Focusable;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _focusableController = __webpack_require__(18);

var _focusableController2 = _interopRequireDefault(_focusableController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormControlFocus() {
  return {
    restrict: 'C',
    controller: _focusableController2.default
  };
} // This directive provide backwards compatibility
// It should no longer be necessary when browsers support :focus-within
exports.default = FormControlFocus;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _focusableDirective = __webpack_require__(64);

var _focusableDirective2 = _interopRequireDefault(_focusableDirective);

var _formControlDirective = __webpack_require__(65);

var _formControlDirective2 = _interopRequireDefault(_formControlDirective);

var _dom = __webpack_require__(1);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.forms.focusable', [_dom2.default]).directive('twFocusable', _focusableDirective2.default).directive('formControl', _formControlDirective2.default).name;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _radioController = __webpack_require__(68);

var _radioController2 = _interopRequireDefault(_radioController);

var _radio = __webpack_require__(124);

var _radio2 = _interopRequireDefault(_radio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Radio = {
  controller: _radioController2.default,
  template: _radio2.default,
  require: {
    $ngModel: 'ngModel'
  },
  bindings: {
    name: '@',
    value: '@',
    ngModel: '=',
    ngValue: '<',
    ngRequired: '<',
    ngDisabled: '<',
    ngChange: '&'
  }
};

exports.default = Radio;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RadioController = function () {
  function RadioController($scope, $element, TwDomService) {
    _classCallCheck(this, RadioController);

    var $ngModel = $element.controller('ngModel');

    this.dom = TwDomService;
    this.$element = $element;
    this.element = $element[0];
    this.checked = this.isChecked();
    this.label = this.dom.getClosestParentByTagName(this.element, 'label');

    $element[0].addEventListener('blur', function () {
      $ngModel.$setTouched();
    });

    this.addWatchers($scope, this.element);
  }

  _createClass(RadioController, [{
    key: 'isChecked',
    value: function isChecked() {
      return this.ngValue && this.ngModel === this.ngValue || this.value === this.ngModel;
    }
  }, {
    key: 'buttonClick',
    value: function buttonClick() {
      if (this.ngDisabled) {
        return;
      }

      this.checked = true;
      this.$ngModel.$setViewValue(this.ngValue || this.value);
    }
  }, {
    key: 'buttonFocus',
    value: function buttonFocus() {
      if (this.label) {
        this.label.classList.add('focus');
      }
      this.element.dispatchEvent(new CustomEvent('focus'));
    }
  }, {
    key: 'buttonBlur',
    value: function buttonBlur() {
      if (this.label) {
        this.label.classList.remove('focus');
      }
      this.element.dispatchEvent(new CustomEvent('blur'));
    }
  }, {
    key: 'hiddenInputChange',
    value: function hiddenInputChange() {
      // This only fires on label click
      // Normal change handler doesn't, so trigger manually
      if (this.ngChange) {
        this.ngChange();
      }
    }
  }, {
    key: 'addWatchers',
    value: function addWatchers($scope, element) {
      var _this = this;

      $scope.$watch('$ctrl.ngModel', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          _this.$ngModel.$setDirty();
        }
        _this.checked = _this.isChecked();
      });

      $scope.$watch('$ctrl.ngDisabled', function (newValue, oldValue) {
        var radioLabel = _this.dom.getClosestParentByClassName(element, 'radio');

        if (!radioLabel) {
          return;
        }
        if (newValue && !oldValue) {
          radioLabel.classList.add('disabled');
          radioLabel.setAttribute('disabled', 'true');
        } else if (!newValue && oldValue) {
          radioLabel.classList.remove('disabled');
          radioLabel.removeAttribute('disabled');
        }
      });
    }
  }]);

  return RadioController;
}();

RadioController.$inject = ['$scope', '$element', 'TwDomService'];

exports.default = RadioController;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _requirementsFormService = __webpack_require__(72);

var _requirementsFormService2 = _interopRequireDefault(_requirementsFormService);

var _requirementsFormComponent = __webpack_require__(70);

var _requirementsFormComponent2 = _interopRequireDefault(_requirementsFormComponent);

var _tabs = __webpack_require__(21);

var _tabs2 = _interopRequireDefault(_tabs);

var _fieldset = __webpack_require__(17);

var _fieldset2 = _interopRequireDefault(_fieldset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.forms.requirements-form', [_tabs2.default, _fieldset2.default]).service('TwRequirementsFormService', _requirementsFormService2.default).component('twRequirementsForm', _requirementsFormComponent2.default).name;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _requirementsFormController = __webpack_require__(71);

var _requirementsFormController2 = _interopRequireDefault(_requirementsFormController);

var _requirementsForm = __webpack_require__(125);

var _requirementsForm2 = _interopRequireDefault(_requirementsForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RequirementsForm = {
  controller: _requirementsFormController2.default,
  template: _requirementsForm2.default,
  bindings: {
    model: '=',
    requirements: '<',
    uploadOptions: '<',
    locale: '@',
    onRefreshRequirements: '&',
    validationMessages: '<',
    errorMessages: '<',
    isValid: '=?'
  }
};

exports.default = RequirementsForm;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequirementsFormController = function () {
  function RequirementsFormController($scope, TwRequirementsFormService) {
    var _this = this;

    _classCallCheck(this, RequirementsFormController);

    this.RequirementsFormService = TwRequirementsFormService;

    if (!this.model) {
      this.model = {};
    }

    if (this.requirements) {
      this.RequirementsFormService.prepRequirements(this.requirements);
    }

    // TODO move watches to $onChanges
    $scope.$watch('$ctrl.requirements', function (newRequirements, oldRequirements) {
      if (!_angular2.default.equals(newRequirements, oldRequirements)) {
        _this.RequirementsFormService.prepRequirements(_this.requirements);

        var oldType = _this.model.type;
        var newType = _this.requirements.length ? _this.requirements[0].type : null;

        _this.model.type = newType;

        if (oldRequirements && newRequirements) {
          _this.RequirementsFormService.cleanModel(_this.model, oldRequirements, oldType, newRequirements, newType);
        }
      }
    });

    $scope.$watch('$ctrl.model.type', function (newType, oldType) {
      _this.switchTab(newType, oldType);
    });

    $scope.$watch('twForm.$valid', function (validity) {
      _this.isValid = validity;
    });

    // TODO can we add asyncvalidator here? - prob not
  }

  /**
   * Perform the refreshRequirementsOnChange check on blur
   */
  // eslint-disable-next-line class-methods-use-this


  _createClass(RequirementsFormController, [{
    key: 'onBlur',
    value: function onBlur(field) {
      if (!field.refreshRequirementsOnChange) {
        // eslint-disable-next-line no-useless-return
        return;
      }
      // TODO disabled the form while we refresh requirements?

      /*
      if (false && this.onRefreshRequirements) {
        // Should post the current model back to the requirements end
        // point and update the requirements.
        // TODO Can we handle this internally?
        this.onRefreshRequirements();
      }
      */
    }
  }, {
    key: 'switchTab',
    value: function switchTab(newType, oldType) {
      var oldRequirementType = this.RequirementsFormService.findRequirementByType(oldType, this.requirements);
      var newRequirementType = this.RequirementsFormService.findRequirementByType(newType, this.requirements);

      if (!oldRequirementType || !newRequirementType) {
        if (!this.model) {
          this.model = {};
        }
        this.model.type = newType;
      }

      this.RequirementsFormService.cleanRequirementsModel(this.model, oldRequirementType, newRequirementType);
    }
  }]);

  return RequirementsFormController;
}();

RequirementsFormController.$inject = ['$scope', 'TwRequirementsFormService'];

exports.default = RequirementsFormController;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function RequirementsFormService() {
  var _this = this;

  this.cleanRequirementsModel = function (model, oldRequirements, newRequirements) {
    var oldFieldNames = getFieldNamesFromRequirement(oldRequirements);
    var newFieldNames = getFieldNamesFromRequirement(newRequirements);
    var obsoleteFieldNames = oldFieldNames.filter(function (fieldName) {
      return newFieldNames.indexOf(fieldName) < 0;
    });

    obsoleteFieldNames.forEach(function (fieldName) {
      delete model[fieldName];
    });
  };

  this.cleanModel = function (model, oldRequirements, oldType, newRequirements, newType) {
    var oldRequirementType = _this.findRequirementByType(oldType, oldRequirements);
    var newRequirementType = _this.findRequirementByType(newType, newRequirements);

    _this.cleanRequirementsModel(model, oldRequirementType, newRequirementType);
  };

  this.findRequirementByType = function (type, requirements) {
    if (!requirements) {
      return false;
    }

    for (var i = 0; i < requirements.length; i++) {
      var modelType = requirements[i];
      if (modelType.type === type) {
        return modelType;
      }
    }

    return false;
  };

  this.prepRequirements = function (types) {
    types.forEach(function (type) {
      prepType(type);
    });
  };

  function getFieldNamesFromRequirement(modelRequirement) {
    if (!modelRequirement.fields) {
      return [];
    }
    var names = modelRequirement.fields.map(function (field) {
      if (field.group) {
        return field.group.map(function (fieldSection) {
          return fieldSection.key;
        });
      }
      return field.key;
    });

    return Array.prototype.concat.apply([], names);
  }

  function prepType(type) {
    if (!type.label) {
      type.label = getTabName(type.type);
    }
  }

  function getTabName(tabType) {
    if (tabType && tabType.length > 0) {
      var tabNameWithSpaces = tabType.toLowerCase().split('_').join(' '); // String.replace method only replaces first instance
      return tabNameWithSpaces.charAt(0).toUpperCase() + tabNameWithSpaces.slice(1);
    }
    return '';
  }
}

exports.default = RequirementsFormService;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _selectController = __webpack_require__(74);

var _selectController2 = _interopRequireDefault(_selectController);

var _select = __webpack_require__(126);

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = {
  controller: _selectController2.default,
  template: _select2.default,
  require: 'ngModel',
  transclude: true,
  bindings: {
    ngModel: '=',
    ngRequired: '=',
    ngDisabled: '=',
    options: '=',
    name: '@',
    placeholder: '@',
    filter: '@',
    size: '@',
    dropdownRight: '@',
    dropdownUp: '@',
    dropdownWidth: '@',
    inverse: '=',
    hideNote: '@',
    hideSecondary: '@',
    hideIcon: '@',
    hideCurrency: '@',
    hideCircle: '@',
    hideLabel: '@'
  }
};

/*
// TODO may be better for accessibility to have hidden select?
<select name='{{$ctrl.name}}' class='sr-only tw-select-hidden' \
  ng-model='$ctrl.ngModel' \
  ng-options='option.value as option.label for option in $ctrl.options' \
  ng-disabled='$ctrl.ngDisabled' \
  ng-required='$ctrl.ngRequired'> \
</select>"
*/

exports.default = Select;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SelectController = function () {
  function SelectController($element, $scope, $transclude, $timeout, $attrs, TwDomService) {
    _classCallCheck(this, SelectController);

    this.$ngModel = $element.controller('ngModel');
    this.$scope = $scope;
    this.$element = $element;
    this.$attrs = $attrs;
    this.$timeout = $timeout;
    this.$transclude = $transclude;
    this.dom = TwDomService;

    this.element = $element[0];
  }

  _createClass(SelectController, [{
    key: '$onInit',
    value: function $onInit() {
      this.button = this.element.getElementsByClassName('btn')[0];
      this.search = '';

      preSelectModelValue(this.$ngModel, this);
      setDefaultIfRequired(this.$ngModel, this, this.$element, this.$attrs);

      addWatchers(this, this.$scope, this.$ngModel, this.$element);
      addEventHandlers(this, this.$element, this.$ngModel, this.options, this.$timeout);

      checkForTranscludedContent(this.$transclude, this);

      this.responsiveClasses = responsiveClasses;

      this.filterString = '';
      this.filteredOptions = this.getFilteredOptions();
    }
  }, {
    key: 'circleClasses',
    value: function circleClasses(responsiveOption) {
      var classes = responsiveClasses(responsiveOption);
      var secondaryClasses = responsiveClasses(this.hideSecondary);
      // If secondary text line, and it won't be hidden at some point, use larger circle
      if (this.selected.secondary && secondaryClasses.length === 0) {
        classes += ' circle-sm';
      } else {
        classes += ' circle-xs';
      }
      return classes;
    }
  }, {
    key: 'buttonFocus',
    value: function buttonFocus() {
      this.element.dispatchEvent(new CustomEvent('focus'));
    }
  }, {
    key: 'optionClick',
    value: function optionClick(option, $event) {
      if (option.disabled) {
        $event.stopPropagation();
        return;
      }
      selectOption(this.$ngModel, this, option);
      this.button.focus();
    }
  }, {
    key: 'optionFocus',
    value: function optionFocus(option) {
      selectOption(this.$ngModel, this, option);
    }
  }, {
    key: 'optionKeypress',
    value: function optionKeypress(event) {
      // If we're in the filter don't allow normal behaviour
      if (event.target.classList.contains('tw-select-filter')) {
        return;
      }

      // Prevent delete taking us back
      var characterCode = getCharacterCodeFromKeypress(event);
      if (characterCode === 8) {
        event.preventDefault();
        return;
      }

      // Search for option based on character
      var character = getCharacterFromKeypress(event);
      continueSearchAndSelectMatch(this.$ngModel, this, this.options, character);
      focusOnActiveLink(this.element);
    }
  }, {
    key: 'placeholderClick',
    value: function placeholderClick() {
      resetOption(this.$ngModel, this);
      this.button.focus();
    }
  }, {
    key: 'placeholderFocus',
    value: function placeholderFocus() {
      resetOption(this.$ngModel, this);
    }
  }, {
    key: 'getFilteredOptions',
    value: function getFilteredOptions() {
      var _this = this;

      if (!this.options || !this.options.filter) {
        return [];
      }

      var filteredLabels = [];
      return this.options.filter(function (option) {
        var filterStringLower = _this.filterString && escapeRegExp(_this.filterString.toLowerCase());

        if (!filterStringLower) {
          return true;
        }

        var duplicate = false;
        if (filteredLabels.indexOf(option.label) > -1) {
          duplicate = true;
        }

        var addOption = (labelMatches(option, filterStringLower) || noteMatches(option, filterStringLower) || secondaryMatches(option, filterStringLower) || searchableMatches(option, filterStringLower)) && !duplicate;

        if (addOption) {
          filteredLabels.push(option.label);
        }
        return addOption;
      });
    }
  }, {
    key: 'focusOnFilterInput',
    value: function focusOnFilterInput() {
      var filterInput = this.element.getElementsByClassName('tw-select-filter')[0];
      if (filterInput) {
        filterInput.focus();
      }
    }
  }, {
    key: 'filterChange',
    value: function filterChange() {
      this.filteredOptions = this.getFilteredOptions();
      var selectedOption = findSelected(this.filteredOptions, this.selected);

      // Choose a new selected value if the old one was hidden
      if (!selectedOption && this.filteredOptions.length) {
        selectOption(this.$ngModel, this, this.filteredOptions[0]);
      }
    }

    // Keydown as keypress did not work in chrome/safari

  }, {
    key: 'filterKeydown',
    value: function filterKeydown(event) {
      var characterCode = event.which || event.charCode || event.keyCode;
      var activeOption = this.element.getElementsByClassName('active')[0];
      var activeLink = activeOption ? activeOption.getElementsByTagName('a')[0] : false;
      var optionLinks = this.element.getElementsByClassName('tw-select-option-link');

      if (characterCode === keys.down) {
        this.moveDownOneOption(activeOption, activeLink, optionLinks);
        event.preventDefault(); // Prevent cursor jumping around in input
      } else if (characterCode === keys.up) {
        this.moveUpOneOption(activeOption, activeLink, optionLinks);
        event.preventDefault(); // Prevent cursor jumping in input
      } else if (characterCode === keys.return) {
        activeOption.click();
        this.button.focus();
        event.preventDefault(); // Prevent form action as input active
      }
      return true;
    }
  }, {
    key: 'selectOptionUsingLink',
    value: function selectOptionUsingLink(link) {
      var option = this.filteredOptions[link.getAttribute('index')];
      selectOption(this.$ngModel, this, option);
    }
  }, {
    key: 'moveUpOneOption',
    value: function moveUpOneOption(activeOption, activeLink, optionLinks) {
      // If none active, select last
      if (!activeOption && optionLinks.length) {
        this.selectOptionUsingLink(optionLinks[optionLinks.length - 1]);
        return;
      }

      // If active option not first, move up
      if (activeLink !== optionLinks[0]) {
        var previousOption = this.dom.getPreviousSiblingWithClassName(activeOption, 'tw-select-option');
        if (previousOption) {
          var previousOptionLink = previousOption.getElementsByTagName('a')[0];
          this.selectOptionUsingLink(previousOptionLink);
        }
      }
    }
  }, {
    key: 'moveDownOneOption',
    value: function moveDownOneOption(activeOption, activeLink, optionLinks) {
      // If none active, select first
      if (!activeOption && optionLinks.length) {
        this.selectOptionUsingLink(optionLinks[0]);
        return;
      }
      // If active option not last, move down
      if (activeLink !== optionLinks[optionLinks.length - 1]) {
        var nextOption = this.dom.getNextSiblingWithClassName(activeOption, 'tw-select-option');
        if (nextOption) {
          var nextOptionLink = nextOption.getElementsByTagName('a')[0];
          this.selectOptionUsingLink(nextOptionLink);
          return;
        }
      }
      // If active is last and custom action, focus on it
      var transcludedOption = this.element.getElementsByClassName('tw-select-transcluded');

      if (transcludedOption.length) {
        transcludedOption[0].getElementsByTagName('a')[0].focus();
      }
    }
  }]);

  return SelectController;
}();

function labelMatches(option, search) {
  return option.label && option.label.toLowerCase().search(search) >= 0;
}
function noteMatches(option, search) {
  return option.note && option.note.toLowerCase().search(search) >= 0;
}
function secondaryMatches(option, search) {
  return option.secondary && option.secondary.toLowerCase().search(search) >= 0;
}
function searchableMatches(option, search) {
  return option.searchable && option.searchable.toLowerCase().search(search) >= 0;
}

function addWatchers($ctrl, $scope, $ngModel, $element) {
  $scope.$watch('$ctrl.ngModel', function (newValue, oldValue) {
    if ((newValue || oldValue) && newValue !== oldValue) {
      $ngModel.$setDirty();
    }

    modelChange(newValue, oldValue, $ctrl);
  });

  $scope.$watch('$ctrl.options', function (newValue, oldValue) {
    if (newValue !== oldValue) {
      preSelectModelValue($ngModel, $ctrl);
      setDefaultIfRequired($ngModel, $ctrl, $element, $ctrl);

      $ctrl.filteredOptions = $ctrl.getFilteredOptions();
    }
  });
}

function addEventHandlers($ctrl, $element, $ngModel, options, $timeout) {
  var element = $element[0];
  var button = element.getElementsByClassName('btn')[0];
  var buttonGroup = element.getElementsByClassName('btn-group')[0];
  var dropdown = element.getElementsByClassName('dropdown-menu')[0];

  var onFocusOut = function onFocusOut() {
    $timeout(function () {
      // If button isn't focused and dropdown not open, blur
      if (button !== document.activeElement && !buttonGroup.classList.contains('open')) {
        element.dispatchEvent(new CustomEvent('blur'));
      }
    }, 150); // need timeout because using dropdown.js,
  };

  var onButtonClick = function onButtonClick() {
    $timeout(function () {
      if (element.getAttribute('filter')) {
        // If filter in use, focus on that
        var filterInput = element.getElementsByClassName('tw-select-filter')[0];
        filterInput.focus();
      } else {
        // Otherwise focus on selected option
        focusOnActiveLink(element);
      }
    });
  };

  var onButtonKeypress = function onButtonKeypress(event) {
    $ctrl.optionKeypress(event);
  };

  var onDrodownKeypress = function onDrodownKeypress(event) {
    if (event.target.tagName.toLowerCase() === 'a') {
      $ctrl.optionKeypress(event);
    }
  };

  var onComponentBlur = function onComponentBlur() {
    $ngModel.$setTouched();
  };

  element.addEventListener('blur', onComponentBlur);
  button.addEventListener('keypress', onButtonKeypress);
  button.addEventListener('click', onButtonClick);
  button.addEventListener('focusout', onFocusOut);
  dropdown.addEventListener('focusout', onFocusOut);
  dropdown.addEventListener('keypress', onDrodownKeypress);
}

function focusOnActiveLink(element) {
  var activeOption = element.getElementsByClassName('active')[0];
  if (activeOption) {
    activeOption.getElementsByTagName('a')[0].focus();
  }
}

function checkForTranscludedContent($transclude, $ctrl) {
  $transclude(function (clone) {
    if (clone.length > 1 || clone.text().trim() !== '') {
      $ctrl.hasTranscluded = true;
    }
  });
}

function getCharacterCodeFromKeypress(event) {
  return event.which || event.charCode || event.keyCode;
}

function getCharacterFromKeypress(event) {
  return String.fromCharCode(getCharacterCodeFromKeypress(event));
}

function escapeRegExp(str) {
  // eslint-disable-next-line no-useless-escape
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function preSelectModelValue($ngModel, $ctrl) {
  if (isValidModel($ctrl.ngModel)) {
    var option = findOptionFromValue($ctrl.options, $ctrl.ngModel);
    selectOption($ngModel, $ctrl, option);
  }
}

function modelChange(newVal, oldVal, $ctrl) {
  if (newVal === oldVal) {
    return;
  }

  var option = findOptionFromValue($ctrl.options, newVal);
  if (option) {
    $ctrl.selected = option;
  } else {
    $ctrl.selected = null;
  }
}

function findOptionFromValue(options, value) {
  var optionMatch = false;
  options.forEach(function (option) {
    if (_angular2.default.equals(option.value, value)) {
      optionMatch = option;
    }
  });
  return optionMatch;
}

function setDefaultIfRequired($ngModel, $ctrl, $element, $attrs) {
  // If required and model empty, select first option with value
  if (($ctrl.ngRequired || $attrs.required) && !isValidModel($ctrl.ngModel) && !$ctrl.placeholder) {
    for (var i = 0; i < $ctrl.options.length; i++) {
      if (isValidModel($ctrl.options[i].value)) {
        selectOption($ngModel, $ctrl, $ctrl.options[i]);
        break;
      }
    }
  }
}

function selectOption($ngModel, $ctrl, option) {
  if (option.disabled) {
    return;
  }
  $ngModel.$setViewValue(option.value);
  // Force commit so that ng-change always has new value
  $ngModel.$commitViewValue();
  $ctrl.selected = option;
}

function findSelected(options, selected) {
  // Prefer forEach over find for browser support
  var selectedOption = void 0;
  options.forEach(function (option) {
    if (selected && _angular2.default.equals(selected.value, option.value)) {
      selectedOption = selected;
    }
  });
  return selectedOption;
}

function resetOption($ngModel, $ctrl) {
  $ngModel.$setViewValue(null);
  // Force commit so that ng-change always has new value
  $ngModel.$commitViewValue();
  $ctrl.selected = false;
}

function continueSearchAndSelectMatch($ngModel, $ctrl, options, letter) {
  var found = searchAndSelect($ngModel, $ctrl, options, $ctrl.search + letter);
  if (found) {
    $ctrl.search += letter;
  } else {
    $ctrl.search = letter;
    found = searchAndSelect($ngModel, $ctrl, options, $ctrl.search);
  }
  return found;
}

function searchAndSelect($ngModel, $ctrl, options, term) {
  var found = false;
  var searchTerm = term.toLowerCase();

  options.forEach(function (option) {
    if (found) {
      return;
    }
    if (containsSearch(option.label, searchTerm) || containsSearch(option.note, searchTerm) || containsSearch(option.secondary, searchTerm) || containsSearch(option.searchable, searchTerm)) {
      selectOption($ngModel, $ctrl, option);
      found = true;
    }
  });
  return found;
}

function containsSearch(term, search) {
  return term && term.toLowerCase().indexOf(search) === 0;
}

function isValidModel(value) {
  return value || value === 0 || value === false;
}

function responsiveClasses(value) {
  var classes = '';
  var breakpoints = [];
  var validBreakpoints = {
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true
  };

  if (typeof value === 'boolean' && value) {
    return 'hidden';
  }

  if (value && value.toLowerCase && value.toLowerCase() === 'true') {
    return 'hidden';
  }

  if (value) {
    breakpoints = value.split(',');
  }

  breakpoints.forEach(function (breakpoint) {
    if (validBreakpoints[breakpoint]) {
      classes += 'hidden-' + breakpoint + ' ';
    }
  });

  return classes;
}

var keys = {
  up: 38,
  down: 40,
  return: 13
};

SelectController.$inject = ['$element', '$scope', '$transclude', '$timeout', '$attrs', 'TwDomService'];

exports.default = SelectController;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* DEPRECATED in favour of upload */

function FileSelectDirective() {
  return {
    restrict: 'A',
    scope: {
      onUserInput: '='
    },
    link: FileSelectLink
  };
}

function FileSelectLink(scope, $element) {
  var element = $element[0];
  element.addEventListener('change', function (event) {
    if (scope.$ctrl.onUserInput && typeof scope.$ctrl.onUserInput === 'function') {
      scope.$ctrl.onUserInput(event);
    }
  });
}

exports.default = FileSelectDirective;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _uploadDroppableDirective = __webpack_require__(77);

var _uploadDroppableDirective2 = _interopRequireDefault(_uploadDroppableDirective);

var _fileSelectDirective = __webpack_require__(75);

var _fileSelectDirective2 = _interopRequireDefault(_fileSelectDirective);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.forms.upload-droppable', []).directive('twFileSelect', _fileSelectDirective2.default).component('twUploadDroppable', _uploadDroppableDirective2.default).name; /* DEPRECATED in favour of upload */

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _uploadDroppable = __webpack_require__(127);

var _uploadDroppable2 = _interopRequireDefault(_uploadDroppable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* DEPRECATED in favour of upload */
function TwUploadDroppableDirective() {
  return {
    bindToController: true,
    controller: TwUploadDroppableController,
    controllerAs: '$ctrl',
    replace: false,
    transclude: true,
    restrict: 'E',
    scope: {
      title: '@',
      cta: '@',
      onUpload: '=',
      accept: '='
    },
    link: TwUploadDroppableLink,
    template: _uploadDroppable2.default
  };
}

function TwUploadDroppableController() {
  var $ctrl = this;

  $ctrl.dragCounter = 0;
  $ctrl.isActive = false;

  $ctrl.onManualUpload = function (event) {
    if ($ctrl.onUpload && typeof $ctrl.onUpload === 'function') {
      $ctrl.onUpload(_angular2.default.element(document.querySelector('#file-upload'))[0].files[0], event);
    }
  };

  $ctrl.onDrop = function (file, event) {
    if ($ctrl.onUpload && typeof $ctrl.onUpload === 'function') {
      $ctrl.onUpload(file, event);
    }
    $ctrl.isActive = false;
    $ctrl.dropCounter = 0;
  };

  $ctrl.onDragChange = function (enter) {
    if (enter) {
      $ctrl.dragCounter++;
      if ($ctrl.dragCounter === 1) {
        $ctrl.isActive = true;
      }
    } else {
      $ctrl.dragCounter--;
      if ($ctrl.dragCounter === 0) {
        $ctrl.isActive = false;
      }
    }
  };
}

function TwUploadDroppableLink(scope, element) {
  element[0].addEventListener('dragenter', function (event) {
    event.preventDefault();
    scope.$ctrl.onDragChange(true);
    scope.$apply();
  }, false);

  element[0].addEventListener('dragover', function (event) {
    event.preventDefault();
  }, false);

  element[0].addEventListener('dragleave', function (event) {
    event.preventDefault();
    scope.$ctrl.onDragChange(false);
    scope.$apply();
  }, false);

  element[0].addEventListener('drop', function (event) {
    event.preventDefault();
    scope.$ctrl.onDrop(event.dataTransfer.files[0]);
    scope.$apply();
  }, false);
}

exports.default = TwUploadDroppableDirective;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function FileInputDirective() {
  return {
    restrict: 'A',
    controller: FileInputController,
    controllerAs: '$ctrl',
    bindToController: true,
    require: {
      UploadController: '^twUpload'
    },
    scope: {
      onUserInput: '&'
    }
  };
}

var FileInputController = function FileInputController($element) {
  var _this = this;

  _classCallCheck(this, FileInputController);

  var element = $element[0];
  element.addEventListener('change', function () {
    if (_this.onUserInput && typeof _this.onUserInput === 'function') {
      _this.onUserInput();
    }
  });
};

FileInputController.$inject = ['$element'];

exports.default = FileInputDirective;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uploadController = __webpack_require__(80);

var _uploadController2 = _interopRequireDefault(_uploadController);

var _upload = __webpack_require__(128);

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Upload = {
  controller: _uploadController2.default,
  template: _upload2.default,
  transclude: true,
  bindings: {
    ngDisabled: '<',
    ngModel: '=',
    ngChange: '&',
    name: '@',
    icon: '@',
    helpImage: '@',
    label: '@',
    placeholder: '@',
    description: '@', // DEPRECATED for label
    instructions: '@', // DEPRECATED for placeholder
    buttonText: '@',
    cancelText: '@',
    processingText: '@',
    successText: '@',
    errorMessage: '@',
    tooLargeMessage: '@',
    // wrongTypeMessage: '@',
    size: '@',
    accept: '@',
    httpOptions: '<',
    onStart: '=',
    onSuccess: '=',
    onFailure: '=',
    onCancel: '=',
    maxSize: '<' // TODO move to ngMax?
  }
};

exports.default = Upload;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UploadController = function () {
  function UploadController($timeout, $element, $http, $scope, $transclude, $q, $attrs) {
    var _this = this;

    _classCallCheck(this, UploadController);

    this.$timeout = $timeout;
    this.$element = $element;
    this.$http = $http;
    this.$attrs = $attrs;
    this.$q = $q;

    // First isImage updated only at select times, second updated instantly.
    this.isImage = false;
    this.isImage_instant = false;

    this.dragCounter = 0;
    this.isProcessing = false;

    this.processingState = null;

    this.checkForTranscludedContent($transclude);

    $scope.$watch('$ctrl.icon', function () {
      _this.viewIcon = _this.icon ? _this.icon : 'upload';
    });

    if ((this.processingText || this.successText || this.failureText) && (!this.processingText || !this.successText || !this.failureText)) {
      throw new Error('Supply all of processing, success, and failure text, or supply none.');
    }

    this.addDragHandlers($scope, $element);
  }

  _createClass(UploadController, [{
    key: 'onManualUpload',
    value: function onManualUpload() {
      var element = this.$element[0];
      var uploadInput = element.querySelector('.tw-droppable-input');
      var file = uploadInput.files[0];

      if (!file) {
        throw new Error('Could not retrieve file');
      }

      this.fileDropped(file);
    }
  }, {
    key: 'fileDropped',
    value: function fileDropped(file) {
      var _this2 = this;

      if (this.ngDisabled) {
        return;
      }

      this.reset();

      this.isImage_instant = file.type && file.type.indexOf('image') > -1;
      this.fileName = file.name;

      this.isProcessing = true;
      this.processingState = null;

      triggerHandler(this.onStart, file);

      if (!isSizeValid(file, this.maxSize)) {
        this.isTooLarge = true;
        asyncFailure({
          status: 413,
          statusText: 'Request Entity Too Large'
        }, this);
        return;
      }

      /*
      if (!isTypeValid(file, this.accept)) {
        this.isWrongType = true;
        asyncFailure({
          status: 415,
          statusText: 'Unsupported Media Type'
        }, this);
        return;
      }
      */

      if (this.httpOptions) {
        // Post file now
        this.$q.all([this.asyncPost(file), this.asyncFileRead(file)]).then(function (response) {
          asyncSuccess(response[0], _this2);
          return response;
        }).then(function (response) {
          showDataImage(response[1], _this2);
          return response;
        }).catch(function (error) {
          return asyncFailure(error, _this2);
        });
      } else {
        // Post on form submit
        this.asyncFileRead(file).then(function (response) {
          return asyncSuccess(response, _this2);
        }).then(function (response) {
          return showDataImage(response, _this2);
        }).catch(function (error) {
          return asyncFailure(error, _this2);
        });
      }
    }
  }, {
    key: 'onDragEnter',
    value: function onDragEnter() {
      this.dragCounter++;
      if (this.dragCounter >= 1 && !this.ngDisabled) {
        this.isDroppable = true;
      }
    }
  }, {
    key: 'onDragLeave',
    value: function onDragLeave() {
      this.dragCounter--;
      if (this.dragCounter <= 0) {
        this.isDroppable = false;
      }
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.reset();
      triggerHandler(this.onCancel);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.isDroppable = false;
      this.isProcessing = false;
      this.isSuccess = false;
      this.isError = false;
      this.dragCounter = 0;
      this.isDone = false;
      this.isTooLarge = false;
      this.isWrongType = false;
      this.$element[0].querySelector('input').value = null;
      this.setNgModel(null);
    }
  }, {
    key: 'setNgModel',
    value: function setNgModel(value) {
      // If ngModel not assignable, we don't want to error.
      if (typeof this.$attrs.ngModel !== 'undefined') {
        var $ngModel = this.$element.controller('ngModel');
        if (!$ngModel.$setViewValue) {
          return;
        }
        $ngModel.$setViewValue(value);
      }
    }
  }, {
    key: 'asyncPost',
    value: function asyncPost(file) {
      var formData = new FormData();
      formData.append(this.name, file);

      var $httpOptions = prepareHttpOptions(_angular2.default.copy(this.httpOptions));
      return this.$http.post($httpOptions.url, formData, $httpOptions);
    }
  }, {
    key: 'asyncFileRead',
    value: function asyncFileRead(file) {
      var reader = new FileReader();
      var deferred = this.$q.defer();

      // When the reader finishes loading resolve the promise
      reader.onload = function (event) {
        deferred.resolve(event.target.result);
      };
      reader.onerror = function (event) {
        deferred.reject(event);
      };

      // Load the file
      reader.readAsDataURL(file);
      return deferred.promise;
    }
  }, {
    key: 'addDragHandlers',
    value: function addDragHandlers($scope, $element) {
      var _this3 = this;

      $element[0].addEventListener('dragenter', function (event) {
        event.preventDefault();
        _this3.onDragEnter();
        $scope.$apply();
      }, false);

      $element[0].addEventListener('dragover', function (event) {
        event.preventDefault();
      }, false);

      $element[0].addEventListener('dragleave', function (event) {
        event.preventDefault();
        _this3.onDragLeave();
        $scope.$apply();
      }, false);

      $element[0].addEventListener('drop', function (event) {
        event.preventDefault();
        _this3.fileDropped(event.dataTransfer.files[0]);
        $scope.$apply();
      }, false);
    }
  }, {
    key: 'checkForTranscludedContent',
    value: function checkForTranscludedContent($transclude) {
      var _this4 = this;

      $transclude(function (clone) {
        if (clone.length > 1 || clone.text().trim() !== '') {
          _this4.hasTranscluded = true;
        } else {
          _this4.hasTranscluded = false;
        }
      });
    }
  }]);

  return UploadController;
}();

function triggerHandler(method, argument) {
  if (method && typeof method === 'function') {
    method(argument);
  }
}

function prepareHttpOptions($httpOptions) {
  if (!$httpOptions.url) {
    throw new Error('You must supply a URL to post image data asynchronously');
  }
  if (!$httpOptions.headers) {
    $httpOptions.headers = {};
  }
  if ($httpOptions.method) {
    delete $httpOptions.method;
  }

  $httpOptions.headers['Content-Type'] = undefined;
  $httpOptions.transformRequest = _angular2.default.identity;

  return $httpOptions;
}

function isSizeValid(file, maxSize) {
  return !(_angular2.default.isNumber(maxSize) && file.size > maxSize);
}

/*
// TODO validate file type
function isTypeValid(file, accept) {
  return true;
  // this.isWrongType = true;
}
*/

function showDataImage(dataUrl, $ctrl) {
  $ctrl.setNgModel(dataUrl);
  // Only set isImage at this point to avoid trying to show another file type
  $ctrl.isImage = $ctrl.isImage_instant;
  if ($ctrl.isImage) {
    $ctrl.image = dataUrl;
  }
}

function asyncSuccess(response, $ctrl) {
  // Start changing process indicator immediately
  $ctrl.processingState = 1;

  if ($ctrl.ngChange) {
    $ctrl.ngChange();
  }

  // Wait before updating text
  $ctrl.$timeout(function () {
    $ctrl.isProcessing = false;
    $ctrl.isSuccess = true;
  }, 3000);

  // Allow a small amount of extra time before notifying external handlers
  $ctrl.$timeout(function () {
    triggerHandler($ctrl.onSuccess, response);
    $ctrl.isDone = true;
  }, 3800);

  return response;
}

function asyncFailure(error, $ctrl) {
  // Start changing process indicator immediately
  $ctrl.processingState = -1;

  // Wait before updating text
  $ctrl.$timeout(function () {
    $ctrl.isProcessing = false;
    $ctrl.isError = true;
  }, 3000);

  // Allow a small amount of extra time before notifying external handlers
  $ctrl.$timeout(function () {
    triggerHandler($ctrl.onFailure, error);
    $ctrl.isDone = true;
  }, 4100); // 3500); TODO for some reason more time is needed

  return error;
}

UploadController.$inject = ['$timeout', '$element', '$http', '$scope', '$transclude', '$q', '$attrs'];

exports.default = UploadController;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _popOverDirective = __webpack_require__(83);

var _popOverDirective2 = _interopRequireDefault(_popOverDirective);

var _popOverService = __webpack_require__(84);

var _popOverService2 = _interopRequireDefault(_popOverService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.help.popover', []).service('twPopOverService', _popOverService2.default).directive('twPopOver', _popOverDirective2.default).name;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PopOverController = function () {
  function PopOverController($element, PopoverService) {
    var _this = this;

    _classCallCheck(this, PopOverController);

    this.element = $element[0];
    this.popoverService = PopoverService;

    this.registerEventListeners = this.registerEventListeners.bind(this);
    this.showPopover = function (event) {
      event.preventDefault();
      return _this.popoverService.showPopover(_this.element, getElementOptions(_this.element));
    };
  }

  _createClass(PopOverController, [{
    key: '$onInit',
    value: function $onInit() {
      this.element.setAttribute('tabindex', '0');
      this.element.setAttribute('role', 'button');
      this.element.setAttribute('data-toggle', 'popover');

      this.unregisterEventListeners = this.registerEventListeners(getTriggeringEvent(this.element));
    }
  }, {
    key: '$onDestroy',
    value: function $onDestroy() {
      this.unregisterEventListeners();
    }
  }, {
    key: 'registerEventListeners',
    value: function registerEventListeners(triggeringEvent) {
      if (triggeringEvent === 'hover') {
        this.element.addEventListener('mouseover', this.showPopover);
        this.element.addEventListener('mouseout', this.popoverService.hidePopover);
      } else {
        this.element.addEventListener('click', this.showPopover);
      }

      return function unregisterListeners() {
        if (triggeringEvent === 'hover') {
          this.element.removeEventListener('mouseover', this.showPopover);
          this.element.removeEventListener('mouseout', this.popoverService.hidePopover);
        } else {
          this.element.removeEventListener('click', this.showPopover);
        }
      };
    }
  }]);

  return PopOverController;
}();

/**
 * [getTriggeringEvent Get the triggering event that was passed to this
 *                     directive via data attributes, i.e. as a value
 *                     ['click' | 'hover'] in the data-trigger attribute]
 * @return {String}   [Triggering event]
 */


function getTriggeringEvent(element) {
  var popoverOptions = getElementOptions(element);

  return popoverOptions && popoverOptions.trigger;
}

/**
 * [getElementOptions             Extract all the values passed through data
 *                                attributes to the popover directive]
 * @param  {HTMLElement} element [Element for which we want to extract the values
 *                                from predefined data attributes]
 * @return {Object}              [Map of data attributes and their values]
 */
function getElementOptions(element) {
  var options = {
    trigger: 'click',
    placement: 'right'
  };

  var dataAttributes = ['placement', 'title', 'content', 'trigger', 'template', 'image', 'container'];

  options = dataAttributes.reduce(function (accumulatedOptions, dataAttr) {
    if (element.dataset[dataAttr]) {
      accumulatedOptions[dataAttr] = element.dataset[dataAttr];
    }
    return accumulatedOptions;
  }, options);

  /**
   * Special cases
   */
  if (element.dataset.originalTitle) {
    options.title = element.dataset.originalTitle;
  }

  if (element.dataset.contentHtml) {
    options.contentHtml = element.dataset.contentHtml === 'true';
  }

  return options;
}

PopOverController.$inject = ['$element', 'twPopOverService'];

exports.default = PopOverController;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    restrict: 'A',
    controller: _popOver2.default
  };
};

var _popOver = __webpack_require__(82);

var _popOver2 = _interopRequireDefault(_popOver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function PopoverService($rootScope) {
  /**
   * Register the global event listeners for clicks on the body element and
   * viewport resizing
   */
  registerGlobalEventListeners();

  var BODY = document.getElementsByTagName('body')[0];

  var popover = null;
  var popoverSpacing = 0;
  var elementWithPopover = null;
  var elementPopoverOptions = {};

  /**
   * [showPopover          Call this method to display a popover next to an
   *                       element]
   * @param  {HTMLElement} highlightedElement [Element for which we want to show
   *                                           a popover]
   * @param  {Object}      popoverOptions     [Map of key value options which
   *                                           include the title, content,
   *                                           template and other data and
   *                                           metadata for the popover]
   * @return {null}
   */
  function showPopover(highlightedElement, popoverOptions) {
    if (highlightedElement instanceof HTMLElement && validateOptions(popoverOptions)) {
      /**
       * Store the passed element and the options as properties of the Service
       * object for reference
       */
      elementWithPopover = highlightedElement;
      elementPopoverOptions = popoverOptions;
      popoverSpacing = popoverOptions.popoverSpacing || popoverSpacing;

      var isModalModeEnabled = getModalMode(elementPopoverOptions);
      var popoverParentElement = getPopoverParentElement(elementPopoverOptions);

      var displayHandlers = [setupAdditionalOptions, displayPopover];

      if (!popoverParentElement.contains(popover)) {
        popover = getPopover(elementPopoverOptions);
        popoverParentElement.appendChild(popover);
      }

      popover.innerHTML = getPopoverContent(elementPopoverOptions);

      /**
       * Build the display handler function array depending on the display mode,
       * either modal mode or normal mode, i.e. depending on the modalMode flag
       * set in the passed options, thus saving the need to compute the
       * coordinates of the popover when modal mode is enabled
       */
      if (!isModalModeEnabled) {
        displayHandlers = [].concat(_toConsumableArray(displayHandlers), [setPopoverPosition, getPopoverPlacement]);
      }

      /**
       * Append overlay and add the popover-modal class to the popover element
       */
      toggleModalMode(isModalModeEnabled);

      /**
       * Display the popover with or without computing its position
       */
      compose.apply(undefined, _toConsumableArray(displayHandlers))(elementPopoverOptions);
    } else {
      throw Error('Invalid element type or options object passed to the @showPopover function');
    }
  }

  /**
   * [getPopover                        Gets the popover container in which we
   *                                    will append the binded content to the
   *                                    template]
   * @param  {Object} popoverOptions
   * @return {HTMLElement}
   */
  function getPopover(popoverOptions) {
    var _popoverContainer$cla;

    /**
     * Can be either 'top', 'right', 'bottom', 'left', 'left-top', 'right-top'
     */
    var placement = getPopoverPlacement(popoverOptions);
    var isInModalMode = getModalMode(popoverOptions);
    var isPositionedFixed = getFixedPlacementCondition(popoverOptions);

    var popoverTemplate = getGivenPopoverTemplate(popoverOptions) || getPopoverTemplate();

    var popoverContainer = angular.element(popoverTemplate)[0];

    var popoverClasses = ['popover', 'in', placement, 'scale-down'];

    if (!isInModalMode) {
      popoverClasses.push('animate');
    }

    if (isPositionedFixed) {
      setElementInlineStyles({
        position: 'fixed'
      }, popoverContainer);
    }

    (_popoverContainer$cla = popoverContainer.classList).add.apply(_popoverContainer$cla, popoverClasses);
    popoverContainer.setAttribute('role', 'popover');

    return popoverContainer;
  }

  /**
   * [setPopoverPosition        Based on the @placement, we compute and set the
   *                            popover's coordinates relative to its pointing
   *                            element]
   * @param {String} placement [Can be either 'top', 'right', 'bottom', 'left',
   *                            'left-top', 'right-top']
   */
  function setPopoverPosition(placement) {
    setElementInlineStyles({
      visibility: 'hidden'
    }, popover);

    var _getPopoverPosition = getPopoverPosition(placement),
        offsetX = _getPopoverPosition.offsetX,
        offsetY = _getPopoverPosition.offsetY;

    setElementInlineStyles({
      visibility: 'visible',
      top: offsetY + 'px',
      left: offsetX + 'px'
    }, popover);
  }

  /**
   * [getPopoverPosition         Before computing the coordinates of the popover,
   *                             it checks if the @placement is not causing the
   *                             popover to overflow. If it's causing it to
   *                             overflow, we switch the placement]
   * @param  {String} placement [Can be either 'top', 'right', 'bottom', 'left',
   *                             'left-top', 'right-top']
   * @return {Object}           [Popover coordinates]
   */
  function getPopoverPosition(placement) {
    var verifyPopoverPlacement = compose(updatePopoverClass, checkPopoverPlacement);

    return compose(getPopoverCoordinates, verifyPopoverPlacement)(placement);
  }

  /**
   * [updatePopoverClass         Update the CSS class that denotes the
   *                             @placement of the @popover]
   * @param  {String} placement [Can be either 'top', 'right', 'bottom', 'left',
   *                             'left-top', 'right-top']
   * @return {String}           [Popover's new placement]
   */
  function updatePopoverClass(placement) {
    var _popover$classList;

    var popoverPlacements = ['top', 'right', 'bottom', 'left', 'left-top', 'right-top'];

    (_popover$classList = popover.classList).remove.apply(_popover$classList, popoverPlacements);
    popover.classList.add(placement);

    return placement;
  }

  /**
   * [checkPopoverPlacement      Check if the @placement is not making the
   *                             @popover overflow the viewport]
   * @param  {String} placement [Can be either 'top', 'right', 'bottom', 'left',
   *                             'left-top', 'right-top']
   * @return {String}           [Popover's new placement]
   */
  function checkPopoverPlacement(placement) {
    var elementOffset = getBoundingOffset(elementWithPopover);

    var viewportClientDimensions = getClientDimensions(document.documentElement);

    var elementOffsetDimensions = getOffsetDimensions(elementWithPopover);
    var popoverOffsetDimensions = getOffsetDimensions(popover);

    var popoverOffsetWidth = elementOffset.offsetX + elementOffsetDimensions.offsetWidth + popoverSpacing + popoverOffsetDimensions.offsetWidth;
    var popoverLeftOffset = elementOffset.offsetX - (popoverOffsetDimensions.offsetWidth + popoverSpacing);

    var overflowsRight = popoverOffsetWidth > viewportClientDimensions.clientWidth;
    var overflowsLeft = popoverLeftOffset < 0;

    if (overflowsRight && overflowsLeft) {
      placement = 'bottom';
    }

    if (placement === 'right' && overflowsRight) {
      placement = 'left';
    }

    if (placement === 'right-top' && overflowsRight) {
      placement = 'left-top';
    }

    if (placement === 'left' && overflowsLeft) {
      placement = 'right';
    }

    if (placement === 'left-top' && overflowsLeft) {
      placement = 'right-top';
    }

    return placement;
  }

  /**
   * [getPopoverCoordinates      Computes and returns the popover coordinates
   *                             relative to the pointing element]
   * @param  {String} placement [Can be either 'top', 'right', 'bottom', 'left',
   *                             'left-top', 'right-top']
   * @return {Object}           [Popover's coordinates]
   */
  function getPopoverCoordinates(placement) {
    var popoverContainerElement = getPopoverParentElement(elementPopoverOptions);
    var coordinateComputeFunction = popoverContainerElement === BODY ? getBoundingOffset : getParentOffset;
    var elementOffset = coordinateComputeFunction(elementWithPopover);

    /**
     * The promoted element's size, for which we want to display the popover
     */
    var elementOffsetDimensions = getOffsetDimensions(elementWithPopover);

    var popoverOffsets = {
      offsetX: 0,
      offsetY: 0
    };

    var popoverOffsetDimensions = getOffsetDimensions(popover);

    /*
     * The visible arrow is a pseudo-element
     */
    var popoverArrowStyles = getComputedStyle(popover, ':before');

    var popoverArrowTopOffset = getNumericValue('top')(popoverArrowStyles);
    var popoverArrowHeight = getNumericValue('height')(popoverArrowStyles);
    var popoverArrowMarginTop = getNumericValue('margin-top')(popoverArrowStyles);

    if (placement === 'top') {
      var popoverOffsetX = elementOffset.offsetX - popoverOffsetDimensions.offsetWidth / 2 + elementOffsetDimensions.offsetWidth / 2;
      var popoverOffsetY = elementOffset.offsetY - popoverOffsetDimensions.offsetHeight - popoverSpacing;

      popoverOffsets = {
        offsetX: popoverOffsetX,
        offsetY: popoverOffsetY
      };
    }

    if (placement === 'right' || placement === 'right-top') {
      var _popoverOffsetX = elementOffset.offsetX + elementOffsetDimensions.offsetWidth + popoverSpacing;
      var _popoverOffsetY = elementOffset.offsetY - (popoverArrowTopOffset + popoverArrowMarginTop + popoverArrowHeight / 2) + elementOffsetDimensions.offsetHeight / 2;

      popoverOffsets = {
        offsetX: _popoverOffsetX,
        offsetY: _popoverOffsetY
      };
    }

    if (placement === 'bottom') {
      var _popoverOffsetX2 = elementOffset.offsetX - popoverOffsetDimensions.offsetWidth / 2 + elementOffsetDimensions.offsetWidth / 2;
      var _popoverOffsetY2 = elementOffset.offsetY + elementOffsetDimensions.offsetHeight + popoverSpacing;

      popoverOffsets = {
        offsetX: _popoverOffsetX2,
        offsetY: _popoverOffsetY2
      };
    }

    if (placement === 'left' || placement === 'left-top') {
      var _popoverOffsetX3 = elementOffset.offsetX - popoverOffsetDimensions.offsetWidth - popoverSpacing;
      var _popoverOffsetY3 = elementOffset.offsetY - (popoverArrowTopOffset + popoverArrowMarginTop + popoverArrowHeight / 2) + elementOffsetDimensions.offsetHeight / 2;

      popoverOffsets = {
        offsetX: _popoverOffsetX3,
        offsetY: _popoverOffsetY3
      };
    }

    return popoverOffsets;
  }

  /**
   * [registerGlobalEventListeners Instead of exposing the methods and handling
   *                               the responsability of things such as closing
   *                               the popover when clicking outside of it or
   *                               keeping the position relative to its pointing
   *                               element consistent when the viewport is
   *                               resizing, we register the event listeners
   *                               once, taking advantage of the singleton
   *                               nature of Services]
   * @return {null}
   */
  function registerGlobalEventListeners() {
    document.documentElement.addEventListener('click', documentCallback, true);
    window.addEventListener('resize', resizeCallback);
  }

  /**
   * [unregisterGlobalEventListeners This should be called when the scope that
   *                                 uses this service gets destroyed to prevent
   *                                 memory leeks]
   * @return {null}
   */
  function unregisterGlobalEventListeners() {
    document.documentElement.removeEventListener('click', documentCallback, true);
    window.removeEventListener('resize', resizeCallback);
  }

  /**
   * [documentCallback       Callback to check for clicks outside the popover
   *                         element OR on the element with the .popover-close
   *                         class inside the popover]
   * @param  {Object} event [An object that implements the Event interface]
   * @return {null}
   */
  function documentCallback(event) {
    if (popover) {
      var clickedOutsidePopover = !popover.contains(event.target);
      var clickedInsidePopover = popover.contains(event.target);
      var clickedPopoverClose = event.target.classList.contains('popover-close');
      var popoverIsVisible = !popover.classList.contains('scale-down');

      var closeModalCondition = popoverIsVisible && (clickedOutsidePopover || clickedInsidePopover && clickedPopoverClose);
      var isModalModeEnabled = getModalMode(elementPopoverOptions);

      if (closeModalCondition) {
        hidePopover();

        if (isModalModeEnabled) {
          toggleModalMode(false);
        }
      }

      if (clickedInsidePopover) {
        $rootScope.$emit('promotion:click', elementPopoverOptions);
      }
    }
  }

  /**
   * [resizeCallback          Callback to keep the positioning of the popover
   *                          consistent when the viewport resizes]
   * @return {null}
   */
  function resizeCallback() {
    if (elementWithPopover instanceof HTMLElement && popover) {
      var isModalModeEnabled = getModalMode(elementPopoverOptions);
      var isPopoverVisible = popover && !popover.classList.contains('scale-down');

      if (isModalModeEnabled) {
        if (!popover.querySelector('.popover-close')) {
          popover.insertAdjacentHTML('afterbegin', "<button class='popover-close'>&times;</button>");
        }

        removeClass(popover, 'animate');
      } else {
        addClass(popover, 'animate');
      }

      /**
       * Compute the coordinates of the popover only if the popover is visible
       * and we're not in modal mode
       */
      if (isPopoverVisible && !isModalModeEnabled) {
        compose(setPopoverPosition, getPopoverPlacement)(elementPopoverOptions);
      }

      toggleModalMode(isPopoverVisible && isModalModeEnabled);
    }
  }

  /**
   * [getBoundingOffset            Get the X and Y coordinates of the element on
   *                               the page]
   * @param {HTMLElement} element [Element for which we want to get the coordinates]
   *
   * @return {Object}             [Coordinates of the element]
   */
  function getBoundingOffset(element) {
    var elementRect = element.getBoundingClientRect();
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return {
      offsetY: elementRect.top + scrollTop,
      offsetX: elementRect.left + scrollLeft
    };
  }

  /**
   * [getParentOffset              Get the distance of the current element
   *                               relative to the top and left of the parent
   *                               node.]
   * @param {HTMLElement} element
   */
  function getParentOffset(element) {
    return {
      offsetY: element.offsetTop,
      offsetX: element.offsetLeft
    };
  }

  /**
   * [getOffsetDimensions         Get the element's offset dimensions,
   *                              i.e. measurement which includes the element
   *                              borders, the element horizontal padding, the
   *                              element vertical scrollbar (if present, if
   *                              rendered) and the element CSS width]
   * @param {HTMLElement} element
   *
   * @return {Object}
   */
  function getOffsetDimensions(element) {
    return {
      offsetWidth: element.offsetWidth,
      offsetHeight: element.offsetHeight
    };
  }

  /**
   * [getClientDimensions Get the inner width of an element in pixels. It includes
   *                      padding but not the vertical scrollbar (if present,
   *                      if rendered), border or margin.]
   * @param  {HTMLElement} element
   * @return {Object}
   */
  function getClientDimensions(element) {
    return {
      clientWidth: element.clientWidth,
      clientHeight: element.clientHeight
    };
  }

  /**
   * [getNumericValue              Get an integer value for given DOMString
   *                               property]
   * @param  {DOMString} property [DOMString representing the property name to
   *                               be checked]
   * @return {Number}             [Integer value of the DOMString which
   *                               represents the CSS property value]
   */
  function getNumericValue(property) {
    return compose(parseInt, curry(getPropertyValue)(property));
  }

  /**
   * [getPropertyValue                   Get the DOMString containing the value
   *                                     of a specified CSS property]
   * @param  {String}              prop [DOMString representing the property
   *                                     name to be checked]
   * @param  {CSSStyleDeclaration} obj  [CSSStyleDeclaration represents a
   *                                     collection of CSS property-value pairs]
   * @return {DOMString}                [Value of a specified CSS property of a
   *                                     specified CSS propertytion]
   */
  function getPropertyValue(prop, obj) {
    return obj.getPropertyValue(prop);
  }

  /**
   * [displayPopover   Remove the 'scale-down' CSS class from the popover element,
   *                   causing it to display on the screen]
   * @return {String} [CSS class]
   */
  function displayPopover() {
    return removeClass(popover, 'scale-down');
  }

  /**
   * [hidePopover      Add the 'scale-down' CSS class to the popover element,
   *                   causing it to hide from the screen]
   * @return {String} [CSS class]
   */
  function hidePopover() {
    $rootScope.$emit('promotion:close', elementPopoverOptions);

    teardownAdditionalOptions(elementPopoverOptions);

    return addClass(popover, 'scale-down');
  }

  /**
   * [removeClass             Remove specified class values via the classList.
   *                          If these classes already exist in attribute of the
   *                          element, then they are ignored.]
   * @param {HTMLElement} element
   * @param {String}      cssClass
   *
   * @return {String}
   */
  function removeClass(element, cssClass) {
    element.classList.remove(cssClass);

    return cssClass;
  }

  /**
   * [addClass                Add specified class values via the classList.
   *                          If these classes already exist in attribute of the
   *                          element, then they are ignored.]
   * @param {HTMLElement} element
   * @param {String}      cssClass
   *
   * @return {String}
   */
  function addClass(element, cssClass) {
    element.classList.add(cssClass);

    return cssClass;
  }

  /**
   * [setElementInlineStyles Set @element's inline styles according to the
   *                         @styles object]
   * @param {Object}      styles
   * @param {HTMLElement} element
   */
  function setElementInlineStyles(styles, element) {
    Object.keys(styles).forEach(function (styleKey) {
      element.style[styleKey] = styles[styleKey];
    });
  }

  /**
   * [getPopoverPlacement     Returns the placement of the popover from the
   *                          options object]
   * @param  {Object} popoverOptions
   * @return {String}
   */
  function getPopoverPlacement(popoverOptions) {
    return curry(getObjectProperty)('placement')(popoverOptions);
  }

  /**
   * [getFixedPlacementCondition Returns a Boolean value indicating if we should
   *                             position the popover with a fixed value]
   * @param  {Object} popoverOptions
   * @return {Boolean}
   */
  function getFixedPlacementCondition(popoverOptions) {
    return curry(getObjectProperty)('promotedElementIsFixed')(popoverOptions);
  }

  /**
   * [getGivenPopoverTemplate Returns the template of the popover from the
   *                          options object]
   * @param  {Object} popoverOptions
   * @return {String}
   */
  function getGivenPopoverTemplate(popoverOptions) {
    return curry(getObjectProperty)('template')(popoverOptions);
  }

  function getPopoverParentElement(popoverOptions) {
    var popoverParent = getObjectProperty('container', popoverOptions);

    if (typeof popoverParent === 'string' && document.querySelector(popoverParent)) {
      popoverParent = document.querySelector(popoverParent);
    } else if (popoverParent && popoverParent.toLowerCase() === 'body') {
      popoverParent = BODY;
    } else {
      popoverParent = elementWithPopover.parentNode;
    }

    return popoverParent;
  }

  function getModalOverlayNode() {
    return BODY.querySelector('.popover-modal-cover');
  }

  function getPopoverOverlay() {
    var popoverOverlay = document.createElement('div');
    popoverOverlay.classList.add('popover-modal-cover');

    return popoverOverlay;
  }

  function removePopoverOverlay() {
    var overlayNode = getModalOverlayNode();

    return overlayNode && BODY.removeChild(overlayNode);
  }

  function addPopoverOverlay() {
    var overlayNode = getModalOverlayNode();
    var popoverParentElement = getPopoverParentElement(elementPopoverOptions);

    if (overlayNode === null) {
      if (popoverParentElement === BODY) {
        BODY.insertBefore(getPopoverOverlay(), popover);
      } else {
        BODY.appendChild(getPopoverOverlay());
      }
    }
  }

  function setPopoverToModal() {
    return addClass(popover, 'popover-modal');
  }

  function revertModalToPopover() {
    return removeClass(popover, 'popover-modal');
  }

  function enableModalMode() {
    return compose(setPopoverToModal, addPopoverOverlay)();
  }

  function disableModalMode() {
    return compose(revertModalToPopover, removePopoverOverlay)();
  }

  function toggleModalMode(modalModeEnabled) {
    return modalModeEnabled ? enableModalMode() : disableModalMode();
  }

  function getModalMode(popoverOptions) {
    var isModalModeEnabled = getObjectProperty('modalMode', popoverOptions);
    var viewportClientDimensions = getClientDimensions(document.documentElement);

    return isModalModeEnabled && viewportClientDimensions.clientWidth <= 991;
  }

  function setupAdditionalOptions() {
    var shouldHighlightPromotedElement = getObjectProperty('highlightPromotedElement', elementPopoverOptions);

    if (shouldHighlightPromotedElement) {
      addClass(elementWithPopover, 'promoted');
    }
  }

  function teardownAdditionalOptions(popoverOptions) {
    var shouldHighlightPromotedElement = getObjectProperty('highlightPromotedElement', popoverOptions);

    if (shouldHighlightPromotedElement) {
      removeClass(elementWithPopover, 'promoted');
    }
  }

  /**
   * [getPopoverTemplate Each value in the template, which is equivalent to the
   *                     keys of the binded object, is prefixed and suffixed with
   *                     '__'. For example '__title__' corresponds to the value
   *                     of the 'title' property of the binded object.]
   * @return {String}   [Popover template]
   */
  function getPopoverTemplate() {
    return "<div class='popover'>\n" + "<h3 class='popover-title'></h3>\n" + "<div class='popover-content'></div>\n" + '</div>';
  }

  /**
   * [getPopoverContent Returns the data in the @options binded to the default
   *                    or given template]
   * @param  {Object} options
   * @return {String}
   */
  function getPopoverContent(popoverOptions) {
    var popoverTemplate = getGivenPopoverTemplate(popoverOptions) || getPopoverTemplate();
    var shouldRenderHTML = getObjectProperty('contentHtml', popoverOptions);
    var modalModeEnabled = getModalMode(popoverOptions);

    var popoverContainer = angular.element(popoverTemplate)[0];

    /**
     * Insert the close button only when in modal mode
     */
    if (modalModeEnabled) {
      popoverContainer.insertAdjacentHTML('afterbegin', "<button class='popover-close'>&times;</button>");
    }

    /**
     * For the 'title' and 'content' elements, we get their container elements
     * from the in-memory popover container, and, depending if the dataset attribute
     * 'html' is true, we either insert the parsed text, via
     * insertAdjacentHTML, that was passed in the 'popoverOptions', or we just insert it
     * as text, via insertAdjacentText. 'beforeend' just specifies where the
     * content is inserted, in our case as the last child of the in-memory
     * 'title' and 'content' elements.
     */
    ['title', 'content'].forEach(function (property) {
      var popoverElement = popoverContainer.querySelector('.popover-' + property);
      /**
       * Call the 'insertAdjacentHTML' or 'insertAdjacentText' on the HTMLElement,
       * inserting the values passed through the dataset attributes
       *
       * This form is a shorthand for element.insertAdjacentText or
       * element.insertAdjacentHTML
       */
      if (shouldRenderHTML) {
        popoverElement.insertAdjacentHTML('beforeend', popoverOptions[property]);
      } else {
        popoverElement.insertAdjacentText('beforeend', popoverOptions[property]);
      }
    });

    /**
     * Images are optional, the in-use template should have a child with a
     * .popover-image class and the passed popoverOptions should contain a relative /
     * absolute image path
     */
    var popoverImageElement = popoverContainer.querySelector('.popover-image');
    var popoverImageURL = curry(getObjectProperty)('image')(popoverOptions);

    if (popoverImageElement && popoverImageURL) {
      popoverImageElement.src = popoverImageURL;
    }

    return popoverContainer.innerHTML;
  }

  /**
   * [validateOptions          Define which properties should be mandatory when
   *                           passing the popover options object to the
   *                           @showPopover method]
   * @param  {Object}  object [Popover options object]
   * @return {Boolean}        [Valid popover options]
   */
  function validateOptions(object) {
    return curry(looksLike)({
      title: 'Popover title',
      content: 'Popover content'
    })(object);
  }

  /**
   * [looksLike               A function to compare one object's keys
   *                          to another's. It just checks the first level, no
   *                          recursion is performed for deep checking]
   * @param  {Object} firstObject
   * @param  {Object} secondObject
   * @return {Boolean}
   */
  function looksLike(firstObject, secondObject) {
    return firstObject && secondObject && Object.keys(firstObject).every(function (firstObjectKey) {
      return Object.prototype.hasOwnProperty.call(secondObject, firstObjectKey);
    });
  }

  /**
   * ---------------------------------------------------------------------------
   * FP helper functions
   * ---------------------------------------------------------------------------
   */
  function compose() {
    for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
      fns[_key] = arguments[_key];
    }

    return fns.reverse().reduce(function (fn1, fn2) {
      return function () {
        return fn2(fn1.apply(undefined, arguments));
      };
    });
  }

  function curry(fn) {
    var arity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fn.length;

    return function nextCurried(prevArgs) {
      return function (nextArg) {
        var args = prevArgs.concat([nextArg]);

        if (args.length >= arity) {
          return fn.apply(undefined, _toConsumableArray(args));
        }
        return nextCurried(args);
      };
    }([]);
  }

  function getObjectProperty(property, object) {
    return object[property];
  }

  /**
   * ---------------------------------------------------------------------------
   * FP helper functions
   * ---------------------------------------------------------------------------
   */

  /**
   * Expose the public API of the popover service
   */
  return {
    showPopover: showPopover,
    hidePopover: hidePopover,
    unregisterGlobalEventListeners: unregisterGlobalEventListeners
  };
}

PopoverService.$inject = ['$rootScope'];

exports.default = PopoverService;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _toolTipDirective = __webpack_require__(86);

var _toolTipDirective2 = _interopRequireDefault(_toolTipDirective);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.help.tooltip', []).directive('twToolTip', _toolTipDirective2.default).name;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function ToolTip() {
  return {
    restrict: 'A',
    link: ToolTipLink
  };
}

function ToolTipLink(scope, element) {
  if (!element.tooltip) {
    // eslint-disable-next-line no-console
    console.log('twToolTip requires bootstrap.js');
    return;
  }
  var tag = element[0];
  var options = {};
  if (!tag.getAttribute('data-placement')) {
    options.placement = 'top';
  }
  element.tooltip(options);
  tag.setAttribute('tabindex', '0');
  tag.setAttribute('data-toggle', 'tooltip');
}

exports.default = ToolTip;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

__webpack_require__(3);

var _forms = __webpack_require__(9);

var _forms2 = _interopRequireDefault(_forms);

var _validation = __webpack_require__(11);

var _validation2 = _interopRequireDefault(_validation);

var _formatting = __webpack_require__(8);

var _formatting2 = _interopRequireDefault(_formatting);

var _services = __webpack_require__(4);

var _services2 = _interopRequireDefault(_services);

var _help = __webpack_require__(25);

var _help2 = _interopRequireDefault(_help);

var _layout = __webpack_require__(26);

var _layout2 = _interopRequireDefault(_layout);

var _loading = __webpack_require__(10);

var _loading2 = _interopRequireDefault(_loading);

var _navigation = __webpack_require__(27);

var _navigation2 = _interopRequireDefault(_navigation);

var _formComponents = __webpack_require__(23);

var _formComponents2 = _interopRequireDefault(_formComponents);

var _formValidation = __webpack_require__(24);

var _formValidation2 = _interopRequireDefault(_formValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// DEPRECATED This is required to support old usages of the sub modules when
// importing the full JS library.
exports.default = _angular2.default.module('tw.styleguide-components', [_forms2.default, _validation2.default, _formatting2.default, _services2.default, _help2.default, _layout2.default, _loading2.default, _navigation2.default, _formComponents2.default, _formValidation2.default]).name;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function TwAffix() {
  return {
    restrict: 'A',
    link: AffixLink
  };
}

function AffixLink(scope, element) {
  if (!element.affix) {
    // eslint-disable-next-line no-console
    console.log('twAffix requires bootstrap.js');
    return;
  }

  var tag = element[0];
  var options = {};

  if (tag.getAttribute('data-offset-top') || tag.getAttribute('data-offset-bottom')) {
    options.offset = {};
  }
  if (tag.getAttribute('data-offset-top') && Number(tag.getAttribute('data-offset-top'))) {
    options.offset.top = Number(tag.getAttribute('data-offset-top'));
  }
  if (tag.getAttribute('data-offset-bottom') && Number(tag.getAttribute('data-offset-bottom'))) {
    options.offset.bottom = Number(tag.getAttribute('data-offset-bottom'));
  }
  element.affix(options);
}

exports.default = TwAffix;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _affixDirective = __webpack_require__(88);

var _affixDirective2 = _interopRequireDefault(_affixDirective);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.styling.affix', []).directive('twAffix', _affixDirective2.default).name;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CardController = function CardController($transclude, TwCardsService) {
  _classCallCheck(this, CardController);

  this.toggle = TwCardsService.toggle;
  this.addCard = TwCardsService.addCard;
  this.getExpandedIndex = TwCardsService.getExpandedIndex;
  this.updateExpandedIndex = TwCardsService.updateExpandedIndex;
  this.getCard = TwCardsService.getCard;
  this.getLength = TwCardsService.getLength;
};

CardController.$inject = ['$transclude', 'TwCardsService'];

exports.default = CardController;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cardController = __webpack_require__(90);

var _cardController2 = _interopRequireDefault(_cardController);

var _card = __webpack_require__(129);

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Card() {
  return {
    controller: _cardController2.default,
    template: _card2.default,
    require: {
      cardContainerController: '^twCards'
    },
    controllerAs: '$ctrl',
    bindToController: true,
    replace: true,
    scope: {
      state: '@',
      index: '<',
      showForm: '<?',
      open: '<?',
      disabled: '<?',
      inactive: '<'
    },
    transclude: {
      collapsedCard: 'collapsed',
      expandedCard: 'expanded',
      cardForm: '?cardForm',
      cardIcon: 'cardIcon'
    },
    link: CardLink
  };
}

function CardLink($scope, $element, $attrs, $ctrl) {
  var cardController = $scope.$ctrl;

  cardController.addCard(cardController);
  cardController.index = cardController.getLength() - 1;
  cardController.inactive = $ctrl.cardContainerController.inactive;

  if (cardController.open === true && cardController.getExpandedIndex() === -1) {
    // only takes first pre-expanded card
    cardController.updateExpandedIndex(cardController.index);
  } else {
    cardController.open = false;
  }

  if (cardController.disabled == null) {
    cardController.disabled = false;
  }
}

exports.default = Card;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cards = __webpack_require__(130);

var _cards2 = _interopRequireDefault(_cards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TwCards = {
  template: _cards2.default,
  bindings: {
    inactive: '=?'
  },
  transclude: true
};

exports.default = TwCards;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function TwCardsService() {
  var expandedIndex = -1; // index of expanded card, -1 when all closed
  var cards = []; // boolean array of card controllers

  this.toggle = function (index) {
    if (expandedIndex !== -1 && expandedIndex !== index) {
      cards[expandedIndex].open = false;
      expandedIndex = -1;
    }
    if (cards[index].open) {
      cards[index].open = false;
    } else {
      expandedIndex = index;
      cards[index].open = true;
    }
  };

  this.addCard = function (scope) {
    cards.push(scope);
  };

  this.updateExpandedIndex = function (newExpandedIndex) {
    expandedIndex = newExpandedIndex;
  };

  this.getCard = function (index) {
    return cards[index];
  };
  this.getLength = function () {
    return cards.length;
  };
  this.getExpandedIndex = function () {
    return expandedIndex;
  };
}

exports.default = TwCardsService;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _cardsService = __webpack_require__(93);

var _cardsService2 = _interopRequireDefault(_cardsService);

var _cardDirective = __webpack_require__(91);

var _cardDirective2 = _interopRequireDefault(_cardDirective);

var _cardsComponent = __webpack_require__(92);

var _cardsComponent2 = _interopRequireDefault(_cardsComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.layout.cards', []).service('TwCardsService', _cardsService2.default).component('twCards', _cardsComponent2.default).directive('twCard', _cardDirective2.default).name;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _loaderComponent = __webpack_require__(96);

var _loaderComponent2 = _interopRequireDefault(_loaderComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.loading.loader', []).component('twLoader', _loaderComponent2.default).name;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loader = __webpack_require__(131);

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TwLoader = {
  template: _loader2.default
};

exports.default = TwLoader;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _processComponent = __webpack_require__(98);

var _processComponent2 = _interopRequireDefault(_processComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.loading.process', []).component('twProcess', _processComponent2.default).name;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _processController = __webpack_require__(99);

var _processController2 = _interopRequireDefault(_processController);

var _process = __webpack_require__(132);

var _process2 = _interopRequireDefault(_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Process = {
  controller: _processController2.default,
  template: _process2.default,
  bindings: {
    state: '<',
    size: '@',
    onStop: '&',
    promise: '<'
  }
};

exports.default = Process;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProcessController = function () {
  function ProcessController($scope, $interval, $timeout) {
    var _this = this;

    _classCallCheck(this, ProcessController);

    this.$interval = $interval;
    this.$timeout = $timeout;

    this.interval = null;

    this.processing = this.state;

    // This allows us to cancel the interval when not needed.
    $scope.$watch('$ctrl.state', function () {
      if (isStopped(_this.processing)) {
        _this.processing = null;
        _this.startProcess();
      }
    });

    $scope.$watch('$ctrl.size', function () {
      // Kill the interval and restart on size change as animation will restart
      $interval.cancel(_this.interval);
      _this.startProcess();

      if (!_this.size) {
        _this.size = 'sm';
      }
      // 46% is ok for most cases, but we can make it perfect.
      switch (_this.size) {
        case 'xs':
          _this.radius = '11';
          break;
        case 'sm':
          _this.radius = '22';
          break;
        case 'xl':
          _this.radius = '61';
          break;
        default:
          _this.radius = '46%';
      }
    });

    this.startProcess();
  }

  _createClass(ProcessController, [{
    key: 'startProcess',
    value: function startProcess() {
      var _this2 = this;

      this.interval = this.$interval(function () {
        _this2.processing = _this2.state;
        if (isStopped(_this2.state)) {
          _this2.stopProcess();
        }
      }, 1500);
    }
  }, {
    key: 'stopProcess',
    value: function stopProcess() {
      if (this.interval) {
        this.$interval.cancel(this.interval);
      }

      if (this.onStop) {
        if (this.state === 0) {
          this.onStop();
        } else {
          // 1800 matches 1.5s delay and 0.3s animation
          this.$timeout(this.onStop, 1800);
        }
      }
    }
  }]);

  return ProcessController;
}();

function isStopped(state) {
  return state === -1 || state === 0 || state === 1;
}

ProcessController.$inject = ['$scope', '$interval', '$timeout'];

exports.default = ProcessController;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tabsController = __webpack_require__(101);

var _tabsController2 = _interopRequireDefault(_tabsController);

var _tabs = __webpack_require__(133);

var _tabs2 = _interopRequireDefault(_tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tabs = {
  controller: _tabsController2.default,
  template: _tabs2.default,
  bindings: {
    tabs: '<',
    active: '=',
    onChange: '&'
  }
};

exports.default = Tabs;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TabsController = function () {
  function TabsController() {
    _classCallCheck(this, TabsController);

    if (!this.active && this.tabs.length) {
      this.active = this.tabs[0].type;
    }
  }

  _createClass(TabsController, [{
    key: "switchTab",
    value: function switchTab(tab) {
      this.active = tab;
      if (this.onChange) {
        this.onChange({ tab: tab });
      }
    }
  }]);

  return TabsController;
}();

exports.default = TabsController;

/***/ }),
/* 102 */
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
/* 103 */
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
/* 104 */
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
/* 105 */
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
/* 106 */
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
      return {};
    }

    var preparedFields = void 0;
    if (fields instanceof Array) {
      preparedFields = {};
      fields.forEach(function (field) {
        // If the field still has groups, we need to flatten to get the key
        if (field.group) {
          flattenGroup(field);
        }
        preparedFields[field.key] = copyOf(field);
      });
    } else {
      preparedFields = copyOf(fields);
    }

    Object.keys(preparedFields).forEach(function (key) {
      preparedFields[key] = _this.prepField(preparedFields[key], model, validationMessages);
    });

    return preparedFields;
  };

  this.prepField = function (field, model, validationMessages) {
    var preparedField = copyOf(field);

    flattenGroup(preparedField);

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
      case 'text':
        field.type = 'string';
        break;
      case 'date':
        field.type = 'string';
        field.format = 'date';
        break;
      case 'password':
        field.type = 'string';
        field.control = 'password';
        break;
      case 'checkbox':
        field.type = 'boolean';
        break;
      case 'select':
        field.control = 'select';
        delete field.type;
        break;
      case 'radio':
        field.control = 'radio';
        delete field.type;
        break;
      case 'upload':
        field.type = 'string';
        field.format = 'base64url';
        break;
      default:
    }

    if (!field.control) {
      field.control = _this.getControlType(field);
    }
  };

  this.prepLegacyProps = function (field) {
    delete field.key;

    if (field.name) {
      field.title = field.name;
      delete field.name;
    }

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
        delete field.pattern;
      }
    } else {
      delete field.pattern;
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
      delete option.key;
      delete option.name;
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

    if (!field.validationMessages) {
      delete field.validationMessages;
      return;
    }

    if (field.validationMessages.minimum) {
      field.validationMessages.min = field.validationMessages.minimum;
      delete field.validationMessages.minimum;
    }
    if (field.validationMessages.maximum) {
      field.validationMessages.max = field.validationMessages.maximum;
      delete field.validationMessages.maximum;
    }
  };

  this.getControlType = getControlType;
}

function getControlType(field) {
  if (field.control) {
    return field.control.toLowerCase();
  }
  if (field.hidden) {
    return 'hidden';
  }
  if (field.valuesAsync) {
    return 'select';
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

function flattenGroup(field) {
  if (field.group && field.group[0]) {
    _angular2.default.extend(field, field.group[0]);
    delete field.group;
  }
}

function copyOf(obj) {
  // Object.assign is nicer, but lacks ie support
  return JSON.parse(JSON.stringify(obj));
}

RequirementsService.$inject = ['$http'];

exports.default = RequirementsService;

/***/ }),
/* 107 */
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
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controlValidationController = __webpack_require__(107);

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
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _controlValidationDirective = __webpack_require__(108);

var _controlValidationDirective2 = _interopRequireDefault(_controlValidationDirective);

var _dom = __webpack_require__(1);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.stylguide.validation.control', [_dom2.default]).directive('twValidation', _controlValidationDirective2.default).name;

/***/ }),
/* 110 */
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
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _formValidationDirective = __webpack_require__(110);

var _formValidationDirective2 = _interopRequireDefault(_formValidationDirective);

var _dom = __webpack_require__(1);

var _dom2 = _interopRequireDefault(_dom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.validation.form', [_dom2.default]).directive('form', _formValidationDirective2.default).name;

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = "{{ $ctrl.amount | twCurrencyFormat : $ctrl.currency : $ctrl.locale }}\n";

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = "<span tw-tool-tip\n  data-original-title=\"{{ $ctrl.date | twDateFormat : $ctrl.locale : 'long' }}\">\n  <span class=\"hidden-xs hidden-sm\">\n    {{ $ctrl.date | twDateFormat : $ctrl.locale : $ctrl.format }}\n  </span>\n  <span class=\"hidden-md hidden-lg hidden-xl\">\n    {{ $ctrl.date | twDateFormat : $ctrl.locale : 'short' }}\n  </span>\n</span>\n";

/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports = "{{ $ctrl.amount | twNumberFormat : $ctrl.precision : $ctrl.locale }}\n";

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = "<div class=\"input-group\"\n  ng-class=\"{\n    'input-group-sm': $ctrl.size === 'sm',\n    'input-group-lg': $ctrl.size === 'lg',\n    'disabled': $ctrl.ngDisabled\n  }\">\n  <input\n    type=\"text\"\n    autocomplete=\"off\"\n    name=\"amount\"\n    step=\"any\"\n    class=\"form-control\"\n    placeholder=\"{{ $ctrl.placeholder }}\"\n    tw-focusable\n    show-decimals=\"$ctrl.showDecimals\"\n    tw-number-input-formatter\n    ng-change=\"$ctrl.changedAmount()\"\n    ng-model=\"$ctrl.ngModel\"\n    ng-disabled=\"$ctrl.ngDisabled\" />\n  <span class=\"input-group-addon\"\n    ng-class=\"{'input-lg': $ctrl.size ==='lg'}\"\n    ng-transclude=\"addon\"></span>\n  <span class=\"input-group-btn amount-currency-select-btn\">\n    <tw-select\n      ng-model=\"$ctrl.currency\"\n      ng-required=\"true\"\n      size=\"{{ $ctrl.size }}\"\n      inverse=\"true\"\n      dropdown-right=\"xs\"\n      dropdown-width=\"lg\"\n      hide-currency=\"xs\"\n      hide-note=\"true\"\n      hide-secondary=\"true\"\n      options=\"$ctrl.currencies\"\n      filter=\"{{ $ctrl.currencyFilterPlaceholder }}\"\n      ng-change=\"$ctrl.changedCurrency()\">\n      <a href=\"\"\n        ng-if=\"!!$ctrl.customActionLabel\"\n        ng-click=\"$ctrl.onCustomAction()\">\n        {{ $ctrl.customActionLabel }}\n      </a>\n    </tw-select>\n  </span>\n</div>\n";

/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = "<input type=\"hidden\" class=\"sr-only\"\n  name=\"{{$ctrl.name}}\"\n  ng-model=\"$ctrl.ngModel\"\n  ng-click=\"$ctrl.hiddenClick($event)\"\n  ng-disabled=\"$ctrl.ngDisabled\"/>\n<button type=\"button\" class=\"tw-checkbox-button\" tw-focusable\n  ng-click=\"$ctrl.buttonClick($event)\"\n  ng-focus=\"$ctrl.buttonFocus()\"\n  ng-blur=\"$ctrl.buttonBlur()\"\n  ng-disabled=\"$ctrl.ngDisabled\"\n  ng-class=\"{'checked': $ctrl.checked}\"\n  aria-pressed=\"{{$ctrl.checked}}\">\n  <span class=\"tw-checkbox-check glyphicon glyphicon-ok\"></span>\n</button>\n";

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = "<div class=\"input-group\" ng-class=\"{\n  'input-group-sm': $ctrl.size === 'sm',\n  'input-group-lg': $ctrl.size === 'lg',\n  'disabled': $ctrl.ngDisabled\n}\">\n  <input\n    type=\"text\"\n    autocomplete=\"off\"\n    name=\"amount\"\n    step=\"any\"\n    class=\"form-control p-r-0\"\n    placeholder=\"{{$ctrl.placeholder}}\"\n    show-decimals=\"$ctrl.showDecimals\"\n    tw-focusable\n    tw-number-input-formatter\n    ng-change=\"$ctrl.changedInputValue()\"\n    ng-model=\"$ctrl.ngModel\"\n    ng-disabled=\"$ctrl.ngDisabled\" />\n  <span class=\"hello-world input-group-addon tw-currency-input-code p-l-1\">\n    <span ng-transclude=\"addon\"></span>\n    {{ $ctrl.currency || $ctrl.currencyCode }}\n  </span>\n</div>\n";

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group btn-block dropdown\"\n  ng-keydown=\"$ctrl.keyHandler($event)\">\n\n  <button\n    class=\"btn btn-input dropdown-toggle tw-date-lookup-button\"\n    data-toggle=\"dropdown\"\n    ng-disabled=\"$ctrl.ngDisabled\"\n    ng-click=\"$ctrl.openLookup()\"\n    ng-focus=\"$ctrl.buttonFocus()\"\n    ng-class=\"{\n      'btn-sm': $ctrl.size ==='sm',\n      'btn-lg': $ctrl.size ==='lg'\n    }\">\n\n    <span ng-if=\"$ctrl.label\"\n      class=\"control-label small m-r-1\">{{$ctrl.label}}</span\n    ><span ng-if=\"!$ctrl.ngModel\"\n      class=\"form-control-placeholder tw-date-lookup-placeholder\n        visible-xs-inline visible-sm-inline visible-md-inline\n        visible-lg-inline visible-xl-inline\">\n      {{$ctrl.placeholder}}\n    </span\n    ><span ng-if=\"$ctrl.ngModel\" class=\"tw-date-lookup-selected\">\n      {{$ctrl.selectedDateFormatted}}\n    </span>\n    <span class=\"caret\"></span>\n\n  </button>\n\n  <div class=\"dropdown-menu\">\n\n    <!-- YEAR CALENDAR -->\n    <div ng-if=\"$ctrl.mode ==='year'\" class=\"tw-date-lookup-years\">\n      <div class=\"text-xs-center p-t-1 p-b-2\">\n        <div class=\"pull-xs-left p-b-2\">\n          <a href=\"\" ng-click=\"$ctrl.setYearOffset($event, -20)\"\n            class=\"text-no-decoration tw-date-lookup-previous-years\">\n            <span class=\"icon icon-left icon-lg\"></span>\n          </a>\n        </div>\n        <div class=\"pull-xs-right p-b-2\">\n          <a href=\"\" ng-click=\"$ctrl.setYearOffset($event, 20)\"\n            class=\"text-no-decoration tw-date-lookup-next-years\">\n            <span class=\"icon icon-right icon-lg\"></span>\n          </a>\n        </div>\n      </div>\n      <table class=\"table table-condensed table-bordered table-calendar m-b-0\"><thead\n        class=\"sr-only\">\n          <tr>\n            <th colspan=\"4\">{{$ctrl.placeholder}}</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr ng-repeat=\"row in [0,4,8,12,16]\">\n            <td ng-repeat=\"col in [0,1,2,3]\">\n              <a href=\"\"\n                ng-click=\"$ctrl.selectYear($event, $ctrl.calculateYear(row, col))\"\n                ng-disabled=\"$ctrl.isYearDisabled($ctrl.calculateYear(row, col))\"\n                ng-class=\"{\n                  'active': $ctrl.selectedYear === $ctrl.calculateYear(row, col)\n                }\"\n                class=\"tw-date-lookup-year-option\">\n                {{$ctrl.calculateYear(row, col)}}\n              </a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <!-- MONTH CALENDAR -->\n    <div ng-if=\"$ctrl.mode ==='month'\" class=\"tw-date-lookup-months\">\n      <div class=\"text-xs-center p-t-1 p-b-2\">\n        <div class=\"pull-xs-left\">\n          <a href=\"\" ng-click=\"$ctrl.yearBefore($event)\" class=\"text-no-decoration\">\n            <span class=\"icon icon-left icon-lg\"></span>\n          </a>\n        </div>\n        <a href=\"\" ng-click=\"$ctrl.switchToYears($event)\"\n          class=\"tw-date-lookup-year-label\">\n          {{$ctrl.year}}\n        </a>\n        <div class=\"pull-xs-right\">\n          <a href=\"\" ng-click=\"$ctrl.yearAfter($event)\" class=\"text-no-decoration\">\n            <span class=\"icon icon-right icon-lg\"></span>\n          </a>\n        </div>\n      </div>\n      <table class=\"table table-condensed table-bordered table-calendar m-b-0\"><thead\n        class=\"sr-only\">\n          <tr>\n            <th colspan=\"3\">{{$ctrl.placeholder}}</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr ng-repeat=\"row in [0,4,8]\">\n            <td ng-repeat=\"col in [0,1,2,3]\">\n              <a href=\"\"\n                ng-click=\"$ctrl.selectMonth($event, row+col, $ctrl.year)\"\n                ng-disabled=\"$ctrl.isMonthDisabled(row + col, $ctrl.year)\"\n                ng-class=\"{\n                  'active': $ctrl.selectedMonth === (row + col) && $ctrl.selectedYear === $ctrl.year\n                }\"\n                class=\"tw-date-lookup-month-option\">\n                {{$ctrl.shortMonthsOfYear[row+col] | limitTo:5}}\n              </a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <!-- DAY CALENDAR -->\n    <div ng-if=\"$ctrl.mode ==='day'\" class=\"tw-date-lookup-days\">\n      <div class=\"text-xs-center p-t-1 p-b-2\">\n        <div class=\"pull-xs-left\">\n          <a href=\"\" ng-click=\"$ctrl.monthBefore($event)\"\n            class=\"text-no-decoration tw-date-lookup-previous-month\">\n            <span class=\"icon icon-left icon-lg\"></span>\n          </a>\n        </div>\n        <a href=\"\" ng-click=\"$ctrl.switchToYears($event)\"\n          class=\"tw-date-lookup-month-label\">\n          {{$ctrl.yearMonthFormatted}}\n        </a>\n        <div class=\"pull-xs-right\">\n          <a href=\"\" ng-click=\"$ctrl.monthAfter($event)\"\n            class=\"text-no-decoration tw-date-lookup-next-month\">\n            <span class=\"icon icon-right icon-lg\"></span>\n          </a>\n        </div>\n      </div>\n      <table class=\"table table-condensed table-bordered table-calendar m-b-0\"><thead>\n          <tr>\n            <th ng-repeat=\"day in $ctrl.daysOfWeek track by $index\">\n              <span class=\"hidden-xs\">{{day | limitTo : 3}}</span>\n              <span class=\"visible-xs-inline-block\">{{$ctrl.shortDaysOfWeek[$index] | limitTo : 2}}</span>\n            </th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr ng-repeat=\"week in $ctrl.weeks\">\n            <td ng-repeat=\"day in week track by $index\"\n              ng-class=\"{\n                'default': $index > 4\n              }\">\n              <a href=\"\" title=\"{{day}} {{$ctrl.monthsOfYear[$ctrl.month]}} {{$ctrl.year}}\"\n                ng-if=\"day\"\n                ng-click=\"$ctrl.selectDay($event, day, $ctrl.month, $ctrl.year)\"\n                ng-disabled=\"$ctrl.isDayDisabled(day, $ctrl.month, $ctrl.year)\"\n                ng-class=\"{\n                  'active': $ctrl.isCurrentlySelected(day, $ctrl.month, $ctrl.year)\n                }\"\n                class=\"tw-date-lookup-day-option\" tabindex=\"0\">\n                {{day}}\n              </a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n  </div>\n</div>\n";

/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n\n  <div class=\"col-sm-5 tw-date-month-column\" ng-if=\"$ctrl.monthBeforeDay\">\n    <label class=\"sr-only\">Month</label>\n    <tw-select\n      name=\"month\"\n      class=\"tw-date-month\"\n      ng-model=\"$ctrl.month\"\n      ng-change=\"$ctrl.updateDateModelAndValidationClasses()\"\n      ng-required=\"$ctrl.dateRequired\"\n      ng-disabled=\"$ctrl.dateDisabled\"\n      options=\"$ctrl.dateMonths\">\n    </tw-select>\n  </div>\n\n  <div class=\"col-sm-3 tw-date-day-column\">\n    <label class=\"sr-only\">Day</label>\n    <input type=\"number\"\n      name=\"day\"\n      class=\"form-control tw-date-day\"\n      ng-model=\"$ctrl.day\"\n      ng-change=\"$ctrl.updateDateModelAndValidationClasses()\"\n      placeholder=\"DD\"\n      min=\"1\"\n      ng-min=\"1\"\n      ng-disabled=\"$ctrl.dateDisabled\"\n      ng-required=\"$ctrl.dateRequired\"\n      tw-focusable />\n  </div>\n\n  <div class=\"col-sm-5 tw-date-month-column\" ng-if=\"!$ctrl.monthBeforeDay\">\n    <label class=\"sr-only\">Month</label>\n    <tw-select\n      name=\"month\"\n      class=\"tw-date-month\"\n      ng-model=\"$ctrl.month\"\n      ng-change=\"$ctrl.updateDateModelAndValidationClasses()\"\n      ng-required=\"$ctrl.dateRequired\"\n      ng-disabled=\"$ctrl.dateDisabled\"\n      options=\"$ctrl.dateMonths\">\n    </tw-select>\n  </div>\n\n  <div class=\"col-sm-4 tw-date-year-column\">\n    <label class=\"sr-only\">Year</label>\n    <input type=\"number\"\n      name=\"year\"\n      class=\"form-control tw-date-year\"\n      placeholder=\"YYYY\"\n      ng-model=\"$ctrl.year\"\n      ng-change=\"$ctrl.updateDateModelAndValidationClasses()\"\n      ng-min=\"$ctrl.min.getFullYear()\"\n      ng-max=\"$ctrl.max.getFullYear()\"\n      maxlength=\"4\"\n      ng-maxlength=\"4\"\n      ng-disabled=\"$ctrl.dateDisabled\"\n      ng-required=\"$ctrl.dateRequired\"\n      tw-focusable />\n  </div>\n</div>\n";

/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = "<div class=\"m-t-1\">\n  <h4\n    ng-if=\"$ctrl.title\"\n    ng-bind=\"$ctrl.title\"\n    class=\"page-header p-t-3\">\n  </h4>\n</div>\n<div class=\"row row-equal-height\">\n  <div class=\"col-xs-12\"\n    ng-class=\"{'col-sm-6': !$ctrl.narrow}\"\n    ng-repeat=\"(key, field) in $ctrl.fields track by $index\"\n    ng-if=\"$ctrl.model[key]\">\n\n    <dl ng-if=\"!field.group\">\n      <dt ng-bind=\"field.title\"></dt>\n      <dd ng-switch=\"field.control\">\n        <span ng-switch-when=\"select|radio\" ng-switch-when-separator=\"|\">\n          {{ $ctrl.getValueLabel(field.values, $ctrl.model[key]) }}\n        </span>\n        <span ng-switch-when=\"date\">\n          {{ $ctrl.model[key] | twDateFormat: $ctrl.locale }}\n        </span>\n        <span ng-switch-when=\"number\">\n          {{ $ctrl.model[key] | twNumberFormat: $ctrl.locale }}\n        </span>\n        <span ng-switch-when=\"password\">\n          {{ $ctrl.mask($ctrl.model[key]) }}\n        </span>\n        <div ng-switch-when=\"file\" class=\"thumbnail\">\n          <img alt=\"{{ field.title }}\"\n            ng-src=\"{{ $ctrl.model[key] }}\"\n            ng-attr-alt=\"{{ field.title }}\" />\n        </div>\n        <span ng-switch-default>\n          {{ $ctrl.model[key] | twTextFormat: field.displayFormat }}\n        </span>\n      </dd>\n    </dl>\n\n    <!-- Start old 'nested group' style -->\n    <dl ng-if=\"field.group\">\n      <dt ng-bind=\"field.title\"></dt>\n      <dd>\n        <span ng-repeat=\"fieldSection in field.group\">\n          <span ng-switch=\"fieldSection.control\">\n            <span ng-switch-when=\"select|radio\" ng-switch-when-separator=\"|\">\n              {{ $ctrl.getValueLabel(fieldSection.values, $ctrl.model[fieldSection.key]) }}\n            </span>\n            <span ng-switch-when=\"date\">\n              {{ $ctrl.model[fieldSection.key] | twDateFormat: $ctrl.locale }}\n            </span>\n            <span ng-switch-when=\"number\">\n              {{ $ctrl.model[fieldSection.key] | twNumberFormat: $ctrl.locale }}\n            </span>\n            <span ng-switch-when=\"password\">\n              {{ $ctrl.mask($ctrl.model[fieldSection.key]) }}\n            </span>\n            <div ng-switch-when=\"file\" class=\"thumbnail\">\n              <img alt=\"{{ field.title }}\"\n                ng-src=\"{{ $ctrl.model[fieldSection.key] }}\"\n                ng-attr-alt=\"{{ field.title }}\" />\n            </div>\n            <span ng-switch-default>\n              {{ $ctrl.model[fieldSection.key] | twTextFormat: fieldSection.displayFormat }}\n            </span>\n          </span>\n        </span>\n      </dd>\n    </dl>\n    <!-- End old 'nested group' style -->\n\n  </div>\n</div>\n";

/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = "<div ng-switch=\"$ctrl.type\">\n  <div ng-switch-when=\"radio\"\n    class=\"radio\"\n    ng-class=\"{disabled: $ctrl.ngDisabled}\"\n    ng-repeat=\"option in $ctrl.options\">\n    <label>\n      <tw-radio\n        name=\"{{$ctrl.name}}\"\n        ng-value=\"option.value\"\n        ng-model=\"$ctrl.internalModel\"\n        ng-required=\"$ctrl.ngRequired\"\n        ng-disabled=\"$ctrl.ngDisabled\"\n        ng-change=\"$ctrl.change(option.value)\"\n        ng-click=\"$ctrl.change(option.value)\"\n        ng-focus=\"$ctrl.focus()\"\n        ng-blur=\"$ctrl.blur()\"\n      ></tw-radio>\n      {{option.label}}\n    </label>\n  </div>\n\n  <div ng-switch-when=\"checkbox\"\n    class=\"checkbox\"\n    ng-class=\"{disabled: $ctrl.ngDisabled}\">\n    <label>\n      <tw-checkbox\n        name=\"{{$ctrl.name}}\"\n        ng-model=\"$ctrl.internalModel\"\n        ng-required=\"$ctrl.ngRequired\"\n        ng-disabled=\"$ctrl.ngDisabled\"\n        ng-change=\"$ctrl.change($ctrl.internalModel)\"\n        ng-click=\"$ctrl.change()\"\n        ng-focus=\"$ctrl.focus()\"\n        ng-blur=\"$ctrl.blur()\"\n      ></tw-checkbox>\n      {{$ctrl.placeholder}}\n    </label>\n  </div>\n\n  <div ng-switch-when=\"select\">\n    <tw-select\n      name=\"{{$ctrl.name}}\"\n      options=\"$ctrl.options\"\n      placeholder=\"{{$ctrl.placeholder}}\"\n      ng-model=\"$ctrl.internalModel\"\n      ng-required=\"$ctrl.ngRequired\"\n      ng-disabled=\"$ctrl.ngDisabled\"\n      ng-change=\"$ctrl.change($ctrl.internalModel)\"\n      ng-focus=\"$ctrl.focus()\"\n      ng-blur=\"$ctrl.blur()\"\n    ></tw-select>\n  </div>\n\n  <div ng-switch-when=\"file|upload\" ng-switch-when-separator=\"|\">\n    <tw-upload\n      name=\"{{$ctrl.name}}\"\n      label=\"{{$ctrl.label}}\"\n      icon=\"{{$ctrl.uploadIcon}}\"\n      help-image=\"{{$ctrl.helpImage}}\"\n      placeholder=\"{{$ctrl.placeholder}}\"\n      accept=\"{{$ctrl.uploadAccept}}\"\n      complete-text=\"{{$ctrl.label}}\"\n      button-text=\"{{$ctrl.uploadOptions.buttonText}}\"\n      cancel-text=\"{{$ctrl.uploadOptions.cancelText}}\"\n      too-large-message=\"{{$ctrl.uploadTooLargeMessage}}\"\n      max-size=\"$ctrl.ngMax\"\n      ng-model=\"$ctrl.internalModel\"\n      ng-required=\"$ctrl.ngRequired\"\n      ng-disabled=\"$ctrl.ngDisabled\"\n      ng-change=\"$ctrl.change($ctrl.internalModel)\"\n      ng-focus=\"$ctrl.focus()\"\n      ng-blur=\"$ctrl.blur()\"\n    ></tw-upload>\n  </div>\n\n  <div ng-switch-when=\"date|date-time\" ng-switch-when-separator=\"|\">\n    <tw-date\n      name=\"{{$ctrl.name}}\"\n      locale=\"{{$ctrl.locale}}\"\n      ng-min=\"$ctrl.ngMin\"\n      ng-max=\"$ctrl.ngMax\"\n      ng-model=\"$ctrl.internalModel\"\n      ng-model-options=\"{ allowInvalid: true }\"\n      ng-required=\"$ctrl.ngRequired\"\n      ng-disabled=\"$ctrl.ngDisabled\"\n      ng-change=\"$ctrl.change($ctrl.internalModel)\"\n      ng-focus=\"$ctrl.focus()\"\n      ng-blur=\"$ctrl.blur()\"\n      model-type=\"string\"\n    ></tw-date>\n  </div>\n\n  <input ng-switch-when=\"number\"\n    name=\"{{$ctrl.name}}\"\n    type=\"number\"\n    step=\"{{$ctrl.step}}\"\n    class=\"form-control\"\n    placeholder=\"{{$ctrl.placeholder}}\"\n    ng-model=\"$ctrl.internalModel\"\n    ng-model-options=\"{ allowInvalid: true }\"\n    ng-required=\"$ctrl.ngRequired\"\n    ng-disabled=\"$ctrl.ngDisabled\"\n    ng-change=\"$ctrl.change($ctrl.internalModel)\"\n    ng-focus=\"$ctrl.focus()\"\n    ng-blur=\"$ctrl.blur()\"\n    ng-min=\"$ctrl.ngMin\"\n    ng-max=\"$ctrl.ngMax\" />\n\n  <input ng-switch-when=\"hidden\"\n    name=\"{{$ctrl.name}}\"\n    type=\"hidden\"\n    ng-model=\"$ctrl.ngModel\"/>\n\n  <input ng-switch-when=\"password\"\n    name=\"{{$ctrl.name}}\"\n    type=\"password\"\n    class=\"form-control\"\n    placeholder=\"{{$ctrl.placeholder}}\"\n    ng-model=\"$ctrl.internalModel\"\n    ng-model-options=\"{ allowInvalid: true }\"\n    ng-required=\"$ctrl.ngRequired\"\n    ng-disabled=\"$ctrl.ngDisabled\"\n    ng-change=\"$ctrl.change($ctrl.internalModel)\"\n    ng-focus=\"$ctrl.focus()\"\n    ng-blur=\"$ctrl.blur()\"\n    ng-minlength=\"$ctrl.ngMinlength\"\n    ng-maxlength=\"$ctrl.ngMaxlength\" />\n\n  <input ng-switch-default\n    name=\"{{$ctrl.name}}\"\n    type=\"text\"\n    class=\"form-control\"\n    placeholder=\"{{$ctrl.placeholder}}\"\n    ng-model=\"$ctrl.internalModel\"\n    ng-model-options=\"{ allowInvalid: true }\"\n    ng-required=\"$ctrl.ngRequired\"\n    ng-pattern=\"$ctrl.ngPattern\"\n    ng-minlength=\"$ctrl.ngMinlength\"\n    ng-maxlength=\"$ctrl.ngMaxlength\"\n    ng-change=\"$ctrl.change($ctrl.internalModel)\"\n    ng-focus=\"$ctrl.focus()\"\n    ng-blur=\"$ctrl.blur()\"\n    ng-disabled=\"$ctrl.ngDisabled\"\n    tw-text-format=\"{{ $ctrl.textFormat }}\" />\n\n</div>\n";

/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = "<div class=\"form-group tw-field-{{ $ctrl.name }}\"\n  ng-class=\"{\n    'has-error': $ctrl.field.errorMessage || $ctrl.errorMessage,\n    'has-warning': $ctrl.field.warningMessage || $ctrl.warningMessage,\n    'hidden': $ctrl.field.hidden\n  }\">\n  <label class=\"control-label\"\n    ng-if=\"$ctrl.control !== 'file'\">\n    {{$ctrl.field.title}}\n  </label>\n  <tw-form-control\n    name=\"{{ $ctrl.field.key }}\"\n    label=\"{{ $ctrl.field.title }}\"\n    type=\"{{ $ctrl.control | lowercase }}\"\n    placeholder=\"{{ $ctrl.field.placeholder }}\"\n    help-text=\"{{ $ctrl.field.helpText }}\"\n    help-image=\"{{ $ctrl.field.helpImage }}\"\n    locale=\"{{ $ctrl.locale }}\"\n    upload-accept=\"{{ $ctrl.field.accept }}\"\n    upload-icon=\"{{ $ctrl.field.icon }}\"\n    upload-too-large-message=\"{{ $ctrl.field.tooLargeMessage }}\"\n    options=\"$ctrl.field.values\"\n    upload-options=\"$ctrl.field.uploadOptions\"\n    ng-model=\"$ctrl.model\"\n    ng-focus=\"$ctrl.onFocus()\"\n    ng-blur=\"$ctrl.onBlur()\"\n    ng-change=\"$ctrl.onChange($ctrl.model)\"\n    ng-required=\"$ctrl.field.required\"\n    ng-disabled=\"$ctrl.field.disabled\"\n    tw-minlength=\"$ctrl.field.minlength || $ctrl.field.minLength\"\n    tw-maxlength=\"$ctrl.field.maxlength || $ctrl.field.maxLength\"\n    ng-min=\"$ctrl.field.minimum\"\n    ng-max=\"$ctrl.field.maximum\"\n    ng-pattern=\"$ctrl.field.pattern\"\n    text-format=\"$ctrl.field.displayFormat\"\n    tw-validation\n  ></tw-form-control>\n  <div class=\"alert alert-danger error-messages\"\n    ng-if=\"$ctrl.sizeOf($ctrl.field.validationMessages) > 0 || $ctrl.errorMessage\"\n    ng-class=\"{\n      'alert-detach': $ctrl.control === 'date'  ||\n                      $ctrl.control === 'file' ||\n                      $ctrl.control === 'radio'\n    }\">\n    <div ng-repeat=\"(validationType, validationMessage) in $ctrl.field.validationMessages track by $index\"\n      class=\"error-{{ validationType | lowercase }}\">\n      {{validationMessage}}\n    </div>\n    <div class=\"error-provided\" ng-if=\"$ctrl.errorMessage\">\n      {{ $ctrl.errorMessage }}\n    </div>\n  </div>\n  <div class=\"alert alert-warning\"\n    ng-if=\"$ctrl.warningMessage\"\n    ng-class=\"{\n      'alert-detach': $ctrl.control === 'date'  ||\n                      $ctrl.control === 'file' ||\n                      $ctrl.control === 'radio'\n    }\">\n    {{ $ctrl.warningMessage }}\n  </div>\n  <div ng-if=\"$ctrl.field.helpText || $ctrl.field.helpList || $ctrl.field.helpImage\"\n    class=\"alert alert-focus\"\n    ng-class=\"{\n      'alert-detach': $ctrl.control === 'date' ||\n                      $ctrl.control === 'file' ||\n                      $ctrl.control === 'radio'\n    }\">\n    <span ng-if=\"$ctrl.field.helpText\">\n      {{ $ctrl.field.helpText }}\n    </span>\n    <ul ng-if=\"$ctrl.field.helpList\" class=\"list-unstyled\">\n      <li ng-repeat=\"helpMessage in $ctrl.field.helpList\">{{ helpMessage }}</li>\n    </ul>\n    <img\n      ng-if=\"$ctrl.field.helpImage && $ctrl.control !== 'file'\"\n      ng-src=\"{{$ctrl.field.helpImage}}\"\n      alt=\"{{$ctrl.field.title}}\"\n      class=\"thumbnail m-y-2\" />\n  </div>\n</div>\n";

/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = "<fieldset ng-form=\"twFieldset\">\n  <legend ng-if=\"$ctrl.title\">{{ $ctrl.title }}</legend>\n  <p class=\"text-max-width\" ng-if=\"$ctrl.description\">{{ $ctrl.description }}</p>\n  <div class=\"row row-equal-height\">\n    <div ng-repeat=\"(key, field) in $ctrl.fields track by $index\" class=\"col-xs-12\" ng-hide=\"field.hidden\"\n      ng-class=\"{\n        'col-sm-4': !$ctrl.narrow  && field.width === 'sm',\n        'col-sm-6': !$ctrl.narrow  && (field.width === 'md' || field.maxlength && field.maxlength <= 10),\n        'col-sm-12': $ctrl.narrow || field.width === 'lg' || !field.maxlength || field.maxlength > 10\n      }\">\n\n      <tw-field\n        name=\"{{ key }}\"\n        model=\"$ctrl.model[key]\"\n        field=\"field\"\n        locale=\"$ctrl.locale\"\n        upload-options=\"$ctrl.uploadOptions\"\n        error-message=\"$ctrl.errorMessages[key]\"\n        warning-message=\"$ctrl.warningMessages[key]\"\n        on-change=\"$ctrl.fieldChange(value, key, field)\"\n        on-focus=\"$ctrl.fieldFocus(key, field)\"\n        on-blur=\"$ctrl.fieldBlur(key, field)\"\n        class=\"btn-block\">  <!-- Remove btn-block after boostrap update -->\n      </tw-field>\n\n    </div>\n  </div>\n</fieldset>\n";

/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports = "<input type=\"radio\" class=\"sr-only\"\n  name=\"{{$ctrl.name}}\"\n  ng-value=\"$ctrl.ngValue || $ctrl.value\"\n  ng-model=\"$ctrl.ngModel\"\n  ng-disabled=\"$ctrl.ngDisabled\"\n  ng-change=\"$ctrl.hiddenInputChange()\"\n  tabindex=\"-1\" />\n<button type=\"button\" class=\"tw-radio-button\" tw-focusable\n  ng-click=\"$ctrl.buttonClick($event)\"\n  ng-focus=\"$ctrl.buttonFocus()\"\n  ng-blur=\"$ctrl.buttonBlur()\"\n  ng-disabled=\"$ctrl.ngDisabled\"\n  ng-class=\"{checked: $ctrl.checked}\"\n  aria-pressed=\"{{$ctrl.checked}}\">\n  <span class=\"tw-radio-check\"></span>\n</button>\n";

/***/ }),
/* 125 */
/***/ (function(module, exports) {

module.exports = "<tw-tabs\n  ng-if=\"$ctrl.requirements.length > 1\"\n  tabs=\"$ctrl.requirements\"\n  active=\"$ctrl.model.type\">\n</tw-tabs>\n<div class=\"tab-content\" ng-form=\"twForm\">\n  <div ng-repeat=\"requirementType in $ctrl.requirements\"\n    ng-if=\"$ctrl.model.type == requirementType.type\"\n    class=\"tab-pane active\"\n    id=\"{{requirementType.type}}\">\n    <p>{{requirementType.description}}</p>\n    <tw-fieldset\n      fields=\"requirementType.fields\"\n      model=\"$ctrl.model\"\n      upload-options=\"$ctrl.uploadOptions\"\n      locale=\"{{$ctrl.locale}}\"\n      on-refresh-requirements=\"$ctrl.onRefreshRequirements()\"\n      validation-messages=\"$ctrl.validationMessages\"\n      error-messages=\"$ctrl.errorMessages\">\n    </tw-fieldset>\n  </div>\n</div>\n";

/***/ }),
/* 126 */
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group btn-block tw-select\"\n  ng-class=\"{\n    dropdown: !$ctrl.dropdownUp,\n    dropup: $ctrl.dropdownUp\n  }\" aria-hidden=\"false\">\n\n  <button type=\"button\" class=\"btn btn-input dropdown-toggle\"\n    ng-class=\"{\n      'btn-input-inverse': $ctrl.inverse,\n      'btn-addon': $ctrl.inverse,\n      'btn-sm': $ctrl.size === 'sm',\n      'btn-lg': $ctrl.size === 'lg'\n    }\"\n    data-toggle=\"dropdown\" aria-expanded=\"false\"\n    ng-disabled=\"$ctrl.ngDisabled\"\n    ng-focus=\"$ctrl.buttonFocus()\"\n    tw-focusable>\n\n    <span class=\"tw-select-selected\" ng-if=\"$ctrl.selected\">\n      <span class=\"circle circle-inverse pull-xs-left circle-sm\"\n        ng-if=\"$ctrl.selected && $ctrl.selected.icon && $ctrl.selected.secondary\">\n        <span class=\"icon {{$ctrl.selected.icon}}\"></span>\n      </span>\n\n      <span class=\"circle circle-inverse pull-xs-left\"\n        ng-class=\"$ctrl.circleClasses($ctrl.hideCircle)\"\n        ng-if=\"($ctrl.selected.circleText || $ctrl.selected.circleImage || $ctrl.selected.circleIcon)\">\n        <span ng-if=\"$ctrl.selected.circleText\">{{$ctrl.selected.circleText}}</span>\n        <img alt=\"{{$ctrl.selected.label}}\"\n          ng-if=\"$ctrl.selected.circleImage\"\n          src=\"data:image/png;base64,\n            iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=\"\n          ng-src=\"{{$ctrl.selected.circleImage}}\" />\n        <span ng-if=\"$ctrl.selected.circleIcon\" class=\"icon {{$ctrl.selected.circleIcon}}\"></span>\n      </span>\n\n      <span class=\"text-ellipsis\">\n        <span class=\"currency-flag currency-flag-{{$ctrl.selected.currency | lowercase}}\"\n          ng-if=\"$ctrl.selected && $ctrl.selected.currency\"\n          ng-class=\"$ctrl.responsiveClasses($ctrl.hideCurrency)\"\n        ></span>\n        <span class=\"icon {{$ctrl.selected.icon}}\"\n          ng-if=\"$ctrl.selected && $ctrl.selected.icon && !$ctrl.selected.secondary\"\n          ng-class=\"$ctrl.responsiveClasses($ctrl.hideIcon)\"\n        ></span>\n        <span class=\"tw-select-label\"\n          ng-class=\"$ctrl.responsiveClasses($ctrl.hideLabel)\">\n          {{$ctrl.selected.label}}\n        </span>\n        <span\n          ng-if=\"$ctrl.selected.note\"\n          ng-class=\"$ctrl.responsiveClasses($ctrl.hideNote)\"\n          class=\"tw-select-note small m-l-1\">\n          {{$ctrl.selected.note}}\n        </span>\n\n        <span\n          ng-if=\"$ctrl.selected.secondary\"\n          ng-class=\"$ctrl.responsiveClasses($ctrl.hideSecondary)\"\n          class=\"tw-select-secondary small secondary text-ellipsis\">\n          {{$ctrl.selected.secondary}}\n        </span>\n      </span>\n    </span>\n\n    <span class=\"form-control-placeholder\" ng-if=\"!$ctrl.selected\">{{$ctrl.placeholder}}</span>\n    <span class=\"caret\"></span>\n  </button>\n  <ul class=\"dropdown-menu\" role=\"menu\"\n    ng-class=\"{\n      'dropdown-menu-xs-right': $ctrl.dropdownRight === 'xs',\n      'dropdown-menu-sm-right': $ctrl.dropdownRight === 'sm',\n      'dropdown-menu-md-right': $ctrl.dropdownRight === 'md',\n      'dropdown-menu-lg-right': $ctrl.dropdownRight === 'lg',\n      'dropdown-menu-xl-right': $ctrl.dropdownRight === 'xl',\n      'dropdown-menu-sm': $ctrl.dropdownWidth === 'sm',\n      'dropdown-menu-md': $ctrl.dropdownWidth === 'md',\n      'dropdown-menu-lg': $ctrl.dropdownWidth === 'lg'\n    }\">\n\n    <li ng-if=\"$ctrl.filter\">\n      <a href=\"\" class=\"tw-select-filter-link p-a-0\" tabindex=\"-1\"\n        ng-focus=\"$ctrl.focusOnFilterInput()\">\n        <div class=\"input-group\">\n          <span class=\"input-group-addon\"><span class=\"icon icon-search\"></span> </span>\n          <input type=\"text\"\n            class=\"form-control tw-select-filter\"\n            placeholder=\"{{$ctrl.filter}}\"\n            ng-model=\"$ctrl.filterString\"\n            ng-change=\"$ctrl.filterChange()\"\n            ng-keydown=\"$ctrl.filterKeydown($event)\" />\n        </div>\n      </a>\n    </li>\n\n    <li ng-class=\"{active: !$ctrl.selected}\"\n      ng-if=\"$ctrl.placeholder && !$ctrl.ngRequired && !$ctrl.filter\">\n      <a href=\"\" tabindex=\"-1\"\n        ng-click=\"$ctrl.placeholderClick()\"\n        ng-focus=\"$ctrl.placeholderFocus()\"\n        class=\"tw-select-placeholder\" tw-focusable>\n        {{$ctrl.placeholder}}\n      </a>\n    </li>\n\n    <li ng-if=\"($ctrl.placeholder && !$ctrl.ngRequired) || $ctrl.filter\" class=\"divider\"></li>\n\n    <li\n      ng-repeat=\"option in $ctrl.filteredOptions\"\n      ng-class=\"{\n        'active': $ctrl.ngModel === option.value,\n        'disabled': option.disabled,\n        'dropdown-header': option.header,\n        'tw-select-option': !option.header && !option.disabled\n      }\">\n      <span ng-if=\"option.header\" class=\"text-ellipsis\">{{option.header}}</span>\n      <a href=\"\"\n        ng-if=\"!option.header\"\n        ng-click=\"$ctrl.optionClick(option, $event)\"\n        ng-focus=\"$ctrl.optionFocus(option)\"\n        ng-class=\"{'tw-select-option-link': !option.disabled}\"\n        index=\"{{$index}}\"\n        tabindex=\"-1\"\n        tw-focusable >\n        <div ng-if=\"option.icon && option.secondary\"\n          class=\"circle circle-inverse pull-xs-left circle-sm\">\n          <span class=\"icon {{option.icon}}\"></span>\n        </div>\n        <span ng-if=\"option.icon && !option.secondary\"\n          class=\"icon {{option.icon}} pull-xs-left\" >\n        </span> <span ng-if=\"option.currency\"\n          class=\"currency-flag currency-flag-{{option.currency | lowercase}} pull-xs-left\" >\n        </span> <span class=\"circle circle-inverse pull-xs-left\"\n          ng-class=\"{\n            'circle-sm': option.secondary,\n            'circle-xs': !option.secondary\n          }\"\n          ng-if=\"option.circleText || option.circleImage || option.circleIcon\">\n          <span class=\"tw-select-circle-text\"\n            ng-if=\"option.circleText\">{{option.circleText}}</span>\n          <img alt=\"{{option.label}}\"\n            ng-if=\"option.circleImage\"\n            src=\"data:image/png;base64,\n              iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=\"\n            ng-src=\"{{option.circleImage}}\" />\n          <span ng-if=\"option.circleIcon\" class=\"icon {{option.circleIcon}}\"></span>\n        </span>{{option.label}}<span\n          ng-if=\"option.note\" class=\"tw-select-note small m-l-1\">{{option.note}}</span><span\n          ng-if=\"option.secondary\"\n          class=\"tw-select-secondary small text-ellipsis\">{{option.secondary}}</span>\n      </a>\n    </li>\n\n    <li ng-if=\"$ctrl.hasTranscluded\" class=\"divider\"></li>\n\n    <li ng-transclude ng-if=\"$ctrl.hasTranscluded\" class=\"tw-select-transcluded\"></li>\n  </ul>\n</div>\n<input type=\"hidden\" class=\"tw-select-hidden\"\n  name=\"{{$ctrl.name}}\"\n  value=\"{{$ctrl.ngModel}}\"\n  ng-disabled=\"$ctrl.ngDisabled\" />\n";

/***/ }),
/* 127 */
/***/ (function(module, exports) {

module.exports = "<div class=\"text-center tw-upload-droppable-box\"\n  ng-class=\"{'active': $ctrl.isActive}\">\n  <span class=\"icon icon-upload tw-upload-droppable-icon\"></span>\n  <h4 class=\"m-t-2\" ng-if=\"$ctrl.title\">{{$ctrl.title}}</h4>\n  <div class=\"row\">\n    <div class=\"col-xs-12 col-sm-6 col-sm-offset-3 m-t-1\">\n    <ng-transclude></ng-transclude>\n    <label class=\"link\" for=\"file-upload\">{{$ctrl.cta}}</label>\n    <input tw-file-select id=\"file-upload\"\n      type=\"file\"\n      accept=\"{{$ctrl.accept}}\"\n      class=\"hidden\"\n      on-user-input=\"$ctrl.onManualUpload\"/>\n    </div>\n  </div>\n</div>\n";

/***/ }),
/* 128 */
/***/ (function(module, exports) {

module.exports = "<div class=\"droppable\" ng-class=\"{\n  'droppable-sm': $ctrl.size ==='sm',\n  'droppable-md': $ctrl.size ==='md' || !$ctrl.size,\n  'droppable-lg': $ctrl.size ==='lg',\n  'droppable-dropping': $ctrl.isDroppable,\n  'droppable-processing': !$ctrl.isDone && ($ctrl.isProcessing || $ctrl.isSuccess || $ctrl.isError),\n  'droppable-complete': $ctrl.isDone\n}\">\n  <div class=\"droppable-default-card\" aria-hidden=\"{{$ctrl.isDone}}\">\n    <div class=\"droppable-card-content\">\n      <div class=\"m-b-2\">\n        <img\n          ng-show=\"$ctrl.helpImage\"\n          ng-src=\"{{$ctrl.helpImage}}\"\n          alt=\"{{$ctrl.label}}\"\n          class=\"thumbnail text-xs-center\" />\n        <span ng-show=\"!$ctrl.helpImage\" class=\"icon icon-{{$ctrl.viewIcon}} icon-xxl\"></span>\n      </div>\n      <h4 class=\"m-b-1\" ng-if=\"$ctrl.label || $ctrl.description\">\n        {{$ctrl.label || $ctrl.description}}\n      </h4>\n      <p class=\"m-b-2\">{{$ctrl.placeholder || $ctrl.instructions}}</p>\n      <label class=\"btn btn-primary\" ng-class=\"{'disabled': $ctrl.ngDisabled}\">\n        <span ng-if=\"$ctrl.buttonText\" ng-bind=\"$ctrl.buttonText\"></span>\n        <span ng-if=\"!$ctrl.buttonText\" class=\"icon icon-upload m-r-0\"></span>\n        <input tw-file-input\n          type=\"file\"\n          accept=\"{{$ctrl.accept}}\"\n          class=\"tw-droppable-input hidden\"\n          ng-disabled=\"$ctrl.ngDisabled\"\n          name=\"file-upload\"\n          on-user-input=\"$ctrl.onManualUpload()\"\n          ng-model=\"$ctrl.inputFile\" />\n        <!-- ng-change=\"$ctrl.onManualUpload()\" -->\n      </label>\n    </div>\n  </div>\n  <div class=\"droppable-processing-card droppable-card\"\n    aria-hidden=\"{{$ctrl.isDone}}\">\n    <div class=\"droppable-card-content\">\n      <h4 class=\"m-b-2\">\n        <span ng-if=\"$ctrl.isProcessing && $ctrl.processingText\">{{$ctrl.processingText}}</span>\n        <span ng-if=\"$ctrl.isSuccess && $ctrl.successText\">{{$ctrl.successText}}</span>\n        <span ng-if=\"$ctrl.isError && $ctrl.failureText\">{{$ctrl.failureText}}</span>\n      </h4>\n      <tw-process size=\"sm\" state=\"$ctrl.processingState\"\n        ng-if=\"($ctrl.isProcessing || $ctrl.isSuccess || $ctrl.isError)\"></tw-process>\n    </div>\n  </div>\n  <div class=\"droppable-complete-card droppable-card\"\n    aria-hidden=\"{{!$ctrl.isDone}}\">\n    <div class=\"droppable-card-content\">\n      <div ng-if=\"!$ctrl.hasTranscluded && !$ctrl.isError\">\n        <h4 class=\"m-b-2\" ng-if=\"$ctrl.label\">\n          {{$ctrl.label}}\n        </h4>\n        <img\n          ng-if=\"$ctrl.isImage\"\n          src=\"data:image/png;base64,\n            iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=\"\n          ng-src=\"{{$ctrl.image}}\"\n          alt=\"OK\"\n          class=\"thumbnail m-b-3\" />\n        <span class=\"icon icon-pdf icon-xxl\" ng-if=\"!$ctrl.isImage\"></span>\n        <p class=\"text-ellipsis m-b-2\">{{$ctrl.fileName}}</p>\n      </div>\n      <div ng-if=\"!$ctrl.hasTranscluded && $ctrl.isError\">\n        <h4 class=\"m-b-2\" ng-if=\"$ctrl.isTooLarge\">{{$ctrl.tooLargeMessage}}</h4>\n        <h4 class=\"m-b-2\" ng-if=\"$ctrl.isWrongType\">{{$ctrl.wrongTypeText}}</h4>\n        <h4 class=\"m-b-2\" ng-if=\"!$ctrl.isTooLarge && $ctrl.errorMessage\">{{$ctrl.errorMessage}}</h4>\n        <span class=\"icon icon-alert icon-xxl text-danger m-b-1\"></span>\n      </div>\n      <div ng-if=\"$ctrl.hasTranscluded\" ng-transclude></div>\n      <p ng-if=\"$ctrl.cancelText\" class=\"m-t-2 m-b-0\">\n        <a href=\"\" ng-click=\"$ctrl.clear()\">{{$ctrl.cancelText}}</a>\n      </p>\n    </div>\n  </div>\n  <div class=\"droppable-dropping-card droppable-card\">\n    <div class=\"droppable-card-content\">\n      <h4 class=\"m-b-2\">Drop file to start upload</h4>\n      <div class=\"circle circle-sm\">\n        <span class=\"icon icon-add\"></span>\n      </div>\n      <p class=\"m-t-2 m-b-0\"></p>\n    </div>\n  </div>\n</div>\n";

/***/ }),
/* 129 */
/***/ (function(module, exports) {

module.exports = "<li class=\"list-group-item p-a-0 list-group-item-{{$ctrl.state}}\"\n  ng-class=\"{\n    'active': $ctrl.open,\n    'disabled': $ctrl.disabled\n  }\">\n\n  <div class=\"p-a-panel\" role=\"button\" ng-click=\"$ctrl.toggle($ctrl.index)\">\n    <div class=\"media\">\n      <div class=\"media-left\">\n        <div class=\"circle circle-sm circle-responsive\"\n          ng-class=\"{'circle-inverse': !$ctrl.inactive }\">\n          <div ng-transclude=\"cardIcon\"></div>\n        </div>\n      </div>\n      <div class=\"media-body\" ng-transclude=\"collapsedCard\"></div>\n    </div>\n  </div>\n\n  <div class=\"collapse\"\n    ng-attr-aria-expanded=\"{{ $ctrl.open }}\"\n    ng-class=\"{'in': $ctrl.open }\"\n    ng-if=\"$ctrl.open\" >\n\n    <div class=\"p-l-panel p-r-panel p-b-panel\">\n      <div class=\"media\">\n        <div class=\"media-left\">\n          <div class=\"circle circle-sm circle-inverse circle-responsive invisible\"></div>\n        </div>\n        <div class=\"media-body\">\n          <hr class=\"m-t-0 hidden-xs hidden-sm\" />\n          <a href=\"\" ng-click=\"$ctrl.toggle($ctrl.index)\"\n            class=\"visible-xs-inline-block visible-sm-inline-block text-no-decoration m-t-1 tw-card-back\">\n            <span class=\"icon icon-left-arrow icon-xxl\"></span>\n          </a>\n          <div ng-transclude=\"expandedCard\"></div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"well p-l-panel p-r-panel\" ng-if=\"$ctrl.showForm\">\n      <div class=\"media\">\n        <div class=\"media-left\">\n          <div class=\"circle circle-sm circle-responsive invisible\"></div>\n        </div>\n        <div class=\"media-body\" ng-transclude=\"cardForm\"></div>\n      </div>\n    </div>\n\n  </div>\n</li>\n";

/***/ }),
/* 130 */
/***/ (function(module, exports) {

module.exports = "<ul ng-transclude\n  class=\"list-group panel-list-group list-group-slide-out\"\n  ng-class=\"{'list-group-inactive': $ctrl.inactive}\">\n</ul>\n";

/***/ }),
/* 131 */
/***/ (function(module, exports) {

module.exports = "<div class=\"loader\">\n  <div class=\"loader-spinner\"></div>\n  <div class=\"loader-flag\">\n    <svg\n      xmlns=\"http://www.w3.org/2000/svg\"\n      class=\"loader-flag-outline\"\n      viewBox=\"-2 -2 56 56\">\n      <polygon\n        class=\"loader-flag-stroke\"\n        stroke=\"#00B9FF\"\n        stroke-width=\"2\"\n        stroke-linejoin=\"miter\"\n        stroke-linecap=\"round\"\n        stroke-miterlimit=\"10\"\n        stroke-dasharray=\"300\"\n        stroke-dashoffset=\"300\"\n        fill=\"none\"\n        points=\"24.6,27.3 0,27.3 14.3,13.7 6.1,0 48.2,0 26.3,52 19.5,52 39.2,\n          5.5 16.8,5.5 21.6,13.6 13.4,21.8 27,21.8\" />\n    </svg>\n    <svg\n      xmlns=\"http://www.w3.org/2000/svg\"\n      class=\"loader-flag-fill\"\n      viewBox=\"0 2 52 48\">\n      <polygon\n        fill=\"#00B9FF\"\n        points=\"6.1,0 14.3,13.7 0,27.3 24.6,27.3 27,21.8 13.4,21.8 21.6,\n          13.6 16.8,5.5 39.2,5.5 19.5,52 26.3,52 48.2,0 \"/>\n    </svg>\n  </div>\n</div>\n";

/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = "<span class=\"process\"\n  ng-class=\"{\n    'process-success': $ctrl.processing === 1,\n    'process-danger': $ctrl.processing === -1,\n    'process-stopped': $ctrl.processing === 0,\n    'process-xs': $ctrl.size === 'xs',\n    'process-sm': $ctrl.size === 'sm',\n    'process-md': $ctrl.size === 'md',\n    'process-lg': $ctrl.size === 'lg',\n    'process-xl': $ctrl.size === 'xl'\n  }\">\n  <span class=\"process-icon-container\">\n    <span class=\"process-icon-horizontal\"></span>\n    <span class=\"process-icon-vertical\"></span>\n  </span>\n  <svg version=\"1.1\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    xml:space=\"preserve\">\n    <circle class=\"process-circle\" \n      cx=\"50%\"\n      cy=\"50%\"\n      ng-attr-r=\"{{$ctrl.radius}}\"\n      fill-opacity=\"0.0\" />\n  </svg>\n</span>\n";

/***/ }),
/* 133 */
/***/ (function(module, exports) {

module.exports = "<ul ng-if=\"$ctrl.tabs.length > 0\"\n  class=\"nav nav-tabs m-b-3\">\n  <li\n    ng-repeat=\"tab in $ctrl.tabs track by $index\"\n    ng-class=\"{\n      'active': $ctrl.active === tab.type\n    }\">\n    <a href=\"\" ng-click=\"$ctrl.switchTab(tab.type)\">\n      {{tab.label}}\n    </a>\n  </li>\n</ul>\n";

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _telephoneComponent = __webpack_require__(135);

var _telephoneComponent2 = _interopRequireDefault(_telephoneComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.forms.telephone', []).component('twTelephone', _telephoneComponent2.default).name;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _telephoneController = __webpack_require__(136);

var _telephoneController2 = _interopRequireDefault(_telephoneController);

var _telephone = __webpack_require__(137);

var _telephone2 = _interopRequireDefault(_telephone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TelephoneControl = {
  controller: _telephoneController2.default,
  template: _telephone2.default,
  bindings: {
    ngModel: '<',
    ngRequired: '<',
    ngDisabled: '<',
    ngChange: '&',
    countries: '<',
    searchPlaceholder: '@'
  },
  transclude: true
};

exports.default = TelephoneControl;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TelephoneController = function () {
  function TelephoneController() {
    _classCallCheck(this, TelephoneController);

    this.prefixes = [];
  }

  _createClass(TelephoneController, [{
    key: '$onChanges',
    value: function $onChanges(changes) {
      if (changes.countries && changes.countries.currentValue) {
        this.formatCountriesToPrefixes();
        this.explodeNumberModel(this.ngModel);
      }

      if (changes.ngModel && changes.ngModel.currentValue) {
        if (validNumber(this.ngModel)) {
          this.explodeNumberModel(this.ngModel);
        }
      }
    }
  }, {
    key: 'sendNewNumberToCallback',
    value: function sendNewNumberToCallback(newNumber) {
      this.ngChange({ newNumber: newNumber });
    }
  }, {
    key: 'explodeNumberModel',
    value: function explodeNumberModel(number) {
      this.prefix = findPrefixByNumber(number, this.countries);
      if (this.prefix) {
        this.localNumber = number.substring(this.prefix.callingCode.length + 1);
      } else {
        this.setDefaultPrefix();
      }
    }
  }, {
    key: 'updatePrefix',
    value: function updatePrefix(prefix) {
      this.ngModel = buildCompleteNumber(prefix.callingCode, this.localNumber);
      this.sendNewNumberToCallback(this.ngModel);
    }
  }, {
    key: 'updateLocalNumber',
    value: function updateLocalNumber(localNumber) {
      this.ngModel = buildCompleteNumber(this.prefix.callingCode, localNumber);
      this.sendNewNumberToCallback(this.ngModel);
    }
  }, {
    key: 'setDefaultPrefix',
    value: function setDefaultPrefix() {
      this.prefix = findPrefixByNumber('+44', this.countries);
      this.sendNewNumberToCallback(this.ngModel);
    }
  }, {
    key: 'formatCountriesToPrefixes',
    value: function formatCountriesToPrefixes() {
      var _this = this;

      this.prefixes = [];
      this.countries.forEach(function (country) {
        _this.prefixes.push({
          value: country,
          label: '+' + country.callingCode,
          note: country.name
        });
      });
    }
  }]);

  return TelephoneController;
}();

function validNumber(number) {
  return typeof number === 'string' && number.length > 4 && number.substring(0, 1) === '+';
}

function buildCompleteNumber(prefix, localNumber) {
  if (localNumber) {
    return '+' + prefix + localNumber;
  }
  return '+' + prefix;
}

function findPrefixByNumber(number, countries) {
  if (countries && countries.length && number && number.length > 2) {
    return countries.filter(function (country) {
      return number.substring(1).indexOf(country.callingCode) === 0;
    })[0];
  }
  return undefined;
}

TelephoneController.$inject = [];

exports.default = TelephoneController;

/***/ }),
/* 137 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <tw-select\n    name=\"phoneNumberPrefix\"\n    class=\"col-xs-5\"\n    ng-model=\"$ctrl.prefix\"\n    ng-change=\"$ctrl.updatePrefix($ctrl.prefix)\"\n    options=\"$ctrl.prefixes\"\n    filter=\"{{ $ctrl.searchPlaceholder }}\"\n    dropdown-width=\"md\"\n    ng-required=\"$ctrl.ngRequired\"\n    ng-disabled=\"$ctrl.ngDisabled\"\n    hide-note=\"true\"\n  ></tw-select>\n  <div class=\"col-xs-7\">\n    <input type=\"tel\" tw-validation\n      name=\"phoneNumber\"\n      class=\"form-control\"\n      ng-model=\"$ctrl.localNumber\"\n      ng-change=\"$ctrl.updateLocalNumber($ctrl.localNumber)\"\n      ng-pattern=\"/^[0-9\\\\s.-]*$/\"\n      ng-minlength=\"4\"\n      ng-required=\"$ctrl.ngRequired\"\n      ng-disabled=\"$ctrl.ngDisabled\" />\n      <div ng-transclude class=\"error-messages\"></div>\n  </div>\n</div>\n";

/***/ })
/******/ ]);