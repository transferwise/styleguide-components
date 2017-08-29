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
            controller: [ "$element", "$timeout", "$scope", "TwTextFormatService", "TwUndoStackFactory", TwTextFormatController ]
        };
    }
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
    });
    var _twTextFormatService = __webpack_require__(0), _twTextFormatService2 = _interopRequireDefault(_twTextFormatService), _undoStackService = __webpack_require__(7), _undoStackService2 = _interopRequireDefault(_undoStackService);
    exports["default"] = angular.module("tw.styleguide.styling.text-format", []).service("TwUndoStackFactory", _undoStackService2["default"]).service("TwTextFormatService", _twTextFormatService2["default"]).directive("twTextFormat", TwTextFormat).name;
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
    var _twTextFormatService = __webpack_require__(0);
    _interopRequireDefault(_twTextFormatService);
    TwTextFormatFilter.$inject = [ "TwTextFormatService" ], exports["default"] = angular.module("tw.styleguide.styling.text-format").filter("twTextFormat", TwTextFormatFilter).name;
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
    }), exports["default"] = angular.module("tw.styleguide.help.popover", []).directive("twPopOver", TwPopOver).name;
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
    }), exports["default"] = angular.module("tw.styleguide.help.tooltip", []).directive("twToolTip", TwToolTip).name;
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
    var _angular = __webpack_require__(5), _angular2 = _interopRequireDefault(_angular), _twPopOverDirective = __webpack_require__(3), _twPopOverDirective2 = _interopRequireDefault(_twPopOverDirective), _twToolTipDirective = __webpack_require__(4), _twToolTipDirective2 = _interopRequireDefault(_twToolTipDirective), _twTextFormatDirective = __webpack_require__(1), _twTextFormatDirective2 = _interopRequireDefault(_twTextFormatDirective), _twTextFormatFilter = __webpack_require__(2), _twTextFormatFilter2 = _interopRequireDefault(_twTextFormatFilter);
    exports["default"] = _angular2["default"].module("tw.form-styling", [ _twPopOverDirective2["default"], _twToolTipDirective2["default"], _twTextFormatDirective2["default"], _twTextFormatFilter2["default"] ]).name;
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
} ]);