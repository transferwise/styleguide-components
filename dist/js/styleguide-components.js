angular.module("tw.styleguide-components", []);
!function(angular) {
    "use strict";
    function checkValid(formControl, formGroup) {
        setTimeout(function() {
            formControl.hasClass("ng-invalid") ? formControl.hasClass("ng-touched") && formGroup.addClass("has-error") : formGroup.removeClass("has-error");
        });
    }
    function TwFormControlValidation() {
        return {
            restrict: "C",
            link: function(scope, element) {
                {
                    var potentialParents = ".form-group, .checkbox > label, .radio > label", formControl = $(element), formGroup = formControl.closest(".form-group");
                    formControl.closest(".checkbox > label, .radio > label");
                }
                formControl.on("focus", function() {
                    formControl.parents(potentialParents).addClass("focus");
                }).on("blur", function() {
                    formControl.parents(potentialParents).removeClass("focus"), checkValid(formControl, formGroup);
                }).on("keyup", function() {
                    checkValid(formControl, formGroup);
                }).on("invalid", function(event) {
                    event.preventDefault();
                }), formControl.filter("select").on("change", function() {
                    checkValid(formControl, formGroup);
                });
            }
        };
    }
    angular.module("tw.styleguide-components").directive("formControl", TwFormControlValidation);
}(window.angular), function(angular) {
    "use strict";
    function TwFormValidation() {
        return {
            restrict: "E",
            link: function(scope, element) {
                $(element).on("submit", function() {
                    var invalid = $(element).find(".form-control.ng-invalid");
                    invalid.parents(".form-group").addClass("has-error");
                    var invalidCheckbox = $(element).find("input[type=checkbox].ng-invalid, input[type=radio].ng-invalid");
                    return invalidCheckbox.parents(".form-group, .checkbox, .radio").addClass("has-error"), 
                    !0;
                });
            }
        };
    }
    angular.module("tw.styleguide-components").directive("form", TwFormValidation);
}(window.angular), function(angular) {
    function TwInputValidation() {
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
            var formControl = $(buttonReplacement).closest("label").find("input");
            formControl.click(), checkValid(formControl, formControl.closest(".checkbox, .radio"), formControl.closest(".form-group"));
        }
        function onKeypress(event) {
            13 === (event.keyCode ? event.keyCode : event.which) && fakeClick(this);
        }
        function checkValid(input, label, formGroup) {
            setTimeout(function() {
                input.hasClass("ng-invalid") ? (label.addClass("has-error"), formGroup.addClass("has-error")) : (label.removeClass("has-error"), 
                checkFormGroup(formGroup));
            });
        }
        function checkFormGroup(formGroup) {
            var formGroupInvalidInputs = formGroup.find("input.ng-invalid"), formGroupValidInputsContainers = formGroup.find("input.ng-valid").closest("checkbox, .radio");
            setTimeout(function() {
                formGroupValidInputsContainers.removeClass("has-error"), 0 === formGroupInvalidInputs.length && formGroup.removeClass("has-error");
            });
        }
        function link(scope, element, attrs) {
            if (attrs.type) {
                var type = attrs.type.toLowerCase();
                if (("radio" === type || "checkbox" === type) && 0 !== $(element).parents(parents).length) {
                    var replacement;
                    replacement = $("radio" === type ? radioTemplate : checkboxTemplate), replacement.keypress(onKeypress).click(onClick).focus(onFocus).blur(onBlur), 
                    $(element).hide().after(replacement), replacement.after(disabledReplacement);
                    var formControl = $(element), label = formControl.closest("label"), formGroup = formControl.closest(".form-group"), labelContainer = formControl.closest(".checkbox, .radio");
                    label.on("click", function() {
                        checkValid(formControl, labelContainer, formGroup);
                    });
                }
            }
        }
        var parents = ".form-group, .checkbox > label, .radio > label", checkboxTemplate = "<button type='button' class='input-replacement'><span class='glyphicon glyphicon-ok'></span></button>", radioTemplate = "<button type='button' class='input-replacement'><span></span></button>", disabledReplacement = "<span class='disabled-replacement input-replacement'><span><span></span>";
        return {
            restrict: "E",
            link: link
        };
    }
    angular.module("tw.styleguide-components").directive("input", TwInputValidation);
}(window.angular);