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
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 19);
}([ function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _twSelectComponent = __webpack_require__(40), _twSelectComponent2 = _interopRequireDefault(_twSelectComponent);
    exports["default"] = angular.module("tw.styleguide.forms.select", []).component("twSelect", _twSelectComponent2["default"]).name;
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
    var _twCheckboxComponent = __webpack_require__(22), _twCheckboxComponent2 = _interopRequireDefault(_twCheckboxComponent);
    exports["default"] = angular.module("tw.styleguide.forms.checkbox", []).component("twCheckbox", _twCheckboxComponent2["default"]).name;
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
    var _twDateComponent = __webpack_require__(28), _twDateComponent2 = _interopRequireDefault(_twDateComponent);
    exports["default"] = angular.module("tw.styleguide.forms.date", []).component("twDate", _twDateComponent2["default"]).name;
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
    var _select = __webpack_require__(0), _radio = (_interopRequireDefault(_select), 
    __webpack_require__(5)), _checkbox = (_interopRequireDefault(_radio), __webpack_require__(1)), _date = (_interopRequireDefault(_checkbox), 
    __webpack_require__(2)), _upload = (_interopRequireDefault(_date), __webpack_require__(6)), _twDynamicFormControlComponent = (_interopRequireDefault(_upload), 
    __webpack_require__(30)), _twDynamicFormControlComponent2 = _interopRequireDefault(_twDynamicFormControlComponent);
    exports["default"] = angular.module("tw.styleguide.forms.dynamic-form-control", []).component("twDynamicFormControl", _twDynamicFormControlComponent2["default"]).name;
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
    var _dynamicFormControl = __webpack_require__(3), _twFieldsetComponent = (_interopRequireDefault(_dynamicFormControl), 
    __webpack_require__(32)), _twFieldsetComponent2 = _interopRequireDefault(_twFieldsetComponent);
    exports["default"] = angular.module("tw.styleguide.forms.fieldset", []).component("twFieldset", _twFieldsetComponent2["default"]).name;
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
    var _twRadioComponent = __webpack_require__(35), _twRadioComponent2 = _interopRequireDefault(_twRadioComponent);
    exports["default"] = angular.module("tw.styleguide.forms.radio", []).component("twRadio", _twRadioComponent2["default"]).name;
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
    var _twUploadComponent = __webpack_require__(45), _twUploadComponent2 = _interopRequireDefault(_twUploadComponent), _twFileInputDirective = __webpack_require__(44), _twFileInputDirective2 = _interopRequireDefault(_twFileInputDirective);
    exports["default"] = angular.module("tw.styleguide.forms.upload", []).directive("twFileInput", _twFileInputDirective2["default"]).component("twUpload", _twUploadComponent2["default"]).name;
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
    var _twTabsComponent = __webpack_require__(50), _twTabsComponent2 = _interopRequireDefault(_twTabsComponent);
    exports["default"] = angular.module("tw.styleguide.navigation.tabs", []).component("twTabs", _twTabsComponent2["default"]).name;
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
    var _twCurrencyService = __webpack_require__(52), _twCurrencyService2 = _interopRequireDefault(_twCurrencyService);
    exports["default"] = angular.module("tw.styleguide.services.currency", []).service("TwCurrencyService", _twCurrencyService2["default"]).name;
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
    var _twDateService = __webpack_require__(53), _twDateService2 = _interopRequireDefault(_twDateService);
    exports["default"] = angular.module("tw.styleguide.services.date", []).service("TwDateService", _twDateService2["default"]).name;
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
    var _select = __webpack_require__(0), _twAmountCurrencySelectComponent = (_interopRequireDefault(_select), 
    __webpack_require__(20)), _twAmountCurrencySelectComponent2 = _interopRequireDefault(_twAmountCurrencySelectComponent);
    exports["default"] = angular.module("tw.styleguide.forms.amount-currency-select", []).component("twAmountCurrencySelect", _twAmountCurrencySelectComponent2["default"]).name;
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
    var _twCurrencyInputComponent = __webpack_require__(24), _twCurrencyInputComponent2 = _interopRequireDefault(_twCurrencyInputComponent);
    exports["default"] = angular.module("tw.styleguide.forms.currency-input", []).component("twCurrencyInput", _twCurrencyInputComponent2["default"]).name;
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
    var _twDateLookupComponent = __webpack_require__(26), _twDateLookupComponent2 = _interopRequireDefault(_twDateLookupComponent);
    exports["default"] = angular.module("tw.styleguide.forms.date-lookup", []).component("twDateLookup", _twDateLookupComponent2["default"]).name;
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
    var _twFocusableDirective = __webpack_require__(34), _twFocusableDirective2 = _interopRequireDefault(_twFocusableDirective);
    exports["default"] = angular.module("tw.styleguide.forms.focusable", []).directive("twFocusable", _twFocusableDirective2["default"]).name;
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
    var _twRequirementsService = __webpack_require__(39), _twRequirementsService2 = _interopRequireDefault(_twRequirementsService), _twRequirementsFormComponent = __webpack_require__(37), _twRequirementsFormComponent2 = _interopRequireDefault(_twRequirementsFormComponent), _tabs = __webpack_require__(7), _fieldset = (_interopRequireDefault(_tabs), 
    __webpack_require__(4));
    _interopRequireDefault(_fieldset);
    exports["default"] = angular.module("tw.styleguide.forms.requirements-form", []).service("TwRequirementsService", _twRequirementsService2["default"]).component("twRequirementsForm", _twRequirementsFormComponent2["default"]).name;
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
    var _twUploadDroppableDirective = __webpack_require__(43), _twUploadDroppableDirective2 = _interopRequireDefault(_twUploadDroppableDirective), _twFileSelectDirective = __webpack_require__(42), _twFileSelectDirective2 = _interopRequireDefault(_twFileSelectDirective);
    exports["default"] = angular.module("tw.styleguide.forms.upload-droppable", []).directive("twFileSelect", _twFileSelectDirective2["default"]).component("twUploadDroppable", _twUploadDroppableDirective2["default"]).name;
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
    var _twLoaderComponent = __webpack_require__(47), _twLoaderComponent2 = _interopRequireDefault(_twLoaderComponent);
    exports["default"] = angular.module("tw.styleguide.loading.loader", []).component("twLoader", _twLoaderComponent2["default"]).name;
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
    var _twProcessComponent = __webpack_require__(48), _twProcessComponent2 = _interopRequireDefault(_twProcessComponent);
    exports["default"] = angular.module("tw.styleguide.loading.process", []).component("twProcess", _twProcessComponent2["default"]).name;
}, function(module, exports) {
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
    var _angular = __webpack_require__(18), _angular2 = _interopRequireDefault(_angular), _checkbox = __webpack_require__(1), _checkbox2 = _interopRequireDefault(_checkbox), _radio = __webpack_require__(5), _radio2 = _interopRequireDefault(_radio), _select = __webpack_require__(0), _select2 = _interopRequireDefault(_select), _upload = __webpack_require__(6), _upload2 = _interopRequireDefault(_upload), _date = __webpack_require__(2), _date2 = _interopRequireDefault(_date), _dateLookup = __webpack_require__(12), _dateLookup2 = _interopRequireDefault(_dateLookup), _currencyInput = __webpack_require__(11), _currencyInput2 = _interopRequireDefault(_currencyInput), _amountCurrencySelect = __webpack_require__(10), _amountCurrencySelect2 = _interopRequireDefault(_amountCurrencySelect), _dynamicFormControl = __webpack_require__(3), _dynamicFormControl2 = _interopRequireDefault(_dynamicFormControl), _fieldset = __webpack_require__(4), _fieldset2 = _interopRequireDefault(_fieldset), _focusable = __webpack_require__(13), _focusable2 = _interopRequireDefault(_focusable), _tabs = __webpack_require__(7), _tabs2 = _interopRequireDefault(_tabs), _loader = __webpack_require__(16), _loader2 = _interopRequireDefault(_loader), _process = __webpack_require__(17), _process2 = _interopRequireDefault(_process), _requirementsForm = __webpack_require__(14), _requirementsForm2 = _interopRequireDefault(_requirementsForm), _uploadDroppable = __webpack_require__(15), _uploadDroppable2 = _interopRequireDefault(_uploadDroppable);
    exports["default"] = _angular2["default"].module("tw.form-components", [ _checkbox2["default"], _radio2["default"], _select2["default"], _upload2["default"], _date2["default"], _dateLookup2["default"], _currencyInput2["default"], _amountCurrencySelect2["default"], _dynamicFormControl2["default"], _fieldset2["default"], _focusable2["default"], _tabs2["default"], _loader2["default"], _process2["default"], _requirementsForm2["default"], _uploadDroppable2["default"] ]).name;
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
    var _twAmountCurrencySelectController = __webpack_require__(21), _twAmountCurrencySelectController2 = _interopRequireDefault(_twAmountCurrencySelectController), TwAmountCurrencySelect = {
        require: "ngModel",
        controller: _twAmountCurrencySelectController2["default"],
        transclude: {
            addon: "?addon"
        },
        bindings: {
            ngModel: "=",
            ngMin: "<",
            ngMax: "<",
            ngRequired: "<",
            ngDisabled: "<",
            ngChange: "&",
            amountReadOnly: "<",
            onAmountChange: "&",
            currency: "=",
            currencies: "<",
            onCurrencyChange: "&",
            currencyFilterPlaceholder: "@",
            customActionLabel: "<",
            onCustomAction: "&",
            placeholder: "@",
            size: "@",
            locale: "@"
        },
        template: __webpack_require__(54)
    };
    exports["default"] = TwAmountCurrencySelect;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function TwAmountCurrencySelectController($element, $scope, $timeout, TwCurrencyService) {
        function isNumber(value) {
            return !isNaN(parseFloat(value));
        }
        var $ctrl = this, $ngModel = $element.controller("ngModel");
        $ctrl.showDecimals = !0, $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
            newValue !== oldValue && $ngModel.$setDirty();
        }), $scope.$watch("$ctrl.currency", function(newValue, oldValue) {
            newValue && newValue !== oldValue && ($ctrl.showDecimals = TwCurrencyService.getDecimals(newValue) > 0);
        }), $element.find("input").on("blur", function() {
            $ngModel.$setTouched(), $element.triggerHandler("blur");
        }), $ngModel.$validators.min = function(modelValue, viewValue) {
            return "undefined" == typeof $ctrl.ngMin || null === $ctrl.ngMin || !isNumber(viewValue) || viewValue >= $ctrl.ngMin;
        }, $ngModel.$validators.max = function(modelValue, viewValue) {
            return "undefined" == typeof $ctrl.ngMax || null === $ctrl.ngMax || !isNumber(viewValue) || viewValue <= $ctrl.ngMax;
        }, $ctrl.changedAmount = function() {
            $ctrl.ngChange && $timeout($ctrl.ngChange), $ctrl.onAmountChange && (console & console.log && console.log("onAmountChange is deprecated in twAmountCurrencySelect, please use ngChange."), 
            $timeout($ctrl.onAmountChange));
        }, $ctrl.changedCurrency = function() {
            $ctrl.onCurrencyChange && $timeout($ctrl.onCurrencyChange);
        }, $ctrl.customAction = function() {
            $ctrl.onCustomAction && $ctrl.onCustomAction();
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _currency = __webpack_require__(8);
    _interopRequireDefault(_currency);
    TwAmountCurrencySelectController.$inject = [ "$element", "$scope", "$timeout", "TwCurrencyService" ], 
    exports["default"] = TwAmountCurrencySelectController;
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
    var _twCheckboxController = __webpack_require__(23), _twCheckboxController2 = _interopRequireDefault(_twCheckboxController), TwCheckbox = {
        require: "ngModel",
        controller: _twCheckboxController2["default"],
        bindings: {
            name: "@",
            ngModel: "=",
            ngTrueValue: "<",
            ngFalseValue: "<",
            ngRequired: "<",
            ngDisabled: "<"
        },
        template: __webpack_require__(55)
    };
    exports["default"] = TwCheckbox;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwCheckboxController($scope, $element) {
        var $ctrl = this, $ngModel = $element.controller("ngModel");
        $element.find(".tw-checkbox-button");
        $ctrl.isChecked = function() {
            return $ctrl.ngTrueValue && $ctrl.ngTrueValue === $ctrl.ngModel || !$ctrl.ngTrueValue && $ctrl.ngModel || !1;
        }, $ctrl.checked = $ctrl.isChecked(), $ctrl.buttonClick = function($event) {
            $ctrl.checked ? ($ctrl.checked = !1, $ngModel.$setViewValue($ctrl.ngFalseValue || !1)) : ($ctrl.checked = !0, 
            $ngModel.$setViewValue($ctrl.ngTrueValue || !0)), $ngModel.$setTouched(), $event && $event.stopPropagation(), 
            validateCheckbox($ctrl.checked, $element, $ngModel, $ctrl);
        }, $ctrl.buttonFocus = function() {
            $element.closest(".checkbox").find("label").addClass("focus"), $element.triggerHandler("focus");
        }, $ctrl.buttonBlur = function() {
            $element.closest(".checkbox").find("label").removeClass("focus"), $element.triggerHandler("blur"), 
            $ngModel.$setTouched(), validateCheckbox($ctrl.checked, $element, $ngModel, $ctrl);
        }, $ctrl.hiddenClick = function($event) {
            $event.stopPropagation();
        }, $element.closest("label").on("click", function(event) {
            $element.find("button").trigger("click"), event.preventDefault(), event.stopPropagation();
        }), $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
            newValue !== oldValue && ($ngModel.$setDirty(), validateCheckbox($ctrl.checked, $element, $ngModel, $ctrl), 
            $ctrl.checked = $ctrl.isChecked());
        }), $scope.$watch("$ctrl.ngDisabled", function(newValue, oldValue) {
            newValue && !oldValue ? $element.closest(".checkbox").addClass("disabled").addClass("disabled", !0) : !newValue && oldValue && $element.closest(".checkbox").removeClass("disabled").removeClass("disabled");
        }), $scope.$watch("$ctrl.ngRequired", function(newValue, oldValue) {
            newValue !== oldValue && newValue && validateCheckbox($ctrl.checked, $element, $ngModel, $ctrl);
        });
    }
    function validateCheckbox(isChecked, $element, $ngModel, $ctrl) {
        $ngModel.$touched && (!isChecked && $ctrl.ngRequired ? ($ngModel.$setValidity("required", !1), 
        $element.find(".tw-checkbox-button").addClass("has-error"), $element.closest(".checkbox").addClass("has-error"), 
        $element.closest(".form-group").addClass("has-error")) : ($ngModel.$setValidity("required", !0), 
        $element.find(".tw-checkbox-button").removeClass("has-error"), $element.closest(".checkbox").removeClass("has-error"), 
        $element.closest(".form-group").removeClass("has-error")));
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), TwCheckboxController.$inject = [ "$scope", "$element" ], exports["default"] = TwCheckboxController;
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
    var _twCurrencyInputController = __webpack_require__(25), _twCurrencyInputController2 = _interopRequireDefault(_twCurrencyInputController), TwCurrencyInput = {
        require: "ngModel",
        controller: _twCurrencyInputController2["default"],
        transclude: {
            addon: "?addon"
        },
        bindings: {
            ngModel: "=",
            ngChange: "&",
            ngMin: "<",
            ngMax: "<",
            ngRequired: "<",
            ngDisabled: "<",
            currency: "=",
            currencyCode: "@",
            placeholder: "@",
            size: "@",
            locale: "@"
        },
        template: __webpack_require__(56)
    };
    exports["default"] = TwCurrencyInput;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function TwCurrencyInputController($element, $scope, $timeout, TwCurrencyService) {
        function isNumber(value) {
            return !isNaN(parseFloat(value));
        }
        var $ctrl = this, $ngModel = $element.controller("ngModel");
        $ctrl.showDecimals = !0, $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
            newValue !== oldValue && $ngModel.$setDirty();
        }), $scope.$watch("$ctrl.currency", function(newValue, oldValue) {
            newValue !== oldValue && ($ctrl.showDecimals = TwCurrencyService.getDecimals(newValue) > 0);
        }), $element.find("input").on("blur", function() {
            $ngModel.$setTouched(), $element.triggerHandler("blur");
        }), $ctrl.currencyCode && console && console.log && console.log("currency code is deprecated in twCurrencyInput, please use currency."), 
        $ngModel.$validators.min = function(modelValue, viewValue) {
            return "undefined" == typeof $ctrl.ngMin || null === $ctrl.ngMin || !isNumber(viewValue) || viewValue >= $ctrl.ngMin;
        }, $ngModel.$validators.max = function(modelValue, viewValue) {
            return "undefined" == typeof $ctrl.ngMax || null === $ctrl.ngMax || !isNumber(viewValue) || viewValue <= $ctrl.ngMax;
        }, $ctrl.changedInputValue = function() {
            $ctrl.ngChange && $timeout($ctrl.ngChange);
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _currency = __webpack_require__(8);
    _interopRequireDefault(_currency);
    TwCurrencyInputController.$inject = [ "$element", "$scope", "$timeout", "TwCurrencyService" ], 
    exports["default"] = TwCurrencyInputController;
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
    var _twDateLookupController = __webpack_require__(27), _twDateLookupController2 = _interopRequireDefault(_twDateLookupController), TwDateLookup = {
        require: "ngModel",
        controller: _twDateLookupController2["default"],
        bindings: {
            ngModel: "=",
            ngChange: "&",
            ngMin: "=",
            ngMax: "=",
            ngRequired: "=",
            ngDisabled: "=",
            placeholder: "@",
            size: "@",
            locale: "@",
            label: "@",
            shortDate: "<"
        },
        template: __webpack_require__(57)
    };
    exports["default"] = TwDateLookup;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function TwDateLookupController($element, $scope, $timeout, TwDateService) {
        function init() {
            $ctrl.yearOffset = 0, ngModelCtrl = $element.controller("ngModel"), addValidators(), 
            addWatchers(), ngModelCtrl.$formatters.push(function(newDate) {
                return updateCalendarView(newDate), newDate;
            }), $element.find(".btn, .dropdown-menu").on("focusout", function() {
                $timeout(function() {
                    0 !== $element.find(".btn:focus").length || $element.find(".btn-group").hasClass("open") || ($element.parents(".form-group").removeClass("focus"), 
                    $element.triggerHandler("blur"));
                }, 150);
            }), setLocale($ctrl.locale), updateMinDateView($ctrl.ngMin), updateMaxDateView($ctrl.ngMax);
        }
        function resetFocus() {
            $element.find("button").focus();
        }
        function addValidators() {
            ngModelCtrl.$validators.min = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                return !(value && value < $ctrl.ngMin) || ($element.parents(".form-group").addClass("has-error"), 
                !1);
            }, ngModelCtrl.$validators.max = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                return !(value && value > $ctrl.ngMax) || ($element.parents(".form-group").addClass("has-error"), 
                !1);
            };
        }
        function addWatchers() {
            $scope.$watch("$ctrl.locale", function(newValue, oldValue) {
                newValue && newValue !== oldValue && setLocale(newValue);
            }), $scope.$watch("$ctrl.ngRequired", function(newValue, oldValue) {
                ngModelCtrl.$validate();
            }), $scope.$watch("$ctrl.ngMin", function(newValue, oldValue) {
                newValue !== oldValue && (updateMinDateView($ctrl.ngMin), ngModelCtrl.$validate());
            }), $scope.$watch("$ctrl.shortDate", function(newValue, oldValue) {
                updateSelectedDatePresentation();
            }), $scope.$watch("$ctrl.ngMax", function(newValue, oldValue) {
                newValue !== oldValue && (updateMaxDateView($ctrl.ngMax), ngModelCtrl.$validate());
            }), $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
                newValue && ($ctrl.selectedDate = TwDateService.getUTCDate(newValue), $ctrl.selectedMonth = TwDateService.getUTCMonth(newValue), 
                $ctrl.selectedYear = TwDateService.getUTCFullYear(newValue), updateSelectedDatePresentation());
            });
        }
        function updateCalendarView(viewDate) {
            viewDate && viewDate.getUTCDate || (viewDate = TwDateService.getLocaleToday()), 
            $ctrl.day = TwDateService.getUTCDate(viewDate), $ctrl.month = TwDateService.getUTCMonth(viewDate), 
            $ctrl.year = TwDateService.getUTCFullYear(viewDate), $ctrl.weeks = getTableStructure(), 
            updateCalendarDatePresentation();
        }
        function getTableStructure() {
            var firstDayOfMonth = TwDateService.getWeekday($ctrl.year, $ctrl.month, 1);
            0 === firstDayOfMonth && (firstDayOfMonth = 7);
            for (var daysInMonth = TwDateService.getLastDayOfMonth($ctrl.year, $ctrl.month), week = [], weeks = [], i = 1; i < firstDayOfMonth; i++) week.push(!1);
            for (i = 1; i <= daysInMonth; i++) week.push(i), (firstDayOfMonth + i - 1) % 7 === 0 && (weeks.push(week), 
            week = []);
            if (week.length) {
                for (i = week.length; i < 7; i++) week.push(!1);
                weeks.push(week);
            }
            return weeks;
        }
        function setLocale(locale) {
            locale || ($ctrl.locale = "en-GB"), $ctrl.monthBeforeDay = TwDateService.isMonthBeforeDay($ctrl.locale), 
            $ctrl.monthsOfYear = TwDateService.getMonthNamesForLocale($ctrl.locale, "long"), 
            $ctrl.shortMonthsOfYear = TwDateService.getMonthNamesForLocale($ctrl.locale, "short"), 
            $ctrl.daysOfWeek = TwDateService.getDayNamesForLocale($ctrl.locale, "short"), $ctrl.shortDaysOfWeek = TwDateService.getDayNamesForLocale($ctrl.locale, "narrow"), 
            updateSelectedDatePresentation();
        }
        function updateSelectedDatePresentation() {
            var monthsOfYear = $ctrl.shortDate ? $ctrl.shortMonthsOfYear : $ctrl.monthsOfYear;
            $ctrl.selectedDateFormatted = TwDateService.getYearMonthDatePresentation($ctrl.selectedYear, monthsOfYear[$ctrl.selectedMonth], $ctrl.selectedDate, $ctrl.locale);
        }
        function updateCalendarDatePresentation() {
            $ctrl.yearMonthFormatted = TwDateService.getYearAndMonthPresentation($ctrl.year, $ctrl.monthsOfYear[$ctrl.month], $ctrl.locale);
        }
        function moveDateToWithinRange(date, min, max) {
            return date || (date = TwDateService.getLocaleToday()), min && min > date ? min : max && max < date ? max : date;
        }
        function setModel(modelDate) {
            modelDate = moveDateToWithinRange(modelDate, $ctrl.ngMin, $ctrl.ngMax), ngModelCtrl.$setViewValue(modelDate), 
            ngModelCtrl.$setDirty(), updateCalendarView(modelDate);
        }
        function updateMinDateView(minDate) {
            minDate && minDate.getUTCDate ? (minDay = TwDateService.getUTCDate(minDate), minMonth = TwDateService.getUTCMonth(minDate), 
            minYear = TwDateService.getUTCFullYear(minDate)) : (minDay = null, minMonth = null, 
            minYear = null);
        }
        function updateMaxDateView(maxDate) {
            maxDate && maxDate.getUTCDate ? (maxDay = TwDateService.getUTCDate(maxDate), maxMonth = TwDateService.getUTCMonth(maxDate), 
            maxYear = TwDateService.getUTCFullYear(maxDate)) : (maxDay = null, maxMonth = null, 
            maxYear = null);
        }
        function findActiveLink() {
            $timeout(function() {
                $element.find("a.active").focus();
            });
        }
        function adjustDate(mode, date, days, months, years) {
            var newDate = date;
            "day" === mode && (newDate = TwDateService.addDays(date, days)), "month" === mode && (newDate = TwDateService.addMonths(date, months)), 
            "year" === mode && (newDate = TwDateService.addYears(date, years)), setModel(newDate);
        }
        var ngModelCtrl, minDay, minMonth, minYear, maxDay, maxMonth, maxYear, $ctrl = this;
        $ctrl.openLookup = function() {
            ngModelCtrl.$setTouched(), $ctrl.mode = "day";
            var viewDate = $ctrl.ngModel;
            $ctrl.ngMin && $ctrl.ngModel < $ctrl.ngMin && (viewDate = $ctrl.ngMin), $ctrl.ngMax && $ctrl.ngModel > $ctrl.ngMax && (viewDate = $ctrl.ngMax), 
            updateCalendarView(viewDate), $timeout(function() {
                $element.find(".tw-date-lookup-month-label").focus();
            });
        }, $ctrl.selectDay = function($event, day, month, year) {
            return $ctrl.isDayDisabled(day, month, year) ? void $event.stopPropagation() : ($ctrl.day = day, 
            setModel(TwDateService.getUTCDateFromParts(year, month, day)), resetFocus(), void updateCalendarDatePresentation());
        }, $ctrl.selectMonth = function($event, month, year) {
            $event.stopPropagation(), $ctrl.isMonthDisabled(month, year) || ($ctrl.month = month, 
            $ctrl.weeks = getTableStructure(), $ctrl.mode = "day", updateCalendarDatePresentation());
        }, $ctrl.selectYear = function($event, year) {
            $event.stopPropagation(), $ctrl.isYearDisabled(year) || ($ctrl.year = year, $ctrl.mode = "month", 
            updateCalendarDatePresentation());
        }, $ctrl.monthBefore = function($event) {
            $event.stopPropagation(), 0 === $ctrl.month ? ($ctrl.year--, $ctrl.month = 11) : $ctrl.month--, 
            $ctrl.weeks = getTableStructure(), updateCalendarDatePresentation();
        }, $ctrl.yearBefore = function($event) {
            $event.stopPropagation(), $ctrl.year--, $ctrl.weeks = getTableStructure(), updateCalendarDatePresentation();
        }, $ctrl.monthAfter = function($event) {
            $event.stopPropagation(), 11 === $ctrl.month ? ($ctrl.year++, $ctrl.month = 0) : $ctrl.month++, 
            $ctrl.weeks = getTableStructure(), updateCalendarDatePresentation();
        }, $ctrl.yearAfter = function($event) {
            $event.stopPropagation(), $ctrl.year++, $ctrl.weeks = getTableStructure(), updateCalendarDatePresentation();
        }, $ctrl.isCurrentlySelected = function(day, month, year) {
            return day === $ctrl.selectedDate && month === $ctrl.selectedMonth && year === $ctrl.selectedYear;
        }, $ctrl.isDayDisabled = function(day, month, year) {
            return $ctrl.isYearDisabled(year) || $ctrl.isMonthDisabled(month, year) || year === minYear && month === minMonth && day < minDay || year === maxYear && month === maxMonth && day > maxDay;
        }, $ctrl.isMonthDisabled = function(month, year) {
            return $ctrl.isYearDisabled(year) || year === minYear && month < minMonth || year === maxYear && month > maxMonth;
        }, $ctrl.isYearDisabled = function(year) {
            return minYear && year < minYear || maxYear && year > maxYear;
        }, $ctrl.switchToMonths = function($event) {
            resetFocus($event.target), findActiveLink(), $event.stopPropagation(), $ctrl.mode = "month";
        }, $ctrl.switchToYears = function($event) {
            resetFocus($event.target), findActiveLink(), $event.stopPropagation(), $ctrl.mode = "year";
        }, $ctrl.setYearOffset = function($event, addtionalOffset) {
            $event.stopPropagation(), $ctrl.yearOffset += addtionalOffset;
        }, $ctrl.buttonFocus = function() {
            $element.parents(".form-group").addClass("focus"), $element.triggerHandler("focus");
        }, $ctrl.blur = function() {
            $element.triggerHandler("focus");
        }, $ctrl.keyHandler = function(event) {
            if (!$ctrl.ngModel) return void setModel(TwDateService.getUTCDateFromParts($ctrl.year, $ctrl.month, $ctrl.day));
            var characterCode = event.which || event.charCode || event.keyCode;
            return 37 === characterCode ? adjustDate($ctrl.mode, $ctrl.ngModel, -1, -1, -1) : 38 === characterCode ? (event.preventDefault(), 
            adjustDate($ctrl.mode, $ctrl.ngModel, -7, -4, -4)) : 39 === characterCode ? adjustDate($ctrl.mode, $ctrl.ngModel, 1, 1, 1) : 40 === characterCode && (event.preventDefault(), 
            adjustDate($ctrl.mode, $ctrl.ngModel, 7, 4, 4)), findActiveLink(), !0;
        }, init();
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _date = __webpack_require__(9);
    _interopRequireDefault(_date);
    TwDateLookupController.$inject = [ "$element", "$scope", "$timeout", "TwDateService" ], 
    exports["default"] = TwDateLookupController;
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
    var _twDateController = __webpack_require__(29), _twDateController2 = _interopRequireDefault(_twDateController), TwDate = {
        require: "ngModel",
        controller: _twDateController2["default"],
        bindings: {
            ngModel: "=",
            required: "@",
            ngRequired: "<",
            disabled: "@",
            ngDisabled: "<",
            locale: "@",
            twLocale: "<",
            min: "@",
            ngMin: "<",
            max: "@",
            ngMax: "<",
            modelType: "@"
        },
        template: __webpack_require__(58)
    };
    exports["default"] = TwDate;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function TwDateController($element, $log, $scope, TwDateService) {
        function init() {
            if ($ctrl.ngModel) applyDateModelIfValidOrThrowError(), initialisedWithDate = !0; else {
                if ($ctrl.modelType) {
                    if ($ctrl.modelType !== STRING_TYPE && $ctrl.modelType !== OBJECT_TYPE) throw new Error("Invalid modelType, should be " + STRING_TYPE + " or " + OBJECT_TYPE);
                    $ctrl.dateModelType = $ctrl.modelType;
                } else $ctrl.dateModelType = OBJECT_TYPE;
                $ctrl.day = null, $ctrl.month = 0, $ctrl.year = null;
            }
            ngModel = $element.controller("ngModel"), ngModel.$validators.min = function(value) {
                var limit = prepDateLimitForComparison($ctrl.ngMin, $ctrl.min), dateValue = prepDateValueForComparison(value);
                return !limit || !dateValue || dateValue >= limit;
            }, ngModel.$validators.max = function(value) {
                var limit = prepDateLimitForComparison($ctrl.ngMax, $ctrl.max), dateValue = prepDateValueForComparison(value);
                return !limit || !dateValue || dateValue <= limit;
            }, setDateRequired(), setDateDisabled(), setDateLocale(), setMonths(), registerWatchers(), 
            addBlurHandlers($element);
        }
        function addBlurHandlers($element) {
            var dayTouched, yearTouched;
            $element.find("input[name=day]").on("blur", function() {
                dayTouched = !0, dayTouched && yearTouched && (ngModel.$setTouched(), $element.triggerHandler("blur"));
            }), $element.find("input[name=year]").on("blur", function() {
                yearTouched = !0, ngModel.$setTouched(), $element.triggerHandler("blur");
            });
        }
        function prepDateLimitForComparison(ngLimit, attrLimit) {
            var limit = ngLimit ? ngLimit : !!attrLimit && attrLimit;
            return !!limit && (limit = "string" == typeof limit ? new Date(limit) : limit, !!validDateObject(limit) && limit);
        }
        function prepDateValueForComparison(dateValue) {
            return "string" == typeof dateValue ? new Date(dateValue) : dateValue;
        }
        function applyDateModelIfValidOrThrowError() {
            if (!validDate($ctrl.ngModel)) throw new Error("date model passed should either be instance of Date or valid ISO8601 string");
            $ctrl.dateModelType = "string" == typeof $ctrl.ngModel ? STRING_TYPE : OBJECT_TYPE, 
            $ctrl.explodeDateModel($ctrl.ngModel);
        }
        function setMonths() {
            $ctrl.dateMonths = getMonthsBasedOnIntlSupportForLocale();
        }
        function setDateRequired() {
            $ctrl.dateRequired = void 0 !== $ctrl.ngRequired ? $ctrl.ngRequired : void 0 !== $ctrl.required;
        }
        function setDateDisabled() {
            $ctrl.dateDisabled = void 0 !== $ctrl.ngDisabled ? $ctrl.ngDisabled : void 0 !== $ctrl.disabled;
        }
        function setDateLocale() {
            $ctrl.locale || ($ctrl.locale = DEFAULT_LOCALE_EN), $ctrl.monthBeforeDay = TwDateService.isMonthBeforeDay($ctrl.locale);
        }
        function explodeDateModel(date) {
            var dateObj = "string" == typeof date ? new Date(date) : date;
            $ctrl.day = dateObj.getUTCDate(), $ctrl.month = dateObj.getUTCMonth(), $ctrl.year = dateObj.getUTCFullYear();
        }
        function validDate(date) {
            return validDateObject(date) || validDateString(date);
        }
        function validDateObject(dateObj) {
            return "[object Date]" === Object.prototype.toString.call(dateObj) && !isNaN(dateObj.getTime());
        }
        function validDateString(dateString) {
            return "string" == typeof dateString && validDateObject(new Date(dateString));
        }
        function registerWatchers() {
            $scope.$watch("$ctrl.day", function(newValue, oldValue) {
                newValue !== oldValue && initialisedWithDate && ngModel.$setDirty();
            }), $scope.$watch("$ctrl.month", function(newValue, oldValue) {
                newValue !== oldValue && ($ctrl.adjustLastDay(), ngModel.$setTouched(), initialisedWithDate && ngModel.$setDirty());
            }), $scope.$watch("$ctrl.year", function(newValue, oldValue) {
                newValue !== oldValue && initialisedWithDate && ngModel.$setDirty();
            }), $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
                newValue !== oldValue && validDate($ctrl.ngModel) && (ngModel.$setDirty(), $ctrl.explodeDateModel($ctrl.ngModel));
            }), $scope.$watch("$ctrl.ngRequired", function(newValue, oldValue) {
                newValue !== oldValue && setDateRequired();
            }), $scope.$watch("$ctrl.ngDisabled", function(newValue, oldValue) {
                newValue !== oldValue && setDateDisabled();
            }), $scope.$watch("$ctrl.locale", function(newValue, oldValue) {
                newValue !== oldValue && (setDateLocale(), setMonths());
            });
        }
        function getMonthsBasedOnIntlSupportForLocale() {
            var monthNames = TwDateService.getMonthNamesForLocale($ctrl.locale);
            return extendMonthsWithIds(monthNames);
        }
        function extendMonthsWithIds(monthNames) {
            return monthNames.map(function(monthName, index) {
                return {
                    value: index,
                    label: monthName
                };
            });
        }
        function isExplodedDatePatternCorrect() {
            return isNumber($ctrl.year) && isNumber($ctrl.day) && (isNumber($ctrl.month) || isNumericString($ctrl.month));
        }
        function isNumber(value) {
            return "number" == typeof value;
        }
        function isNumericString(value) {
            return "string" == typeof value && !isNaN(Number($ctrl.month));
        }
        function combineDate() {
            var date = TwDateService.getUTCDateFromParts(Number($ctrl.year), Number($ctrl.month), Number($ctrl.day));
            return date;
        }
        function updateDateModelAndValidationClasses() {
            if ($ctrl.adjustLastDay(), !isExplodedDatePatternCorrect()) return void ngModel.$setViewValue(null);
            var dateObj = combineDate();
            if ($ctrl.dateModelType === STRING_TYPE) {
                var isoString = dateObj.toISOString(), dateString = isoString.substring(0, isoString.indexOf("T"));
                ngModel.$setViewValue(dateString);
            } else ngModel.$setViewValue(dateObj);
        }
        function adjustLastDay() {
            var day = Number($ctrl.day), month = Number($ctrl.month), year = Number($ctrl.year), lastUTCDayForMonthAndYear = TwDateService.getLastDayOfMonth(year, month);
            day > lastUTCDayForMonthAndYear && ($ctrl.day = parseInt(lastUTCDayForMonthAndYear, 10));
        }
        var ngModel, $ctrl = this, initialisedWithDate = !1;
        $ctrl.updateDateModelAndValidationClasses = updateDateModelAndValidationClasses, 
        $ctrl.explodeDateModel = explodeDateModel, $ctrl.combineDate = combineDate, $ctrl.adjustLastDay = adjustLastDay, 
        $ctrl.validDate = validDate;
        var DEFAULT_LOCALE_EN = "en", STRING_TYPE = "string", OBJECT_TYPE = "object";
        init();
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _date = __webpack_require__(9);
    _interopRequireDefault(_date);
    TwDateController.$inject = [ "$element", "$log", "$scope", "TwDateService" ], exports["default"] = TwDateController;
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
    var _twDynamicFormControlController = __webpack_require__(31), _twDynamicFormControlController2 = _interopRequireDefault(_twDynamicFormControlController), TwDynamicFormControl = {
        require: "ngModel",
        transclude: !0,
        controller: _twDynamicFormControlController2["default"],
        bindings: {
            type: "@",
            name: "@",
            id: "@",
            label: "@",
            placeholder: "@",
            helpText: "@",
            step: "@",
            locale: "@",
            uploadAccept: "@",
            uploadIcon: "@",
            uploadTooLargeMessage: "@",
            options: "<",
            ngModel: "=",
            ngChange: "&",
            ngRequired: "<",
            ngDisabled: "<",
            ngMinlength: "<twMinlength",
            ngMaxlength: "<twMaxlength",
            ngMin: "<",
            ngMax: "<",
            ngPattern: "<",
            uploadOptions: "<",
            textFormat: "<"
        },
        template: __webpack_require__(59)
    };
    exports["default"] = TwDynamicFormControl;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwDynamicFormControlController($element, $scope) {
        var $ctrl = this, ngModelController = $element.controller("ngModel");
        $ctrl.change = function() {
            ngModelController.$setDirty(), $ctrl.ngChange && $ctrl.ngChange();
        }, $ctrl.focus = function() {
            $element.triggerHandler("focus");
        }, $ctrl.blur = function() {
            ngModelController.$setTouched(), $element.triggerHandler("blur");
        }, ngModelController.$validators.minlength = function(modelValue, viewValue) {
            var value = modelValue || viewValue;
            return "text" !== $ctrl.type || !$ctrl.ngMinlength || (!value || value.length >= $ctrl.ngMinlength);
        }, ngModelController.$validators.maxlength = function(modelValue, viewValue) {
            var value = modelValue || viewValue;
            return "text" !== $ctrl.type || !$ctrl.ngMaxlength || (!value || value.length <= $ctrl.ngMaxlength);
        }, ngModelController.$validators.min = function(modelValue, viewValue) {
            var value = modelValue || viewValue;
            return "undefined" == typeof $ctrl.ngMin || !("number" == typeof value && "number" == typeof $ctrl.ngMin && value < $ctrl.ngMin) && !(value && value.getUTCDate && $ctrl.ngMin.getUTCDate && value < $ctrl.ngMin);
        }, ngModelController.$validators.max = function(modelValue, viewValue) {
            var value = modelValue || viewValue;
            return "undefined" == typeof $ctrl.ngMax || !("number" == typeof value && "number" == typeof $ctrl.ngMax && value > $ctrl.ngMax) && !(value && viewValue.getUTCDate && $ctrl.ngMax.getUTCDate && value > $ctrl.ngMax);
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), TwDynamicFormControlController.$inject = [ "$element", "$scope" ], exports["default"] = TwDynamicFormControlController;
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
    var _twFieldsetController = __webpack_require__(33), _twFieldsetController2 = _interopRequireDefault(_twFieldsetController), TwFieldset = {
        bindings: {
            legend: "@",
            model: "=",
            fields: "<",
            uploadOptions: "<",
            locale: "@",
            onRefreshRequirements: "&",
            validationMessages: "<",
            errorMessages: "<",
            isValid: "=?"
        },
        controller: _twFieldsetController2["default"],
        template: __webpack_require__(60)
    };
    exports["default"] = TwFieldset;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwFieldsetController($scope) {
        function init() {
            $ctrl.model || ($ctrl.model = {}), $ctrl.fields && prepFields($ctrl.fields), $scope.$watch("$ctrl.fields", function(newValue, oldValue) {
                angular.equals(newValue, oldValue) || prepFields($ctrl.fields);
            }), $scope.$watch("twFieldset.$valid", function(validity) {
                $ctrl.isValid = validity;
            }), $ctrl.validationMessages || ($ctrl.validationMessages = {
                required: "Required",
                pattern: "Incorrect format",
                min: "The value is too low",
                max: "The value is too high",
                minlength: "The value is too short",
                maxlength: "The value is too long"
            });
        }
        function removeFieldError(fieldKey) {
            $ctrl.errorMessages && delete $ctrl.errorMessages[fieldKey];
        }
        function prepFields(fields) {
            fields.forEach(function(fieldGroup) {
                fieldGroup.group.length && (fieldGroup.key = fieldGroup.group[0].key), fieldGroup.group.forEach(function(field) {
                    "upload" === field.type && (fieldGroup.type = "upload"), prepRegExp(field), prepValuesAsync(field), 
                    prepValuesAllowed(field);
                });
            });
        }
        function prepRegExp(field) {
            if (field.validationRegexp) try {
                field.validationRegexp = new RegExp(field.validationRegexp);
            } catch (ex) {
                console.log("API regexp is invalid"), field.validationRegexp = !1;
            } else field.validationRegexp = !1;
        }
        function prepValuesAsync(field) {
            if (field.valuesAsync) {
                var postData = {};
                field.valuesAsync.params && field.valuesAsync.params.length && (postData = getParamValuesFromModel($ctrl.model, field.valuesAsync.params)), 
                $http.post(field.valuesAsync.url, postData).then(function(response) {
                    field.valuesAllowed = response.data, prepValuesAllowed(field);
                })["catch"](function() {});
            }
        }
        function prepValuesAllowed(field) {
            angular.isArray(field.valuesAllowed) && field.valuesAllowed.forEach(function(valueAllowed) {
                valueAllowed.value = valueAllowed.key, valueAllowed.label = valueAllowed.name;
            });
        }
        function getParamValuesFromModel(model, params) {
            var data = {};
            return params.forEach(function(param) {
                model[param.key] ? data[param.parameterName] = model[param.key] : param.required;
            }), data;
        }
        var $ctrl = this;
        $ctrl.onBlur = function(field) {
            removeFieldError(field.key), !field.refreshRequirementsOnChange;
        }, $ctrl.onChange = function(field) {
            removeFieldError(field.key);
        }, init();
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), TwFieldsetController.$inject = [ "$scope" ], exports["default"] = TwFieldsetController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwFormControlStyling() {
        return {
            restrict: "C",
            link: FocusableLink
        };
    }
    function TwFocusable() {
        return {
            restrict: "A",
            link: FocusableLink
        };
    }
    function FocusableLink(scope, element) {
        var formGroup = $(element).closest(".form-group");
        $(element).on("focus", function() {
            formGroup.addClass("focus");
        }).on("blur", function() {
            formGroup.removeClass("focus");
        });
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), angular.module("tw.styleguide.styling.default-focus", []).directive("formControl", TwFormControlStyling), 
    exports["default"] = TwFocusable;
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
    var _twRadioController = __webpack_require__(36), _twRadioController2 = _interopRequireDefault(_twRadioController), TwRadio = {
        require: "ngModel",
        controller: _twRadioController2["default"],
        bindings: {
            name: "@",
            value: "@",
            ngModel: "=",
            ngValue: "<",
            ngRequired: "<",
            ngDisabled: "<",
            ngChange: "&"
        },
        template: __webpack_require__(61)
    };
    exports["default"] = TwRadio;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwRadioController($scope, $element) {
        var $ctrl = this, $ngModel = $element.controller("ngModel"), radioSelector = ".radio", labelSelector = "label";
        $ctrl.isChecked = function() {
            return $ctrl.ngValue && $ctrl.ngModel === $ctrl.ngValue || $ctrl.value === $ctrl.ngModel;
        }, $ctrl.checked = $ctrl.isChecked(), $ctrl.buttonClick = function($event) {
            $ctrl.ngDisabled || ($ctrl.checked = !0, $ngModel.$setViewValue($ctrl.ngValue || $ctrl.value));
        }, $ctrl.buttonFocus = function() {
            $element.closest(labelSelector).addClass("focus"), $element.triggerHandler("focus");
        }, $ctrl.buttonBlur = function() {
            $element.closest(labelSelector).removeClass("focus"), $element.triggerHandler("blur");
        }, $ctrl.hiddenInputChange = function() {
            $ctrl.ngChange && $ctrl.ngChange();
        }, $element.on("blur", function(event) {
            $ngModel.$setTouched();
        }), $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
            newValue !== oldValue && $ngModel.$setDirty(), $ctrl.checked = $ctrl.isChecked();
        }), $scope.$watch("$ctrl.ngDisabled", function(newValue, oldValue) {
            newValue && !oldValue ? $element.closest(radioSelector).addClass("disabled") : !newValue && oldValue && $element.closest(radioSelector).removeClass("disabled");
        });
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), TwRadioController.$inject = [ "$scope", "$element" ], exports["default"] = TwRadioController;
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
    var _twRequirementsFormController = __webpack_require__(38), _twRequirementsFormController2 = _interopRequireDefault(_twRequirementsFormController), TwRequirementsForm = {
        bindings: {
            model: "=",
            requirements: "<",
            uploadOptions: "<",
            locale: "@",
            onRefreshRequirements: "&",
            validationMessages: "<",
            errorMessages: "<",
            isValid: "=?"
        },
        controller: _twRequirementsFormController2["default"],
        template: __webpack_require__(62)
    };
    exports["default"] = TwRequirementsForm;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwRequirementsFormController($scope, TwRequirementsService) {
        function init() {
            $ctrl.model || ($ctrl.model = {}), $ctrl.requirements && TwRequirementsService.prepRequirements($ctrl.requirements), 
            $scope.$watch("$ctrl.requirements", function(newRequirements, oldRequirements) {
                if (!angular.equals(newRequirements, oldRequirements)) {
                    TwRequirementsService.prepRequirements($ctrl.requirements);
                    var oldType = $ctrl.model.type, newType = $ctrl.requirements.length ? $ctrl.requirements[0].type : null;
                    $ctrl.model.type = newType, oldRequirements && newRequirements && TwRequirementsService.cleanModel($ctrl.model, oldRequirements, oldType, newRequirements, newType);
                }
            }), $scope.$watch("$ctrl.model.type", function(newType, oldType) {
                switchTab(newType, oldType);
            }), $scope.$watch("twForm.$valid", function(validity) {
                $ctrl.isValid = validity;
            });
        }
        function switchTab(newType, oldType) {
            var oldRequirementType = TwRequirementsService.findRequirementByType(oldType, $ctrl.requirements), newRequirementType = TwRequirementsService.findRequirementByType(newType, $ctrl.requirements);
            oldRequirementType && newRequirementType || ($ctrl.model || ($ctrl.model = {}), 
            $ctrl.model.type = newType), TwRequirementsService.cleanRequirementsModel($ctrl.model, oldRequirementType, newRequirementType);
        }
        var $ctrl = this;
        $ctrl.switchTab = switchTab, $ctrl.onBlur = function(field) {
            !field.refreshRequirementsOnChange;
        }, init();
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), TwRequirementsFormController.$inject = [ "$scope", "TwRequirementsService" ], 
    exports["default"] = TwRequirementsFormController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwRequirementsService() {
        function getFieldNamesFromRequirement(modelRequirement) {
            if (!modelRequirement.fields) return [];
            var names = modelRequirement.fields.map(function(fieldGroup) {
                return fieldGroup.group.map(function(field) {
                    return field.key;
                });
            });
            return Array.prototype.concat.apply([], names);
        }
        function prepType(type) {
            type.label || (type.label = getTabName(type.type));
        }
        function getTabName(tabType) {
            if (tabType && tabType.length > 0) {
                var tabNameWithSpaces = tabType.toLowerCase().split("_").join(" ");
                return tabNameWithSpaces.charAt(0).toUpperCase() + tabNameWithSpaces.slice(1);
            }
            return "";
        }
        this.cleanRequirementsModel = function(model, oldRequirements, newRequirements) {
            var oldFieldNames = getFieldNamesFromRequirement(oldRequirements), newFieldNames = getFieldNamesFromRequirement(newRequirements), obsoleteFieldNames = oldFieldNames.filter(function(fieldName) {
                return newFieldNames.indexOf(fieldName) < 0;
            });
            obsoleteFieldNames.forEach(function(fieldName) {
                delete model[fieldName];
            });
        }, this.cleanModel = function(model, oldRequirements, oldType, newRequirements, newType) {
            var oldRequirementType = this.findRequirementByType(oldType, oldRequirements), newRequirementType = this.findRequirementByType(newType, newRequirements);
            this.cleanRequirementsModel(model, oldRequirementType, newRequirementType);
        }, this.findRequirementByType = function(type, requirements) {
            if (!requirements) return !1;
            for (var i = 0; i < requirements.length; i++) {
                var modelType = requirements[i];
                if (modelType.type === type) return modelType;
            }
            return !1;
        }, this.prepRequirements = function(types) {
            types.forEach(function(type) {
                prepType(type);
            });
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwRequirementsService;
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
    var _twSelectController = __webpack_require__(41), _twSelectController2 = _interopRequireDefault(_twSelectController), TwSelect = {
        require: "ngModel",
        controller: _twSelectController2["default"],
        transclude: !0,
        bindings: {
            ngModel: "=",
            ngRequired: "=",
            ngDisabled: "=",
            options: "=",
            name: "@",
            placeholder: "@",
            filter: "@",
            size: "@",
            dropdownRight: "@",
            dropdownUp: "@",
            dropdownWidth: "@",
            inverse: "=",
            hideNote: "@",
            hideSecondary: "@",
            hideIcon: "@",
            hideCurrency: "@",
            hideCircle: "@",
            hideLabel: "@"
        },
        template: __webpack_require__(63)
    };
    exports["default"] = TwSelect;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwSelectController($element, $scope, $transclude, $timeout) {
        function responsiveClasses(value) {
            var classes = "", validBreakpoints = {
                xs: !0,
                sm: !0,
                md: !0,
                lg: !0,
                xl: !0
            }, breakpoints = [];
            return "boolean" == typeof value && value ? "hidden" : value && value.toLowerCase && "true" === value.toLowerCase() ? "hidden" : (value && (breakpoints = value.split(",")), 
            breakpoints.forEach(function(breakpoint) {
                validBreakpoints[breakpoint] && (classes += "hidden-" + breakpoint + " ");
            }), classes);
        }
        function circleClasses(responsiveOption) {
            var classes = $ctrl.responsiveClasses(responsiveOption), secondaryClasses = $ctrl.responsiveClasses($ctrl.hideSecondary);
            return classes += $ctrl.selected.secondary && 0 === secondaryClasses.length ? " circle-sm" : " circle-xs";
        }
        function buttonFocus() {
            $element.triggerHandler("focus");
        }
        function optionClick(option, $event) {
            return option.disabled ? void $event.stopPropagation() : (selectOption($ngModel, $ctrl, option), 
            void $element.find(".btn").focus());
        }
        function optionFocus(option) {
            selectOption($ngModel, $ctrl, option);
        }
        function optionKeypress(event) {
            if (!$(event.target).hasClass("tw-select-filter")) {
                var characterCode = getCharacterCodeFromKeypress(event);
                if (8 === characterCode) return event.preventDefault(), !1;
                var character = getCharacterFromKeypress(event);
                continueSearchAndSelectMatch($ngModel, $ctrl, $ctrl.options, character), $element.find(".active a").focus();
            }
        }
        function placeholderClick(option) {
            resetOption($ngModel, $ctrl), $element.find(".btn").focus();
        }
        function placeholderFocus() {
            resetOption($ngModel, $ctrl);
        }
        function getFilteredOptions() {
            if (!$ctrl.options || !$ctrl.options.filter) return [];
            var filteredLabels = [];
            return $ctrl.options.filter(function(option) {
                var filterStringLower = $ctrl.filterString && escapeRegExp($ctrl.filterString.toLowerCase());
                if (!filterStringLower) return !0;
                var duplicate = !1;
                filteredLabels.indexOf(option.label) > -1 && (duplicate = !0);
                var addOption = (option.label && option.label.toLowerCase().search(filterStringLower) >= 0 || option.note && option.note.toLowerCase().search(filterStringLower) >= 0 || option.secondary && option.secondary.toLowerCase().search(filterStringLower) >= 0 || option.searchable && option.searchable.toLowerCase().search(filterStringLower) >= 0) && !duplicate;
                return addOption && filteredLabels.push(option.label), addOption;
            });
        }
        function escapeRegExp(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }
        function filterFocus() {
            $element.find(".tw-select-filter").focus();
        }
        function filterChange() {
            $ctrl.filteredOptions = $ctrl.getFilteredOptions();
            var selectedOption = findSelected($ctrl.filteredOptions, $ctrl.selected);
            !selectedOption && $ctrl.filteredOptions.length && selectOption($ngModel, $ctrl, $ctrl.filteredOptions[0]);
        }
        function findSelected(options, selected) {
            var selectedOption;
            return options.forEach(function(option) {
                selected && angular.equals(selected.value, option.value) && (selectedOption = selected);
            }), selectedOption;
        }
        function filterKeydown(event) {
            var characterCode = event.which || event.charCode || event.keyCode, activeOption = $element.find(".active"), activeLink = activeOption.find("a"), optionLinks = $element.find(".tw-select-option-link");
            return 40 === characterCode ? (moveDownOneOption(activeOption, activeLink, optionLinks), 
            event.preventDefault()) : 38 === characterCode ? (moveUpOneOption(activeOption, activeLink, optionLinks), 
            event.preventDefault()) : 13 === characterCode && (activeOption.click(), $element.find(".btn").focus(), 
            event.preventDefault()), !0;
        }
        function selectOptionUsingLink(link) {
            var option = $ctrl.filteredOptions[link.attr("index")];
            selectOption($ngModel, $ctrl, option);
        }
        function moveUpOneOption(activeOption, activeLink, optionLinks) {
            if (!activeOption.length && optionLinks.length) return void selectOptionUsingLink($(optionLinks[optionLinks.length - 1]));
            if (activeLink[0] !== optionLinks[0]) {
                var previousOptions = activeOption.prevAll(".tw-select-option");
                return void selectOptionUsingLink($(previousOptions[0]).find("a"));
            }
        }
        function moveDownOneOption(activeOption, activeLink, optionLinks) {
            if (!activeOption.length && optionLinks.length) return void selectOptionUsingLink($(optionLinks[0]));
            if (activeLink[0] !== optionLinks[optionLinks.length - 1]) {
                var nextOptions = activeOption.nextAll(".tw-select-option");
                return void selectOptionUsingLink($(nextOptions[0]).find("a"));
            }
            var transcludedOption = $(".tw-select-transcluded");
            return transcludedOption.length ? void transcludedOption.find("a").focus() : void 0;
        }
        var $ctrl = this, $ngModel = $element.controller("ngModel");
        $ctrl.search = "", preSelectModelValue($ngModel, $ctrl, $ctrl.options), setDefaultIfRequired($ngModel, $ctrl, $element, $ctrl), 
        addWatchers($ctrl, $scope, $ngModel, $element), addEventHandlers($ctrl, $element, $ngModel, $ctrl.options, $timeout), 
        checkForTranscludedContent($transclude, $ctrl), $ctrl.buttonFocus = buttonFocus, 
        $ctrl.optionClick = optionClick, $ctrl.optionFocus = optionFocus, $ctrl.optionKeypress = optionKeypress, 
        $ctrl.placeholderFocus = placeholderFocus, $ctrl.placeholderClick = placeholderClick, 
        $ctrl.filterFocus = filterFocus, $ctrl.filterChange = filterChange, $ctrl.filterKeydown = filterKeydown, 
        $ctrl.responsiveClasses = responsiveClasses, $ctrl.circleClasses = circleClasses, 
        $ctrl.getFilteredOptions = getFilteredOptions, $ctrl.filterString = "", $ctrl.filteredOptions = $ctrl.getFilteredOptions();
    }
    function addWatchers($ctrl, $scope, $ngModel, $element) {
        $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
            (newValue || oldValue) && newValue !== oldValue && $ngModel.$setDirty(), modelChange(newValue, oldValue, $ctrl);
        }), $scope.$watch("$ctrl.options", function(newValue, oldValue) {
            newValue !== oldValue && (preSelectModelValue($ngModel, $ctrl, $ctrl.options), setDefaultIfRequired($ngModel, $ctrl, $element, $ctrl), 
            $ctrl.filteredOptions = $ctrl.getFilteredOptions());
        });
    }
    function addEventHandlers($ctrl, $element, $ngModel, options, $timeout) {
        $element.find(".btn, .dropdown-menu").on("focusout", function() {
            $timeout(function() {
                0 !== $element.find(".btn:focus").length || $element.find(".btn-group").hasClass("open") || $element.trigger("blur");
            }, 150);
        }), $element.on("blur", function(event) {
            $ngModel.$setTouched();
        }), $element.find(".btn").on("keypress", function(event) {
            $ctrl.optionKeypress(event);
        }), $element.find(".btn").on("click", function() {
            $timeout(function() {
                $element.attr("filter") ? $element.find(".tw-select-filter").focus() : $element.find(".active a").focus();
            });
        }), $element.find("ul").on("keypress", "a", function(event) {
            $ctrl.optionKeypress(event);
        });
    }
    function checkForTranscludedContent($transclude, $ctrl) {
        $transclude(function(clone) {
            (clone.length > 1 || "" !== clone.text().trim()) && ($ctrl.hasTranscluded = !0);
        });
    }
    function getCharacterCodeFromKeypress(event) {
        return event.which || event.charCode || event.keyCode;
    }
    function getCharacterFromKeypress(event) {
        return String.fromCharCode(getCharacterCodeFromKeypress(event));
    }
    function preSelectModelValue($ngModel, $ctrl, options) {
        if (isValidModel($ctrl.ngModel)) {
            var option = findOptionFromValue($ctrl.options, $ctrl.ngModel);
            selectOption($ngModel, $ctrl, option);
        }
    }
    function modelChange(newVal, oldVal, $ctrl) {
        if (newVal !== oldVal) {
            var option = findOptionFromValue($ctrl.options, newVal);
            option ? $ctrl.selected = option : $ctrl.selected = null;
        }
    }
    function findOptionFromValue(options, value) {
        var optionMatch = !1;
        return options.forEach(function(option) {
            angular.equals(option.value, value) && (optionMatch = option);
        }), optionMatch;
    }
    function setDefaultIfRequired($ngModel, $ctrl, $element, $attrs) {
        if (($ctrl.ngRequired || $attrs.required) && !isValidModel($ctrl.ngModel) && !$ctrl.placeholder) for (var i = 0; i < $ctrl.options.length; i++) if (isValidModel($ctrl.options[i].value)) {
            selectOption($ngModel, $ctrl, $ctrl.options[i]);
            break;
        }
    }
    function selectOption($ngModel, $ctrl, option) {
        option.disabled || ($ngModel.$setViewValue(option.value), $ngModel.$commitViewValue(), 
        $ctrl.selected = option);
    }
    function resetOption($ngModel, $ctrl) {
        $ngModel.$setViewValue(null), $ngModel.$commitViewValue(), $ctrl.selected = !1;
    }
    function continueSearchAndSelectMatch($ngModel, $ctrl, options, letter) {
        var found = searchAndSelect($ngModel, $ctrl, options, $ctrl.search + letter);
        return found ? $ctrl.search += letter : ($ctrl.search = letter, found = searchAndSelect($ngModel, $ctrl, options, $ctrl.search)), 
        found;
    }
    function searchAndSelect($ngModel, $ctrl, options, term) {
        var found = !1, searchTerm = term.toLowerCase();
        return options.forEach(function(option) {
            !found && option.label && (0 === option.label.toLowerCase().indexOf(searchTerm) || option.note && 0 === option.note.toLowerCase().indexOf(searchTerm) || option.secondary && 0 === option.secondary.toLowerCase().indexOf(searchTerm) || option.searchable && 0 === option.searchable.toLowerCase().indexOf(searchTerm)) && (selectOption($ngModel, $ctrl, option), 
            found = !0);
        }), found;
    }
    function isValidModel(value) {
        return value || 0 === value || value === !1;
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), TwSelectController.$inject = [ "$element", "$scope", "$transclude", "$timeout" ], 
    exports["default"] = TwSelectController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwFileSelectDirective() {
        return {
            bindToController: !0,
            controller: function() {},
            controllerAs: "$ctrl",
            replace: !1,
            restrict: "A",
            scope: {
                onUserInput: "="
            },
            link: function(scope, element) {
                element.on("change", function(event) {
                    scope.$ctrl.onUserInput && "function" == typeof scope.$ctrl.onUserInput && scope.$ctrl.onUserInput(event);
                });
            }
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwFileSelectDirective;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwUploadDroppableDirective() {
        return {
            bindToController: !0,
            controller: TwUploadDroppableController,
            controllerAs: "$ctrl",
            replace: !1,
            transclude: !0,
            restrict: "E",
            scope: {
                title: "@",
                cta: "@",
                onUpload: "=",
                accept: "="
            },
            link: TwUploadDroppableLink,
            template: '<div class="text-center tw-upload-droppable-box" ng-class="{\'active\': $ctrl.isActive}">       <i class="icon icon-upload tw-upload-droppable-icon"></i>      <h4 class="m-t-2" ng-if="$ctrl.title">{{$ctrl.title}}</h4>      <div class="row">        <div class="col-xs-12 col-sm-6 col-sm-offset-3 m-t-1">        <ng-transclude></ng-transclude>        <label class="link" for="file-upload">{{$ctrl.cta}}</label>        <input tw-file-select id="file-upload" type="file" accept={{$ctrl.accept}} class="hidden" on-user-input="$ctrl.onManualUpload"/>        </div>      </div>    </div>'
        };
    }
    function TwUploadDroppableController() {
        var $ctrl = this;
        $ctrl.dragCounter = 0, $ctrl.isActive = !1, $ctrl.onManualUpload = function(event) {
            $ctrl.onUpload && "function" == typeof $ctrl.onUpload && $ctrl.onUpload(angular.element(document.querySelector("#file-upload"))[0].files[0], event);
        }, $ctrl.onDrop = function(file, event) {
            $ctrl.onUpload && "function" == typeof $ctrl.onUpload && $ctrl.onUpload(file, event), 
            $ctrl.isActive = !1, $ctrl.dropCounter = 0;
        }, $ctrl.onDragChange = function(enter) {
            enter ? ($ctrl.dragCounter++, 1 === $ctrl.dragCounter && ($ctrl.isActive = !0)) : ($ctrl.dragCounter--, 
            0 === $ctrl.dragCounter && ($ctrl.isActive = !1));
        };
    }
    function TwUploadDroppableLink(scope, element, attr) {
        element[0].addEventListener("dragenter", function(event) {
            event.preventDefault(), scope.$ctrl.onDragChange(!0), scope.$apply();
        }, !1), element[0].addEventListener("dragover", function(event) {
            event.preventDefault();
        }, !1), element[0].addEventListener("dragleave", function(event) {
            event.preventDefault(), scope.$ctrl.onDragChange(!1), scope.$apply();
        }, !1), element[0].addEventListener("drop", function(event) {
            event.preventDefault(), scope.$ctrl.onDrop(event.dataTransfer.files[0]), scope.$apply();
        }, !1);
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwUploadDroppableDirective;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwFileInputDirective() {
        return {
            bindToController: !0,
            controller: TwFileInputController,
            controllerAs: "$ctrl",
            replace: !1,
            restrict: "A",
            scope: {
                onUserInput: "="
            }
        };
    }
    function TwFileInputController($element) {
        var $ctrl = this;
        $element.on("change", function(event) {
            $ctrl.onUserInput && "function" == typeof $ctrl.onUserInput && $ctrl.onUserInput(event);
        });
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), TwFileInputController.$inject = [ "$element" ], exports["default"] = TwFileInputDirective;
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
    var _twUploadController = __webpack_require__(46), _twUploadController2 = _interopRequireDefault(_twUploadController), TwUpload = {
        controller: _twUploadController2["default"],
        transclude: !0,
        bindings: {
            ngModel: "=",
            name: "@",
            icon: "@",
            label: "@",
            placeholder: "@",
            description: "@",
            instructions: "@",
            buttonText: "@",
            cancelText: "@",
            processingText: "@",
            completeText: "@",
            errorMessage: "@",
            tooLargeMessage: "@",
            size: "@",
            accept: "@",
            httpOptions: "<",
            onStart: "=",
            onSuccess: "=",
            onFailure: "=",
            onCancel: "=",
            maxSize: "<"
        },
        template: __webpack_require__(64)
    };
    exports["default"] = TwUpload;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwUploadController($timeout, $element, $http, $scope, $transclude, $q, $attrs) {
        function reset() {
            $ctrl.isDroppable = !1, $ctrl.isProcessing = !1, $ctrl.isSuccess = !1, $ctrl.isError = !1, 
            $ctrl.dragCounter = 0, $ctrl.isDone = !1, $ctrl.isTooLarge = !1, $ctrl.isWrongType = !1, 
            $element[0].querySelector("input").value = null, setNgModel(null);
        }
        function setNgModel(value) {
            if ("undefined" != typeof $attrs.ngModel) {
                var $ngModel = $element.controller("ngModel");
                if (!$ngModel.$setViewValue) return;
                $ngModel.$setViewValue(value);
            }
        }
        function asyncPost(file) {
            var formData = new FormData();
            formData.append($ctrl.name, file);
            var $httpOptions = prepareHttpOptions(angular.copy($ctrl.httpOptions));
            return $http.post($httpOptions.url, formData, $httpOptions);
        }
        function prepareHttpOptions($httpOptions) {
            if (!$httpOptions.url) throw new Error("You must supply a URL to post image data asynchronously");
            return $httpOptions.headers || ($httpOptions.headers = {}), $httpOptions.method && delete $httpOptions.method, 
            $httpOptions.headers["Content-Type"] = void 0, $httpOptions.transformRequest = angular.identity, 
            $httpOptions;
        }
        function asyncFileRead(file) {
            var reader = new FileReader(), deferred = $q.defer();
            return reader.onload = function(event) {
                deferred.resolve(event.target.result);
            }, reader.onerror = function(event) {
                deferred.reject(event);
            }, reader.readAsDataURL(file), deferred.promise;
        }
        function showDataImage(dataUrl) {
            setNgModel(dataUrl), $ctrl.isImage = isImage, isImage && ($ctrl.image = dataUrl);
        }
        function asyncSuccess(response) {
            return $ctrl.processingState = 1, $timeout(function() {
                $ctrl.isProcessing = !1, $ctrl.isSuccess = !0;
            }, 3e3), $timeout(function() {
                triggerHandler($ctrl.onSuccess, response), $ctrl.isDone = !0;
            }, 3800), response;
        }
        function asyncFailure(error) {
            return $ctrl.processingState = -1, $timeout(function() {
                $ctrl.isProcessing = !1, $ctrl.isError = !0;
            }, 3e3), $timeout(function() {
                triggerHandler($ctrl.onFailure, error), $ctrl.isDone = !0;
            }, 4100), error;
        }
        function isSizeValid(file, maxSize) {
            return !(angular.isNumber(maxSize) && file.size > maxSize);
        }
        function isTypeValid(file, accept) {
            return !0;
        }
        function addDragHandlers($element) {
            $element[0].addEventListener("dragover", function(event) {
                event.preventDefault(), $ctrl.onDragChange(!0), $scope.$apply();
            }, !1), $element[0].addEventListener("dragover", function(event) {
                event.preventDefault();
            }, !1), $element[0].addEventListener("dragleave", function(event) {
                event.preventDefault(), $ctrl.onDragChange(!1), $scope.$apply();
            }, !1), $element[0].addEventListener("drop", function(event) {
                event.preventDefault(), $ctrl.fileDropped(event.dataTransfer.files[0], event), $scope.$apply();
            }, !1);
        }
        var $ctrl = this, isImage = !1;
        if ($ctrl.dragCounter = 0, $ctrl.isProcessing = !1, $ctrl.processingState = null, 
        checkForTranscludedContent($transclude, $ctrl), $scope.$watch("$ctrl.icon", function() {
            $ctrl.viewIcon = $ctrl.icon ? $ctrl.icon : "upload";
        }), ($ctrl.processingText || $ctrl.successText || $ctrl.failureText) && (!$ctrl.processingText || !$ctrl.successText || !$ctrl.failureText)) throw new Error("Supply all of processing, success, and failure text, or supply none.");
        addDragHandlers($element), $ctrl.onManualUpload = function(event) {
            var file = angular.element($element[0].querySelector(".tw-droppable-input"))[0].files[0];
            $ctrl.fileDropped(file, event);
        }, $ctrl.fileDropped = function(file, event) {
            return reset(), isImage = file.type && file.type.indexOf("image") > -1, $ctrl.fileName = file.name, 
            $ctrl.isProcessing = !0, $ctrl.processingState = null, triggerHandler($ctrl.onStart, file), 
            isSizeValid(file, $ctrl.maxSize) ? isTypeValid(file, $ctrl.accept) ? void ($ctrl.httpOptions ? $q.all([ asyncPost(file), asyncFileRead(file) ]).then(function(response) {
                return showDataImage(response[1]), response[0];
            }).then(asyncSuccess)["catch"](asyncFailure) : asyncFileRead(file).then(showDataImage).then(asyncSuccess)["catch"](asyncFailure)) : ($ctrl.isWrongType = !0, 
            void asyncFailure({
                status: 415,
                statusText: "Unsupported Media Type"
            })) : ($ctrl.isTooLarge = !0, void asyncFailure({
                status: 413,
                statusText: "Request Entity Too Large"
            }));
        }, $ctrl.onDragChange = function(enter) {
            enter ? ($ctrl.dragCounter++, $ctrl.dragCounter >= 1 && ($ctrl.isDroppable = !0)) : ($ctrl.dragCounter--, 
            $ctrl.dragCounter <= 0 && ($ctrl.isDroppable = !1));
        }, $ctrl.clear = function() {
            reset(), triggerHandler($ctrl.onCancel);
        };
    }
    function triggerHandler(method, argument) {
        method && "function" == typeof method && method(argument);
    }
    function checkForTranscludedContent($transclude, $ctrl) {
        $transclude(function(clone) {
            (clone.length > 1 || "" !== clone.text().trim()) && ($ctrl.hasTranscluded = !0);
        });
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), TwUploadController.$inject = [ "$timeout", "$element", "$http", "$scope", "$transclude", "$q", "$attrs" ], 
    exports["default"] = TwUploadController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var TwLoader = {
        template: __webpack_require__(65)
    };
    exports["default"] = TwLoader;
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
    var _twProcessController = __webpack_require__(49), _twProcessController2 = _interopRequireDefault(_twProcessController), TwProcess = {
        bindings: {
            state: "<",
            size: "@",
            onStop: "&",
            promise: "<"
        },
        controller: _twProcessController2["default"],
        template: __webpack_require__(66)
    };
    exports["default"] = TwProcess;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwProcessController($scope, $interval, $timeout) {
        function isStopped(state) {
            return state === -1 || 0 === state || 1 === state;
        }
        var $ctrl = this;
        $ctrl.processing = $ctrl.state;
        var interval;
        $scope.$watch("$ctrl.state", function(newVal) {
            isStopped($ctrl.processing) && ($ctrl.processing = null, $ctrl.startProcess());
        }), $scope.$watch("$ctrl.size", function(newVal) {
            switch ($interval.cancel(interval), $ctrl.startProcess(), $ctrl.size || ($ctrl.size = "sm"), 
            $ctrl.size) {
              case "xs":
                $ctrl.radius = "11";
                break;

              case "sm":
                $ctrl.radius = "22";
                break;

              case "xl":
                $ctrl.radius = "61";
                break;

              default:
                $ctrl.radius = "46%";
            }
        }), $ctrl.startProcess = function() {
            interval = $interval(function() {
                $ctrl.processing = $ctrl.state, isStopped($ctrl.state) && $ctrl.stopProcess();
            }, 1500);
        }, $ctrl.stopProcess = function() {
            $interval.cancel(interval), $ctrl.onStop && (0 === $ctrl.state ? $ctrl.onStop() : $timeout($ctrl.onStop, 1800));
        }, $ctrl.startProcess();
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), TwProcessController.$inject = [ "$scope", "$interval", "$timeout" ], exports["default"] = TwProcessController;
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
    var _twTabsController = __webpack_require__(51), _twTabsController2 = _interopRequireDefault(_twTabsController), TwTabs = {
        bindings: {
            tabs: "<",
            active: "=",
            onChange: "&"
        },
        controller: _twTabsController2["default"],
        template: __webpack_require__(67)
    };
    exports["default"] = TwTabs;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwTabsController() {
        function switchTab(tab) {
            $ctrl.active = tab, $ctrl.onChange && $ctrl.onChange(tab);
        }
        var $ctrl = this;
        $ctrl.switchTab = switchTab, !$ctrl.active && $ctrl.tabs.length && ($ctrl.active = $ctrl.tabs[0].type);
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwTabsController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwCurrencyService() {
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
    }), exports["default"] = TwCurrencyService;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwDateService() {
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
        this.getLocaleDate = function(date) {
            return date || (date = new Date()), date.getDate();
        }, this.getLocaleMonth = function(date) {
            return date || (date = new Date()), date.getMonth();
        }, this.getLocaleFullYear = function(date) {
            return date || (date = new Date()), date.getFullYear();
        }, this.getLocaleToday = function() {
            var now = new Date();
            return this.getUTCDateFromParts(this.getLocaleFullYear(now), this.getLocaleMonth(now), this.getLocaleDate(now));
        }, this.getUTCDate = function(date) {
            return date || (date = new Date()), date.getUTCDate();
        }, this.getUTCMonth = function(date) {
            return date || (date = new Date()), date.getUTCMonth();
        }, this.getUTCFullYear = function(date) {
            return date || (date = new Date()), date.getUTCFullYear();
        }, this.getUTCToday = function() {
            var now = new Date();
            return this.getUTCDateFromParts(this.getUTCFullYear(now), this.getUTCMonth(now), this.getUTCDate(now));
        }, this.getLastDayOfMonth = function(year, month) {
            var lastDay = this.getUTCDateFromParts(year, month + 1, 0);
            return lastDay.getUTCDate();
        }, this.getUTCDateFromParts = function(year, month, day) {
            var date = new Date();
            return date.setUTCFullYear(year, month, day), date.setUTCHours(0), date.setUTCMinutes(0), 
            date.setUTCSeconds(0), date.setUTCMilliseconds(0), date;
        }, this.getDayNamesForLocale = function(locale, format) {
            var date, days = [], language = getLanguageFromLocale(locale);
            if (DEFAULT_DAY_NAMES_BY_LANGUAGE[language]) return DEFAULT_DAY_NAMES_BY_LANGUAGE[language];
            format = getValidDateFormat(format), locale = getValidLocale(locale);
            for (var i = 1; i <= 7; i++) date = this.getUTCDateFromParts(2001, 0, i), days.push(getLocalisedDateName(date, locale, {
                weekday: format
            }));
            return days;
        }, this.getMonthNamesForLocale = function(locale, format) {
            var date, month, months = [], language = getLanguageFromLocale(locale);
            if (DEFAULT_MONTH_NAMES_BY_LANGUAGE[language] && ("long" === format || "ja" === language)) return DEFAULT_MONTH_NAMES_BY_LANGUAGE[language];
            format = getValidDateFormat(format), locale = getValidLocale(locale);
            for (var i = 0; i < 12; i++) date = this.getUTCDateFromParts(2e3, i, 15), "short" === format ? (month = getLocalisedDateName(date, locale, {
                month: "long"
            }), month = month.length > 4 ? month.slice(0, 3) : month, months.push(month)) : months.push(getLocalisedDateName(date, locale, {
                month: format
            }));
            return months;
        }, this.getWeekday = function(year, month, day) {
            var utcDate = this.getUTCDateFromParts(year, month, day);
            return utcDate.getUTCDay();
        }, this.isMonthBeforeDay = function(locale) {
            return locale.indexOf("US", locale.length - 2) !== -1 || "ja" === getLanguageFromLocale(locale);
        }, this.addYears = function(date, years) {
            return this.addToDate(date, years, 0, 0);
        }, this.addMonths = function(date, months) {
            return this.addToDate(date, 0, months, 0);
        }, this.addDays = function(date, days) {
            return this.addToDate(date, 0, 0, days);
        }, this.addToDate = function(date, years, months, days) {
            return this.getUTCDateFromParts(date.getUTCFullYear() + years, date.getUTCMonth() + months, date.getUTCDate() + days);
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
    }), exports["default"] = TwDateService;
}, function(module, exports) {
    module.exports = '<div class="input-group" ng-class="{\n  \'input-group-sm\': $ctrl.size === \'sm\',\n  \'input-group-lg\': $ctrl.size === \'lg\',\n  \'disabled\': $ctrl.ngDisabled\n}">\n  <input\n    type="tel"\n    autocomplete="off"\n    name="amount"\n    step="any"\n    class="form-control"\n    placeholder="{{ $ctrl.placeholder }}"\n    tw-focusable\n    show-decimals="$ctrl.showDecimals"\n    tw-number-input-formatter\n    ng-change="$ctrl.changedAmount()"\n    ng-model="$ctrl.ngModel"\n    ng-disabled="$ctrl.ngDisabled" />\n  <span class="input-group-addon"\n    ng-class="{\'input-lg\': $ctrl.size ===\'lg\'}" ng-transclude="addon"></span>\n  <span class="input-group-btn">\n    <tw-select\n      ng-model="$ctrl.currency"\n      ng-required="true"\n      size="{{ $ctrl.size }}"\n      inverse="true"\n      dropdown-right="xs"\n      dropdown-width="lg"\n      hide-currency="xs"\n      hide-note="true"\n      hide-secondary="true"\n      options="$ctrl.currencies"\n      filter="{{ $ctrl.currencyFilterPlaceholder }}"\n      ng-change="$ctrl.changedCurrency()">\n        <a href="" ng-if="!!$ctrl.customActionLabel" ng-click="$ctrl.onCustomAction()">\n          {{ $ctrl.customActionLabel }}\n        </a>\n    </tw-select>\n  </span>\n</div>\n';
}, function(module, exports) {
    module.exports = '<input type="hidden" class="sr-only"\n  name="{{$ctrl.name}}"\n  ng-model="$ctrl.ngModel"\n  ng-click="$ctrl.hiddenClick($event)"\n  ng-disabled="$ctrl.ngDisabled"/>\n<button type="button" class="tw-checkbox-button" tw-focusable\n  ng-click="$ctrl.buttonClick($event)"\n  ng-focus="$ctrl.buttonFocus()"\n  ng-blur="$ctrl.buttonBlur()"\n  ng-disabled="$ctrl.ngDisabled"\n  ng-class="{\'checked\': $ctrl.checked}"\n  aria-pressed="{{$ctrl.checked}}">\n  <span class="tw-checkbox-check glyphicon glyphicon-ok"></span>\n</button>\n';
}, function(module, exports) {
    module.exports = '<div class="input-group" ng-class="{\n  \'input-group-sm\': $ctrl.size === \'sm\',\n  \'input-group-lg\': $ctrl.size === \'lg\',\n  \'disabled\': $ctrl.ngDisabled\n}">\n  <input\n    type="tel"\n    autocomplete="off"\n    name="amount"\n    step="any"\n    class="form-control p-r-0"\n    placeholder="{{$ctrl.placeholder}}"\n    show-decimals="$ctrl.showDecimals"\n    tw-focusable\n    tw-number-input-formatter\n    ng-change="$ctrl.changedInputValue()"\n    ng-model="$ctrl.ngModel"\n    ng-disabled="$ctrl.ngDisabled" />\n  <span class="hello-world input-group-addon tw-currency-input-code p-l-1">\n    <span ng-transclude="addon"></span>\n    {{ $ctrl.currency || $ctrl.currencyCode }}\n  </span>\n</div>\n';
}, function(module, exports) {
    module.exports = '<div class="btn-group btn-block dropdown"\n  ng-keydown="$ctrl.keyHandler($event)">\n\n  <button\n    class="btn btn-input dropdown-toggle tw-date-lookup-button"\n    data-toggle="dropdown"\n    ng-disabled="$ctrl.ngDisabled"\n    ng-click="$ctrl.openLookup()"\n    ng-focus="$ctrl.buttonFocus()"\n    ng-class="{\n      \'btn-sm\': $ctrl.size ===\'sm\',\n      \'btn-lg\': $ctrl.size ===\'lg\'\n    }">\n\n    <span ng-if="!$ctrl.ngModel"\n      class="form-control-placeholder tw-date-lookup-placeholder">\n      {{$ctrl.placeholder}}\n    </span\n    ><span ng-if="$ctrl.label && $ctrl.ngModel"\n      class="control-label small m-r-1">{{$ctrl.label}}</span\n    ><span ng-if="$ctrl.ngModel" class="tw-date-lookup-selected">\n      {{$ctrl.selectedDateFormatted}}\n    </span>\n    <span class="caret"></span>\n\n  </button>\n\n  <div class="dropdown-menu">\n\n    <div ng-if="$ctrl.mode ===\'year\'" class="tw-date-lookup-years">\n      <div class="text-xs-center p-t-1 p-b-2">\n        <div class="pull-xs-left p-b-2">\n          <a href="" ng-click="$ctrl.setYearOffset($event, -20)"\n            class="text-no-decoration tw-date-lookup-previous-years">\n            <span class="icon icon-left icon-lg"></span>\n          </a>\n        </div>\n        <div class="pull-xs-right p-b-2">\n          <a href="" ng-click="$ctrl.setYearOffset($event, 20)"\n            class="text-no-decoration tw-date-lookup-next-years">\n            <span class="icon icon-right icon-lg"></span>\n          </a>\n        </div>\n      </div>\n      <table class="table table-condensed table-bordered table-calendar m-b-0">\n        <tbody>\n          <tr ng-repeat="row in [0,4,8,12,16]">\n            <td ng-repeat="col in [0,1,2,3]">\n              <a href=""\n                ng-click="$ctrl.selectYear($event, $ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)"\n                ng-disabled="$ctrl.isYearDisabled($ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)"\n                ng-class="{\'active\': $ctrl.selectedYear === ($ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)}"\n                class="tw-date-lookup-year-option">\n                {{$ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset}}\n              </a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <div ng-if="$ctrl.mode ===\'month\'" class="tw-date-lookup-months">\n      <div class="text-xs-center p-t-1 p-b-2">\n        <div class="pull-xs-left">\n          <a href="" ng-click="$ctrl.yearBefore($event)" class="text-no-decoration">\n            <span class="icon icon-left icon-lg"></span>\n          </a>\n        </div>\n        <a href="" ng-click="$ctrl.switchToYears($event)"\n          class="tw-date-lookup-year-label">\n          {{$ctrl.year}}\n        </a>\n        <div class="pull-xs-right">\n          <a href="" ng-click="$ctrl.yearAfter($event)" class="text-no-decoration">\n            <span class="icon icon-right icon-lg"></span>\n          </a>\n        </div>\n      </div>\n      <table class="table table-condensed table-bordered table-calendar m-b-0">\n        <tbody>\n          <tr ng-repeat="row in [0,4,8]">\n            <td ng-repeat="col in [0,1,2,3]">\n              <a href=""\n                ng-click="$ctrl.selectMonth($event, row+col, $ctrl.year)"\n                ng-disabled="$ctrl.isMonthDisabled(row + col, $ctrl.year)"\n                ng-class="{\n                  \'active\': $ctrl.selectedMonth === (row + col) && $ctrl.selectedYear === $ctrl.year\n                }"\n                class="tw-date-lookup-month-option">\n                {{$ctrl.shortMonthsOfYear[row+col] | limitTo:5}}\n              </a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n    <div ng-if="$ctrl.mode ===\'day\'" class="tw-date-lookup-days">\n      <div class="text-xs-center p-t-1 p-b-2">\n        <div class="pull-xs-left">\n          <a href="" ng-click="$ctrl.monthBefore($event)"\n            class="text-no-decoration tw-date-lookup-previous-month">\n            <span class="icon icon-left icon-lg"></span>\n          </a>\n        </div>\n        <a href="" ng-click="$ctrl.switchToYears($event)"\n          class="tw-date-lookup-month-label">\n          {{$ctrl.yearMonthFormatted}}\n        </a>\n        <div class="pull-xs-right">\n          <a href="" ng-click="$ctrl.monthAfter($event)"\n            class="text-no-decoration tw-date-lookup-next-month">\n            <span class="icon icon-right icon-lg"></span>\n          </a>\n        </div>\n      </div>\n      <table class="table table-condensed table-bordered table-calendar m-b-0">\n        <thead>\n          <tr>\n            <th ng-repeat="day in $ctrl.daysOfWeek track by $index">\n              <span class="hidden-xs">{{day | limitTo : 3}}</span>\n              <span class="visible-xs-inline-block">{{$ctrl.shortDaysOfWeek[$index] | limitTo : 2}}</span>\n            </th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr ng-repeat="week in $ctrl.weeks">\n            <td ng-repeat="day in week track by $index"\n              ng-class="{\n                \'default\': $index > 4\n              }">\n              <a href="" title="{{day}} {{$ctrl.monthsOfYear[$ctrl.month]}} {{$ctrl.year}}"\n                ng-if="day"\n                ng-click="$ctrl.selectDay($event, day, $ctrl.month, $ctrl.year)"\n                ng-disabled="$ctrl.isDayDisabled(day, $ctrl.month, $ctrl.year)"\n                ng-class="{\n                  \'active\': $ctrl.isCurrentlySelected(day, $ctrl.month, $ctrl.year)\n                }"\n                class="tw-date-lookup-day-option" tabindex="0">\n                {{day}}\n              </a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n  </div>\n</div>\n';
}, function(module, exports) {
    module.exports = '<div class="row">\n\n  <div class="col-sm-5 tw-date-month-column" ng-if="$ctrl.monthBeforeDay">\n    <label class="sr-only">Month</label>\n    <tw-select\n      name="month"\n      class="tw-date-month"\n      ng-model="$ctrl.month"\n      ng-change="$ctrl.updateDateModelAndValidationClasses()"\n      ng-required="$ctrl.dateRequired"\n      ng-disabled="$ctrl.dateDisabled"\n      options="$ctrl.dateMonths">\n    </tw-select>\n  </div>\n\n  <div class="col-sm-3 tw-date-day-column">\n    <label class="sr-only">Day</label>\n    <input type="number"\n      name="day"\n      class="form-control tw-date-day"\n      ng-model="$ctrl.day"\n      ng-change="$ctrl.updateDateModelAndValidationClasses()"\n      placeholder="DD"\n      min="1"\n      ng-min="1"\n      ng-disabled="$ctrl.dateDisabled"\n      ng-required="$ctrl.dateRequired"\n      tw-focusable />\n  </div>\n\n  <div class="col-sm-5 tw-date-month-column" ng-if="!$ctrl.monthBeforeDay">\n    <label class="sr-only">Month</label>\n    <tw-select\n      name="month"\n      class="tw-date-month"\n      ng-model="$ctrl.month"\n      ng-change="$ctrl.updateDateModelAndValidationClasses()"\n      ng-required="$ctrl.dateRequired"\n      ng-disabled="$ctrl.dateDisabled"\n      options="$ctrl.dateMonths">\n    </tw-select>\n  </div>\n\n  <div class="col-sm-4 tw-date-year-column">\n    <label class="sr-only">Year</label>\n    <input type="number"\n      name="year"\n      class="form-control tw-date-year"\n      placeholder="YYYY"\n      ng-model="$ctrl.year"\n      ng-change="$ctrl.updateDateModelAndValidationClasses()"\n      ng-min="$ctrl.min.getFullYear()"\n      ng-max="$ctrl.max.getFullYear()"\n      maxlength="4"\n      ng-maxlength="4"\n      ng-disabled="$ctrl.dateDisabled"\n      ng-required="$ctrl.dateRequired"\n      tw-focusable />\n  </div>\n</div>\n';
}, function(module, exports) {
    module.exports = '<div ng-switch="$ctrl.type">\n  <input ng-switch-when="text"\n    name="{{$ctrl.name}}"\n    type="text"\n    class="form-control"\n    placeholder="{{$ctrl.placeholder}}"\n    ng-model="$ctrl.ngModel"\n    ng-model-options="{ allowInvalid: true }"\n    ng-required="$ctrl.ngRequired"\n    ng-disabled="$ctrl.ngDisabled"\n    ng-pattern="$ctrl.ngPattern"\n    ng-change="$ctrl.change()"\n    ng-focus="$ctrl.focus()"\n    ng-blur="$ctrl.blur()"\n    ng-minlength="$ctrl.ngMinlength"\n    ng-maxlength="$ctrl.ngMaxlength"\n    tw-text-format="{{$ctrl.textFormat}}" />\n  <input ng-switch-when="password"\n    name="{{$ctrl.name}}"\n    type="password"\n    class="form-control"\n    placeholder="{{$ctrl.placeholder}}"\n    ng-model="$ctrl.ngModel"\n    ng-model-options="{ allowInvalid: true }"\n    ng-required="$ctrl.ngRequired"\n    ng-disabled="$ctrl.ngDisabled"\n    ng-change="$ctrl.change()"\n    ng-focus="$ctrl.focus()"\n    ng-blur="$ctrl.blur()"\n    ng-minlength="$ctrl.ngMinlength"\n    ng-maxlength="$ctrl.ngMaxlength" />\n  <input ng-switch-when="number"\n    name="{{$ctrl.name}}"\n    type="number"\n    step="{{$ctrl.step}}"\n    class="form-control"\n    placeholder="{{$ctrl.placeholder}}"\n    ng-model="$ctrl.ngModel"\n    ng-model-options="{ allowInvalid: true }"\n    ng-required="$ctrl.ngRequired"\n    ng-disabled="$ctrl.ngDisabled"\n    ng-change="$ctrl.change()"\n    ng-focus="$ctrl.focus()"\n    ng-blur="$ctrl.blur()"\n    ng-min="$ctrl.ngMin"\n    ng-max="$ctrl.ngMax" />\n  <div ng-switch-when="radio"\n    class="radio"\n    ng-class="{disabled: $ctrl.ngDisabled}"\n    ng-repeat="option in $ctrl.options">\n    <label>\n      <tw-radio\n        name="{{$ctrl.name}}"\n        ng-value="option.value"\n        ng-model="$ctrl.ngModel"\n        ng-required="$ctrl.ngRequired"\n        ng-disabled="$ctrl.ngDisabled"\n        ng-change="$ctrl.change()"\n        ng-click="$ctrl.change()"\n        ng-focus="$ctrl.focus()"\n        ng-blur="$ctrl.blur()" />\n      {{option.label}}\n    </label>\n  </div>\n  <div ng-switch-when="checkbox"\n    class="checkbox"\n    ng-class="{disabled: $ctrl.ngDisabled}">\n    <label>\n      <tw-checkbox\n        name="{{$ctrl.name}}"\n        ng-model="$ctrl.ngModel"\n        ng-required="$ctrl.ngRequired"\n        ng-disabled="$ctrl.ngDisabled"\n        ng-change="$ctrl.change()"\n        ng-click="$ctrl.change()"\n        ng-focus="$ctrl.focus()"\n        ng-blur="$ctrl.blur()" />\n      {{$ctrl.placeholder}}\n    </label>\n  </div>\n  <div ng-switch-when="select">\n    <tw-select\n      name="{{$ctrl.name}}"\n      options="$ctrl.options"\n      placeholder="{{$ctrl.placeholder}}"\n      ng-model="$ctrl.ngModel"\n      ng-required="$ctrl.ngRequired"\n      ng-disabled="$ctrl.ngDisabled"\n      ng-change="$ctrl.change()"\n      ng-focus="$ctrl.focus()"\n      ng-blur="$ctrl.blur()" />\n  </div>\n  <div ng-switch-when="upload">\n    <tw-upload\n      name="{{$ctrl.name}}"\n      label="{{$ctrl.label}}"\n      icon="{{$ctrl.uploadIcon}}"\n      placeholder="{{$ctrl.placeholder}}"\n      accept="{{$ctrl.uploadAccept}}"\n      complete-text="{{$ctrl.label}}"\n      button-text="{{$ctrl.uploadOptions.buttonText}}"\n      cancel-text="{{$ctrl.uploadOptions.cancelText}}"\n      too-large-message="{{$ctrl.uploadTooLargeMessage}}"\n      max-size="$ctrl.ngMax"\n      ng-model="$ctrl.ngModel"\n      ng-required="$ctrl.ngRequired"\n      ng-disabled="$ctrl.ngDisabled"\n      ng-change="$ctrl.change()"\n      ng-focus="$ctrl.focus()"\n      ng-blur="$ctrl.blur()" />\n  </div>\n  <div ng-switch-when="date">\n    <tw-date\n      name="{{$ctrl.name}}"\n      locale="{{$ctrl.locale}}"\n      ng-min="$ctrl.ngMin"\n      ng-max="$ctrl.ngMax"\n      ng-model="$ctrl.ngModel"\n      ng-required="$ctrl.ngRequired"\n      ng-disabled="$ctrl.ngDisabled"\n      ng-change="$ctrl.change()"\n      ng-focus="$ctrl.focus()"\n      ng-blur="$ctrl.blur()" />\n  </div>\n  <ng-transclude class="error-messages"></ng-transclude>\n</div>\n';
}, function(module, exports) {
    module.exports = '<fieldset ng-form="twFieldset">\n  <legend ng-if="$ctrl.legend">{{$ctrl.legend}}</legend>\n  <div class="row row-equal-height">\n    <div ng-repeat="fieldGroup in $ctrl.fields" class="col-xs-12"\n      ng-class="{\n        \'col-sm-4\': fieldGroup.width === \'sm\',\n        \'col-sm-6\': fieldGroup.width === \'md\' || fieldGroup.maxlength && fieldGroup.maxlength <= 10,\n        \'col-sm-12\': fieldGroup.width === \'lg\' || !fieldGroup.maxlength || fieldGroup.maxlength > 10\n      }">\n      <div class="form-group tw-form-group-{{fieldGroup.key}}"\n        ng-class="{\n          \'has-error\': $ctrl.errorMessages[fieldGroup.key]\n        }">\n        <label class="control-label"\n          ng-if="fieldGroup.type !== \'upload\'">\n          {{fieldGroup.name}}\n        </label>\n        <div class="row">\n          <div class="col-xs-{{field.columns}}"\n            ng-repeat="field in fieldGroup.group">\n            <tw-dynamic-form-control\n              name="{{field.key}}"\n              label="{{fieldGroup.name}}"\n              type="{{field.type | lowercase}}"\n              placeholder="{{field.placeholder || field.example}}"\n              help-text="{{field.helpText}}"\n              locale="{{$ctrl.locale}}"\n              upload-accept="{{field.accept}}"\n              upload-icon="{{field.icon}}"\n              upload-too-large-message="{{field.tooLargeMessage}}"\n              options="field.valuesAllowed"\n              upload-options="$ctrl.uploadOptions"\n              ng-model="$ctrl.model[field.key]"\n              ng-blur="$ctrl.onBlur(field)"\n              ng-change="$ctrl.onChange(field)"\n              ng-required="field.required"\n              ng-disabled="field.disabled"\n              tw-minlength="field.minLength"\n              tw-maxlength="field.maxLength"\n              ng-min="field.min"\n              ng-max="field.max"\n              ng-pattern="field.validationRegexp"\n              text-format="field.displayFormat"\n              tw-validation>\n              <!-- tw-dynamic-async-validator="field.validationAsync" -->\n            </tw-dynamic-form-control>\n            <div class="error-messages">\n              <div ng-repeat="(validationType, validationMessage) in $ctrl.validationMessages"\n                class="error-{{validationType}}">\n                {{validationMessage}}\n              </div>\n              <div class="error-provided" ng-if="$ctrl.errorMessages[field.key]">\n                {{ $ctrl.errorMessages[field.key] }}\n              </div>\n            </div>\n            <div ng-if="field.tooltip"\n              class="help-block">\n              {{field.tooltip}}\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</fieldset>\n';
}, function(module, exports) {
    module.exports = '<input type="radio" class="sr-only"\n  name="{{$ctrl.name}}"\n  ng-value="$ctrl.ngValue || $ctrl.value"\n  ng-model="$ctrl.ngModel"\n  ng-disabled="$ctrl.ngDisabled"\n  ng-change="$ctrl.hiddenInputChange()"\n  tabindex="-1" />\n<button type="button" class="tw-radio-button" tw-focusable\n  ng-click="$ctrl.buttonClick($event)"\n  ng-focus="$ctrl.buttonFocus()"\n  ng-blur="$ctrl.buttonBlur()"\n  ng-disabled="$ctrl.ngDisabled"\n  ng-class="{checked: $ctrl.checked}"\n  aria-pressed="{{$ctrl.checked}}">\n  <span class="tw-radio-check"></span>\n</button>\n';
}, function(module, exports) {
    module.exports = '<tw-tabs\n  ng-if="$ctrl.requirements.length > 1"\n  tabs="$ctrl.requirements"\n  active="$ctrl.model.type">\n</tw-tabs>\n<div class="tab-content" ng-form="twForm">\n  <div ng-repeat="requirementType in $ctrl.requirements"\n    ng-if="$ctrl.model.type == requirementType.type"\n    class="tab-pane active"\n    id="{{requirementType.type}}">\n    <p>{{requirementType.description}}</p>\n    <tw-fieldset\n      fields="requirementType.fields"\n      model="$ctrl.model"\n      upload-options="$ctrl.uploadOptions"\n      locale="{{$ctrl.locale}}"\n      onRefreshRequirements="$ctrl.onRefreshRequirements()"\n      validation-messages="$ctrl.validationMessages"\n      error-messages="$ctrl.errorMessages">\n    </tw-fieldset>\n  </div>\n</div>\n';
}, function(module, exports) {
    module.exports = '<div class="btn-group btn-block tw-select"\n  ng-class="{\n    dropdown: !$ctrl.dropdownUp,\n    dropup: $ctrl.dropdownUp\n  }" aria-hidden="false">\n\n  <button type="button" class="btn btn-input dropdown-toggle"\n    ng-class="{\n      \'btn-input-inverse\': $ctrl.inverse,\n      \'btn-addon\': $ctrl.inverse,\n      \'btn-sm\': $ctrl.size === \'sm\',\n      \'btn-lg\': $ctrl.size === \'lg\'\n    }"\n    data-toggle="dropdown" aria-expanded="false"\n    ng-disabled="$ctrl.ngDisabled"\n    ng-focus="$ctrl.buttonFocus()"\n    tw-focusable>\n\n    <span class="tw-select-selected" ng-if="$ctrl.selected">\n      <span class="circle circle-inverse pull-xs-left circle-sm"\n        ng-if="$ctrl.selected && $ctrl.selected.icon && $ctrl.selected.secondary">\n        <span class="icon {{$ctrl.selected.icon}}"></span>\n      </span>\n\n      <span class="circle circle-inverse pull-xs-left"\n        ng-class="$ctrl.circleClasses($ctrl.hideCircle)"\n        ng-if="($ctrl.selected.circleText || $ctrl.selected.circleImage || $ctrl.selected.circleIcon)">\n        <span ng-if="$ctrl.selected.circleText">{{$ctrl.selected.circleText}}</span>\n        <img alt="{{$ctrl.selected.label}}"\n          ng-if="$ctrl.selected.circleImage"\n          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="\n          ng-src="{{$ctrl.selected.circleImage}}" />\n        <span ng-if="$ctrl.selected.circleIcon" class="icon {{$ctrl.selected.circleIcon}}"></span>\n      </span>\n\n      <span class="text-ellipsis">\n        <span class="currency-flag currency-flag-{{$ctrl.selected.currency | lowercase}}"\n          ng-if="$ctrl.selected && $ctrl.selected.currency"\n          ng-class="$ctrl.responsiveClasses($ctrl.hideCurrency)"\n        ></span>\n        <span class="icon {{$ctrl.selected.icon}}"\n          ng-if="$ctrl.selected && $ctrl.selected.icon && !$ctrl.selected.secondary"\n          ng-class="$ctrl.responsiveClasses($ctrl.hideIcon)"\n        ></span>\n        <span class="tw-select-label"\n          ng-class="$ctrl.responsiveClasses($ctrl.hideLabel)">\n          {{$ctrl.selected.label}}\n        </span>\n        <span\n          ng-if="$ctrl.selected.note"\n          ng-class="$ctrl.responsiveClasses($ctrl.hideNote)"\n          class="tw-select-note small m-l-1">\n          {{$ctrl.selected.note}}\n        </span>\n\n        <span\n          ng-if="$ctrl.selected.secondary"\n          ng-class="$ctrl.responsiveClasses($ctrl.hideSecondary)"\n          class="tw-select-secondary small secondary text-ellipsis">\n          {{$ctrl.selected.secondary}}\n        </span>\n      </span>\n    </span>\n\n    <span class="form-control-placeholder" ng-if="!$ctrl.selected">{{$ctrl.placeholder}}</span>\n    <span class="caret"></span>\n  </button>\n  <ul class="dropdown-menu" role="menu" ng-class="{\n      \'dropdown-menu-xs-right\': $ctrl.dropdownRight === \'xs\',\n      \'dropdown-menu-sm-right\': $ctrl.dropdownRight === \'sm\',\n      \'dropdown-menu-md-right\': $ctrl.dropdownRight === \'md\',\n      \'dropdown-menu-lg-right\': $ctrl.dropdownRight === \'lg\',\n      \'dropdown-menu-xl-right\': $ctrl.dropdownRight === \'xl\',\n      \'dropdown-menu-sm\': $ctrl.dropdownWidth === \'sm\',\n      \'dropdown-menu-md\': $ctrl.dropdownWidth === \'md\',\n      \'dropdown-menu-lg\': $ctrl.dropdownWidth === \'lg\'\n    }">\n\n    <li ng-if="$ctrl.filter">\n      <a href="" class="tw-select-filter-link p-a-0" tabindex="-1"\n        ng-focus="$ctrl.filterFocus()">\n        <div class="input-group">\n          <span class="input-group-addon"><span class="icon icon-search"></span> </span>\n          <input type="text"\n            class="form-control tw-select-filter"\n            placeholder="{{$ctrl.filter}}"\n            ng-model="$ctrl.filterString"\n            ng-change="$ctrl.filterChange()"\n            ng-keydown="$ctrl.filterKeydown($event)" />\n        </div>\n      </a>\n    </li>\n\n    <li ng-class="{active: !$ctrl.selected}"\n      ng-if="$ctrl.placeholder && !$ctrl.ngRequired && !$ctrl.filter">\n      <a href="" tabindex="-1"\n        ng-click="$ctrl.placeholderClick()"\n        ng-focus="$ctrl.placeholderFocus()"\n        class="tw-select-placeholder" tw-focusable>\n        {{$ctrl.placeholder}}\n      </a>\n    </li>\n\n    <li ng-if="($ctrl.placeholder && !$ctrl.ngRequired) || $ctrl.filter" class="divider"></li>\n\n    <li\n      ng-repeat="option in $ctrl.filteredOptions"\n      ng-class="{\n        \'active\': $ctrl.ngModel === option.value,\n        \'disabled\': option.disabled,\n        \'dropdown-header\': option.header,\n        \'tw-select-option\': !option.header && !option.disabled\n      }">\n      <span ng-if="option.header" class="text-ellipsis">{{option.header}}</span>\n      <a href=""\n        ng-if="!option.header"\n        ng-click="$ctrl.optionClick(option, $event)"\n        ng-focus="$ctrl.optionFocus(option)"\n        ng-class="{\'tw-select-option-link\': !option.disabled}"\n        index="{{$index}}"\n        tabindex="-1"\n        tw-focusable >\n        <div ng-if="option.icon && option.secondary"\n          class="circle circle-inverse pull-xs-left circle-sm">\n          <span class="icon {{option.icon}}"></span>\n        </div>\n        <span ng-if="option.icon && !option.secondary"\n          class="icon {{option.icon}} pull-xs-left" >\n        </span> <span ng-if="option.currency"\n          class="currency-flag currency-flag-{{option.currency | lowercase}} pull-xs-left" >\n        </span> <span class="circle circle-inverse pull-xs-left"\n          ng-class="{\n            \'circle-sm\': option.secondary,\n            \'circle-xs\': !option.secondary\n          }"\n          ng-if="option.circleText || option.circleImage || option.circleIcon">\n          <span class="tw-select-circle-text"\n            ng-if="option.circleText">{{option.circleText}}</span>\n          <img alt="{{option.label}}"\n            ng-if="option.circleImage"\n            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="\n            ng-src="{{option.circleImage}}" />\n          <span ng-if="option.circleIcon" class="icon {{option.circleIcon}}"></span>\n        </span>{{option.label}}<span\n          ng-if="option.note" class="tw-select-note small m-l-1">{{option.note}}</span><span\n          ng-if="option.secondary"\n          class="tw-select-secondary small text-ellipsis">{{option.secondary}}</span>\n      </a>\n    </li>\n\n    <li ng-if="$ctrl.hasTranscluded" class="divider"></li>\n\n    <li ng-transclude ng-if="$ctrl.hasTranscluded" class="tw-select-transcluded"></li>\n  </ul>\n</div>\n<input type="hidden" class="tw-select-hidden"\n  name="{{$ctrl.name}}"\n  value="{{$ctrl.ngModel}}"\n  ng-disabled="$ctrl.ngDisabled" />\n';
}, function(module, exports) {
    module.exports = '<div class="droppable" ng-class="{\n  \'droppable-sm\': $ctrl.size ===\'sm\',\n  \'droppable-md\': $ctrl.size ===\'md\' || !$ctrl.size,\n  \'droppable-lg\': $ctrl.size ===\'lg\',\n  \'droppable-dropping\': $ctrl.isDroppable,\n  \'droppable-processing\': !$ctrl.isDone && ($ctrl.isProcessing || $ctrl.isSuccess || $ctrl.isError),\n  \'droppable-complete\': $ctrl.isDone\n}">\n  <div class="droppable-default-card" aria-hidden="{{$ctrl.isDone}}">\n    <div class="droppable-card-content">\n      <div class="m-b-2">\n        <span class="icon icon-{{$ctrl.viewIcon}} icon-xxl"></span>\n      </div>\n      <h4 class="m-b-1" ng-if="$ctrl.label || $ctrl.description">\n        {{$ctrl.label || $ctrl.description}}\n      </h4>\n      <p class="m-b-2">{{$ctrl.placeholder || $ctrl.instructions}}</p>\n      <label class="btn btn-primary">{{$ctrl.buttonText}}\n        <input tw-file-select type="file"\n          accept="{{$ctrl.accept}}"\n          class="tw-droppable-input hidden"\n          name="file-upload"\n          on-user-input="$ctrl.onManualUpload"\n          ng-model="$ctrl.inputFile"/>\n      </label>\n    </div>\n  </div>\n  <div class="droppable-processing-card droppable-card"\n    aria-hidden="{{$ctrl.isDone}}">\n    <div class="droppable-card-content">\n      <h4 class="m-b-2">\n        <span ng-if="$ctrl.isProcessing && $ctrl.processingText">{{$ctrl.processingText}}</span>\n        <span ng-if="$ctrl.isSuccess && $ctrl.successText">{{$ctrl.successText}}</span>\n        <span ng-if="$ctrl.isError && $ctrl.failureText">{{$ctrl.failureText}}</span>\n      </h4>\n      <tw-process size="sm" state="$ctrl.processingState"\n        ng-if="!$ctrl.isDone && ($ctrl.isProcessing || $ctrl.isSuccess || $ctrl.isError)"></tw-process>\n    </div>\n  </div>\n  <div class="droppable-complete-card droppable-card"\n    aria-hidden="{{!$ctrl.isDone}}">\n    <div class="droppable-card-content">\n      <div ng-if="!$ctrl.hasTranscluded && !$ctrl.isError">\n        <h4 class="m-b-2" ng-if="$ctrl.completeText">\n          {{$ctrl.completeText}}\n        </h4>\n        <img\n          ng-if="$ctrl.isImage"\n          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="\n          ng-src="{{$ctrl.image}}"\n          alt="OK"\n          class="thumbnail m-b-3" />\n        <span class="icon icon-pdf icon-xxl" ng-if="!$ctrl.isImage"></span>\n        <p class="text-ellipsis m-b-2">{{$ctrl.fileName}}</p>\n      </div>\n      <div ng-if="!$ctrl.hasTranscluded && $ctrl.isError">\n        <h4 class="m-b-2" ng-if="$ctrl.isTooLarge">{{$ctrl.tooLargeMessage}}</h4>\n        <h4 class="m-b-2" ng-if="$ctrl.isWrongType">{{$ctrl.wrongTypeText}}</h4>\n        <h4 class="m-b-2" ng-if="!$ctrl.isTooLarge && $ctrl.errorMessage">{{$ctrl.errorMessage}}</h4>\n        <span class="icon icon-alert icon-xxl text-danger m-b-1"></span>\n      </div>\n      <div ng-if="$ctrl.hasTranscluded" ng-transclude></div>\n      <p ng-if="$ctrl.cancelText" class="m-t-2 m-b-0">\n        <a href="" ng-click="$ctrl.clear()">{{$ctrl.cancelText}}</a>\n      </p>\n    </div>\n  </div>\n  <div class="droppable-dropping-card droppable-card">\n    <div class="droppable-card-content">\n      <h4 class="m-b-2">Drop file to start upload</h4>\n      <div class="circle circle-sm">\n        <span class="icon icon-add"></span>\n      </div>\n      <p class="m-t-2 m-b-0"></p>\n    </div>\n  </div>\n</div>\'\n';
}, function(module, exports) {
    module.exports = '<div class="loader">\n  <div class="loader-spinner"></div>\n  <div class="loader-flag">\n    <svg\n      xmlns="http://www.w3.org/2000/svg"\n      class="loader-flag-outline"\n      viewBox="-2 -2 56 56">\n      <polygon\n        class="loader-flag-stroke"\n        stroke="#00B9FF"\n        stroke-width="2"\n        stroke-linejoin="miter"\n        stroke-linecap="round"\n        stroke-miterlimit="10"\n        stroke-dasharray="300"\n        stroke-dashoffset="300"\n        fill="none"\n        points="24.6,27.3 0,27.3 14.3,13.7 6.1,0 48.2,0 26.3,52 19.5,52 39.2,5.5 16.8,5.5 21.6,13.6 13.4,21.8 27,21.8" />\n    </svg>\n    <svg\n      xmlns="http://www.w3.org/2000/svg"\n      class="loader-flag-fill"\n      viewBox="0 2 52 48">\n      <polygon\n        fill="#00B9FF"\n        points="6.1,0 14.3,13.7 0,27.3 24.6,27.3 27,21.8 13.4,21.8 21.6,13.6 16.8,5.5 39.2,5.5 19.5,52 26.3,52 48.2,0 "/>\n    </svg>\n  </div>\n</div>\n';
}, function(module, exports) {
    module.exports = "<span class=\"process\"\n  ng-class=\"{\n    'process-success': $ctrl.processing === 1,\n    'process-danger': $ctrl.processing === -1,\n    'process-stopped': $ctrl.processing === 0,\n    'process-xs': $ctrl.size === 'xs',\n    'process-sm': $ctrl.size === 'sm',\n    'process-md': $ctrl.size === 'md',\n    'process-lg': $ctrl.size === 'lg',\n    'process-xl': $ctrl.size === 'xl'\n  }\">\n  <span class=\"process-icon-container\">\n    <span class=\"process-icon-horizontal\"></span>\n    <span class=\"process-icon-vertical\"></span>\n  </span>\n  <svg version=\"1.1\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    xml:space=\"preserve\">\n    <circle class=\"process-circle\" \n      cx=\"50%\"\n      cy=\"50%\"\n      ng-attr-r=\"{{$ctrl.radius}}\"\n      fill-opacity=\"0.0\" />\n  </svg>\n</span>\n";
}, function(module, exports) {
    module.exports = '<ul ng-if="$ctrl.tabs.length > 0"\n  class="nav nav-tabs m-b-3">\n  <li\n    ng-repeat="tab in $ctrl.tabs track by $index"\n    ng-class="{\n      \'active\': $ctrl.active === tab.type\n    }">\n    <a href="" ng-click="$ctrl.switchTab(tab.type)">\n      {{tab.label}}\n    </a>\n  </li>\n</ul>\n';
} ]);