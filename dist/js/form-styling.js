angular.module("tw.form-styling", []);
!function(angular) {
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
    angular.module("tw.form-styling").directive("twAffix", TwAffix);
}(window.angular), function(angular) {
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
    angular.module("tw.form-styling").directive("formControl", TwFormControlStyling), 
    angular.module("tw.form-styling").directive("twFocusable", TwFocusable);
}(window.angular), function(angular) {
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
    angular.module("tw.form-styling").directive("twPopOver", TwPopOver);
}(window.angular), function(angular) {
    "use strict";
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
                reformatControl(element, newModel, !0), element.setSelectionRange(selectionStart, selectionEnd);
            }
        }
        function onPatternChange(newPattern, oldPattern) {
            if (newPattern === oldPattern) return void (pattern = newPattern);
            if (newPattern && newPattern.indexOf("||") > 0) {
                var lengthPatterns = getLengthToPatternMap(newPattern);
                console.log(lengthPatterns);
                var modelLength = $ctrl.ngModel ? $ctrl.ngModel.length : 0;
                pattern = lengthPatterns[String(modelLength)] ? map[String($ctrl.ngModel.length)] : newPattern.substring(0, newPattern.indexOf("||"));
            } else pattern = newPattern;
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
            return newValue !== originalValue && (element.value = newValue), newValue;
        }
        function onChange() {
            var formatted = reformatControl(element);
            undoStack.add(formatted);
        }
        function onPaste(event) {
            var selectionStart = element.selectionStart, clipboardData = (element.value.length, 
            event.clipboardData || window.clipboardData), pastedData = clipboardData.getData("Text"), separatorsInPaste = TwTextFormatService.countSeparatorsInAppendedValue(pattern, selectionStart, pastedData);
            $timeout(function() {
                var newPosition = selectionStart + pastedData.length + separatorsInPaste, formatted = reformatControl(element);
                undoStack.add(formatted), element.setSelectionRange(newPosition, newPosition);
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
            var formatted = reformatControl(element);
            undoStack.add(formatted);
            var newPosition = getPositionAfterKeypress(pattern, element, selectionStart, selectionEnd);
            element.setSelectionRange(newPosition, newPosition);
        }
        function onCut(event) {
            var selectionStart = element.selectionStart;
            $timeout(function() {
                var formatted = reformatControl(element);
                undoStack.add(formatted);
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
        function getLengthToPatternMap(pattern) {
            var patterns = pattern.split("||"), lengthToPatternMap = {};
            return patterns.forEach(function(patternIter) {
                console.log(patternIter);
                var lengthString = String(TwTextFormatService.countCharactersInPattern(patternIter));
                lengthToPatternMap[lengthString] = patternIter;
            }), lengthToPatternMap;
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
    angular.module("tw.form-styling").directive("twTextFormat", TwTextFormat);
}(window.angular), function(angular) {
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
    angular.module("tw.form-styling").directive("twToolTip", TwToolTip);
}(window.angular), function(angular) {
    "use strict";
    angular.module("tw.form-styling").filter("twTextFormat", [ "TwTextFormatService", function(TwTextFormatService) {
        return function(input, pattern) {
            return input = input || "", pattern ? TwTextFormatService.formatUsingPattern(input, pattern) : input;
        };
    } ]);
}(window.angular);