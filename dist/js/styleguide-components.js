angular.module("tw.form-validation", []);
angular.module("tw.form-styling", []);
angular.module("tw.form-components", []);
angular.module("tw.styleguide-components", ['tw.form-validation', 'tw.form-styling', 'tw.form-components']);
!function(angular) {
    "use strict";
    function TwDateController($element, $log, $scope) {
        function init() {
            if (vm.ngModel) applyDateModelIfValidOrThrowError(), initialisedWithDate = !0; else {
                if (vm.modelType) {
                    if (vm.modelType !== STRING_TYPE && vm.modelType !== OBJECT_TYPE) throw new Error("Invalid modelType, should be " + STRING_TYPE + " or " + OBJECT_TYPE);
                    vm.dateModelType = vm.modelType;
                } else vm.dateModelType = OBJECT_TYPE;
                vm.day = null, vm.month = "0", vm.year = null;
            }
            ngModel = $element.controller("ngModel"), ngModel.$validators.min = function(value) {
                var limit = prepDateLimitForComparison(vm.ngMin, vm.min), dateValue = prepDateValueForComparison(value);
                return !limit || !dateValue || dateValue >= limit;
            }, ngModel.$validators.max = function(value) {
                var limit = prepDateLimitForComparison(vm.ngMax, vm.max), dateValue = prepDateValueForComparison(value);
                return !limit || !dateValue || limit >= dateValue;
            }, setDateRequired(), setDateDisabled(), setDateLocale(), setMonths(), registerWatchers();
        }
        function prepDateLimitForComparison(ngLimit, attrLimit) {
            var limit = ngLimit ? ngLimit : attrLimit ? attrLimit : !1;
            return limit ? (limit = "string" == typeof limit ? new Date(limit) : limit, validDateObject(limit) ? limit : !1) : !1;
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
            vm.locale || (vm.locale = DEFAULT_LOCALE_EN);
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
            for (var date, months = [], i = 0; 12 > i; i++) {
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
            template: " 				<input type='hidden' class='sr-only' 					name='{{$ctrl.name}}' 					ng-model='$ctrl.ngModel' 					ng-click='$ctrl.hiddenClick($event)' 					ng-disabled='$ctrl.ngDisabled'/> 				<button class='tw-checkbox-button' tw-focusable 					ng-click='$ctrl.buttonClick($event)' 					ng-focus='$ctrl.buttonFocus()' 					ng-blur='$ctrl.buttonBlur()' 					ng-disabled='$ctrl.ngDisabled' 					ng-class='{\"checked\": $ctrl.checked}' 					aria-pressed='{{$ctrl.checked}}'> 					<span class='tw-checkbox-check glyphicon glyphicon-ok'></span> 				</button>"
        };
    }
    angular.module("tw.form-components").directive("twCheckbox", TwCheckboxDirective);
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
    var templateAsString = " 			<div class='row'> 				<div class='col-sm-3'> 					<label class='sr-only' for='day-{{::uniqueId}}'>Day</label> 					<input type='number' 						name='day' 						id='day-{{::uniqueId}}' 						class='form-control tw-date-day' 						ng-model='vm.day' 						ng-change='vm.updateDateModelAndValidationClasses()' 						placeholder='DD' 						min='1' 						ng-min='1' 						ng-disabled='vm.dateDisabled' 						ng-required='vm.dateRequired' 						tw-focusable /> 				</div> 				<div class='col-sm-5'> 					<label class='sr-only' for='month-{{::uniqueId}}'>Month</label> 					<tw-select 						name='month' 						class='tw-date-month' 						id='month-{{::uniqueId}}' 						ng-model='vm.month' 						ng-change='vm.updateDateModelAndValidationClasses()' 						ng-required='vm.dateRequired' 						ng-disabled='vm.dateDisabled' 						options='vm.dateMonths'> 					</tw-select> 				</div> 				<div class='col-sm-4'> 					<label class='sr-only' for='year-{{::uniqueId}}'>Year</label> 					<input type='number' 						id='year-{{::uniqueId}}' 						name='year' 						class='form-control tw-date-year' 						placeholder='YYYY' 						ng-model='vm.year' 						ng-change='vm.updateDateModelAndValidationClasses()' 						ng-min='vm.dateRange.min.getFullYear()' 						ng-max='vm.dateRange.max.getFullYear()' 						maxlength='4' 						ng-maxlength='4' 						ng-disabled='vm.dateDisabled' 						ng-required='vm.dateRequired' 						tw-focusable /> 				</div> 			</div>";
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
            template: "<div ng-switch='$ctrl.type'> 				<input ng-switch-when='text'  					name='{{$ctrl.name}}'  					type='text' 					class='form-control' 					placeholder='{{$ctrl.placeholder}}' 					ng-model='$ctrl.ngModel' 					ng-model-options='{ allowInvalid: true }' 					ng-required='$ctrl.ngRequired' 					ng-disabled='$ctrl.ngDisabled' 					ng-pattern='$ctrl.ngPattern' 					ng-change='$ctrl.change()' 					ng-focus='$ctrl.focus()' 					ng-blur='$ctrl.blur()' 					ng-minlength='$ctrl.ngMinlength' 					ng-maxlength='$ctrl.ngMaxlength' />  				<input ng-switch-when='number'  					name='{{$ctrl.name}}'  					type='number' 					step='{{$ctrl.step}}' 					class='form-control' 					placeholder='{{$ctrl.placeholder}}' 					ng-model='$ctrl.ngModel' 					ng-model-options='{ allowInvalid: true }' 					ng-required='$ctrl.ngRequired' 					ng-disabled='$ctrl.ngDisabled' 					ng-change='$ctrl.change()' 					ng-focus='$ctrl.focus()' 					ng-blur='$ctrl.blur()' 					ng-min='$ctrl.ngMin' 					ng-max='$ctrl.ngMax' />  				<div ng-switch-when='radio' 					class='radio' 					ng-class='{disabled: $ctrl.ngDisabled}' 					ng-repeat='option in $ctrl.options'> 					<label> 						<tw-radio 							name='{{$ctrl.name}}' 							ng-value='option.value' 							ng-model='$ctrl.ngModel' 							ng-required='$ctrl.ngRequired' 							ng-disabled='$ctrl.ngDisabled' 							ng-change='$ctrl.change()' 							ng-click='$ctrl.change()' 							ng-focus='$ctrl.focus()' 							ng-blur='$ctrl.blur()' /> 						{{option.label}} 					</label> 				</div> 				<div ng-switch-when='checkbox' 					class='checkbox' 					ng-class='{disabled: $ctrl.ngDisabled}'> 					<label> 						<tw-checkbox 							name='{{$ctrl.name}}' 							ng-model='$ctrl.ngModel' 							ng-required='$ctrl.ngRequired' 							ng-disabled='$ctrl.ngDisabled' 							ng-change='$ctrl.change()' 							ng-click='$ctrl.change()' 							ng-focus='$ctrl.focus()' 							ng-blur='$ctrl.blur()' /> 						{{$ctrl.placeholder}} 					</label> 				</div> 				<div ng-switch-when='select'> 					<tw-select 						name='{{$ctrl.name}}' 						options='$ctrl.options' 						placeholder='{{$ctrl.placeholder}}' 						ng-model='$ctrl.ngModel' 						ng-required='$ctrl.ngRequired' 						ng-disabled='$ctrl.ngDisabled' 						ng-change='$ctrl.change()' 						ng-focus='$ctrl.focus()' 						ng-blur='$ctrl.blur()' /> 				</div> 				<ng-transclude class='error-messages'></ng-transclude> 			</div>"
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
            return "undefined" == typeof scope.$ctrl.ngMin ? !0 : !("number" == typeof viewValue && "number" == typeof scope.$ctrl.ngMin && viewValue < scope.$ctrl.ngMin);
        }, ngModel.$validators.max = function(modelValue, viewValue) {
            return "undefined" == typeof scope.$ctrl.ngMax ? !0 : !("number" == typeof viewValue && "number" == typeof scope.$ctrl.ngMax && viewValue > scope.$ctrl.ngMax);
        };
    }
    angular.module("tw.form-components").directive("twDynamicFormControl", TwDynamicFormControl), 
    angular.module("tw.form-components").controller("TwDynamicFormControlController", TwDynamicFormControlController), 
    TwDynamicFormControlController.$inject = [ "$element", "$scope" ];
}(window.angular), function(angular) {
    function TwLoader() {
        return {
            restrict: "E",
            template: "<div class='loader'> 			  <div class='loader-spinner'></div> 			  <div class='loader-flag'> 			    <svg xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='-2 -2 56 56'> 			      <polygon class='loader-flag-stroke'  stroke='#00B9FF' stroke-width='2' stroke-linejoin='miter' stroke-linecap='round' stroke-miterlimit='10' stroke-dasharray='300' stroke-dashoffset='300' fill='none' points='24.6,27.3 0,27.3 14.3,13.7 6.1,0 48.2,0 26.3,52 19.5,52 39.2,5.5 16.8,5.5 21.6,13.6 13.4,21.8 27,21.8' /> 			    </svg> 			    <svg class='loader-flag-fill' xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='0 2 52 48'> 			      <polygon fill='#00B9FF' points='6.1,0 14.3,13.7 0,27.3 24.6,27.3 27,21.8 13.4,21.8 21.6,13.6 16.8,5.5 39.2,5.5 19.5,52 26.3,52 48.2,0 '/> 			    </svg> 			  </div> 			</div>"
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
            template: " 				<input type='radio' class='sr-only' 					name='{{$ctrl.name}}' 					ng-value='$ctrl.ngValue || $ctrl.value' 					ng-model='$ctrl.ngModel' 					ng-disabled='$ctrl.ngDisabled' 					ng-change='$ctrl.hiddenInputChange()' 					tabindex='-1' /> 				<button type='button' class='tw-radio-button' tw-focusable 					ng-click='$ctrl.buttonClick($event)' 					ng-focus='$ctrl.buttonFocus()' 					ng-blur='$ctrl.buttonBlur()' 					ng-disabled='$ctrl.ngDisabled' 					ng-class='{checked: $ctrl.checked}' 					aria-pressed='{{$ctrl.checked}}'> 					<span class='tw-radio-check'></span> 				</button>"
        };
    }
    angular.module("tw.form-components").directive("twRadio", TwRadioDirective);
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
                filter: "@"
            },
            template: " 				<div class='btn-group btn-block dropdown tw-select' aria-hidden='false'> 					<button type='button' class='btn btn-input dropdown-toggle' 						data-toggle='dropdown' aria-expanded='false' 						ng-disabled='$ctrl.ngDisabled' 						ng-focus='$ctrl.buttonFocus()' 						tw-focusable> 						<span class='tw-select-selected' ng-if='$ctrl.ngModel != null'> 							<i class='icon pull-left {{$ctrl.selected.icon}}' ng-if='$ctrl.selected && $ctrl.selected.icon'> 							</i><i class='currency-flag currency-flag-{{$ctrl.selected.currency | lowercase}} pull-left' 								ng-if='$ctrl.selected && $ctrl.selected.currency'> 							</i><span class='circle circle-inverse pull-left'  								ng-class='{\"circle-sm\": $ctrl.selected.secondary, \"circle-xs\": !$ctrl.selected.secondary}' 								ng-if='$ctrl.selected.circleText || $ctrl.selected.circleImage || $ctrl.selected.circleIcon'> 								<span ng-if='$ctrl.selected.circleText'>{{$ctrl.selected.circleText}}</span> 								<img ng-if='$ctrl.selected.circleImage' ng-src='{{$ctrl.selected.circleImage}}' /> 								<i ng-if='$ctrl.selected.circleIcon' class='icon {{$ctrl.selected.circleIcon}}'></i> 							</span><span class='text-ellipsis'><span class='tw-select-label'>{{$ctrl.selected.label}}</span><span 							ng-if='$ctrl.selected.note' class='tw-select-note small m-l-1'>{{$ctrl.selected.note}}</span><span 							ng-if='$ctrl.selected.secondary' class='tw-select-secondary small text-ellipsis'>{{$ctrl.selected.secondary}}</span></span> 						</span> 						<span class='form-control-placeholder' ng-if='$ctrl.ngModel == null'>{{$ctrl.placeholder}}</span> 						<span class='caret'></span> 					</button> 					<ul class='dropdown-menu' role='menu'> 						<li ng-if='$ctrl.filter'> 							<a href='' class='tw-select-filter-link p-a-0' ng-focus='$ctrl.filterFocus()'> 								<div class='input-group'> 									<span class='input-group-addon'><i class='icon icon-search'></i></span> 									<input type='text' class='form-control tw-select-filter' placeholder='{{$ctrl.filter}}' 										ng-model='$ctrl.filterString' 										ng-change='$ctrl.filterChange()' 										ng-keydown='$ctrl.filterKeydown($event)' /> 								</div> 							</a> 						</li> 						<li ng-class='{active: !$ctrl.ngModel}' 							ng-if='$ctrl.placeholder && !$ctrl.ngRequired && !$ctrl.filter'> 							<a href='' 								ng-click='$ctrl.placeholderClick()' 								ng-focus='$ctrl.placeholderFocus()' 								value='' class='tw-select-placeholder' tw-focusable> 								{{$ctrl.placeholder}} 							</a> 						</li> 						<li ng-if='($ctrl.placeholder && !$ctrl.ngRequired) || $ctrl.filter' class='divider'></li> 						<li 							ng-repeat='option in $ctrl.filteredOptions' 							ng-class='{ 								active: $ctrl.ngModel === option.value, 								\"dropdown-header\": option.header, 								\"tw-select-option\": !option.header 							}'> 							<span ng-if='option.header'>{{option.header}}</span> 							<a href='' 								ng-if='!option.header' 								ng-click='$ctrl.optionClick(option)' 								ng-focus='$ctrl.optionFocus(option)' 								index='{{$index}}' 								class='tw-select-option-link' tw-focusable> 								<i class='icon {{option.icon}} pull-left' ng-if='option.icon'> 								</i><i class='currency-flag currency-flag-{{option.currency | lowercase}} pull-left' ng-if='option.currency'> 								</i><span class='circle circle-inverse pull-left' ng-class='{\"circle-sm\": option.secondary, \"circle-xs\": !option.secondary}' 									ng-if='option.circleText || option.circleImage || option.circleIcon'> 									<span ng-if='option.circleText'>{{option.circleText}}</span> 									<img ng-if='option.circleImage' ng-src='{{option.circleImage}}' /> 									<i ng-if='option.circleIcon' class='icon {{option.circleIcon}}'></i> 								</span>{{option.label}}<span 								ng-if='option.note' class='tw-select-note small m-l-1'>{{option.note}}</span><span 								ng-if='option.secondary' class='tw-select-secondary small text-ellipsis'>{{option.secondary}}</span> 							</a> 						</li> 						<li ng-if='$ctrl.hasTranscluded' class='divider'></li> 						<li ng-transclude ng-if='$ctrl.hasTranscluded' class='tw-select-transcluded'></li> 					</ul> 				</div> 				<input type='hidden' class='tw-select-hidden' 					name='{{$ctrl.name}}' 					value='{{$ctrl.ngModel}}' 					ng-disabled='$ctrl.ngDisabled' />"
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
            return filterStringLower ? option.label && option.label.toLowerCase().search(filterStringLower) >= 0 || option.note && option.note.toLowerCase().search(filterStringLower) >= 0 || option.secondary && option.secondary.toLowerCase().search(filterStringLower) >= 0 : !0;
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
        if ($ctrl.ngModel) {
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
        ($ctrl.ngRequired || $attrs.required) && !$ctrl.ngModel && $ctrl.options[0] && selectOption($ngModel, $ctrl, $ctrl.options[0]);
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
            !found && option.label && (0 === option.label.toLowerCase().indexOf(searchTerm) || option.note && 0 === option.note.toLowerCase().indexOf(searchTerm) || option.secondary && 0 === option.secondary.toLowerCase().indexOf(searchTerm)) && (selectOption($ngModel, $ctrl, option), 
            found = !0);
        }), found;
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
            template: '<div class="text-center tw-upload-droppable-box" ng-class="{\'active\': $ctrl.isActive}"> 				<i class="icon icon-upload tw-upload-droppable-icon"></i>				<h4 class="m-t-2">{{$ctrl.title}}</h4>				<div class="row">					<div class="col-xs-12 col-sm-6 col-sm-offset-3 m-t-1">					<ng-transclude></ng-transclude>					<label class="link" for="file-upload">{{$ctrl.cta}}</label>					<input tw-file-select id="file-upload" type="file" accept={{$ctrl.accept}} class="hidden" on-user-input="$ctrl.onManualUpload"/>					</div>				</div>			</div>'
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
}(window.angular), function(angular) {
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