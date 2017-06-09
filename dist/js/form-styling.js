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
        function getPositionAfterBackspace(pattern, element, selectionStart, selectionEnd) {
            var separatorsBefore = countSeparatorsBeforeCursor(pattern, selectionStart), isRange = selectionStart !== selectionEnd, proposedPosition = selectionStart - separatorsBefore - (isRange ? 0 : 1), separatorsAfter = countSeparatorsAfterCursor(pattern, proposedPosition);
            return proposedPosition + separatorsAfter;
        }
        function getPositionAfterKeypress(pattern, element, position) {
            var separatorsAfter = countSeparatorsAfterCursor(pattern, position);
            return position + separatorsAfter + 1;
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
        function getCursorPosition(element) {
            return element.selectionStart;
        }
        function setCursorPosition(element, position) {
            element.setSelectionRange(position, position);
        }
        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                twPresentationPattern: "@"
            },
            controller: [ "$element", "$timeout", "$scope", "$attrs", "$parse", "TwTextFormatting", function($element, $timeout, $scope, $attrs, $parse, TwTextFormatting) {
                function listener() {
                    console.log("listener"), reformatControl($element);
                }
                function reformatControl($element, originalValue) {
                    originalValue || (originalValue = $element.val());
                    var newValue = format(unformat(originalValue));
                    return newValue !== originalValue && $element.val(newValue), newValue;
                }
                function unformat(value) {
                    if (console.log("unformat: " + value), !value) return value;
                    var pattern = $element.attr("tw-presentation-pattern");
                    return TwTextFormatting.unformatUsingPattern(value, pattern);
                }
                function format(value) {
                    if (console.log("format: " + value), !value) return "";
                    var pattern = $element.attr("tw-presentation-pattern");
                    return TwTextFormatting.formatUsingPattern(value, pattern);
                }
                function modifyValue(event) {
                    console.log("keypress");
                    var key = event.keyCode || event.which;
                    if (!(reservedKeys.indexOf(key) >= 0)) {
                        var selectionStart = getCursorPosition(event.target), selectionEnd = event.target.selectionEnd, isRange = selectionStart !== selectionEnd, pattern = $element.attr("tw-presentation-pattern"), separators = countSeparatorsBeforeCursor(pattern, selectionStart);
                        $timeout(function() {
                            var value = $element.val();
                            if (key === keys.backspace) {
                                var newVal = value;
                                if (separators) {
                                    var adjust = separators > 1 ? 1 : 0;
                                    newVal = isRange ? removeCharacters(value, selectionStart - separators + 1, selectionStart - adjust) : removeCharacters(value, selectionStart - separators, selectionStart - adjust);
                                }
                                $element.val(format(unformat(newVal))), ngModelController.$setViewValue(newVal), 
                                setCursorPosition(event.target, getPositionAfterBackspace(pattern, $element[0], selectionStart, selectionEnd));
                            } else {
                                reformatControl($element);
                                var newPosition = getPositionAfterKeypress(pattern, $element[0], selectionStart + 1);
                                setCursorPosition(event.target, newPosition);
                            }
                        });
                    }
                }
                var ngModelController = $element.controller("ngModel");
                $scope.$watch($scope.twPresentationPattern, function(newValue, oldValue) {
                    console.log(newValue);
                }), ngModelController.$render = function() {
                    console.log("render"), $element.val(format(ngModelController.$viewValue));
                }, ngModelController.$formatters.push(function(value) {
                    return console.log("formatters"), format(value);
                }), ngModelController.$parsers.push(function(value) {
                    return console.log("parsers"), unformat(value);
                }), $timeout(function() {
                    var originalMinLength = ngModelController.$validators.minlength, originalMaxLength = ngModelController.$validators.maxlength;
                    originalMinLength && (ngModelController.$validators.minlength = function(modelValue, viewValue) {
                        return console.log("minlength"), originalMinLength(modelValue, unformat(viewValue));
                    }), originalMaxLength && (ngModelController.$validators.maxlength = function(modelValue, viewValue) {
                        return console.log("maxlength"), originalMaxLength(modelValue, unformat(viewValue));
                    });
                }), $element.bind("change", listener), $element.bind("keydown", function(event) {
                    modifyValue(event);
                }), $element.bind("paste", function(event) {
                    var selectionStart = $element[0].selectionStart, originalLength = $element.val().length;
                    $timeout(function() {
                        console.log("paste");
                        var newLength = $element.val().length, newPosition = selectionStart + (newLength - originalLength);
                        $element[0].setSelectionRange(newPosition, newPosition), listener();
                    });
                }), $element.bind("cut", function() {
                    var selectionStart = $element[0].selectionStart;
                    $timeout(function() {
                        listener(), $element[0].setSelectionRange(selectionStart, selectionStart);
                    });
                }), $element.bind("copy", function() {
                    var selectionStart = $element[0].selectionStart, selectionEnd = $element[0].selectionEnd;
                    $timeout(function() {
                        $element[0].setSelectionRange(selectionStart, selectionEnd);
                    });
                });
                var keys = {
                    cmd: 224,
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
                }, reservedKeys = [ keys.cmd, keys.enter, keys.shift, keys.ctrl, keys.alt, keys.left, keys.up, keys.right, keys.down ];
            } ]
        };
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