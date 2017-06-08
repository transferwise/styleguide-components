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
        function getPositionAfterBackspace(pattern, position) {
            var separators = separatorsBeforeCursor(pattern, position);
            return position - separators - 1;
        }
        function getPositionAfterKeypress(pattern, position) {
            var separators = separatorsAfterCursor(pattern, position);
            return position + separators + 1;
        }
        function separatorsAfterCursor(pattern, position) {
            for (var separators = 0, i = position; i < pattern.length; i++) "*" !== pattern[i] && separators++;
            return separators;
        }
        function separatorsBeforeCursor(pattern, position) {
            for (var separators = 0; pattern[position - separators - 1] && "*" !== pattern[position - separators - 1]; ) separators++;
            return separators;
        }
        function removeCharacters(value, first, last) {
            return value.substring(0, first - 1) + value.substring(last - 1, value.length);
        }
        function newCursorPosition(element, pattern, value) {
            for (var separators = 0, moveCursor = 0, cursorPosition = getCursorPosition(element), i = 0; i < pattern.length && i <= value.length + separators; i++) "*" === pattern[i] ? value[i - separators] && (moveCursor = 0) : (separators++, 
            i < cursorPosition && moveCursor++);
            moveCursor && (console.log("moveCursor"), setCursorPosition(element, cursorPosition + moveCursor));
        }
        function getCursorPosition(element) {
            return console.log("getPos " + element.selectionStart), element.selectionStart;
        }
        function setCursorPosition(element, position) {
            console.log("setPos " + position), element.setSelectionRange(position, position);
        }
        return {
            restrict: "A",
            require: "ngModel",
            scope: {
                twPresentationPattern: "@"
            },
            controller: [ "$element", "$timeout", "$scope", "$attrs", "$parse", "TwTextFormatting", function($element, $timeout, $scope, $attrs, $parse, TwTextFormatting) {
                function listener() {
                    var rawValue = $element.val();
                    console.log("listener"), $element.val(format(unformat(rawValue)));
                }
                function unformat(value) {
                    if (console.log("unformat"), !value) return value;
                    var pattern = $element.attr("tw-presentation-pattern");
                    return TwTextFormatting.unformatUsingPattern(value, pattern);
                }
                function format(value) {
                    if (console.log("format"), !value) return "";
                    var pattern = $element.attr("tw-presentation-pattern"), newValue = TwTextFormatting.formatUsingPattern(value, pattern);
                    return newCursorPosition($element[0], pattern, value), newValue;
                }
                function modifyValue(event) {
                    console.log("keypress");
                    var key = event.keyCode || event.which;
                    if (!(reservedKeys.indexOf(key) >= 0)) {
                        var pos = getCursorPosition(event.target);
                        console.log("initialPos: " + pos), $timeout(function() {
                            var pattern = $element.attr("tw-presentation-pattern"), value = (key === keys.backspace ? pos - 1 : pos + 1, 
                            $element.val());
                            getCursorPosition(event.target);
                            if (key === keys.backspace) {
                                console.log("backspace");
                                var separators = separatorsBeforeCursor(pattern, pos), newVal = value;
                                separators && (newVal = removeCharacters(value, pos - separators, pos), console.log("after remove: " + newVal)), 
                                newVal = format(unformat(newVal)), $element.val(newVal), ngModelController.$setViewValue(newVal), 
                                setCursorPosition(event.target, getPositionAfterBackspace(pattern, pos));
                            } else console.log("timeout"), $element.val(format(unformat($element.val()))), console.log("newPos: " + getPositionAfterKeypress(pattern, pos)), 
                            setCursorPosition(event.target, getPositionAfterKeypress(pattern, pos));
                        });
                    }
                }
                var ngModelController = $element.controller("ngModel");
                console.log($attrs), $scope.$watch($scope.twPresentationPattern, function(newValue, oldValue) {
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
                }), $element.bind("paste cut", function() {
                    $timeout(function() {
                        listener(), setCursorPosition($element[0], $element.val().length);
                    });
                }), $element.bind("copy", function() {
                    $timeout(function() {
                        setCursorPosition($element[0], $element.val().length);
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