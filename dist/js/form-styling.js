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
                if (!element.popover) return void console.log("twPopover requires tooltip from bootstrap.js");
                var options = {};
                element.attr("data-link-text") && element.attr("data-link-target") && (options.template = " \t\t\t\t\t\t<div class='popover' role='tooltip'> \t\t\t\t\t\t\t<div class='arrow'></div> \t\t\t\t\t\t\t<h3 class='popover-title'></h3> \t\t\t\t\t\t\t<div class='popover-content'></div> \t\t\t\t\t\t\t<a href='" + element.attr("data-link-target") + "'>" + element.attr("data-link-text") + "</a> \t\t\t\t\t\t</div>"), 
                element.attr("data-trigger") || (options.trigger = "focus"), element.attr("data-placement") || (options.placement = "top"), 
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