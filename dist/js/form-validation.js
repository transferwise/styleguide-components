angular.module("tw.form-validation", []);
!function(angular) {
    "use strict";
    function checkValid(formControl, formGroup) {
        setTimeout(function() {
            return formControl.hasClass("ng-invalid") ? void (formControl.hasClass("ng-touched") && formGroup.addClass("has-error")) : void formGroup.removeClass("has-error");
        }, 10);
    }
    function TwFormControlValidation() {
        return {
            restrict: "C",
            link: function(scope, element) {
                var formControl = $(element), formGroup = formControl.closest(".form-group");
                formControl.on("blur keyup", function() {
                    checkValid(formControl, formGroup);
                }).on("invalid", function(event) {
                    event.preventDefault();
                }), formControl.filter("select").on("change", function() {
                    checkValid(formControl, formGroup);
                });
            }
        };
    }
    angular.module("tw.form-validation").directive("formControl", TwFormControlValidation);
}(window.angular), function(angular) {
    "use strict";
    function TwFormValidation() {
        return {
            restrict: "E",
            link: function(scope, element) {
                $(element).on("submit", function() {
                    $(element).find(".form-control.ng-invalid").closest(".form-group").addClass("has-error");
                    var invalidControl = $(element).find("input[type=checkbox].ng-invalid, input[type=radio].ng-invalid");
                    return invalidControl.closest(".checkbox, .radio").addClass("has-error"), invalidControl.parents(".form-group").addClass("has-error"), 
                    !0;
                });
            }
        };
    }
    angular.module("tw.form-validation").directive("form", TwFormValidation);
}(window.angular), function(angular) {
    function TwInputValidation() {
        function checkValid(input, label, formGroup) {
            setTimeout(function() {
                input.hasClass("ng-invalid") ? (label.addClass("has-error"), formGroup.addClass("has-error")) : (label.removeClass("has-error"), 
                checkFormGroup(formGroup));
            });
        }
        function checkFormGroup(formGroup) {
            var formGroupInvalidInputs = formGroup.find("input.ng-invalid"), formGroupValidInputsContainers = formGroup.find("input.ng-valid").closest(".checkbox, .radio");
            setTimeout(function() {
                formGroupValidInputsContainers.removeClass("has-error"), 0 === formGroupInvalidInputs.length && formGroup.removeClass("has-error");
            });
        }
        function link(scope, element, attrs) {
            if (attrs.type) {
                var type = attrs.type.toLowerCase();
                if (("radio" === type || "checkbox" === type) && 0 !== $(element).closest(labelSelector).length) {
                    var formControl = $(element), label = formControl.closest("label");
                    label.on("click", function() {
                        console.log("click!"), checkValid(formControl, formControl.closest(".checkbox, .radio"), formControl.closest(".form-group"));
                    });
                }
            }
        }
        var labelSelector = ".checkbox > label, .radio > label";
        return {
            restrict: "E",
            link: link
        };
    }
    angular.module("tw.form-validation").directive("input", TwInputValidation);
}(window.angular);