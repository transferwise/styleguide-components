!function(modules) {
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    var installedModules = {};
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.i = function(value) {
        return value;
    }, __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            configurable: !1,
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module["default"];
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 4);
}([ function(module, exports) {
    module.exports = angular;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _domService = __webpack_require__(9), _domService2 = _interopRequireDefault(_domService);
    exports["default"] = _angular2["default"].module("tw.styleguide.services.dom", []).service("TwDomService", _domService2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _date = __webpack_require__(8), _date2 = _interopRequireDefault(_date), _currency = __webpack_require__(6), _currency2 = _interopRequireDefault(_currency), _dom = __webpack_require__(1), _dom2 = _interopRequireDefault(_dom);
    exports["default"] = _angular2["default"].module("tw.styleguide.services", [ _date2["default"], _currency2["default"], _dom2["default"] ]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _formValidation = __webpack_require__(16), _formValidation2 = _interopRequireDefault(_formValidation), _controlValidation = __webpack_require__(14), _controlValidation2 = _interopRequireDefault(_controlValidation), _asyncValidation = __webpack_require__(11), _asyncValidation2 = _interopRequireDefault(_asyncValidation);
    exports["default"] = _angular2["default"].module("tw.styleguide.validation", [ _formValidation2["default"], _controlValidation2["default"], _asyncValidation2["default"] ]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _validation = __webpack_require__(3), _validation2 = _interopRequireDefault(_validation), _services = __webpack_require__(2), _services2 = _interopRequireDefault(_services);
    exports["default"] = _angular2["default"].module("tw.form-validation", [ _validation2["default"], _services2["default"] ]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
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
            HUF: 0,
            BHD: 3,
            JOD: 3,
            KWD: 3,
            OMR: 3,
            TND: 3
        };
        this.getDecimals = function(currency) {
            return currency.toUpperCase && "undefined" != typeof currencyDecimals[currency.toUpperCase()] ? currencyDecimals[currency.toUpperCase()] : 2;
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = CurrencyService;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _currencyService = __webpack_require__(5), _currencyService2 = _interopRequireDefault(_currencyService);
    exports["default"] = _angular2["default"].module("tw.styleguide.services.currency", []).service("TwCurrencyService", _currencyService2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function DateService() {
        function getLocalisedDateName(date, locale, formattingObject) {
            var name = date.toLocaleDateString(locale, formattingObject);
            return isLocaleTranslationRequiresStripping(locale) && (name = name.replace(/[0-9]|\s|,/g, "")), 
            name[0].toUpperCase() + name.substring(1);
        }
        function getValidDateFormat(format) {
            var validFormats = [ "narrow", "short", "long" ];
            return !format || validFormats.indexOf(format) < 0 ? "long" : format;
        }
        function getValidLocale(locale) {
            return isIntlSupportedForLocale(locale) ? locale : "en-GB";
        }
        function isIntlSupportedForLocale(locale) {
            try {
                var supportedLocales = window.Intl.DateTimeFormat.supportedLocalesOf([ locale ]);
                return supportedLocales.length > 0;
            } catch (error) {
                return !1;
            }
        }
        function isLocaleTranslationRequiresStripping(locale) {
            if (!locale) return !0;
            var lang = getLanguageFromLocale(locale);
            return "ja" !== lang;
        }
        function getLanguageFromLocale(locale) {
            return locale ? locale.substring(0, 2) : null;
        }
        var _this = this;
        this.getLocaleDate = function(date) {
            return date || (date = new Date()), date.getDate();
        }, this.getLocaleMonth = function(date) {
            return date || (date = new Date()), date.getMonth();
        }, this.getLocaleFullYear = function(date) {
            return date || (date = new Date()), date.getFullYear();
        }, this.getLocaleToday = function() {
            var now = new Date();
            return _this.getUTCDateFromParts(_this.getLocaleFullYear(now), _this.getLocaleMonth(now), _this.getLocaleDate(now));
        }, this.getUTCDate = function(date) {
            return date || (date = new Date()), date.getUTCDate();
        }, this.getUTCMonth = function(date) {
            return date || (date = new Date()), date.getUTCMonth();
        }, this.getUTCFullYear = function(date) {
            return date || (date = new Date()), date.getUTCFullYear();
        }, this.getUTCToday = function() {
            var now = new Date();
            return _this.getUTCDateFromParts(_this.getUTCFullYear(now), _this.getUTCMonth(now), _this.getUTCDate(now));
        }, this.getLastDayOfMonth = function(year, month) {
            var lastDay = _this.getUTCDateFromParts(year, month + 1, 0);
            return lastDay.getUTCDate();
        }, this.getUTCDateFromParts = function(year, month, day) {
            var date = new Date();
            return date.setUTCFullYear(year, month, day), date.setUTCHours(0), date.setUTCMinutes(0), 
            date.setUTCSeconds(0), date.setUTCMilliseconds(0), date;
        }, this.getDayNamesForLocale = function(locale, format) {
            var date = void 0, days = [], language = getLanguageFromLocale(locale);
            if (DEFAULT_DAY_NAMES_BY_LANGUAGE[language]) return DEFAULT_DAY_NAMES_BY_LANGUAGE[language];
            format = getValidDateFormat(format), locale = getValidLocale(locale);
            for (var i = 1; i <= 7; i++) date = _this.getUTCDateFromParts(2001, 0, i), days.push(getLocalisedDateName(date, locale, {
                weekday: format
            }));
            return days;
        }, this.getMonthNamesForLocale = function(locale, format) {
            var date = void 0, month = void 0, months = [], language = getLanguageFromLocale(locale);
            if (DEFAULT_MONTH_NAMES_BY_LANGUAGE[language] && ("long" === format || "ja" === language)) return DEFAULT_MONTH_NAMES_BY_LANGUAGE[language];
            format = getValidDateFormat(format), locale = getValidLocale(locale);
            for (var i = 0; i < 12; i++) date = _this.getUTCDateFromParts(2e3, i, 15), "short" === format ? (month = getLocalisedDateName(date, locale, {
                month: "long"
            }), month = month.length > 4 ? month.slice(0, 3) : month, months.push(month)) : months.push(getLocalisedDateName(date, locale, {
                month: format
            }));
            return months;
        }, this.getWeekday = function(year, month, day) {
            var utcDate = _this.getUTCDateFromParts(year, month, day);
            return utcDate.getUTCDay();
        }, this.isMonthBeforeDay = function(locale) {
            return locale.indexOf("US", locale.length - 2) !== -1 || "ja" === getLanguageFromLocale(locale);
        }, this.addYears = function(date, years) {
            return _this.addToDate(date, years, 0, 0);
        }, this.addMonths = function(date, months) {
            return _this.addToDate(date, 0, months, 0);
        }, this.addDays = function(date, days) {
            return _this.addToDate(date, 0, 0, days);
        }, this.addToDate = function(date, years, months, days) {
            return _this.getUTCDateFromParts(date.getUTCFullYear() + years, date.getUTCMonth() + months, date.getUTCDate() + days);
        }, this.getYearAndMonthPresentation = function(year, monthName, locale) {
            var lang = getLanguageFromLocale(locale);
            return "ja" === lang ? year + "年" + monthName : monthName + " " + year;
        }, this.getYearMonthDatePresentation = function(year, monthName, date, locale) {
            var lang = getLanguageFromLocale(locale);
            return "ja" === lang ? year + "年" + monthName + date + "日" : locale.indexOf("US", locale.length - 2) !== -1 ? monthName + " " + date + ", " + year : date + " " + monthName + " " + year;
        };
        var DEFAULT_MONTH_NAMES_BY_LANGUAGE = {
            en: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            ja: [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" ]
        }, DEFAULT_DAY_NAMES_BY_LANGUAGE = {
            en: [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
            ja: [ "月", "火", "水", "木", "金", "土", "日" ]
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = DateService;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _dateService = __webpack_require__(7), _dateService2 = _interopRequireDefault(_dateService);
    exports["default"] = _angular2["default"].module("tw.styleguide.services.date", []).service("TwDateService", _dateService2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function DomService() {
        this.getClosestParentByTagName = function(element, tagName) {
            for (var tagNameUpper = tagName.toUpperCase(), parent = element; parent; ) if (parent = parent.parentNode, 
            parent && parent.tagName && parent.tagName.toUpperCase() === tagNameUpper) return parent;
            return null;
        }, this.getClosestParentByClassName = function(element, className) {
            for (var parent = element; parent; ) if (parent = parent.parentNode, parent && parent.classList && parent.classList.contains(className)) return parent;
            return null;
        }, this.getPreviousSiblingWithClassName = function(element, className) {
            for (var sibling = element.previousElementSibling; sibling; ) {
                if (sibling.classList.contains(className)) return sibling;
                sibling = sibling.previousElementSibling;
            }
            return null;
        }, this.getNextSiblingWithClassName = function(element, className) {
            for (var sibling = element.nextElementSibling; sibling; ) {
                if (sibling.classList.contains(className)) return sibling;
                sibling = sibling.nextElementSibling;
            }
            return null;
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = DomService;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function AsyncValidation($log, $q, $http) {
        function AsyncValidationLink(scope, element, attrs, ngModel) {
            attrs["tw-dynamic-async-validator"];
        }
        return {
            link: AsyncValidationLink,
            restrict: "A",
            controller: AsyncValidatorController,
            contollerAs: "ctrl",
            bindToController: {
                twDynamicAsyncValidator: "="
            }
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var AsyncValidatorController = function AsyncValidatorController() {
        _classCallCheck(this, AsyncValidatorController);
    };
    AsyncValidation.$inject = [ "$log", "$q", "$http" ], exports["default"] = AsyncValidation;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _asyncValidationDirective = __webpack_require__(10), _asyncValidationDirective2 = _interopRequireDefault(_asyncValidationDirective);
    exports["default"] = _angular2["default"].module("tw.styleguide.validation.async", []).directive("twAsyncValidation", _asyncValidationDirective2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function checkModelAndUpdate(ngModel, formGroup, element) {
        return ngModel.$valid ? (formGroup && formGroup.classList.remove("has-error"), void element.removeAttribute("aria-invalid")) : void (ngModel.$touched && ngModel.$dirty && (formGroup && formGroup.classList.add("has-error"), 
        element.setAttribute("aria-invalid", "true")));
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _dom = __webpack_require__(1), ValidationController = (_interopRequireDefault(_dom), 
    function ValidationController($scope, $element, TwDomService) {
        _classCallCheck(this, ValidationController);
        var element = $element[0], formGroup = TwDomService.getClosestParentByClassName(element, "form-group"), $ngModel = $element.controller("ngModel");
        element.addEventListener("invalid", function(event) {
            event.preventDefault();
        }), $ngModel.$validators.validation = function() {
            return $scope.$evalAsync(function() {
                checkModelAndUpdate($ngModel, formGroup, element);
            }), !0;
        };
        var onBlur = function() {
            $scope.$evalAsync(function() {
                checkModelAndUpdate($ngModel, formGroup, element);
            });
        };
        element.addEventListener("blur", onBlur);
    });
    ValidationController.$inject = [ "$scope", "$element", "TwDomService" ], exports["default"] = ValidationController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function TwValidation() {
        return {
            restrict: "A",
            require: {
                $ngModel: "ngModel"
            },
            controller: _controlValidationController2["default"]
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _controlValidationController = __webpack_require__(12), _controlValidationController2 = _interopRequireDefault(_controlValidationController);
    exports["default"] = TwValidation;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _controlValidationDirective = __webpack_require__(13), _controlValidationDirective2 = _interopRequireDefault(_controlValidationDirective);
    exports["default"] = _angular2["default"].module("tw.stylguide.validation.control", []).directive("twValidation", _controlValidationDirective2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function FormValidation(TwDomService) {
        return {
            restrict: "E",
            link: function(scope, $element) {
                var form = $element[0];
                form.addEventListener("submit", function() {
                    var formGroup = void 0, checkboxContainer = void 0, radioContainer = void 0, controls = form.querySelectorAll("[tw-validation].ng-invalid");
                    return !controls.forEach || (controls.forEach(function(control) {
                        formGroup = TwDomService.getClosestParentByClassName(control, "form-group"), radioContainer = TwDomService.getClosestParentByClassName(control, "radio"), 
                        checkboxContainer = TwDomService.getClosestParentByClassName(control, "checkbox"), 
                        formGroup && formGroup.classList.add("has-error"), radioContainer && radioContainer.classList.add("has-error"), 
                        checkboxContainer && checkboxContainer.classList.add("has-error");
                    }), !0);
                });
            }
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _dom = __webpack_require__(1);
    _interopRequireDefault(_dom);
    FormValidation.$inject = [ "TwDomService" ], exports["default"] = FormValidation;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _formValidationDirective = __webpack_require__(15), _formValidationDirective2 = _interopRequireDefault(_formValidationDirective);
    exports["default"] = _angular2["default"].module("tw.styleguide.validation.form", []).directive("form", _formValidationDirective2["default"]).name;
} ]);