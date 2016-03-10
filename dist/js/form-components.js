angular.module("tw.form-components", []);
!function(angular) {
    "use strict";
    function TwDateController($element, $log, $scope) {
        function init() {
            vm.date ? applyDateModelIfValidOrThrowError() : (vm.dateModelType = OBJECT_TYPE, 
            explodeDefaultDate()), setDateRequired(), setDateDisabled(), setDateLocale(), setDateRange(), 
            setMonths(), registerWatchers();
        }
        function applyDateModelIfValidOrThrowError() {
            if (!isValidDateModel()) throw new Error("date model passed should either be instance of Date or valid ISO8601 string");
            vm.dateModelType = "string" == typeof vm.date ? STRING_TYPE : OBJECT_TYPE, vm.explodeDateModel();
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
            vm.locale && (vm.dateLocale = vm.locale), vm.ngLocale && (vm.dateLocale = vm.ngLocale), 
            vm.dateLocale || setDefaultDateLocale();
        }
        function setDefaultDateLocale() {
            vm.dateLocale = DEFAULT_LOCALE_EN;
        }
        function setDateRange() {
            vm.dateRange = {}, setDateRangeWithStringInputs(), setDateRangeWithNgInputs();
        }
        function setDateRangeWithStringInputs() {
            validDateString(vm.minDateString) && (vm.dateRange.min = new Date(vm.minDateString)), 
            validDateString(vm.maxDateString) && (vm.dateRange.max = new Date(vm.maxDateString));
        }
        function setDateRangeWithNgInputs() {
            validDate(vm.ngMin) && (vm.dateRange.min = new Date(vm.ngMin)), validDate(vm.ngMax) && (vm.dateRange.max = new Date(vm.ngMax));
        }
        function explodeDateModel() {
            "string" == typeof vm.date ? explodeDateString(vm.date) : explodeDateObject(vm.date);
        }
        function explodeDateString(dateString) {
            explodeDateObject(new Date(dateString));
        }
        function explodeDateObject(dateObj) {
            vm.day = dateObj.getDate(), vm.month = dateObj.getMonth(), vm.year = dateObj.getFullYear();
        }
        function explodeDateModelIfValid() {
            isValidDateModel() && vm.explodeDateModel();
        }
        function explodeDefaultDate() {
            vm.day = null, vm.month = 0, vm.year = null;
        }
        function isValidDateModel() {
            return validDate(vm.date);
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
            $scope.$watch("vm.date", function() {
                explodeDateModelIfValid();
            }), $scope.$watch("vm.ngRequired", function(newValue, oldValue) {
                newValue !== oldValue && setDateRequired();
            }), $scope.$watch("vm.ngDisabled", function(newValue, oldValue) {
                newValue !== oldValue && setDateDisabled();
            }), $scope.$watch("vm.ngMin", function(newValue, oldValue) {
                newValue !== oldValue && setDateRange();
            }), $scope.$watch("vm.ngMax", function(newValue, oldValue) {
                newValue !== oldValue && setDateRange();
            }), $scope.$watch("vm.ngLocale", function(newValue, oldValue) {
                newValue !== oldValue && (setDateLocale(), setMonths());
            }), $scope.$watch("vm.month", function(newValue, oldValue) {
                newValue !== oldValue && vm.adjustLastDay();
            });
        }
        function getMonthsBasedOnIntlSupportForLocale() {
            var monthNames;
            return isIntlSupportedForLocale(vm.dateLocale) ? monthNames = getMonthNamesForLocale() : ($log.warn('i18n not supported for locale "' + vm.dateLocale + '"'), 
            monthNames = DEFAULT_MONTHS_EN), extendMonthsWithIds(monthNames);
        }
        function isIntlSupportedForLocale(locale) {
            return isIntlSupported() && window.Intl.DateTimeFormat.supportedLocalesOf([ locale ]).length > 0;
        }
        function isIntlSupported() {
            return window.Intl && "object" == typeof window.Intl;
        }
        function getMonthNamesForLocale() {
            for (var months = [], date = new Date(), i = 0; 12 > i; i++) date.setMonth(i), months.push(date.toLocaleDateString(vm.dateLocale, {
                month: "long"
            }));
            return months;
        }
        function extendMonthsWithIds(monthNames) {
            return monthNames.map(function(monthName, index) {
                return {
                    id: index,
                    name: monthName
                };
            });
        }
        function isExplodedDatePatternCorrect() {
            return isNumber(vm.year) && isNumber(vm.day) && isNumber(vm.month);
        }
        function isNumber(value) {
            return "number" == typeof value;
        }
        function isExplodedDateAboveMin() {
            return vm.dateRange.min ? getExplodedDateAsDate() >= vm.dateRange.min : !0;
        }
        function isExplodedDateBewlowMax() {
            return vm.dateRange.max ? getExplodedDateAsDate() <= vm.dateRange.max : !0;
        }
        function getExplodedDateAsDate() {
            return new Date(Number(vm.year), Number(vm.month), Number(vm.day));
        }
        function updateDateModelAndValidationClasses() {
            vm.adjustLastDay();
            var validationClasses = updateValidationClassesAndReturnList(VALIDATORS);
            if (containsInvalidClass(validationClasses)) return void (vm.date = null);
            var dateObj = getExplodedDateAsDate();
            vm.dateModelType === STRING_TYPE ? vm.date = getIsoDateWithoutTime(dateObj.toISOString()) : vm.date = dateObj;
        }
        function getIsoDateWithoutTime(dateAsISOString) {
            return dateAsISOString.substr(0, dateAsISOString.indexOf("T"));
        }
        function updateValidationClassesAndReturnList(validators) {
            var newClasses = [];
            return angular.forEach(validators, function(validator, validatorName) {
                var validClassName = "ng-valid-" + validatorName, inValidClassName = "ng-invalid-" + validatorName;
                validator() ? ($element.addClass(validClassName), newClasses.push(validClassName), 
                $element.removeClass(inValidClassName)) : ($element.addClass(inValidClassName), 
                newClasses.push(inValidClassName), $element.removeClass(validClassName));
            }), newClasses;
        }
        function containsInvalidClass(validationClasses) {
            for (var i = 0; i < validationClasses.length; i++) {
                var className = validationClasses[i];
                if (className.indexOf("-invalid-") > 0) return !0;
            }
            return !1;
        }
        function adjustLastDay() {
            var lastUTCDateForMonthAndYear = new Date(Date.UTC(vm.year, vm.month + 1, 0)), lastUTCDayForMonthAndYear = lastUTCDateForMonthAndYear.getUTCDate();
            vm.day > lastUTCDayForMonthAndYear && (vm.day = lastUTCDayForMonthAndYear);
        }
        var vm = this;
        vm.updateDateModelAndValidationClasses = updateDateModelAndValidationClasses, vm.explodeDateModel = explodeDateModel, 
        vm.adjustLastDay = adjustLastDay, vm.validDateModel = isValidDateModel;
        var DEFAULT_LOCALE_EN = "en", DEFAULT_MONTHS_EN = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ], STRING_TYPE = "string", OBJECT_TYPE = "object", VALIDATORS = {
            pattern: isExplodedDatePatternCorrect,
            min: isExplodedDateAboveMin,
            max: isExplodedDateBewlowMax
        };
        init();
    }
    angular.module("tw.form-components").controller("TwDateController", TwDateController), 
    TwDateController.$inject = [ "$element", "$log", "$scope" ];
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
                required: "@",
                ngRequired: "=",
                disabled: "@",
                ngDisabled: "=",
                locale: "@",
                ngLocale: "=",
                minDateString: "@min",
                ngMin: "=",
                maxDateString: "@max",
                ngMax: "="
            },
            template: templateAsString
        };
        return directive;
    }
    angular.module("tw.form-components").directive("twDate", TwDateDirective);
    var templateAsString = "<div class='row'> 				<div class='col-sm-3'> 					<label class='sr-only' for='day-{{::uniqueId}}'>Day</label> 					<input type='number' 						name='day' 						id='day-{{::uniqueId}}' 						class='form-control tw-date-day' 						ng-model='vm.day' 						ng-change='vm.updateDateModelAndValidationClasses()' 						placeholder='DD' 						min='1' 						max='31' 						maxlength='2' 						ng-min='1' 						ng-max='31' 						ng-maxlength='2' 						ng-disabled='vm.dateDisabled' 						ng-required='vm.dateRequired' 						tw-validation /> 				</div> 				<div class='col-sm-5'> 					<label class='sr-only' for='month-{{::uniqueId}}'>Month</label> 					<select name='month' 						id='month-{{::uniqueId}}' 						class='form-control' 						ng-model='vm.month' 						ng-change='vm.updateDateModelAndValidationClasses()' 						ng-options='month.id as month.name for month in vm.dateMonths' 						ng-disabled='vm.dateDisabled' 						ng-required='vm.dateRequired' 						autocomplete='off' 						tw-validation> 					</select> 				</div> 				<div class='col-sm-4'> 					<label class='sr-only' for='year-{{::uniqueId}}'>Year</label> 					<input type='number' 						id='year-{{::uniqueId}}' 						name='year' 						class='form-control' 						placeholder='YYYY' 						ng-model='vm.year' 						ng-change='vm.updateDateModelAndValidationClasses()' 						ng-min='vm.dateRange.min.getFullYear()' 						ng-max='vm.dateRange.max.getFullYear()' 						maxlength='4' 						ng-maxlength='4' 						ng-disabled='vm.dateDisabled' 						ng-required='vm.dateRequired' 						tw-validation /> 				</div> 			</div>";
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
            link: function(scope, element) {},
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
}(window.angular);