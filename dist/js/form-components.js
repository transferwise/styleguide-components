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
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 20);
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
    var _selectComponent = __webpack_require__(40), _selectComponent2 = _interopRequireDefault(_selectComponent);
    exports["default"] = angular.module("tw.styleguide.forms.select", []).component("twSelect", _selectComponent2["default"]).name;
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
    var _checkboxComponent = __webpack_require__(23), _checkboxComponent2 = _interopRequireDefault(_checkboxComponent);
    exports["default"] = angular.module("tw.styleguide.forms.checkbox", []).component("twCheckbox", _checkboxComponent2["default"]).name;
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
    var _dateComponent = __webpack_require__(29), _dateComponent2 = _interopRequireDefault(_dateComponent);
    exports["default"] = angular.module("tw.styleguide.forms.date", []).component("twDate", _dateComponent2["default"]).name;
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
    __webpack_require__(2)), _upload = (_interopRequireDefault(_date), __webpack_require__(6)), _formControlComponent = (_interopRequireDefault(_upload), 
    __webpack_require__(31)), _formControlComponent2 = _interopRequireDefault(_formControlComponent);
    exports["default"] = angular.module("tw.styleguide.forms.form-control", []).component("twDynamicFormControl", _formControlComponent2["default"]).name;
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
    var _dynamicFormControl = __webpack_require__(3), _fieldsetComponent = (_interopRequireDefault(_dynamicFormControl), 
    __webpack_require__(33)), _fieldsetComponent2 = _interopRequireDefault(_fieldsetComponent);
    exports["default"] = angular.module("tw.styleguide.forms.fieldset", []).component("twFieldset", _fieldsetComponent2["default"]).name;
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
    var _radioComponent = __webpack_require__(36), _radioComponent2 = _interopRequireDefault(_radioComponent);
    exports["default"] = angular.module("tw.styleguide.forms.radio", []).component("twRadio", _radioComponent2["default"]).name;
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
    var _uploadComponent = __webpack_require__(45), _uploadComponent2 = _interopRequireDefault(_uploadComponent), _fileInputDirective = __webpack_require__(44), _fileInputDirective2 = _interopRequireDefault(_fileInputDirective);
    exports["default"] = angular.module("tw.styleguide.forms.upload", []).directive("twFileInput", _fileInputDirective2["default"]).component("twUpload", _uploadComponent2["default"]).name;
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
    var _tabsComponent = __webpack_require__(50), _tabsComponent2 = _interopRequireDefault(_tabsComponent);
    exports["default"] = angular.module("tw.styleguide.navigation.tabs", []).component("twTabs", _tabsComponent2["default"]).name;
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
    var _currencyService = __webpack_require__(52), _currencyService2 = _interopRequireDefault(_currencyService);
    exports["default"] = angular.module("tw.styleguide.services.currency", []).service("TwCurrencyService", _currencyService2["default"]).name;
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
    var _dateService = __webpack_require__(53), _dateService2 = _interopRequireDefault(_dateService);
    exports["default"] = angular.module("tw.styleguide.services.date", []).service("TwDateService", _dateService2["default"]).name;
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
    var _select = __webpack_require__(0), _amountCurrencySelectComponent = (_interopRequireDefault(_select), 
    __webpack_require__(21)), _amountCurrencySelectComponent2 = _interopRequireDefault(_amountCurrencySelectComponent);
    exports["default"] = angular.module("tw.styleguide.forms.amount-currency-select", []).component("twAmountCurrencySelect", _amountCurrencySelectComponent2["default"]).name;
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
    var _currencyInputComponent = __webpack_require__(25), _currencyInputComponent2 = _interopRequireDefault(_currencyInputComponent);
    exports["default"] = angular.module("tw.styleguide.forms.currency-input", []).component("twCurrencyInput", _currencyInputComponent2["default"]).name;
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
    var _dateLookupComponent = __webpack_require__(27), _dateLookupComponent2 = _interopRequireDefault(_dateLookupComponent);
    exports["default"] = angular.module("tw.styleguide.forms.date-lookup", []).component("twDateLookup", _dateLookupComponent2["default"]).name;
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
    var _focusableDirective = __webpack_require__(35), _focusableDirective2 = _interopRequireDefault(_focusableDirective);
    exports["default"] = angular.module("tw.styleguide.forms.focusable", []).directive("twFocusable", _focusableDirective2["default"]).name;
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
    var _requirementsService = __webpack_require__(8), _requirementsService2 = _interopRequireDefault(_requirementsService), _requirementsFormComponent = __webpack_require__(38), _requirementsFormComponent2 = _interopRequireDefault(_requirementsFormComponent), _tabs = __webpack_require__(7), _fieldset = (_interopRequireDefault(_tabs), 
    __webpack_require__(4));
    _interopRequireDefault(_fieldset);
    exports["default"] = angular.module("tw.styleguide.forms.requirements-form", []).service("TwRequirementsService", _requirementsService2["default"]).component("twRequirementsForm", _requirementsFormComponent2["default"]).name;
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
    var _uploadDroppableDirective = __webpack_require__(43), _uploadDroppableDirective2 = _interopRequireDefault(_uploadDroppableDirective), _fileSelectDirective = __webpack_require__(42), _fileSelectDirective2 = _interopRequireDefault(_fileSelectDirective);
    exports["default"] = angular.module("tw.styleguide.forms.upload-droppable", []).directive("twFileSelect", _fileSelectDirective2["default"]).component("twUploadDroppable", _uploadDroppableDirective2["default"]).name;
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
    var _loaderComponent = __webpack_require__(47), _loaderComponent2 = _interopRequireDefault(_loaderComponent);
    exports["default"] = angular.module("tw.styleguide.loading.loader", []).component("twLoader", _loaderComponent2["default"]).name;
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
    var _processComponent = __webpack_require__(48), _processComponent2 = _interopRequireDefault(_processComponent);
    exports["default"] = angular.module("tw.styleguide.loading.process", []).component("twProcess", _processComponent2["default"]).name;
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
    var _angular = __webpack_require__(19), _angular2 = _interopRequireDefault(_angular), _checkbox = __webpack_require__(1), _checkbox2 = _interopRequireDefault(_checkbox), _radio = __webpack_require__(5), _radio2 = _interopRequireDefault(_radio), _select = __webpack_require__(0), _select2 = _interopRequireDefault(_select), _upload = __webpack_require__(6), _upload2 = _interopRequireDefault(_upload), _date = __webpack_require__(2), _date2 = _interopRequireDefault(_date), _dateLookup = __webpack_require__(13), _dateLookup2 = _interopRequireDefault(_dateLookup), _currencyInput = __webpack_require__(12), _currencyInput2 = _interopRequireDefault(_currencyInput), _amountCurrencySelect = __webpack_require__(11), _amountCurrencySelect2 = _interopRequireDefault(_amountCurrencySelect), _dynamicFormControl = __webpack_require__(3), _dynamicFormControl2 = _interopRequireDefault(_dynamicFormControl), _fieldset = __webpack_require__(4), _fieldset2 = _interopRequireDefault(_fieldset), _focusable = __webpack_require__(14), _focusable2 = _interopRequireDefault(_focusable), _tabs = __webpack_require__(7), _tabs2 = _interopRequireDefault(_tabs), _loader = __webpack_require__(17), _loader2 = _interopRequireDefault(_loader), _process = __webpack_require__(18), _process2 = _interopRequireDefault(_process), _requirementsForm = __webpack_require__(15), _requirementsForm2 = _interopRequireDefault(_requirementsForm), _uploadDroppable = __webpack_require__(16), _uploadDroppable2 = _interopRequireDefault(_uploadDroppable);
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
    var _amountCurrencySelectController = __webpack_require__(22), _amountCurrencySelectController2 = _interopRequireDefault(_amountCurrencySelectController), _amountCurrencySelect = __webpack_require__(54), _amountCurrencySelect2 = _interopRequireDefault(_amountCurrencySelect), AmountCurrencySelect = {
        controller: _amountCurrencySelectController2["default"],
        template: _amountCurrencySelect2["default"],
        require: {
            $ngModel: "ngModel"
        },
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
        }
    };
    exports["default"] = AmountCurrencySelect;
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
    function isNumber(value) {
        return !isNaN(parseFloat(value));
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), _currency = __webpack_require__(9), AmountCurrencySelectController = (_interopRequireDefault(_currency), 
    function() {
        function AmountCurrencySelectController($element, $scope, $timeout, TwCurrencyService) {
            var _this = this;
            _classCallCheck(this, AmountCurrencySelectController);
            var $ngModel = $element.controller("ngModel");
            this.$timeout = $timeout, this.showDecimals = !0, $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
                newValue !== oldValue && $ngModel.$setDirty();
            }), $scope.$watch("$ctrl.currency", function(newValue, oldValue) {
                newValue && newValue !== oldValue && (_this.showDecimals = TwCurrencyService.getDecimals(newValue) > 0);
            }), $element.find("input").on("blur", function() {
                $ngModel.$setTouched(), $element.triggerHandler("blur");
            }), $ngModel.$validators.min = function(modelValue, viewValue) {
                return "undefined" == typeof _this.ngMin || null === _this.ngMin || !isNumber(viewValue) || viewValue >= _this.ngMin;
            }, $ngModel.$validators.max = function(modelValue, viewValue) {
                return "undefined" == typeof _this.ngMax || null === _this.ngMax || !isNumber(viewValue) || viewValue <= _this.ngMax;
            };
        }
        return _createClass(AmountCurrencySelectController, [ {
            key: "changedAmount",
            value: function() {
                this.ngChange && this.$timeout(this.ngChange), this.onAmountChange && (console & console.log && console.log("onAmountChange is deprecated in twAmountCurrencySelect, please use ngChange."), 
                this.$timeout(this.onAmountChange));
            }
        }, {
            key: "changedCurrency",
            value: function() {
                this.onCurrencyChange && this.$timeout(this.onCurrencyChange);
            }
        }, {
            key: "customAction",
            value: function() {
                this.onCustomAction && this.onCustomAction();
            }
        } ]), AmountCurrencySelectController;
    }());
    AmountCurrencySelectController.$inject = [ "$element", "$scope", "$timeout", "TwCurrencyService" ], 
    exports["default"] = AmountCurrencySelectController;
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
    var _checkboxController = __webpack_require__(24), _checkboxController2 = _interopRequireDefault(_checkboxController), _checkbox = __webpack_require__(55), _checkbox2 = _interopRequireDefault(_checkbox), Checkbox = {
        controller: _checkboxController2["default"],
        template: _checkbox2["default"],
        require: {
            $ngModel: "ngModel"
        },
        bindings: {
            name: "@",
            ngModel: "=",
            ngTrueValue: "<",
            ngFalseValue: "<",
            ngRequired: "<",
            ngDisabled: "<"
        }
    };
    exports["default"] = Checkbox;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function validateCheckbox(isChecked, $element, $ngModel, isRequired) {
        $ngModel.$touched && (!isChecked && isRequired ? ($ngModel.$setValidity("required", !1), 
        $element.find(".tw-checkbox-button").addClass("has-error"), $element.closest(".checkbox").addClass("has-error"), 
        $element.closest(".form-group").addClass("has-error")) : ($ngModel.$setValidity("required", !0), 
        $element.find(".tw-checkbox-button").removeClass("has-error"), $element.closest(".checkbox").removeClass("has-error"), 
        $element.closest(".form-group").removeClass("has-error")));
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), CheckboxController = function() {
        function CheckboxController($scope, $element) {
            _classCallCheck(this, CheckboxController);
            var $ngModel = $element.controller("ngModel");
            this.$element = $element, this.checked = this.isChecked(), this.addLabelHandler(), 
            this.addWatchers($scope, $element, $ngModel);
        }
        return _createClass(CheckboxController, [ {
            key: "isChecked",
            value: function() {
                return this.ngTrueValue && this.ngTrueValue === this.ngModel || !this.ngTrueValue && this.ngModel || !1;
            }
        }, {
            key: "buttonClick",
            value: function($event) {
                this.checked ? (this.checked = !1, this.$ngModel.$setViewValue(this.ngFalseValue || !1)) : (this.checked = !0, 
                this.$ngModel.$setViewValue(this.ngTrueValue || !0)), this.$ngModel.$setTouched(), 
                $event && $event.stopPropagation(), validateCheckbox(this.checked, this.$element, this.$ngModel, this.ngRequired);
            }
        }, {
            key: "buttonFocus",
            value: function() {
                this.$element.closest(".checkbox").find("label").addClass("focus"), this.$element.triggerHandler("focus");
            }
        }, {
            key: "buttonBlur",
            value: function() {
                this.$element.closest(".checkbox").find("label").removeClass("focus"), this.$element.triggerHandler("blur"), 
                this.$ngModel.$setTouched(), validateCheckbox(this.checked, this.$element, this.$ngModel, this.ngRequired);
            }
        }, {
            key: "hiddenClick",
            value: function($event) {
                $event.stopPropagation();
            }
        }, {
            key: "addLabelHandler",
            value: function() {
                var _this = this;
                this.$element.closest("label").on("click", function(event) {
                    _this.$element.find("button").trigger("click"), event.preventDefault(), event.stopPropagation();
                });
            }
        }, {
            key: "addWatchers",
            value: function($scope, $element, $ngModel) {
                var _this2 = this;
                $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
                    newValue !== oldValue && ($ngModel.$setDirty(), validateCheckbox(_this2.checked, $element, $ngModel, _this2.ngRequired), 
                    _this2.checked = _this2.isChecked());
                }), $scope.$watch("$ctrl.ngDisabled", function(newValue, oldValue) {
                    newValue && !oldValue ? $element.closest(".checkbox").addClass("disabled").attr("disabled", !0) : !newValue && oldValue && $element.closest(".checkbox").removeClass("disabled").removeAttr("disabled");
                }), $scope.$watch("$ctrl.ngRequired", function(newValue, oldValue) {
                    newValue !== oldValue && validateCheckbox(_this2.checked, $element, $ngModel, _this2.ngRequired);
                });
            }
        } ]), CheckboxController;
    }();
    CheckboxController.$inject = [ "$scope", "$element" ], exports["default"] = CheckboxController;
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
    var _currencyInputController = __webpack_require__(26), _currencyInputController2 = _interopRequireDefault(_currencyInputController), _currencyInput = __webpack_require__(56), _currencyInput2 = _interopRequireDefault(_currencyInput), CurrencyInput = {
        controller: _currencyInputController2["default"],
        template: _currencyInput2["default"],
        require: {
            $ngModel: "ngModel"
        },
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
        }
    };
    exports["default"] = CurrencyInput;
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
    function isNumber(value) {
        return !isNaN(parseFloat(value));
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), _currency = __webpack_require__(9), TwCurrencyInputController = (_interopRequireDefault(_currency), 
    function() {
        function TwCurrencyInputController($element, $scope, $timeout, TwCurrencyService) {
            var _this = this;
            _classCallCheck(this, TwCurrencyInputController);
            var $ngModel = $element.controller("ngModel");
            this.$timeout = $timeout, this.showDecimals = !0, $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
                newValue !== oldValue && $ngModel.$setDirty();
            }), $scope.$watch("$ctrl.currency", function(newValue, oldValue) {
                newValue !== oldValue && (_this.showDecimals = TwCurrencyService.getDecimals(newValue) > 0);
            }), $element.find("input").on("blur", function() {
                $ngModel.$setTouched(), $element.triggerHandler("blur");
            }), this.currencyCode && console && console.log && console.log("currency code is deprecated in twCurrencyInput, please use currency."), 
            $ngModel.$validators.min = function(modelValue, viewValue) {
                return "undefined" == typeof _this.ngMin || null === _this.ngMin || !isNumber(viewValue) || viewValue >= _this.ngMin;
            }, $ngModel.$validators.max = function(modelValue, viewValue) {
                return "undefined" == typeof _this.ngMax || null === _this.ngMax || !isNumber(viewValue) || viewValue <= _this.ngMax;
            };
        }
        return _createClass(TwCurrencyInputController, [ {
            key: "changedInputValue",
            value: function() {
                this.ngChange && this.$timeout(this.ngChange);
            }
        } ]), TwCurrencyInputController;
    }());
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
    var _dateLookupController = __webpack_require__(28), _dateLookupController2 = _interopRequireDefault(_dateLookupController), _dateLookup = __webpack_require__(57), _dateLookup2 = _interopRequireDefault(_dateLookup), DateLookup = {
        controller: _dateLookupController2["default"],
        template: _dateLookup2["default"],
        require: {
            $ngModel: "ngModel"
        },
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
        }
    };
    exports["default"] = DateLookup;
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
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), _date = __webpack_require__(10), TwDateLookupController = (_interopRequireDefault(_date), 
    function() {
        function TwDateLookupController($element, $scope, $timeout, TwDateService) {
            var _this = this;
            _classCallCheck(this, TwDateLookupController);
            var $ngModel = $element.controller("ngModel");
            this.DateService = TwDateService, this.$element = $element, this.$timeout = $timeout, 
            this.yearOffset = 0, this.addValidators($ngModel, $element), this.addWatchers($scope, $ngModel), 
            $ngModel.$formatters.push(function(newDate) {
                return _this.updateCalendarView(newDate), newDate;
            }), $element.find(".btn, .dropdown-menu").on("focusout", function() {
                $timeout(function() {
                    0 !== $element.find(".btn:focus").length || $element.find(".btn-group").hasClass("open") || ($element.parents(".form-group").removeClass("focus"), 
                    $element.triggerHandler("blur"));
                }, 150);
            }), this.setLocale(this.locale), this.updateMinDateView(this.ngMin), this.updateMaxDateView(this.ngMax);
        }
        return _createClass(TwDateLookupController, [ {
            key: "openLookup",
            value: function() {
                var _this2 = this;
                this.$ngModel.$setTouched(), this.mode = "day";
                var viewDate = this.ngModel;
                this.ngMin && this.ngModel < this.ngMin && (viewDate = this.ngMin), this.ngMax && this.ngModel > this.ngMax && (viewDate = this.ngMax), 
                this.updateCalendarView(viewDate), this.$timeout(function() {
                    _this2.$element.find(".tw-date-lookup-month-label").focus();
                });
            }
        }, {
            key: "selectDay",
            value: function($event, day, month, year) {
                return this.isDayDisabled(day, month, year) ? void $event.stopPropagation() : (this.day = day, 
                this.setModel(this.DateService.getUTCDateFromParts(year, month, day)), this.resetFocus(this.$element), 
                void this.updateCalendarDatePresentation());
            }
        }, {
            key: "selectMonth",
            value: function($event, month, year) {
                $event.stopPropagation(), this.isMonthDisabled(month, year) || (this.month = month, 
                this.weeks = this.getTableStructure(), this.mode = "day", this.updateCalendarDatePresentation());
            }
        }, {
            key: "selectYear",
            value: function($event, year) {
                $event.stopPropagation(), this.isYearDisabled(year) || (this.year = year, this.mode = "month", 
                this.updateCalendarDatePresentation());
            }
        }, {
            key: "monthBefore",
            value: function($event) {
                $event.stopPropagation(), 0 === this.month ? (this.year--, this.month = 11) : this.month--, 
                this.weeks = this.getTableStructure(), this.updateCalendarDatePresentation();
            }
        }, {
            key: "yearBefore",
            value: function($event) {
                $event.stopPropagation(), this.year--, this.weeks = this.getTableStructure(), this.updateCalendarDatePresentation();
            }
        }, {
            key: "monthAfter",
            value: function($event) {
                $event.stopPropagation(), 11 === this.month ? (this.year++, this.month = 0) : this.month++, 
                this.weeks = this.getTableStructure(), this.updateCalendarDatePresentation();
            }
        }, {
            key: "yearAfter",
            value: function($event) {
                $event.stopPropagation(), this.year++, this.weeks = this.getTableStructure(), this.updateCalendarDatePresentation();
            }
        }, {
            key: "isCurrentlySelected",
            value: function(day, month, year) {
                return day === this.selectedDate && month === this.selectedMonth && year === this.selectedYear;
            }
        }, {
            key: "isDayDisabled",
            value: function(day, month, year) {
                return this.isYearDisabled(year) || this.isMonthDisabled(month, year) || year === this.minYear && month === this.minMonth && day < this.minDay || year === this.maxYear && month === this.maxMonth && day > this.maxDay;
            }
        }, {
            key: "isMonthDisabled",
            value: function(month, year) {
                return this.isYearDisabled(year) || year === this.minYear && month < this.minMonth || year === this.maxYear && month > this.maxMonth;
            }
        }, {
            key: "isYearDisabled",
            value: function(year) {
                return this.minYear && year < this.minYear || this.maxYear && year > this.maxYear;
            }
        }, {
            key: "switchToMonths",
            value: function($event) {
                this.resetFocus($($event.target)), this.findActiveLink(), $event.stopPropagation(), 
                this.mode = "month";
            }
        }, {
            key: "switchToYears",
            value: function($event) {
                this.resetFocus($($event.target)), this.findActiveLink(), $event.stopPropagation(), 
                this.mode = "year";
            }
        }, {
            key: "setYearOffset",
            value: function($event, addtionalOffset) {
                $event.stopPropagation(), this.yearOffset += addtionalOffset;
            }
        }, {
            key: "buttonFocus",
            value: function() {
                this.$element.parents(".form-group").addClass("focus"), this.$element.triggerHandler("focus");
            }
        }, {
            key: "blur",
            value: function() {
                this.$element.triggerHandler("focus");
            }
        }, {
            key: "addValidators",
            value: function($ngModel, $element) {
                var _this3 = this;
                $ngModel.$validators.min = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    return !(value && value < _this3.ngMin) || ($element.parents(".form-group").addClass("has-error"), 
                    !1);
                }, $ngModel.$validators.max = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    return !(value && value > _this3.ngMax) || ($element.parents(".form-group").addClass("has-error"), 
                    !1);
                };
            }
        }, {
            key: "addWatchers",
            value: function($scope, $ngModel) {
                var _this4 = this;
                $scope.$watch("$ctrl.locale", function(newValue, oldValue) {
                    newValue && newValue !== oldValue && _this4.setLocale(newValue);
                }), $scope.$watch("$ctrl.ngRequired", function(newValue, oldValue) {
                    $ngModel.$validate();
                }), $scope.$watch("$ctrl.ngMin", function(newValue, oldValue) {
                    newValue !== oldValue && (_this4.updateMinDateView(_this4.ngMin), $ngModel.$validate());
                }), $scope.$watch("$ctrl.shortDate", function(newValue, oldValue) {
                    _this4.updateSelectedDatePresentation();
                }), $scope.$watch("$ctrl.ngMax", function(newValue, oldValue) {
                    newValue !== oldValue && (_this4.updateMaxDateView(_this4.ngMax), $ngModel.$validate());
                }), $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
                    newValue && (_this4.selectedDate = _this4.DateService.getUTCDate(newValue), _this4.selectedMonth = _this4.DateService.getUTCMonth(newValue), 
                    _this4.selectedYear = _this4.DateService.getUTCFullYear(newValue), _this4.updateSelectedDatePresentation());
                });
            }
        }, {
            key: "updateCalendarView",
            value: function(viewDate) {
                viewDate && viewDate.getUTCDate || (viewDate = this.DateService.getLocaleToday()), 
                this.day = this.DateService.getUTCDate(viewDate), this.month = this.DateService.getUTCMonth(viewDate), 
                this.year = this.DateService.getUTCFullYear(viewDate), this.weeks = this.getTableStructure(), 
                this.updateCalendarDatePresentation();
            }
        }, {
            key: "getTableStructure",
            value: function() {
                var firstDayOfMonth = this.DateService.getWeekday(this.year, this.month, 1);
                0 === firstDayOfMonth && (firstDayOfMonth = 7);
                for (var daysInMonth = this.DateService.getLastDayOfMonth(this.year, this.month), week = [], weeks = [], i = 1; i < firstDayOfMonth; i++) week.push(!1);
                for (i = 1; i <= daysInMonth; i++) week.push(i), (firstDayOfMonth + i - 1) % 7 === 0 && (weeks.push(week), 
                week = []);
                if (week.length) {
                    for (i = week.length; i < 7; i++) week.push(!1);
                    weeks.push(week);
                }
                return weeks;
            }
        }, {
            key: "setLocale",
            value: function(locale) {
                locale || (this.locale = "en-GB"), this.monthBeforeDay = this.DateService.isMonthBeforeDay(this.locale), 
                this.monthsOfYear = this.DateService.getMonthNamesForLocale(this.locale, "long"), 
                this.shortMonthsOfYear = this.DateService.getMonthNamesForLocale(this.locale, "short"), 
                this.daysOfWeek = this.DateService.getDayNamesForLocale(this.locale, "short"), this.shortDaysOfWeek = this.DateService.getDayNamesForLocale(this.locale, "narrow"), 
                this.updateSelectedDatePresentation();
            }
        }, {
            key: "updateSelectedDatePresentation",
            value: function() {
                var monthsOfYear = this.shortDate ? this.shortMonthsOfYear : this.monthsOfYear;
                this.selectedDateFormatted = this.DateService.getYearMonthDatePresentation(this.selectedYear, monthsOfYear[this.selectedMonth], this.selectedDate, this.locale);
            }
        }, {
            key: "updateCalendarDatePresentation",
            value: function() {
                this.yearMonthFormatted = this.DateService.getYearAndMonthPresentation(this.year, this.monthsOfYear[this.month], this.locale);
            }
        }, {
            key: "moveDateToWithinRange",
            value: function(date, min, max) {
                return date || (date = this.DateService.getLocaleToday()), min && min > date ? min : max && max < date ? max : date;
            }
        }, {
            key: "setModel",
            value: function(modelDate) {
                modelDate = this.moveDateToWithinRange(modelDate, this.ngMin, this.ngMax), this.$ngModel.$setViewValue(modelDate), 
                this.$ngModel.$setDirty(), this.updateCalendarView(modelDate);
            }
        }, {
            key: "updateMinDateView",
            value: function(minDate) {
                minDate && minDate.getUTCDate ? (this.minDay = this.DateService.getUTCDate(minDate), 
                this.minMonth = this.DateService.getUTCMonth(minDate), this.minYear = this.DateService.getUTCFullYear(minDate)) : (this.minDay = null, 
                this.minMonth = null, this.minYear = null);
            }
        }, {
            key: "updateMaxDateView",
            value: function(maxDate) {
                maxDate && maxDate.getUTCDate ? (this.maxDay = this.DateService.getUTCDate(maxDate), 
                this.maxMonth = this.DateService.getUTCMonth(maxDate), this.maxYear = this.DateService.getUTCFullYear(maxDate)) : (this.maxDay = null, 
                this.maxMonth = null, this.maxYear = null);
            }
        }, {
            key: "keyHandler",
            value: function(event) {
                if (!this.ngModel) return void this.setModel(this.DateService.getUTCDateFromParts(this.year, this.month, this.day));
                var characterCode = event.which || event.charCode || event.keyCode;
                return 37 === characterCode ? this.adjustDate(this.mode, this.ngModel, -1, -1, -1) : 38 === characterCode ? (event.preventDefault(), 
                this.adjustDate(this.mode, this.ngModel, -7, -4, -4)) : 39 === characterCode ? this.adjustDate(this.mode, this.ngModel, 1, 1, 1) : 40 === characterCode && (event.preventDefault(), 
                this.adjustDate(this.mode, this.ngModel, 7, 4, 4)), this.findActiveLink(), !0;
            }
        }, {
            key: "findActiveLink",
            value: function() {
                var _this5 = this;
                this.$timeout(function() {
                    _this5.$element.find("a.active").focus();
                });
            }
        }, {
            key: "resetFocus",
            value: function($element) {
                $element.find("button").focus();
            }
        }, {
            key: "adjustDate",
            value: function(mode, date, days, months, years) {
                var newDate = date;
                "day" === mode && (newDate = this.DateService.addDays(date, days)), "month" === mode && (newDate = this.DateService.addMonths(date, months)), 
                "year" === mode && (newDate = this.DateService.addYears(date, years)), this.setModel(newDate);
            }
        } ]), TwDateLookupController;
    }());
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
    var _dateController = __webpack_require__(30), _dateController2 = _interopRequireDefault(_dateController), _date = __webpack_require__(58), _date2 = _interopRequireDefault(_date), DateControl = {
        controller: _dateController2["default"],
        template: _date2["default"],
        require: {
            $ngModel: "ngModel"
        },
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
        }
    };
    exports["default"] = DateControl;
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
    function isNumber(value) {
        return "number" == typeof value;
    }
    function isNumericString(value) {
        return "string" == typeof value && !isNaN(Number(value));
    }
    function isExplodedDatePatternCorrect(year, month, day) {
        return isNumber(year) && isNumber(day) && (isNumber(month) || isNumericString(month));
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
    function prepDateLimitForComparison(ngLimit, attrLimit) {
        var limit = ngLimit ? ngLimit : !!attrLimit && attrLimit;
        return !!limit && (limit = "string" == typeof limit ? new Date(limit) : limit, !!validDateObject(limit) && limit);
    }
    function prepDateValueForComparison(dateValue) {
        return "string" == typeof dateValue ? new Date(dateValue) : dateValue;
    }
    function extendMonthsWithIds(monthNames) {
        return monthNames.map(function(monthName, index) {
            return {
                value: index,
                label: monthName
            };
        });
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), _date = __webpack_require__(10), DateController = (_interopRequireDefault(_date), 
    function() {
        function DateController($element, $log, $scope, TwDateService) {
            _classCallCheck(this, DateController);
            var $ngModel = $element.controller("ngModel");
            if (this.DateService = TwDateService, this.initialisedWithDate = !1, this.ngModel) this.applyDateModelIfValidOrThrowError(), 
            this.initialisedWithDate = !0; else {
                if (this.modelType) {
                    if (this.modelType !== STRING_TYPE && this.modelType !== OBJECT_TYPE) throw new Error("Invalid modelType, should be " + STRING_TYPE + " or " + OBJECT_TYPE);
                    this.dateModelType = this.modelType;
                } else this.dateModelType = OBJECT_TYPE;
                this.day = null, this.month = 0, this.year = null;
            }
            this.setDateRequired(), this.setDateDisabled(), this.setDateLocale(), this.setMonths(), 
            this.addValidators($ngModel), this.addWatchers($scope, $ngModel), this.addBlurHandlers($element, $ngModel);
        }
        return _createClass(DateController, [ {
            key: "addBlurHandlers",
            value: function($element, $ngModel) {
                var dayTouched, yearTouched;
                $element.find("input[name=day]").on("blur", function() {
                    dayTouched = !0, dayTouched && yearTouched && ($ngModel.$setTouched(), $element.triggerHandler("blur"));
                }), $element.find("input[name=year]").on("blur", function() {
                    yearTouched = !0, $ngModel.$setTouched(), $element.triggerHandler("blur");
                });
            }
        }, {
            key: "applyDateModelIfValidOrThrowError",
            value: function() {
                if (!validDate(this.ngModel)) throw new Error("date model passed should either be instance of Date or valid ISO8601 string");
                this.dateModelType = "string" == typeof this.ngModel ? STRING_TYPE : OBJECT_TYPE, 
                this.explodeDateModel(this.ngModel);
            }
        }, {
            key: "setMonths",
            value: function() {
                this.dateMonths = this.getMonthsBasedOnIntlSupportForLocale();
            }
        }, {
            key: "setDateRequired",
            value: function() {
                this.dateRequired = void 0 !== this.ngRequired ? this.ngRequired : void 0 !== this.required;
            }
        }, {
            key: "setDateDisabled",
            value: function() {
                this.dateDisabled = void 0 !== this.ngDisabled ? this.ngDisabled : void 0 !== this.disabled;
            }
        }, {
            key: "setDateLocale",
            value: function() {
                this.locale || (this.locale = DEFAULT_LOCALE_EN), this.monthBeforeDay = this.DateService.isMonthBeforeDay(this.locale);
            }
        }, {
            key: "explodeDateModel",
            value: function(date) {
                var dateObj = "string" == typeof date ? new Date(date) : date;
                this.day = dateObj.getUTCDate(), this.month = dateObj.getUTCMonth(), this.year = dateObj.getUTCFullYear();
            }
        }, {
            key: "addValidators",
            value: function($ngModel) {
                var _this = this;
                $ngModel.$validators.min = function(value) {
                    var limit = prepDateLimitForComparison(_this.ngMin, _this.min), dateValue = prepDateValueForComparison(value);
                    return !limit || !dateValue || dateValue >= limit;
                }, $ngModel.$validators.max = function(value) {
                    var limit = prepDateLimitForComparison(_this.ngMax, _this.max), dateValue = prepDateValueForComparison(value);
                    return !limit || !dateValue || dateValue <= limit;
                };
            }
        }, {
            key: "addWatchers",
            value: function($scope, $ngModel) {
                var _this2 = this;
                $scope.$watch("$ctrl.day", function(newValue, oldValue) {
                    newValue !== oldValue && _this2.initialisedWithDate && $ngModel.$setDirty();
                }), $scope.$watch("$ctrl.month", function(newValue, oldValue) {
                    newValue !== oldValue && (_this2.adjustLastDay(), $ngModel.$setTouched(), _this2.initialisedWithDate && $ngModel.$setDirty());
                }), $scope.$watch("$ctrl.year", function(newValue, oldValue) {
                    newValue !== oldValue && _this2.initialisedWithDate && $ngModel.$setDirty();
                }), $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
                    newValue !== oldValue && validDate(_this2.ngModel) && ($ngModel.$setDirty(), _this2.explodeDateModel(_this2.ngModel));
                }), $scope.$watch("$ctrl.ngRequired", function(newValue, oldValue) {
                    newValue !== oldValue && _this2.setDateRequired();
                }), $scope.$watch("$ctrl.ngDisabled", function(newValue, oldValue) {
                    newValue !== oldValue && _this2.setDateDisabled();
                }), $scope.$watch("$ctrl.locale", function(newValue, oldValue) {
                    newValue !== oldValue && (_this2.setDateLocale(), _this2.setMonths());
                });
            }
        }, {
            key: "getMonthsBasedOnIntlSupportForLocale",
            value: function() {
                var monthNames = this.DateService.getMonthNamesForLocale(this.locale);
                return extendMonthsWithIds(monthNames);
            }
        }, {
            key: "combineDate",
            value: function() {
                var date = this.DateService.getUTCDateFromParts(Number(this.year), Number(this.month), Number(this.day));
                return date;
            }
        }, {
            key: "updateDateModelAndValidationClasses",
            value: function() {
                if (this.adjustLastDay(), !isExplodedDatePatternCorrect(this.year, this.month, this.day)) return void this.$ngModel.$setViewValue(null);
                var dateObj = this.combineDate();
                if (this.dateModelType === STRING_TYPE) {
                    var isoString = dateObj.toISOString(), dateString = isoString.substring(0, isoString.indexOf("T"));
                    this.$ngModel.$setViewValue(dateString);
                } else this.$ngModel.$setViewValue(dateObj);
            }
        }, {
            key: "adjustLastDay",
            value: function() {
                var day = Number(this.day), month = Number(this.month), year = Number(this.year), lastUTCDayForMonthAndYear = this.DateService.getLastDayOfMonth(year, month);
                day > lastUTCDayForMonthAndYear && (this.day = parseInt(lastUTCDayForMonthAndYear, 10));
            }
        } ]), DateController;
    }()), DEFAULT_LOCALE_EN = "en", STRING_TYPE = "string", OBJECT_TYPE = "object";
    DateController.$inject = [ "$element", "$log", "$scope", "TwDateService" ], exports["default"] = DateController;
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
    var _formControlController = __webpack_require__(32), _formControlController2 = _interopRequireDefault(_formControlController), _formControl = __webpack_require__(59), _formControl2 = _interopRequireDefault(_formControl), FormControl = {
        controller: _formControlController2["default"],
        template: _formControl2["default"],
        require: {
            $ngModel: "ngModel"
        },
        transclude: !0,
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
        }
    };
    exports["default"] = FormControl;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), FormControlController = function() {
        function FormControlController($element, $scope) {
            var _this = this;
            _classCallCheck(this, FormControlController);
            var $ngModel = $element.controller("ngModel");
            this.$element = $element, $ngModel.$validators.minlength = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                return "text" !== _this.type || !_this.ngMinlength || (!value || value.length >= _this.ngMinlength);
            }, $ngModel.$validators.maxlength = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                return "text" !== _this.type || !_this.ngMaxlength || (!value || value.length <= _this.ngMaxlength);
            }, $ngModel.$validators.min = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                return "undefined" == typeof _this.ngMin || !("number" == typeof value && "number" == typeof _this.ngMin && value < _this.ngMin) && !(value && value.getUTCDate && _this.ngMin.getUTCDate && value < _this.ngMin);
            }, $ngModel.$validators.max = function(modelValue, viewValue) {
                var value = modelValue || viewValue;
                return "undefined" == typeof _this.ngMax || !("number" == typeof value && "number" == typeof _this.ngMax && value > _this.ngMax) && !(value && viewValue.getUTCDate && _this.ngMax.getUTCDate && value > _this.ngMax);
            };
        }
        return _createClass(FormControlController, [ {
            key: "change",
            value: function() {
                this.$ngModel.$setDirty(), this.ngChange && this.ngChange();
            }
        }, {
            key: "focus",
            value: function() {
                this.$element.triggerHandler("focus");
            }
        }, {
            key: "blur",
            value: function() {
                this.$ngModel.$setTouched(), this.$element.triggerHandler("blur");
            }
        } ]), FormControlController;
    }();
    FormControlController.$inject = [ "$element", "$scope" ], exports["default"] = FormControlController;
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
    var _fieldsetController = __webpack_require__(34), _fieldsetController2 = _interopRequireDefault(_fieldsetController), _fieldset = __webpack_require__(60), _fieldset2 = _interopRequireDefault(_fieldset), Fieldset = {
        controller: _fieldsetController2["default"],
        template: _fieldset2["default"],
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
        }
    };
    exports["default"] = Fieldset;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function prepFields(fields, model) {
        fields.forEach(function(fieldGroup) {
            fieldGroup.group.length && (fieldGroup.key = fieldGroup.group[0].key), fieldGroup.group.forEach(function(field) {
                "upload" === field.type && (fieldGroup.type = "upload"), prepRegExp(field), prepValuesAsync(field, model), 
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
    function prepValuesAsync(field, model) {
        if (field.valuesAsync) {
            var postData = {};
            field.valuesAsync.params && field.valuesAsync.params.length && (postData = getParamValuesFromModel(model, field.valuesAsync.params)), 
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
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), FieldsetController = function() {
        function FieldsetController($scope) {
            var _this = this;
            _classCallCheck(this, FieldsetController), this.model || (this.model = {}), this.fields && prepFields(this.fields, this.model), 
            $scope.$watch("$ctrl.fields", function(newValue, oldValue) {
                angular.equals(newValue, oldValue) || prepFields(_this.fields, _this.model);
            }), $scope.$watch("twFieldset.$valid", function(validity) {
                _this.isValid = validity;
            }), this.validationMessages || (this.validationMessages = {
                required: "Required",
                pattern: "Incorrect format",
                min: "The value is too low",
                max: "The value is too high",
                minlength: "The value is too short",
                maxlength: "The value is too long"
            });
        }
        return _createClass(FieldsetController, [ {
            key: "onBlur",
            value: function(field) {
                this.removeFieldError(field.key), !field.refreshRequirementsOnChange;
            }
        }, {
            key: "onChange",
            value: function(field) {
                this.removeFieldError(field.key);
            }
        }, {
            key: "removeFieldError",
            value: function(fieldKey) {
                this.errorMessages && delete this.errorMessages[fieldKey];
            }
        } ]), FieldsetController;
    }();
    FieldsetController.$inject = [ "$scope" ], exports["default"] = FieldsetController;
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
    var _radioController = __webpack_require__(37), _radioController2 = _interopRequireDefault(_radioController), _radio = __webpack_require__(61), _radio2 = _interopRequireDefault(_radio), Radio = {
        controller: _radioController2["default"],
        template: _radio2["default"],
        require: {
            $ngModel: "ngModel"
        },
        bindings: {
            name: "@",
            value: "@",
            ngModel: "=",
            ngValue: "<",
            ngRequired: "<",
            ngDisabled: "<",
            ngChange: "&"
        }
    };
    exports["default"] = Radio;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), RadioController = function() {
        function RadioController($scope, $element) {
            _classCallCheck(this, RadioController);
            var $ngModel = $element.controller("ngModel");
            this.$element = $element, this.checked = this.isChecked(), $element.on("blur", function(event) {
                $ngModel.$setTouched();
            }), this.addWatchers($scope, $element, $ngModel);
        }
        return _createClass(RadioController, [ {
            key: "isChecked",
            value: function() {
                return this.ngValue && this.ngModel === this.ngValue || this.value === this.ngModel;
            }
        }, {
            key: "buttonClick",
            value: function($event) {
                this.ngDisabled || (this.checked = !0, this.$ngModel.$setViewValue(this.ngValue || this.value));
            }
        }, {
            key: "buttonFocus",
            value: function() {
                this.$element.closest("label").addClass("focus"), this.$element.triggerHandler("focus");
            }
        }, {
            key: "buttonBlur",
            value: function() {
                this.$element.closest("label").removeClass("focus"), this.$element.triggerHandler("blur");
            }
        }, {
            key: "hiddenInputChange",
            value: function() {
                this.ngChange && this.ngChange();
            }
        }, {
            key: "addWatchers",
            value: function($scope, $element, $ngModel) {
                var _this = this;
                $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
                    newValue !== oldValue && _this.$ngModel.$setDirty(), _this.checked = _this.isChecked();
                }), $scope.$watch("$ctrl.ngDisabled", function(newValue, oldValue) {
                    newValue && !oldValue ? _this.$element.closest(".radio").addClass("disabled").attr("disabled", !0) : !newValue && oldValue && _this.$element.closest(".radio").removeClass("disabled").removeAttr("disabled");
                });
            }
        } ]), RadioController;
    }();
    RadioController.$inject = [ "$scope", "$element" ], exports["default"] = RadioController;
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
    var _requirementsFormController = __webpack_require__(39), _requirementsFormController2 = _interopRequireDefault(_requirementsFormController), _requirementsForm = __webpack_require__(62), _requirementsForm2 = _interopRequireDefault(_requirementsForm), RequirementsForm = {
        controller: _requirementsFormController2["default"],
        template: _requirementsForm2["default"],
        bindings: {
            model: "=",
            requirements: "<",
            uploadOptions: "<",
            locale: "@",
            onRefreshRequirements: "&",
            validationMessages: "<",
            errorMessages: "<",
            isValid: "=?"
        }
    };
    exports["default"] = RequirementsForm;
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
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), _requirementsService = __webpack_require__(8), RequirementsFormController = (_interopRequireDefault(_requirementsService), 
    function() {
        function RequirementsFormController($scope, TwRequirementsService) {
            var _this = this;
            _classCallCheck(this, RequirementsFormController), this.RequirementsService = TwRequirementsService, 
            this.model || (this.model = {}), this.requirements && this.RequirementsService.prepRequirements(this.requirements), 
            $scope.$watch("$ctrl.requirements", function(newRequirements, oldRequirements) {
                if (!angular.equals(newRequirements, oldRequirements)) {
                    _this.RequirementsService.prepRequirements(_this.requirements);
                    var oldType = _this.model.type, newType = _this.requirements.length ? _this.requirements[0].type : null;
                    _this.model.type = newType, oldRequirements && newRequirements && _this.RequirementsService.cleanModel(_this.model, oldRequirements, oldType, newRequirements, newType);
                }
            }), $scope.$watch("$ctrl.model.type", function(newType, oldType) {
                _this.switchTab(newType, oldType);
            }), $scope.$watch("twForm.$valid", function(validity) {
                _this.isValid = validity;
            });
        }
        return _createClass(RequirementsFormController, [ {
            key: "onBlur",
            value: function(field) {
                !field.refreshRequirementsOnChange;
            }
        }, {
            key: "switchTab",
            value: function(newType, oldType) {
                var oldRequirementType = this.RequirementsService.findRequirementByType(oldType, this.requirements), newRequirementType = this.RequirementsService.findRequirementByType(newType, this.requirements);
                oldRequirementType && newRequirementType || (this.model || (this.model = {}), this.model.type = newType), 
                this.RequirementsService.cleanRequirementsModel(this.model, oldRequirementType, newRequirementType);
            }
        } ]), RequirementsFormController;
    }());
    RequirementsFormController.$inject = [ "$scope", "TwRequirementsService" ], exports["default"] = RequirementsFormController;
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
    var _selectController = __webpack_require__(41), _selectController2 = _interopRequireDefault(_selectController), _select = __webpack_require__(63), _select2 = _interopRequireDefault(_select), Select = {
        controller: _selectController2["default"],
        template: _select2["default"],
        require: "ngModel",
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
        }
    };
    exports["default"] = Select;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
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
    function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
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
    function findSelected(options, selected) {
        var selectedOption;
        return options.forEach(function(option) {
            selected && angular.equals(selected.value, option.value) && (selectedOption = selected);
        }), selectedOption;
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
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), SelectController = function() {
        function SelectController($element, $scope, $transclude, $timeout, $attrs) {
            _classCallCheck(this, SelectController), this.$ngModel = $element.controller("ngModel"), 
            this.$element = $element, this.search = "", preSelectModelValue(this.$ngModel, this, this.options), 
            setDefaultIfRequired(this.$ngModel, this, $element, $attrs), addWatchers(this, $scope, this.$ngModel, $element), 
            addEventHandlers(this, $element, this.$ngModel, this.options, $timeout), checkForTranscludedContent($transclude, this), 
            this.responsiveClasses = responsiveClasses, this.filterString = "", this.filteredOptions = this.getFilteredOptions();
        }
        return _createClass(SelectController, [ {
            key: "circleClasses",
            value: function(responsiveOption) {
                var classes = responsiveClasses(responsiveOption), secondaryClasses = responsiveClasses(this.hideSecondary);
                return classes += this.selected.secondary && 0 === secondaryClasses.length ? " circle-sm" : " circle-xs";
            }
        }, {
            key: "buttonFocus",
            value: function() {
                this.$element.triggerHandler("focus");
            }
        }, {
            key: "optionClick",
            value: function(option, $event) {
                return option.disabled ? void $event.stopPropagation() : (selectOption(this.$ngModel, this, option), 
                void this.$element.find(".btn").focus());
            }
        }, {
            key: "optionFocus",
            value: function(option) {
                selectOption(this.$ngModel, this, option);
            }
        }, {
            key: "optionKeypress",
            value: function(event) {
                if (!$(event.target).hasClass("tw-select-filter")) {
                    var characterCode = getCharacterCodeFromKeypress(event);
                    if (8 === characterCode) return event.preventDefault(), !1;
                    var character = getCharacterFromKeypress(event);
                    continueSearchAndSelectMatch(this.$ngModel, this, this.options, character), this.$element.find(".active a").focus();
                }
            }
        }, {
            key: "placeholderClick",
            value: function(option) {
                resetOption(this.$ngModel, this), this.$element.find(".btn").focus();
            }
        }, {
            key: "placeholderFocus",
            value: function() {
                resetOption(this.$ngModel, this);
            }
        }, {
            key: "getFilteredOptions",
            value: function() {
                var _this = this;
                if (!this.options || !this.options.filter) return [];
                var filteredLabels = [];
                return this.options.filter(function(option) {
                    var filterStringLower = _this.filterString && escapeRegExp(_this.filterString.toLowerCase());
                    if (!filterStringLower) return !0;
                    var duplicate = !1;
                    filteredLabels.indexOf(option.label) > -1 && (duplicate = !0);
                    var addOption = (labelMatches(option, filterStringLower) || noteMatches(option, filterStringLower) || secondaryMatches(option, filterStringLower) || searchableMatches(option, filterStringLower)) && !duplicate;
                    return addOption && filteredLabels.push(option.label), addOption;
                });
            }
        }, {
            key: "filterFocus",
            value: function() {
                this.$element.find(".tw-select-filter").focus();
            }
        }, {
            key: "filterChange",
            value: function() {
                this.filteredOptions = this.getFilteredOptions();
                var selectedOption = findSelected(this.filteredOptions, this.selected);
                !selectedOption && this.filteredOptions.length && selectOption(this.$ngModel, this, this.filteredOptions[0]);
            }
        }, {
            key: "filterKeydown",
            value: function(event) {
                var characterCode = event.which || event.charCode || event.keyCode, activeOption = this.$element.find(".active"), activeLink = activeOption.find("a"), optionLinks = this.$element.find(".tw-select-option-link");
                return 40 === characterCode ? (this.moveDownOneOption(activeOption, activeLink, optionLinks), 
                event.preventDefault()) : 38 === characterCode ? (this.moveUpOneOption(activeOption, activeLink, optionLinks), 
                event.preventDefault()) : 13 === characterCode && (activeOption.click(), this.$element.find(".btn").focus(), 
                event.preventDefault()), !0;
            }
        }, {
            key: "selectOptionUsingLink",
            value: function(link) {
                var option = this.filteredOptions[link.attr("index")];
                selectOption(this.$ngModel, this, option);
            }
        }, {
            key: "moveUpOneOption",
            value: function(activeOption, activeLink, optionLinks) {
                if (!activeOption.length && optionLinks.length) return void this.selectOptionUsingLink($(optionLinks[optionLinks.length - 1]));
                if (activeLink[0] !== optionLinks[0]) {
                    var previousOptions = activeOption.prevAll(".tw-select-option");
                    return void this.selectOptionUsingLink($(previousOptions[0]).find("a"));
                }
            }
        }, {
            key: "moveDownOneOption",
            value: function(activeOption, activeLink, optionLinks) {
                if (!activeOption.length && optionLinks.length) return void this.selectOptionUsingLink($(optionLinks[0]));
                if (activeLink[0] !== optionLinks[optionLinks.length - 1]) {
                    var nextOptions = activeOption.nextAll(".tw-select-option");
                    return void this.selectOptionUsingLink($(nextOptions[0]).find("a"));
                }
                var transcludedOption = $(".tw-select-transcluded");
                return transcludedOption.length ? void transcludedOption.find("a").focus() : void 0;
            }
        } ]), SelectController;
    }();
    SelectController.$inject = [ "$element", "$scope", "$transclude", "$timeout", "$attrs" ], 
    exports["default"] = SelectController;
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
    function FileInputDirective() {
        return {
            restrict: "A",
            controller: FileInputController,
            controllerAs: "$ctrl",
            bindToController: !0,
            require: {
                UploadController: "^twUpload"
            },
            scope: {
                onUserInput: "&"
            }
        };
    }
    function FileInputController($element) {
        var $ctrl = this;
        $element.on("change", function(event) {
            $ctrl.onUserInput && "function" == typeof $ctrl.onUserInput && $ctrl.onUserInput();
        });
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), FileInputController.$inject = [ "$element" ], exports["default"] = FileInputDirective;
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
    var _uploadController = __webpack_require__(46), _uploadController2 = _interopRequireDefault(_uploadController), _upload = __webpack_require__(64), _upload2 = _interopRequireDefault(_upload), Upload = {
        controller: _uploadController2["default"],
        template: _upload2["default"],
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
            successText: "@",
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
        }
    };
    exports["default"] = Upload;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function triggerHandler(method, argument) {
        method && "function" == typeof method && method(argument);
    }
    function prepareHttpOptions($httpOptions) {
        if (!$httpOptions.url) throw new Error("You must supply a URL to post image data asynchronously");
        return $httpOptions.headers || ($httpOptions.headers = {}), $httpOptions.method && delete $httpOptions.method, 
        $httpOptions.headers["Content-Type"] = void 0, $httpOptions.transformRequest = angular.identity, 
        $httpOptions;
    }
    function isSizeValid(file, maxSize) {
        return !(angular.isNumber(maxSize) && file.size > maxSize);
    }
    function isTypeValid(file, accept) {
        return !0;
    }
    function showDataImage(dataUrl, $ctrl) {
        $ctrl.setNgModel(dataUrl), $ctrl.isImage = $ctrl.isImage_instant, $ctrl.isImage && ($ctrl.image = dataUrl);
    }
    function asyncSuccess(response, $ctrl) {
        return $ctrl.processingState = 1, $ctrl.$timeout(function() {
            $ctrl.isProcessing = !1, $ctrl.isSuccess = !0;
        }, 3e3), $ctrl.$timeout(function() {
            triggerHandler($ctrl.onSuccess, response), $ctrl.isDone = !0;
        }, 3800), response;
    }
    function asyncFailure(error, $ctrl) {
        return $ctrl.processingState = -1, $ctrl.$timeout(function() {
            $ctrl.isProcessing = !1, $ctrl.isError = !0;
        }, 3e3), $ctrl.$timeout(function() {
            triggerHandler($ctrl.onFailure, error), $ctrl.isDone = !0;
        }, 4100), error;
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), UploadController = function() {
        function UploadController($timeout, $element, $http, $scope, $transclude, $q, $attrs) {
            var _this = this;
            if (_classCallCheck(this, UploadController), this.$timeout = $timeout, this.$element = $element, 
            this.$http = $http, this.$attrs = $attrs, this.$q = $q, this.isImage = !1, this.isImage_instant = !1, 
            this.dragCounter = 0, this.isProcessing = !1, this.processingState = null, this.checkForTranscludedContent($transclude, this), 
            $scope.$watch("$ctrl.icon", function() {
                _this.viewIcon = _this.icon ? _this.icon : "upload";
            }), (this.processingText || this.successText || this.failureText) && (!this.processingText || !this.successText || !this.failureText)) throw new Error("Supply all of processing, success, and failure text, or supply none.");
            this.addDragHandlers($scope, $element);
        }
        return _createClass(UploadController, [ {
            key: "onManualUpload",
            value: function() {
                var element = this.$element[0], uploadInput = element.querySelector(".tw-droppable-input"), file = uploadInput.files[0];
                if (!file) throw new Error("Could not retrieve file");
                this.fileDropped(file);
            }
        }, {
            key: "fileDropped",
            value: function(file) {
                if (this.reset(), this.isImage_instant = file.type && file.type.indexOf("image") > -1, 
                this.fileName = file.name, this.isProcessing = !0, this.processingState = null, 
                triggerHandler(this.onStart, file), !isSizeValid(file, this.maxSize)) return this.isTooLarge = !0, 
                void this.asyncFailure({
                    status: 413,
                    statusText: "Request Entity Too Large"
                });
                if (!isTypeValid(file, this.accept)) return this.isWrongType = !0, void this.asyncFailure({
                    status: 415,
                    statusText: "Unsupported Media Type"
                });
                var $ctrl = this;
                this.httpOptions ? this.$q.all([ this.asyncPost(file), this.asyncFileRead(file) ]).then(function(response) {
                    return asyncSuccess(response[0], $ctrl), response;
                }).then(function(response) {
                    return showDataImage(response[1], $ctrl), response;
                })["catch"](function(error) {
                    return asyncFailure(error, $ctrl);
                }) : this.asyncFileRead(file).then(function(response) {
                    return asyncSuccess(response, $ctrl);
                }).then(function(response) {
                    return showDataImage(response, $ctrl);
                })["catch"](function(error) {
                    return asyncFailure(error, $ctrl);
                });
            }
        }, {
            key: "onDragEnter",
            value: function() {
                this.dragCounter++, this.dragCounter >= 1 && (this.isDroppable = !0);
            }
        }, {
            key: "onDragLeave",
            value: function() {
                this.dragCounter--, this.dragCounter <= 0 && (this.isDroppable = !1);
            }
        }, {
            key: "clear",
            value: function() {
                this.reset(), triggerHandler(this.onCancel);
            }
        }, {
            key: "reset",
            value: function() {
                this.isDroppable = !1, this.isProcessing = !1, this.isSuccess = !1, this.isError = !1, 
                this.dragCounter = 0, this.isDone = !1, this.isTooLarge = !1, this.isWrongType = !1, 
                this.$element[0].querySelector("input").value = null, this.setNgModel(null);
            }
        }, {
            key: "setNgModel",
            value: function(value) {
                if ("undefined" != typeof this.$attrs.ngModel) {
                    var $ngModel = this.$element.controller("ngModel");
                    if (!$ngModel.$setViewValue) return;
                    $ngModel.$setViewValue(value);
                }
            }
        }, {
            key: "asyncPost",
            value: function(file) {
                var formData = new FormData();
                formData.append(this.name, file);
                var $httpOptions = prepareHttpOptions(angular.copy(this.httpOptions));
                return this.$http.post($httpOptions.url, formData, $httpOptions);
            }
        }, {
            key: "asyncFileRead",
            value: function(file) {
                var reader = new FileReader(), deferred = this.$q.defer();
                return reader.onload = function(event) {
                    deferred.resolve(event.target.result);
                }, reader.onerror = function(event) {
                    deferred.reject(event);
                }, reader.readAsDataURL(file), deferred.promise;
            }
        }, {
            key: "addDragHandlers",
            value: function($scope, $element) {
                var _this2 = this;
                $element[0].addEventListener("dragenter", function(event) {
                    event.preventDefault(), _this2.onDragEnter(), $scope.$apply();
                }, !1), $element[0].addEventListener("dragover", function(event) {
                    event.preventDefault();
                }, !1), $element[0].addEventListener("dragleave", function(event) {
                    event.preventDefault(), _this2.onDragLeave(), $scope.$apply();
                }, !1), $element[0].addEventListener("drop", function(event) {
                    event.preventDefault(), _this2.fileDropped(event.dataTransfer.files[0]), $scope.$apply();
                }, !1);
            }
        }, {
            key: "checkForTranscludedContent",
            value: function($transclude, $ctrl) {
                var _this3 = this;
                $transclude(function(clone) {
                    clone.length > 1 || "" !== clone.text().trim() ? _this3.hasTranscluded = !0 : _this3.hasTranscluded = !1;
                });
            }
        } ]), UploadController;
    }();
    UploadController.$inject = [ "$timeout", "$element", "$http", "$scope", "$transclude", "$q", "$attrs" ], 
    exports["default"] = UploadController;
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
    var _loader = __webpack_require__(65), _loader2 = _interopRequireDefault(_loader), TwLoader = {
        template: _loader2["default"]
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
    var _processController = __webpack_require__(49), _processController2 = _interopRequireDefault(_processController), _process = __webpack_require__(66), _process2 = _interopRequireDefault(_process), Process = {
        controller: _processController2["default"],
        template: _process2["default"],
        bindings: {
            state: "<",
            size: "@",
            onStop: "&",
            promise: "<"
        }
    };
    exports["default"] = Process;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function isStopped(state) {
        return state === -1 || 0 === state || 1 === state;
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), ProcessController = function() {
        function ProcessController($scope, $interval, $timeout) {
            var _this = this;
            _classCallCheck(this, ProcessController), this.$interval = $interval, this.$timeout = $timeout, 
            this.interval = null, this.processing = this.state, $scope.$watch("$ctrl.state", function(newVal) {
                isStopped(_this.processing) && (_this.processing = null, _this.startProcess());
            }), $scope.$watch("$ctrl.size", function(newVal) {
                switch ($interval.cancel(_this.interval), _this.startProcess(), _this.size || (_this.size = "sm"), 
                _this.size) {
                  case "xs":
                    _this.radius = "11";
                    break;

                  case "sm":
                    _this.radius = "22";
                    break;

                  case "xl":
                    _this.radius = "61";
                    break;

                  default:
                    _this.radius = "46%";
                }
            }), this.startProcess();
        }
        return _createClass(ProcessController, [ {
            key: "startProcess",
            value: function() {
                var _this2 = this;
                this.interval = this.$interval(function() {
                    _this2.processing = _this2.state, isStopped(_this2.state) && _this2.stopProcess();
                }, 1500);
            }
        }, {
            key: "stopProcess",
            value: function() {
                this.interval && this.$interval.cancel(this.interval), this.onStop && (0 === this.state ? this.onStop() : this.$timeout(this.onStop, 1800));
            }
        } ]), ProcessController;
    }();
    ProcessController.$inject = [ "$scope", "$interval", "$timeout" ], exports["default"] = ProcessController;
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
    var _tabsController = __webpack_require__(51), _tabsController2 = _interopRequireDefault(_tabsController), _tabs = __webpack_require__(67), _tabs2 = _interopRequireDefault(_tabs), Tabs = {
        controller: _tabsController2["default"],
        template: _tabs2["default"],
        bindings: {
            tabs: "<",
            active: "=",
            onChange: "&"
        }
    };
    exports["default"] = Tabs;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
                "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
            Constructor;
        };
    }(), TabsController = function() {
        function TabsController() {
            _classCallCheck(this, TabsController), !this.active && this.tabs.length && (this.active = this.tabs[0].type);
        }
        return _createClass(TabsController, [ {
            key: "switchTab",
            value: function(tab) {
                $ctrl.active = tab, this.onChange && this.onChange(tab);
            }
        } ]), TabsController;
    }();
    exports["default"] = TabsController;
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
    module.exports = '<div class="droppable" ng-class="{\n  \'droppable-sm\': $ctrl.size ===\'sm\',\n  \'droppable-md\': $ctrl.size ===\'md\' || !$ctrl.size,\n  \'droppable-lg\': $ctrl.size ===\'lg\',\n  \'droppable-dropping\': $ctrl.isDroppable,\n  \'droppable-processing\': !$ctrl.isDone && ($ctrl.isProcessing || $ctrl.isSuccess || $ctrl.isError),\n  \'droppable-complete\': $ctrl.isDone\n}">\n  <div class="droppable-default-card" aria-hidden="{{$ctrl.isDone}}">\n    <div class="droppable-card-content">\n      <div class="m-b-2">\n        <span class="icon icon-{{$ctrl.viewIcon}} icon-xxl"></span>\n      </div>\n      <h4 class="m-b-1" ng-if="$ctrl.label || $ctrl.description">\n        {{$ctrl.label || $ctrl.description}}\n      </h4>\n      <p class="m-b-2">{{$ctrl.placeholder || $ctrl.instructions}}</p>\n      <label class="btn btn-primary">{{$ctrl.buttonText}}\n        <input tw-file-input\n          type="file"\n          accept="{{$ctrl.accept}}"\n          class="tw-droppable-input hidden"\n\n          name="file-upload"\n          on-user-input="$ctrl.onManualUpload()"\n          ng-model="$ctrl.inputFile" />\n        <!-- ng-change="$ctrl.onManualUpload()" -->\n      </label>\n    </div>\n  </div>\n  <div class="droppable-processing-card droppable-card"\n    aria-hidden="{{$ctrl.isDone}}">\n    <div class="droppable-card-content">\n      <h4 class="m-b-2">\n        <span ng-if="$ctrl.isProcessing && $ctrl.processingText">{{$ctrl.processingText}}</span>\n        <span ng-if="$ctrl.isSuccess && $ctrl.successText">{{$ctrl.successText}}</span>\n        <span ng-if="$ctrl.isError && $ctrl.failureText">{{$ctrl.failureText}}</span>\n      </h4>\n      <tw-process size="sm" state="$ctrl.processingState"\n        ng-if="($ctrl.isProcessing || $ctrl.isSuccess || $ctrl.isError)"></tw-process>\n    </div>\n  </div>\n  <div class="droppable-complete-card droppable-card"\n    aria-hidden="{{!$ctrl.isDone}}">\n    <div class="droppable-card-content">\n      <div ng-if="!$ctrl.hasTranscluded && !$ctrl.isError">\n        <h4 class="m-b-2" ng-if="$ctrl.label">\n          {{$ctrl.label}}\n        </h4>\n        <img\n          ng-if="$ctrl.isImage"\n          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="\n          ng-src="{{$ctrl.image}}"\n          alt="OK"\n          class="thumbnail m-b-3" />\n        <span class="icon icon-pdf icon-xxl" ng-if="!$ctrl.isImage"></span>\n        <p class="text-ellipsis m-b-2">{{$ctrl.fileName}}</p>\n      </div>\n      <div ng-if="!$ctrl.hasTranscluded && $ctrl.isError">\n        <h4 class="m-b-2" ng-if="$ctrl.isTooLarge">{{$ctrl.tooLargeMessage}}</h4>\n        <h4 class="m-b-2" ng-if="$ctrl.isWrongType">{{$ctrl.wrongTypeText}}</h4>\n        <h4 class="m-b-2" ng-if="!$ctrl.isTooLarge && $ctrl.errorMessage">{{$ctrl.errorMessage}}</h4>\n        <span class="icon icon-alert icon-xxl text-danger m-b-1"></span>\n      </div>\n      <div ng-if="$ctrl.hasTranscluded" ng-transclude></div>\n      <p ng-if="$ctrl.cancelText" class="m-t-2 m-b-0">\n        <a href="" ng-click="$ctrl.clear()">{{$ctrl.cancelText}}</a>\n      </p>\n    </div>\n  </div>\n  <div class="droppable-dropping-card droppable-card">\n    <div class="droppable-card-content">\n      <h4 class="m-b-2">Drop file to start upload</h4>\n      <div class="circle circle-sm">\n        <span class="icon icon-add"></span>\n      </div>\n      <p class="m-t-2 m-b-0"></p>\n    </div>\n  </div>\n</div>\'\n';
}, function(module, exports) {
    module.exports = '<div class="loader">\n  <div class="loader-spinner"></div>\n  <div class="loader-flag">\n    <svg\n      xmlns="http://www.w3.org/2000/svg"\n      class="loader-flag-outline"\n      viewBox="-2 -2 56 56">\n      <polygon\n        class="loader-flag-stroke"\n        stroke="#00B9FF"\n        stroke-width="2"\n        stroke-linejoin="miter"\n        stroke-linecap="round"\n        stroke-miterlimit="10"\n        stroke-dasharray="300"\n        stroke-dashoffset="300"\n        fill="none"\n        points="24.6,27.3 0,27.3 14.3,13.7 6.1,0 48.2,0 26.3,52 19.5,52 39.2,5.5 16.8,5.5 21.6,13.6 13.4,21.8 27,21.8" />\n    </svg>\n    <svg\n      xmlns="http://www.w3.org/2000/svg"\n      class="loader-flag-fill"\n      viewBox="0 2 52 48">\n      <polygon\n        fill="#00B9FF"\n        points="6.1,0 14.3,13.7 0,27.3 24.6,27.3 27,21.8 13.4,21.8 21.6,13.6 16.8,5.5 39.2,5.5 19.5,52 26.3,52 48.2,0 "/>\n    </svg>\n  </div>\n</div>\n';
}, function(module, exports) {
    module.exports = "<span class=\"process\"\n  ng-class=\"{\n    'process-success': $ctrl.processing === 1,\n    'process-danger': $ctrl.processing === -1,\n    'process-stopped': $ctrl.processing === 0,\n    'process-xs': $ctrl.size === 'xs',\n    'process-sm': $ctrl.size === 'sm',\n    'process-md': $ctrl.size === 'md',\n    'process-lg': $ctrl.size === 'lg',\n    'process-xl': $ctrl.size === 'xl'\n  }\">\n  <span class=\"process-icon-container\">\n    <span class=\"process-icon-horizontal\"></span>\n    <span class=\"process-icon-vertical\"></span>\n  </span>\n  <svg version=\"1.1\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    xml:space=\"preserve\">\n    <circle class=\"process-circle\" \n      cx=\"50%\"\n      cy=\"50%\"\n      ng-attr-r=\"{{$ctrl.radius}}\"\n      fill-opacity=\"0.0\" />\n  </svg>\n</span>\n";
}, function(module, exports) {
    module.exports = '<ul ng-if="$ctrl.tabs.length > 0"\n  class="nav nav-tabs m-b-3">\n  <li\n    ng-repeat="tab in $ctrl.tabs track by $index"\n    ng-class="{\n      \'active\': $ctrl.active === tab.type\n    }">\n    <a href="" ng-click="$ctrl.switchTab(tab.type)">\n      {{tab.label}}\n    </a>\n  </li>\n</ul>\n';
} ]);