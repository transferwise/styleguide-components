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
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 6);
}([ function(module, exports, __webpack_require__) {
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
    function TextFormat() {
        return {
            restrict: "A",
            require: "ngModel",
            bindToController: !0,
            controllerAs: "$ctrl",
            scope: {
                ngModel: "<",
                twTextFormat: "@"
            },
            controller: _textFormatController2["default"]
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _textFormatController = __webpack_require__(7), _textFormatController2 = _interopRequireDefault(_textFormatController), _undoStackService = __webpack_require__(8), _undoStackService2 = _interopRequireDefault(_undoStackService), _textFormatService = __webpack_require__(0), _textFormatService2 = _interopRequireDefault(_textFormatService);
    exports["default"] = angular.module("tw.styleguide.formatting.text-format", []).service("TwUndoStackFactory", _undoStackService2["default"]).service("TwTextFormatService", _textFormatService2["default"]).directive("twTextFormat", TextFormat).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function TextFormatFilter(TwTextFormatService) {
        return function(input, pattern) {
            return input = input || "", pattern ? TwTextFormatService.formatUsingPattern(input, pattern) : input;
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _textFormatService = __webpack_require__(0);
    _interopRequireDefault(_textFormatService);
    TextFormatFilter.$inject = [ "TwTextFormatService" ], exports["default"] = angular.module("tw.styleguide.formatting.text-format").filter("twTextFormat", TextFormatFilter).name;
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
    var _popOverDirective = __webpack_require__(9), _popOverDirective2 = _interopRequireDefault(_popOverDirective);
    exports["default"] = angular.module("tw.styleguide.help.popover", []).directive("twPopOver", _popOverDirective2["default"]).name;
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
    var _toolTipDirective = __webpack_require__(10), _toolTipDirective2 = _interopRequireDefault(_toolTipDirective);
    exports["default"] = angular.module("tw.styleguide.help.tooltip", []).directive("twToolTip", _toolTipDirective2["default"]).name;
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
    var _angular = __webpack_require__(5), _angular2 = _interopRequireDefault(_angular), _popOver = __webpack_require__(3), _popOver2 = _interopRequireDefault(_popOver), _toolTip = __webpack_require__(4), _toolTip2 = _interopRequireDefault(_toolTip), _textFormatDirective = __webpack_require__(1), _textFormatDirective2 = _interopRequireDefault(_textFormatDirective), _textFormatFilter = __webpack_require__(2), _textFormatFilter2 = _interopRequireDefault(_textFormatFilter);
    exports["default"] = _angular2["default"].module("tw.form-styling", [ _popOver2["default"], _toolTip2["default"], _textFormatDirective2["default"], _textFormatFilter2["default"] ]).name;
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
    }(), TextFormatController = function() {
        function TextFormatController($element, $timeout, $scope, TwTextFormatService, TwUndoStackFactory) {
            var _this = this;
            _classCallCheck(this, TextFormatController), this.keydownCount = 0, this.pattern = "", 
            this.undoStack = TwUndoStackFactory["new"](), this.$ngModel = $element.controller("ngModel"), 
            this.$timeout = $timeout, this.TextFormatService = TwTextFormatService, this.element = $element[0], 
            this.$ngModel.$formatters.push(function(value) {
                return _this.TextFormatService.formatUsingPattern(value, _this.pattern);
            }), this.$ngModel.$parsers.push(function(value) {
                return _this.TextFormatService.unformatUsingPattern(value, _this.pattern);
            }), this.element.addEventListener("change", function(event) {
                _this.onChange(event);
            }), this.element.addEventListener("keydown", function(event) {
                _this.onKeydown(event);
            }), this.element.addEventListener("paste", function(event) {
                _this.onPaste(event);
            }), this.element.addEventListener("cut", function(event) {
                _this.onCut(event);
            }), this.element.addEventListener("copy", function(event) {
                _this.onCopy(event);
            }), this.replaceLengthValidators(this.$ngModel, this.TextFormatService, this.$timeout), 
            $scope.$watch("$ctrl.twTextFormat", function(newValue, oldValue) {
                _this.onPatternChange(newValue);
            }), $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
                _this.onModelChange(newValue, oldValue);
            }), this.undoStack.reset(this.element.value);
        }
        return _createClass(TextFormatController, [ {
            key: "onModelChange",
            value: function(newModel, oldModel) {
                if (newModel !== oldModel) {
                    var selectionStart = this.element.selectionStart, selectionEnd = this.element.selectionEnd;
                    this.reformatControl(this.element, newModel), this.setSelection(selectionStart, selectionEnd);
                }
            }
        }, {
            key: "onPatternChange",
            value: function(newPattern, oldPattern) {
                if (newPattern === oldPattern) return void (this.pattern = newPattern);
                newPattern && newPattern.indexOf("||") > 0 ? this.pattern = newPattern.substring(0, newPattern.indexOf("||")) : this.pattern = newPattern;
                var viewValue = this.element.value;
                oldPattern && (viewValue = this.TextFormatService.unformatUsingPattern(viewValue, oldPattern)), 
                newPattern && (viewValue = this.TextFormatService.formatUsingPattern(viewValue, this.pattern)), 
                this.undoStack.reset(viewValue), this.element.value = viewValue;
            }
        }, {
            key: "reformatControl",
            value: function(element, originalValue) {
                originalValue || (originalValue = element.value);
                var newValue = this.TextFormatService.reformatUsingPattern(originalValue, this.pattern);
                newValue !== originalValue && (element.value = newValue);
            }
        }, {
            key: "onChange",
            value: function() {
                this.reformatControl(this.element), this.undoStack.add(this.element.value);
            }
        }, {
            key: "onPaste",
            value: function(event) {
                var _this2 = this, selectionStart = this.element.selectionStart, clipboardData = (this.element.value.length, 
                event.clipboardData || window.clipboardData), pastedData = clipboardData.getData("Text"), separatorsInPaste = this.TextFormatService.countSeparatorsInAppendedValue(this.pattern, selectionStart, pastedData);
                this.$timeout(function() {
                    var newPosition = selectionStart + pastedData.length + separatorsInPaste;
                    _this2.reformatControl(_this2.element), _this2.undoStack.add(_this2.element.value), 
                    _this2.setSelection(newPosition, newPosition);
                });
            }
        }, {
            key: "onKeydown",
            value: function(event) {
                var _this3 = this;
                this.keydownCount++;
                var currentKeydownCount = this.keydownCount, key = event.keyCode || event.which, selectionStart = event.target.selectionStart, selectionEnd = event.target.selectionEnd;
                return reservedKeys.indexOf(key) >= 0 || event.metaKey || event.ctrlKey ? (key === keys.z && (event.metaKey || event.ctrlKey) && (event.preventDefault(), 
                event.stopPropagation(), this.element.value = this.undoStack.undo()), void (key === keys.y && (event.metaKey || event.ctrlKey) && (event.preventDefault(), 
                event.stopPropagation(), this.element.value = this.undoStack.redo()))) : void this.$timeout(function() {
                    _this3.afterKeydown(key, currentKeydownCount, _this3.element, _this3.pattern, selectionStart, selectionEnd);
                });
            }
        }, {
            key: "afterKeydown",
            value: function(key, currentKeydownCount, element, pattern, selectionStart, selectionEnd) {
                var newVal;
                key === keys.backspace ? (newVal = this.doBackspace(element, pattern, selectionStart, selectionEnd), 
                this.$ngModel.$setViewValue(newVal)) : key === keys["delete"] ? (newVal = this.doDelete(element, pattern, selectionStart, selectionEnd), 
                this.$ngModel.$setViewValue(newVal)) : this.keydownCount === currentKeydownCount && this.doKeypress(element, pattern, selectionStart, selectionEnd);
            }
        }, {
            key: "doBackspace",
            value: function(element, pattern, selectionStart, selectionEnd) {
                element.value = this.getFormattedValueAfterBackspace(element, pattern, selectionStart, selectionEnd), 
                this.undoStack.add(element.value);
                var newPosition = this.getPositionAfterBackspace(pattern, element, selectionStart, selectionEnd);
                return this.setSelection(newPosition, newPosition), element.value;
            }
        }, {
            key: "getFormattedValueAfterBackspace",
            value: function(element, pattern, selectionStart, selectionEnd) {
                var removeStart, removeEnd, newVal = element.value, separatorsBeforeCursor = this.TextFormatService.countSeparatorsBeforeCursor(pattern, selectionStart);
                if (separatorsBeforeCursor) {
                    var adjust = separatorsBeforeCursor > 1 ? 1 : 0;
                    selectionStart !== selectionEnd ? (removeStart = selectionStart - separatorsBeforeCursor + 1, 
                    removeEnd = selectionStart - adjust) : (removeStart = selectionStart - separatorsBeforeCursor, 
                    removeEnd = selectionStart - adjust), newVal = this.removeCharacters(element.value, removeStart, removeEnd);
                }
                return this.TextFormatService.reformatUsingPattern(newVal, pattern);
            }
        }, {
            key: "doDelete",
            value: function(element, pattern, selectionStart, selectionEnd) {
                return element.value = this.getFormattedValueAfterDelete(element, pattern, selectionStart, selectionEnd), 
                this.undoStack.add(element.value), this.setSelection(selectionStart, selectionStart), 
                element.value;
            }
        }, {
            key: "setSelection",
            value: function(start, end) {
                this.element.setSelectionRange(start, end);
            }
        }, {
            key: "getFormattedValueAfterDelete",
            value: function(element, pattern, selectionStart, selectionEnd) {
                var removeStart, removeEnd, newVal = element.value, separatorsAfterCursor = this.TextFormatService.countSeparatorsAfterCursor(pattern, selectionStart);
                if (separatorsAfterCursor) {
                    var adjust = separatorsAfterCursor > 1 ? 0 : 1;
                    selectionStart !== selectionEnd ? (removeStart = selectionStart + adjust, removeEnd = selectionStart + separatorsAfterCursor + adjust) : (removeStart = selectionStart + separatorsAfterCursor, 
                    removeEnd = selectionStart + separatorsAfterCursor + 1), newVal = this.removeCharacters(element.value, removeStart, removeEnd);
                }
                return this.TextFormatService.reformatUsingPattern(newVal, pattern);
            }
        }, {
            key: "doKeypress",
            value: function(element, pattern, selectionStart, selectionEnd) {
                this.reformatControl(element), this.undoStack.add(element.value);
                var newPosition = this.getPositionAfterKeypress(pattern, element, selectionStart, selectionEnd);
                this.setSelection(newPosition, newPosition);
            }
        }, {
            key: "getPositionAfterBackspace",
            value: function(pattern, element, selectionStart, selectionEnd) {
                var separatorsBefore = this.TextFormatService.countSeparatorsBeforeCursor(pattern, selectionStart), isRange = selectionStart !== selectionEnd, proposedPosition = selectionStart - separatorsBefore - (isRange ? 0 : 1);
                return proposedPosition + this.TextFormatService.countSeparatorsAfterCursor(pattern, proposedPosition);
            }
        }, {
            key: "getPositionAfterKeypress",
            value: function(pattern, element, selectionStart, selectionEnd) {
                var separatorsAfter;
                return selectionStart !== selectionEnd ? separatorsAfter = this.TextFormatService.countSeparatorsAfterCursor(pattern, selectionStart) : (separatorsAfter = this.TextFormatService.countSeparatorsAfterCursor(pattern, selectionStart), 
                0 === separatorsAfter && (separatorsAfter = this.TextFormatService.countSeparatorsAfterCursor(pattern, selectionStart + 1))), 
                selectionStart + 1 + separatorsAfter;
            }
        }, {
            key: "removeCharacters",
            value: function(value, first, last) {
                return value.substring(0, first - 1) + value.substring(last - 1, value.length);
            }
        }, {
            key: "onCut",
            value: function(event) {
                var _this4 = this, selectionStart = this.element.selectionStart;
                this.$timeout(function() {
                    _this4.reformatControl(_this4.element), _this4.undoStack.add(_this4.element.value);
                    var newPosition = selectionStart + _this4.TextFormatService.countSeparatorsAfterCursor(_this4.pattern, selectionStart);
                    _this4.setSelection(newPosition, newPosition);
                });
            }
        }, {
            key: "onCopy",
            value: function(event) {
                var _this5 = this, selectionStart = this.element.selectionStart, selectionEnd = this.element.selectionEnd;
                this.$timeout(function() {
                    _this5.setSelection(selectionStart, selectionEnd);
                });
            }
        }, {
            key: "replaceLengthValidators",
            value: function($ngModel, TextFormatService, $timeout) {
                var _this6 = this;
                $timeout(function() {
                    var originalMinLength = $ngModel.$validators.minlength, originalMaxLength = $ngModel.$validators.maxlength;
                    originalMinLength && ($ngModel.$validators.minlength = function(modelValue, viewValue) {
                        return originalMinLength(modelValue, TextFormatService.unformatUsingPattern(viewValue, _this6.pattern));
                    }), originalMaxLength && ($ngModel.$validators.maxlength = function(modelValue, viewValue) {
                        return originalMaxLength(modelValue, TextFormatService.unformatUsingPattern(viewValue, _this6.pattern));
                    });
                });
            }
        } ]), TextFormatController;
    }(), keys = {
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
    TextFormatController.$inject = [ "$element", "$timeout", "$scope", "TwTextFormatService", "TwUndoStackFactory" ], 
    exports["default"] = TextFormatController;
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
} ]);