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
        function link(scope, element, attrs) {
            if (attrs.type) {
                var type = attrs.type.toLowerCase();
                if (("radio" === type || "checkbox" === type) && 0 !== $(element).closest(labelSelector).length) {
                    var replacement;
                    replacement = $("radio" === type ? radioTemplate : checkboxTemplate), replacement.keypress(onKeypress).click(onClick).focus(onFocus).blur(onBlur), 
                    $(element).hide().after(replacement), replacement.after(disabledReplacement);
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
            controller: "TwSelectController",
            controllerAs: "vm",
            replace: !1,
            restrict: "EA",
            scope: {
                ngModel: "=",
                ngRequired: "=",
                ngDisabled: "=",
                ngChange: "&",
                twOptions: "=",
                name: "@",
                disabled: "@",
                required: "@",
                placeholder: "@"
            },
            template: "<div class='btn-group btn-block'> 					<button type='button' class='btn btn-input dropdown-toggle' 						data-toggle='dropdown' aria-expanded='false' 						ng-disabled='vm.ngDisabled' 						tw-focusable> 						<span class='form-control-placeholder' ng-if='!vm.selectedText'>{{vm.placeholder}}</span> 						<span ng-if='vm.selectedText'>{{vm.selectedText}}</span> <span class='caret'></span> 					</button> 					<ul class='dropdown-menu' role='menu'> 						<li ng-repeat='option in vm.twOptions' 							ng-class='{active: vm.ngModel === option.value}'> 							<a href='' ng-click='vm.clickOption(option)'>{{option.label}}</a> 						</li> 					</ul> 					<select class='hidden' 						ng-options='option.value as option.label for option in vm.twOptions' 						ng-model='vm.ngModel'> 					</select> 					<input type='hidden' name='{{vm.name}}' value='{{vm.ngModel}}' /> 				</div>"
        };
    }
    function TwSelectController($scope, $element) {
        function init() {
            formGroup = $element.closest(".form-group"), $scope.$watch("vm.ngModel", modelChange), 
            modelChange(vm.ngModel), $element.find(".btn").on("blur", function() {
                checkValid($element, formGroup);
            }), $element.find(".btn").on("keypress", function(event) {
                console.log(event.key);
            });
        }
        function modelChange(newVal, oldVal) {
            if (newVal !== oldVal) {
                var option = findOptionFromValue(newVal);
                vm.selectedText = option ? option.label : null, vm.ngChange ? (console.log("change"), 
                vm.ngChange()) : console.log("no chnage"), checkValid($element, formGroup);
            }
        }
        function findOptionFromValue(value) {
            return vm.twOptions.find(function(option) {
                return option.value === value;
            });
        }
        function clickOption(option) {
            vm.ngModel = option.value;
        }
        function unset() {
            vm.ngModel = null;
        }
        function checkValid(select, formGroup) {
            setTimeout(function() {
                select.hasClass("ng-invalid") ? formGroup.addClass("has-error") : formGroup.removeClass("has-error");
            });
        }
        var formGroup, vm = this;
        vm.clickOption = clickOption, vm.unset = unset, init();
    }
    angular.module("tw.form-components").directive("twSelect", TwSelectDirective), angular.module("tw.form-components").controller("TwSelectController", TwSelectController), 
    TwSelectController.$inject = [ "$scope", "$element" ];
}(window.angular);