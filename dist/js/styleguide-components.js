angular.module("tw.styleguide-components", []);
!function(angular) {
    "use strict";
    function checkValid(formControl, formGroup) {
        formControl.hasClass("ng-invalid") && formControl.hasClass("ng-touched") ? formGroup.addClass("has-error") : formGroup.removeClass("has-error");
    }
    function TwActiveFormControl() {
        return {
            restrict: "C",
            link: function(scope, element) {
                var potentialParents = ".form-group, .checkbox > label, .radio > label", formControls = $(element), formGroup = formControls.parents(".form-group");
                formControls.on("focus", function() {
                    var formControl = $(this);
                    formControl.parents(potentialParents).addClass("focus");
                }).on("blur", function() {
                    var formControl = $(this);
                    formControl.parents(potentialParents).removeClass("focus"), checkValid(formControl, formGroup);
                }).on("keyup", function() {
                    var formControl = $(this);
                    setTimeout(function() {
                        checkValid(formControl, formGroup);
                    });
                }).on("invalid", function(event) {
                    event.preventDefault();
                }), formControls.filter("select").on("change", function() {
                    var formControl = $(this);
                    setTimeout(function() {
                        checkValid(formControl, formGroup);
                    });
                });
            }
        };
    }
    angular.module("tw.styleguide-components").directive("formControl", TwActiveFormControl);
}(window.angular), function(angular) {
    "use strict";
    function TwInvalid() {
        return {
            restrict: "E",
            link: function(scope, element) {
                $(element).on("submit", function() {
                    var invalid = $(element).find(".form-control.ng-invalid");
                    return invalid.parents(".form-group").addClass("has-error"), !0;
                });
            }
        };
    }
    angular.module("tw.styleguide-components").directive("form", TwInvalid);
}(window.angular), function(angular) {
    function TwInput() {
        function onFocus() {
            $(this).parents(parents).addClass("focus");
        }
        function onBlur() {
            $(this).parents(parents).removeClass("focus");
        }
        function onClick(event) {
            fakeClick(this), event.stopPropagation();
        }
        function fakeClick(buttonReplacement) {
            var input = $(buttonReplacement).parents("label").find("input");
            input.click();
        }
        function onKeypress(event) {
            13 === (event.keyCode ? event.keyCode : event.which) && fakeClick(this);
        }
        var parents = ".form-group, .checkbox > label, .radio > label", checkboxTemplate = "<button type='button' class='input-replacement'><span class='glyphicon glyphicon-ok'></span></button>", radioTemplate = "<button type='button' class='input-replacement'><span></span></button>", disabledReplacement = "<span class='disabled-replacement input-replacement'><span><span></span>";
        return {
            restrict: "E",
            link: function(scope, element, attrs) {
                if (attrs.type) {
                    var type = attrs.type.toLowerCase();
                    if (("radio" === type || "checkbox" === type) && 0 !== $(element).parents(parents).length) {
                        var replacement;
                        replacement = $("radio" === type ? radioTemplate : checkboxTemplate), replacement.keypress(onKeypress).click(onClick).focus(onFocus).blur(onBlur), 
                        $(element).hide().after(replacement), replacement.after(disabledReplacement);
                    }
                }
            }
        };
    }
    angular.module("tw.styleguide-components").directive("input", TwInput);
}(window.angular);