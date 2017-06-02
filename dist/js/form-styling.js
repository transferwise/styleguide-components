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
        function cursorIsAfterSeparator(value, position, separator) {
            return value.substring(position - separator.length - 1, position - 1) === separator;
        }
        function cursorIsAfterSeparatorPlusOne(value, position, separator) {
            return cursorIsAfterSeparator(value, position + 1, separator);
        }
        function removeCharacterAndSeparator(value, position, separator) {
            return value.substring(0, position - separator.length) + value.substring(position, value.length);
        }
        return {
            restrict: "A",
            require: "ngModel",
            controller: [ "$element", "$timeout", function($element, $timeout) {
                function listener() {
                    var rawValue = $element.val();
                    $element.val(format(rawValue));
                }
                function unformat(value) {
                    if (!value) return value;
                    var regex = new RegExp(separator, "g");
                    return value.replace(regex, "");
                }
                function format(value) {
                    if (value = unformat(value), !value) return "";
                    var presentationValue = "";
                    return sectionLengths.forEach(function(sectionLength, index) {
                        presentationValue += value.substring(0, sectionLength), value = value.substring(sectionLength, value.length), 
                        index + 1 < sectionLengths.length && value.length && (console.log("ADD"), presentationValue += separator);
                    }), presentationValue += value;
                }
                function separatorsBeforeCursor(value, cursorPosition, separator) {
                    var charsBeforeCursor = value.substring(0, cursorPosition), charsWithoutSeparators = unformat(charsBeforeCursor);
                    return (charsBeforeCursor.length - charsWithoutSeparators.length) / separator.length;
                }
                function getCursorPosition(element) {
                    return element.selectionStart;
                }
                function setCursorPosition(element, position) {
                    element.setSelectionRange(position, position);
                }
                function modifyValue(event) {
                    var key = event.keyCode || event.which, pos = getCursorPosition(event.target), separatorsBeforeChange = separatorsBeforeCursor($element.val(), pos, separator);
                    return reservedKeys.indexOf(key) >= 0 ? void console.log("reserved!") : void $timeout(function() {
                        listener();
                        var nextPos = 8 === key ? pos - separator.length : pos + separator.length, value = $element.val(), separatorsAfterChange = separatorsBeforeCursor($element.val(), nextPos, separator);
                        8 === key && (cursorIsAfterSeparator(value, pos, separator) ? $element.val(format(removeCharacterAndSeparator(value, pos, separator))) : cursorIsAfterSeparatorPlusOne(value, pos, separator) && $element.val(format(removeCharacterAndSeparator(value, pos - 1, separator)))), 
                        setCursorPosition(event.target, nextPos + (separatorsAfterChange - separatorsBeforeChange) * separator.length);
                    });
                }
                var ngModelController = $element.controller("ngModel");
                console.log("presentation pattern");
                var pattern = $element.attr("tw-presentation-pattern"), separator = "-/", sectionLengths = pattern.split("-").map(function(val) {
                    return parseInt(val, 10);
                });
                console.log(pattern), console.log(separator), console.log(sectionLengths), ngModelController.$render = function() {
                    $element.val(format(ngModelController.$viewValue));
                }, ngModelController.$parsers.push(function(value) {
                    return unformat(value);
                }), ngModelController.$validators.custom = function(newValue) {
                    return console.log("Validating: " + newValue), !0;
                }, $timeout(function() {
                    ngModelController.$validators.maxlength = function(newValue) {
                        return console.log("Max Validating: " + newValue), newValue.length <= 9;
                    };
                }), $element.bind("change", listener), $element.bind("keydown", function(event) {
                    console.log("keydown: " + event.which), console.log(ngModelController.$modelValue), 
                    console.log(ngModelController.$viewValue), console.log(ngModelController.$valid), 
                    modifyValue(event);
                }), $element.bind("keypress", function(event) {
                    console.log("keypress"), console.log(ngModelController.$modelValue), console.log(ngModelController.$viewValue), 
                    console.log(ngModelController.$valid);
                }), $element.bind("keyup", function(event) {
                    console.log("keyup"), console.log(ngModelController.$modelValue), console.log(ngModelController.$viewValue), 
                    console.log(ngModelController.$valid);
                }), $element.bind("paste cut", function() {
                    $timeout(listener), setCursorPosition($element[0], $element.val().length);
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
}(window.angular);