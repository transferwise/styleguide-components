angular.module("tw.form-styling", []);
!function(angular) {
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
                var options = {};
                element.attr("data-trigger") ? "hover" === element.attr("data-trigger") && (options.trigger = "hover focus") : options.trigger = "focus", 
                element.attr("data-placement") || (options.placement = "top"), element.attr("data-content-html") && (options.html = !0), 
                element.popover(options), element.prop("tabindex", "0").prop("role", "button");
            }
        };
    }
    angular.module("tw.form-styling").directive("twPopOver", TwPopOver);
}(window.angular), function(angular) {
    function TwToolTip() {
        return {
            restrict: "A",
            link: function(scope, element) {
                if (!element.tooltip) return void console.log("twToolTip requires bootstrap.js");
                var options = {};
                element.attr("data-placement") || (options.placement = "top"), element.tooltip(options), 
                element.prop("tabindex", "0");
            }
        };
    }
    angular.module("tw.form-styling").directive("twToolTip", TwToolTip);
}(window.angular);