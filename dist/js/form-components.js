angular.module("tw.form-components", []);
!function(angular) {
    "use strict";
    function TwDateController($element, $log, $scope) {
        function init() {
            validDateModel() ? vm.explodeDateModel() : explodeDefaultDate(), setDefaultLocaleIfNeeded(), 
            setYearRange(), vm.months = getMonthsBasedOnIntlSupportForLocale(), void 0 === vm.ngRequired && (vm.ngRequired = void 0 !== vm.required), 
            void 0 === vm.ngDisabled && (vm.ngDisabled = void 0 !== vm.disabled), registerWatchers();
        }
        function setYearRange() {}
        function setDefaultLocaleIfNeeded() {
            vm.locale || setDefaultLocale();
        }
        function setDefaultLocale() {
            vm.locale = DEFAULT_LOCALE_EN;
        }
        function explodeDateModel() {
            "string" == typeof vm.date ? explodeDateString(vm.date) : explodeDateObject(vm.date);
        }
        function explodeDateString(dateString) {
            explodeDateObject(new Date(dateString));
        }
        function explodeDateObject(dateObj) {
            vm.day = dateObj.getUTCDate(), vm.month = dateObj.getUTCMonth(), vm.year = dateObj.getUTCFullYear();
        }
        function explodeDateModelIfValid() {
            validDateModel() && vm.explodeDateModel();
        }
        function explodeDefaultDate() {
            vm.day = null, vm.month = 0, vm.year = null;
        }
        function validDateModel() {
            return validDateObject(vm.date) || validDateString(vm.date);
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
            }), $scope.$watch("vm.month", function(newValue, oldValue) {
                newValue !== oldValue && vm.adjustLastDay();
            }), $scope.$watch("vm.locale", function(newValue, oldValue) {
                newValue !== oldValue && (vm.months = getMonthsBasedOnIntlSupportForLocale(vm.locale));
            });
        }
        function getMonthsBasedOnIntlSupportForLocale() {
            var monthNames;
            return isIntlSupportedForLocale(vm.locale) ? monthNames = getMonthNamesForLocale() : ($log.warn('i18n not supported for locale "' + vm.locale + '"'), 
            monthNames = DEFAULT_MONTHS_EN), extendMonthsWithIds(monthNames);
        }
        function isIntlSupportedForLocale(locale) {
            return isIntlSupported() && window.Intl.DateTimeFormat.supportedLocalesOf([ locale ]).length > 0;
        }
        function isIntlSupported() {
            return window.Intl && "object" == typeof window.Intl;
        }
        function getMonthNamesForLocale() {
            for (var months = [], date = new Date(), i = 0; 12 > i; i++) date.setMonth(i), months.push(date.toLocaleDateString(vm.locale, {
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
            return isNumber(vm.day) && isNumber(vm.month) && isNumber(vm.year);
        }
        function isNumber(value) {
            return "number" == typeof value;
        }
        function updateDateModel() {
            var dateObj;
            if (!isExplodedDatePatternCorrect()) return vm.date = null, void $element.addClass("ng-invalid-pattern");
            vm.adjustLastDay(), dateObj = new Date(Date.UTC(Number(vm.year), Number(vm.month), Number(vm.day)));
            var minObj = new Date(vm.ngMin), maxObj = new Date(vm.ngMax);
            return minObj > dateObj ? void $element.addClass("ng-invalid-min") : dateObj > maxObj ? void $element.addClass("ng-invalid-max") : ($element.removeClass("ng-invalid-min"), 
            $element.removeClass("ng-invalid-max"), $element.removeClass("ng-invalid-pattern"), 
            void ("string" == typeof vm.date ? vm.date = stringifyDateObject(dateObj) : vm.date = dateObj));
        }
        function stringifyDateObject(dateObj) {
            return dateObj.getUTCFullYear() + "-" + pad(dateObj.getUTCMonth() + 1) + "-" + pad(dateObj.getUTCDate());
        }
        function pad(n) {
            return 10 > n ? "0" + n : n;
        }
        function adjustLastDay() {
            var lastUTCDateForMonthAndYear = new Date(Date.UTC(vm.year, vm.month + 1, 0)), lastUTCDayForMonthAndYear = lastUTCDateForMonthAndYear.getUTCDate();
            vm.day > lastUTCDayForMonthAndYear && (vm.day = lastUTCDayForMonthAndYear);
        }
        var vm = this;
        vm.updateDateModel = updateDateModel, vm.explodeDateModel = explodeDateModel, vm.adjustLastDay = adjustLastDay, 
        vm.validDateModel = validDateModel;
        var DEFAULT_LOCALE_EN = "en-GB", DEFAULT_MONTHS_EN = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
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
                ngRequired: "=",
                required: "@",
                ngDisabled: "=",
                disabled: "@",
                locale: "=",
                ngMin: "=",
                ngMax: "="
            },
            template: templateAsString
        };
        return directive;
    }
    angular.module("tw.form-components").directive("twDate", TwDateDirective);
    var templateAsString = "<div class='row'> 				<div class='col-sm-3'> 					<label class='sr-only' for='day-{{::uniqueId}}'>Day</label> 					<input type='number' 						name='day' 						id='day-{{::uniqueId}}' 						class='form-control tw-date-day' 						ng-model='vm.day' 						ng-change='vm.updateDateModel()' 						placeholder='DD' 						min='1' 						max='31' 						maxlength='2' 						ng-min='1' 						ng-max='31' 						ng-maxlength='2' 						ng-disabled='vm.ngDisabled' 						ng-required='vm.ngRequired' 						tw-validation /> 				</div> 				<div class='col-sm-5'> 					<label class='sr-only' for='month-{{::uniqueId}}'>Month</label> 					<select name='month' 						id='month-{{::uniqueId}}' 						class='form-control' 						ng-model='vm.month' 						ng-change='vm.updateDateModel()' 						ng-options='month.id as month.name for month in vm.months' 						ng-required='vm.ngRequired' 						ng-disabled='vm.ngDisabled' 						autocomplete='off' 						tw-validation> 					</select> 				</div> 				<div class='col-sm-4'> 					<label class='sr-only' for='year-{{::uniqueId}}'>Year</label> 					<input type='number' 						id='year-{{::uniqueId}}' 						name='year' 						class='form-control' 						placeholder='YYYY' 						ng-model='vm.year' 						ng-change='vm.updateDateModel()' 						min='1900' 						max='2015' 						maxlength='4' 						ng-maxlength='4' 						ng-disabled='vm.ngDisabled' 						ng-required='vm.ngRequired' 						tw-validation /> 				</div> 			</div>";
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