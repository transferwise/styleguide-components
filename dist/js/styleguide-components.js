angular.module("tw.form-validation", []);
angular.module("tw.form-styling", []);
angular.module("tw.form-components", []);
angular.module("tw.styleguide-components", ['tw.form-validation', 'tw.form-styling', 'tw.form-components']);
!function(angular) {
    "use strict";
    function TwDateController($scope, $element) {
        function init() {
            vm.month = 1, vm.dateMode = typeof vm.date, $scope.$watch("vm.date", function(date) {
                vm.explodeDate(date);
            }), vm.explodeDate(vm.date), vm.months = getMonths(vm.locale), "" === vm.required && (vm.required = !0);
        }
        function getMonths(locale) {
            var monthName, date = new Date();
            if (!date.toLocaleDateString) return getEnglishMonths();
            locale || (locale = "en-GB");
            try {
                date.toLocaleDateString(locale, {
                    month: "long"
                });
            } catch (ex) {
                return getEnglishMonths();
            }
            for (var monthNameRegex = /^[a-zA-Z ]+$/, months = [], i = 0; 12 > i; i++) date.setMonth(i), 
            monthName = date.toLocaleDateString(locale, {
                month: "long"
            }), monthName = monthNameRegex.test(monthName) ? monthName.charAt(0).toUpperCase() + monthName.slice(1) : monthName.replace(/\d+/g, "").replace(/\W+/g, ""), 
            months.push({
                id: i + 1,
                name: monthName
            });
            return months;
        }
        function getEnglishMonths() {
            return [ {
                id: 1,
                name: "January"
            }, {
                id: 2,
                name: "February"
            }, {
                id: 3,
                name: "March"
            }, {
                id: 4,
                name: "April"
            }, {
                id: 5,
                name: "May"
            }, {
                id: 6,
                name: "June"
            }, {
                id: 7,
                name: "July"
            }, {
                id: 8,
                name: "August"
            }, {
                id: 9,
                name: "September"
            }, {
                id: 10,
                name: "October"
            }, {
                id: 11,
                name: "November"
            }, {
                id: 12,
                name: "December"
            } ];
        }
        function explodeDate(date) {
            var dateObj;
            if (date) {
                if (dateObj = "string" == typeof date ? new Date(date) : date, !validDate(dateObj)) return vm.day = null, 
                vm.month = 1, void (vm.year = null);
                vm.day = dateObj.getUTCDate(), vm.month = dateObj.getUTCMonth() + 1, vm.year = dateObj.getUTCFullYear();
            }
        }
        function updateDate() {
            var dateObj;
            if (!vm.day || null === vm.month || void 0 === vm.month || !vm.year) return vm.date = null, 
            void $element.addClass("ng-invalid-pattern");
            vm.day = vm.correctHighDay(vm.day, vm.month, vm.year), dateObj = new Date(Date.UTC(Number(vm.year), Number(vm.month) - 1, Number(vm.day)));
            var minObj = new Date(vm.ngMin), maxObj = new Date(vm.ngMax);
            return minObj > dateObj ? void $element.addClass("ng-invalid-min") : dateObj > maxObj ? void $element.addClass("ng-invalid-max") : ($element.removeClass("ng-invalid-min"), 
            $element.removeClass("ng-invalid-max"), $element.removeClass("ng-invalid-pattern"), 
            void (vm.date = "string" === vm.dateMode ? dateObj.getUTCFullYear() + "-" + pad(dateObj.getUTCMonth() + 1) + "-" + pad(dateObj.getUTCDate()) : dateObj));
        }
        function pad(n) {
            return 10 > n ? "0" + n : n;
        }
        function validDate(dateObj) {
            return "[object Date]" === Object.prototype.toString.call(dateObj) && !isNaN(dateObj.getTime());
        }
        function correctHighDay(day, month, year) {
            var dateObj = new Date(0);
            return dateObj.setUTCFullYear(year), dateObj.setUTCMonth(month), dateObj.setUTCDate(0), 
            day > dateObj.getUTCDate() ? dateObj.getUTCDate() : day;
        }
        var vm = this;
        vm.init = init, vm.explodeDate = explodeDate, vm.updateDate = updateDate, vm.correctHighDay = correctHighDay, 
        vm.pad = pad, vm.validDate = validDate, init();
    }
    angular.module("tw.form-components").controller("TwDateController", TwDateController), 
    TwDateController.$inject = [ "$scope", "$element" ];
}(window.angular), function(angular) {
    "use strict";
    function TwDateDirective() {
        var directive = {
            bindToController: !0,
            controller: "TwDateController",
            controllerAs: "vm",
            replace: !0,
            restrict: "E",
            scope: {
                date: "=ngModel",
                ngMin: "=ngMin",
                ngMax: "=ngMax",
                disabled: "@",
                required: "@",
                locale: "@"
            },
            templateUrl: "tw-date.html",
            link: TwDateLink
        };
        return directive;
    }
    function TwDateLink(scope, element, attrs) {
        attrs.ngDisabled && scope.$parent.$watch(attrs.ngDisabled, function(isDisabled) {
            scope.disabled = isDisabled;
        }), attrs.ngRequired && scope.$parent.$watch(attrs.ngRequired, function(isRequired) {
            scope.required = isRequired;
        }), element.find("[name=month]").change(function() {
            element.find("[name=day]").focus().blur();
        });
    }
    angular.module("tw.form-components").directive("twDate", TwDateDirective);
}(window.angular), function(angular) {
    function TwDynamicFormControl() {
        return {
            restrict: "E",
            transclude: !0,
            controllerAs: "vm",
            bindToController: !0,
            controller: [ "$element", function($element) {
                this.change = function() {
                    change($element);
                };
            } ],
            scope: {
                type: "@",
                name: "@",
                id: "@",
                placeholder: "@",
                step: "@",
                options: "=",
                ngModel: "=",
                ngRequired: "=",
                ngDisabled: "=",
                ngMinlength: "=",
                ngMaxlength: "=",
                ngMin: "=",
                ngMax: "=",
                ngPattern: "="
            },
            link: function() {},
            template: "<div ng-switch='vm.type'> 				<input ng-switch-when='text'  					name='{{vm.name}}'  					id='{{vm.id}}' 					type='text' 					class='form-control' 					placeholder='{{vm.placeholder}}' 					ng-model='vm.ngModel' 					ng-required='vm.ngRequired' 					ng-disabled='vm.ngDisabled' 					ng-pattern='vm.ngPattern' 					ng-change='vm.change()' 					ng-minlength='vm.ngMinlength' 					ng-maxlength='vm.ngMaxlength' 					tw-validation />  				<input ng-switch-when='number'  					name='{{vm.name}}'  					id='{{vm.id}}' 					type='number' 					step='{{vm.step}}' 					class='form-control' 					placeholder='{{vm.placeholder}}' 					ng-model='vm.ngModel' 					ng-required='vm.ngRequired' 					ng-disabled='vm.ngDisabled' 					ng-change='vm.change()' 					ng-min='vm.ngMin' 					ng-max='vm.ngMax' 					tw-validation />  				<div ng-switch-when='radio' 					class='radio' 					ng-class='{disabled: vm.ngDisabled}' 					ng-repeat='(value, label) in vm.options track by $index'> 					<label> 						<input type='radio' 							name='{{vm.name}}' 							value='{{value}}' 							ng-model='vm.ngModel' 							ng-required='vm.ngRequired' 							ng-disabled='vm.ngDisabled' /> 						{{label}} 					</label> 				</div> 				<div ng-switch-when='checkbox' 					class='checkbox' 					ng-class='{disabled: vm.ngDisabled}'> 					<label> 						<input type='checkbox' 							name='{{vm.name}}' 							id='{{vm.id}}' 							ng-model='vm.ngModel' 							ng-required='vm.ngRequired' 							ng-disabled='vm.ngDisabled' /> 						{{vm.placeholder}} 					</label> 				</div> 				<select ng-switch-when='select' 					name='{{vm.name}}' 					id='{{vm.id}}' 					class='form-control' 					ng-options='value as label for (value, label) in vm.options track by $index' 					ng-model='vm.ngModel' 					ng-required='vm.ngRequired' 					ng-disabled='vm.ngDisabled' 					ng-change='vm.change()' 					tw-validation> 					<option ng-if='vm.placeholder' value=''> 						{{vm.placeholder}} 					</option> 				</select> 				<ng-transclude class='error-messages'></ng-transclude> 			</div>"
        };
    }
    function change($element) {
        var formGroup = $element.closest(".form-group");
        setTimeout(function() {
            $element.hasClass("ng-invalid") ? formGroup.addClass("has-error") : formGroup.removeClass("has-error");
        });
    }
    angular.module("tw.form-components").directive("twDynamicFormControl", TwDynamicFormControl);
}(window.angular), function(angular) {
    function TwLoader() {
        return {
            restrict: "E",
            template: "<div class='loader'> 			  <div class='loader-spinner'></div> 			  <div class='loader-flag'> 			    <svg xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='-2 -2 56 56'> 			      <polygon class='loader-flag-stroke'  stroke='#00B9FF' stroke-width='2' stroke-linejoin='miter' stroke-linecap='round' stroke-miterlimit='10' stroke-dasharray='300' stroke-dashoffset='300' fill='none' points='24.6,27.3 0,27.3 14.3,13.7 6.1,0 48.2,0 26.3,52 19.5,52 39.2,5.5 16.8,5.5 21.6,13.6 13.4,21.8 27,21.8' /> 			    </svg> 			    <svg class='loader-flag-fill' xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='0 2 52 48'> 			      <polygon fill='#00B9FF' points='6.1,0 14.3,13.7 0,27.3 24.6,27.3 27,21.8 13.4,21.8 21.6,13.6 16.8,5.5 39.2,5.5 19.5,52 26.3,52 48.2,0 '/> 			    </svg> 			  </div> 			</div>"
        };
    }
    angular.module("tw.form-components").directive("twLoader", TwLoader);
}(window.angular), function(angular) {
    "use strict";
    function TwFormControlStyling() {
        return {
            restrict: "C",
            link: function(scope, element) {
                var formGroup = $(element).closest(".form-group");
                $(element).on("focus", function() {
                    formGroup.addClass("focus");
                }).on("blur", function() {
                    formGroup.removeClass("focus");
                });
            }
        };
    }
    angular.module("tw.form-styling").directive("formControl", TwFormControlStyling);
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
        var labelSelector = ".checkbox > label, .radio > label", checkboxTemplate = "<button type='button' class='input-replacement'><span class='glyphicon glyphicon-ok'></span></button>", radioTemplate = "<button type='button' class='input-replacement'><span></span></button>", disabledReplacement = "<span class='disabled-replacement input-replacement'><span><span></span>";
        return {
            restrict: "E",
            link: link
        };
    }
    angular.module("tw.form-styling").directive("input", TwInputStyling);
}(window.angular), function(angular) {
    "use strict";
    function TwFormControlValidation() {
        return {
            restrict: "AC",
            require: "ngModel",
            link: validationLink
        };
    }
    function validationLink(scope, element) {
        var formControl = $(element), formGroup = formControl.closest(".form-group");
        formControl.on("blur keyup", function() {
            checkValid(formControl, formGroup);
        }).on("invalid", function(event) {
            event.preventDefault();
        }), formControl.filter("select").on("change", function() {
            checkValid(formControl, formGroup);
        });
    }
    function checkValid(formControl, formGroup) {
        setTimeout(function() {
            return formControl.hasClass("ng-invalid") ? void (formControl.hasClass("ng-touched") && !formControl.hasClass("ng-pristine") && formGroup.addClass("has-error")) : void formGroup.removeClass("has-error");
        }, 10);
    }
    angular.module("tw.form-validation").directive("twValidation", TwFormControlValidation);
}(window.angular), function(angular) {
    "use strict";
    function TwFormValidation() {
        return {
            restrict: "E",
            link: function(scope, element) {
                $(element).on("submit", function() {
                    $(element).find("[tw-validation].ng-invalid").closest(".form-group").addClass("has-error");
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
                        checkValid(formControl, formControl.closest(".checkbox, .radio"), formControl.closest(".form-group"));
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