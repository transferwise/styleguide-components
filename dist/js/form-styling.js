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
    function TwInputStyling() {
        function onFocus() {
            $(this).closest(".form-group").addClass("focus"), $(this).closest(labelSelector).addClass("focus");
        }
        function onBlur() {
            $(this).closest(".form-group").removeClass("focus"), $(this).closest(labelSelector).removeClass("focus");
        }
        function onClick(event) {
            fakeClick(this), event.stopPropagation();
        }
        function fakeClick(buttonReplacement) {
            var formControl = $(buttonReplacement).closest("label").find("input");
            "undefined" != typeof formControl[0] && (MouseEvent ? formControl[0].dispatchEvent(new MouseEvent("click", {
                view: window,
                bubbles: !0,
                cancelable: !0
            })) : formControl.click());
        }
        function onKeypress(event) {
            13 === (event.keyCode ? event.keyCode : event.which) && fakeClick(this);
        }
        function link(scope, element, attrs, ctrl) {
            if (attrs.type) {
                var type = attrs.type.toLowerCase();
                if (("radio" === type || "checkbox" === type) && 0 !== $(element).closest(labelSelector).length) {
                    var replacement;
                    replacement = "radio" === type ? $(radioTemplate) : $(checkboxTemplate), replacement.keypress(onKeypress).click(onClick).focus(onFocus).blur(onBlur), 
                    $(element).addClass("sr-only").after(replacement), replacement.after(disabledReplacement);
                }
            }
        }
        var labelSelector = ".checkbox > label, .radio > label", checkboxTemplate = "<button type='button' class='input-replacement'><span class='glyphicon glyphicon-ok'></span></button>", radioTemplate = "<button type='button' class='input-replacement'><span></span></button>", disabledReplacement = "<span class='disabled-replacement input-replacement'><span></span></span>";
        return {
            restrict: "EA",
            link: link
        };
    }
    angular.module("tw.form-styling").directive("twInput", TwInputStyling);
}(window.angular), function(angular) {
    "use strict";
    function TwSelectDirective() {
        return {
            require: "ngModel",
            bindToController: !0,
            controller: function() {},
            controllerAs: "$ctrl",
            link: TwSelectLink,
            replace: !1,
            restrict: "EA",
            scope: {
                ngModel: "=",
                ngRequired: "=",
                ngDisabled: "=",
                ngChange: "&",
                ngBlur: "&",
                options: "=",
                name: "@",
                disabled: "@",
                required: "@",
                placeholder: "@"
            },
            template: " 				<div class='btn-group btn-block'> 					<button type='button' class='btn btn-input dropdown-toggle' 						data-toggle='dropdown' aria-expanded='false' 						ng-disabled='$ctrl.ngDisabled' 						tw-focusable> 						<i class='icon {{$ctrl.selected.icon}}' ng-if='$ctrl.selected && $ctrl.selected.icon'> 						</i><span class='selected' ng-if='$ctrl.ngModel'>{{$ctrl.selected.label}}</span> 						<span class='form-control-placeholder' ng-if='!$ctrl.ngModel'>{{$ctrl.placeholder}}</span> 						<span class='caret'></span> 					</button> 					<ul class='dropdown-menu' role='menu'> 						<li ng-class='{active: !$ctrl.ngModel}' 							ng-if='$ctrl.placeholder && !$ctrl.ngRequired'> 							<a href='' value='' tw-focusable> 								{{$ctrl.placeholder}} 							</a> 						</li> 						<li 							ng-repeat='option in $ctrl.options' 							ng-class='{active: $ctrl.ngModel === option.value}'> 							<a href='' value='{{option.value}}' class='tw-select-option' tw-focusable> 								<i class='icon {{option.icon}}' ng-if='option.icon'></i>{{option.label}} 							</a> 						</li> 					</ul> 					<input type='hidden' name='{{$ctrl.name}}' value='{{$ctrl.ngModel}}' 					 	ng-disabled='$ctrl.ngDisabled' /> 				</div>"
        };
    }
    function TwSelectLink(scope, element, attrs, ngModel) {
        var $ctrl = scope.$ctrl, options = scope.$ctrl.options;
        preSelectModelValue(ngModel, $ctrl, options), setDefaultIfRequired(ngModel, $ctrl, element, attrs), 
        element.find(".btn").on("keypress click", function(event) {
            ngModel.$setTouched();
        }), element.find(".btn").on("keypress", function(event) {
            higlightFirstItemMatcingLetter(ngModel, $ctrl, element, options, event.key), element.find(".active a").focus();
        }), scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
            newValue !== oldValue && ngModel.$setDirty(), modelChange(newValue, oldValue, $ctrl);
        }), element.find(".btn").on("click", function() {
            setTimeout(function() {
                element.find(".active a").focus();
            });
        }), element.find(".btn").on("blur", function() {
            scope.$evalAsync(function() {
                element.find(".btn-group").hasClass("open") || blur(ngModel, element, $ctrl);
            }, 100);
        }), element.find("ul").on("click", "a", function(event) {
            if ($(event.target).hasClass("tw-select-option")) {
                var option = findOptionFromValue(options, this.getAttribute("value"));
                selectOption(ngModel, $ctrl, option);
            } else resetOption(ngModel, $ctrl);
            element.find(".btn").focus();
        }), element.find("ul").on("focus", "a", function(event) {
            if ($(event.target).hasClass("tw-select-option")) {
                var option = findOptionFromValue(options, this.getAttribute("value"));
                selectOption(ngModel, $ctrl, option);
            } else resetOption(ngModel, $ctrl);
        }), element.find("ul").on("blur", "a", function(event) {
            scope.$evalAsync(function() {
                0 !== element.find(".btn:focus").length || element.find(".btn-group").hasClass("open") || blur(ngModel, element, $ctrl);
            }, 100);
        }), element.find("ul").on("keypress", "a", function(event) {
            higlightFirstItemMatcingLetter(ngModel, $ctrl, element, options, event.key), element.find(".active a").focus();
        });
    }
    function preSelectModelValue(ngModel, $ctrl, options) {
        if ($ctrl.ngModel) {
            var option = findOptionFromValue(options, $ctrl.ngModel);
            selectOption(ngModel, $ctrl, option);
        }
    }
    function modelChange(newVal, oldVal, $ctrl) {
        if (newVal !== oldVal) {
            var option = findOptionFromValue($ctrl.options, newVal);
            option ? $ctrl.selected = option : $ctrl.selected = null;
        }
    }
    function findOptionFromValue(options, value) {
        var optionMatch = !1;
        return options.forEach(function(option) {
            String(option.value) === String(value) && (optionMatch = option);
        }), optionMatch;
    }
    function setDefaultIfRequired(ngModel, $ctrl, $element, $attrs) {
        ($ctrl.ngRequired || $attrs.required) && !$ctrl.ngModel && $ctrl.options[0] && selectOption(ngModel, $ctrl, $ctrl.options[0]);
    }
    function selectOption(ngModel, $ctrl, option) {
        ngModel.$setViewValue(option.value), $ctrl.selected = option;
    }
    function resetOption(ngModel, $ctrl) {
        ngModel.$setViewValue(""), $ctrl.selected = !1;
    }
    function higlightFirstItemMatcingLetter(ngModel, $ctrl, element, options, letter) {
        var letterLower = letter ? letter.toLowerCase() : "", found = !1;
        options.forEach(function(option) {
            found || option.label.substring(0, 1).toLowerCase() === letterLower && (found = !0, 
            selectOption(ngModel, $ctrl, option));
        });
    }
    function blur(ngModel, $element, $ctrl) {
        $ctrl.ngBlur();
    }
    angular.module("tw.form-components").directive("twSelect", TwSelectDirective);
}(window.angular);