angular.module("tw.form-validation", []);
angular.module("tw.form-styling", []);
angular.module("tw.form-components", []);
angular.module("tw.styleguide-components", ['tw.form-validation', 'tw.form-styling', 'tw.form-components']);
!function(angular) {
    "use strict";
    function TwCurrencyInputController($element, $scope, $timeout) {
        function isNumber(value) {
            return !isNaN(parseFloat(value));
        }
        var $ctrl = this, $ngModel = $element.controller("ngModel");
        $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
            newValue !== oldValue && $ngModel.$setDirty();
        }), $element.find("input").on("blur", function() {
            $ngModel.$setTouched(), $element.triggerHandler("blur");
        }), $ngModel.$validators.min = function(modelValue, viewValue) {
            return "undefined" == typeof $ctrl.ngMin || null === $ctrl.ngMin || !isNumber(viewValue) || viewValue >= $ctrl.ngMin;
        }, $ngModel.$validators.max = function(modelValue, viewValue) {
            return "undefined" == typeof $ctrl.ngMax || null === $ctrl.ngMax || !isNumber(viewValue) || viewValue <= $ctrl.ngMax;
        }, $ctrl.changedInputValue = function() {
            $ctrl.ngChange && $timeout($ctrl.ngChange);
        };
    }
    angular.module("tw.form-components").controller("TwCurrencyInputController", TwCurrencyInputController), 
    TwCurrencyInputController.$inject = [ "$element", "$scope", "$timeout" ];
}(window.angular), function(angular) {
    "use strict";
    function TwDateController($element, $log, $scope) {
        function init() {
            if (vm.ngModel) applyDateModelIfValidOrThrowError(), initialisedWithDate = !0; else {
                if (vm.modelType) {
                    if (vm.modelType !== STRING_TYPE && vm.modelType !== OBJECT_TYPE) throw new Error("Invalid modelType, should be " + STRING_TYPE + " or " + OBJECT_TYPE);
                    vm.dateModelType = vm.modelType;
                } else vm.dateModelType = OBJECT_TYPE;
                vm.day = null, vm.month = 0, vm.year = null;
            }
            ngModel = $element.controller("ngModel"), ngModel.$validators.min = function(value) {
                var limit = prepDateLimitForComparison(vm.ngMin, vm.min), dateValue = prepDateValueForComparison(value);
                return !limit || !dateValue || dateValue >= limit;
            }, ngModel.$validators.max = function(value) {
                var limit = prepDateLimitForComparison(vm.ngMax, vm.max), dateValue = prepDateValueForComparison(value);
                return !limit || !dateValue || dateValue <= limit;
            }, setDateRequired(), setDateDisabled(), setDateLocale(), setMonths(), registerWatchers();
        }
        function prepDateLimitForComparison(ngLimit, attrLimit) {
            var limit = ngLimit ? ngLimit : !!attrLimit && attrLimit;
            return !!limit && (limit = "string" == typeof limit ? new Date(limit) : limit, !!validDateObject(limit) && limit);
        }
        function prepDateValueForComparison(dateValue) {
            return "string" == typeof dateValue ? new Date(dateValue) : dateValue;
        }
        function applyDateModelIfValidOrThrowError() {
            if (!validDate(vm.ngModel)) throw new Error("date model passed should either be instance of Date or valid ISO8601 string");
            vm.dateModelType = "string" == typeof vm.ngModel ? STRING_TYPE : OBJECT_TYPE, vm.explodeDateModel(vm.ngModel);
        }
        function setMonths() {
            vm.dateMonths = getMonthsBasedOnIntlSupportForLocale();
        }
        function setDateRequired() {
            vm.dateRequired = void 0 !== vm.ngRequired ? vm.ngRequired : void 0 !== vm.required;
        }
        function setDateDisabled() {
            vm.dateDisabled = void 0 !== vm.ngDisabled ? vm.ngDisabled : void 0 !== vm.disabled;
        }
        function setDateLocale() {
            vm.locale || (vm.locale = DEFAULT_LOCALE_EN), vm.locale.indexOf("US", vm.locale.length - 2) !== -1 ? vm.monthBeforeDay = !0 : vm.monthBeforeDay = !1;
        }
        function explodeDateModel(date) {
            var dateObj = "string" == typeof date ? new Date(date) : date;
            vm.day = dateObj.getDate(), vm.month = dateObj.getMonth(), vm.year = dateObj.getFullYear();
        }
        function validDate(date) {
            return validDateObject(date) || validDateString(date);
        }
        function validDateObject(dateObj) {
            return "[object Date]" === Object.prototype.toString.call(dateObj) && !isNaN(dateObj.getTime());
        }
        function validDateString(dateString) {
            return "string" == typeof dateString && validDateObject(new Date(dateString));
        }
        function registerWatchers() {
            $scope.$watch("vm.day", function(newValue, oldValue) {
                newValue !== oldValue && initialisedWithDate && ngModel.$setDirty();
            }), $scope.$watch("vm.month", function(newValue, oldValue) {
                newValue !== oldValue && (vm.adjustLastDay(), ngModel.$setTouched(), initialisedWithDate && ngModel.$setDirty());
            }), $scope.$watch("vm.year", function(newValue, oldValue) {
                newValue !== oldValue && initialisedWithDate && ngModel.$setDirty();
            }), $scope.$watch("vm.ngModel", function(newValue, oldValue) {
                newValue !== oldValue && validDate(vm.ngModel) && (ngModel.$setDirty(), vm.explodeDateModel(vm.ngModel));
            }), $scope.$watch("vm.ngRequired", function(newValue, oldValue) {
                newValue !== oldValue && setDateRequired();
            }), $scope.$watch("vm.ngDisabled", function(newValue, oldValue) {
                newValue !== oldValue && setDateDisabled();
            }), $scope.$watch("vm.locale", function(newValue, oldValue) {
                newValue !== oldValue && (setDateLocale(), setMonths());
            });
        }
        function getMonthsBasedOnIntlSupportForLocale() {
            var monthNames;
            return isIntlSupportedForLocale(vm.locale) ? monthNames = getMonthNamesForLocale() : ($log.warn('i18n not supported for locale "' + vm.locale + '"'), 
            monthNames = DEFAULT_MONTHS_EN), extendMonthsWithIds(monthNames);
        }
        function isIntlSupportedForLocale(locale) {
            return window.Intl && "object" == typeof window.Intl && window.Intl.DateTimeFormat.supportedLocalesOf([ locale ]).length > 0;
        }
        function getMonthNamesForLocale() {
            for (var date, months = [], i = 0; i < 12; i++) {
                date = new Date(Date.UTC(2e3, i, 15));
                var monthName = date.toLocaleDateString(vm.locale, {
                    month: "long"
                });
                monthName = monthName[0].toUpperCase() + monthName.substring(1), months.push(monthName);
            }
            return months;
        }
        function extendMonthsWithIds(monthNames) {
            return monthNames.map(function(monthName, index) {
                return {
                    value: index,
                    label: monthName
                };
            });
        }
        function isExplodedDatePatternCorrect() {
            return isNumber(vm.year) && isNumber(vm.day) && (isNumber(vm.month) || isNumericString(vm.month));
        }
        function isNumber(value) {
            return "number" == typeof value;
        }
        function isNumericString(value) {
            return "string" == typeof value && !isNaN(Number(vm.month));
        }
        function combineDate() {
            var date = new Date(Date.UTC(Number(vm.year), Number(vm.month), Number(vm.day)));
            return date.setFullYear(vm.year), date;
        }
        function updateDateModelAndValidationClasses() {
            if (vm.adjustLastDay(), !isExplodedDatePatternCorrect()) return void ngModel.$setViewValue(null);
            var dateObj = combineDate();
            if (vm.dateModelType === STRING_TYPE) {
                var isoString = dateObj.toISOString(), dateString = isoString.substring(0, isoString.indexOf("T"));
                ngModel.$setViewValue(dateString);
            } else ngModel.$setViewValue(dateObj);
        }
        function adjustLastDay() {
            var day = Number(vm.day), month = Number(vm.month), year = Number(vm.year), lastUTCDateForMonthAndYear = new Date(Date.UTC(year, month + 1, 0)), lastUTCDayForMonthAndYear = lastUTCDateForMonthAndYear.getUTCDate();
            day > lastUTCDayForMonthAndYear && (vm.day = parseInt(lastUTCDayForMonthAndYear));
        }
        var ngModel, vm = this, initialisedWithDate = !1;
        vm.updateDateModelAndValidationClasses = updateDateModelAndValidationClasses, vm.explodeDateModel = explodeDateModel, 
        vm.combineDate = combineDate, vm.adjustLastDay = adjustLastDay, vm.validDate = validDate;
        var DEFAULT_LOCALE_EN = "en", DEFAULT_MONTHS_EN = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ], STRING_TYPE = "string", OBJECT_TYPE = "object";
        init();
    }
    angular.module("tw.form-components").controller("TwDateController", TwDateController), 
    TwDateController.$inject = [ "$element", "$log", "$scope" ];
}(window.angular), function(angular) {
    function TwCheckboxDirective() {
        function TwCheckboxController($scope, $element) {
            var $ctrl = this, $ngModel = $element.controller("ngModel");
            $element.find(".tw-checkbox-button");
            labelSelector = ".checkbox", $ctrl.isChecked = function() {
                return $ctrl.ngTrueValue && $ctrl.ngTrueValue === $ctrl.ngModel || !$ctrl.ngTrueValue && $ctrl.ngModel || !1;
            }, $ctrl.checked = $ctrl.isChecked(), $ctrl.buttonClick = function($event) {
                $ctrl.checked ? ($ctrl.checked = !1, $ngModel.$setViewValue($ctrl.ngFalseValue || !1)) : ($ctrl.checked = !0, 
                $ngModel.$setViewValue($ctrl.ngTrueValue || !0)), $ngModel.$setTouched(), $event && $event.stopPropagation(), 
                validateCheckbox($ctrl.checked, $element, $ngModel, $ctrl);
            }, $ctrl.buttonFocus = function() {
                $element.closest(".checkbox").find("label").addClass("focus"), $element.triggerHandler("focus");
            }, $ctrl.buttonBlur = function() {
                $element.closest(".checkbox").find("label").removeClass("focus"), $element.triggerHandler("blur"), 
                $ngModel.$setTouched(), validateCheckbox($ctrl.checked, $element, $ngModel, $ctrl);
            }, $ctrl.hiddenClick = function($event) {
                $event.stopPropagation();
            }, $element.closest("label").on("click", function(event) {
                $element.find("button").trigger("click"), event.preventDefault(), event.stopPropagation();
            }), $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
                newValue !== oldValue && ($ngModel.$setDirty(), validateCheckbox($ctrl.checked, $element, $ngModel, $ctrl), 
                $ctrl.checked = $ctrl.isChecked());
            }), $scope.$watch("$ctrl.ngDisabled", function(newValue, oldValue) {
                newValue && !oldValue ? $element.closest(".checkbox").addClass("disabled").addClass("disabled", !0) : !newValue && oldValue && $element.closest(".checkbox").removeClass("disabled").removeClass("disabled");
            }), $scope.$watch("$ctrl.ngRequired", function(newValue, oldValue) {
                newValue !== oldValue && newValue && validateCheckbox($ctrl.checked, $element, $ngModel, $ctrl);
            });
        }
        function validateCheckbox(isChecked, $element, $ngModel, $ctrl) {
            $ngModel.$touched && (!isChecked && $ctrl.ngRequired ? ($ngModel.$setValidity("required", !1), 
            $element.find(".tw-checkbox-button").addClass("has-error"), $element.closest(".checkbox").addClass("has-error"), 
            $element.closest(".form-group").addClass("has-error")) : ($ngModel.$setValidity("required", !0), 
            $element.find(".tw-checkbox-button").removeClass("has-error"), $element.closest(".checkbox").removeClass("has-error"), 
            $element.closest(".form-group").removeClass("has-error")));
        }
        return {
            restrict: "EA",
            require: "ngModel",
            controller: [ "$scope", "$element", TwCheckboxController ],
            controllerAs: "$ctrl",
            bindToController: !0,
            scope: {
                name: "@",
                ngModel: "=",
                ngTrueValue: "=",
                ngFalseValue: "=",
                ngRequired: "=",
                ngDisabled: "="
            },
            template: " \t\t\t\t<input type='hidden' class='sr-only' \t\t\t\t\tname='{{$ctrl.name}}' \t\t\t\t\tng-model='$ctrl.ngModel' \t\t\t\t\tng-click='$ctrl.hiddenClick($event)' \t\t\t\t\tng-disabled='$ctrl.ngDisabled'/> \t\t\t\t<button class='tw-checkbox-button' tw-focusable \t\t\t\t\tng-click='$ctrl.buttonClick($event)' \t\t\t\t\tng-focus='$ctrl.buttonFocus()' \t\t\t\t\tng-blur='$ctrl.buttonBlur()' \t\t\t\t\tng-disabled='$ctrl.ngDisabled' \t\t\t\t\tng-class='{\"checked\": $ctrl.checked}' \t\t\t\t\taria-pressed='{{$ctrl.checked}}'> \t\t\t\t\t<span class='tw-checkbox-check glyphicon glyphicon-ok'></span> \t\t\t\t</button>"
        };
    }
    angular.module("tw.form-components").directive("twCheckbox", TwCheckboxDirective);
}(window.angular), function(angular) {
    "use strict";
    function TwCurrencyInputDirective() {
        return {
            require: "ngModel",
            bindToController: !0,
            controller: "TwCurrencyInputController",
            controllerAs: "$ctrl",
            replace: !1,
            restrict: "E",
            template: templateAsString,
            scope: {
                ngModel: "=",
                ngChange: "&",
                ngMin: "=",
                ngMax: "=",
                ngRequired: "=",
                showDecimals: "=",
                currencySymbol: "@",
                currencyCode: "@"
            }
        };
    }
    angular.module("tw.form-components").directive("twCurrencyInput", TwCurrencyInputDirective);
    var templateAsString = ' \t\t<div class="input-group"> \t\t\t<span class="input-group-addon tw-currency-input-symbol">{{ $ctrl.currencySymbol }}</span> \t\t\t<input \t\t\t\ttype="tel" \t\t\t\tautocomplete="off" \t\t\t\tname="amount" \t\t\t\tstep="any" \t\t\t\tclass="form-control text-xs-right p-r-0" \t\t\t\tshow-decimals="$ctrl.showDecimals" \t\t\t\ttw-focusable \t\t\t\ttw-number-input-formatter \t\t\t\tng-change="$ctrl.changedInputValue()" \t\t\t\tng-model="$ctrl.ngModel" /> \t\t\t<span class="input-group-addon tw-currency-input-code p-l-1"> \t\t\t\t{{ $ctrl.currencyCode }} \t\t\t</span> \t\t</div> \t';
}(window.angular), function(angular) {
    "use strict";
    function TwDateDirective() {
        var directive = {
            require: "ngModel",
            bindToController: !0,
            controller: "TwDateController",
            controllerAs: "vm",
            replace: !1,
            restrict: "E",
            scope: {
                ngModel: "=",
                required: "@",
                ngRequired: "=",
                disabled: "@",
                ngDisabled: "=",
                locale: "@",
                twLocale: "=",
                min: "@",
                ngMin: "=",
                max: "@",
                ngMax: "=",
                modelType: "@"
            },
            template: templateAsString,
            link: TwDateLink
        };
        return directive;
    }
    function TwDateLink(scope, element, attrs, ngModel) {
        var dayTouched, yearTouched;
        element.find("input[name=day]").on("blur", function() {
            dayTouched = !0, dayTouched && yearTouched && (ngModel.$setTouched(), element.triggerHandler("blur"));
        }), element.find("input[name=year]").on("blur", function() {
            yearTouched = !0, ngModel.$setTouched(), element.triggerHandler("blur");
        });
    }
    angular.module("tw.form-components").directive("twDate", TwDateDirective);
    var daySectionTemplate = " \t\t<label class='sr-only' for='day-{{::uniqueId}}'>Day</label> \t\t<input type='number' \t\t\tname='day' \t\t\tid='day-{{::uniqueId}}' \t\t\tclass='form-control tw-date-day' \t\t\tng-model='vm.day' \t\t\tng-change='vm.updateDateModelAndValidationClasses()' \t\t\tplaceholder='DD' \t\t\tmin='1' \t\t\tng-min='1' \t\t\tng-disabled='vm.dateDisabled' \t\t\tng-required='vm.dateRequired' \t\t\ttw-focusable />", monthSectionTemplate = "  \t\t<label class='sr-only' for='month-{{::uniqueId}}'>Month</label>\t\t<tw-select \t\t\tname='month' \t\t\tclass='tw-date-month' \t\t\tid='month-{{::uniqueId}}' \t\t\tng-model='vm.month' \t\t\tng-change='vm.updateDateModelAndValidationClasses()' \t\t\tng-required='vm.dateRequired' \t\t\tng-disabled='vm.dateDisabled' \t\t\toptions='vm.dateMonths'> \t\t</tw-select>", yearSectionTemplate = " \t\t<label class='sr-only' for='year-{{::uniqueId}}'>Year</label> \t\t<input type='number' \t\t\tid='year-{{::uniqueId}}' \t\t\tname='year' \t\t\tclass='form-control tw-date-year' \t\t\tplaceholder='YYYY' \t\t\tng-model='vm.year' \t\t\tng-change='vm.updateDateModelAndValidationClasses()' \t\t\tng-min='vm.dateRange.min.getFullYear()' \t\t\tng-max='vm.dateRange.max.getFullYear()' \t\t\tmaxlength='4' \t\t\tng-maxlength='4' \t\t\tng-disabled='vm.dateDisabled' \t\t\tng-required='vm.dateRequired' \t\t\ttw-focusable />", templateAsString = " \t\t<div class='row'> \t\t\t<div class='col-sm-5 tw-date-month-column' ng-if='vm.monthBeforeDay'>" + monthSectionTemplate + " \t\t\t</div> \t\t\t<div class='col-sm-3 tw-date-day-column'>" + daySectionTemplate + " \t\t\t</div> \t\t\t<div class='col-sm-5 tw-date-month-column' ng-if='!vm.monthBeforeDay'>" + monthSectionTemplate + " \t\t\t</div> \t\t\t<div class='col-sm-4 tw-date-year-column'>" + yearSectionTemplate + " \t\t\t</div> \t\t</div>";
}(window.angular), function(angular) {
    function TwDynamicFormControl() {
        return {
            restrict: "E",
            require: "ngModel",
            transclude: !0,
            controllerAs: "$ctrl",
            bindToController: !0,
            controller: "TwDynamicFormControlController",
            link: TwDynamicFormControlLink,
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
            template: "<div ng-switch='$ctrl.type'> \t\t\t\t<input ng-switch-when='text'  \t\t\t\t\tname='{{$ctrl.name}}'  \t\t\t\t\ttype='text' \t\t\t\t\tclass='form-control' \t\t\t\t\tplaceholder='{{$ctrl.placeholder}}' \t\t\t\t\tng-model='$ctrl.ngModel' \t\t\t\t\tng-model-options='{ allowInvalid: true }' \t\t\t\t\tng-required='$ctrl.ngRequired' \t\t\t\t\tng-disabled='$ctrl.ngDisabled' \t\t\t\t\tng-pattern='$ctrl.ngPattern' \t\t\t\t\tng-change='$ctrl.change()' \t\t\t\t\tng-focus='$ctrl.focus()' \t\t\t\t\tng-blur='$ctrl.blur()' \t\t\t\t\tng-minlength='$ctrl.ngMinlength' \t\t\t\t\tng-maxlength='$ctrl.ngMaxlength' />  \t\t\t\t<input ng-switch-when='password'  \t\t\t\t\tname='{{$ctrl.name}}'  \t\t\t\t\ttype='password' \t\t\t\t\tclass='form-control' \t\t\t\t\tplaceholder='{{$ctrl.placeholder}}' \t\t\t\t\tng-model='$ctrl.ngModel' \t\t\t\t\tng-model-options='{ allowInvalid: true }' \t\t\t\t\tng-required='$ctrl.ngRequired' \t\t\t\t\tng-disabled='$ctrl.ngDisabled' \t\t\t\t\tng-change='$ctrl.change()' \t\t\t\t\tng-focus='$ctrl.focus()' \t\t\t\t\tng-blur='$ctrl.blur()' \t\t\t\t\tng-minlength='$ctrl.ngMinlength' \t\t\t\t\tng-maxlength='$ctrl.ngMaxlength' />  \t\t\t\t<input ng-switch-when='number'  \t\t\t\t\tname='{{$ctrl.name}}'  \t\t\t\t\ttype='number' \t\t\t\t\tstep='{{$ctrl.step}}' \t\t\t\t\tclass='form-control' \t\t\t\t\tplaceholder='{{$ctrl.placeholder}}' \t\t\t\t\tng-model='$ctrl.ngModel' \t\t\t\t\tng-model-options='{ allowInvalid: true }' \t\t\t\t\tng-required='$ctrl.ngRequired' \t\t\t\t\tng-disabled='$ctrl.ngDisabled' \t\t\t\t\tng-change='$ctrl.change()' \t\t\t\t\tng-focus='$ctrl.focus()' \t\t\t\t\tng-blur='$ctrl.blur()' \t\t\t\t\tng-min='$ctrl.ngMin' \t\t\t\t\tng-max='$ctrl.ngMax' />  \t\t\t\t<div ng-switch-when='radio' \t\t\t\t\tclass='radio' \t\t\t\t\tng-class='{disabled: $ctrl.ngDisabled}' \t\t\t\t\tng-repeat='option in $ctrl.options'> \t\t\t\t\t<label> \t\t\t\t\t\t<tw-radio \t\t\t\t\t\t\tname='{{$ctrl.name}}' \t\t\t\t\t\t\tng-value='option.value' \t\t\t\t\t\t\tng-model='$ctrl.ngModel' \t\t\t\t\t\t\tng-required='$ctrl.ngRequired' \t\t\t\t\t\t\tng-disabled='$ctrl.ngDisabled' \t\t\t\t\t\t\tng-change='$ctrl.change()' \t\t\t\t\t\t\tng-click='$ctrl.change()' \t\t\t\t\t\t\tng-focus='$ctrl.focus()' \t\t\t\t\t\t\tng-blur='$ctrl.blur()' /> \t\t\t\t\t\t{{option.label}} \t\t\t\t\t</label> \t\t\t\t</div> \t\t\t\t<div ng-switch-when='checkbox' \t\t\t\t\tclass='checkbox' \t\t\t\t\tng-class='{disabled: $ctrl.ngDisabled}'> \t\t\t\t\t<label> \t\t\t\t\t\t<tw-checkbox \t\t\t\t\t\t\tname='{{$ctrl.name}}' \t\t\t\t\t\t\tng-model='$ctrl.ngModel' \t\t\t\t\t\t\tng-required='$ctrl.ngRequired' \t\t\t\t\t\t\tng-disabled='$ctrl.ngDisabled' \t\t\t\t\t\t\tng-change='$ctrl.change()' \t\t\t\t\t\t\tng-click='$ctrl.change()' \t\t\t\t\t\t\tng-focus='$ctrl.focus()' \t\t\t\t\t\t\tng-blur='$ctrl.blur()' /> \t\t\t\t\t\t{{$ctrl.placeholder}} \t\t\t\t\t</label> \t\t\t\t</div> \t\t\t\t<div ng-switch-when='select'> \t\t\t\t\t<tw-select \t\t\t\t\t\tname='{{$ctrl.name}}' \t\t\t\t\t\toptions='$ctrl.options' \t\t\t\t\t\tplaceholder='{{$ctrl.placeholder}}' \t\t\t\t\t\tng-model='$ctrl.ngModel' \t\t\t\t\t\tng-required='$ctrl.ngRequired' \t\t\t\t\t\tng-disabled='$ctrl.ngDisabled' \t\t\t\t\t\tng-change='$ctrl.change()' \t\t\t\t\t\tng-focus='$ctrl.focus()' \t\t\t\t\t\tng-blur='$ctrl.blur()' /> \t\t\t\t</div> \t\t\t\t<ng-transclude class='error-messages'></ng-transclude> \t\t\t</div>"
        };
    }
    function TwDynamicFormControlController($element, $scope) {
        var $ctrl = this, ngModelController = $element.controller("ngModel");
        $ctrl.change = function() {
            ngModelController.$setDirty(), $ctrl.ngChange && $ctrl.ngChange();
        }, $ctrl.focus = function() {
            $element.triggerHandler("focus");
        }, $ctrl.blur = function() {
            ngModelController.$setTouched(), $element.triggerHandler("blur");
        };
    }
    function TwDynamicFormControlLink(scope, element, attrs, ngModel) {
        ngModel.$validators.min = function(modelValue, viewValue) {
            return "undefined" == typeof scope.$ctrl.ngMin || !("number" == typeof viewValue && "number" == typeof scope.$ctrl.ngMin && viewValue < scope.$ctrl.ngMin);
        }, ngModel.$validators.max = function(modelValue, viewValue) {
            return "undefined" == typeof scope.$ctrl.ngMax || !("number" == typeof viewValue && "number" == typeof scope.$ctrl.ngMax && viewValue > scope.$ctrl.ngMax);
        };
    }
    angular.module("tw.form-components").directive("twDynamicFormControl", TwDynamicFormControl), 
    angular.module("tw.form-components").controller("TwDynamicFormControlController", TwDynamicFormControlController), 
    TwDynamicFormControlController.$inject = [ "$element", "$scope" ];
}(window.angular), function(angular) {
    function TwLoader() {
        return {
            restrict: "E",
            template: "<div class='loader'> \t\t\t  <div class='loader-spinner'></div> \t\t\t  <div class='loader-flag'> \t\t\t    <svg xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='-2 -2 56 56'> \t\t\t      <polygon class='loader-flag-stroke'  stroke='#00B9FF' stroke-width='2' stroke-linejoin='miter' stroke-linecap='round' stroke-miterlimit='10' stroke-dasharray='300' stroke-dashoffset='300' fill='none' points='24.6,27.3 0,27.3 14.3,13.7 6.1,0 48.2,0 26.3,52 19.5,52 39.2,5.5 16.8,5.5 21.6,13.6 13.4,21.8 27,21.8' /> \t\t\t    </svg> \t\t\t    <svg class='loader-flag-fill' xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='0 2 52 48'> \t\t\t      <polygon fill='#00B9FF' points='6.1,0 14.3,13.7 0,27.3 24.6,27.3 27,21.8 13.4,21.8 21.6,13.6 16.8,5.5 39.2,5.5 19.5,52 26.3,52 48.2,0 '/> \t\t\t    </svg> \t\t\t  </div> \t\t\t</div>"
        };
    }
    angular.module("tw.form-components").directive("twLoader", TwLoader);
}(window.angular), function(angular) {
    function TwRadioDirective() {
        function TwRadioController($scope, $element) {
            var $ctrl = this, $ngModel = $element.controller("ngModel"), radioSelector = ".radio", labelSelector = "label";
            $ctrl.isChecked = function() {
                return $ctrl.ngValue && $ctrl.ngModel === $ctrl.ngValue || $ctrl.value === $ctrl.ngModel;
            }, $ctrl.checked = $ctrl.isChecked(), $ctrl.buttonClick = function($event) {
                $ctrl.ngDisabled || ($ctrl.checked = !0, $ngModel.$setViewValue($ctrl.ngValue || $ctrl.value));
            }, $ctrl.buttonFocus = function() {
                $element.closest(labelSelector).addClass("focus"), $element.triggerHandler("focus");
            }, $ctrl.buttonBlur = function() {
                $element.closest(labelSelector).removeClass("focus"), $element.triggerHandler("blur");
            }, $ctrl.hiddenInputChange = function() {
                $ctrl.ngChange && $ctrl.ngChange();
            }, $element.on("blur", function(event) {
                $ngModel.$setTouched();
            }), $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
                newValue !== oldValue && $ngModel.$setDirty(), $ctrl.checked = $ctrl.isChecked();
            }), $scope.$watch("$ctrl.ngDisabled", function(newValue, oldValue) {
                newValue && !oldValue ? $element.closest(radioSelector).addClass("disabled") : !newValue && oldValue && $element.closest(radioSelector).removeClass("disabled");
            });
        }
        return {
            restrict: "E",
            require: "ngModel",
            controller: [ "$scope", "$element", TwRadioController ],
            controllerAs: "$ctrl",
            bindToController: !0,
            scope: {
                name: "@",
                value: "@",
                ngModel: "=",
                ngValue: "=",
                ngRequired: "=",
                ngDisabled: "=",
                ngChange: "&"
            },
            template: " \t\t\t\t<input type='radio' class='sr-only' \t\t\t\t\tname='{{$ctrl.name}}' \t\t\t\t\tng-value='$ctrl.ngValue || $ctrl.value' \t\t\t\t\tng-model='$ctrl.ngModel' \t\t\t\t\tng-disabled='$ctrl.ngDisabled' \t\t\t\t\tng-change='$ctrl.hiddenInputChange()' \t\t\t\t\ttabindex='-1' /> \t\t\t\t<button type='button' class='tw-radio-button' tw-focusable \t\t\t\t\tng-click='$ctrl.buttonClick($event)' \t\t\t\t\tng-focus='$ctrl.buttonFocus()' \t\t\t\t\tng-blur='$ctrl.buttonBlur()' \t\t\t\t\tng-disabled='$ctrl.ngDisabled' \t\t\t\t\tng-class='{checked: $ctrl.checked}' \t\t\t\t\taria-pressed='{{$ctrl.checked}}'> \t\t\t\t\t<span class='tw-radio-check'></span> \t\t\t\t</button>"
        };
    }
    angular.module("tw.form-components").directive("twRadio", TwRadioDirective);
}(window.angular), function(angular) {
    "use strict";
    function TwRequirementsForm() {
        return {
            restrict: "E",
            scope: {
                requirements: "=",
                model: "=",
                onRefreshRequirements: "&"
            },
            controller: [ "$scope", "$http", TwRequirementsFormController ],
            controllerAs: "$ctrl",
            bindToController: !0,
            template: " \t\t\t<ul ng-if='$ctrl.requirements && $ctrl.requirements.length > 1' \t\t\t\tclass='nav nav-tabs m-b-3'> \t\t\t\t<li ng-repeat='requirementType in $ctrl.requirements' \t\t\t\t\tng-class='{\"active\": $ctrl.model.type === requirementType.type}'> \t\t\t\t\t<a href='' ng-click='$ctrl.switchTab(requirementType.type)'> \t\t\t\t\t\t{{$ctrl.getTabName(requirementType.type)}} \t\t\t\t\t</a> \t\t\t\t</li> \t\t\t</ul> \t\t\t<div class='tab-content'> \t\t\t\t<div ng-repeat='requirementType in $ctrl.requirements'\t\t\t\t\tng-if='$ctrl.model.type == requirementType.type' \t\t\t\t\tclass='tab-pane' \t\t\t\t\tid='{{requirementType.type}}' \t\t\t\t\tng-class='{\"active\": $ctrl.model.type == requirementType.type}'> \t\t\t\t\t<div class='row'> \t\t\t\t\t\t<div class='form-group' \t\t\t\t\t\t\tng-repeat='fieldGroup in requirementType.fields' \t\t\t\t\t\t\tng-class='{ \t\t\t\t\t\t\t\t\"col-sm-6\": fieldGroup.maxlength && fieldGroup.maxlength <= 10, \t\t\t\t\t\t\t\t\"col-sm-12\": !fieldGroup.maxlength || fieldGroup.maxlength > 10 \t\t\t\t\t\t\t}'> \t\t\t\t\t\t\t<label class='control-label'> \t\t\t\t\t\t\t\t{{fieldGroup.name}} \t\t\t\t\t\t\t</label> \t\t\t\t\t\t\t<div class='row'> \t\t\t\t\t\t\t\t<div class='col-xs-{{field.columns}}' \t\t\t\t\t\t\t\t\tng-repeat='field in fieldGroup.group'> \t\t\t\t\t\t\t\t\t<tw-dynamic-form-control \t\t\t\t\t\t\t\t\t\tname='{{field.key}}' \t\t\t\t\t\t\t\t\t\ttype='{{field.type | lowercase}}' \t\t\t\t\t\t\t\t\t\tplaceholder='{{field.placeholder}}' \t\t\t\t\t\t\t\t\t\toptions='field.valuesAllowed' \t\t\t\t\t\t\t\t\t\tng-model='$ctrl.model[field.key]' \t\t\t\t\t\t\t\t\t\tng-blur='$ctrl.onBlur(field)' \t\t\t\t\t\t\t\t\t\tng-required='field.required' \t\t\t\t\t\t\t\t\t\tng-disabled='field.disabled' \t\t\t\t\t\t\t\t\t\tng-minlength='field.minLength' \t\t\t\t\t\t\t\t\t\tng-maxlength='field.maxLength' \t\t\t\t\t\t\t\t\t\tng-pattern='field.validationRegexp' \t\t\t\t\t\t\t\t\t\ttw-validation > \t\t\t\t\t\t\t\t\t\t<!-- tw-dynamic-async-validator='field.validationAsync' --> \t\t\t\t\t\t\t\t\t</tw-dynamic-form-control> \t\t\t\t\t\t\t\t\t<div class='error-messages'> \t\t\t\t\t\t\t\t\t\t<div class='error-minlength'>Minimum {{field.minlength}} characters</div> \t\t\t\t\t\t\t\t\t\t<div class='error-maxlength'>Maximum {{field.maxlength}} characters</div> \t\t\t\t\t\t\t\t\t\t<div class='error-required'>{{fieldGroup.name}} is required</div> \t\t\t\t\t\t\t\t\t\t<div class='error-pattern'>Incorrect format</div> \t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t\t<div ng-if='field.tooltip' \t\t\t\t\t\t\t\t\t\tclass='help-block'> \t\t\t\t\t\t\t\t\t\t<a role='button' \t\t\t\t\t\t\t\t\t\t\ttabindex='0' \t\t\t\t\t\t\t\t\t\t\tdata-toggle='popover' \t\t\t\t\t\t\t\t\t\t\tdata-placement='top' \t\t\t\t\t\t\t\t\t\t\ttitle='{{field.tooltip}}'> \t\t\t\t\t\t\t\t\t\t\t<span class='glyphicon glyphicon-question-sign'></span> \t\t\t\t\t\t\t\t\t\t</a> \t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t</div> \t\t\t\t\t\t</div> \t\t\t\t\t</div> \t\t\t\t</div> \t\t\t</div>"
        };
    }
    function TwRequirementsFormController($scope, $http) {
        function init() {
            $ctrl.model || ($ctrl.model = {}), $scope.$watch("$ctrl.requirements", function(newValue, oldValue) {
                angular.equals(newValue, oldValue) || (prepRequirements($ctrl.requirements), $ctrl.model.type = $ctrl.requirements.length ? $ctrl.requirements[0].type : null);
            });
        }
        function prepRequirements(types) {
            types.forEach(function(type) {
                type.fields.forEach(function(fieldGroup) {
                    fieldGroup.group.forEach(function(field) {
                        prepRegExp(field), prepValuesAsync(field), prepValuesAllowed(field);
                    });
                });
            });
        }
        function prepRegExp(field) {
            if (field.validationRegexp) try {
                field.validationRegexp = new RegExp(ield.validationRegexp);
            } catch (ex) {
                console.log("API regexp is invalid"), field.validationRegexp = !1;
            } else field.validationRegexp = !1;
        }
        function prepValuesAsync(field) {
            if (field.valuesAsync) {
                var postData = {};
                field.valuesAsync.params && field.valuesAsync.params.length && (postData = getParamValuesFromModel($ctrl.model, field.valuesAsync.params)), 
                $http.post(field.valuesAsync.url, postData).then(function(response) {
                    field.valuesAllowed = response.data, prepValuesAllowed(field);
                })["catch"](function() {});
            }
        }
        function prepValuesAllowed(field) {
            angular.isArray(field.valuesAllowed) && field.valuesAllowed.forEach(function(valueAllowed) {
                valueAllowed.value = valueAllowed.key, valueAllowed.label = valueAllowed.name;
            });
        }
        function switchTab(newType) {
            var oldRequirements = findRequirementByType($ctrl.model.type), newRequirements = findRequirementByType(newType);
            $ctrl.model.type = newType, removeObsoletePropertiesFromModel(oldRequirements, newRequirements);
        }
        function getTabName(tabType) {
            if (tabType && tabType.length > 0) {
                var tabNameWithSpaces = tabType.toLowerCase().split("_").join(" ");
                return tabNameWithSpaces.charAt(0).toUpperCase() + tabNameWithSpaces.slice(1);
            }
            return "";
        }
        function removeObsoletePropertiesFromModel(oldRequirements, newRequirements) {
            var oldFieldNames = getFieldNamesFromRequirement(oldRequirements), newFieldNames = getFieldNamesFromRequirement(newRequirements), obsoleteFieldNames = oldFieldNames.filter(function(fieldName) {
                return newFieldNames.indexOf(fieldName) < 0;
            });
            obsoleteFieldNames.forEach(function(fieldName) {
                delete $ctrl.model[fieldName];
            });
        }
        function findRequirementByType(type) {
            for (var i = 0; i < $ctrl.requirements.length; i++) {
                var modelType = $ctrl.requirements[i];
                if (modelType.type === type) return modelType;
            }
        }
        function getFieldNamesFromRequirement(modelRequirement) {
            var names = modelRequirement.fields.map(function(fieldGroup) {
                return fieldGroup.group.map(function(field) {
                    return field.key;
                });
            });
            return Array.prototype.concat.apply([], names);
        }
        function getParamValuesFromModel(model, params) {
            var data = {};
            return params.forEach(function(param) {
                model[param.key] ? data[param.parameterName] = model[param.key] : param.required;
            }), data;
        }
        var $ctrl = this;
        $ctrl.switchTab = switchTab, $ctrl.getTabName = getTabName, $ctrl.onBlur = function(field) {
            !field.refreshRequirementsOnChange;
        }, init();
    }
    angular.module("tw.form-components").directive("twRequirementsForm", TwRequirementsForm);
}(window.angular), function(angular) {
    "use strict";
    function TwSelectDirective() {
        return {
            require: "ngModel",
            bindToController: !0,
            controller: [ "$element", "$scope", "$transclude", "$timeout", TwSelectController ],
            controllerAs: "$ctrl",
            replace: !1,
            transclude: !0,
            restrict: "EA",
            scope: {
                ngModel: "=",
                ngRequired: "=",
                ngDisabled: "=",
                options: "=",
                name: "@",
                placeholder: "@",
                filter: "@",
                size: "@",
                dropdownRight: "@",
                dropdownWidth: "@",
                inverse: "=",
                hideNote: "=",
                hideSecondary: "=",
                hideIcon: "=",
                hideCurrency: "=",
                hideCircle: "="
            },
            template: " \t\t\t\t<div class='btn-group btn-block dropdown tw-select' aria-hidden='false'> \t\t\t\t\t<button type='button' class='btn btn-input dropdown-toggle' \t\t\t\t\t\tng-class='{ \t\t\t\t\t\t\t\"btn-input-inverse\": $ctrl.inverse, \t\t\t\t\t\t\t\"btn-sm\": $ctrl.size === \"sm\", \t\t\t\t\t\t\t\"btn-lg\": $ctrl.size === \"lg\" \t\t\t\t\t\t}' \t\t\t\t\t\tdata-toggle='dropdown' aria-expanded='false' \t\t\t\t\t\tng-disabled='$ctrl.ngDisabled' \t\t\t\t\t\tng-focus='$ctrl.buttonFocus()' \t\t\t\t\t\ttw-focusable> \t\t\t\t\t\t<span class='tw-select-selected' ng-if='$ctrl.selected'> \t\t\t\t\t\t\t<span class='circle circle-inverse pull-xs-left circle-sm' ng-if='$ctrl.selected && $ctrl.selected.icon && $ctrl.selected.secondary'>\t\t\t\t\t\t\t\t <i class='icon {{$ctrl.selected.icon}}'></i> \t\t\t\t\t\t\t</span> \t\t\t\t\t\t\t<span class='circle circle-inverse pull-xs-left'  \t\t\t\t\t\t\t\tng-class='{\"circle-sm\": $ctrl.selected.secondary && !$ctrl.hideSecondary, \"circle-xs\": !$ctrl.selected.secondary || $ctrl.hideSecondary}' \t\t\t\t\t\t\t\tng-if='($ctrl.selected.circleText || $ctrl.selected.circleImage || $ctrl.selected.circleIcon) && !$ctrl.hideCircle'> \t\t\t\t\t\t\t\t<span ng-if='$ctrl.selected.circleText'>{{$ctrl.selected.circleText}}</span> \t\t\t\t\t\t\t\t<img ng-if='$ctrl.selected.circleImage' ng-src='{{$ctrl.selected.circleImage}}' /> \t\t\t\t\t\t\t\t<i ng-if='$ctrl.selected.circleIcon' class='icon {{$ctrl.selected.circleIcon}}'></i> \t\t\t\t\t\t\t</span><span class='text-ellipsis'><i class='currency-flag currency-flag-{{$ctrl.selected.currency | lowercase}}' \t\t\t\t\t\t\t\tng-if='$ctrl.selected && $ctrl.selected.currency && !$ctrl.hideCurrency' \t\t\t\t\t\t\t\t></i><i class='icon {{$ctrl.selected.icon}}' \t\t\t\t\t\t\t\tng-if='$ctrl.selected && $ctrl.selected.icon && !$ctrl.selected.secondary &&  !$ctrl.hideIcon' \t\t\t\t\t\t\t\t></i><span class='tw-select-label'>{{$ctrl.selected.label}}</span><span \t\t\t\t\t\t\tng-if='$ctrl.selected.note && !$ctrl.hideNote' class='tw-select-note small m-l-1'>{{$ctrl.selected.note}}</span><span \t\t\t\t\t\t\tng-if='$ctrl.selected.secondary && !$ctrl.hideSecondary' class='tw-select-secondary small secondary text-ellipsis'>{{$ctrl.selected.secondary}}</span></span> \t\t\t\t\t\t</span> \t\t\t\t\t\t<span class='form-control-placeholder' ng-if='!$ctrl.selected'>{{$ctrl.placeholder}}</span> \t\t\t\t\t\t<span class='caret'></span> \t\t\t\t\t</button> \t\t\t\t\t<ul class='dropdown-menu' role='menu' ng-class='{ \t\t\t\t\t\t\t\"dropdown-menu-xs-right\": $ctrl.dropdownRight === \"xs\", \t\t\t\t\t\t\t\"dropdown-menu-sm-right\": $ctrl.dropdownRight === \"sm\", \t\t\t\t\t\t\t\"dropdown-menu-md-right\": $ctrl.dropdownRight === \"md\", \t\t\t\t\t\t\t\"dropdown-menu-lg-right\": $ctrl.dropdownRight === \"lg\", \t\t\t\t\t\t\t\"dropdown-menu-xl-right\": $ctrl.dropdownRight === \"xl\", \t\t\t\t\t\t\t\"dropdown-menu-sm\": $ctrl.dropdownWidth === \"sm\", \t\t\t\t\t\t\t\"dropdown-menu-md\": $ctrl.dropdownWidth === \"md\", \t\t\t\t\t\t\t\"dropdown-menu-lg\": $ctrl.dropdownWidth === \"lg\" \t\t\t\t\t\t}'> \t\t\t\t\t\t<li ng-if='$ctrl.filter'> \t\t\t\t\t\t\t<a href='' class='tw-select-filter-link p-a-0' ng-focus='$ctrl.filterFocus()'> \t\t\t\t\t\t\t\t<div class='input-group'> \t\t\t\t\t\t\t\t\t<span class='input-group-addon'><i class='icon icon-search'></i></span> \t\t\t\t\t\t\t\t\t<input type='text' class='form-control tw-select-filter' placeholder='{{$ctrl.filter}}' \t\t\t\t\t\t\t\t\t\tng-model='$ctrl.filterString' \t\t\t\t\t\t\t\t\t\tng-change='$ctrl.filterChange()' \t\t\t\t\t\t\t\t\t\tng-keydown='$ctrl.filterKeydown($event)' /> \t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t</a> \t\t\t\t\t\t</li> \t\t\t\t\t\t<li ng-class='{active: !$ctrl.selected}' \t\t\t\t\t\t\tng-if='$ctrl.placeholder && !$ctrl.ngRequired && !$ctrl.filter'> \t\t\t\t\t\t\t<a href='' \t\t\t\t\t\t\t\tng-click='$ctrl.placeholderClick()' \t\t\t\t\t\t\t\tng-focus='$ctrl.placeholderFocus()' \t\t\t\t\t\t\t\tclass='tw-select-placeholder' tw-focusable> \t\t\t\t\t\t\t\t{{$ctrl.placeholder}} \t\t\t\t\t\t\t</a> \t\t\t\t\t\t</li> \t\t\t\t\t\t<li ng-if='($ctrl.placeholder && !$ctrl.ngRequired) || $ctrl.filter' class='divider'></li> \t\t\t\t\t\t<li \t\t\t\t\t\t\tng-repeat='option in $ctrl.filteredOptions' \t\t\t\t\t\t\tng-class='{ \t\t\t\t\t\t\t\tactive: $ctrl.ngModel === option.value, \t\t\t\t\t\t\t\t\"dropdown-header\": option.header, \t\t\t\t\t\t\t\t\"tw-select-option\": !option.header \t\t\t\t\t\t\t}'> \t\t\t\t\t\t\t<span ng-if='option.header'>{{option.header}}</span> \t\t\t\t\t\t\t<a href='' \t\t\t\t\t\t\t\tng-if='!option.header' \t\t\t\t\t\t\t\tng-click='$ctrl.optionClick(option)' \t\t\t\t\t\t\t\tng-focus='$ctrl.optionFocus(option)' \t\t\t\t\t\t\t\tindex='{{$index}}' \t\t\t\t\t\t\t\tclass='tw-select-option-link' tw-focusable> \t\t\t\t\t\t\t\t<div class='circle circle-inverse pull-xs-left circle-sm' ng-if='option.icon && option.secondary'>\t\t\t\t\t\t\t\t\t<i class='icon {{option.icon}}'></i>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t<i class='icon {{option.icon}} pull-xs-left' ng-if='option.icon && !option.secondary'></i> \t\t\t\t\t\t\t\t<i class='currency-flag currency-flag-{{option.currency | lowercase}} pull-xs-left' ng-if='option.currency'> \t\t\t\t\t\t\t\t</i><span class='circle circle-inverse pull-xs-left' ng-class='{\"circle-sm\": option.secondary, \"circle-xs\": !option.secondary}' \t\t\t\t\t\t\t\t\tng-if='option.circleText || option.circleImage || option.circleIcon'> \t\t\t\t\t\t\t\t\t<span class='tw-select-circle-text' ng-if='option.circleText'>{{option.circleText}}</span> \t\t\t\t\t\t\t\t\t<img ng-if='option.circleImage' ng-src='{{option.circleImage}}' /> \t\t\t\t\t\t\t\t\t<i ng-if='option.circleIcon' class='icon {{option.circleIcon}}'></i> \t\t\t\t\t\t\t\t</span>{{option.label}}<span \t\t\t\t\t\t\t\tng-if='option.note' class='tw-select-note small m-l-1'>{{option.note}}</span><span \t\t\t\t\t\t\t\tng-if='option.secondary' class='tw-select-secondary small text-ellipsis'>{{option.secondary}}</span> \t\t\t\t\t\t\t</a> \t\t\t\t\t\t</li> \t\t\t\t\t\t<li ng-if='$ctrl.hasTranscluded' class='divider'></li> \t\t\t\t\t\t<li ng-transclude ng-if='$ctrl.hasTranscluded' class='tw-select-transcluded'></li> \t\t\t\t\t</ul> \t\t\t\t</div> \t\t\t\t<input type='hidden' class='tw-select-hidden' \t\t\t\t\tname='{{$ctrl.name}}' \t\t\t\t\tvalue='{{$ctrl.ngModel}}' \t\t\t\t\tng-disabled='$ctrl.ngDisabled' />"
        };
    }
    function TwSelectController($element, $scope, $transclude, $timeout) {
        function buttonFocus() {
            $element.triggerHandler("focus");
        }
        function optionClick(option) {
            selectOption($ngModel, $ctrl, option), $element.find(".btn").focus();
        }
        function optionFocus(option) {
            selectOption($ngModel, $ctrl, option);
        }
        function optionKeypress(event) {
            if (!$(event.target).hasClass("tw-select-filter")) {
                var characterCode = getCharacterCodeFromKeypress(event);
                if (8 === characterCode) return event.preventDefault(), !1;
                var character = getCharacterFromKeypress(event);
                continueSearchAndSelectMatch($ngModel, $ctrl, $ctrl.options, character), $element.find(".active a").focus();
            }
        }
        function placeholderClick(option) {
            resetOption($ngModel, $ctrl), $element.find(".btn").focus();
        }
        function placeholderFocus() {
            resetOption($ngModel, $ctrl);
        }
        function getFilteredOptions() {
            return $ctrl.options.filter(isOptionFiltered);
        }
        function isOptionFiltered(option) {
            var filterStringLower = $ctrl.filterString && escapeRegExp($ctrl.filterString.toLowerCase());
            return !filterStringLower || (option.label && option.label.toLowerCase().search(filterStringLower) >= 0 || option.note && option.note.toLowerCase().search(filterStringLower) >= 0 || option.secondary && option.secondary.toLowerCase().search(filterStringLower) >= 0 || option.searchable && option.searchable.toLowerCase().search(filterStringLower) >= 0);
        }
        function escapeRegExp(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        }
        function filterFocus() {
            $element.find(".tw-select-filter").focus();
        }
        function filterChange() {
            $ctrl.filteredOptions = $ctrl.getFilteredOptions();
            var selectedOption = findSelected($ctrl.filteredOptions, $ctrl.selected);
            !selectedOption && $ctrl.filteredOptions.length && selectOption($ngModel, $ctrl, $ctrl.filteredOptions[0]);
        }
        function findSelected(options, selected) {
            var selectedOption;
            return options.forEach(function(option) {
                selected && angular.equals(selected.value, option.value) && (selectedOption = selected);
            }), selectedOption;
        }
        function filterKeydown(event) {
            var characterCode = event.which || event.charCode || event.keyCode, activeOption = $element.find(".active"), activeLink = activeOption.find("a"), optionLinks = $element.find(".tw-select-option-link");
            return 40 === characterCode ? (moveDownOneOption(activeOption, activeLink, optionLinks), 
            event.preventDefault()) : 38 === characterCode ? (moveUpOneOption(activeOption, activeLink, optionLinks), 
            event.preventDefault()) : 13 === characterCode && (activeOption.click(), $element.find(".btn").focus(), 
            event.preventDefault()), !0;
        }
        function selectOptionUsingLink(link) {
            var option = $ctrl.filteredOptions[link.attr("index")];
            selectOption($ngModel, $ctrl, option);
        }
        function moveUpOneOption(activeOption, activeLink, optionLinks) {
            if (!activeOption.length && optionLinks.length) return void selectOptionUsingLink($(optionLinks[optionLinks.length - 1]));
            if (activeLink[0] !== optionLinks[0]) {
                var previousOptions = activeOption.prevAll(".tw-select-option");
                return void selectOptionUsingLink($(previousOptions[0]).find("a"));
            }
        }
        function moveDownOneOption(activeOption, activeLink, optionLinks) {
            if (!activeOption.length && optionLinks.length) return void selectOptionUsingLink($(optionLinks[0]));
            if (activeLink[0] !== optionLinks[optionLinks.length - 1]) {
                var nextOptions = activeOption.nextAll(".tw-select-option");
                return void selectOptionUsingLink($(nextOptions[0]).find("a"));
            }
            var transcludedOption = $(".tw-select-transcluded");
            return transcludedOption.length ? void transcludedOption.find("a").focus() : void 0;
        }
        var $ctrl = this, $ngModel = $element.controller("ngModel");
        $ctrl.search = "", preSelectModelValue($ngModel, $ctrl, $ctrl.options), setDefaultIfRequired($ngModel, $ctrl, $element, $ctrl), 
        addWatchers($ctrl, $scope, $ngModel, $element), addEventHandlers($ctrl, $element, $ngModel, $ctrl.options, $timeout), 
        checkForTranscludedContent($transclude, $ctrl), $ctrl.buttonFocus = buttonFocus, 
        $ctrl.optionClick = optionClick, $ctrl.optionFocus = optionFocus, $ctrl.optionKeypress = optionKeypress, 
        $ctrl.placeholderFocus = placeholderFocus, $ctrl.placeholderClick = placeholderClick, 
        $ctrl.filterFocus = filterFocus, $ctrl.filterChange = filterChange, $ctrl.filterKeydown = filterKeydown, 
        $ctrl.isOptionFiltered = isOptionFiltered, $ctrl.getFilteredOptions = getFilteredOptions, 
        $ctrl.filterString = "", $ctrl.filteredOptions = $ctrl.getFilteredOptions();
    }
    function addWatchers($ctrl, $scope, $ngModel, $element) {
        $scope.$watch("$ctrl.ngModel", function(newValue, oldValue) {
            (newValue || oldValue) && newValue !== oldValue && $ngModel.$setDirty(), modelChange(newValue, oldValue, $ctrl);
        }), $scope.$watch("$ctrl.options", function(newValue, oldValue) {
            newValue !== oldValue && (preSelectModelValue($ngModel, $ctrl, $ctrl.options), setDefaultIfRequired($ngModel, $ctrl, $element, $ctrl), 
            $ctrl.filteredOptions = $ctrl.getFilteredOptions());
        });
    }
    function addEventHandlers($ctrl, $element, $ngModel, options, $timeout) {
        $element.find(".btn, .dropdown-menu").on("focusout", function() {
            $timeout(function() {
                0 !== $element.find(".btn:focus").length || $element.find(".btn-group").hasClass("open") || $element.trigger("blur");
            }, 150);
        }), $element.on("blur", function(event) {
            $ngModel.$setTouched();
        }), $element.find(".btn").on("keypress", function(event) {
            $ctrl.optionKeypress(event);
        }), $element.find(".btn").on("click", function() {
            $timeout(function() {
                $element.attr("filter") ? $element.find(".tw-select-filter").focus() : $element.find(".active a").focus();
            });
        }), $element.find("ul").on("keypress", "a", function(event) {
            $ctrl.optionKeypress(event);
        });
    }
    function checkForTranscludedContent($transclude, $ctrl) {
        $transclude(function(clone) {
            (clone.length > 1 || "" !== clone.text().trim()) && ($ctrl.hasTranscluded = !0);
        });
    }
    function getCharacterCodeFromKeypress(event) {
        return event.which || event.charCode || event.keyCode;
    }
    function getCharacterFromKeypress(event) {
        return String.fromCharCode(getCharacterCodeFromKeypress(event));
    }
    function preSelectModelValue($ngModel, $ctrl, options) {
        if (isValidModel($ctrl.ngModel)) {
            var option = findOptionFromValue($ctrl.options, $ctrl.ngModel);
            selectOption($ngModel, $ctrl, option);
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
            angular.equals(option.value, value) && (optionMatch = option);
        }), optionMatch;
    }
    function setDefaultIfRequired($ngModel, $ctrl, $element, $attrs) {
        if (($ctrl.ngRequired || $attrs.required) && !isValidModel($ctrl.ngModel)) for (var i = 0; i < $ctrl.options.length; i++) if (isValidModel($ctrl.options[i].value)) {
            selectOption($ngModel, $ctrl, $ctrl.options[i]);
            break;
        }
    }
    function selectOption($ngModel, $ctrl, option) {
        $ngModel.$setViewValue(option.value), $ngModel.$commitViewValue(), $ctrl.selected = option;
    }
    function resetOption($ngModel, $ctrl) {
        $ngModel.$setViewValue(null), $ngModel.$commitViewValue(), $ctrl.selected = !1;
    }
    function continueSearchAndSelectMatch($ngModel, $ctrl, options, letter) {
        var found = searchAndSelect($ngModel, $ctrl, options, $ctrl.search + letter);
        return found ? $ctrl.search += letter : ($ctrl.search = letter, found = searchAndSelect($ngModel, $ctrl, options, $ctrl.search)), 
        found;
    }
    function searchAndSelect($ngModel, $ctrl, options, term) {
        var found = !1, searchTerm = term.toLowerCase();
        return options.forEach(function(option) {
            !found && option.label && (0 === option.label.toLowerCase().indexOf(searchTerm) || option.note && 0 === option.note.toLowerCase().indexOf(searchTerm) || option.secondary && 0 === option.secondary.toLowerCase().indexOf(searchTerm) || option.searchable && 0 === option.searchable.toLowerCase().indexOf(searchTerm)) && (selectOption($ngModel, $ctrl, option), 
            found = !0);
        }), found;
    }
    function isValidModel(value) {
        return value || 0 === value || value === !1;
    }
    angular.module("tw.form-components").directive("twSelect", TwSelectDirective);
}(window.angular), function(angular) {
    "use strict";
    function TwUploadDroppableDirective() {
        return {
            bindToController: !0,
            controller: [ TwUploadDroppableController ],
            controllerAs: "$ctrl",
            replace: !1,
            transclude: !0,
            restrict: "E",
            scope: {
                title: "@",
                cta: "@",
                onUpload: "=",
                accept: "="
            },
            link: TwUploadDroppableLink,
            template: '<div class="text-center tw-upload-droppable-box" ng-class="{\'active\': $ctrl.isActive}"> \t\t\t\t<i class="icon icon-upload tw-upload-droppable-icon"></i>\t\t\t\t<h4 class="m-t-2" ng-if="$ctrl.title">{{$ctrl.title}}</h4>\t\t\t\t<div class="row">\t\t\t\t\t<div class="col-xs-12 col-sm-6 col-sm-offset-3 m-t-1">\t\t\t\t\t<ng-transclude></ng-transclude>\t\t\t\t\t<label class="link" for="file-upload">{{$ctrl.cta}}</label>\t\t\t\t\t<input tw-file-select id="file-upload" type="file" accept={{$ctrl.accept}} class="hidden" on-user-input="$ctrl.onManualUpload"/>\t\t\t\t\t</div>\t\t\t\t</div>\t\t\t</div>'
        };
    }
    function TwUploadDroppableController() {
        var $ctrl = this;
        $ctrl.dragCounter = 0, $ctrl.isActive = !1, $ctrl.onManualUpload = function() {
            $ctrl.onUpload && "function" == typeof $ctrl.onUpload && $ctrl.onUpload(angular.element(document.querySelector("#file-upload"))[0].files[0]);
        }, $ctrl.onDrop = function(file) {
            $ctrl.onUpload && "function" == typeof $ctrl.onUpload && $ctrl.onUpload(file), $ctrl.isActive = !1, 
            $ctrl.dropCounter = 0;
        }, $ctrl.onDragChange = function(enter) {
            enter ? ($ctrl.dragCounter++, 1 === $ctrl.dragCounter && ($ctrl.isActive = !0)) : ($ctrl.dragCounter--, 
            0 === $ctrl.dragCounter && ($ctrl.isActive = !1));
        };
    }
    function TwUploadDroppableLink(scope, element, attr) {
        element[0].addEventListener("dragenter", function(evt) {
            evt.preventDefault(), scope.$ctrl.onDragChange(!0), scope.$apply();
        }, !1), element[0].addEventListener("dragover", function(evt) {
            evt.preventDefault();
        }, !1), element[0].addEventListener("dragleave", function(evt) {
            evt.preventDefault(), scope.$ctrl.onDragChange(!1), scope.$apply();
        }, !1), element[0].addEventListener("drop", function(evt) {
            evt.preventDefault(), scope.$ctrl.onDrop(evt.dataTransfer.files[0]), scope.$apply();
        }, !1);
    }
    function TwFileSelectDirective() {
        return {
            bindToController: !0,
            controller: function() {},
            controllerAs: "$ctrl",
            replace: !1,
            restrict: "A",
            scope: {
                onUserInput: "="
            },
            link: TwFileSelectLink
        };
    }
    function TwFileSelectLink(scope, element) {
        element.on("change", function() {
            scope.$ctrl.onUserInput && "function" == typeof scope.$ctrl.onUserInput && scope.$ctrl.onUserInput();
        });
    }
    angular.module("tw.form-components").directive("twFileSelect", TwFileSelectDirective).controller("TwUploadDroppableController", TwUploadDroppableController).directive("twUploadDroppable", TwUploadDroppableDirective);
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
}(window.angular), function() {
    "use strict";
    function TwDynamicAsyncValidator($log, $q, $http) {
        function DyancicAsyncValidatorController() {
            console.log("this.twDynamicAsyncValidator"), console.log(ctrl.twDynamicAsyncValidator);
        }
        function emailValidLink(scope, element, attrs, ngModel) {
            attrs["tw-dynamic-async-validator"];
        }
        return {
            link: emailValidLink,
            restrict: "A",
            controller: DyancicAsyncValidatorController,
            contollerAs: "ctrl",
            bindToController: {
                twDynamicAsyncValidator: "="
            }
        };
    }
    angular.module("tw.form-validation").directive("twDynamicAsyncValidator", TwDynamicAsyncValidator), 
    TwDynamicAsyncValidator.$inject = [ "$log", "$q", "$http" ];
}(), function(angular) {
    "use strict";
    function TwFormValidation() {
        return {
            restrict: "E",
            link: function(scope, element) {
                $(element).on("submit", function() {
                    var elements = $(element).find("[tw-validation].ng-invalid");
                    return elements.closest(".form-group").addClass("has-error"), elements.closest(".checkbox, .radio").addClass("has-error"), 
                    !0;
                });
            }
        };
    }
    angular.module("tw.form-validation").directive("form", TwFormValidation);
}(window.angular), function(angular) {
    "use strict";
    function TwValidation() {
        return {
            restrict: "AC",
            require: "ngModel",
            link: validationLink
        };
    }
    function validationLink(scope, element, attrs, ngModel) {
        var formGroup = element.closest(".form-group");
        element.on("invalid", function(event) {
            event.preventDefault();
        }), ngModel.$validators.validation = function() {
            return scope.$evalAsync(function() {
                checkModelAndUpdate(ngModel, formGroup, element);
            }), !0;
        }, element.on("blur", function() {
            scope.$evalAsync(function() {
                checkModelAndUpdate(ngModel, formGroup, element);
            });
        });
    }
    function checkModelAndUpdate(ngModel, formGroup, element) {
        return ngModel.$valid ? (formGroup.removeClass("has-error"), void element.removeAttr("aria-invalid")) : void (ngModel.$touched && ngModel.$dirty && (formGroup.addClass("has-error"), 
        element.attr("aria-invalid", !0)));
    }
    angular.module("tw.form-validation").directive("twValidation", TwValidation);
}(window.angular);