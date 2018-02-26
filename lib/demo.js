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
/******/ 	return __webpack_require__(__webpack_require__.s = 145);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _demo = __webpack_require__(173);

var _demo2 = _interopRequireDefault(_demo);

var _textFormatDemo = __webpack_require__(149);

var _textFormatDemo2 = _interopRequireDefault(_textFormatDemo);

var _dateFormatDemo = __webpack_require__(147);

var _dateFormatDemo2 = _interopRequireDefault(_dateFormatDemo);

var _numberFormatDemo = __webpack_require__(148);

var _numberFormatDemo2 = _interopRequireDefault(_numberFormatDemo);

var _currencyFormatDemo = __webpack_require__(146);

var _currencyFormatDemo2 = _interopRequireDefault(_currencyFormatDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.formatting', [_textFormatDemo2.default, _dateFormatDemo2.default, _numberFormatDemo2.default, _currencyFormatDemo2.default]).component('formattingDocs', {
  bindings: {
    model: '=',
    locales: '<'
  },
  template: _demo2.default
}).name;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _demo = __webpack_require__(182);

var _demo2 = _interopRequireDefault(_demo);

var _checkboxDemo = __webpack_require__(151);

var _checkboxDemo2 = _interopRequireDefault(_checkboxDemo);

var _radioDemo = __webpack_require__(160);

var _radioDemo2 = _interopRequireDefault(_radioDemo);

var _selectDemo = __webpack_require__(162);

var _selectDemo2 = _interopRequireDefault(_selectDemo);

var _uploadDemo = __webpack_require__(164);

var _uploadDemo2 = _interopRequireDefault(_uploadDemo);

var _dateDemo = __webpack_require__(154);

var _dateDemo2 = _interopRequireDefault(_dateDemo);

var _dateLookupDemo = __webpack_require__(153);

var _dateLookupDemo2 = _interopRequireDefault(_dateLookupDemo);

var _telephoneDemo = __webpack_require__(163);

var _telephoneDemo2 = _interopRequireDefault(_telephoneDemo);

var _currencyInputDemo = __webpack_require__(152);

var _currencyInputDemo2 = _interopRequireDefault(_currencyInputDemo);

var _amountCurrencySelectDemo = __webpack_require__(150);

var _amountCurrencySelectDemo2 = _interopRequireDefault(_amountCurrencySelectDemo);

var _formControlDemo = __webpack_require__(159);

var _formControlDemo2 = _interopRequireDefault(_formControlDemo);

var _fieldDemo = __webpack_require__(156);

var _fieldDemo2 = _interopRequireDefault(_fieldDemo);

var _fieldsetDemo = __webpack_require__(157);

var _fieldsetDemo2 = _interopRequireDefault(_fieldsetDemo);

var _requirementsFormDemo = __webpack_require__(161);

var _requirementsFormDemo2 = _interopRequireDefault(_requirementsFormDemo);

var _definitionListDemo = __webpack_require__(155);

var _definitionListDemo2 = _interopRequireDefault(_definitionListDemo);

var _focusableDemo = __webpack_require__(158);

var _focusableDemo2 = _interopRequireDefault(_focusableDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.forms', [_checkboxDemo2.default, _radioDemo2.default, _selectDemo2.default, _dateDemo2.default, _dateLookupDemo2.default, _uploadDemo2.default, _telephoneDemo2.default, _currencyInputDemo2.default, _amountCurrencySelectDemo2.default, _formControlDemo2.default, _fieldDemo2.default, _fieldsetDemo2.default, _requirementsFormDemo2.default, _definitionListDemo2.default, _focusableDemo2.default]).component('formDocs', {
  bindings: {
    model: '=',
    locales: '<'
  },
  controller: function controller() {
    this.sizes = [{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }];
  },

  template: _demo2.default
}).name;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _demo = __webpack_require__(192);

var _demo2 = _interopRequireDefault(_demo);

var _popOverDemo = __webpack_require__(165);

var _popOverDemo2 = _interopRequireDefault(_popOverDemo);

var _toolTipDemo = __webpack_require__(166);

var _toolTipDemo2 = _interopRequireDefault(_toolTipDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.help', [_popOverDemo2.default, _toolTipDemo2.default]).component('helpDocs', { template: _demo2.default }).name;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _demo = __webpack_require__(197);

var _demo2 = _interopRequireDefault(_demo);

var _affix = __webpack_require__(167);

var _affix2 = _interopRequireDefault(_affix);

var _cards = __webpack_require__(168);

var _cards2 = _interopRequireDefault(_cards);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.layout', [_affix2.default, _cards2.default]).component('layoutDocs', { template: _demo2.default }).name;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _demo = __webpack_require__(198);

var _demo2 = _interopRequireDefault(_demo);

var _processDemo = __webpack_require__(170);

var _processDemo2 = _interopRequireDefault(_processDemo);

var _loaderDemo = __webpack_require__(169);

var _loaderDemo2 = _interopRequireDefault(_loaderDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.loading', [_processDemo2.default, _loaderDemo2.default]).component('loadingDocs', { template: _demo2.default }).name;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _demo = __webpack_require__(201);

var _demo2 = _interopRequireDefault(_demo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.validation', []).component('validationDocs', {
  bindings: {
    model: '='
  },
  controller: function controller() {
    // Used by twValidation docs
    this.basicSelect = [{ value: 0, label: 'Zero' }, { value: 1, label: 'One' }, { value: 2, label: 'Two' }, { value: 3, label: 'Three' }];
    this.log = function (message) {
      console.log(message); // eslint-disable-line
    };
  },

  template: _demo2.default
}).name;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _demo = __webpack_require__(140);

var _demo2 = _interopRequireDefault(_demo);

var _demo3 = __webpack_require__(139);

var _demo4 = _interopRequireDefault(_demo3);

var _demo5 = __webpack_require__(144);

var _demo6 = _interopRequireDefault(_demo5);

var _demo7 = __webpack_require__(143);

var _demo8 = _interopRequireDefault(_demo7);

var _demo9 = __webpack_require__(142);

var _demo10 = _interopRequireDefault(_demo9);

var _demo11 = __webpack_require__(141);

var _demo12 = _interopRequireDefault(_demo11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _module = angular.module('tw.styleguide.demo', [_demo2.default, _demo4.default, _demo6.default, _demo8.default, _demo10.default, _demo12.default]);

var PageController = function () {
  function PageController() {
    _classCallCheck(this, PageController);

    this.model = {
      components: {}
    };

    this.locales = [{ value: 'en-GB', label: 'English UK' }, { value: 'en-US', label: 'English US' }, { value: 'fr-FR', label: 'French' }, { value: 'es-ES', label: 'Spanish' }, { value: 'es-US', label: 'Spanish US' }, { value: 'pt-BR', label: 'Brazillian Portuguese' }, { value: 'ja-JP', label: 'Japanese' }, { value: 'ar-EG', label: 'Eastern Arabic' }, { value: 'en-IN', label: 'English Indian' }, { value: 'xx-XX', label: 'Unknown locale' }];
  }

  _createClass(PageController, [{
    key: 'log',
    value: function log(message) {
      // eslint-disable-line
      console.log(message); // eslint-disable-line
    }
  }]);

  return PageController;
}();

_module.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}]).controller('PageController', PageController).component('docsNavigation', {
  template: '\n    <h5>Help</h5>\n    <ul class="list-unstyled">\n      <li><a href="index.html#pop-over">Pop over</a></li>\n      <li><a href="index.html#tool-tip">Tool tip</a></li>\n    </ul>\n\n    <h5>Forms</h5>\n    <ul class="list-unstyled">\n      <li><a href="index.html#amount-currency-select">Amount currency select</a></li>\n      <li><a href="index.html#checkbox">Checkbox</a></li>\n      <li><a href="index.html#currency-input">Currency input</a></li>\n      <li><a href="index.html#date">Date</a></li>\n      <li><a href="index.html#date-lookup">Date lookup</a></li>\n      <li><a href="index.html#focusable">Focusable</a></li>\n      <li><a href="index.html#form-control">Form control</a></li>\n      <li><a href="index.html#radio">Radio</a></li>\n      <li><a href="index.html#select">Select</a></li>\n      <li><a href="index.html#telephone">Telephone</a></li>\n      <li><a href="index.html#upload">Upload</a></li>\n      <li><a href="index.html#validation">Validation</a></li>\n    </ul>\n\n    <h5>Requirements</h5>\n    <ul class="list-unstyled">\n      <li><a href="requirements.html#field">Field</a></li>\n      <li><a href="requirements.html#fieldset">Fieldset</a></li>\n      <li><a href="index.html#requirements-form">Form</a></li>\n      <li><a href="requirements.html#definition-list">Definition list</a></li>\n    </ul>\n\n    <h5>Formatting</h5>\n    <ul class="list-unstyled">\n      <li><a href="index.html#currency-format">Currency format</a></li>\n      <li><a href="index.html#date-format">Date format</a></li>\n      <li><a href="index.html#number-format">Number format</a></li>\n      <li><a href="index.html#text-format">Text format</a></li>\n    </ul>\n\n    <h5>Layout</h5>\n    <ul class="list-unstyled">\n      <li><a href="index.html#cards">Cards</a></li>\n    </ul>\n\n    <h5>Loading</h5>\n    <ul class="list-unstyled">\n      <li><a href="index.html#process">Process</a></li>\n      <li><a href="index.html#loader">Loader</a></li>\n    </ul>'
}).directive('docsErrorMessages', function () {
  return {
    replace: true,
    template: '\n    <div class=\'alert alert-danger\'>\n      <div class=\'error-required\'>Required</div>\n      <div class=\'error-minlength\'>Too short</div>\n      <div class=\'error-maxlength\'>Too long</div>\n      <div class=\'error-pattern\'>Invalid characters</div>\n      <div class=\'error-async\'>Invalid async</div>\n    </div>'
  };
}).directive('docsStatusMessages', function () {
  return {
    replace: true,
    template: '\n    <div class=\'status-messages\'>\n      <div class=\'touched\'>Touched</div>\n      <div class=\'untouched\'>Untouched</div>\n      <div class=\'pristine\'>Pristine</div>\n      <div class=\'dirty\'>Dirty</div>\n    </div>'
  };
});

exports.default = _module.name;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _currencyFormatDemo = __webpack_require__(171);

var _currencyFormatDemo2 = _interopRequireDefault(_currencyFormatDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.formatting.currency-format', []).component('twCurrencyFormatDocs', {
  bindings: {
    locales: '<'
  },
  controller: function controller() {
    this.number = 123456.78;
    this.locale = 'en-GB';
    this.currency = 'GBP';
    this.currencies = [{
      value: 'GBP',
      label: 'Great British Pound',
      note: '2 decimals'
    }, {
      value: 'JPY',
      label: 'Japanese Yen',
      note: '0 decimals'
    }, {
      value: 'JOD',
      label: 'Jordanian Dinar',
      note: '3 decimals'
    }];
  },

  template: _currencyFormatDemo2.default
}).name;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _dateFormatDemo = __webpack_require__(172);

var _dateFormatDemo2 = _interopRequireDefault(_dateFormatDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.formatting.date-format', []).component('twDateFormatDocs', {
  bindings: {
    locales: '<'
  },
  controller: function controller() {
    var _this = this;

    this.formats = [{ value: 'short', label: 'short' }, { value: 'medium', label: 'medium' }, { value: 'long', label: 'long' }];
    var now = new Date();
    this.dates = {
      now: now,

      lastHour: new Date(now.getTime() - 60 * 60 * 1000),
      lastDay: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      lastWeek: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      lastMonth: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
      lastYear: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000),

      nextHour: new Date(now.getTime() + 60 * 60 * 1000),
      nextDay: new Date(now.getTime() + 24 * 60 * 60 * 1000),
      nextWeek: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      nextMonth: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
      nextYear: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000)
    };
    this.timeChange = function () {
      if (!_this.time) {
        return;
      }
      _this.hours = parseInt(_this.time.substring(0, 2), 10);
      _this.minutes = parseInt(_this.time.substring(2, 4), 10);

      if (_this.model) {
        _this.model.setHours(_this.hours);
        _this.model.setMinutes(_this.minutes);
      }
    };
    this.dateChange = function () {
      _this.model.setHours(_this.hours);
      _this.model.setMinutes(_this.minutes);
    };
    this.hours = 12;
    this.minutes = 0;
  },

  template: _dateFormatDemo2.default
}).name;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _numberFormatDemo = __webpack_require__(174);

var _numberFormatDemo2 = _interopRequireDefault(_numberFormatDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.formatting.number-format', []).component('twNumberFormatDocs', {
  bindings: {
    locales: '<'
  },
  controller: function controller() {
    this.number = 123456.78;
    this.locale = 'en-GB';
    this.precision = null;
  },

  template: _numberFormatDemo2.default
}).name;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _textFormatDemo = __webpack_require__(175);

var _textFormatDemo2 = _interopRequireDefault(_textFormatDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.formatting.text-format', []).component('twTextFormatDocs', {
  controller: function controller() {
    var $ctrl = this;
    $ctrl.patterns = [{
      value: {
        format: '**** **** **** ****',
        minlength: 16,
        maxlength: 20,
        pattern: '^[0-9]*$',
        placeholder: 'Number on the front of your card',
        helpText: 'Credit/debit cards have either 16 or 20 digits'
      },
      label: 'Credit card number',
      note: '**** **** **** ****'
    }, {
      value: {
        format: '** / **',
        minlength: 4,
        maxlength: 4,
        pattern: '^[0-9]*$',
        placeholder: 'MM / YY',
        helpText: 'Month, then year'
      },
      label: 'Card expiry',
      note: '** / **'
    }, {
      value: {
        format: '** - ** - **',
        minlength: 6,
        maxlength: 7,
        pattern: '^[0-9]*$',
        placeholder: '** - ** - **',
        helpText: 'UK sort codes have 6 or 7 digits'
      },
      label: 'UK sort code',
      note: '** - ** - **'
    }, {
      value: {
        format: '(+**) **** *** ***',
        minlength: 10,
        maxlength: 12,
        placeholder: '(+**) **** *** ***'
      },
      label: 'UK phone number',
      note: '(+**) **** *** ***'
    }, {
      value: {
        format: '***.***.***-**',
        minlength: 11,
        maxlength: 11,
        placeholder: '***.***.***-**'
      },
      label: 'Brazilian CPF ID',
      note: '***.***.***-**'
    }, {
      value: {
        format: '**.***.*** - *',
        minlength: 9,
        maxlength: 9,
        placeholder: '**.***.*** - *'
      },
      label: 'Chilean RUT ID',
      note: '**.***.*** - *'
    }];
  },

  bindings: {
    model: '='
  },
  template: _textFormatDemo2.default
}).name;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _amountCurrencySelectDemo = __webpack_require__(176);

var _amountCurrencySelectDemo2 = _interopRequireDefault(_amountCurrencySelectDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.forms.amount-currency-select', []).component('twAmountCurrencySelectDocs', {
  bindings: {
    model: '=',
    currency: '<',
    sizes: '<'
  },
  controller: function controller() {
    this.currencySelect = [{ header: 'Popular currencies' }, {
      value: 'eur', label: 'EUR', note: 'Euro', currency: 'EUR', searchable: 'Spain, Germany, France, Austria, Estonia'
    }, {
      value: 'gbp', label: 'GBP', note: 'Great British Pound', currency: 'GBP', searchable: 'England, Scotland, Wales'
    }, {
      value: 'usd', label: 'USD', note: 'United States Dollar', currency: 'USD', searchable: 'Hong Kong, Saudi Arabia'
    }, { header: 'All currencies' }, {
      value: 'aud', label: 'AUD', note: 'Australian Dollar', currency: 'AUD'
    }];

    this.currency = 'eur';

    this.amountCurrencySelect = {
      size: 'md',
      required: false,
      disabled: false,
      customActionLabel: 'Can\'t find your currency?',
      currencyFilterPlaceholder: 'Search...',
      lockTooltipTitle: 'some title',
      lockTooltipContent: 'some content'
    };

    this.log = function (message) {
      console.log(message); // eslint-disable-line
    };
  },

  template: _amountCurrencySelectDemo2.default
}).name;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _checkboxDemo = __webpack_require__(177);

var _checkboxDemo2 = _interopRequireDefault(_checkboxDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CheckboxController = function () {
  function CheckboxController() {
    _classCallCheck(this, CheckboxController);

    this.checkbox = { required: true };
  }

  _createClass(CheckboxController, [{
    key: 'log',
    value: function log(message) {
      // eslint-disable-line
      console.log(message); // eslint-disable-line
    }
  }]);

  return CheckboxController;
}();

exports.default = _angular2.default.module('tw.styleguide.demo.forms.checkbox', []).component('twCheckboxDocs', {
  bindings: {
    model: '='
  },
  controller: CheckboxController,
  template: _checkboxDemo2.default
}).name;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _currencyInputDemo = __webpack_require__(178);

var _currencyInputDemo2 = _interopRequireDefault(_currencyInputDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.forms.currency-input', []).component('twCurrencyInputDocs', {
  bindings: {
    model: '=',
    sizes: '<'
  },
  controller: function controller() {
    this.log = function (message) {
      console.log(message); // eslint-disable-line
    };
  },

  template: _currencyInputDemo2.default
}).name;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _dateLookupDemo = __webpack_require__(179);

var _dateLookupDemo2 = _interopRequireDefault(_dateLookupDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.forms.date-lookup', []).component('twDateLookupDocs', {
  bindings: {
    model: '=',
    locales: '<',
    sizes: '<'
  },
  controller: function controller() {
    this.log = function (message) {
      console.log(message); // eslint-disable-line
    };

    this.sizes = [{ value: 'sm', label: 'Small' }, { value: '', label: 'Medium' }, { value: 'lg', label: 'Large' }];
  },

  template: _dateLookupDemo2.default
}).name;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _dateDemo = __webpack_require__(180);

var _dateDemo2 = _interopRequireDefault(_dateDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.forms.date', []).component('twDateDocs', {
  bindings: {
    model: '=',
    locales: '<',
    sizes: '<'
  },
  controller: function controller() {
    this.date = { required: true };
    this.log = function (message) {
      console.log(message); // eslint-disable-line
    };
  },

  template: _dateDemo2.default
}).name;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _definitionListDemo = __webpack_require__(181);

var _definitionListDemo2 = _interopRequireDefault(_definitionListDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.forms.definition-list', []).component('twDefinitionListDocs', {
  bindings: {
    model: '=',
    fields: '='
  },
  template: _definitionListDemo2.default
}).name;

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _fieldDemo = __webpack_require__(183);

var _fieldDemo2 = _interopRequireDefault(_fieldDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.forms.field', []).component('twFieldDocs', {
  controller: fieldDocsController,
  template: _fieldDemo2.default
}).component('fieldExample', {
  bindings: {
    name: '@',
    model: '=',
    field: '<',
    errorMessage: '<',
    warningMessage: '<',
    onFocusHandler: '&?onFocus',
    onBlurHandler: '&?onBlur',
    onChangeHandler: '&?onChange'
  },
  controller: function controller() {
    var _this = this;

    this.onFocus = function () {
      if (_this.onFocusHandler) {
        _this.onFocusHandler();
      }
    };
    this.onBlur = function () {
      if (_this.onBlurHandler) {
        _this.onBlurHandler();
      }
    };
    this.onChange = function (newValue) {
      if (_this.onChangeHandler) {
        _this.onChangeHandler({ value: newValue });
      }
    };
  },

  template: '\n    <div class="row">\n      <div class="col-md-6">\n        <tw-field\n          name="$ctrl.name"\n          model="$ctrl.model"\n          field="$ctrl.field"\n          error-message="$ctrl.errorMessage"\n          warning-message="$ctrl.warningMessage"\n          on-focus="$ctrl.onFocus()"\n          on-blur="$ctrl.onBlur()"\n          on-change="$ctrl.onChange(value)">\n        </tw-field>\n      </div>\n      <div class="col-md-6" ng-class="{\'p-t-3\': $ctrl.field.format !== \'base64url\'}">\n<pre>&lt;tw-field\n  name="{{ $ctrl.name }}"\n  model="{{ $ctrl.model }}"<span ng-if="$ctrl.errorMessage">\n  error-message="\'{{ $ctrl.errorMessage }}\'"</span><span ng-if="$ctrl.warningMessage">\n  warning-message="\'{{ $ctrl.warningMessage }}\'"</span><span ng-if="$ctrl.onFocusHandler">\n  on-focus="console.log(\'focus\')"</span><span ng-if="$ctrl.onBlurHandler">\n  on-blur="console.log(\'blur\')"</span><span ng-if="$ctrl.onChangeHandler">\n  on-change="console.log(value)"</span>\n  field="\n<div class="m-l-2">{{ $ctrl.field | json }}"&gt;</div>&lt;/tw-field&gt;</pre>\n      </div>\n    </div>'
}).name;


function fieldDocsController() {
  this.log = function (message) {
    console.log(message); // eslint-disable-line
  };

  // Basic types
  this.stringBasic = {
    type: 'string',
    title: 'String label',
    placeholder: 'Please enter string'
  };
  this.numberBasic = {
    type: 'number',
    title: 'Number control',
    placeholder: 'Please enter number'
  };
  this.booleanBasic = {
    type: 'boolean',
    title: 'Boolean control',
    placeholder: 'Please choose'
  };

  this.basicTypesModel = {
    stringProperty: 'Example',
    numberProperty: 123,
    booleanProperty: false
  };

  // Formats
  this.dateBasic = {
    type: 'string',
    format: 'date',
    title: 'Date control'
  };
  this.phoneBasic = {
    type: 'string',
    format: 'phone',
    title: 'Phone control'
  };
  this.uploadBasic = {
    type: 'string',
    format: 'base64url',
    title: 'Upload control',
    placeholder: 'Choose file...'
  };

  this.basicFormatsModel = {
    dateProperty: '2017-12-01',
    passwordProperty: 'qwerty'
  };

  this.selectBasic = {
    type: 'number',
    title: 'Select control',
    placeholder: 'Please choose',
    values: [{
      value: 1, label: 'One'
    }, {
      value: 2, label: 'Two'
    }, {
      value: 3, label: 'Three'
    }, {
      value: 4, label: 'Four'
    }]
  };
  this.radioBasic = {
    type: 'string',
    title: 'Radio control',
    values: [{
      value: '1', label: 'One'
    }, {
      value: '2', label: 'Two'
    }]
  };
  this.selectionsModel = {
    selectProperty: 1,
    radioProperty: '2'
  };

  // Control type overrides
  this.passwordOverride = {
    type: 'string',
    control: 'password',
    title: 'Password override',
    placeholder: 'Choose password...'
  };
  this.telephoneOverride = {
    type: 'string',
    control: 'tel',
    title: 'Telephone override'
  };
  this.textareaOverride = {
    type: 'string',
    control: 'textarea',
    title: 'Textarea override'
  };
  this.selectOverride = {
    type: 'string',
    title: 'Select override',
    control: 'select',
    values: [{
      value: '1', label: 'One'
    }, {
      value: '2', label: 'Two'
    }]
  };

  this.override = {
    textarea: 'Lorem Ipsum',
    telephone: '+441234567890',
    password: 'qwerty',
    select: '1'
  };

  // Values Async
  this.valuesAsync = {
    type: 'number',
    title: 'Values async',
    control: 'select',
    placeholder: 'Please choose',
    valuesAsync: {
      method: 'GET',
      url: 'json/values-async.json'
    }
  };
  this.valuesAsyncModel = null;

  // Validation
  this.stringValidation = {
    type: 'string',
    title: 'String validation',
    placeholder: 'Please enter text',
    required: true,
    pattern: '^[A-Z]*$',
    minLength: 4,
    maxLength: 6,
    validationMessages: {
      required: 'String is required',
      minlength: 'Must contain at least 4 characters',
      maxlength: 'Must contain 6 characters or less',
      pattern: 'Must only contain capital letters A to Z'
    }
  };
  this.numberValidation = {
    type: 'number',
    title: 'Number control',
    placeholder: 'Please enter number',
    required: true,
    minimum: 10,
    maximum: 99,
    validationMessages: {
      required: 'Number is required',
      minimum: 'Must be 10 or greater',
      maximum: 'Must be 99 or less'
    }
  };
  this.dateValidation = {
    type: 'string',
    format: 'date',
    title: 'Date control',
    required: true,
    minimum: '2000-01-01',
    maximum: '2020-01-01',
    validationMessages: {
      required: 'Date is required',
      minimum: 'Must be after Jan 1st, 2000',
      maximum: 'Must be before Jan 1st, 2020'
    }
  };
  this.validationModel = {
    stringProperty: 'Tex',
    numberProperty: 123,
    dateProperty: null
  };

  // Custom messages
  this.customErrors = {
    type: 'string',
    title: 'Custom error',
    placeholder: 'Please enter text'
  };
  this.customErrorsMessage = 'Custom error message';

  this.customWarning = {
    type: 'string',
    title: 'Warning message',
    key: 'stringProperty',
    placeholder: 'Please enter text'
  };
  this.customWarningMessage = 'This is a warning!';

  // Help information
  this.helpText = {
    type: 'string',
    title: 'Help text',
    placeholder: 'Please enter text',
    helpText: 'Some helpful information'
  };
  this.helpList = {
    type: 'string',
    title: 'Help list',
    placeholder: 'Please enter number',
    helpList: ['Make sure of this', 'And this', 'And avoid this']
  };
  this.helpImage = {
    type: 'string',
    title: 'Help image',
    placeholder: 'Please enter number',
    helpImage: 'images/captcha.png'
  };

  // Presentation options
  this.displayFormat = {
    type: 'string',
    title: 'String display format',
    placeholder: 'Please enter...',
    displayFormat: '** - ** - **'
  };

  this.presentationModel = {
    displayFormat: '123456',
    disabledControl: "I'm disabled",
    hiddenControl: "I'm hidden"
  };

  this.uploadComponent = {
    type: 'string',
    format: 'base64url',
    title: 'Upload options',
    placeholder: 'Please choose a file',
    uploadOptions: {
      buttonText: 'Choose file...',
      cancelText: 'Choose a different file?',
      processingText: 'Processing...',
      successText: 'Upload complete!',
      failureText: 'Upload failed'
    }
  };
  this.disabledControl = {
    type: 'string',
    title: 'Disabled control',
    placeholder: 'Please enter...',
    disabled: true
  };
  this.hiddenControl = {
    type: 'string',
    hidden: true
  };
}

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _fieldsetDemo = __webpack_require__(184);

var _fieldsetDemo2 = _interopRequireDefault(_fieldsetDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.forms.fieldset', []).component('twFieldsetDocs', {
  controller: fieldsetDocsController,
  template: _fieldsetDemo2.default
}).component('fieldsetExample', {
  bindings: {
    model: '=',
    requirements: '<',
    onRefreshRequirements: '&?',
    onModelChangeHandler: '&?onModelChange',
    onFieldFocusHandler: '&?onFieldFocus',
    onFieldBlurHandler: '&?onFieldBlur',
    onFieldChangeHandler: '&?onFieldChange'
  },
  controller: function controller() {
    var _this = this;

    this.isValid = false;
    this.onFieldFocus = function (key, field) {
      if (_this.onFieldFocusHandler) {
        _this.onFieldFocusHandler({ key: key, field: field });
      }
    };
    this.onFieldBlur = function (key, field) {
      if (_this.onFieldBlurHandler) {
        _this.onFieldBlurHandler({ key: key, field: field });
      }
    };
    this.onFieldChange = function (value, key, field) {
      if (_this.onFieldChangeHandler) {
        _this.onFieldChangeHandler({ value: value, key: key, field: field });
      }
    };
    this.onModelChange = function (model) {
      if (_this.onModelChangeHandler) {
        _this.onModelChangeHandler({ model: model });
      }
    };
  },

  template: '\n    <div class="row">\n      <div class="col-md-6">\n        <tw-fieldset\n          title="{{ $ctrl.requirements.title }}"\n          description="{{ $ctrl.requirements.description }}"\n          model="$ctrl.model"\n          fields="$ctrl.requirements.fields"\n          is-valid="$ctrl.isValid"\n          on-model-change="$ctrl.onModelChange(model)"\n          on-field-focus="$ctrl.onFieldFocus(key, field)"\n          on-field-blur="$ctrl.onFieldBlur(key, field)"\n          on-field-change="$ctrl.onFieldChange(value, key, field)"\n          on-refresh-requirements="$ctrl.onRefreshRequirements()"\n          upload-options="{buttonText: \'Choose file\'}">\n        </tw-fieldset>\n      </div>\n      <div class="col-md-6 p-t-3">\n<pre>&lt;tw-fieldset<span ng-if="$ctrl.requirements.title">\n  title="{{ $ctrl.requirements.title }}"</span><span ng-if="$ctrl.requirements.description">\n  description="{{ $ctrl.requirements.description }}"</span>\n  is-valid="{{ $ctrl.isValid }}"<span ng-if="$ctrl.onModelChangeHandler">\n  on-model-change="(model) => { console.log(model); }"</span><span ng-if="$ctrl.onFieldFocusHandler">\n  on-field-focus="(key, field) => { console.log(\'focus: \' + key); }"</span><span ng-if="$ctrl.onFieldBlurHandler">\n  on-field-blur="(key, field) => { console.log(\'blur: \' + key); }"</span><span ng-if="$ctrl.onFieldChangeHandler">\n  on-field-change="(value, key, field) => { console.log(\'changed: \'+ key + \' to \' + value); }"</span>\n  model="{{ $ctrl.model | json }}"\n  fields="<div class="m-l-2">{{ $ctrl.requirements.fields | json }}"&gt;</div>&lt;/tw-fieldset&gt;</pre>\n      </div>\n    </div>'
}).name;


function fieldsetDocsController() {
  var _this2 = this;

  this.onFieldChange = function (value, key) {
    _this2.log('change: ' + key + ' to ' + value);
  };
  this.refresh = function () {
    _this2.log('onRefreshRequirements');
  };
  this.log = function (message) {
    console.log(message); // eslint-disable-line
  };

  this.fieldsetBasic = {
    fields: {
      stringProperty: {
        type: 'string',
        title: 'String label',
        placeholder: 'Please enter text'
      },
      numberProperty: {
        type: 'number',
        title: 'Number label',
        placeholder: 'Please enter number',
        required: true,
        min: 5
      }
    }
  };
  this.fieldsetBasicModel = {
    stringProperty: 'Example',
    numberProperty: 123
  };

  this.fieldsetOptions = {
    title: 'Fieldset legend',
    description: 'Optional fieldset description, with more information about the content.',
    fields: {
      keyName: {
        type: 'text',
        title: 'Control label',
        placeholder: 'Please enter text'
      }
    }
  };
  this.fieldsetOptionsModel = {
    keyName: 'Example'
  };

  this.fieldsetLayout = {
    fields: {
      stringProperty: {
        type: 'string',
        title: 'String label',
        placeholder: 'Please enter text',
        width: 'md'
      },
      booleanProperty: {
        type: 'boolean',
        title: 'Boolean label',
        placeholder: 'Check it',
        width: 'md'
      },
      numberProperty: {
        type: 'number',
        title: 'Number label',
        placeholder: 'Please enter number',
        width: 'sm',
        required: true
      }
    }
  };
  this.fieldsetLayoutModel = {};

  this.fieldsetFull = {
    fields: {
      text: {
        title: 'Text',
        type: 'text',
        displayFormat: '***** - *****||*-*-*',
        width: 'md',
        refreshRequirementsOnChange: true
      },
      number: {
        title: 'Number',
        type: 'number',
        width: 'md',
        refreshRequirementsOnChange: true
      },
      select: {
        title: 'Select',
        type: 'string',
        control: 'select',
        width: 'md',
        refreshRequirementsOnChange: true,
        values: [{
          key: '1',
          name: 'One'
        }, {
          key: '2',
          name: 'Two'
        }]
      },
      password: {
        title: 'Password',
        type: 'string',
        control: 'password',
        width: 'md',
        refreshRequirementsOnChange: true
      },
      date: {
        title: 'Date',
        type: 'string',
        format: 'date',
        refreshRequirementsOnChange: true
      },
      telephone: {
        title: 'Telephone',
        type: 'string',
        control: 'tel',
        placeholder: 'Enter...'
      },
      radio: {
        title: 'Radio',
        type: 'string',
        control: 'radio',
        width: 'md',
        refreshRequirementsOnChange: true,
        values: [{
          key: '1',
          name: 'One'
        }, {
          key: '2',
          name: 'Two'
        }]
      },
      checkbox: {
        title: 'Checkbox',
        type: 'boolean',
        placeholder: 'Label',
        width: 'md',
        refreshRequirementsOnChange: true
      },
      textarea: {
        title: 'Textarea',
        type: 'string',
        control: 'textarea',
        refreshRequirementsOnChange: true
      },
      file: {
        title: 'File',
        type: 'string',
        format: 'base64url',
        refreshRequirementsOnChange: true
      }
    }
  };

  this.fieldsetFullModel = {
    text: 'helloworld',
    number: 123456,
    select: '1',
    date: '2000-01-01T00:00:00.000Z',
    checkbox: true,
    radio: '2',
    password: 'qwerty',
    telephone: '+441234567890'
  };
}

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _focusableDemo = __webpack_require__(185);

var _focusableDemo2 = _interopRequireDefault(_focusableDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.forms.focusable', []).component('twFocusableDocs', { template: _focusableDemo2.default }).name;

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _formControlDemo = __webpack_require__(186);

var _formControlDemo2 = _interopRequireDefault(_formControlDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.forms.form-control', []).component('twFormControlDocs', {
  bindings: {
    model: '=',
    locales: '<',
    sizes: '<'
  },
  controller: function controller() {
    this.dynamic = {
      required: true,
      options: [{ value: '1', label: 'One' }, { value: '2', label: 'Two' }, { value: '3', label: 'Three' }],
      types: [{ value: 'text', label: 'Text' }, { value: 'password', label: 'Password' }, { value: 'number', label: 'Number' }, { value: 'select', label: 'Select' }, { value: 'radio', label: 'Radio' }, { value: 'checkbox', label: 'Checkbox' }, { value: 'upload', label: 'Upload' }, { value: 'date', label: 'Date' }, { value: 'tel', label: 'Telephone' }]
    };
    this.log = function (message) {
      console.log(message); // eslint-disable-line
    };
  },

  template: _formControlDemo2.default
}).directive('validateRegexp', ['$q', function ($q) {
  return {
    require: 'ngModel',
    link: function link(scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.async = function () {
        // (modelValue, viewValue) {
        try {
          // const reg = new RegExp(viewValue);
          return $q.when(true);
        } catch (error) {
          return $q.reject(false);
        }
      };
    }
  };
}]).name;

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _radioDemo = __webpack_require__(187);

var _radioDemo2 = _interopRequireDefault(_radioDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.forms.radio', []).component('twRadioDocs', {
  bindings: {
    model: '='
  },
  controller: function controller() {
    this.radio = { required: true };
    this.log = function (message) {
      console.log(message); // eslint-disable-line
    };
  },

  template: _radioDemo2.default
}).name;

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _requirementsFormDemo = __webpack_require__(188);

var _requirementsFormDemo2 = _interopRequireDefault(_requirementsFormDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequirementsDocsController = function () {
  function RequirementsDocsController($scope, $http) {
    _classCallCheck(this, RequirementsDocsController);

    var $ctrl = this;

    $ctrl.types = [{ value: 'account', label: 'Account' }, { value: 'profile', label: 'Profile' }, { value: 'verification', label: 'Verification' }, { value: 'pay-in', label: 'Pay in' }, { value: 'transfer', label: 'Transfer' }, { value: 'ach-login', label: 'ACH Bank login' }];
    $ctrl.type = 'profile';

    $ctrl.onRefreshRequirements = function () {
      console.log('on refresh requirements'); // eslint-disable-line
    };

    $scope.$watch('$ctrl.type', function (newVal) {
      $http.get('json/' + newVal + '-requirements.json').then(function (response) {
        $ctrl.requirements = response.data;
      });
    });
  }

  _createClass(RequirementsDocsController, [{
    key: '$onInit',
    value: function $onInit() {
      if (!this.model) {
        this.model = {};
      }

      this.model.firstName = '01010101010';
    }
  }]);

  return RequirementsDocsController;
}();

RequirementsDocsController.$inject = ['$scope', '$http'];

exports.default = _angular2.default.module('tw.styleguide.demo.forms.requirements-form', []).component('twRequirementsFormDocs', {
  controller: RequirementsDocsController,
  bindings: {
    model: '='
  },
  template: _requirementsFormDemo2.default
}).name;

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _selectDemo = __webpack_require__(189);

var _selectDemo2 = _interopRequireDefault(_selectDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.forms.select', []).component('twSelectDocs', {
  bindings: {
    model: '='
  },
  controller: function controller() {
    this.select = {
      required: true,
      empty: 'Select an option...',
      type: 'standard',
      types: [{ value: 'standard', label: 'Standard' }, { value: 'icons', label: 'Icons' }, { value: 'currencies', label: 'Currencies' }, { value: 'notes', label: 'Notes' }, { value: 'headers', label: 'Headers' }, { value: 'secondary', label: 'Secondary text' }, { value: 'searchable', label: 'Searchable text' }, { value: 'circles', label: 'Circles' }, { value: 'long', label: 'Long list' }, { value: 'disabled', label: 'Disabled option' }, { value: 'currencySelect', label: 'Example: Currency select' }, { value: 'accountSelect', label: 'Example: Account select' }],
      options: {
        standard: [{ value: 0, label: 'Zero' }, { value: 1, label: 'One' }, { value: 2, label: 'Two' }, { value: 3, label: 'Three' }],
        icons: [{ value: { id: '1' }, label: 'Profile', icon: 'icon-profile' }, { value: { id: '2' }, label: 'Globe', icon: 'icon-globe' }, { value: { id: '3' }, label: 'Bank', icon: 'icon-bank' }],
        currencies: [{ value: 'eur', label: 'Euro', currency: 'EUR' }, { value: 'gbp', label: 'British Pound', currency: 'GBP' }, { value: 'usd', label: 'US Dollar', currency: 'USD' }],
        notes: [{ value: 'eur', label: 'EUR', note: 'Euro' }, { value: 'gbp', label: 'GBP', note: 'Great British Pound' }, { value: 'usd', label: 'USD', note: 'United States Dollar' }],
        headers: [{ header: 'Header' }, { value: 'opt1', label: 'Option 1' }, { header: 'Another header' }, { value: 'opt2', label: 'Option 2' }],
        secondary: [{ value: '1', label: 'Bob Smith', secondary: 'Account ending 1234' }, { value: '2', label: 'James Davies', secondary: 'Account ending 9876' }, { value: '3', label: 'Helen Williams', secondary: 'Accont ending 4321' }],
        searchable: [{ value: 'eur', label: 'Euro', searchable: 'Austria, France, Germany, Spain' }, { value: 'usd', label: 'Dollar', searchable: 'United States, Hong Kong, Saudi Arabia' }, { value: 'gbp', label: 'Pound', searchable: 'Great britain, England, Scotland' }],
        circles: [{ value: '1', label: 'Bob Smith', circleImage: 'images/mike.jpg' }, { value: '2', label: 'James Davies', circleIcon: 'icon-bank' }, { value: '3', label: 'Helen Williams', circleText: 'AZ' }],
        disabled: [{ value: '1', label: 'Enabled option' }, { value: '2', label: 'Disabled option', disabled: true }, { value: '3', label: 'Second option' }],
        currencySelect: [{ header: 'Popular currencies' }, {
          value: 'eur', label: 'EUR', note: 'Euro', currency: 'EUR', searchable: 'Spain, Germany, France, Austria, Estonia'
        }, {
          value: 'gbp', label: 'GBP', note: 'Great British Pound', currency: 'GBP', searchable: 'England, Scotland, Wales'
        }, {
          value: 'usd', label: 'USD', note: 'United States Dollar', currency: 'USD', searchable: 'Hong Kong, Saudi Arabia'
        }, { header: 'All currencies' }, {
          value: 'aud', label: 'AUD', note: 'Australian Dollar', currency: 'AUD'
        }],
        accountSelect: [{
          value: '1', label: 'Bob Smith', note: 'GBP', secondary: 'Account ending 1234', circleImage: 'images/mike.jpg'
        }, {
          value: '2', label: 'James Davies', note: 'GBP', secondary: 'Account ending 9876', circleText: 'JD'
        }, {
          value: '3', label: 'Helen Williams', note: 'EUR', secondary: 'Accont ending 4321', circleText: 'HW'
        }],
        long: [{ header: 'example header' }]
      }
    };
    for (var i = 0; i < 999; i++) {
      this.select.options.long.push({ value: String(i), label: String(i) });
    }

    this.hideOptions = [{ value: 'true', label: 'All widths' }, { value: 'xs', label: 'xs grid' }, { value: 'sm', label: 'sm grid' }, { value: 'md', label: 'md grid' }, { value: 'lg', label: 'lg grid' }, { value: 'xl', label: 'xl grid' }, { value: 'xs,sm', label: 'xs and sm grid' }, { value: 'md,lg,xl', label: 'md, lg and xl grid' }];

    this.gridSizes = [{ value: 'xs', label: 'XSmall grids and wider' }, { value: 'sm', label: 'Small grids and wider' }, { value: 'md', label: 'Medium grids and wider' }, { value: 'lg', label: 'Large grids and wider' }, { value: 'xl', label: 'XLarge grids and wider' }];

    this.dropdownSizes = [{ value: 'sm', label: 'Small dropdown' }, { value: 'md', label: 'Medium dropdown' }, { value: 'lg', label: 'Large dropdown' }];

    this.buttonSizes = [{ value: 'sm', label: 'Small button' }, { value: 'md', label: 'Medium button' }, { value: 'lg', label: 'Large button' }];

    this.log = function (message) {
      console.log(message); // eslint-disable-line
    };
  },

  template: _selectDemo2.default
}).name;

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _telephoneDemo = __webpack_require__(190);

var _telephoneDemo2 = _interopRequireDefault(_telephoneDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.forms.telephone', []).component('twTelephoneDocs', {
  bindings: {
    model: '=',
    locales: '<'
  },
  controller: function controller() {
    this.telephone = {
      countries: [{
        callingCode: '1', iso2Code: 'US', iso3Code: 'usa', name: 'United States of America'
      }, {
        callingCode: '44', iso2Code: 'GG', iso3Code: 'ggy', name: 'Guernsey'
      }, {
        callingCode: '44', iso2Code: 'GB', iso3Code: 'gbr', name: 'United Kingdom'
      }, {
        callingCode: '33', iso2Code: 'FR', iso3Code: 'fra', name: 'France'
      }],
      required: true
    };
    this.log = function (message) {
      console.log('Telephone changed to ' + message); // eslint-disable-line
    };
  },

  template: _telephoneDemo2.default
}).name;

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _uploadDemo = __webpack_require__(191);

var _uploadDemo2 = _interopRequireDefault(_uploadDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.forms.upload', []).component('twUploadDocs', {
  bindings: {
    model: '=',
    sizes: '<'
  },
  controller: function controller() {
    var _this = this;

    var $ctrl = this;

    this.onStart = function () {
      _this.log('File upload starting');
    };
    this.onSuccess = function () {
      _this.log('File upload complete');
    };
    this.onFailure = function (error) {
      _this.log('File upload failure');
      if (error.status === 404) {
        $ctrl.errorMessage = 'Bad URL';
      } else {
        $ctrl.errorMessage = 'Unknown error';
      }
    };
    this.onCancel = function () {
      _this.log('File upload cancelled');
    };

    this.makeFancy = function () {
      $ctrl.label = 'Front of your ID document';
      $ctrl.processingText = 'Processing...';
      $ctrl.successText = 'Upload complete!';
      $ctrl.failureText = 'Upload failed!';
    };

    this.acceptOptions = [{ value: '.png', label: 'PNG (.png)' }, { value: '.jpg,.jpeg', label: 'JPG (.jpg,.jpeg)' }, { value: 'image/*', label: 'Images (image/*)' }, { value: 'video/*', label: 'Video (video/*)' }, { value: 'audio/*', label: 'Audio (audio/*)' }];

    this.sizes = [{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }];

    this.icons = [{ value: 'upload', label: 'Upload' }, { value: 'id', label: 'ID' }, { value: 'pdf', label: 'PDF' }];

    this.log = function (message) {
      console.log(message); // eslint-disable-line
    };
  },

  template: _uploadDemo2.default
}).name;

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _popOverDemo = __webpack_require__(193);

var _popOverDemo2 = _interopRequireDefault(_popOverDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.help.pop-over', []).component('twPopOverDocs', { template: _popOverDemo2.default }).name;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _toolTipDemo = __webpack_require__(194);

var _toolTipDemo2 = _interopRequireDefault(_toolTipDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.help.tool-tip', []).component('twToolTipDocs', { template: _toolTipDemo2.default }).name;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _affixDemo = __webpack_require__(195);

var _affixDemo2 = _interopRequireDefault(_affixDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.layout.affix', []).component('twAffixDocs', { template: _affixDemo2.default }).name;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _cardsDemo = __webpack_require__(196);

var _cardsDemo2 = _interopRequireDefault(_cardsDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.layout.cards', []).component('twCardsDocs', {
  controller: function controller() {
    this.imageUrl = 'https://static1.squarespace.com/static/' + '58775efdd482e90f8535f34f/t/58d97b69ebbd1a5c0c1d9473/1498213976117/?format=750w';
  },

  template: _cardsDemo2.default
}).component('formExample', {
  template: '\n    <div class="row ">\n      <div class="col-sm-6 col-lg-4">\n        <div class="form-group m-b-0">\n          <label class="control-label">Send</label>\n          <div class="input-group">\n            <span class="input-group-addon ">\xA3</span>\n            <input class="form-control text-xs-right p-r-0" type="text">\n            <span class="input-group-addon p-l-1 ">USD</span>\n          </div>\n        </div>\n      </div>\n      <div class="col-sm-6 col-lg-4 m-b-0">\n        <div class="form-group m-b-0">\n          <label class="control-label">Receive about </label>\n          <div class="input-group">\n            <span class="input-group-addon ">\xA3</span>\n            <input class="form-control text-xs-right p-r-0" type="text">\n            <span class="input-group-addon p-l-1 ">USD</span>\n          </div>\n        </div>\n      </div>\n      <div class="col-sm-12 col-lg-4 p-t-3 m-b-0">\n        <button class="btn btn-success btn-block">Repeat transfer</button>\n      </div>\n    </div>'
}).component('expandExample', {
  transclude: {
    expandedHead: 'heading',
    expandedBody: '?middle',
    expandedButtons: 'buttons'
  },
  template: '\n    <div>\n      <div class="m-t-1 m-b-3 visible-xs-block visible-sm-block" ng-transclude="expandedHead"></div>\n      <div ng-transclude="expandedBody"></div>\n      <hr class="hidden-xs hidden-sm hidden-md">\n      <div class="m-t-2 btn-toolbar" ng-transclude="expandedButtons"></div>\n    </div>'
}).component('collapseExample', {
  transclude: {
    collapseBody: '?middle',
    collapseRight: 'right'
  },
  template: '\n    <div class="media">\n      <div class="media-body" ng-transclude="collapseBody"></div>\n      <div class="media-right text-xs-right" ng-transclude="collapseRight"></div>\n    </div>'
}).name;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _loaderDemo = __webpack_require__(199);

var _loaderDemo2 = _interopRequireDefault(_loaderDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.loading.loader', []).component('twLoaderDocs', {
  template: _loaderDemo2.default
}).name;

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = __webpack_require__(0);

var _angular2 = _interopRequireDefault(_angular);

var _processDemo = __webpack_require__(200);

var _processDemo2 = _interopRequireDefault(_processDemo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('tw.styleguide.demo.loading.process', []).component('twProcessDocs', {
  controller: function controller() {
    this.log = function (message) {
      console.log(message); // eslint-disable-line
    };
    this.processingStates = [{ value: null, label: 'Processing' }, { value: -1, label: 'Failed' }, { value: 0, label: 'Hidden' }, { value: 1, label: 'Success' }];

    this.sizes = [{ value: 'xs', label: 'Extra small' }, { value: 'sm', label: 'Small' }, { value: 'xl', label: 'Extra large' }];
  },

  template: _processDemo2.default
}).name;

/***/ }),
/* 171 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"currency-format\">Currency Format</h4>\n<p>\n  <code>twCurrencyFormat</code> provides both a component and a filter for\n  formatting numbers as currency amounts, based on an ISO currency code and a\n  given locale.\n</p>\n<ul>\n  <li>Numbers without decimals are rendered without decimals, regardless of currency.</li>\n  <li>Numbers with decimals are rendered with the correct number of decimals for the currency.</li>\n</ul>\n\n<p class=\"text-danger\">\n  Internally this uses Number.prototype.getLocaleString, which is not yet\n  supported in Safari.\n</p>\n<div class=\"row m-b-3\">\n  <div class=\"col-md-6\">\n    <dl>\n      <dt>Component</dt>\n      <dd>\n        <tw-currency-format\n          amount=\"$ctrl.number\"\n          currency=\"$ctrl.currency\"\n          locale=\"$ctrl.locale\">\n        </tw-currency-format>\n      </dd>\n    </dl>\n<pre>\n&lt;tw-currency-format\n  amount=\"{{ $ctrl.number }}\"\n  currency=\"{{ $ctrl.currency }}\"\n  locale=\"{{ $ctrl.locale }}\"&gt;\n&lt;/tw-currency-format&gt;\n</pre>\n    <h5>Currency format filter</h5>\n    <p> We also provide a <code>twCurrencyFormat</code> filter.</p>\n    <dl>\n      <dt>Filter</dt>\n      <dd>{{ $ctrl.number | twCurrencyFormat : $ctrl.currency : $ctrl.locale }}</dd>\n    </dl>\n<pre>\n<code ng-non-bindable>{{</code>{{ $ctrl.number }} | twCurrencyFormat : \"{{ $ctrl.currency }}\" : \"{{ $ctrl.locale }}\" <code ng-non-bindable>}}</code>\n</pre>\n  </div>\n  <div class=\"col-md-6\">\n    <div class=\"well\">\n      <h5 class=\"page-header\">Edit configuration</h5>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Number\n        </label>\n        <input type=\"number\" class=\"form-control\" ng-model=\"$ctrl.number\" />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Locale\n        </label>\n        <tw-select\n          options=\"$ctrl.locales\"\n          ng-model=\"$ctrl.locale\">\n        </tw-select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Currency\n        </label>\n        <tw-select\n          options=\"$ctrl.currencies\"\n          ng-model=\"$ctrl.currency\">\n        </tw-select>\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ }),
/* 172 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"date-format\">Date Format</h4>\n<p>\n  <code>twDateFormat</code> is a component for presenting dates.  It makes smart\n  decisions about how to present the date based on how far the date is from the\n  current date and time.  It uses the supplied locale to change the presentation\n  to the common local format. The component uses a tooltip to show the full\n  date on hover.\n</p>\n<ul>\n  <li>Dates within 48 hours of now display the weekday name and time.</li>\n  <li>Dates within 8 days show the weekday name and day of the month.</li>\n  <li>Dates within the current year show the day of the month and the month name.</li>\n  <li>Dates from other years show the day of the month, the month name and the year.</li>\n</ul>\n<p>\n  Dates can be supplied either as a date object or as any string that can be\n  interpreted by the Javascript Date object constructor.  We use locale specific\n  date functions.  Therefore, if you supply a date in UTC, it may shift to another\n  day if the browser is in another time zone.  If you're presenting something\n  like a date of birth, the safest approach is to pass a string '2000-01-01'\n  which will be interpreted in the local timezone.\n</p>\n<div class=\"row m-b-3\">\n  <div class=\"col-md-6\">\n    <h5>Date format component</h5>\n    <h3 class=\"m-b-3\">\n      <tw-date-format\n        date=\"$ctrl.model\"\n        locale=\"$ctrl.locale\"\n        format=\"$ctrl.format\">\n      </tw-date-format>\n    </h3>\n<pre>\n&lt;tw-date-format\n  date='{{ $ctrl.model }}'\n  locale=\"'{{ $ctrl.locale }}'\"<span ng-if=\"$ctrl.format\">\n  format=\"'{{ $ctrl.format }}'\"</span>&gt;\n&lt;/tw-date-format&gt;\n</pre>\n    <h5>Date format filter</h5>\n    <p>\n      We also provide a <code>twDateFormat</code> filter to format dates. In most\n      situations it is preferable to use the component to take advantage of the\n      tooltips.\n    </p>\n    <h3 class=\"m-b-3\">\n      {{ $ctrl.model | twDateFormat : $ctrl.locale : $ctrl.format }}\n    </h3>\n<pre>\n<code ng-non-bindable>{{</code>\n  {{ $ctrl.model }} |\n  twDateFormat : \"{{ $ctrl.locale }}\" <span ng-if=\"$ctrl.format\">: {{ $ctrl.format }} </span>\n<code ng-non-bindable>}}</code>\n</pre>\n  </div>\n  <div class=\"col-md-6\">\n    <div class=\"well\">\n      <h5 class=\"page-header\">Edit configuration</h5>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Date\n        </label>\n        <tw-date-lookup\n          placeholder=\"Choose date...\"\n          ng-model=\"$ctrl.model\"\n          ng-change=\"$ctrl.dateChange()\">\n        </tw-date-lookup>\n      </div>\n      <div class=\"form-group\" ng-init=\"$ctrl.time = '1200'\">\n        <label class=\"control-label\">\n          Time\n        </label>\n        <input class=\"form-control\"\n          ng-model=\"$ctrl.time\"\n          tw-text-format=\"**:**\"\n          ng-minlength=\"4\"\n          ng-maxlength=\"4\"\n          ng-change=\"$ctrl.timeChange()\"\n          tw-validation />\n      </div>\n      <div class=\"form-group\" ng-init=\"$ctrl.locale = 'en-GB';\">\n        <label class=\"control-label\">\n          Locale\n        </label>\n        <tw-select\n          options=\"$ctrl.locales\"\n          ng-model=\"$ctrl.locale\">\n        </tw-select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Format\n        </label>\n        <tw-select\n          options=\"$ctrl.formats\"\n          ng-model=\"$ctrl.format\">\n        </tw-select>\n      </div>\n    </div>\n  </div>\n</div>\n<div>\n  <h5>Examples</h5>\n  <dl>\n    <dt>Now</dt>\n    <dd>\n      <tw-date-format\n        date=\"$ctrl.dates.now\"\n        locale=\"$ctrl.locale\"\n        format=\"$ctrl.format\">\n      </tw-date-format>\n    </dd>\n  </dl>\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <dl>\n        <dt>An hour ago</dt>\n        <dd>\n          <tw-date-format\n            date=\"$ctrl.dates.lastHour\"\n            locale=\"$ctrl.locale\"\n            format=\"$ctrl.format\">\n          </tw-date-format>\n        </dd>\n        <dt>A day ago</dt>\n        <dd>\n          <tw-date-format\n            date=\"$ctrl.dates.lastDay\"\n            locale=\"$ctrl.locale\"\n            format=\"$ctrl.format\">\n          </tw-date-format>\n        </dd>\n        <dt>A week ago</dt>\n        <dd>\n          <tw-date-format\n            date=\"$ctrl.dates.lastWeek\"\n            locale=\"$ctrl.locale\"\n            format=\"$ctrl.format\">\n          </tw-date-format>\n        </dd>\n        <dt>A month ago</dt>\n        <dd>\n          <tw-date-format\n            date=\"$ctrl.dates.lastMonth\"\n            locale=\"$ctrl.locale\"\n            format=\"$ctrl.format\">\n          </tw-date-format>\n        </dd>\n        <dt>A year ago</dt>\n        <dd>\n          <tw-date-format\n            date=\"$ctrl.dates.lastYear\"\n            locale=\"$ctrl.locale\"\n            format=\"$ctrl.format\">\n          </tw-date-format>\n        </dd>\n      </dl>\n    </div>\n    <div class=\"col-md-6\">\n      <dl>\n        <dt>In an hour</dt>\n        <dd>\n          <tw-date-format\n            date=\"$ctrl.dates.nextHour\"\n            locale=\"$ctrl.locale\"\n            format=\"$ctrl.format\">\n          </tw-date-format>\n        </dd>\n        <dt>In a day</dt>\n        <dd>\n          <tw-date-format\n            date=\"$ctrl.dates.nextDay\"\n            locale=\"$ctrl.locale\"\n            format=\"$ctrl.format\">\n          </tw-date-format>\n        </dd>\n        <dt>In a week</dt>\n        <dd>\n          <tw-date-format\n            date=\"$ctrl.dates.nextWeek\"\n            locale=\"$ctrl.locale\"\n            format=\"$ctrl.format\">\n          </tw-date-format>\n        </dd>\n        <dt>In a month</dt>\n        <dd>\n          <tw-date-format\n            date=\"$ctrl.dates.nextMonth\"\n            locale=\"$ctrl.locale\"\n            format=\"$ctrl.format\">\n          </tw-date-format>\n        </dd>\n        <dt>In a year</dt>\n        <dd>\n          <tw-date-format\n            date=\"$ctrl.dates.nextYear\"\n            locale=\"$ctrl.locale\"\n            format=\"$ctrl.format\">\n          </tw-date-format>\n        </dd>\n      </dl>\n    </div>\n  </div>\n</div>\n";

/***/ }),
/* 173 */
/***/ (function(module, exports) {

module.exports = "<div class=\"panel\">\n  <div class=\"panel-heading\">\n    <h2 class=\"panel-title\">Formatting</h2>\n  </div>\n  <div class=\"panel-body\" ng-init=\"$ctrl.requirementsForm = {}\">\n    <tw-text-format-docs model=\"$ctrl.model.presentation\"></tw-text-format-docs>\n    <hr class=\"m-b-5\" />\n    <tw-number-format-docs locales=\"$ctrl.locales\"></tw-number-format-docs>\n    <hr class=\"m-b-5\" />\n    <tw-currency-format-docs locales=\"$ctrl.locales\"></tw-currency-format-docs>\n    <hr class=\"m-b-5\" />\n    <tw-date-format-docs locales=\"$ctrl.locales\"></tw-date-format-docs>\n  </div>\n</div>\n";

/***/ }),
/* 174 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"number-format\">Number Format</h4>\n<p>\n  <code>twNumberFormat</code> provides a component and a filter for formatting\n  numbers based on a given locale. You can also supply a precision if you want\n  a specific number of decimals.  If precision is not supplied it will simply\n  display any decimals the number value already has.\n</p>\n<p class=\"text-danger\">\n  Internally this uses Number.prototype.getLocaleString, which is not yet\n  supported in Safari.\n</p>\n<div class=\"row m-b-3\">\n  <div class=\"col-md-6\">\n    <dl>\n      <dt>Component</dt>\n      <dd>\n        <tw-number-format\n          amount=\"$ctrl.number\"\n          precision=\"$ctrl.precision\"\n          locale=\"$ctrl.locale\">\n        </tw-number-format>\n      </dd>\n    </dl>\n<pre>\n&lt;tw-number-format\n  amount=\"{{ $ctrl.number }}\"\n  precision=\"{{ $ctrl.precision }}\"\n  locale=\"{{ $ctrl.locale }}\"&gt;\n&lt;/tw-number-format&gt;\n</pre>\n    <h5>Number format filter</h5>\n    <p> We also provide a <code>twNumberFormat</code> filter.</p>\n    <dl>\n      <dt>Filter</dt>\n      <dd>{{ $ctrl.number | twNumberFormat : $ctrl.precision : $ctrl.locale}}</dd>\n\n    </dl>\n<pre>\n<code ng-non-bindable>{{</code>{{ $ctrl.number }} | twNumberFormat : {{ $ctrl.precision }} : \"{{ $ctrl.locale }}\"<code ng-non-bindable>}}</code>\n</pre>\n  </div>\n  <div class=\"col-md-6\">\n    <div class=\"well\">\n      <h5 class=\"page-header\">Edit configuration</h5>\n\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Number\n        </label>\n        <input type=\"number\" class=\"form-control\" ng-model=\"$ctrl.number\" />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Locale\n        </label>\n        <tw-select\n          options=\"$ctrl.locales\"\n          ng-model=\"$ctrl.locale\">\n        </tw-select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Precision\n        </label>\n        <input type=\"number\" class=\"form-control\" ng-model=\"$ctrl.precision\"  />\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ }),
/* 175 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"text-format\">Text Format</h4>\n<p><code>tw-text-format</code> is a simple attribute based directive\n  that formats text entered into controls.  The model value is preserved without\n  formatting, and validation continues to function on the unformated value.</p>\n\n<div class=\"row m-b-3\">\n  <div class=\"col-md-6\">\n    <div class=\"form-group\">\n      <label class=\"control-label\">Text format</label>\n      <input type=\"text\" class=\"form-control\"\n        ng-model=\"$ctrl.model\"\n        ng-minlength=\"$ctrl.pattern.minlength\"\n        ng-maxlength=\"$ctrl.pattern.maxlength\"\n        ng-pattern=\"$ctrl.pattern.pattern\"\n        ng-required=\"true\"\n        placeholder=\"{{$ctrl.pattern.placeholder}}\"\n        tw-focusable\n        tw-validation\n        tw-text-format=\"{{$ctrl.pattern.format}}\" />\n      <div class=\"alert alert-focus\" ng-if=\"$ctrl.pattern.helpText\">\n        {{$ctrl.pattern.helpText}}\n      </div>\n      <docs-error-messages></docs-error-messages>\n    </div>\n<pre>\n&lt;input type=\"text\"\n  class=\"form-control\"\n  ng-model=\"{{$ctrl.model}}\"<span ng-if=\"$ctrl.pattern.minlength\">\n  ng-minlength=\"{{$ctrl.pattern.minlength}}\"</span><span ng-if=\"$ctrl.pattern.maxlength\">\n  ng-maxlength=\"{{$ctrl.pattern.maxlength}}\"</span><span ng-if=\"$ctrl.pattern.pattern\">\n  ng-pattern=\"{{$ctrl.pattern.pattern}}\"</span>\n  ng-required=\"true\"\n  placeholder=\"{{$ctrl.pattern.placeholder}}\"\n  tw-text-format=\"{{$ctrl.pattern.format}}\"\n  tw-validation\n  tw-focusable /&gt;\n</pre>\n  </div>\n  <div class=\"col-md-6\">\n    <div class=\"well\">\n      <h5 class=\"page-header\">Edit configuration</h5>\n      <div class=\"form-group\">\n        <label class=\"control-label\">Pattern</label>\n        <tw-select\n          placeholder=\"Choose pattern...\"\n          options=\"$ctrl.patterns\"\n          ng-model=\"$ctrl.pattern\"\n          ng-change=\"$ctrl.changePattern()\"></tw-select>\n      </div>\n      <button class=\"btn btn-default btn-block m-b-3\"\n        ng-click=\"$ctrl.model = 'ABCDEFGHI'\">\n        Set to 'ABCDEFGHI'\n      </button>\n      <button class=\"btn btn-default btn-block\"\n        ng-click=\"$ctrl.model = '1234567890'\">\n        Set to '1234567890'\n      </button>\n    </div>\n  </div>\n</div>\n<div>\n  <h5>Text format filter</h5>\n  <p>When we display values that were entered using the text format directive we\n    typically want to show the user the formatted value. We supply an Angular\n    filter to format the value in the same way.</p>\n  <dl>\n    <dt>Text filter</dt>\n    <dd>{{$ctrl.model | twTextFormat:$ctrl.pattern.format }}</dd>\n  </dl>\n<pre>\n&lt;dl&gt;\n  &lt;dt&gt;Text filter&lt;/dt&gt;\n  &lt;dd&gt;<code ng-non-bindable>{{</code> \"{{$ctrl.model}}\" | twTextFormat : \"{{$ctrl.pattern.format}}\" <code ng-non-bindable>}}</code>&lt;/dd&gt;\n&lt;/dl&gt;\n</pre>\n\n</div>\n";

/***/ }),
/* 176 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"amount-currency-select\">Amount Currency Select</h4>\n<p>Two way data binding via ng-model</p>\n<form>\n  <div class=\"row m-b-3\">\n    <div class=\"col-md-6\">\n      <div class=\"form-group\">\n        <label class=\"control-label\">How much?</label>\n        <tw-amount-currency-select tw-validation\n          ng-model=\"$ctrl.model\"\n          ng-required=\"$ctrl.amountCurrencySelect.required\"\n          ng-disabled=\"$ctrl.amountCurrencySelect.disabled\"\n          ng-min=\"$ctrl.amountCurrencySelect.min\"\n          ng-max=\"$ctrl.amountCurrencySelect.max\"\n          ng-change=\"$ctrl.log('amount input value changed:' + $ctrl.model)\"\n\n          placeholder=\"{{ $ctrl.amountCurrencySelect.placeholder }}\"\n\n          currency=\"$ctrl.currency\"\n          on-currency-change=\"$ctrl.log('currency input value changed:' + $ctrl.currency)\"\n\n          currencies=\"$ctrl.currencySelect\"\n          currency-filter-placeholder=\"{{ $ctrl.amountCurrencySelect.currencyFilterPlaceholder }}\"\n\n          custom-action-label=\"$ctrl.amountCurrencySelect.customActionLabel\"\n          on-custom-action=\"$ctrl.log('Custom Action Called')\"\n\n          locked=\"$ctrl.amountCurrencySelect.locked\"\n          on-locked-change=\"$ctrl.log('Locked changed: ' + $ctrl.amountCurrencySelect.locked)\"\n          show-lock=\"$ctrl.amountCurrencySelect.showLock\"\n\n          lock-tooltip-title=\"$ctrl.amountCurrencySelect.lockTooltipTitle\"\n          lock-tooltip-content=\"$ctrl.amountCurrencySelect.lockTooltipContent\"\n\n          size=\"{{ $ctrl.amountCurrencySelect.size }}\">\n        </tw-amount-currency-select>\n        <div class=\"error-messages\">\n          <div class=\"error-required\">Required</div>\n          <div class=\"error-min\">Must be higher</div>\n          <div class=\"error-max\">Must be lower</div>\n        </div>\n      </div>\n\n      <div class=\"form-group form-group-lg\">\n        <label class=\"control-label\">How much?</label>\n        <tw-amount-currency-select tw-validation\n          ng-model=\"$ctrl.model\"\n          ng-required=\"$ctrl.amountCurrencySelect.required\"\n          ng-disabled=\"$ctrl.amountCurrencySelect.disabled\"\n          ng-min=\"$ctrl.amountCurrencySelect.min\"\n          ng-max=\"$ctrl.amountCurrencySelect.max\"\n          ng-change=\"$ctrl.log('amount input value changed:' + $ctrl.model)\"\n\n          placeholder=\"{{ $ctrl.amountCurrencySelect.placeholder }}\"\n\n          currency=\"$ctrl.currency\"\n          on-currency-change=\"$ctrl.log('currency input value changed:' + $ctrl.currency)\"\n\n          currencies=\"$ctrl.currencySelect\"\n          currency-filter-placeholder=\"{{ $ctrl.amountCurrencySelect.currencyFilterPlaceholder }}\"\n\n          custom-action-label=\"$ctrl.amountCurrencySelect.customActionLabel\"\n          on-custom-action=\"$ctrl.log('Custom Action Called')\"\n\n          locked=\"$ctrl.amountCurrencySelect.locked\"\n          on-locked-change=\"$ctrl.log('Lock changed: ' + $ctrl.amountCurrencySelect.locked)\"\n          show-lock=\"$ctrl.amountCurrencySelect.showLock\"\n\n          lock-tooltip-title=\"$ctrl.amountCurrencySelect.lockTooltipTitle\"\n          lock-tooltip-content=\"$ctrl.amountCurrencySelect.lockTooltipContent\"\n\n          size=\"lg\">\n        </tw-amount-currency-select>\n        <div class=\"error-messages\">\n          <div class=\"error-required\">Required</div>\n          <div class=\"error-min\">Must be higher</div>\n          <div class=\"error-max\">Must be lower</div>\n        </div>\n      </div>\n      <h5>Configuration</h5>\n  <pre>&lt;tw-amount-currency-select tw-validation\n  ng-model=\"{{ $ctrl.model }}\"<span ng-if=\"$ctrl.amountCurrencySelect.required\">\n  ng-required=\"{{ $ctrl.amountCurrencySelect.required }}\"</span><span ng-if=\"$ctrl.amountCurrencySelect.disabled\">\n  ng-disabled=\"{{ $ctrl.amountCurrencySelect.disabled }}\"</span><span ng-if=\"$ctrl.amountCurrencySelect.min\">\n  ng-min=\"{{ $ctrl.amountCurrencySelect.min }}\"</span><span ng-if=\"$ctrl.amountCurrencySelect.max\">\n  ng-max=\"{{ $ctrl.amountCurrencySelect.max }}\"</span>\n  ng-change=\"$ctrl.log('amount input value changed:' + $ctrl.model)\"\n  currencies=\"{{ $ctrl.currencySelect }}\"\n  currency=\"'{{ $ctrl.currency | uppercase }}'\"\n  on-currency-change=\"$ctrl.log('currency input value changed:' + $ctrl.currency)\"<span\n    ng-if=\"$ctrl.amountCurrencySelect.placeholder\">\n  placeholder=\"{{ $ctrl.amountCurrencySelect.placeholder }}\"</span>\n  custom-action-label=\"{{ $ctrl.amountCurrencySelect.customActionLabel }}\"\n  on-custom-action=\"$ctrl.log('Custom Action Called')\"<span\n    ng-if=\"$ctrl.amountCurrencySelect.currencyFilterPlaceholder\">\n  currency-filter-placeholder=\"{{ $ctrl.amountCurrencySelect.currencyFilterPlaceholder }}\"</span><span\n    ng-if=\"$ctrl.amountCurrencySelect.size !== 'md'\">\n  size=\"{{ $ctrl.amountCurrencySelect.size }}\"</span><span ng-if=\"$ctrl.amountCurrencySelect.showLock\">\n  show-lock=\"{{$ctrl.amountCurrencySelect.showLock}}\"\n  locked=\"{{ $ctrl.amountCurrencySelect.locked }}\"\n  on-locked-change=\"$ctrl.log('lock changed:' + locked)\"</span>&gt;\n  lock-tooltip-title=\"{{$ctrl.amountCurrencySelect.lockTooltipTitle}}\"\n  lock-tooltip-content=\"{{$ctrl.amountCurrencySelect.lockTooltipContent}}\"\n  &lt;/tw-amount-currency-select&gt;</pre>\n    </div>\n    <div class=\"col-md-6\">\n      <div class=\"well\">\n        <h5 class=\"page-header\">\n          Edit configuration\n        </h5>\n        <div class=\"form-group\">\n          <label class=\"control-label\">\n            Toggles\n          </label>\n          <div class=\"checkbox\">\n            <label>\n              <tw-checkbox ng-model=\"$ctrl.amountCurrencySelect.required\" />\n              Is the control required?\n            </label>\n          </div>\n          <div class=\"checkbox\">\n            <label>\n              <tw-checkbox ng-model=\"$ctrl.amountCurrencySelect.disabled\" />\n              Is the control disabled?\n            </label>\n          </div>\n          <div class=\"checkbox\">\n            <label>\n              <tw-checkbox ng-model=\"$ctrl.amountCurrencySelect.locked\" />\n              Locked?\n            </label>\n          </div>\n          <div class=\"checkbox\">\n            <label>\n              <tw-checkbox ng-model=\"$ctrl.amountCurrencySelect.showLock\" />\n              Show lock?\n            </label>\n          </div>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label\">\n            Placeholder\n          </label>\n          <input type=\"text\"\n            class=\"form-control\"\n            ng-model=\"$ctrl.amountCurrencySelect.placeholder\" />\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label\">\n            Custom Action Label\n          </label>\n          <input type=\"text\"\n            class=\"form-control\"\n            ng-model=\"$ctrl.amountCurrencySelect.customActionLabel\"/>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"control-label\">\n            Currency Filter Placeholder\n          </label>\n          <input type=\"text\"\n            class=\"form-control\"\n            ng-model=\"$ctrl.amountCurrencySelect.currencyFilterPlaceholder\" />\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label\">\n            Min amount\n          </label>\n          <input type=\"number\"\n            class=\"form-control\"\n            ng-model=\"$ctrl.amountCurrencySelect.min\"\n            tw-validation />\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label\">\n            Max amount\n          </label>\n          <input type=\"number\"\n            class=\"form-control\"\n            ng-model=\"$ctrl.amountCurrencySelect.max\"\n            tw-validation />\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label\">\n            Lock tooltip title\n          </label>\n          <input type=\"text\"\n            class=\"form-control\"\n            ng-model=\"$ctrl.amountCurrencySelect.lockTooltipTitle\" />\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label\">\n            Lock tooltip content\n          </label>\n          <input type=\"text\"\n            class=\"form-control\"\n            ng-model=\"$ctrl.amountCurrencySelect.lockTooltipContent\" />\n        </div>\n        <div class=\"form-group\">\n          <label class=\"control-label\">\n            Size\n          </label>\n          <tw-select\n            ng-model=\"$ctrl.amountCurrencySelect.size\"\n            options=\"$ctrl.sizes\" />\n        </div>\n      </div>\n    </div>\n  </div>\n</form>\n";

/***/ }),
/* 177 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"checkbox\">Checkbox</h4>\n\n<form>\n<div class=\"row m-b-3\">\n  <div class=\"col-md-6\">\n    <div class=\"form-group\">\n      <label class=\"control-label\">\n        TW Checkbox\n      </label>\n      <div class=\"checkbox\">\n        <label ng-init=\"$ctrl.checkbox.trueValue = 'custom-true'; $ctrl.checkbox.falseValue = 'custom-true';\">\n          <tw-checkbox tw-validation\n            ng-model=\"$ctrl.model\"\n            ng-required=\"$ctrl.checkbox.required\"\n            ng-disabled=\"$ctrl.checkbox.disabled\"\n            ng-click=\"$ctrl.log('checkbox click')\"\n            ng-change=\"$ctrl.log('checkbox change')\"\n            ng-blur=\"$ctrl.log('checkbox blur')\"\n            ng-focus=\"$ctrl.log('checkbox focus')\"\n            ng-true-value=\"$ctrl.checkbox.customTrueFalse ? 'custom-true' : null\"\n            ng-false-value=\"$ctrl.checkbox.customTrueFalse ? 'custom-false' : null\" />\n          TW Checkbox<span ng-if=\"$ctrl.checkbox.required\">*</span>\n        </label>\n      </div>\n      <div class=\"form-inline m-t-1\">\n        <label>\n          <tw-checkbox class=\"m-r-1\"\n            ng-model=\"$ctrl.checkbox.disabled\"\n            />Disable the checkbox above?\n        </label>\n      </div>\n    </div>\n\n    <h5>Configuration</h5>\n<pre>&lt;tw-checkbox\n  name=\"mySelect\"\n  ng-model=\"{{$ctrl.model}}\"\n  ng-required=\"{{$ctrl.checkbox.required}}\"\n  ng-disabled=\"{{$ctrl.checkbox.disabled}}\"\n  ng-change=\"...\"\n  ng-blur=\"...\"\n  ng-focus=\"...\"<span ng-if=\"$ctrl.checkbox.customTrueFalse\">\n  ng-true-value=\"'custom-true'\"\n  ng-false-value=\"'custom-false'\"</span>\n  tw-validation /&gt;</pre>\n  </div>\n  <div class=\"col-md-6\">\n    <div class=\"well\">\n      <h5 class=\"page-header\">\n        Edit configuration\n      </h5>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Required?\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.checkbox.required\" />\n            Is the control required?\n          </label>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Disabled?\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.checkbox.disabled\" />\n            Is the control disabled?\n          </label>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Custom true/false values?\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.checkbox.customTrueFalse\" />\n            Use custom values?\n          </label>\n        </div>\n      </div>\n      <input type=\"submit\" class=\"btn btn-primary btn-block\" value=\"Submit form\" />\n    </div>\n  </div>\n</div>\n\n<table class=\"table\"><thead>\n    <tr>\n      <th colspan=\"2\">Classes &amp; styles</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td><code>.tw-checkbox-button</code></td>\n      <td><button class=\"tw-checkbox-button\">\n        <span class=\"tw-checkbox-check glyphicon glyphicon-ok\"></span></button>\n      </td>\n    </tr>\n    <tr>\n      <td><code>.tw-checkbox-button:focus</code></td>\n      <td><button class=\"tw-checkbox-button focus\">\n        <span class=\"tw-checkbox-check glyphicon glyphicon-ok\"></span></button>\n      </td>\n    </tr>\n    <tr>\n      <td><code>.tw-checkbox-button.checked</code></td>\n      <td><button class=\"tw-checkbox-button checked\" >\n        <span class=\"tw-checkbox-check glyphicon glyphicon-ok\"></span></button>\n      </td>\n    </tr>\n    <tr>\n      <td><code>.tw-checkbox-button[disabled]</code></td>\n      <td><button class=\"tw-checkbox-button\" disabled>\n        <span class=\"tw-checkbox-check glyphicon glyphicon-ok\"></span></button>\n      </td>\n    </tr>\n    <tr>\n      <td><code>.tw-checkbox-button.checked[disabled]</code></td>\n      <td><button class=\"tw-checkbox-button checked\" disabled>\n        <span class=\"tw-checkbox-check glyphicon glyphicon-ok\"></span></button>\n      </td>\n    </tr>\n    <tr>\n      <td><code>.tw-checkbox-button.has-error</code></td>\n      <td><button class=\"tw-checkbox-button has-error\">\n        <span class=\"tw-checkbox-check glyphicon glyphicon-ok\"></span></button>\n      </td>\n    </tr>\n    <tr>\n      <td><code>.tw-checkbox-button.has-error.checked</code></td>\n      <td><button class=\"tw-checkbox-button has-error checked\">\n        <span class=\"tw-checkbox-check glyphicon glyphicon-ok\"></span></button>\n      </td>\n    </tr>\n    <tr>\n      <td><code>.tw-checkbox-button.has-error.checked[disabled]</code></td>\n      <td><button class=\"tw-checkbox-button has-error checked\" disabled>\n        <span class=\"tw-checkbox-check glyphicon glyphicon-ok\"></span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n</form>\n";

/***/ }),
/* 178 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"currency-input\">Currency Input</h4>\n<p>Two way data binding via ng-model</p>\n\n<form>\n<div class=\"row m-b-3\">\n    <div class=\"col-md-6\">\n        <div class=\"form-group\">\n            <label class=\"control-label\">\n                How much?\n            </label>\n            <tw-currency-input\n                tw-validation\n                currency=\"$ctrl.currencyInput.currency\"\n                placeholder=\"{{ $ctrl.currencyInput.placeholder }}\"\n                ng-model=\"$ctrl.model\"\n                ng-change=\"$ctrl.log('currency input value:' + $ctrl.model)\"\n                ng-required=\"$ctrl.currencyInput.required\"\n                ng-disabled=\"$ctrl.currencyInput.disabled\"\n                ng-min=\"$ctrl.currencyInput.min\"\n                ng-max=\"$ctrl.currencyInput.max\"\n                size=\"{{ $ctrl.currencyInput.size }}\"\n                locked=\"$ctrl.currencyInput.locked\">\n            </tw-currency-input>\n            <div class=\"error-messages\">\n                <div class=\"error-required\">Required</div>\n                <div class=\"error-min\">Must be higher</div>\n                <div class=\"error-max\">Must be lower</div>\n            </div>\n            <docs-status-messages></docs-status-messages>\n        </div>\n        <div class=\"form-group form-group-lg\">\n            <label class=\"control-label\">\n                How much?\n            </label>\n            <tw-currency-input\n                tw-validation\n                currency=\"$ctrl.currencyInput.currency\"\n                placeholder=\"{{ $ctrl.currencyInput.placeholder }}\"\n                ng-model=\"$ctrl.model\"\n                ng-change=\"$ctrl.log('currency input value:' + $ctrl.model)\"\n                ng-required=\"$ctrl.currencyInput.required\"\n                ng-disabled=\"$ctrl.currencyInput.disabled\"\n                ng-min=\"$ctrl.currencyInput.min\"\n                ng-max=\"$ctrl.currencyInput.max\"\n                size=\"lg\"\n                locked=\"$ctrl.currencyInput.locked\"\n                on-locked-change=\"$ctrl.log('locked change:' + $ctrl.currencyInput.locked)\">\n                <addon ng-if=\"$ctrl.currencyInput.addon\">@</addon>\n            </tw-currency-input>\n            <div class=\"error-messages\">\n                <div class=\"error-required\">Required</div>\n                <div class=\"error-min\">Must be higher</div>\n                <div class=\"error-max\">Must be lower</div>\n            </div>\n        </div>\n        <h5>Configuration</h5>\n<pre>&lt;tw-currency-input\n  tw-validation\n  ng-model=\"{{$ctrl.model}}\"\n  ng-change=\"$ctrl.log('input change')\"<span ng-if=\"$ctrl.currencyInput.required\">\n  ng-required=\"{{ $ctrl.currencyInput.required }}\"</span><span ng-if=\"$ctrl.currencyInput.disabled\">\n  ng-disabled=\"{{ $ctrl.currencyInput.disabled }}\"</span>\n  ng-min=\"{{ $ctrl.currencyInput.min }}\"\n  ng-max=\"{{ $ctrl.currencyInput.max }}\"\n  currency=\"'{{ $ctrl.currencyInput.currency }}'\"\n  <span ng-if=\"$ctrl.currencyInput.addon\">&lt;addon&gt;@&lt;/addon&gt;</span>\n&lt;/tw-currency-input&gt;</pre>\n    </div>\n    <div class=\"col-md-6\">\n        <div class=\"well\">\n            <h5 class=\"page-header\">\n                Edit configuration\n            </h5>\n            <div class=\"form-group\">\n                <label class=\"control-label\">\n                    Toggles\n                </label>\n                <div class=\"checkbox\">\n                    <label>\n                        <tw-checkbox ng-model=\"$ctrl.currencyInput.required\"\n                            ng-init=\"$ctrl.currencyInput.required = false\" />\n                        Is the control required?\n                    </label>\n                </div>\n                <div class=\"checkbox\">\n                    <label>\n                        <tw-checkbox ng-model=\"$ctrl.currencyInput.disabled\"\n                            ng-init=\"$ctrl.currencyInput.disabled = false\" />\n                        Is the control disabled?\n                    </label>\n                </div>\n                <div class=\"checkbox\">\n                    <label>\n                        <tw-checkbox ng-model=\"$ctrl.currencyInput.addon\" />\n                        Has addon?\n                    </label>\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\">\n                    Currency\n                </label>\n                <input type=\"text\"\n                    class=\"form-control\"\n                    ng-model=\"$ctrl.currencyInput.currency\"\n                    ng-init=\"$ctrl.currencyInput.currency = 'EUR'\" />\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\">\n                    Placeholder\n                </label>\n                <input type=\"text\"\n                    class=\"form-control\"\n                    ng-model=\"$ctrl.currencyInput.placeholder\" />\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\">\n                    Min amount\n                </label>\n                <input type=\"number\"\n                    class=\"form-control\"\n                    ng-model=\"$ctrl.currencyInput.min\"\n                    ng-init=\"$ctrl.currencyInput.min = 10\"\n                    tw-validation />\n            </div>\n            <div class=\"form-group\">\n                <label class=\"control-label\">\n                    Max amount\n                </label>\n                <input type=\"number\"\n                    class=\"form-control\"\n                    ng-model=\"$ctrl.currencyInput.max\"\n                    ng-init=\"$ctrl.currencyInput.max = 100\"\n                    tw-validation />\n            </div>\n            <div class=\"form-group\" ng-init=\"$ctrl.currencyInput.size = 'md'\">\n                <label class=\"control-label\">\n                    Size\n                </label>\n                <tw-select\n                    ng-model=\"$ctrl.currencyInput.size\"\n                    options=\"$ctrl.sizes\" />\n            </div>\n        </div>\n    </div>\n</div>\n</form>\n";

/***/ }),
/* 179 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"date-lookup\">Tw Date Lookup</h4>\n<p>The date lookup is useful for selecting dates that are relatively recent, and\n  can be used in a pair for date ranges.</p>\n<p>If your date is likely to be further in the past (e.g. Date of birth), use\n  twDate instead.</p>\n<div class=\"row m-b-5\">\n  <div class=\"col-sm-6\">\n    <div class=\"form-group\">\n      <label class=\"control-label\">\n        Example date lookup\n      </label>\n      <tw-date-lookup\n        ng-model=\"$ctrl.model\"\n        ng-required=\"$ctrl.dateLookup.required\"\n        ng-disabled=\"$ctrl.dateLookup.disabled\"\n        ng-min=\"$ctrl.dateLookup.min\"\n        ng-max=\"$ctrl.dateLookup.max\"\n        short-date=\"$ctrl.dateLookup.shortDate\"\n        ng-change=\"$ctrl.log('date lookup change: ' + $ctrl.model)\"\n        ng-focus=\"$ctrl.log('date lookup focus')\"\n        ng-blur=\"$ctrl.log('date lookup blur')\"\n        placeholder=\"{{$ctrl.dateLookup.placeholder}}\"\n        locale=\"{{$ctrl.dateLookup.locale}}\"\n        size=\"{{$ctrl.dateLookup.size}}\"\n        label=\"{{$ctrl.dateLookup.label}}\"\n        tw-validation></tw-date-lookup>\n    </div>\n    <h5>Configuration</h5>\n    <pre>\n&lt;tw-date-lookup\n  placeholder=\"{{$ctrl.dateLookup.placeholder}}\"\n  locale=\"{{$ctrl.dateLookup.locale}}\"\n  ng-model={{$ctrl.model}}<span ng-if=\"$ctrl.dateLookup.required\">\n  ng-required=\"{{$ctrl.dateLookup.required}}\"</span><span ng-if=\"$ctrl.dateLookup.disabled\">\n  ng-disabled=\"{{$ctrl.dateLookup.disabled}}\"</span><span ng-if=\"$ctrl.dateLookup.min\">\n  ng-min={{$ctrl.dateLookup.min}}</span><span ng-if=\"$ctrl.dateLookup.max\">\n  ng-max={{$ctrl.dateLookup.max}}</span><span ng-if=\"$ctrl.dateLookup.shortDate\">\n  short-date=\"{{$ctrl.dateLookup.shortDate}}\"</span>\n  ng-change=\"...\"\n  ng-focus=\"...\"\n  ng-blur=\"...\"<span ng-if=\"$ctrl.dateLookup.size\">\n  size={{$ctrl.dateLookup.size}}</span>&gt;\n&lt;/tw-date-lookup&gt;\n    </pre>\n  </div>\n  <div class=\"col-sm-6\">\n    <div class=\"well\">\n      <h5 class=\"page-header\">Edit configuration</h5>\n      <div class=\"form-group\"\n        ng-init=\"$ctrl.dateLookup.placeholder = 'Choose date...'\">\n        <label class=\"control-label\">Placeholder</label>\n        <input type=\"text\"\n          class=\"form-control\"\n          ng-model=\"$ctrl.dateLookup.placeholder\" />\n      </div>\n      <div class=\"form-group\"\n        ng-init=\"$ctrl.dateLookup.locale = 'en-GB'\">\n        <label class=\"control-label\">Locale</label>\n        <tw-select\n          options=\"$ctrl.locales\"\n          ng-model=\"$ctrl.dateLookup.locale\"></tw-select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">Min Date</label>\n        <tw-date-lookup\n          ng-model=\"$ctrl.dateLookup.min\"\n          ng-max=\"$ctrl.dateLookup.max\"\n          placeholder=\"Choose min date...\"\n          locale=\"{{$ctrl.dateLookup.locale}}\"></tw-date-lookup>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">Max Date</label>\n        <tw-date-lookup\n          ng-model=\"$ctrl.dateLookup.max\"\n          ng-min=\"$ctrl.dateLookup.min\"\n          placeholder=\"Choose max date...\"\n          locale=\"{{$ctrl.dateLookup.locale}}\"></tw-date-lookup>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">Size</label>\n        <tw-select\n          placeholder=\"Size...\"\n          ng-model=\"$ctrl.dateLookup.size\"\n          options=\"$ctrl.sizes\"></tw-select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">Inline label</label>\n        <input type=\"text\"\n          class=\"form-control\"\n          ng-model=\"$ctrl.dateLookup.label\" />\n      </div>\n      <div class=\"form-group\">\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox\n              ng-model=\"$ctrl.dateLookup.shortDate\"></tw-checkbox>\n            Short Date?\n          </label>\n        </div>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox\n              ng-model=\"$ctrl.dateLookup.disabled\"></tw-checkbox>\n            Disabled?\n          </label>\n        </div>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox\n              ng-model=\"$ctrl.dateLookup.required\"></tw-checkbox>\n            Required?\n          </label>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ }),
/* 180 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"date\">Date</h4>\n<p>Two way data binding via ng-model, with either a javascript Date object or\n  an ISO8601 String date: 1994-11-05T08:15:30-05:00</p>\n\n<form>\n<div class=\"row m-b-3\">\n  <div class=\"col-md-6\">\n    <div class=\"form-group\">\n      <label class=\"control-label\" for=\"date\">\n        Example date control\n      </label>\n      <tw-date name=\"date\" tw-validation\n        ng-model=\"$ctrl.model\"\n        ng-required=\"$ctrl.date.required\"\n        ng-disabled=\"$ctrl.date.disabled\"\n        ng-change=\"$ctrl.log('date change')\"\n        locale=\"{{$ctrl.date.locale}}\"\n        min=\"1990-01-01\"\n        max=\"2015-12-31\"></tw-date>\n      <div class=\"error-messages\">\n        <div class=\"error-required\">Required</div>\n        <div class=\"error-min\">Too early</div>\n        <div class=\"error-max\">Too late</div>\n      </div>\n      <docs-status-messages></docs-status-messages>\n    </div>\n    <h5>Configuration</h5>\n<pre>&lt;tw-date\n  ng-model=\"{{$ctrl.model}}\"\n  ng-required=\"{{$ctrl.date.required}}\"\n  ng-disabled=\"{{$ctrl.date.disabled}}\"\n  locale=\"{{$ctrl.date.locale}}\"\n  min=\"1990-01-01\"\n  max=\"2015-12-31\"\n  ng-change=\"...\"\n  tw-validation /&gt;</pre>\n  </div>\n  <div class=\"col-md-6\">\n    <div class=\"well\">\n      <h5 class=\"page-header\">\n        Edit configuration\n      </h5>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Required?\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.date.required\" />\n            Is the control required?\n          </label>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Disabled?\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.date.disabled\" />\n            Is the control disabled?\n          </label>\n        </div>\n      </div>\n      <div class=\"form-group\" ng-init=\"$ctrl.date.locale = 'en-GB';\">\n        <label class=\"control-label\">\n          Locale\n        </label>\n        <tw-select\n          options=\"$ctrl.locales\"\n          ng-model=\"$ctrl.date.locale\"\n          ng-init=\"$ctrl.date.locale = 'en-GB'\" />\n      </div>\n      <input type=\"submit\" class=\"btn btn-primary btn-block\" value=\"Submit form\" />\n    </div>\n  </div>\n</div>\n</form>\n";

/***/ }),
/* 181 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"definition-list\" class=\"page-header\">\n  Definition List\n  <a href=\"#definition-list\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h2>\n<p>\n  <code>tw-definition-list</code> is a companion to\n  <code><a href=\"#fieldset\">tw-fieldset</a></code>,\n  it shares the same interface, and same dynamic requirements format, allowing\n  us to display the data model we generated using a fieldset.\n</p>\n<tw-definition-list\n  legend=\"Definition List\"\n  fields=\"$ctrl.fields\"\n  model=\"$ctrl.model\"\n  locale=\"en-GB\"\n  on-refresh-requirements=\"$ctrl.refresh()\">\n</tw-definition-list>\n\n<h5>Configuration</h5>\n<pre>\n&lt;tw-definition-list\n  legend=\"Definition List\"\n  fields=\"$ctrl.fields\"\n  model=\"$ctrl.model\"\n  locale=\"en-GB\"&gt;\n&lt;/tw-definition-list&gt;\n</pre>\n";

/***/ }),
/* 182 */
/***/ (function(module, exports) {

module.exports = "<div class=\"panel\">\n  <div class=\"panel-heading\">\n    <h2 class=\"panel-title\">Form components</h2>\n  </div>\n  <div class=\"panel-body\" ng-init=\"$ctrl.requirementsForm = {}\">\n    <tw-focusable-docs></tw-focusable-docs>\n\n    <hr class=\"m-b-5\" />\n\n    <tw-amount-currency-select-docs\n      model=\"$ctrl.model.components.amount\"\n      currency=\"$ctrl.model.components.amountCurrency\"\n      sizes=\"$ctrl.sizes\">\n    </tw-amount-currency-select-docs>\n\n    <hr class=\"m-b-5\" />\n\n    <tw-checkbox-docs\n      model=\"$ctrl.model.components.checkbox\">\n    </tw-checkbox-docs>\n\n    <hr class=\"m-b-5\" />\n\n    <tw-currency-input-docs\n      model=\"$ctrl.model.components.currencyInput\"\n      sizes=\"$ctrl.sizes\">\n    </tw-currency-input-docs>\n\n    <hr class=\"m-b-5\" />\n\n    <tw-date-docs\n      model=\"$ctrl.model.components.date\"\n      locales=\"$ctrl.locales\"\n      sizes=\"$ctrl.sizes\">\n    </tw-date-docs>\n\n    <hr class=\"m-b-5\" />\n\n    <tw-date-lookup-docs\n      model=\"$ctrl.model.components.dateLookup\"\n      locales=\"$ctrl.locales\"\n      sizes=\"$ctrl.sizes\">\n    </tw-date-lookup-docs>\n\n    <hr class=\"m-b-5\" />\n\n    <tw-form-control-docs\n      model=\"$ctrl.model.components.dynamic\"\n      locales=\"$ctrl.locales\"\n      sizes=\"$ctrl.sizes\">\n    </tw-form-control-docs>\n\n    <hr class=\"m-b-5\" />\n\n    <tw-telephone-docs\n      model=\"$ctrl.model.components.telephone\"\n      locales=\"$ctrl.locales\">\n    </tw-telephone-docs>\n\n    <hr class=\"m-b-5\" />\n\n    <tw-radio-docs\n      model=\"$ctrl.model.components.radio\">\n    </tw-radio-docs>\n\n    <hr class=\"m-b-5\" />\n\n    <tw-requirements-form-docs\n      model=\"$ctrl.requirementsForm\">\n    </tw-requirements-form-docs>\n\n    <hr class=\"m-b-5\" />\n\n    <tw-select-docs\n      model=\"$ctrl.model.components.select\">\n    </tw-select-docs>\n\n    <hr class=\"m-b-5\" />\n\n    <tw-upload-docs\n      model=\"$ctrl.model.components.upload\"\n      sizes=\"$ctrl.sizes\">\n    </tw-upload-docs>\n  </div>\n</div>\n";

/***/ }),
/* 183 */
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Fields</h2>\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <p>The field is the basic building block of our forms, it accepts\n      a set of options to configure it's presentation, and a model\n      to which it will bind a value.</p>\n    <p>The field controls labelling, validation and help text, alongside\n      the rendering of the form control itself.</p>\n  </div>\n  <div class=\"col-md-6\">\n    <h5>Component API</h5>\n<pre>\n&lt;tw-field\nname=\"inputName\"\nfield=\"{...}\"&gt;\nmodel=\"$ctrl.model\"\nlocale=\"'en-GB'\"\non-focus=\"focusHandler()\"\non-blur=\"blurHandler()\"\non-change=\"changeHandler(value)\"&gt;\n&lt;/tw-field&gt;\n</pre>\n  </div>\n</div>\n\n<h4 id=\"types\" class=\"page-header\">\n  Basic types\n  <a href=\"#types\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h4>\n<field-example\n  name=\"stringProperty\"\n  field=\"$ctrl.stringBasic\"\n  model=\"$ctrl.basicTypesModel.stringProperty\">\n</field-example>\n<field-example\n  name=\"numberProperty\"\n  field=\"$ctrl.numberBasic\"\n  model=\"$ctrl.basicTypesModel.numberProperty\">\n</field-example>\n<field-example\n  name=\"booleanProperty\"\n  field=\"$ctrl.booleanBasic\"\n  model=\"$ctrl.basicTypesModel.booleanProperty\">\n</field-example>\n\n<h4 id=\"formats\" class=\"page-header\">\n  Formats\n  <a href=\"#formats\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h4>\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <p>\n      Beyond the basic types, formats can be used to indicate other types\n      of controls are required.  Or to give hints about what type of input\n      is expected.\n    </p>\n    <p>\n      String formats may be used to choose which keyboard type to render\n      on mobile devices e.g. <code>format: number</code> or\n      <code>format: katakana</code>.\n    </p>\n  </div>\n</div>\n<field-example\n  name=\"dateProperty\"\n  field=\"$ctrl.dateBasic\"\n  model=\"$ctrl.basicFormatsModel.dateProperty\">\n</field-example>\n<field-example\n  name=\"phoneProperty\"\n  field=\"$ctrl.phoneBasic\"\n  model=\"$ctrl.basicFormatsModel.phoneProperty\">\n</field-example>\n<field-example\n  name=\"base64urlProperty\"\n  field=\"$ctrl.uploadBasic\"\n  model=\"$ctrl.basicFormatsModel.base64urlProperty\">\n</field-example>\n\n<h4 id=\"selections\" class=\"page-header\">\n  Selections\n  <a href=\"#selections\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h4>\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <p>\n      Often we want the user to choose from a set of values.  By passing an\n      array of <code>values</code> the field will render as a radio selection\n      (3 or less options), or a select box (4 or more options).  To force\n      the display of one or the other, pass <code>control: \"radio\"</code> or\n      <code>control: \"select\"</code>.\n    </p>\n  </div>\n</div>\n<field-example\n  name=\"selectProperty\"\n  field=\"$ctrl.selectBasic\"\n  model=\"$ctrl.selectionsModel.selectProperty\">\n</field-example>\n<field-example\n  name=\"radioProperty\"\n  field=\"$ctrl.radioBasic\"\n  model=\"$ctrl.selectionsModel.radioProperty\">\n</field-example>\n\n<h4 id=\"control-type\"  class=\"page-header\">\n  Forcing control type\n  <a href=\"#control-type\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h4>\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <p>\n      To force display of an alternative control, we can supply a 'control'\n      type. For example, a enumerated value with only two options would\n      normally display as radio buttons, but we can force it to show as\n      a select, using <code>control: \"select\"</code>.\n    </p>\n  </div>\n  <div class=\"col-md-6\">\n    <p>A password is of string type, with no specific format, we can\n      render a password control using <code>control: \"password\"</code>.\n    </p>\n  </div>\n</div>\n<field-example\n  name=\"selectProperty\"\n  field=\"$ctrl.selectOverride\"\n  model=\"$ctrl.override.select\">\n</field-example>\n<field-example\n  name=\"passwordProperty\"\n  field=\"$ctrl.passwordOverride\"\n  model=\"$ctrl.override.password\">\n</field-example>\n<field-example\n  name=\"textareaProperty\"\n  field=\"$ctrl.textareaOverride\"\n  model=\"$ctrl.override.textarea\">\n</field-example>\n<field-example\n  name=\"telephoneProperty\"\n  field=\"$ctrl.telephoneOverride\"\n  model=\"$ctrl.override.telephone\">\n</field-example>\n\n<h4 id=\"async\" class=\"page-header\">\n  Async values\n  <a href=\"#async\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h4>\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <p>\n      Sometimes the list of values is excessively long, or dependent on\n      some other data in the model.  In these cases you can load these\n      values asynchronously.\n    </p>\n  </div>\n</div>\n<field-example\n  name=\"valuesAsyncModel\"\n  field=\"$ctrl.valuesAsync\"\n  model=\"$ctrl.valuesAsyncModel\">\n</field-example>\n\n<h4 id=\"validation\" class=\"page-header\">\n  Validation\n  <a href=\"#validation\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h4>\n<field-example\n  name=\"stringProperty\"\n  field=\"$ctrl.stringValidation\"\n  model=\"$ctrl.validationModel.stringProperty\"\n  on-change=\"$ctrl.log(value)\">\n</field-example>\n<field-example\n  name=\"numberProperty\"\n  field=\"$ctrl.numberValidation\"\n  model=\"$ctrl.validationModel.numberProperty\"\n  on-change=\"$ctrl.log(value)\">\n</field-example>\n<field-example\n  name=\"dateProperty\"\n  field=\"$ctrl.dateValidation\"\n  model=\"$ctrl.validationModel.dateProperty\"\n  on-change=\"$ctrl.log(value)\">\n</field-example>\n\n<!-- <h5>Async validation</h5> -->\n\n<h4 id=\"custom-errors\" class=\"page-header\">\n  Custom errors\n  <a href=\"#custom-errors\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h4>\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <p>\n      When we want to render a custom error, or render an error on page load,\n      we can pass in an additional error message that will be immediately\n      displayed.  When the value of the field changes the error messages\n      (and state) will be removed as we fall back to regular validation.\n    </p>\n  </div>\n  <div class=\"col-md-6\">\n    <p>\n      We can also supply warning messages, it is up to the consumer to\n      show/hide these messages as the value evolves.  Warning messages will\n      be superceded by errors if they both exist at the same time.\n    </p>\n  </div>\n</div>\n<field-example\n  name=\"customErrorsMessage\"\n  field=\"$ctrl.customErrors\"\n  model=\"$ctrl.customErrorsModel\"\n  error-message=\"$ctrl.customErrorsMessage\">\n</field-example>\n<field-example\n  name=\"customWarningMessage\"\n  field=\"$ctrl.customWarning\"\n  model=\"$ctrl.customErrorsModel\"\n  warning-message=\"$ctrl.customWarningMessage\">\n</field-example>\n\n<h4 id=\"help-information\" class=\"page-header\">\n  Help information\n  <a href=\"#help-information\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h4>\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <p>\n      We have a number of ways to show helpful information, this information\n      appears when the control is focused to draw attention.\n    </p>\n  </div>\n</div>\n<field-example\n  name=\"text\"\n  field=\"$ctrl.helpText\"\n  model=\"$ctrl.helpModel.text\">\n</field-example>\n<field-example\n  name=\"list\"\n  field=\"$ctrl.helpList\"\n  model=\"$ctrl.helpModel.list\">\n</field-example>\n<field-example\n  name=\"image\"\n  field=\"$ctrl.helpImage\"\n  model=\"$ctrl.helpModel.image\">\n</field-example>\n\n<h4 id=\"presentation-options\" class=\"page-header\">\n  Presentation options\n  <a href=\"#presentation-options\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h4>\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <p>\n      Some fields have additional presentation options.\n    </p>\n  </div>\n</div>\n<field-example\n  name=\"displayFormat\"\n  field=\"$ctrl.displayFormat\"\n  model=\"$ctrl.presentationModel.displayFormat\">\n</field-example>\n<field-example\n  name=\"uploadOptions\"\n  field=\"$ctrl.uploadComponent\"\n  model=\"$ctrl.presentationModel.uploadOptions\">\n</field-example>\n\n<h4 id=\"field-states\" class=\"page-header\">\n  Field states\n  <a href=\"#field-states\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h4>\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <p>\n      Fields can be disabled or hidden from view.\n    </p>\n  </div>\n</div>\n<field-example\n  name=\"disabledControl\"\n  field=\"$ctrl.disabledControl\"\n  model=\"$ctrl.presentationModel.disabledControl\">\n</field-example>\n<field-example\n  name=\"hiddenControl\"\n  field=\"$ctrl.hiddenControl\"\n  model=\"$ctrl.presentationModel.hiddenControl\">\n</field-example>\n\n<h4 id=\"field-events\" class=\"page-header\">\n  Events\n  <a href=\"#field-events\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h4>\n<field-example\n  name=\"eventsModel\"\n  field=\"$ctrl.stringBasic\"\n  model=\"$ctrl.eventsModel\"\n  on-focus=\"$ctrl.log('focus')\"\n  on-blur=\"$ctrl.log('blur')\"\n  on-change=\"$ctrl.log(value)\">\n</field-example>\n";

/***/ }),
/* 184 */
/***/ (function(module, exports) {

module.exports = "<h2 id=\"fieldsets\" class=\"page-header\">\n  Fieldsets\n  <a href=\"#fieldsets\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h2>\n<div class=\"row\">\n  <div class=\"col-md-6\">\n    <p>Fieldsets represent a collection of fields.  A fieldset can\n      optionally include a title and/or a description.</p>\n    <p>Fieldsets provide a 2-way bound model that is updated as the user\n      interacts.  There is also a 2-way bound 'is-valid' property, that\n      can be useful for enabling/disabling submit buttons.</p>\n  </div>\n  <div class=\"col-md-6\">\n    <h5>Component API</h5>\n<pre>\n&lt;tw-fieldset\ntitle=\"<span ng-non-bindable>{{ fieldset.title }}</span>\"\ndescription=\"<span ng-non-bindable>{{ fieldset.description }}</span>\"\nfields=\"fieldset.fields\"&gt;\nlocale=\"en-GB\"\nmodel=\"{...}\"\nis-valid=\"...\"\non-model-change=\"modelHandler(model)\"\non-field-focus=\"focusHandler(key, field)\"\non-field-blur=\"blurHandler(key, field)\"\non-field-change=\"changeHandler(value, key, field)\"&gt;\n&lt;/tw-fieldset&gt;\n</pre>\n  </div>\n</div>\n\n<h4 id=\"fieldset-basic\" class=\"page-header\">\n  Basic example\n  <a href=\"#fieldset-basic\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h4>\n<fieldset-example\n  requirements=\"$ctrl.fieldsetBasic\"\n  model=\"$ctrl.fieldsetBasicModel\">\n</fieldset-example>\n\n<h4 id=\"fieldset-title\" class=\"page-header\">\n  Title &amp; description\n  <a href=\"#fieldset-title\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h4>\n<fieldset-example\n  requirements=\"$ctrl.fieldsetOptions\"\n  model=\"$ctrl.fieldsetOptionsModel\">\n</fieldset-example>\n\n<h4 id=\"fieldset-events\" class=\"page-header\">\n  Events\n  <a href=\"#fieldset-events\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h4>\n<fieldset-example\n  requirements=\"$ctrl.fieldsetBasic\"\n  model=\"$ctrl.fieldsetBasicModel\"\n  on-model-change=\"$ctrl.log(model)\"\n  on-field-focus=\"$ctrl.log('focus: ' + key)\"\n  on-field-blur=\"$ctrl.log('blur: ' + key)\"\n  on-field-change=\"$ctrl.onFieldChange(value, key, field)\">\n</fieldset-example>\n\n<h4 id=\"fieldset-layout\" class=\"page-header\">\n  Layout\n  <a href=\"#fieldset-layout\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h4>\n<fieldset-example\n  requirements=\"$ctrl.fieldsetLayout\"\n  model=\"$ctrl.fieldsetLayoutModel\">\n</fieldset-example>\n\n<h4 id=\"fieldset-full\" class=\"page-header\">\n  All field types\n  <a href=\"#fieldset-full\" class=\"pull-xs-right\">\n    <span class=\"glyphicon glyphicon-link\"></span>\n  </a>\n</h4>\n\n<fieldset-example\n  requirements=\"$ctrl.fieldsetFull\"\n  model=\"$ctrl.fieldsetFullModel\"\n  on-model-change=\"$ctrl.log(model)\"\n  on-field-focus=\"$ctrl.log('focus: ' + key)\"\n  on-field-blur=\"$ctrl.log('blur: ' + key)\"\n  on-field-change=\"$ctrl.onFieldChange(value, key, field)\"\n  on-refresh-requirements=\"$ctrl.refresh()\">\n</fieldset-example>\n\n<tw-definition-list-docs\n  model=\"$ctrl.fieldsetFullModel\"\n  fields=\"$ctrl.fieldsetFull.fields\">\n</tw-definition-list-docs>\n";

/***/ }),
/* 185 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"focusable\">Focusable</h4>\n<p><code>tw-focusable</code> is a simple attribute based directive that aids\n  styling during focus events.  Whenever an HTML element with tw-focusable\n  is focussed it will look for a parent <code>.form-group</code> then find\n  any <code>.control-label</code> inside of it, and apply a <code>.focus</code>\n  class.</p>\n<p>This attribute is automatically applied to controls using the standard\n  Bootstrap <code>.form-control</code> class, but can be particularly useful\n  for custom controls.  For example, our custom select box uses a button to\n  facillitate <code>:focus</code>, we can apply tw-focusable to make sure the\n  associated label receives the right focus state.</p>\n<p>Note: <code>[tw-focusable]</code> is built into custom components so\n  there's no need to add it.</p>\n\n<div class=\"m-b-3\">\n  <div class=\"form-group\">\n    <label class=\"control-label\">Label</label>\n    <input type=\"text\" class=\"form-control\" tw-focusable />\n  </div>\n<pre>\n&lt;div class=\"form-group\"&gt;\n  &lt;label class=\"control-label\"&gt;Label&lt;/label&gt;\n  &lt;input type=\"text\" class=\"form-control\" tw-focusable /&gt;\n&lt;/div&gt;\n</pre>\n\n  <div class=\"form-group\">\n    <label class=\"control-label\">Label</label>\n    <div class=\"form-control\" contenteditable tw-focusable></div>\n  </div>\n<pre>\n&lt;div class=\"form-group\"&gt;\n  &lt;label class=\"control-label\"&gt;Label&lt;/label&gt;\n  &lt;div contenteditable tw-focusable class=\"form-control\" /&gt;\n&lt;/div&gt;\n</pre>\n\n</div>\n";

/***/ }),
/* 186 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"form-control\">Form control</h4>\n<p>The dynamic form control is a form control that can\n  be fully configured based on a set of parameters.</p>\n<p>This control can be used as the basis for a fully\n  dynamic form based on an external specification.</p>\n\n<form>\n<div class=\"row m-b-3\">\n  <div class=\"col-md-6\">\n    <div class=\"form-group\">\n      <label class=\"control-label\" for=\"dynamic\">\n        Example form control\n      </label>\n      <tw-form-control\n        name=\"dynamic\"\n        type=\"{{$ctrl.dynamic.type}}\"\n        placeholder=\"{{$ctrl.dynamic.placeholder}}\"\n        options=\"$ctrl.dynamic.options\"\n        locale=\"{{$ctrl.dynamic.locale}}\"\n        ng-model=\"$ctrl.model\"\n        ng-required=\"$ctrl.dynamic.required\"\n        ng-disabled=\"$ctrl.dynamic.disabled\"\n        ng-minlength=\"$ctrl.dynamic.minlength\"\n        ng-maxlength=\"$ctrl.dynamic.maxlength\"\n        ng-pattern=\"$ctrl.dynamic.pattern\"\n        ng-min=\"$ctrl.dynamic.min\"\n        ng-max=\"$ctrl.dynamic.max\"\n        ng-change=\"$ctrl.log('form control change')\"\n        ng-focus=\"$ctrl.log('form control focus')\"\n        ng-blur=\"$ctrl.log('form control blur')\"\n        upload-options=\"$ctrl.dynamic.uploadOptions\"\n        tw-validation></tw-form-control>\n      <div class=\"error-messages\">\n        <div class=\"error-required\">\n          Required\n        </div>\n        <div class=\"error-minlength\">\n          Must be at least {{$ctrl.dynamic.minlength}} characters\n        </div>\n        <div class=\"error-maxlength\">\n          Must not be longer than {{$ctrl.dynamic.maxlength}} characters\n        </div>\n        <div class=\"error-min\">\n          Must be at least {{$ctrl.dynamic.min}}\n        </div>\n        <div class=\"error-max\">\n          Must not be higher than {{$ctrl.dynamic.max}}\n        </div>\n        <div class=\"error-pattern\">\n          Invalid characters\n        </div>\n        <div class=\"error-number\">\n          Must be a number\n        </div>\n      </div>\n      <docs-status-messages></docs-status-messages>\n    </div>\n\n    <h5>Configuration</h5>\n<pre>&lt;tw-form-control\n  type=\"{{$ctrl.dynamic.type}}\"<span\n    ng-if=\"$ctrl.dynamic.type !== 'radio' && $ctrl.dynamic.type !== 'date'\">\n  placeholder=\"{{$ctrl.dynamic.placeholder}}\"</span><span\n    ng-if=\"$ctrl.dynamic.type === 'radio' || $ctrl.dynamic.type === 'select'\">\n  options=\"{{$ctrl.dynamic.options}}\"</span><span ng-if=\"$ctrl.dynamic.type === 'date'\">\n  locale=\"{{$ctrl.dynamic.locale}}\"</span>\n  ng-model=\"{{$ctrl.model}}\"<span ng-if=\"$ctrl.dynamic.required\">\n  ng-required=\"{{$ctrl.dynamic.required}}\"</span><span ng-if=\"$ctrl.dynamic.disabled\">\n  ng-disabled=\"{{$ctrl.dynamic.disabled}}\"</span><span ng-if=\"$ctrl.dynamic.type === 'text'\"><span\n    ng-if=\"$ctrl.dynamic.minlength\">\n  ng-minlength=\"{{$ctrl.dynamic.minlength}}\"</span><span ng-if=\"$ctrl.dynamic.maxlength\">\n  ng-maxlength=\"{{$ctrl.dynamic.maxlength}}\"</span><span ng-if=\"$ctrl.dynamic.pattern\">\n  ng-pattern=\"{{$ctrl.dynamic.pattern}}\"</span></span><span\n    ng-if=\"$ctrl.dynamic.type === 'number' || $ctrl.dynamic.type === 'date'\"><span\n    ng-if=\"$ctrl.dynamic.min\">\n  ng-min=\"{{$ctrl.dynamic.min}}\"</span><span ng-if=\"$ctrl.dynamic.max\">\n  ng-max=\"{{$ctrl.dynamic.max}}\"</span></span>\n  ng-change='...'\n  ng-focus='...'\n  ng-blur='...'<span ng-if=\"$ctrl.dynamic.type === 'upload'\">\n  upload-options=\"{{$ctrl.dynamic.uploadOptions}}\"</span>\n  tw-validation&gt;\n&lt;/tw-form-control&gt;</pre>\n  </div>\n  <div class=\"col-md-6\">\n    <div class=\"well\">\n      <h5 class=\"page-header\">\n        Edit configuration\n      </h5>\n\n      <div class=\"form-group\" ng-init=\"$ctrl.dynamic.type = 'text';\">\n        <label class=\"control-label\">\n          Type\n        </label>\n        <tw-select\n          options=\"$ctrl.dynamic.types\"\n          ng-model=\"$ctrl.dynamic.type\"\n          ng-change=\"$ctrl.model = null\">\n        </tw-select>\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Required?\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.dynamic.required\" />\n            Is the control required?\n          </label>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Disabled?\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.dynamic.disabled\" />\n            Is the control disabled?\n          </label>\n        </div>\n      </div>\n\n      <div class=\"form-group\"\n        ng-if=\"$ctrl.dynamic.type === 'text'\">\n        <label class=\"control-label\">\n          Min/Max length\n        </label>\n        <div class=\"row\">\n          <div class=\"col-xs-6\">\n            <input type=\"number\"\n              class=\"form-control\"\n              placeholder=\"Minlength\"\n              ng-model=\"$ctrl.dynamic.minlength\" />\n          </div>\n          <div class=\"col-xs-6\">\n            <input type=\"number\"\n              class=\"form-control\"\n              placeholder=\"Maxlength\"\n              ng-model=\"$ctrl.dynamic.maxlength\" />\n          </div>\n        </div>\n      </div>\n\n      <div class=\"form-group\"\n        ng-if=\"$ctrl.dynamic.type === 'text'\">\n        <label class=\"control-label\">\n          Pattern\n        </label>\n        <input type=\"text\"\n          class=\"form-control\"\n          placeholder=\"e.g. [a-z]+\"\n          ng-model=\"$ctrl.dynamic.pattern\"\n          validate-regexp tw-validation />\n        <div class=\"error-messages\">\n          <div class=\"error-async\">Invalid regex</div>\n        </div>\n      </div>\n\n      <div class=\"form-group\"\n        ng-if=\"$ctrl.dynamic.type === 'number'\">\n        <label class=\"control-label\">\n          Min/Max\n        </label>\n        <div class=\"row\">\n          <div class=\"col-xs-6\">\n            <input type=\"number\"\n              class=\"form-control\"\n              placeholder=\"Min\"\n              ng-model=\"$ctrl.dynamic.min\" />\n          </div>\n          <div class=\"col-xs-6\">\n            <input type=\"number\"\n              class=\"form-control\"\n              placeholder=\"Max\"\n              ng-model=\"$ctrl.dynamic.max\" />\n          </div>\n        </div>\n      </div>\n\n      <div class=\"form-group\"\n        ng-if=\"$ctrl.dynamic.type === 'date'\">\n        <label class=\"control-label\">\n          Min/Max ('YYYY-mm-dd')\n        </label>\n        <div class=\"row\">\n          <div class=\"col-xs-6\">\n            <input type=\"text\"\n              class=\"form-control\"\n              placeholder=\"Min\"\n              ng-model=\"$ctrl.dynamic.min\" />\n          </div>\n          <div class=\"col-xs-6\">\n            <input type=\"text\"\n              class=\"form-control\"\n              placeholder=\"Max\"\n              ng-model=\"$ctrl.dynamic.max\" />\n          </div>\n        </div>\n      </div>\n\n      <div class=\"form-group\" ng-if=\"$ctrl.dynamic.type === 'date'\">\n        <label class=\"control-label\">\n          Locale\n        </label>\n        <tw-select\n          options=\"$ctrl.locales\"\n          ng-model=\"$ctrl.dynamic.locale\"\n          ng-init=\"$ctrl.dynamic.locale='en-GB'\" />\n      </div>\n\n      <div class=\"form-group\"\n        ng-if=\"$ctrl.dynamic.type !== 'radio' && $ctrl.dynamic.type !== 'date'\">\n        <label class=\"control-label\">\n          Placeholder\n        </label>\n        <input type=\"text\"\n          class=\"form-control\"\n          ng-model=\"$ctrl.dynamic.placeholder\"\n          ng-init=\"$ctrl.dynamic.placeholder = 'Example'\" />\n      </div>\n\n      <div class=\"form-group\"\n        ng-if=\"$ctrl.dynamic.type === 'upload'\">\n        <label class=\"control-label\">\n          Upload Button Text\n        </label>\n        <input type=\"text\"\n          class=\"form-control\"\n          ng-model=\"$ctrl.dynamic.uploadOptions.buttonText\"\n          ng-init=\"$ctrl.dynamic.uploadOptions.buttonText = 'Upload a file'\" />\n      </div>\n      <input type=\"submit\" class=\"btn btn-primary btn-block\" value=\"Submit form\" />\n    </div>\n  </div>\n</div>\n</form>\n";

/***/ }),
/* 187 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"radio\">Radio</h4>\n\n<form>\n<div class=\"row m-b-3\">\n  <div class=\"col-md-6\">\n    <div class=\"form-group\">\n      <label class=\"control-label\">\n        TW Radio<span ng-if=\"$ctrl.radio.required\">*</span>\n      </label>\n      <div class=\"radio\">\n        <label>\n          <tw-radio name=\"myRadio\" tw-validation value=\"one\"\n            ng-value=\"$ctrl.radio.useNgValue ? 1 : null\"\n            ng-model=\"$ctrl.model\"\n            ng-required=\"$ctrl.radio.required\"\n            ng-disabled=\"$ctrl.radio.disabled\"\n            ng-click=\"$ctrl.log('radio 1 click')\"\n            ng-change=\"$ctrl.log('radio 1 change')\"\n            ng-blur=\"$ctrl.log('radio 1 blur')\"\n            ng-focus=\"$ctrl.log('radio 1 focus')\" />\n          Option 1\n        </label>\n      </div>\n      <div class=\"radio\">\n        <label>\n          <tw-radio name=\"myRadio\" tw-validation value=\"two\"\n            ng-value=\"$ctrl.radio.useNgValue ? 2 : null\"\n            ng-model=\"$ctrl.model\"\n            ng-required=\"$ctrl.radio.required\"\n            ng-disabled=\"$ctrl.radio.disabled\"\n            ng-click=\"$ctrl.log('radio 2 click')\"\n            ng-change=\"$ctrl.log('radio 2 change')\"\n            ng-blur=\"$ctrl.log('radio 2 blur')\"\n            ng-focus=\"$ctrl.log('radio 2 focus')\" />\n          Option 2\n        </label>\n      </div>\n    </div>\n    <h5>Configuration</h5>\n<pre>&lt;tw-radio\n  name=\"myRadio\"<span ng-if=\"!$ctrl.radio.useNgValue\">\n  value=\"one\"</span><span ng-if=\"$ctrl.radio.useNgValue\">\n  ng-value=\"1\"</span>\n  ng-model=\"{{$ctrl.model}}\"\n  ng-required=\"{{$ctrl.radio.required}}\"\n  ng-disabled=\"{{$ctrl.radio.disabled}}\"\n  ng-change=\"...\"\n  ng-focus=\"...\"\n  ng-blur=\"...\"\n  tw-validation /&gt;</pre>\n  </div>\n  <div class=\"col-md-6\">\n    <div class=\"well\">\n      <h5 class=\"page-header\">\n        Edit configuration\n      </h5>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Required?\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.radio.required\" />\n            Is the control required?\n          </label>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Disabled?\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.radio.disabled\" />\n            Is the control disabled?\n          </label>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Non string values?\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.radio.useNgValue\" />\n            Uses ngValue\n          </label>\n        </div>\n      </div>\n      <input type=\"submit\" class=\"btn btn-primary btn-block\" value=\"Submit form\" />\n    </div>\n  </div>\n</div>\n<table class=\"table\"><thead>\n    <tr>\n      <th colspan=\"2\">Classes &amp; styles</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td><code>.tw-radio-button</code></td>\n      <td><button class=\"tw-radio-button\"><span class=\"tw-radio-check\"></span></button></td>\n    </tr>\n    <tr>\n      <td><code>.tw-radio-button:focus</code></td>\n      <td><button class=\"tw-radio-button focus\"><span class=\"tw-radio-check\"></span></button></td>\n    </tr>\n    <tr>\n      <td><code>.tw-radio-button.checked</code></td>\n      <td><button class=\"tw-radio-button checked\" ><span class=\"tw-radio-check\"></span></button></td>\n    </tr>\n    <tr>\n      <td><code>.tw-radio-button[disabled]</code></td>\n      <td><button class=\"tw-radio-button\" disabled><span class=\"tw-radio-check\"></span></button></td>\n    </tr>\n    <tr>\n      <td><code>.tw-radio-button.checked[disabled]</code></td>\n      <td><button class=\"tw-radio-button checked\" disabled><span class=\"tw-radio-check\"></span></button></td>\n    </tr>\n    <tr>\n      <td><code>.tw-radio-button.has-error </code></td>\n      <td><button class=\"tw-radio-button has-error\"><span class=\"tw-radio-check\"></span></button></td>\n    </tr>\n    <tr>\n      <td><code>.tw-radio-button.has-error.checked</code></td>\n      <td><button class=\"tw-radio-button has-error checked\"><span class=\"tw-radio-check\"></span></button></td>\n    </tr>\n    <tr>\n      <td><code>.tw-radio-button.has-error.checked[disabled]</code></td>\n      <td><button class=\"tw-radio-button has-error checked\" disabled><span class=\"tw-radio-check\"></span></button></td>\n    </tr>\n  </tbody>\n</table>\n</form>\n";

/***/ }),
/* 188 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"requirements-form\">Requirements form</h4>\n<p>The requirements form uses the dynamic form control to build a fully featured form.\n  It accepts a model object which it permutes based on a set of requirements.\n  The requirements object should match that returned by the TransferWise API</p>\n\n<form novalidate>\n  <div class=\"well\">\n    <h5 class=\"page-header\">\n      Edit configuration\n    </h5>\n\n    <div class=\"form-group\">\n      <label class=\"control-label\">\n        Example form\n      </label>\n      <tw-select\n        options=\"$ctrl.types\"\n        ng-model=\"$ctrl.type\">\n      </tw-select>\n    </div>\n  </div>\n  <div class=\"m-b-3\">\n    <tw-requirements-form\n      requirements=\"$ctrl.requirements\"\n      model=\"$ctrl.model\"\n      on-refresh-requirements=\"$ctrl.onRefreshRequirements()\"\n      upload-options=\"{\n        buttonText: 'Choose file...',\n        cancelText: 'Choose a different file?'\n      }\"\n      validation-messages=\"{\n        required: 'Required',\n        pattern: 'Incorrect format',\n        minlength: 'The value is too short',\n        maxlength: 'The value is too long',\n        min: 'The value is too low',\n        max: 'The value is too high'\n      }\"\n      error-messages=\"$ctrl.errorMessages\"\n      is-valid=\"$ctrl.isValid\"></tw-requirements-form>\n    <hr />\n    <div class=\"btn-toolbar m-b-panel\">\n      <button type=\"submit\" class=\"btn btn-primary\">\n        Submit form\n      </button>\n    </div>\n\n    <h5>Configuration</h5>\n<pre>&lt;tw-requirements-form\n  requirements=\"$ctrl.requirements\"\n  model=\"{{$ctrl.model | json}}\"\n  on-refresh-requirements=\"$ctrl.onRefreshRequirements()\"\n  upload-options=\"{\n    buttonText: 'Choose file...',\n    cancelText: 'Choose a different file'\n  }\"\n  validation-messagess=\"{\n    required: 'Required',\n    pattern: 'Incorrect format',\n    minlength: 'The value is too short',\n    maxlength: 'The value is too long',\n    min: 'The value is too low',\n    max: 'The value is too high'\n  }\"\n  is-valid='{{$ctrl.isValid}}'&gt;&lt;/tw-requirements-form&gt;</pre>\n  </div>\n</form>\n";

/***/ }),
/* 189 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"select\">Select</h4>\n<p>Styled select box replacement, supporting the majority of the\n  standard HTML interface for a select.  The select box\n  has full keyboard support matching native behaviour.</p>\n<p>The select box also maintains a hidden form input with the\n  given name to be compatible with HTML form posts.</p>\n\n<p class=\"alert alert-info\">The select component depends\n  on dropwdown.js from Bootstrap.</p>\n\n<form>\n<div class=\"row m-b-3\" ng-init=\"$ctrl.select.type = 'currencies'\">\n  <div class=\"col-md-6\">\n    <div class=\"form-group\">\n      <label class=\"control-label\" for=\"mySelect\">\n        Example select\n      </label>\n      <tw-select tw-validation ng-if=\"!$ctrl.select.extraLink\"\n        name=\"mySelect\"\n        placeholder=\"{{$ctrl.select.empty}}\"\n        ng-model=\"$ctrl.model\"\n        ng-change=\"$ctrl.log('select change, val: '+$ctrl.model)\"\n        ng-required=\"$ctrl.select.required\"\n        ng-disabled=\"$ctrl.select.disabled\"\n        ng-focus=\"$ctrl.log('select focus')\"\n        ng-blur=\"$ctrl.log('select blur')\"\n        options=\"$ctrl.select.options[$ctrl.select.type]\"\n        filter=\"{{$ctrl.select.showFilter}}\"\n        size=\"{{$ctrl.select.size}}\"\n        dropdown-right=\"{{$ctrl.select.dropdownRight}}\"\n        dropdown-width=\"{{$ctrl.select.dropdownWidth}}\"\n        dropdown-up=\"{{$ctrl.select.dropdownUp}}\"\n        inverse=\"$ctrl.select.inverse\"\n        hide-note=\"{{$ctrl.select.hideNote}}\"\n        hide-secondary=\"{{$ctrl.select.hideSecondary}}\"\n        hide-icon=\"{{$ctrl.select.hideIcon}}\"\n        hide-currency=\"{{$ctrl.select.hideCurrency}}\"\n        hide-circle=\"{{$ctrl.select.hideCircle}}\"\n        hide-label=\"{{$ctrl.select.hideLabel}}\">\n      </tw-select>\n      <tw-select tw-validation ng-if=\"$ctrl.select.extraLink\"\n        name=\"mySelect\"\n        placeholder=\"{{$ctrl.select.empty}}\"\n        ng-model=\"$ctrl.model\"\n        ng-change=\"$ctrl.log('select change, val: '+$ctrl.model)\"\n        ng-required=\"$ctrl.select.required\"\n        ng-disabled=\"$ctrl.select.disabled\"\n        ng-focus=\"$ctrl.log('select focus')\"\n        ng-blur=\"$ctrl.log('select blur')\"\n        options=\"$ctrl.select.options[$ctrl.select.type]\"\n        filter=\"{{$ctrl.select.showFilter}}\"\n        size=\"{{$ctrl.select.size}}\"\n        dropdown-right=\"{{$ctrl.select.dropdownRight}}\"\n        dropdown-up=\"{{$ctrl.select.dropdownUp}}\"\n        dropdown-width=\"{{$ctrl.select.dropdownWidth}}\"\n        inverse=\"$ctrl.select.inverse\"\n        hide-note=\"{{$ctrl.select.hideNote}}\"\n        hide-secondary=\"{{$ctrl.select.hideSecondary}}\"\n        hide-icon=\"{{$ctrl.select.hideIcon}}\"\n        hide-currency=\"{{$ctrl.select.hideCurrency}}\"\n        hide-circle=\"{{$ctrl.select.hideCircle}}\"\n        hide-label=\"{{$ctrl.select.hideLabel}}\">\n        <a href=\"\" ng-click=\"$ctrl.log('click')\">\n          Custom action\n        </a>\n      </tw-select>\n\n\n      <div class=\"error-messages\">\n        <div class=\"error-required\">Required</div>\n      </div>\n      <docs-status-messages></docs-status-messages>\n    </div>\n\n    <div class=\"form-inline m-b-3 visible-xs-inline-block visible-sm-inline-block\n      visible-md-inline-block visible-lg-inline-block visible-xl-inline-block\">\n      <tw-select tw-validation ng-if=\"!$ctrl.select.extraLink\"\n        name=\"mySelect\"\n        placeholder=\"{{$ctrl.select.empty}}\"\n        ng-model=\"$ctrl.model\"\n        ng-change=\"$ctrl.log('select change, val: '+$ctrl.model)\"\n        ng-required=\"$ctrl.select.required\"\n        ng-disabled=\"$ctrl.select.disabled\"\n        ng-focus=\"$ctrl.log('select focus')\"\n        ng-blur=\"$ctrl.log('select blur')\"\n        options=\"$ctrl.select.options[$ctrl.select.type]\"\n        filter=\"{{$ctrl.select.showFilter}}\"\n        size=\"{{$ctrl.select.size}}\"\n        dropdown-right=\"{{$ctrl.select.dropdownRight}}\"\n        dropdown-up=\"{{$ctrl.select.dropdownUp}}\"\n        dropdown-width=\"{{$ctrl.select.dropdownWidth}}\"\n        inverse=\"$ctrl.select.inverse\"\n        hide-note=\"{{$ctrl.select.hideNote}}\"\n        hide-secondary=\"{{$ctrl.select.hideSecondary}}\"\n        hide-icon=\"{{$ctrl.select.hideIcon}}\"\n        hide-currency=\"{{$ctrl.select.hideCurrency}}\"\n        hide-circle=\"{{$ctrl.select.hideCircle}}\"\n        hide-label=\"{{$ctrl.select.hideLabel}}\">\n      </tw-select>\n      <tw-select tw-validation ng-if=\"$ctrl.select.extraLink\"\n        name=\"mySelect\"\n        placeholder=\"{{$ctrl.select.empty}}\"\n        ng-model=\"$ctrl.model\"\n        ng-change=\"$ctrl.log('select change, val: '+$ctrl.model)\"\n        ng-required=\"$ctrl.select.required\"\n        ng-disabled=\"$ctrl.select.disabled\"\n        ng-focus=\"$ctrl.log('select focus')\"\n        ng-blur=\"$ctrl.log('select blur')\"\n        options=\"$ctrl.select.options[$ctrl.select.type]\"\n        filter=\"{{$ctrl.select.showFilter}}\"\n        size=\"{{$ctrl.select.size}}\"\n        dropdown-right=\"{{$ctrl.select.dropdownRight}}\"\n        dropdown-up=\"{{$ctrl.select.dropdownUp}}\"\n        dropdown-width=\"{{$ctrl.select.dropdownWidth}}\"\n        inverse=\"$ctrl.select.inverse\"\n        hide-note=\"{{$ctrl.select.hideNote}}\"\n        hide-secondary=\"{{$ctrl.select.hideSecondary}}\"\n        hide-icon=\"{{$ctrl.select.hideIcon}}\"\n        hide-currency=\"{{$ctrl.select.hideCurrency}}\"\n        hide-circle=\"{{$ctrl.select.hideCircle}}\"\n        hide-label=\"{{$ctrl.select.hideLabel}}\">\n      </tw-select>\n    </div>\n\n    <h5>Configuration</h5>\n<pre>&lt;tw-select\n  name=\"mySelect\"\n  placeholder=\"{{$ctrl.select.empty}}\"<span ng-if=\"$ctrl.select.showFilter\">\n  filter=\"Search...\"</span>\n  ng-model=\"{{$ctrl.model}}\"\n  ng-required=\"{{$ctrl.select.required}}\"\n  ng-disabled=\"{{$ctrl.select.disabled}}\"\n  ng-change=\"...\"\n  ng-focus=\"...\"\n  ng-blur=\"...\"<span ng-if=\"$ctrl.select.size\">\n  size=\"{{$ctrl.select.size}}\"</span><span ng-if=\"$ctrl.select.inverse\">\n  inverse=\"{{$ctrl.select.inverse}}\"</span><span ng-if=\"$ctrl.select.dropdownRight\">\n  dropdown-right=\"{{$ctrl.select.dropdownRight}}\"</span><span ng-show=\"$ctrl.select.dropdownUp\">\n  dropdown-up=\"{{$ctrl.select.dropdownUp}}\"</span><span ng-if=\"$ctrl.select.dropdownWidth\">\n  dropdown-width=\"{{$ctrl.select.dropdownWidth}}\"</span><span ng-if=\"$ctrl.select.hideNote\">\n  hide-note=\"{{$ctrl.select.hideNote}}\"</span><span ng-if=\"$ctrl.select.hideSecondary\">\n  hide-secondary=\"{{$ctrl.select.hideSecondary}}\"</span><span ng-if=\"$ctrl.select.hideIcon\">\n  hide-icon=\"{{$ctrl.select.hideIcon}}\"</span><span ng-if=\"$ctrl.select.hideCurrency\">\n  hide-currency=\"{{$ctrl.select.hideCurrency}}\"</span><span ng-if=\"$ctrl.select.hideCircle\">\n  hide-circle=\"{{$ctrl.select.hideCircle}}\"</span><span ng-show=\"$ctrl.select.hideLabel\">\n  hide-label=\"{{$ctrl.select.hideLabel}}\"</span>\n  options=\"{{$ctrl.select.options[$ctrl.select.type] | json}}\"\n  tw-validation<span ng-if=\"!$ctrl.select.extraLink\"> /&gt;</span><span ng-if=\"$ctrl.select.extraLink\">&gt;\n    &lt;a href='' ng-click='...'&gt;\n      Custom action\n    &lt;/a&gt;\n  &lt;/tw-select&gt;</span>\n</pre>\n  </div>\n  <div class=\"col-md-6\">\n    <div class=\"well\">\n      <h5 class=\"page-header\">\n        Edit configuration\n      </h5>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Required?\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.select.required\" />\n            Is the control required?\n          </label>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Disabled?\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.select.disabled\" />\n            Is the control disabled?\n          </label>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Empty value\n        </label>\n        <input class=\"form-control\"\n          ng-model=\"$ctrl.select.empty\" />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Options type\n        </label>\n        <tw-select options=\"$ctrl.select.types\" ng-model=\"$ctrl.select.type\" />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Show filter?\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox\n              ng-model=\"$ctrl.select.showFilter\"\n              ng-true-value=\"'Search...'\"\n              ng-false-value=\"false\" />\n            Allow user to filter list?\n          </label>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Additional link?\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.select.extraLink\" />\n            Option with custom action?\n          </label>\n        </div>\n      </div>\n      <div class=\"form-group m-b-2\">\n        <label class=\"control-label\">\n          Presentation config\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.select.inverse\" />\n            Invert the colours?\n          </label>\n        </div>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.select.dropdownUp\" />\n            Make the dropdown open upward\n          </label>\n        </div>\n      </div>\n      <div class=\"form-group m-b-2\">\n        <tw-select\n          placeholder=\"Button size...\"\n          ng-model=\"$ctrl.select.size\"\n          options=\"$ctrl.buttonSizes\"></tw-select>\n      </div>\n      <div class=\"form-group m-b-2\">\n        <tw-select\n          placeholder=\"Dropdown width...\"\n          ng-model=\"$ctrl.select.dropdownWidth\"\n          options=\"$ctrl.dropdownSizes\"></tw-select>\n      </div>\n      <div class=\"form-group m-b-2\">\n        <tw-select\n          placeholder=\"Dropdown on right...\"\n          ng-model=\"$ctrl.select.dropdownRight\"\n          options=\"$ctrl.gridSizes\"></tw-select>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Hide selected circle?</label>\n        <tw-select\n          placeholder=\"Choose breakpoint\"\n          ng-model=\"$ctrl.select.hideCircle\"\n          options=\"$ctrl.hideOptions\"></tw-select>\n      </div>\n      <div class=\"form-group\">\n        <label>Hide selected note?</label>\n        <tw-select\n          placeholder=\"Choose breakpoint\"\n          ng-model=\"$ctrl.select.hideNote\"\n          options=\"$ctrl.hideOptions\"></tw-select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">Hide selected secondary text?</label>\n        <tw-select\n          placeholder=\"Choose breakpoint\"\n          ng-model=\"$ctrl.select.hideSecondary\"\n          options=\"$ctrl.hideOptions\"></tw-select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">Hide selected currency flag?</label>\n        <tw-select\n          placeholder=\"Choose breakpoint\"\n          ng-model=\"$ctrl.select.hideCurrency\"\n          options=\"$ctrl.hideOptions\"></tw-select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">Hide selected icon?</label>\n        <tw-select\n          placeholder=\"Choose breakpoint\"\n          ng-model=\"$ctrl.select.hideIcon\"\n          options=\"$ctrl.hideOptions\"></tw-select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">Hide selected label?</label>\n        <tw-select\n          placeholder=\"Choose breakpoint\"\n          ng-model=\"$ctrl.select.hideLabel\"\n          options=\"$ctrl.hideOptions\"></tw-select>\n      </div>\n      <input type=\"submit\" class=\"btn btn-primary btn-block\" value=\"Submit form\" />\n    </div>\n  </div>\n</div>\n</form>\n";

/***/ }),
/* 190 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"telephone\">Telephone</h4>\n<p>A control for inputting telephone numbers.  While the control allows common\n  special characters (spaces, periods, hyphens), these are stripped from the\n  resulting model, which always begins with a '+' and contains the numerals\n  without ornamentation e.g. +1234567890.</p>\n<p>When prefilled with an existing value, the select box will choose the longest\n  matching prefix.  For example, '+1684123456' will select '+1684' (American Samoa),\n  not '+1' (United States).</p>\n\n<form>\n<div class=\"row m-b-3\">\n  <div class=\"col-md-6\">\n    <div class=\"form-group\">\n      <label class=\"control-label\" for=\"telephone\">\n        Example phone number control\n      </label>\n      <tw-telephone\n        name=\"telephone\"\n        ng-model=\"$ctrl.model\"\n        ng-change=\"$ctrl.log($ctrl.model)\"\n        ng-required=\"$ctrl.telephone.required\"\n        ng-disabled=\"$ctrl.telephone.disabled\"\n        locale=\"{{ $ctrl.locale }}\"\n        placeholder=\"{{ $ctrl.placeholder }}\"\n        search-placeholder=\"Prefix\">\n      </tw-telephone>\n      <div class=\"error-messages\">\n        <div class=\"error-required\">Required</div>\n        <div class=\"error-pattern\">Invalid characters</div>\n        <div class=\"error-minlength\">Too short</div>\n      </div>\n\n      <docs-status-messages></docs-status-messages>\n    </div>\n    <h5>Configuration</h5>\n<pre>&lt;tw-telephone\n  ng-model=\"{{ $ctrl.model }}\"<span ng-if=\"$ctrl.telephone.required\">\n  ng-required=\"{{ $ctrl.telephone.required }}\"</span><span ng-if=\"$ctrl.telephone.disabled\">\n  ng-disabled=\"{{ $ctrl.telephone.disabled }}\"</span>\n  ng-change=\"$ctrl.log($ctrl.model)\"\n  locale=\"{{ $ctrl.locale }}\"\n  placeholder=\"{{ $ctrl.placeholder }}\"\n  search-placeholder=\"Prefix\"\n  tw-validation /&gt;</pre>\n  </div>\n  <div class=\"col-md-6\">\n    <div class=\"well\">\n      <h5 class=\"page-header\">\n        Edit configuration\n      </h5>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Required?\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.telephone.required\" />\n            Is the control required?\n          </label>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Disabled?\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.telephone.disabled\" />\n            Is the control disabled?\n          </label>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Placeholder\n        </label>\n        <input class=\"form-control\"\n          ng-model=\"$ctrl.placeholder\" />\n      </div>\n      <div class=\"form-group\" ng-init=\"$ctrl.locale = 'en-GB';\">\n        <label class=\"control-label\">\n          Locale\n        </label>\n        <tw-select\n          options=\"$ctrl.locales\"\n          ng-model=\"$ctrl.locale\"\n        ></tw-select>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Model passed\n        </label>\n        <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.model\" />\n      </div>\n      <input type=\"submit\" class=\"btn btn-primary btn-block\" value=\"Submit form\" />\n    </div>\n  </div>\n</div>\n</form>\n";

/***/ }),
/* 191 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"upload\">Upload</h4>\n<p><code>tw-upload</code> is a component for uploading a single file. It is\n  designed to be used multiple times when more than one file is required.</p>\n<ul>\n  <li>Files can be saved immediately by passing in a set of <code>http-options</code>,\n    to be used with Angular's\n    <a href=\"https://docs.angularjs.org/api/ng/service/$http\" target=\"_new\">$http service</a>.</li>\n  <li>If an <code>ngModel</code> binding is supplied the component will bind the\n    base64 encoded file to that property, ready for an asynchronous\n    <code>multipart/form-data</code> POST.</li>\n  <li>The component also contains an HTML file input which can be submitted in\n    a standard <code>multipart/form-data</code> form (which requires a\n    <code>name</code>).</li>\n</ul>\n<p>A number of event handlers are available during the component lifecycle:</p>\n<ul>\n  <li><p><code>on-start(File)</code> - fired when we start processing the file, the\n    file object is passed to the handler, containing the size, name, and type of\n    the file (but not the data, use ngModel).</p></li>\n  <li><p><code>on-success($httpResponse)</code> - fired when we successfully\n    process the file and internal animations are complete.  The success handler\n    will be passed the response from the $http service if\n    <code>http-options</code> were supplied.</p></li>\n  <li><p><code>on-failure($httpResponse)</code> - fired when we fail to process\n    the file after internal animations finish.  The failure handler\n    will be passed the response from the $http service if\n    <code>http-options</code> were supplied.</p>\n    <p>If you supply a <code>max-size</code> the component will validate client\n      side and fail with an $httResponse, status: '413 - Request Entity Too Large'.\n      For all other errors, interrogate the response and supply an appropriate\n      <code>error-message</code> to the component</p>\n  </li>\n  <li><p><code>on-cancel()</code> - fired when we reset the control to it's initial\n    state ready to accept a new file.</p></li>\n</ul>\n<p>The component's post upload screen can be fully customised by transcluding\n  new content to replace the default behaviour.</p>\n<pre>\n&lt;tw-upload ...&gt;\n  &lt;custom-success-screen /&gt;\n&lt;/tw-upload&gt;\n</pre>\n\n<form action=\"/file\" method=\"POST\" enctype=\"multipart/form-data\">\n<div class=\"row m-b-3\">\n  <div class=\"col-md-6\">\n    <div class=\"form-group\">\n      <tw-upload\n        ng-if=\"!$ctrl.customComplete\"\n        ng-model=\"$ctrl.model\"\n        name=\"$ctrl.name\"\n        icon=\"{{$ctrl.icon}}\"\n        size=\"{{$ctrl.size}}\"\n        accept=\"{{$ctrl.accept}}\"\n        max-size=\"$ctrl.maxSize\"\n        label=\"{{$ctrl.label}}\"\n        placeholder=\"{{$ctrl.placeholder}}\"\n\n        button-text=\"{{$ctrl.buttonText}}\"\n        cancel-text=\"{{$ctrl.cancelText}}\"\n\n        too-large-message=\"{{$ctrl.tooLargeMessage}}\"\n        error-message=\"{{$ctrl.errorMessage}}\"\n\n        processing-text=\"{{$ctrl.processingText}}\"\n        success-text=\"{{$ctrl.successText}}\"\n        failure-text=\"{{$ctrl.failureText}}\"\n\n        on-start=\"$ctrl.onStart\"\n        on-success=\"$ctrl.onSuccess\"\n        on-failure=\"$ctrl.onFailure\"\n        on-cancel=\"$ctrl.onCancel\"\n\n        http-options=\"$ctrl.httpOptions\">\n      </tw-upload>\n      <tw-upload\n        ng-if=\"$ctrl.customComplete\"\n        ng-model=\"$ctrl.model\"\n        name=\"$ctrl.name\"\n        icon=\"{{$ctrl.icon}}\"\n        size=\"{{$ctrl.size}}\"\n        accept=\"{{$ctrl.accept}}\"\n        max-size=\"$ctrl.maxSize\"\n        label=\"{{$ctrl.label}}\"\n        placeholder=\"{{$ctrl.placeholder}}\"\n\n        button-text=\"{{$ctrl.buttonText}}\"\n        cancel-text=\"{{$ctrl.cancelText}}\"\n\n        too-large-message=\"{{$ctrl.tooLargeMessage}}\"\n        error-message=\"{{$ctrl.errorMessage}}\"\n\n        processing-text=\"{{$ctrl.processingText}}\"\n        success-text=\"{{$ctrl.successText}}\"\n        failure-text=\"{{$ctrl.failureText}}\"\n\n        on-start=\"$ctrl.onStart\"\n        on-success=\"$ctrl.onSuccess\"\n        on-failure=\"$ctrl.onFailure\"\n        on-cancel=\"$ctrl.onCancel\"\n\n        http-options=\"$ctrl.httpOptions\">\n        <h1>Custom completion card</h1>\n      </tw-upload>\n    </div>\n    <h5>Configuration</h5>\n<pre>&lt;tw-upload<span ng-if=\"$ctrl.showNgModel\">\n  ng-model=\"{{$ctrl.model | limitTo : 30}}...\"</span>\n  name=\"{{$ctrl.name}}\"<span ng-if=\"$ctrl.icon\">\n  icon=\"{{$ctrl.icon}}\"</span><span ng-if=\"$ctrl.size !== 'md'\">\n  size=\"{{$ctrl.size}}\"</span><span ng-if=\"$ctrl.label\">\n  label=\"{{$ctrl.label}}\"</span>\n  placeholder=\"{{$ctrl.placeholder}}\"\n  button-text=\"{{$ctrl.buttonText}}\"\n  cancel-text=\"{{$ctrl.cancelText}}\"\n<span ng-if=\"$ctrl.accept\">\n  accept=\"{{$ctrl.accept}}\"</span><span ng-if=\"$ctrl.wrongTypeText\">\n  wrong-type-text=\"{{$ctrl.wrongTypeMessage}}\"</span><span ng-if=\"$ctrl.maxSize\">\n  max-size=\"{{$ctrl.maxSize}}\"\n  too-large-message=\"{{$ctrl.tooLargeMessage}}\"</span><span ng-if=\"$ctrl.processingText\">\n  processing-text=\"{{$ctrl.processingText}}\"</span><span ng-if=\"$ctrl.successText\">\n  success-text=\"{{$ctrl.successText}}\"</span><span ng-if=\"$ctrl.failureText\">\n  failure-text=\"{{$ctrl.failureText}}\"</span><span ng-if=\"$ctrl.httpOptions\">\n  http-options=\"{{$ctrl.httpOptions}}\"</span><span ng-if=\"$ctrl.errorMessage\">\n  error-message=\"{{$ctrl.errorMessage}}\"</span>\n\n  on-start=\"$ctrl.onStart\"\n  on-success=\"$ctrl.onSuccess\"\n  on-failure=\"$ctrl.onFailure\"\n  on-cancel=\"$ctrl.onCancel\"&gt;<span ng-if=\"$ctrl.customComplete\">\n  &lt;h1&gt;Custom completion card&lt;/h1&gt;</span>\n&lt;/tw-upload&gt;\n</pre>\n  </div>\n  <div class=\"col-md-6\">\n    <div class=\"well\">\n      <h5 class=\"page-header\">\n        Edit configuration\n        <button type=\"button\"\n          class=\"btn btn-sm btn-default pull-xs-right\"\n          ng-click=\"$ctrl.makeFancy()\">Make fancy</button>\n      </h5>\n      <div class=\"form-group\" ng-init=\"$ctrl.name = 'file'\">\n        <label class=\"control-label\">\n          Name of the form field\n        </label>\n        <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.name\" />\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Label\n        </label>\n        <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.label\" />\n      </div>\n      <div class=\"form-group\"\n        ng-init=\"$ctrl.placeholder = 'Drag and drop a file less than 1MB'\">\n        <label class=\"control-label\">\n          Placeholder text\n        </label>\n        <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.placeholder\" />\n      </div>\n\n      <div class=\"form-group\" ng-init=\"$ctrl.buttonText = 'Or choose file'\">\n        <label class=\"control-label\">\n          Button text\n        </label>\n        <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.buttonText\" />\n      </div>\n      <div class=\"form-group\" ng-init=\"$ctrl.cancelText = 'Choose a different file?'\">\n        <label class=\"control-label\">\n          Cancel text\n        </label>\n        <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.cancelText\" />\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Icon\n        </label>\n        <tw-select\n          placeholder=\"Default icon\"\n          ng-model=\"$ctrl.icon\"\n          options=\"$ctrl.icons\"></tw-select>\n      </div>\n\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Processing text\n        </label>\n        <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.processingText\" />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Success text\n        </label>\n        <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.successText\" />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Failure text\n        </label>\n        <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.failureText\" />\n      </div>\n\n      <div class=\"form-group\">\n        <span class=\"control-label\">Toggles</span>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox\n              ng-model=\"$ctrl.httpOptions\"\n              ng-true-value=\"{url: 'partials/image-upload.json'}\"\n              ng-false-value=\"false\" />\n            POST immmediately?\n          </label>\n        </div>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox\n              ng-model=\"$ctrl.httpOptions\"\n              ng-true-value=\"{url: '404'}\"\n              ng-false-value=\"false\" />\n            Post to a 404 for testing?\n          </label>\n        </div>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.showNgModel\" />\n            Bind to ngModel?\n          </label>\n        </div>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox ng-model=\"$ctrl.customComplete\" />\n            Custom complete screen?\n          </label>\n        </div>\n      </div>\n\n      <div class=\"form-group\" ng-init=\"$ctrl.size = 'md'\">\n        <label class=\"control-label\">\n          Size\n        </label>\n        <tw-select\n          placeholder=\"Size\"\n          ng-required=\"true\"\n          ng-model=\"$ctrl.size\"\n          options=\"$ctrl.sizes\"></tw-select>\n      </div>\n\n      <div class=\"form-group\" ng-init=\"$ctrl.accept = 'image/*'\">\n        <label class=\"control-label\">\n          Accept (CSV of file extensions)\n        </label>\n        <tw-select\n          placeholder=\"Any file type\"\n          ng-model=\"$ctrl.accept\"\n          options=\"$ctrl.acceptOptions\"></tw-select>\n      </div>\n      <!--\n      <div class=\"form-group\" ng-init=\"$ctrl.wrongTypeMessage = 'The file must be an image'\">\n        <label class=\"control-label\">\n          Wrong type text\n        </label>\n        <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.wrongTypeMessage\" />\n      </div>\n      -->\n      <div class=\"form-group\" ng-init=\"$ctrl.maxSize = 1000000\">\n        <label class=\"control-label\">\n          Max file size\n        </label>\n        <input type=\"number\" step=\"1\" class=\"form-control\" ng-model=\"$ctrl.maxSize\" />\n      </div>\n      <div class=\"form-group\" ng-init=\"$ctrl.tooLargeMessage = 'The file must be smaller than 1Mb'\">\n        <label class=\"control-label\">\n          Too large message\n        </label>\n        <input type=\"text\" class=\"form-control\" ng-model=\"$ctrl.tooLargeMessage\" />\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Error message\n        </label>\n        <input type=\"text\"\n          class=\"form-control\"\n          ng-model=\"$ctrl.errorMessage\"\n          placeholder=\"Populate using on-failure...\" />\n      </div>\n    </div>\n  </div>\n</div>\n</form>\n";

/***/ }),
/* 192 */
/***/ (function(module, exports) {

module.exports = "<div class=\"panel\">\n  <div class=\"panel-heading\">\n    <h2 class=\"panel-title\">Help components</h2>\n  </div>\n  <div class=\"panel-body\">\n    <tw-pop-over-docs></tw-pop-over-docs>\n    <tw-tool-tip-docs></tw-tool-tip-docs>\n  </div>\n</div>\n";

/***/ }),
/* 193 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"pop-over\">Pop Over</h4>\n<p><code>tw-pop-over</code> is an attribute based directive that enables a\n  floating description to be revealed when an element is <strong>clicked</strong>\n  or <strong>focused</strong>.  It is configured through data attributes.</p>\n\n<p class=\"text-danger\">tw-popover requires bootstrap.js</p>\n\n<div class=\"row\">\n  <div class=\"col-md-12\">\n    <a tw-pop-over\n      data-original-title=\"Popover title\"\n      data-content=\"Full description copy, explaining in more detail\">\n      Simple click based\n    </a>\n    -\n    <a tw-pop-over\n      data-original-title=\"Popover on hover\"\n      data-trigger=\"hover\"\n      data-placement=\"bottom\"\n      data-content=\"Positioned beneath the target element\">\n      On hover, with custom position\n    </a>\n    -\n    <a tw-pop-over\n      data-original-title=\"Injected into .popover-title\"\n      data-content-html=\"true\"\n      data-content=\"HTML enabled <a href='/path'>content</a>, do not use with user entered data\">\n      With HTML content\n    </a>\n\n    <pre>\n&lt;a tw-pop-over\n  data-original-title=\"Popover title\"\n  data-content=\"Full description copy, explaining in more detail\"&gt;\n  Simple click based\n&lt;/a&gt;\n\n&lt;a tw-pop-over\n  data-original-title=\"Popover on hover\"\n  data-placement=\"bottom\"\n  data-trigger=\"hover\"\n  data-content=\"Positioned beneath the target element\"&gt;\n  On hover, with custom position\n&lt;/a&gt;\n\n&lt;a tw-pop-over\n  data-original-title=\"Injected into .popover-title\"\n  data-content-html=\"true\"\n  data-content=\"HTML enabled &lt;a href='/path'&gt;content&lt;/a&gt;, do not use with user entered data\">\n  With HTML content\n&lt;/a&gt;\n    </pre>\n  </div>\n</div>\n\n<hr />\n";

/***/ }),
/* 194 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"tool-tip\">Tool Tip</h4>\n<p><code>tw-tool-tip</code> is an attribute based directive that enables a\n  floating description to be revealed when an element on <strong>hover</strong>,\n  <strong>focus</strong> or <code>click</code>.  It is configured through data attributes.</p>\n\n<p class=\"text-danger\">tw-tool-tip requires bootstrap.js</p>\n\n<div>\n  <a tw-tool-tip\n    title=\"By default tool tip appears above\">\n    Default tool tip\n  </a>\n  -\n  <span class=\"icon icon-help-circle icon-md\"\n    tw-tool-tip\n    title=\"Use data-placement to alter position\"\n    data-placement=\"bottom\"></span>\n\n<pre>\n&lt;a tw-tool-tip\n  title=\"By default tool tip appears above\"&gt;\n  Default tool tip\n&lt;/a&gt;\n\n&lt;span class=\"icon icon-help-circle icon-md\"\n  tw-tool-tip\n  title=\"Use data-placement to alter position\"\n  data-placement=\"bottom\"&gt;&lt;/span&gt;\n</pre>\n\n</div>\n\n<hr />\n";

/***/ }),
/* 195 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"affix\">Affix</h4>\n<p><code>tw-affix</code> is an attribute based directive that applies a class\n  <code>.affix</code> when the scroll position reaches the the declared\n  <code>data-offset-top</code> from the top of the screen, until it reaches the\n  <code>data-offset-bottom</code> (if supplied).</p>\n<p>Typically you will apply some <code>position: fixed;</code> CSS styles once\n  the class is applied.</p>\n\n<p class=\"text-danger\">tw-affix requires bootstrap.js</p>\n\n<div>\n  <div class=\"alert alert-info\" tw-affix\n    data-offset-top=\"100\">\n    Affix class will turn this green when scrolled over 100px from top\n  </div>\n\n\n<pre>\n&lt;div tw-affix\n  data-offset-top=\"100\"&gt;\n  Affix class will turn this green when scrolled over 100px from top\n&lt;/a&gt;\n</pre>\n\n</div>\n\n<hr />\n";

/***/ }),
/* 196 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"cards\">Cards</h4>\n<div class=\"row\">\n  <div class=\"col-md-8\">\n    <p>These are cards that have information about an activity and\n      provide more detail when they're expanded. Things to know about\n      expandable cards: </p>\n    <ul>\n      <li>The tw-cards container has one (optional) attribute\n      <code>inactive</code> (boolean), that provides for the cards with the\n      less prominent apparearance featured below.</li>\n      <li>Each <code>tw-card</code> belongs in a <code>tw-cards</code> container.\n        They take up to four attributes.\n        <ul>\n          <li><code>state</code> - bootstrap state for the colour of the card</li>\n          <li><code>open</code> - (optional) boolean to mark a card for pre-expansion.\n          Only the first card in any <code>tw-cards</code> container with this attribute will\n          be expanded</li>\n          <li><code>disabled</code> - (optional) boolean for greyed out text on a card for\n          something like a cancelled transfer</li>\n        </ul>\n      </li>\n      <li>Each tw-card expects the following elements\n        <ul>\n          <li><code>card-icon</code> - circle for the card's icon</li>\n          <li><code>collapsed</code> - the content for the collapsed card</li>\n          <li><code>expanded</code> - the content for the expanded card</li>\n          <li><code>card-form</code> - (optional) the content for a form (like repeat transfer)</li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n  <div class=\"col-md-4\">\n    <h5>Configuration</h5>\n<pre>\n&lt;tw-cards&gt;\n    &lt;tw-card\n        state=\"danger\"\n        open=\"false\"&gt;\n        &lt;card-icon&gt;\n        &lt;/card-icon&gt;\n        &lt;collapsed&gt;\n        &lt;/collapsed&gt;\n        &lt;expanded&gt;\n        &lt;/expanded&gt;\n        &lt;card-form&gt;\n        &lt;/card-form&gt;\n    &lt;/tw-card&gt;\n&lt;/tw-cards&gt;\n</pre>\n  </div>\n</div>\n\n<div class=\"well\">\n  <tw-cards>\n    <tw-card state=\"danger\">\n      <card-icon>\n        <span class=\"icon icon-request icon-md\"></span>\n      </card-icon>\n      <collapsed>\n        <collapse-example>\n          <middle>\n            <p class=\"list-group-item-heading text-max-width hidden-xs\">\n              <span>Transfer<span class=\"visible-xl-inline h5\"> £10.00 </span>from</span>\n              <strong >Mike Marter</strong>\n            </p>\n            <p class=\"small m-b-0 text-max-width list-group-item-text\">\n              We received your money. There was a problem with your documents.\n            </p>\n          </middle>\n          <right>\n            <p class=\"m-y-0 h5\">\n              <span class=\"sr-only\">Sent</span>£10.00<span class=\"hidden-xs\"> GBP</span>\n            </p>\n            <p class=\"m-y-0 small\">\n              <span class=\"sr-only\">Received</span> exactly $12.34\n              <span class=\"hidden-xs\">USD</span>\n            </p>\n          </right>\n        </collapse-example>\n      </collapsed>\n      <expanded>\n        <expand-example>\n          <heading>We received your money. There was a problem with your documents.</heading>\n          <middle>\n            <ul class=\"sequence sequence-hollow sequence-pulse m-l-1 sequence-danger\">\n              <li><p class=\"small p-b-1\">You set up a transfer to TransferWise</p></li>\n              <li class=\"active\">\n                <p class=\"m-b-1 text-danger\">The money is on it's way to TransferWise</p>\n                <p class=\"small p-b-1\">Although you have instructed your bank to us the money, it will take\n                  several hours for them to process the transfer and pay out.  We cannot\n                  process the transfer until it arrives in our account.</p>\n              </li>\n              <li><p class=\"small p-b-1\">We receive the money and transfer it to Steve Pole</p></li>\n              <li><p class=\"small p-b-1\">Steve Pole's bank process the transfer</p></li>\n              <li><p class=\"small p-b-1\">The money appears in Steve Pole's account.</p></li>\n            </ul>\n            <div class=\"row\">\n              <div class=\"col-sm-12 col-lg-3 m-b-0\">\n                <a href=\"/examples/details.html\">View details</a>\n              </div>\n            </div>\n          </middle>\n          <buttons>\n            <button class=\"btn btn-primary \">Fix this transfer</button>\n            <button class=\"btn btn-danger pull-md-right m-b-0\">Cancel transfer</button>\n          </buttons>\n        </expand-example>\n      </expanded>\n    </tw-card>\n    <tw-card state=\"info\" >\n      <card-icon>\n        <span class=\"icon icon-md icon-transfer\"></span>\n      </card-icon>\n      <collapsed>\n        <collapse-example>\n          <middle>\n            <p class=\"list-group-item-heading text-max-width hidden-xs\">\n              Transfer to <strong>Steve Pole</strong>\n            </p>\n            <p class=\"small m-b-0 text-max-width list-group-item-text\">\n              We received your money. We're processing your transfer.\n            </p>\n          </middle>\n          <right>\n            <p class=\"m-y-0 small\">\n              <span class=\"sr-only\">Sent</span> £10.00\n              <span class=\"hidden-xs\">GBP</span>\n            </p>\n            <p class=\"m-y-0 h5\">\n              <span class=\"sr-only\">Received</span> $12.34\n              <span class=\"hidden-xs\">USD</span>\n            </p>\n          </right>\n        </collapse-example>\n      </collapsed>\n      <expanded>\n        <expanded-example>\n          <heading>We received your money. We're processing your transfer.</heading>\n          <middle>\n            <ul class=\"sequence sequence-hollow sequence-pulse m-l-1 sequence-info\">\n              <li><p class=\"small p-b-1\">You set up a transfer to TransferWise</p></li>\n              <li class=\"active\">\n                <p class=\"m-b-1 text-info\">The money is on it's way to TransferWise</p>\n                <p class=\"small p-b-1\">Although you have instructed your bank to us the money, it will take\n                  several hours for them to process the transfer and pay out. We cannot\n                  process the transfer until it arrives in our account.</p>\n              </li>\n              <li><p class=\"small p-b-1\">We receive the money and transfer it to Steve Pole</p></li>\n              <li><p class=\"small p-b-1\">Steve Pole's bank process the transfer</p></li>\n              <li><p class=\"small p-b-1\">The money appears in Steve Pole's account.</p></li>\n            </ul>\n            <div class=\"row\">\n              <div class=\"col-sm-12 col-lg-3 m-b-0\">\n                <a href=\"/examples/details.html\">View details</a>\n              </div>\n            </div>\n          </middle>\n          <buttons>\n            <button class=\"btn btn-danger pull-md-right m-b-0\">Cancel transfer</button>\n          </buttons>\n        </expanded-example>\n      </expanded>\n    </tw-card>\n    <tw-card state=\"warning\">\n      <card-icon>\n        <img class=\"hidden-xs\" height=\"50\" alt=\"tw sample photo\"\n          ng-src=\"{{ $ctrl.imageUrl }}\" />\n        <span class=\"visible-xs icon icon-md icon-profile\"></span>\n      </card-icon>\n      <collapsed>\n        <collapse-example>\n          <middle>\n            <p class=\"list-group-item-heading text-max-width\">\n              <span class=\"hidden-xs\">Transfer to</span>\n              <strong> Mike Marter</strong>\n            </p>\n            <p class=\"small m-b-0 text-max-width list-group-item-text\">\n              Waiting for you to pay in.\n            </p>\n          </middle>\n          <right>\n            <p class=\"m-y-0  h5\">\n              <span class=\"sr-only\">Sent</span> £10.00 <span class=\"hidden-xs \">GBP</span>\n            </p>\n            <p class=\"m-y-0 small\">\n              <span class=\"sr-only\">Received</span> about\n              $12.34 <span class=\"hidden-xs \">USD</span>\n            </p>\n          </right>\n        </collapse-example>\n      </collapsed>\n      <expanded>\n        <expanded-example>\n          <heading>Waiting for you to pay in.</heading>\n          <middle>\n            <ul class=\"sequence sequence-hollow sequence-pulse m-l-1 sequence-warning\">\n              <li><p class=\"small p-b-1\">You set up a transfer to TransferWise</p></li>\n              <li class=\"active\">\n                <p class=\" m-b-1\">The money is on it's way to TransferWise</p>\n                <p class=\"small p-b-1\">Although you have instructed your bank to us the money, it will take\n                  several hours for them to process the transfer and pay out. We cannot\n                  process the transfer until it arrives in our account.</p>\n              </li>\n              <li><p class=\"small p-b-1 \">We receive the money and transfer it to Mike Marter</p></li>\n              <li><p class=\"small p-b-1 \">Mike Marter's bank process the transfer</p></li>\n              <li><p class=\"small p-b-1 \">The money appears in Mike Marter's account.</p></li>\n            </ul>\n            <div class=\"row\">\n              <div class=\"col-sm-12 col-lg-3 m-b-0\">\n                <a href=\"/examples/details.html\">View details</a>\n              </div>\n            </div>\n          </middle>\n          <buttons>\n            <button class=\"btn btn-primary \">Pay for this transfer</button>\n            <button class=\"btn btn-primary \">I've already paid</button>\n            <button class=\"btn btn-danger pull-md-right m-b-0\">Cancel transfer</button>\n          </buttons>\n        </expanded-example>\n      </expanded>\n    </tw-card>\n</tw-cards>\n<br />\n<h5>Inactive Cards</h5>\n<br />\n<tw-cards inactive=\"true\">\n    <tw-card state=\"none\" show-form=\"true\">\n      <card-icon>V</card-icon>\n      <collapsed>\n        <collapse-example>\n          <middle>\n            <p class=\"list-group-item-heading text-max-width\">\n              <span class=\"hidden-xs\">Transfer to </span>\n              <strong>Peet's coffee</strong>\n            </p>\n            <p class=\"small m-b-0 text-max-width list-group-item-text\" title=\"01 July 2016 1:34 PM\">\n              Completed 01 July 2016\n            </p>\n          </middle>\n          <right>\n            <p class=\"m-y-0 h5\">\n              <span class=\"sr-only\">Sent</span> £2.50 <span class=\"hidden-xs \">GBP</span>\n            </p>\n            <p class=\"m-y-0 small\">\n              <span class=\"sr-only\">Received</span> £2.50 <span class=\"hidden-xs \">GBP</span>\n            </p>\n          </right>\n        </collapse-example>\n      </collapsed>\n      <expanded>\n        <expanded-example>\n          <middle>\n            <div class=\"m-t-1 m-b-3 visible-xs-block visible-sm-block\">\n              <p class=\"h2 m-b-0 list-group-item-text\" title=\"01 July 2016 1:34 PM\">\n                Completed 01 July 2016\n              </p>\n            </div>\n            <div>\n              <div class=\"row\">\n                <dl class=\"col-sm-6\">\n                  <dt>Sent to</dt>\n                  <dd>Merchant account</dd>\n                </dl>\n                <dl class=\"col-sm-6\">\n                  <dt>Reference</dt>\n                  <dd>Ref123</dd>\n                </dl>\n              </div>\n              <div class=\"row\">\n                <dl class=\"col-sm-6\">\n                  <dt>Exchange rate</dt>\n                  <dd>1.0000</dd>\n                </dl>\n                <dl class=\"col-sm-6\">\n                  <dt>Fee</dt>\n                  <dd>0.00 GBP</dd>\n                </dl>\n              </div>\n              <div class=\"row\">\n                <dl class=\"col-sm-6\">\n                  <dt>Transfer number</dt>\n                  <dd>123456789</dd>\n                </dl>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-sm-12 col-lg-3 m-b-0\">\n                <a href=\"/examples/details.html\">View details</a>\n              </div>\n            </div>\n          </middle>\n        </expanded-example>\n      </expanded>\n      <card-form>\n        <form-example></form-example>\n      </card-form>\n    </tw-card>\n    <tw-card state=\"none\" show-form=\"true\">\n      <card-icon>W</card-icon>\n      <collapsed>\n        <collapse-example>\n          <middle>\n            <p class=\"list-group-item-heading text-max-width\">\n              <span class=\"hidden-xs\">Reward payment to your </span>\n              <strong>GBP balance</strong>\n            </p>\n            <p class=\"small m-b-0 text-max-width list-group-item-text\" title=\"01 April 2016 1:34 PM\">\n              Completed 01 April 2016\n            </p>\n          </middle>\n          <right>\n            <p class=\"m-y-0  h5\">\n              <span class=\"sr-only\">Sent</span> £10.00 <span class=\"hidden-xs \">GBP</span>\n            </p>\n            <p class=\"m-y-0  small\">\n              <span class=\"sr-only\">Received</span> £10.00 <span class=\"hidden-xs \">GBP</span>\n            </p>\n          </right>\n        </collapse-example>\n      </collapsed>\n      <expanded>\n        <expanded-example>\n          <middle>\n            <div class=\"m-t-1 m-b-3 visible-xs-block visible-sm-block\">\n              <p class=\"h2 m-b-0 list-group-item-text\" title=\"01 April 2016 1:34 PM\">\n                Completed 01 April 2016\n              </p>\n            </div>\n            <div>\n              <div class=\"row\">\n                <dl class=\"col-sm-6\">\n                  <dt>Sent to</dt>\n                  <dd>GBP balance</dd>\n                </dl>\n                <dl class=\"col-sm-6\">\n                  <dt>Reference</dt>\n                  <dd>Referral Bonus</dd>\n                </dl>\n              </div>\n              <div class=\"row\">\n                <dl class=\"col-sm-6\">\n                  <dt>Exchange rate</dt>\n                  <dd>1.0000</dd>\n                </dl>\n                <dl class=\"col-sm-6\">\n                  <dt>Fee</dt>\n                  <dd>0.00 GBP</dd>\n                </dl>\n              </div>\n              <div class=\"row\">\n                <dl class=\"col-sm-6\">\n                  <dt>Transfer number</dt>\n                  <dd>123456789</dd>\n                </dl>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-sm-12 col-lg-3 m-b-0\">\n                <a href=\"/examples/details.html\">View details</a>\n              </div>\n            </div>\n          </middle>\n        </expanded-example>\n      </expanded>\n      <card-form>\n        <form-example></form-example>\n      </card-form>\n    </tw-card>\n    <tw-card state=\"none\" disabled=\"true\">\n      <card-icon>X</card-icon>\n      <collapsed>\n        <collapse-example>\n          <middle>\n            <p class=\"list-group-item-heading text-max-width\">\n              <span class=\"hidden-xs\">Transfer to</span>\n              <strong>Steve Pole</strong>\n            </p>\n            <p class=\"small m-b-0 text-max-width list-group-item-text\" title=\"10 June 2016 1:34 PM\">\n              Cancelled 10 June 2016\n            </p>\n          </middle>\n          <right>\n            <p class=\"m-y-0  h5\">\n              <span class=\"sr-only\">Sent</span>£10,000,000.00<span class=\"hidden-xs \">GBP</span>\n            </p>\n            <p class=\"m-y-0  small\">\n              <span class=\"sr-only\">Received</span>€11,987,000.00<span class=\"hidden-xs \">GBP</span>\n            </p>\n          </right>\n        </collapse-example>\n      </collapsed>\n      <expanded>\n        <expanded-example>\n          <middle>\n            <div class=\"m-t-1 m-b-3 visible-xs-block visible-sm-block\">\n              <p class=\"h2 m-b-0 list-group-item-text\" title=\"10 June 2016 1:34 PM\">\n                Cancelled 10 June 2016\n              </p>\n            </div>\n            <div>\n              <div class=\"row\">\n                <dl class=\"col-sm-6\">\n                  <dt>Sent to</dt>\n                  <dd>Account ending 1234</dd>\n                </dl>\n                <dl class=\"col-sm-6\">\n                  <dt>Reference</dt>\n                  <dd>NewHouse</dd>\n                </dl>\n              </div>\n              <div class=\"row\">\n                <dl class=\"col-sm-6\">\n                  <dt>Exchange rate</dt>\n                  <dd>1.1987</dd>\n                </dl>\n                <dl class=\"col-sm-6\">\n                  <dt>Fee</dt>\n                  <dd>500.00 GBP</dd>\n                </dl>\n              </div>\n              <div class=\"row\">\n                <dl class=\"col-sm-6\">\n                  <dt>Transfer number</dt>\n                  <dd>123456789</dd>\n                </dl>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col-sm-12 col-lg-3 m-b-0\">\n                <a href=\"/examples/details.html\">View details</a>\n              </div>\n            </div>\n          </middle>\n        </expanded-example>\n      </expanded>\n      <card-form>\n        <form-example></form-example>\n      </card-form>\n    </tw-card>\n  </tw-cards>\n</div>\n";

/***/ }),
/* 197 */
/***/ (function(module, exports) {

module.exports = "<div class=\"panel\">\n  <div class=\"panel-heading\">\n    <h2 class=\"panel-title\">Layout components</h2>\n  </div>\n  <div class=\"panel-body\">\n    <tw-affix-docs></tw-affix-docs>\n    <tw-cards-docs></tw-cards-docs>\n  </div>\n</div>\n";

/***/ }),
/* 198 */
/***/ (function(module, exports) {

module.exports = "<div class=\"panel\">\n  <div class=\"panel-heading\">\n    <h2 class=\"panel-title\">Layout components</h2>\n  </div>\n  <div class=\"panel-body\">\n    <tw-process-docs></tw-process-docs>\n    <hr class=\"m-b-5\" />\n    <tw-loader-docs></tw-loader-docs>\n  </div>\n</div>\n";

/***/ }),
/* 199 */
/***/ (function(module, exports) {

module.exports = "<h4 id=\"loader\">Loader</h4>\n<p>A directive to add the HTML necessary for our\n  loading indicator.  Simply use:</p>\n<pre>\n&lt;tw-loader /&gt;\n</pre>\n<div class=\"m-y-3 text-xs-center\">\n  <tw-loader />\n</div>\n";

/***/ }),
/* 200 */
/***/ (function(module, exports) {

module.exports = "\n<h4 id=\"process\">Process</h4>\n<p>A component for conveying that a process is occuring, and for\n  communicating a successful or unsuccessful result.</p>\n<div class=\"row m-b-3\">\n  <div class=\"col-md-6\">\n    <div class=\"m-y-3\">\n      <tw-process\n        state=\"$ctrl.state\"\n        size=\"{{$ctrl.size}}\"\n        on-stop=\"$ctrl.log('stopped')\">\n      </tw-process>\n    </div>\n<pre>\n&lt;tw-process\n  state='{{$ctrl.state}}'\n  size='{{$ctrl.size}}'\n  on-stop='$ctrl.log('stopped')'&gt;\n&lt;/tw-process&gt;\n</pre>\n  </div>\n  <div class=\"col-md-6\">\n    <div class=\"well\">\n      <h5 class=\"page-header\">\n        Edit configuration\n      </h5>\n      <div class=\"form-group\" ng-init=\"$ctrl.state = null\">\n        <label class=\"control-label\">\n          State\n        </label>\n        <tw-select ng-model=\"$ctrl.state\"\n          options=\"$ctrl.processingStates\">\n        </tw-select>\n      </div>\n      <div class=\"form-group\" ng-init=\"$ctrl.size = 'xl'\">\n        <label class=\"control-label\">\n          Size?\n        </label>\n        <tw-select\n          ng-required=\"true\"\n          ng-model=\"$ctrl.size\"\n          options=\"$ctrl.sizes\">\n        </tw-select>\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ }),
/* 201 */
/***/ (function(module, exports) {

module.exports = "<div class=\"panel\" id=\"validation\">\n  <div class=\"panel-heading\">\n    <h2 class=\"panel-title\">Validation</h2>\n  </div>\n  <div class=\"panel-body\">\n    <p><code>tw-validation</code> is an attribute based directive that provides\n      validation behaviour for any HTML element also using <code>ng-model</code>.</p>\n    <p>The validation rules are more complex than the standard angular validation\n      to provide a better customer experience. Validation will only occur if:</p>\n    <ul>\n      <li>The user has focused and changed the value of the element, and has left\n        it in an invalid state.</li>\n      <li>The user submits the form containing the element, but has not set the\n        element to a valid value.</li>\n    </ul>\n    <p>Similar to <code>tw-focusable</code>, the attribute will seek out any parent\n      <code>.form-group</code> and apply the <code>.has-error</code> class to\n      style an associated label.</p>\n    <p>There is an associated directive that is applied to all forms if you have\n      included the module.  It simply checks whether any elements with\n      <code>[tw-validation]</code> are in an invalid state and triggers the\n      validation styles.</p>\n\n    <form\n      name=\"exampleForm\"\n      novalidate>\n\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Text input - required\n        </label>\n        <input type=\"text\" required tw-validation\n          class=\"form-control\"\n          placeholder=\"Placeholder\"\n          ng-model=\"$ctrl.model.text\" />\n        <docs-error-messages></docs-error-messages>\n        <docs-status-messages></docs-status-messages>\n      </div>\n    <pre class=\"m-b-3\">\n    &lt;input type=\"text\" class=\"form-control\" tw-validation tw-focusable\n      ng-model=\"...\" ng-required=\"true\" /&gt;\n    &lt;div class=\"error-messages\"&gt;\n      &lt;div class=\"error-required\"&gt;Required&lt;/div&gt;\n    &lt;/div&gt;\n    </pre>\n\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Select - required\n        </label>\n        <select class=\"form-control\" required tw-validation\n          ng-model=\"$ctrl.model.select\"\n          ng-change=\"$ctrl.log()\">\n          <option value=\"\">Please choose..</option>\n          <option value=\"1\">Option 1</option>\n          <option value=\"2\">Option 2</option>\n          <option value=\"3\">Option 3</option>\n        </select>\n        <docs-error-messages></docs-error-messages>\n        <docs-status-messages></docs-status-messages>\n      </div>\n    <pre class=\"m-b-3\">\n    &lt;select class=\"form-control\" tw-validation tw-focusable\n      ng-model=\"...\" ng-required=\"true\"&gt;...&lt;/select&gt;\n    &lt;div class=\"error-messages\"&gt;\n      &lt;div class=\"error-required\"&gt;Required&lt;/div&gt;\n    &lt;/div&gt;\n    </pre>\n\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Checkboxes\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <input type=\"checkbox\" tw-validation tw-focusable\n              ng-model=\"$ctrl.model.checkbox1\"\n              ng-required=\"true\" />\n            Checkbox 1 - required\n          </label>\n        </div>\n        <div class=\"checkbox\">\n          <label>\n            <input type=\"checkbox\" tw-validation tw-focusable\n              ng-model=\"$ctrl.model.checkbox2\" />\n            Checkbox 2\n          </label>\n        </div>\n        <div class=\"checkbox disabled\">\n          <label>\n            <input type=\"checkbox\" tw-validation tw-focusable\n              ng-model=\"$ctrl.model.checkbox3\"\n              disabled />\n            Checkbox 3 - disabled\n          </label>\n        </div>\n      </div>\n    <pre class=\"m-b-3\">\n    &lt;input type=\"checkbox\" name=\"myCheckbox\" tw-validation tw-focusable\n      ng-model=\"...\" ng-required=\"true\" /&gt;\n    </pre>\n\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Radio buttons - required\n        </label>\n        <div class=\"radio\">\n          <label>\n            <input type=\"radio\" name=\"simple-radio\"\n              value=\"1\" required=\"true\"\n              ng-model=\"$ctrl.model.radio\" tw-validation tw-focusable />\n            Radio 1\n          </label>\n        </div>\n        <div class=\"radio radio-lg\">\n          <label>\n            <input type=\"radio\" name=\"simple-radio\"\n              value=\"2\" required=\"true\"\n              ng-model=\"$ctrl.model.radio\" tw-validation tw-focusable />\n            Radio 2\n            <small>Subsequent information, subsequent\n              information, subsequent information.</small>\n          </label>\n        </div>\n        <div class=\"radio disabled\">\n          <label>\n            <input type=\"radio\" name=\"simple-radio\" disabled\n              value=\"3\"\n              ng-model=\"$ctrl.model.radio\" tw-validation tw-focusable />\n            Radio 3 - disabled\n          </label>\n        </div>\n      </div>\n    <pre class=\"m-b-3\">\n    &lt;input type=\"radio\" name=\"myRadio\" tw-validation tw-focusable\n      ng-model=\"...\" ng-required=\"true\" /&gt;\n    </pre>\n\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Textarea - required\n        </label>\n        <textarea required tw-validation\n          name=\"textareaSimple\"\n          class=\"form-control\"\n          placeholder=\"Required\"\n          ng-model=\"$ctrl.model.textareaSimple\"\n          ></textarea>\n        <docs-error-messages></docs-error-messages>\n        <docs-status-messages></docs-status-messages>\n      </div>\n    <pre class=\"m-b-3\">\n    &lt;textarea class=\"form-control\" tw-validation tw-focusable\n      ng-model=\"...\" ng-required=\"true\"&gt;...&lt;/textarea&gt;\n    &lt;div class=\"error-messages\"&gt;\n      &lt;div class=\"error-required\"&gt;Required&lt;/div&gt;\n    &lt;/div&gt;\n    </pre>\n\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Text - complex validation\n        </label>\n        <input type=\"text\" required tw-validation\n          name=\"textComplex\"\n          class=\"form-control\"\n          placeholder=\"a-z only, 2 to 6 chars\"\n          ng-model=\"$ctrl.model.textComplex\"\n          ng-pattern=\"/^[a-z]+$/\"\n          ng-minlength=\"2\"\n          ng-maxlength=\"6\" />\n        <docs-error-messages></docs-error-messages>\n        <docs-status-messages></docs-status-messages>\n      </div>\n    <pre class=\"m-b-3\">\n    &lt;input type=\"text\" class=\"form-control\" tw-validation tw-focusable\n      ng-model=\"...\"\n      ng-required=\"true\" ng-pattern=\"/^[a-z]+$/\"\n      ng-minlength=\"2\" ng-maxlength=\"6\" /&gt;\n    &lt;div class=\"error-messages\"&gt;\n      &lt;div class=\"error-required\"&gt;Required&lt;/div&gt;\n      &lt;div class=\"error-pattern\"&gt;Invalid characters&lt;/div&gt;\n      &lt;div class=\"error-minlength\"&gt;Too short&lt;/div&gt;\n      &lt;div class=\"error-maxlength\"&gt;Too long&lt;/div&gt;\n    &lt;/div&gt;\n    </pre>\n\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Number - complex validation\n        </label>\n        <input type=\"number\" required tw-validation\n          name=\"numberComplex\"\n          class=\"form-control\"\n          placeholder=\"min 5, max 10\"\n          ng-model=\"$ctrl.model.numberComplex\"\n          ng-min=\"5\"\n          ng-max=\"10\" />\n        <div class=\"error-messages\">\n          <div class=\"error-required\">Required</div>\n          <div class=\"error-min\">Number must be at least 5</div>\n          <div class=\"error-max\">Number must be at most 10</div>\n          <div class=\"error-number\">Must be a number</div>\n        </div>\n      </div>\n    <pre class=\"m-b-3\">\n    &lt;input type=\"number\" class=\"form-control\" tw-validation tw-focusable\n      ng-model=\"...\" ng-required=\"true\" ng-min=\"5\" ng-max=\"10\" /&gt;\n    &lt;div class=\"error-messages\"&gt;\n      &lt;div class=\"error-required\"&gt;Required&lt;/div&gt;\n      &lt;div class=\"error-min\"&gt;Number must be at least 5&lt;/div&gt;\n      &lt;div class=\"error-max\"&gt;Number must be at most 10&lt;/div&gt;\n      &lt;div class=\"error-number\"&gt;Must be a number&lt;/div&gt;\n    &lt;/div&gt;\n    </pre>\n\n      <button type=\"submit\" class=\"btn btn-primary btn-block m-b-3\">\n        Submit form\n      </button>\n      <hr class=\"m-b-5\" />\n\n\n\n      <h4>Tw Validation with Tw components</h4>\n      <p>Validation works exactly the same for our custom components, simply add\n        the <code>[tw-validation]</code> attribute to the element.</p>\n\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          twSelect - required\n        </label>\n        <tw-select tw-validation\n          ng-model=\"$ctrl.model.twSelect\"\n          ng-required=\"true\"\n          options=\"$ctrl.basicSelect\"\n          placeholder=\"Select an option...\"></tw-select>\n        <docs-error-messages></docs-error-messages>\n        <docs-status-messages></docs-status-messages>\n      </div>\n    <pre class=\"m-b-3\">\n    &lt;tw-select options=\"...\" tw-validation\n      ng-model=\"...\" ng-required=\"true\" /&gt;\n    &lt;div class=\"error-messages\"&gt;\n      &lt;div class=\"error-required\"&gt;Required&lt;/div&gt;\n    &lt;/div&gt;\n    </pre>\n\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Checkboxes\n        </label>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox tw-validation\n              ng-model=\"$ctrl.model.twCheckbox1\"\n              ng-required=\"true\"></tw-checkbox>\n            Checkbox 1 - required\n          </label>\n        </div>\n        <div class=\"checkbox\">\n          <label>\n            <tw-checkbox\n              ng-model=\"$ctrl.model.twCheckbox1\"></tw-checkbox>\n            Checkbox 2\n          </label>\n        </div>\n      </div>\n    <pre class=\"m-b-3\">\n    &lt;tw-checkbox tw-validation\n      ng-model=\"...\" ng-required=\"true\" /&gt;\n    </pre>\n\n      <div class=\"form-group\">\n        <label class=\"control-label\">\n          Radio buttons - required\n        </label>\n        <div class=\"radio\">\n          <label>\n            <tw-radio name=\"simple-radio\" value=\"1\" tw-validation\n              ng-model=\"$ctrl.model.twRadio\"\n              ng-required=\"true\"></tw-radio>\n            Radio 1\n          </label>\n        </div>\n        <div class=\"radio\">\n          <label>\n            <tw-radio name=\"simple-radio\" value=\"2\" tw-validation\n              ng-model=\"$ctrl.model.twRadio\"\n              ng-required=\"true\"></tw-radio>\n            Radio 2\n          </label>\n        </div>\n      </div>\n    <pre class=\"m-b-3\">\n    &lt;tw-radio tw-validation\n      ng-model=\"...\" ng-required=\"true\" /&gt;\n    </pre>\n\n      <button type=\"submit\" class=\"btn btn-primary btn-block\">\n        Submit form\n      </button>\n    </form>\n  </div>\n</div>\n";

/***/ })
/******/ ]);