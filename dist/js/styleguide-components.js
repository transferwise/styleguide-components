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
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 62);
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
    var _twSelectComponent = __webpack_require__(50), _twSelectComponent2 = _interopRequireDefault(_twSelectComponent);
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
    var _twCurrencyService = __webpack_require__(76), _twCurrencyService2 = _interopRequireDefault(_twCurrencyService);
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
    var _twDateService = __webpack_require__(77), _twDateService2 = _interopRequireDefault(_twDateService);
    exports["default"] = angular.module("tw.styleguide.services.date", []).service("TwDateService", _twDateService2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwTextFormatService() {
        function positionIsSeparator(pattern, position) {
            return pattern[position] && "*" !== pattern[position];
        }
        this.formatUsingPattern = function(value, pattern) {
            if (value || (value = ""), "string" != typeof pattern) return value;
            for (var newValue = "", separators = 0, charactersToAllocate = value.length, position = 0; charactersToAllocate; ) positionIsSeparator(pattern, position) ? (newValue += pattern[position], 
            separators++) : (newValue += value[position - separators], charactersToAllocate--), 
            position++;
            var separatorsAfterCursor = this.countSeparatorsAfterCursor(pattern, position);
            return separatorsAfterCursor && (newValue += pattern.substr(position, separatorsAfterCursor)), 
            newValue;
        }, this.unformatUsingPattern = function(value, pattern) {
            if (!value) return "";
            if ("string" != typeof pattern) return value;
            for (var i = 0; i < pattern.length; i++) if (positionIsSeparator(pattern, i)) for (;value.indexOf(pattern[i]) >= 0; ) value = value.replace(pattern[i], "");
            return value;
        }, this.reformatUsingPattern = function(value, newPattern, oldPattern) {
            return "undefined" == typeof oldPattern && (oldPattern = newPattern), this.formatUsingPattern(this.unformatUsingPattern(value, oldPattern), newPattern);
        }, this.countSeparatorsBeforeCursor = function(pattern, position) {
            for (var separators = 0; positionIsSeparator(pattern, position - separators - 1); ) separators++;
            return separators;
        }, this.countSeparatorsAfterCursor = function(pattern, position) {
            for (var separators = 0; positionIsSeparator(pattern, position + separators); ) separators++;
            return separators;
        }, this.countSeparatorsInAppendedValue = function(pattern, position, value) {
            for (var separators = 0, i = 0, toAllocate = value.length; toAllocate; ) positionIsSeparator(pattern, position + i) ? separators++ : toAllocate--, 
            i++;
            return separators;
        }, this.countSeparatorsInPattern = function(pattern) {
            for (var separators = 0, i = 0; i < pattern.length; i++) positionIsSeparator(pattern, i) && separators++;
            return separators;
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwTextFormatService;
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
    var _twCheckboxComponent = __webpack_require__(28), _twCheckboxComponent2 = _interopRequireDefault(_twCheckboxComponent);
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
    var _twDateComponent = __webpack_require__(36), _twDateComponent2 = _interopRequireDefault(_twDateComponent);
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
    var _select = __webpack_require__(1), _radio = (_interopRequireDefault(_select), 
    __webpack_require__(9)), _checkbox = (_interopRequireDefault(_radio), __webpack_require__(5)), _date = (_interopRequireDefault(_checkbox), 
    __webpack_require__(6)), _upload = (_interopRequireDefault(_date), __webpack_require__(10)), _twDynamicFormControlComponent = (_interopRequireDefault(_upload), 
    __webpack_require__(38)), _twDynamicFormControlComponent2 = _interopRequireDefault(_twDynamicFormControlComponent);
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
    var _dynamicFormControl = __webpack_require__(7), _twFieldsetComponent = (_interopRequireDefault(_dynamicFormControl), 
    __webpack_require__(40)), _twFieldsetComponent2 = _interopRequireDefault(_twFieldsetComponent);
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
    var _twRadioComponent = __webpack_require__(44), _twRadioComponent2 = _interopRequireDefault(_twRadioComponent);
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
    var _twUploadComponent = __webpack_require__(56), _twUploadComponent2 = _interopRequireDefault(_twUploadComponent), _twFileInputDirective = __webpack_require__(55), _twFileInputDirective2 = _interopRequireDefault(_twFileInputDirective);
    exports["default"] = angular.module("tw.styleguide.forms.upload", []).directive("twFileInput", _twFileInputDirective2["default"]).component("twUpload", _twUploadComponent2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwCardsService() {
        var expandedIndex = -1, cards = [];
        this.toggle = function(index) {
            expandedIndex !== -1 && expandedIndex !== index && (cards[expandedIndex].open = !1, 
            expandedIndex = -1), cards[index].open ? cards[index].open = !1 : (expandedIndex = index, 
            cards[index].open = !0);
        }, this.addCard = function(scope) {
            cards.push(scope);
        }, this.getExpandedIndex = function() {
            return expandedIndex;
        }, this.updateExpandedIndex = function(newExpandedIndex) {
            expandedIndex = newExpandedIndex;
        }, this.getCard = function(index) {
            return cards[index];
        }, this.getLength = function() {
            return cards.length;
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwCardsService;
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
    var _twTabsComponent = __webpack_require__(74), _twTabsComponent2 = _interopRequireDefault(_twTabsComponent);
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
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _twTextFormatDirective = __webpack_require__(22), _twTextFormatDirective2 = _interopRequireDefault(_twTextFormatDirective), _twTextFormatFilter = __webpack_require__(23), _twTextFormatFilter2 = _interopRequireDefault(_twTextFormatFilter);
    exports["default"] = _angular2["default"].module("tw.styleguide.formatting", [ _twTextFormatDirective2["default"], _twTextFormatFilter2["default"] ]).name;
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
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _checkbox = __webpack_require__(5), _checkbox2 = _interopRequireDefault(_checkbox), _radio = __webpack_require__(9), _radio2 = _interopRequireDefault(_radio), _select = __webpack_require__(1), _select2 = _interopRequireDefault(_select), _upload = __webpack_require__(10), _upload2 = _interopRequireDefault(_upload), _date = __webpack_require__(6), _date2 = _interopRequireDefault(_date), _dateLookup = __webpack_require__(33), _dateLookup2 = _interopRequireDefault(_dateLookup), _currencyInput = __webpack_require__(30), _currencyInput2 = _interopRequireDefault(_currencyInput), _amountCurrencySelect = __webpack_require__(25), _amountCurrencySelect2 = _interopRequireDefault(_amountCurrencySelect), _dynamicFormControl = __webpack_require__(7), _dynamicFormControl2 = _interopRequireDefault(_dynamicFormControl), _fieldset = __webpack_require__(8), _fieldset2 = _interopRequireDefault(_fieldset), _requirementsForm = __webpack_require__(46), _requirementsForm2 = _interopRequireDefault(_requirementsForm), _focusable = __webpack_require__(42), _focusable2 = _interopRequireDefault(_focusable), _uploadDroppable = __webpack_require__(52), _uploadDroppable2 = _interopRequireDefault(_uploadDroppable);
    exports["default"] = _angular2["default"].module("tw.styleguide.forms", [ _checkbox2["default"], _radio2["default"], _select2["default"], _upload2["default"], _date2["default"], _dateLookup2["default"], _currencyInput2["default"], _amountCurrencySelect2["default"], _dynamicFormControl2["default"], _fieldset2["default"], _requirementsForm2["default"], _focusable2["default"], _uploadDroppable2["default"] ]).name;
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
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _popOver = __webpack_require__(58), _popOver2 = _interopRequireDefault(_popOver), _toolTip = __webpack_require__(60), _toolTip2 = _interopRequireDefault(_toolTip);
    exports["default"] = _angular2["default"].module("tw.styleguide.help", [ _popOver2["default"], _toolTip2["default"] ]).name;
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
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _affix = __webpack_require__(63), _affix2 = _interopRequireDefault(_affix), _cards = __webpack_require__(65), _cards2 = _interopRequireDefault(_cards);
    exports["default"] = _angular2["default"].module("tw.styleguide.layout", [ _affix2["default"], _cards2["default"] ]).name;
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
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _loader = __webpack_require__(69), _loader2 = _interopRequireDefault(_loader), _process = __webpack_require__(71), _process2 = _interopRequireDefault(_process);
    exports["default"] = _angular2["default"].module("tw.styleguide.loading", [ _loader2["default"], _process2["default"] ]).name;
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
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _tabs = __webpack_require__(12), _tabs2 = _interopRequireDefault(_tabs);
    exports["default"] = _angular2["default"].module("tw.styleguide.navigation", [ _tabs2["default"] ]).name;
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
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _date = __webpack_require__(3), _date2 = _interopRequireDefault(_date), _currency = __webpack_require__(2), _currency2 = _interopRequireDefault(_currency);
    exports["default"] = _angular2["default"].module("tw.styleguide.services", [ _date2["default"], _currency2["default"] ]).name;
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
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _formValidation = __webpack_require__(82), _formValidation2 = _interopRequireDefault(_formValidation), _controlValidation = __webpack_require__(80), _controlValidation2 = _interopRequireDefault(_controlValidation), _asyncValidation = __webpack_require__(78), _asyncValidation2 = _interopRequireDefault(_asyncValidation);
    exports["default"] = _angular2["default"].module("tw.styleguide.validation", [ _formValidation2["default"], _controlValidation2["default"], _asyncValidation2["default"] ]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwTextFormatController($element, $timeout, $scope, TwTextFormatService, TwUndoStackFactory) {
        function init() {
            undoStack = TwUndoStackFactory["new"](), keydownCount = 0, ngModelController = $element.controller("ngModel"), 
            element = $element[0], $scope.$watch("$ctrl.twTextFormat", onPatternChange), $scope.$watch("$ctrl.ngModel", onModelChange), 
            onPatternChange($ctrl.twTextFormat), ngModelController.$formatters.push(function(value) {
                return TwTextFormatService.formatUsingPattern(value, pattern);
            }), ngModelController.$parsers.push(function(value) {
                return TwTextFormatService.unformatUsingPattern(value, pattern);
            }), element.addEventListener("change", onChange), element.addEventListener("keydown", onKeydown), 
            element.addEventListener("paste", onPaste), element.addEventListener("cut", onCut), 
            element.addEventListener("copy", onCopy), replaceLengthValidators(ngModelController), 
            undoStack.reset(element.value);
        }
        function onModelChange(newModel, oldModel) {
            if (newModel !== oldModel) {
                var selectionStart = element.selectionStart, selectionEnd = element.selectionEnd;
                reformatControl(element, newModel), element.setSelectionRange(selectionStart, selectionEnd);
            }
        }
        function onPatternChange(newPattern, oldPattern) {
            if (newPattern === oldPattern) return void (pattern = newPattern);
            pattern = newPattern && newPattern.indexOf("||") > 0 ? newPattern.substring(0, newPattern.indexOf("||")) : newPattern;
            var viewValue = element.value;
            oldPattern && (viewValue = TwTextFormatService.unformatUsingPattern(viewValue, oldPattern)), 
            newPattern && (viewValue = TwTextFormatService.formatUsingPattern(viewValue, pattern)), 
            undoStack.reset(viewValue), element.value = viewValue;
        }
        function replaceLengthValidators(ngModelController) {
            $timeout(function() {
                var originalMinLength = ngModelController.$validators.minlength, originalMaxLength = ngModelController.$validators.maxlength;
                originalMinLength && (ngModelController.$validators.minlength = function(modelValue, viewValue) {
                    return originalMinLength(modelValue, TwTextFormatService.unformatUsingPattern(viewValue, pattern));
                }), originalMaxLength && (ngModelController.$validators.maxlength = function(modelValue, viewValue) {
                    return originalMaxLength(modelValue, TwTextFormatService.unformatUsingPattern(viewValue, pattern));
                });
            });
        }
        function reformatControl(element, originalValue) {
            originalValue || (originalValue = element.value);
            var newValue = TwTextFormatService.reformatUsingPattern(originalValue, pattern);
            newValue !== originalValue && (element.value = newValue);
        }
        function onChange() {
            reformatControl(element), undoStack.add(element.value);
        }
        function onPaste(event) {
            var selectionStart = element.selectionStart, clipboardData = (element.value.length, 
            event.clipboardData || window.clipboardData), pastedData = clipboardData.getData("Text"), separatorsInPaste = TwTextFormatService.countSeparatorsInAppendedValue(pattern, selectionStart, pastedData);
            $timeout(function() {
                var newPosition = selectionStart + pastedData.length + separatorsInPaste;
                reformatControl(element), undoStack.add(element.value), element.setSelectionRange(newPosition, newPosition);
            });
        }
        function onKeydown(event) {
            keydownCount++;
            var currentKeydownCount = keydownCount, key = event.keyCode || event.which, selectionStart = event.target.selectionStart, selectionEnd = event.target.selectionEnd;
            return reservedKeys.indexOf(key) >= 0 || event.metaKey || event.ctrlKey ? (key === keys.z && (event.metaKey || event.ctrlKey) && (event.preventDefault(), 
            event.stopPropagation(), element.value = undoStack.undo()), void (key === keys.y && (event.metaKey || event.ctrlKey) && (event.preventDefault(), 
            event.stopPropagation(), element.value = undoStack.redo()))) : void $timeout(function() {
                afterKeydown(key, currentKeydownCount, element, pattern, selectionStart, selectionEnd);
            });
        }
        function afterKeydown(key, currentKeydownCount, element, pattern, selectionStart, selectionEnd) {
            var newVal;
            key === keys.backspace ? (newVal = doBackspace(element, pattern, selectionStart, selectionEnd), 
            ngModelController.$setViewValue(newVal)) : key === keys["delete"] ? (newVal = doDelete(element, pattern, selectionStart, selectionEnd), 
            ngModelController.$setViewValue(newVal)) : keydownCount === currentKeydownCount && doKeypress(element, pattern, selectionStart, selectionEnd);
        }
        function doBackspace(element, pattern, selectionStart, selectionEnd) {
            element.value = getFormattedValueAfterBackspace(element, pattern, selectionStart, selectionEnd), 
            undoStack.add(element.value);
            var newPosition = getPositionAfterBackspace(pattern, element, selectionStart, selectionEnd);
            return element.setSelectionRange(newPosition, newPosition), element.value;
        }
        function getFormattedValueAfterBackspace(element, pattern, selectionStart, selectionEnd) {
            var removeStart, removeEnd, newVal = element.value, separatorsBeforeCursor = TwTextFormatService.countSeparatorsBeforeCursor(pattern, selectionStart);
            if (separatorsBeforeCursor) {
                var adjust = separatorsBeforeCursor > 1 ? 1 : 0;
                selectionStart !== selectionEnd ? (removeStart = selectionStart - separatorsBeforeCursor + 1, 
                removeEnd = selectionStart - adjust) : (removeStart = selectionStart - separatorsBeforeCursor, 
                removeEnd = selectionStart - adjust), newVal = removeCharacters(element.value, removeStart, removeEnd);
            }
            return TwTextFormatService.reformatUsingPattern(newVal, pattern);
        }
        function doDelete(element, pattern, selectionStart, selectionEnd) {
            return element.value = getFormattedValueAfterDelete(element, pattern, selectionStart, selectionEnd), 
            undoStack.add(element.value), element.setSelectionRange(selectionStart, selectionStart), 
            element.value;
        }
        function getFormattedValueAfterDelete(element, pattern, selectionStart, selectionEnd) {
            var removeStart, removeEnd, newVal = element.value, separatorsAfterCursor = TwTextFormatService.countSeparatorsAfterCursor(pattern, selectionStart);
            if (separatorsAfterCursor) {
                var adjust = separatorsAfterCursor > 1 ? 0 : 1;
                selectionStart !== selectionEnd ? (removeStart = selectionStart + adjust, removeEnd = selectionStart + separatorsAfterCursor + adjust) : (removeStart = selectionStart + separatorsAfterCursor, 
                removeEnd = selectionStart + separatorsAfterCursor + 1), newVal = removeCharacters(element.value, removeStart, removeEnd);
            }
            return TwTextFormatService.reformatUsingPattern(newVal, pattern);
        }
        function doKeypress(element, pattern, selectionStart, selectionEnd) {
            reformatControl(element), undoStack.add(element.value);
            var newPosition = getPositionAfterKeypress(pattern, element, selectionStart, selectionEnd);
            element.setSelectionRange(newPosition, newPosition);
        }
        function getPositionAfterBackspace(pattern, element, selectionStart, selectionEnd) {
            var separatorsBefore = TwTextFormatService.countSeparatorsBeforeCursor(pattern, selectionStart), isRange = selectionStart !== selectionEnd, proposedPosition = selectionStart - separatorsBefore - (isRange ? 0 : 1);
            return proposedPosition + TwTextFormatService.countSeparatorsAfterCursor(pattern, proposedPosition);
        }
        function getPositionAfterKeypress(pattern, element, selectionStart, selectionEnd) {
            var separatorsAfter;
            return selectionStart !== selectionEnd ? separatorsAfter = TwTextFormatService.countSeparatorsAfterCursor(pattern, selectionStart) : (separatorsAfter = TwTextFormatService.countSeparatorsAfterCursor(pattern, selectionStart), 
            0 === separatorsAfter && (separatorsAfter = TwTextFormatService.countSeparatorsAfterCursor(pattern, selectionStart + 1))), 
            selectionStart + 1 + separatorsAfter;
        }
        function removeCharacters(value, first, last) {
            return value.substring(0, first - 1) + value.substring(last - 1, value.length);
        }
        function onCut(event) {
            var selectionStart = element.selectionStart;
            $timeout(function() {
                reformatControl(element), undoStack.add(element.value);
                var newPosition = selectionStart + TwTextFormatService.countSeparatorsAfterCursor(pattern, selectionStart);
                element.setSelectionRange(newPosition, newPosition);
            });
        }
        function onCopy(event) {
            var selectionStart = element.selectionStart, selectionEnd = element.selectionEnd;
            $timeout(function() {
                element.setSelectionRange(selectionStart, selectionEnd);
            });
        }
        var ngModelController, element, undoStack, keydownCount, pattern = "", $ctrl = this, keys = {
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
            "delete": 46,
            y: 89,
            z: 90
        }, reservedKeys = [ keys.cmd, keys.cmdLeft, keys.cmdRight, keys.enter, keys.shift, keys.ctrl, keys.alt, keys.left, keys.up, keys.right, keys.down ];
        init();
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), TwTextFormatController.$inject = [ "$element", "$timeout", "$scope", "TwTextFormatService", "TwUndoStackFactory" ], 
    exports["default"] = TwTextFormatController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function TwTextFormat() {
        return {
            restrict: "A",
            require: "ngModel",
            bindToController: !0,
            controllerAs: "$ctrl",
            scope: {
                ngModel: "<",
                twTextFormat: "@"
            },
            controller: _twTextFormatController2["default"]
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _twTextFormatController = __webpack_require__(21), _twTextFormatController2 = _interopRequireDefault(_twTextFormatController), _undoStackService = __webpack_require__(24), _undoStackService2 = _interopRequireDefault(_undoStackService), _twTextFormatService = __webpack_require__(4), _twTextFormatService2 = _interopRequireDefault(_twTextFormatService);
    exports["default"] = angular.module("tw.styleguide.formatting.text-format", []).service("TwUndoStackFactory", _undoStackService2["default"]).service("TwTextFormatService", _twTextFormatService2["default"]).directive("twTextFormat", TwTextFormat).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function TwTextFormatFilter(TwTextFormatService) {
        return function(input, pattern) {
            return input = input || "", pattern ? TwTextFormatService.formatUsingPattern(input, pattern) : input;
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _twTextFormatService = __webpack_require__(4);
    _interopRequireDefault(_twTextFormatService);
    TwTextFormatFilter.$inject = [ "TwTextFormatService" ], exports["default"] = angular.module("tw.styleguide.formatting.text-format").filter("twTextFormat", TwTextFormatFilter).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwUndoStackFactory() {
        this["new"] = function() {
            return new UndoStack();
        };
    }
    function UndoStack() {
        var pointer = 0, stack = [];
        this.reset = function(value) {
            stack = [ value ], pointer = 0;
        }, this.add = function(value) {
            stack.length - 1 > pointer && (stack = stack.slice(0, pointer + 1)), stack[pointer] !== value && (stack.push(value), 
            pointer++);
        }, this.undo = function() {
            return pointer >= 0 && "undefined" != typeof stack[pointer - 1] && pointer--, stack[pointer];
        }, this.redo = function() {
            return pointer < stack.length && "undefined" != typeof stack[pointer + 1] && pointer++, 
            stack[pointer];
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwUndoStackFactory;
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
    var _select = __webpack_require__(1), _twAmountCurrencySelectComponent = (_interopRequireDefault(_select), 
    __webpack_require__(26)), _twAmountCurrencySelectComponent2 = _interopRequireDefault(_twAmountCurrencySelectComponent);
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
    var _twAmountCurrencySelectController = __webpack_require__(27), _twAmountCurrencySelectController2 = _interopRequireDefault(_twAmountCurrencySelectController), TwAmountCurrencySelect = {
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
        template: '    <div class="input-group" ng-class="{       \'input-group-sm\': $ctrl.size === \'sm\',       \'input-group-lg\': $ctrl.size === \'lg\',       disabled: $ctrl.ngDisabled     }">        <input         type="tel"          autocomplete="off"          name="amount"          step="any"          class="form-control"          placeholder="{{ $ctrl.placeholder }}"         tw-focusable          show-decimals="$ctrl.showDecimals"         tw-number-input-formatter          ng-change="$ctrl.changedAmount()"          ng-model="$ctrl.ngModel"         ng-disabled="$ctrl.ngDisabled" />       <span class="input-group-addon"         ng-class="{\'input-lg\': $ctrl.size === \'lg\'}" ng-transclude="addon"></span>       <span class="input-group-btn">          <tw-select           ng-model="$ctrl.currency"           ng-required="true"           size="{{ $ctrl.size }}"           inverse="true"           dropdown-right="xs"           dropdown-width="lg"           hide-currency="xs"           hide-note="true"           hide-secondary="true"           options="$ctrl.currencies"           filter="{{ $ctrl.currencyFilterPlaceholder }}"           ng-change="$ctrl.changedCurrency()">             <a href="" ng-if="!!$ctrl.customActionLabel" ng-click="$ctrl.onCustomAction()">               {{ $ctrl.customActionLabel }}             </a>         </tw-select>       </span>     </div>'
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
    var _currency = __webpack_require__(2);
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
    var _twCheckboxController = __webpack_require__(29), _twCheckboxController2 = _interopRequireDefault(_twCheckboxController), TwCheckbox = {
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
        template: "     <input type='hidden' class='sr-only'       name='{{$ctrl.name}}'       ng-model='$ctrl.ngModel'       ng-click='$ctrl.hiddenClick($event)'       ng-disabled='$ctrl.ngDisabled'/>     <button type='button' class='tw-checkbox-button' tw-focusable       ng-click='$ctrl.buttonClick($event)'       ng-focus='$ctrl.buttonFocus()'       ng-blur='$ctrl.buttonBlur()'       ng-disabled='$ctrl.ngDisabled'       ng-class='{\"checked\": $ctrl.checked}'       aria-pressed='{{$ctrl.checked}}'>       <span class='tw-checkbox-check glyphicon glyphicon-ok'></span>     </button>"
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
    var _twCurrencyInputComponent = __webpack_require__(31), _twCurrencyInputComponent2 = _interopRequireDefault(_twCurrencyInputComponent);
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
    var _twCurrencyInputController = __webpack_require__(32), _twCurrencyInputController2 = _interopRequireDefault(_twCurrencyInputController), TwCurrencyInput = {
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
        template: '     <div class="input-group" ng-class="{       \'input-group-sm\': $ctrl.size === \'sm\',       \'input-group-lg\': $ctrl.size === \'lg\',       disabled: $ctrl.ngDisabled     }">       <input         type="tel"         autocomplete="off"         name="amount"         step="any"         class="form-control p-r-0"         placeholder="{{$ctrl.placeholder}}"         show-decimals="$ctrl.showDecimals"         tw-focusable         tw-number-input-formatter         ng-change="$ctrl.changedInputValue()"         ng-model="$ctrl.ngModel"         ng-disabled="$ctrl.ngDisabled" />       <span class="hello-world input-group-addon tw-currency-input-code p-l-1">         <span ng-transclude="addon"></span>         {{ $ctrl.currency || $ctrl.currencyCode }}       </span>     </div>'
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
    var _currency = __webpack_require__(2);
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
    var _twDateLookupComponent = __webpack_require__(34), _twDateLookupComponent2 = _interopRequireDefault(_twDateLookupComponent);
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
    var _twDateLookupController = __webpack_require__(35), _twDateLookupController2 = _interopRequireDefault(_twDateLookupController), TwDateLookup = {
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
        template: '   <div class="btn-group btn-block dropdown"     ng-keydown="$ctrl.keyHandler($event)">     <button class="btn btn-input dropdown-toggle tw-date-lookup-button" data-toggle="dropdown"       ng-disabled="$ctrl.ngDisabled"       ng-click="$ctrl.openLookup()"       ng-focus="$ctrl.buttonFocus()"       ng-class="{         \'btn-sm\': $ctrl.size === \'sm\',         \'btn-lg\': $ctrl.size === \'lg\'       }">       <span ng-if="!$ctrl.ngModel"         class="form-control-placeholder tw-date-lookup-placeholder">         {{$ctrl.placeholder}}       </span>       <span ng-if="$ctrl.label && $ctrl.ngModel"         class="control-label small m-r-1" style="font-size: 14px;"         >{{$ctrl.label}}</span       ><span ng-if="$ctrl.ngModel" class="tw-date-lookup-selected">        {{$ctrl.selectedDateFormatted}}      </span>       <span class="caret"></span>     </button>     <div class="dropdown-menu" style="min-width: 300px;">             <div ng-if="$ctrl.mode === \'year\'" class="tw-date-lookup-years">         <div class="text-xs-center p-t-1 p-b-2">           <div class="pull-xs-left p-b-2">             <a href="" ng-click="$ctrl.setYearOffset($event, -20)"               class="text-no-decoration tw-date-lookup-previous-years">               <i class="icon icon-left icon-lg"></i>             </a>           </div>           <div class="pull-xs-right p-b-2">             <a href="" ng-click="$ctrl.setYearOffset($event, 20)"               class="text-no-decoration tw-date-lookup-next-years">               <i class="icon icon-right icon-lg"></i>             </a>           </div>         </div>         <table class="table table-condensed table-bordered table-calendar m-b-0">           <tbody>             <tr ng-repeat="row in [0,4,8,12,16]">               <td ng-repeat="col in [0,1,2,3]">                 <a href=""                   ng-click="$ctrl.selectYear($event, $ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)"                   ng-disabled="$ctrl.isYearDisabled($ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)"                   ng-class="{\'active\': $ctrl.selectedYear === ($ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset)}"                   class="tw-date-lookup-year-option">                   {{$ctrl.year - ($ctrl.year % 20) + row + col + $ctrl.yearOffset}}                 </a>               </td>             </tr>           </tbody>         </table>       </div>             <div ng-if="$ctrl.mode === \'month\'" class="tw-date-lookup-months">         <div class="text-xs-center p-t-1 p-b-2">           <div class="pull-xs-left">             <a href="" ng-click="$ctrl.yearBefore($event)" class="text-no-decoration">               <i class="icon icon-left icon-lg"></i>             </a>           </div>           <a href="" ng-click="$ctrl.switchToYears($event)"             class="tw-date-lookup-year-label">             {{$ctrl.year}}           </a>           <div class="pull-xs-right">             <a href="" ng-click="$ctrl.yearAfter($event)" class="text-no-decoration">               <i class="icon icon-right icon-lg"></i>             </a>           </div>         </div>         <table class="table table-condensed table-bordered table-calendar m-b-0">           <tbody>             <tr ng-repeat="row in [0,4,8]">               <td ng-repeat="col in [0,1,2,3]">                 <a href=""                   ng-click="$ctrl.selectMonth($event, row+col, $ctrl.year)"                   ng-disabled="$ctrl.isMonthDisabled(row + col, $ctrl.year)"                   ng-class="{\'active\': $ctrl.selectedMonth === (row + col) && $ctrl.selectedYear === $ctrl.year}"                   class="tw-date-lookup-month-option">                   {{$ctrl.shortMonthsOfYear[row+col] | limitTo:5}}                 </a>               </td>             </tr>           </tbody>         </table>       </div>             <div ng-if="$ctrl.mode === \'day\'" class="tw-date-lookup-days">         <div class="text-xs-center p-t-1 p-b-2">           <div class="pull-xs-left">             <a href="" ng-click="$ctrl.monthBefore($event)"               class="text-no-decoration tw-date-lookup-previous-month">               <i class="icon icon-left icon-lg"></i>             </a>           </div>           <a href="" ng-click="$ctrl.switchToYears($event)"             class="tw-date-lookup-month-label">             {{$ctrl.yearMonthFormatted}}           </a>           <div class="pull-xs-right">             <a href="" ng-click="$ctrl.monthAfter($event)"               class="text-no-decoration tw-date-lookup-next-month">               <i class="icon icon-right icon-lg"></i>             </a>           </div>         </div>         <table class="table table-condensed table-bordered table-calendar m-b-0">           <thead>             <tr>               <th ng-repeat="day in $ctrl.daysOfWeek track by $index">                 <span class="hidden-xs">{{day | limitTo : 3}}</span>                 <span class="visible-xs-inline-block">{{$ctrl.shortDaysOfWeek[$index] | limitTo : 2}}</span>               </th>             </tr>           </thead>           <tbody>             <tr ng-repeat="week in $ctrl.weeks">               <td ng-repeat="day in week track by $index"                 ng-class="{                   \'default\': $index > 4                 }">                 <a href="" title="{{day}} {{$ctrl.monthsOfYear[$ctrl.month]}} {{$ctrl.year}}"                   ng-if="day"                   ng-click="$ctrl.selectDay($event, day, $ctrl.month, $ctrl.year)"                   ng-disabled="$ctrl.isDayDisabled(day, $ctrl.month, $ctrl.year)"                   ng-class="{                     \'active\': $ctrl.isCurrentlySelected(day, $ctrl.month, $ctrl.year)                   }"                   class="tw-date-lookup-day-option" tabindex="0">                   {{day}}                 </a>               </td>             </tr>           </tbody>         </table>       </div>     </div>   </div>'
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
    var _date = __webpack_require__(3);
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
    var _twDateController = __webpack_require__(37), _twDateController2 = _interopRequireDefault(_twDateController), daySectionTemplate = "   <label class='sr-only'>Day</label>   <input type='number'     name='day'     class='form-control tw-date-day'     ng-model='$ctrl.day'     ng-change='$ctrl.updateDateModelAndValidationClasses()'     placeholder='DD'     min='1'     ng-min='1'     ng-disabled='$ctrl.dateDisabled'     ng-required='$ctrl.dateRequired'     tw-focusable />", monthSectionTemplate = "    <label class='sr-only'>Month</label>  <tw-select     name='month'     class='tw-date-month'     ng-model='$ctrl.month'     ng-change='$ctrl.updateDateModelAndValidationClasses()'     ng-required='$ctrl.dateRequired'     ng-disabled='$ctrl.dateDisabled'     options='$ctrl.dateMonths'>   </tw-select>", yearSectionTemplate = "   <label class='sr-only'>Year</label>   <input type='number'     name='year'     class='form-control tw-date-year'     placeholder='YYYY'     ng-model='$ctrl.year'     ng-change='$ctrl.updateDateModelAndValidationClasses()'     ng-min='$ctrl.min.getFullYear()'     ng-max='$ctrl.max.getFullYear()'     maxlength='4'     ng-maxlength='4'     ng-disabled='$ctrl.dateDisabled'     ng-required='$ctrl.dateRequired'     tw-focusable />", templateAsString = "   <div class='row'>     <div class='col-sm-5 tw-date-month-column' ng-if='$ctrl.monthBeforeDay'>" + monthSectionTemplate + "     </div>     <div class='col-sm-3 tw-date-day-column'>" + daySectionTemplate + "     </div>     <div class='col-sm-5 tw-date-month-column' ng-if='!$ctrl.monthBeforeDay'>" + monthSectionTemplate + "     </div>     <div class='col-sm-4 tw-date-year-column'>" + yearSectionTemplate + "     </div>   </div>", TwDate = {
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
        template: templateAsString
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
    var _date = __webpack_require__(3);
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
    var _twDynamicFormControlController = __webpack_require__(39), _twDynamicFormControlController2 = _interopRequireDefault(_twDynamicFormControlController), TwDynamicFormControl = {
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
        template: "<div ng-switch='$ctrl.type'>     <input ng-switch-when='text'        name='{{$ctrl.name}}'        type='text'       class='form-control'       placeholder='{{$ctrl.placeholder}}'       ng-model='$ctrl.ngModel'       ng-model-options='{ allowInvalid: true }'       ng-required='$ctrl.ngRequired'       ng-disabled='$ctrl.ngDisabled'       ng-pattern='$ctrl.ngPattern'       ng-change='$ctrl.change()'       ng-focus='$ctrl.focus()'       ng-blur='$ctrl.blur()'       ng-minlength='$ctrl.ngMinlength'       ng-maxlength='$ctrl.ngMaxlength'       tw-text-format='{{$ctrl.textFormat}}' />      <input ng-switch-when='password'        name='{{$ctrl.name}}'        type='password'       class='form-control'       placeholder='{{$ctrl.placeholder}}'       ng-model='$ctrl.ngModel'       ng-model-options='{ allowInvalid: true }'       ng-required='$ctrl.ngRequired'       ng-disabled='$ctrl.ngDisabled'       ng-change='$ctrl.change()'       ng-focus='$ctrl.focus()'       ng-blur='$ctrl.blur()'       ng-minlength='$ctrl.ngMinlength'       ng-maxlength='$ctrl.ngMaxlength' />      <input ng-switch-when='number'        name='{{$ctrl.name}}'        type='number'       step='{{$ctrl.step}}'       class='form-control'       placeholder='{{$ctrl.placeholder}}'       ng-model='$ctrl.ngModel'       ng-model-options='{ allowInvalid: true }'       ng-required='$ctrl.ngRequired'       ng-disabled='$ctrl.ngDisabled'       ng-change='$ctrl.change()'       ng-focus='$ctrl.focus()'       ng-blur='$ctrl.blur()'       ng-min='$ctrl.ngMin'       ng-max='$ctrl.ngMax' />      <div ng-switch-when='radio'       class='radio'       ng-class='{disabled: $ctrl.ngDisabled}'       ng-repeat='option in $ctrl.options'>       <label>         <tw-radio           name='{{$ctrl.name}}'           ng-value='option.value'           ng-model='$ctrl.ngModel'           ng-required='$ctrl.ngRequired'           ng-disabled='$ctrl.ngDisabled'           ng-change='$ctrl.change()'           ng-click='$ctrl.change()'           ng-focus='$ctrl.focus()'           ng-blur='$ctrl.blur()' />         {{option.label}}       </label>     </div>     <div ng-switch-when='checkbox'       class='checkbox'       ng-class='{disabled: $ctrl.ngDisabled}'>       <label>         <tw-checkbox           name='{{$ctrl.name}}'           ng-model='$ctrl.ngModel'           ng-required='$ctrl.ngRequired'           ng-disabled='$ctrl.ngDisabled'           ng-change='$ctrl.change()'           ng-click='$ctrl.change()'           ng-focus='$ctrl.focus()'           ng-blur='$ctrl.blur()' />         {{$ctrl.placeholder}}       </label>     </div>     <div ng-switch-when='select'>       <tw-select         name='{{$ctrl.name}}'         options='$ctrl.options'         placeholder='{{$ctrl.placeholder}}'         ng-model='$ctrl.ngModel'         ng-required='$ctrl.ngRequired'         ng-disabled='$ctrl.ngDisabled'         ng-change='$ctrl.change()'         ng-focus='$ctrl.focus()'         ng-blur='$ctrl.blur()' />     </div>     <div ng-switch-when='upload'>       <tw-upload         name='{{$ctrl.name}}'         label='{{$ctrl.label}}'         icon='{{$ctrl.uploadIcon}}'         placeholder='{{$ctrl.placeholder}}'         accept='{{$ctrl.uploadAccept}}'         complete-text='{{$ctrl.label}}'         button-text='{{$ctrl.uploadOptions.buttonText}}'         cancel-text='{{$ctrl.uploadOptions.cancelText}}'         too-large-message='{{$ctrl.uploadTooLargeMessage}}'         max-size='$ctrl.ngMax'         ng-model='$ctrl.ngModel'         ng-required='$ctrl.ngRequired'         ng-disabled='$ctrl.ngDisabled'         ng-change='$ctrl.change()'         ng-focus='$ctrl.focus()'         ng-blur='$ctrl.blur()' />     </div>     <div ng-switch-when='date'>       <tw-date         name='{{$ctrl.name}}'         locale='{{$ctrl.locale}}'         ng-min='$ctrl.ngMin'         ng-max='$ctrl.ngMax'         ng-model='$ctrl.ngModel'         ng-required='$ctrl.ngRequired'         ng-disabled='$ctrl.ngDisabled'         ng-change='$ctrl.change()'         ng-focus='$ctrl.focus()'         ng-blur='$ctrl.blur()' />     </div>     <ng-transclude class='error-messages'></ng-transclude>   </div>"
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
    var _twFieldsetController = __webpack_require__(41), _twFieldsetController2 = _interopRequireDefault(_twFieldsetController), TwFieldset = {
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
        template: "     <fieldset ng-form='twFieldset'>       <legend ng-if='$ctrl.legend'>{{$ctrl.legend}}</legend>       <div class='row row-equal-height'>         <div ng-repeat='fieldGroup in $ctrl.fields' class='col-xs-12'           ng-class='{             \"col-sm-4\": fieldGroup.width === \"sm\",             \"col-sm-6\": fieldGroup.width === \"md\" || fieldGroup.maxlength && fieldGroup.maxlength <= 10,             \"col-sm-12\": fieldGroup.width === \"lg\" || !fieldGroup.maxlength || fieldGroup.maxlength > 10           }'>           <div class='form-group tw-form-group-{{fieldGroup.key}}' style='width: 100%;'             ng-class='{               \"has-error\": $ctrl.errorMessages[fieldGroup.key]             }'>             <label class='control-label'               ng-if='fieldGroup.type !== \"upload\"'>               {{fieldGroup.name}}             </label>             <div class='row'>               <div class='col-xs-{{field.columns}}'                 ng-repeat='field in fieldGroup.group'>                 <tw-dynamic-form-control                   name='{{field.key}}'                   label='{{fieldGroup.name}}'                   type='{{field.type | lowercase}}'                   placeholder='{{field.placeholder || field.example}}'                   help-text='{{field.helpText}}'                   locale='{{$ctrl.locale}}'                   upload-accept='{{field.accept}}'                   upload-icon='{{field.icon}}'                   upload-too-large-message='{{field.tooLargeMessage}}'                   options='field.valuesAllowed'                   upload-options='$ctrl.uploadOptions'                   ng-model='$ctrl.model[field.key]'                   ng-blur='$ctrl.onBlur(field)'                   ng-change='$ctrl.onChange(field)'                   ng-required='field.required'                   ng-disabled='field.disabled'                   tw-minlength='field.minLength'                   tw-maxlength='field.maxLength'                   ng-min='field.min'                   ng-max='field.max'                   ng-pattern='field.validationRegexp'                   text-format='field.displayFormat'                   tw-validation>                   <!-- tw-dynamic-async-validator='field.validationAsync' -->                 </tw-dynamic-form-control>                 <div class='error-messages'>                   <div ng-repeat='(validationType, validationMessage) in $ctrl.validationMessages'                     class='error-{{validationType}}'>                     {{validationMessage}}                   </div>                   <div class='error-provided' ng-if='$ctrl.errorMessages[field.key]'>                     {{ $ctrl.errorMessages[field.key] }}                   </div>                 </div>                 <div ng-if='field.tooltip'                   class='help-block'>                   {{field.tooltip}}                 </div>               </div>             </div>           </div>         </div>       </div>     </div>   </fieldset>"
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
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _twFocusableDirective = __webpack_require__(43), _twFocusableDirective2 = _interopRequireDefault(_twFocusableDirective);
    exports["default"] = angular.module("tw.styleguide.forms.focusable", []).directive("twFocusable", _twFocusableDirective2["default"]).name;
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
    var _twRadioController = __webpack_require__(45), _twRadioController2 = _interopRequireDefault(_twRadioController), TwRadio = {
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
        template: "     <input type='radio' class='sr-only'       name='{{$ctrl.name}}'       ng-value='$ctrl.ngValue || $ctrl.value'       ng-model='$ctrl.ngModel'       ng-disabled='$ctrl.ngDisabled'       ng-change='$ctrl.hiddenInputChange()'       tabindex='-1' />     <button type='button' class='tw-radio-button' tw-focusable       ng-click='$ctrl.buttonClick($event)'       ng-focus='$ctrl.buttonFocus()'       ng-blur='$ctrl.buttonBlur()'       ng-disabled='$ctrl.ngDisabled'       ng-class='{checked: $ctrl.checked}'       aria-pressed='{{$ctrl.checked}}'>       <span class='tw-radio-check'></span>     </button>"
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
    var _twRequirementsService = __webpack_require__(49), _twRequirementsService2 = _interopRequireDefault(_twRequirementsService), _twRequirementsFormComponent = __webpack_require__(47), _twRequirementsFormComponent2 = _interopRequireDefault(_twRequirementsFormComponent), _tabs = __webpack_require__(12), _fieldset = (_interopRequireDefault(_tabs), 
    __webpack_require__(8));
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
    var _twRequirementsFormController = __webpack_require__(48), _twRequirementsFormController2 = _interopRequireDefault(_twRequirementsFormController), TwRequirementsForm = {
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
        template: "   <tw-tabs     ng-if='$ctrl.requirements.length > 1'     tabs='$ctrl.requirements'     active='$ctrl.model.type'>   </tw-tabs>   <div class='tab-content' ng-form='twForm'>     <div ng-repeat='requirementType in $ctrl.requirements'       ng-if='$ctrl.model.type == requirementType.type'       class='tab-pane active'       id='{{requirementType.type}}'>       <p>{{requirementType.description}}</p>       <tw-fieldset         fields='requirementType.fields'         model='$ctrl.model'         upload-options='$ctrl.uploadOptions'         locale='{{$ctrl.locale}}'         onRefreshRequirements='$ctrl.onRefreshRequirements()'         validation-messages='$ctrl.validationMessages'         error-messages='$ctrl.errorMessages'>       </tw-fieldset>     </div>   </div>"
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
    var _twSelectController = __webpack_require__(51), _twSelectController2 = _interopRequireDefault(_twSelectController), TwSelect = {
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
        template: "     <div class='btn-group btn-block tw-select' ng-class='{ dropdown: !$ctrl.dropdownUp, dropup: $ctrl.dropdownUp }' aria-hidden='false'>       <button type='button' class='btn btn-input dropdown-toggle'         ng-class='{           \"btn-input-inverse\": $ctrl.inverse,           \"btn-addon\": $ctrl.inverse,           \"btn-sm\": $ctrl.size === \"sm\",           \"btn-lg\": $ctrl.size === \"lg\"         }'         data-toggle='dropdown' aria-expanded='false'         ng-disabled='$ctrl.ngDisabled'         ng-focus='$ctrl.buttonFocus()'         tw-focusable>         <span class='tw-select-selected' ng-if='$ctrl.selected'>           <span class='circle circle-inverse pull-xs-left circle-sm'             ng-if='$ctrl.selected && $ctrl.selected.icon && $ctrl.selected.secondary'>            <i class='icon {{$ctrl.selected.icon}}'></i>           </span>           <span class='circle circle-inverse pull-xs-left'              ng-class='$ctrl.circleClasses($ctrl.hideCircle)'             ng-if='($ctrl.selected.circleText || $ctrl.selected.circleImage || $ctrl.selected.circleIcon)'>             <span ng-if='$ctrl.selected.circleText'>{{$ctrl.selected.circleText}}</span>             <img ng-if='$ctrl.selected.circleImage'               ng-src='{{$ctrl.selected.circleImage}}' />             <i ng-if='$ctrl.selected.circleIcon' class='icon {{$ctrl.selected.circleIcon}}'></i>           </span>           <span class='text-ellipsis'>             <i class='currency-flag currency-flag-{{$ctrl.selected.currency | lowercase}}'               ng-if='$ctrl.selected && $ctrl.selected.currency'               ng-class='$ctrl.responsiveClasses($ctrl.hideCurrency)'             ></i>             <i class='icon {{$ctrl.selected.icon}}'               ng-if='$ctrl.selected && $ctrl.selected.icon && !$ctrl.selected.secondary'               ng-class='$ctrl.responsiveClasses($ctrl.hideIcon)'             ></i>             <span class='tw-select-label' ng-class='$ctrl.responsiveClasses($ctrl.hideLabel)'>               {{$ctrl.selected.label}}             </span>             <span               ng-if='$ctrl.selected.note'               ng-class='$ctrl.responsiveClasses($ctrl.hideNote)'               class='tw-select-note small m-l-1'>               {{$ctrl.selected.note}}             </span>             <span               ng-if='$ctrl.selected.secondary'               ng-class='$ctrl.responsiveClasses($ctrl.hideSecondary)'               class='tw-select-secondary small secondary text-ellipsis'>               {{$ctrl.selected.secondary}}             </span>           </span>         </span>         <span class='form-control-placeholder' ng-if='!$ctrl.selected'>{{$ctrl.placeholder}}</span>         <span class='caret'></span>       </button>       <ul class='dropdown-menu' role='menu' ng-class='{           \"dropdown-menu-xs-right\": $ctrl.dropdownRight === \"xs\",           \"dropdown-menu-sm-right\": $ctrl.dropdownRight === \"sm\",           \"dropdown-menu-md-right\": $ctrl.dropdownRight === \"md\",           \"dropdown-menu-lg-right\": $ctrl.dropdownRight === \"lg\",           \"dropdown-menu-xl-right\": $ctrl.dropdownRight === \"xl\",           \"dropdown-menu-sm\": $ctrl.dropdownWidth === \"sm\",           \"dropdown-menu-md\": $ctrl.dropdownWidth === \"md\",           \"dropdown-menu-lg\": $ctrl.dropdownWidth === \"lg\"         }'>         <li ng-if='$ctrl.filter'>           <a href='' class='tw-select-filter-link p-a-0' tabindex='-1'             ng-focus='$ctrl.filterFocus()'>             <div class='input-group'>               <span class='input-group-addon'><i class='icon icon-search'></i></span>               <input type='text' class='form-control tw-select-filter' placeholder='{{$ctrl.filter}}'                 ng-model='$ctrl.filterString'                 ng-change='$ctrl.filterChange()'                 ng-keydown='$ctrl.filterKeydown($event)' />             </div>           </a>         </li>         <li ng-class='{active: !$ctrl.selected}'           ng-if='$ctrl.placeholder && !$ctrl.ngRequired && !$ctrl.filter'>           <a href='' tabindex='-1'             ng-click='$ctrl.placeholderClick()'             ng-focus='$ctrl.placeholderFocus()'             class='tw-select-placeholder' tw-focusable>             {{$ctrl.placeholder}}           </a>         </li>         <li ng-if='($ctrl.placeholder && !$ctrl.ngRequired) || $ctrl.filter' class='divider'></li>         <li           ng-repeat='option in $ctrl.filteredOptions'           ng-class='{             active: $ctrl.ngModel === option.value,             disabled: option.disabled,             \"dropdown-header\": option.header,             \"tw-select-option\": !option.header && !option.disabled           }'>           <span ng-if='option.header' class='text-ellipsis'>{{option.header}}</span>           <a href=''             ng-if='!option.header'             ng-click='$ctrl.optionClick(option, $event)'             ng-focus='$ctrl.optionFocus(option)'             ng-class='{\"tw-select-option-link\": !option.disabled}'             index='{{$index}}'             tabindex='-1'             tw-focusable >             <div class='circle circle-inverse pull-xs-left circle-sm' ng-if='option.icon && option.secondary'>              <i class='icon {{option.icon}}'></i>            </div>            <i class='icon {{option.icon}} pull-xs-left' ng-if='option.icon && !option.secondary'></i>             <i class='currency-flag currency-flag-{{option.currency | lowercase}} pull-xs-left' ng-if='option.currency'>             </i><span class='circle circle-inverse pull-xs-left' ng-class='{\"circle-sm\": option.secondary, \"circle-xs\": !option.secondary}'               ng-if='option.circleText || option.circleImage || option.circleIcon'>               <span class='tw-select-circle-text' ng-if='option.circleText'>{{option.circleText}}</span>               <img ng-if='option.circleImage' ng-src='{{option.circleImage}}' />               <i ng-if='option.circleIcon' class='icon {{option.circleIcon}}'></i>             </span>{{option.label}}<span             ng-if='option.note' class='tw-select-note small m-l-1'>{{option.note}}</span><span             ng-if='option.secondary' class='tw-select-secondary small text-ellipsis'>{{option.secondary}}</span>           </a>         </li>         <li ng-if='$ctrl.hasTranscluded' class='divider'></li>         <li ng-transclude ng-if='$ctrl.hasTranscluded' class='tw-select-transcluded'></li>       </ul>     </div>     <input type='hidden' class='tw-select-hidden'       name='{{$ctrl.name}}'       value='{{$ctrl.ngModel}}'       ng-disabled='$ctrl.ngDisabled' />"
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
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _twUploadDroppableDirective = __webpack_require__(54), _twUploadDroppableDirective2 = _interopRequireDefault(_twUploadDroppableDirective), _twFileSelectDirective = __webpack_require__(53), _twFileSelectDirective2 = _interopRequireDefault(_twFileSelectDirective);
    exports["default"] = angular.module("tw.styleguide.forms.upload-droppable", []).directive("twFileSelect", _twFileSelectDirective2["default"]).component("twUploadDroppable", _twUploadDroppableDirective2["default"]).name;
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
    var _twUploadController = __webpack_require__(57), _twUploadController2 = _interopRequireDefault(_twUploadController), TwUpload = {
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
        template: '     <div class="droppable" ng-class="{       \'droppable-sm\': $ctrl.size === \'sm\',       \'droppable-md\': $ctrl.size === \'md\' || !$ctrl.size,       \'droppable-lg\': $ctrl.size === \'lg\',       \'droppable-dropping\': $ctrl.isDroppable,       \'droppable-processing\': !$ctrl.isDone && ($ctrl.isProcessing || $ctrl.isSuccess || $ctrl.isError),       \'droppable-complete\': $ctrl.isDone     }">     <div class="droppable-default-card" aria-hidden="{{$ctrl.isDone}}">       <div class="droppable-card-content">         <div class="m-b-2">           <i class="icon icon-{{$ctrl.viewIcon}} icon-xxl"></i>         </div>         <h4 class="m-b-1" ng-if="$ctrl.label || $ctrl.description">           {{$ctrl.label || $ctrl.description}}         </h4>         <p class="m-b-2">{{$ctrl.placeholder || $ctrl.instructions}}</p>         <label class="btn btn-primary">{{$ctrl.buttonText}}           <input tw-file-select type="file"             accept="{{$ctrl.accept}}"" class="tw-droppable-input hidden" name="file-upload"             on-user-input="$ctrl.onManualUpload" ng-model="$ctrl.inputFile"/>         </label>       </div>     </div>     <div class="droppable-processing-card droppable-card"       aria-hidden="{{$ctrl.isDone}}">       <div class="droppable-card-content">         <h4 class="m-b-2">           <span ng-if="$ctrl.isProcessing && $ctrl.processingText">{{$ctrl.processingText}}</span>           <span ng-if="$ctrl.isSuccess && $ctrl.successText">{{$ctrl.successText}}</span>           <span ng-if="$ctrl.isError && $ctrl.failureText">{{$ctrl.failureText}}</span>         </h4>         <tw-process size="sm" state="$ctrl.processingState"           ng-if="!$ctrl.isDone && ($ctrl.isProcessing || $ctrl.isSuccess || $ctrl.isError)"></tw-process>       </div>     </div>     <div class="droppable-complete-card droppable-card"       aria-hidden="{{!$ctrl.isDone}}">       <div class="droppable-card-content">          <div ng-if="!$ctrl.hasTranscluded && !$ctrl.isError">           <h4 class="m-b-2" ng-if="$ctrl.completeText">             {{$ctrl.completeText}}           </h4>           <img ng-src="{{$ctrl.image}}" ng-if="$ctrl.isImage" class="thumbnail m-b-3" />           <i class="icon icon-pdf icon-xxl" ng-if="!$ctrl.isImage"></i>           <p class="text-ellipsis m-b-2">{{$ctrl.fileName}}</p>         </div>         <div ng-if="!$ctrl.hasTranscluded && $ctrl.isError">           <h4 class="m-b-2" ng-if="$ctrl.isTooLarge">{{$ctrl.tooLargeMessage}}</h4>           <h4 class="m-b-2" ng-if="$ctrl.isWrongType">{{$ctrl.wrongTypeText}}</h4>           <h4 class="m-b-2" ng-if="!$ctrl.isTooLarge && $ctrl.errorMessage">{{$ctrl.errorMessage}}</h4>           <i class="icon icon-alert icon-xxl text-danger m-b-1"></i>         </div>         <div ng-if="$ctrl.hasTranscluded" ng-transclude></div>         <p ng-if="$ctrl.cancelText" class="m-t-2 m-b-0">           <a href="" ng-click="$ctrl.clear()">{{$ctrl.cancelText}}</a>         </p>       </div>     </div>     <div class="droppable-dropping-card droppable-card">       <div class="droppable-card-content">         <h4 class="m-b-2">Drop file to start upload</h4>         <div class="circle circle-sm">           <i class="icon icon-add"></i>         </div>         <p class="m-t-2 m-b-0"></p>       </div>     </div>   </div>'
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
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _twPopOverDirective = __webpack_require__(59), _twPopOverDirective2 = _interopRequireDefault(_twPopOverDirective);
    exports["default"] = angular.module("tw.styleguide.help.popover", []).directive("twPopOver", _twPopOverDirective2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwPopOver() {
        return {
            restrict: "A",
            link: function(scope, element) {
                if (!element.popover) return void console.log("twPopOver requires tooltip from bootstrap.js");
                var options = {}, tag = element[0];
                tag.getAttribute("data-trigger") ? "hover" === tag.getAttribute("data-trigger") && (options.trigger = "hover focus") : options.trigger = "focus", 
                tag.getAttribute("data-placement") || (options.placement = "top"), tag.getAttribute("data-content-html") && (options.html = !0), 
                element.popover(options), tag.setAttribute("tabindex", "0"), tag.setAttribute("role", "button"), 
                tag.setAttribute("data-toggle", "popover");
            }
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwPopOver;
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
    var _twToolTipDirective = __webpack_require__(61), _twToolTipDirective2 = _interopRequireDefault(_twToolTipDirective);
    exports["default"] = angular.module("tw.styleguide.help.tooltip", []).directive("twToolTip", _twToolTipDirective2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwToolTip() {
        return {
            restrict: "A",
            link: function(scope, element) {
                if (!element.tooltip) return void console.log("twToolTip requires bootstrap.js");
                var tag = element[0], options = {};
                tag.getAttribute("data-placement") || (options.placement = "top"), element.tooltip(options), 
                tag.setAttribute("tabindex", "0"), tag.setAttribute("data-toggle", "tooltip");
            }
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwToolTip;
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
    var _angular = __webpack_require__(0), _angular2 = _interopRequireDefault(_angular), _forms = __webpack_require__(14), _forms2 = _interopRequireDefault(_forms), _validation = __webpack_require__(20), _validation2 = _interopRequireDefault(_validation), _formatting = __webpack_require__(13), _formatting2 = _interopRequireDefault(_formatting), _services = __webpack_require__(19), _services2 = _interopRequireDefault(_services), _help = __webpack_require__(15), _help2 = _interopRequireDefault(_help), _layout = __webpack_require__(16), _layout2 = _interopRequireDefault(_layout), _loading = __webpack_require__(17), _loading2 = _interopRequireDefault(_loading), _navigation = __webpack_require__(18), _navigation2 = _interopRequireDefault(_navigation);
    exports["default"] = _angular2["default"].module("tw.styleguide-components", [ _forms2["default"], _validation2["default"], _formatting2["default"], _services2["default"], _help2["default"], _layout2["default"], _loading2["default"], _navigation2["default"] ]).name;
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
    var _twAffixDirective = __webpack_require__(64), _twAffixDirective2 = _interopRequireDefault(_twAffixDirective);
    exports["default"] = angular.module("tw.styleguide.styling.affix", []).directive("twAffix", _twAffixDirective2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwAffix() {
        return {
            restrict: "A",
            link: function(scope, element) {
                if (!element.affix) return void console.log("twAffix requires bootstrap.js");
                var tag = element[0], options = {};
                (tag.getAttribute("data-offset-top") || tag.getAttribute("data-offset-bottom")) && (options.offset = {}), 
                tag.getAttribute("data-offset-top") && Number(tag.getAttribute("data-offset-top")) && (options.offset.top = Number(tag.getAttribute("data-offset-top"))), 
                tag.getAttribute("data-offset-bottom") && Number(tag.getAttribute("data-offset-bottom")) && (options.offset.bottom = Number(tag.getAttribute("data-offset-bottom"))), 
                element.affix(options);
            }
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwAffix;
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
    var _twCardsService = __webpack_require__(11), _twCardsService2 = _interopRequireDefault(_twCardsService), _twCardDirective = __webpack_require__(67), _twCardDirective2 = _interopRequireDefault(_twCardDirective), _twCardsComponent = __webpack_require__(68), _twCardsComponent2 = _interopRequireDefault(_twCardsComponent);
    exports["default"] = angular.module("tw.styleguide.layout.cards", []).service("TwCardsService", _twCardsService2["default"]).component("twCards", _twCardsComponent2["default"]).directive("twCard", _twCardDirective2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwCardController($transclude, TwCardsService) {
        var $ctrl = this;
        $ctrl.hasForm = $transclude.isSlotFilled("cardForm"), $ctrl.toggle = TwCardsService.toggle, 
        $ctrl.addCard = TwCardsService.addCard, $ctrl.getExpandedIndex = TwCardsService.getExpandedIndex, 
        $ctrl.updateExpandedIndex = TwCardsService.updateExpandedIndex, $ctrl.getCard = TwCardsService.getCard, 
        $ctrl.getLength = TwCardsService.getLength;
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), TwCardController.$inject = [ "$transclude", "TwCardsService" ], exports["default"] = TwCardController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function TwCard() {
        return {
            require: {
                cardContainerController: "^twCards"
            },
            controllerAs: "$ctrl",
            bindToController: !0,
            replace: !0,
            scope: {
                state: "@",
                index: "<",
                open: "<?",
                disabled: "=?",
                inactive: "<"
            },
            transclude: {
                collapsedCard: "collapsed",
                expandedCard: "expanded",
                cardForm: "?cardForm",
                cardIcon: "cardIcon"
            },
            controller: _twCardController2["default"],
            template: twCardTemplate,
            link: function($scope, $element, $attrs, $ctrl) {
                var cardController = $scope.$ctrl;
                cardController.addCard(cardController), cardController.index = cardController.getLength() - 1, 
                cardController.inactive = $ctrl.cardContainerController.inactive, cardController.open === !0 && cardController.getExpandedIndex() === -1 ? cardController.updateExpandedIndex(cardController.index) : cardController.open = !1, 
                null == cardController.disabled && (cardController.disabled = !1);
            }
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _twCardsService = __webpack_require__(11), _twCardController = (_interopRequireDefault(_twCardsService), 
    __webpack_require__(66)), _twCardController2 = _interopRequireDefault(_twCardController), collapsedCardTemplate = '   <div class="p-a-panel" role="button" ng-click="$ctrl.toggle($ctrl.index)">     <div class="media">       <div class="media-left">         <div class="circle circle-sm circle-responsive"           ng-class="{ \'circle-inverse\': !$ctrl.inactive }">           <div ng-transclude="cardIcon"></div>         </div>       </div>       <div class="media-body" ng-transclude="collapsedCard"></div>     </div>   </div>', expandedCardTemplate = '   <div class="collapse"     ng-attr-aria-expanded="{{ $ctrl.open }}"     ng-class="{\'in\': $ctrl.open }"     ng-if="$ctrl.open" >     <div class="p-l-panel p-r-panel p-b-panel">       <div class="media">         <div class="media-left">             <div class="circle circle-sm circle-inverse circle-responsive invisible"></div>         </div>         <div class="media-body">           <hr class="m-t-0 hidden-xs hidden-sm" />           <a  href="" ng-click="$ctrl.toggle($ctrl.index)"               class="visible-xs-inline-block visible-sm-inline-block text-no-decoration m-t-1"               style="margin-left: -8px;">               <i class="icon icon-left-arrow icon-xxl"></i>           </a>           <div ng-transclude="expandedCard"></div>         </div>       </div>     </div>   </div>', cardFormTemplate = '<div class="well p-l-panel p-r-panel" ng-if="$ctrl.hasForm">     <div class="media">       <div class="media-left">         <div class="circle circle-sm circle-responsive invisible"></div>       </div>       <div class="media-body" ng-transclude="cardForm"></div>     </div>   </div>', twCardTemplate = "<li class=\"list-group-item p-a-0 list-group-item-{{$ctrl.state}}\"     ng-class=\"{       'active': $ctrl.open,       'disabled': $ctrl.disabled     }\">" + collapsedCardTemplate + expandedCardTemplate + cardFormTemplate + "</li>";
    exports["default"] = TwCard;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var TwCards = {
        bindings: {
            inactive: "=?"
        },
        controller: function() {},
        transclude: !0,
        template: '     <ul ng-transclude       class="list-group panel-list-group list-group-slide-out"       ng-class="{\'list-group-inactive\': $ctrl.inactive}">     </ul>'
    };
    exports["default"] = TwCards;
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
    var _twLoaderComponent = __webpack_require__(70), _twLoaderComponent2 = _interopRequireDefault(_twLoaderComponent);
    exports["default"] = angular.module("tw.styleguide.loading.loader", []).component("twLoader", _twLoaderComponent2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var TwLoader = {
        template: "<div class='loader'>     <div class='loader-spinner'></div>     <div class='loader-flag'>       <svg xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='-2 -2 56 56'>         <polygon class='loader-flag-stroke'  stroke='#00B9FF' stroke-width='2' stroke-linejoin='miter' stroke-linecap='round' stroke-miterlimit='10' stroke-dasharray='300' stroke-dashoffset='300' fill='none' points='24.6,27.3 0,27.3 14.3,13.7 6.1,0 48.2,0 26.3,52 19.5,52 39.2,5.5 16.8,5.5 21.6,13.6 13.4,21.8 27,21.8' />       </svg>       <svg class='loader-flag-fill' xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='0 2 52 48'>         <polygon fill='#00B9FF' points='6.1,0 14.3,13.7 0,27.3 24.6,27.3 27,21.8 13.4,21.8 21.6,13.6 16.8,5.5 39.2,5.5 19.5,52 26.3,52 48.2,0 '/>       </svg>     </div>   </div>"
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
    var _twProcessComponent = __webpack_require__(72), _twProcessComponent2 = _interopRequireDefault(_twProcessComponent);
    exports["default"] = angular.module("tw.styleguide.loading.process", []).component("twProcess", _twProcessComponent2["default"]).name;
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
    var _twProcessController = __webpack_require__(73), _twProcessController2 = _interopRequireDefault(_twProcessController), TwProcess = {
        bindings: {
            state: "<",
            size: "@",
            onStop: "&",
            promise: "<"
        },
        controller: _twProcessController2["default"],
        template: "<span class='process'     ng-class='{       \"process-success\": $ctrl.processing === 1,       \"process-danger\": $ctrl.processing === -1,       \"process-stopped\": $ctrl.processing === 0,       \"process-xs\": $ctrl.size === \"xs\",       \"process-sm\": $ctrl.size === \"sm\",       \"process-md\": $ctrl.size === \"md\",       \"process-lg\": $ctrl.size === \"lg\",       \"process-xl\": $ctrl.size === \"xl\"     }'>     <span class='process-icon-container'>       <span class='process-icon-horizontal'></span>       <span class='process-icon-vertical'></span>     </span>     <svg version='1.1'       xmlns='http://www.w3.org/2000/svg'       xml:space='preserve'>       <circle class='process-circle' cx='50%' cy='50%' ng-attr-r='{{$ctrl.radius}}'         fill-opacity='0.0' />     </svg>   </span>"
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
    var _twTabsController = __webpack_require__(75), _twTabsController2 = _interopRequireDefault(_twTabsController), TwTabs = {
        bindings: {
            tabs: "<",
            active: "=",
            onChange: "&"
        },
        controller: _twTabsController2["default"],
        template: "   <ul ng-if='$ctrl.tabs.length > 0'     class='nav nav-tabs m-b-3'>     <li ng-repeat='tab in $ctrl.tabs track by $index'       ng-class='{\"active\": $ctrl.active === tab.type}'>       <a href='' ng-click='$ctrl.switchTab(tab.type)'>         {{tab.label}}       </a>     </li>   </ul>"
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
    var _twAsyncValidationDirective = __webpack_require__(79), _twAsyncValidationDirective2 = _interopRequireDefault(_twAsyncValidationDirective);
    exports["default"] = angular.module("tw.styleguide.validation.async", []).directive("twDynamicAsyncValidator", _twAsyncValidationDirective2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwDynamicAsyncValidator($log, $q, $http) {
        function DyancicAsyncValidatorController() {
            console.log("this.twDynamicAsyncValidator"), console.log(ctrl.twDynamicAsyncValidator);
        }
        function emailValidLink(scope, element, attrs, ngModel) {
            attrs["tw-dynamic-async-validator"];
        }
        return {
            link: emailValidLink,
            restrict: "A",
            controller: DyancicAsyncValidatorController,
            contollerAs: "ctrl",
            bindToController: {
                twDynamicAsyncValidator: "="
            }
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), TwDynamicAsyncValidator.$inject = [ "$log", "$q", "$http" ], exports["default"] = TwDynamicAsyncValidator;
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
    var _twValidationDirective = __webpack_require__(81), _twValidationDirective2 = _interopRequireDefault(_twValidationDirective);
    exports["default"] = angular.module("tw.stylguide.validation.control", []).directive("twValidation", _twValidationDirective2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwValidation() {
        return {
            restrict: "AC",
            require: "ngModel",
            link: validationLink
        };
    }
    function validationLink(scope, element, attrs, ngModel) {
        var formGroup = element.closest(".form-group");
        element.on("invalid", function(event) {
            event.preventDefault();
        }), ngModel.$validators.validation = function() {
            return scope.$evalAsync(function() {
                checkModelAndUpdate(ngModel, formGroup, element);
            }), !0;
        }, element.on("blur", function() {
            scope.$evalAsync(function() {
                checkModelAndUpdate(ngModel, formGroup, element);
            });
        });
    }
    function checkModelAndUpdate(ngModel, formGroup, element) {
        return ngModel.$valid ? (formGroup.removeClass("has-error"), void element.removeAttr("aria-invalid")) : void (ngModel.$touched && ngModel.$dirty && (formGroup.addClass("has-error"), 
        element.attr("aria-invalid", !0)));
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwValidation;
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
    var _twFormValidationDirective = __webpack_require__(83), _twFormValidationDirective2 = _interopRequireDefault(_twFormValidationDirective);
    exports["default"] = angular.module("tw.styleguide.validation.form", []).directive("form", _twFormValidationDirective2["default"]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwFormValidation() {
        return {
            restrict: "E",
            link: function(scope, element) {
                $(element).on("submit", function() {
                    var elements = $(element).find("[tw-validation].ng-invalid");
                    return elements.closest(".form-group").addClass("has-error"), elements.closest(".checkbox, .radio").addClass("has-error"), 
                    !0;
                });
            }
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwFormValidation;
} ]);