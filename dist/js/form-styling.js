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
    function TwPresentationPattern() {
        return {
            restrict: "A",
            require: "ngModel",
            controller: [ "$element", "$timeout", "TwTextFormatting", TwPresentationPatternController ]
        };
    }
    function TwPresentationPatternController($element, $timeout, TwTextFormatting) {
        function reformatControl(element, originalValue) {
            originalValue || (originalValue = element.value);
            var newValue = format(unformat(originalValue));
            return newValue !== originalValue && (element.value = newValue), newValue;
        }
        function unformat(value) {
            return value ? TwTextFormatting.unformatUsingPattern(value, getPattern(element)) : value;
        }
        function format(value) {
            return value ? TwTextFormatting.formatUsingPattern(value, getPattern(element)) : "";
        }
        function onChange() {
            reformatControl(element);
        }
        function onPaste(event) {
            var selectionStart = element.selectionStart, clipboardData = (element.value.length, 
            event.clipboardData || window.clipboardData), pastedData = clipboardData.getData("Text"), pattern = getPattern(element), separatorsInPaste = countSeparatorsInRange(pattern, selectionStart, selectionStart + pastedData.length);
            $timeout(function() {
                var newPosition = selectionStart + pastedData.length + separatorsInPaste - 1;
                onChange(), element.setSelectionRange(newPosition, newPosition);
            });
        }
        function onKeydown(event) {
            var key = event.keyCode || event.which;
            if (!(reservedKeys.indexOf(key) >= 0 || event.metaKey || event.ctrlKey)) {
                var selectionStart = event.target.selectionStart, selectionEnd = event.target.selectionEnd, pattern = getPattern(element);
                $timeout(function() {
                    if (key === keys.backspace) {
                        var newVal = doBackspace(element, pattern, selectionStart, selectionEnd);
                        ngModelController.$setViewValue(newVal);
                    } else doKeypress(element, pattern, selectionStart, selectionEnd);
                });
            }
        }
        function doBackspace(element, pattern, selectionStart, selectionEnd) {
            var separatorsBeforeCursor = countSeparatorsBeforeCursor(pattern, selectionStart), newVal = element.value;
            if (separatorsBeforeCursor) {
                var adjust = separatorsBeforeCursor > 1 ? 1 : 0;
                newVal = selectionStart !== selectionEnd ? removeCharacters(element.value, selectionStart - separatorsBeforeCursor + 1, selectionStart - adjust) : removeCharacters(element.value, selectionStart - separatorsBeforeCursor, selectionStart - adjust);
            }
            element.value = format(unformat(newVal));
            var newPosition = getPositionAfterBackspace(pattern, element, selectionStart, selectionEnd);
            return element.setSelectionRange(newPosition, newPosition), newVal;
        }
        function doKeypress(element, pattern, selectionStart, selectionEnd) {
            reformatControl(element);
            var newPosition = getPositionAfterKeypress(pattern, element, selectionStart, selectionEnd);
            element.setSelectionRange(newPosition, newPosition);
        }
        function onCut(event) {
            var selectionStart = element.selectionStart;
            $timeout(function() {
                onChange();
                var pattern = getPattern(element), newPosition = selectionStart + countSeparatorsAfterCursor(pattern, selectionStart);
                element.setSelectionRange(newPosition, newPosition);
            });
        }
        function onCopy(event) {
            var selectionStart = element.selectionStart, selectionEnd = element.selectionEnd;
            $timeout(function() {
                element.setSelectionRange(selectionStart, selectionEnd);
            });
        }
        function getPattern(element) {
            return element.getAttribute("tw-presentation-pattern");
        }
        var ngModelController = $element.controller("ngModel"), element = $element[0];
        ngModelController.$render = function() {
            element.value = format(ngModelController.$viewValue);
        }, ngModelController.$formatters.push(format), ngModelController.$parsers.push(unformat), 
        $timeout(function() {
            var originalMinLength = ngModelController.$validators.minlength, originalMaxLength = ngModelController.$validators.maxlength;
            originalMinLength && (ngModelController.$validators.minlength = function(modelValue, viewValue) {
                return originalMinLength(modelValue, unformat(viewValue));
            }), originalMaxLength && (ngModelController.$validators.maxlength = function(modelValue, viewValue) {
                return originalMaxLength(modelValue, unformat(viewValue));
            });
        }), element.addEventListener("change", onChange), element.addEventListener("keydown", onKeydown), 
        element.addEventListener("paste", onPaste), element.addEventListener("cut", onCut), 
        element.addEventListener("copy", onCopy);
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
            "delete": 46
        }, reservedKeys = [ keys.cmd, keys.cmdLeft, keys.cmdRight, keys.enter, keys.shift, keys.ctrl, keys.alt, keys.left, keys.up, keys.right, keys.down ];
    }
    function getPositionAfterBackspace(pattern, element, selectionStart, selectionEnd) {
        var separatorsBefore = countSeparatorsBeforeCursor(pattern, selectionStart), isRange = selectionStart !== selectionEnd, proposedPosition = selectionStart - separatorsBefore - (isRange ? 0 : 1);
        return proposedPosition + countSeparatorsAfterCursor(pattern, proposedPosition);
    }
    function getPositionAfterKeypress(pattern, element, selectionStart, selectionEnd) {
        var separatorsAfter;
        return separatorsAfter = selectionStart !== selectionEnd ? countSeparatorsAfterCursor(pattern, selectionStart) : countSeparatorsAfterCursor(pattern, selectionStart + 1), 
        selectionStart + 1 + separatorsAfter;
    }
    function countSeparatorsInRange(pattern, selectionStart, selectionEnd) {
        for (var section = pattern.substring(selectionStart, selectionEnd), separators = 0, i = 0; i < section.length; i++) "*" !== section[i] && separators++;
        return separators;
    }
    function countSeparatorsAfterCursor(pattern, position) {
        for (var separators = 0; pattern[position + separators] && "*" !== pattern[position + separators]; ) separators++;
        return separators;
    }
    function countSeparatorsBeforeCursor(pattern, position) {
        for (var separators = 0; pattern[position - separators - 1] && "*" !== pattern[position - separators - 1]; ) separators++;
        return separators;
    }
    function removeCharacters(value, first, last) {
        return value.substring(0, first - 1) + value.substring(last - 1, value.length);
    }
    angular.module("tw.form-styling").directive("twPresentationPattern", TwPresentationPattern);
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
    angular.module("tw.form-styling").filter("twPresentationPattern", [ "TwTextFormatting", function(TwTextFormatting) {
        return function(input, pattern) {
            return console.log("filter! " + pattern), input = input || "", pattern ? TwTextFormatting.formatUsingPattern(input, pattern) : input;
        };
    } ]);
}(window.angular);