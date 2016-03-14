(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.controller('TwDateController', TwDateController);

	TwDateController.$inject = ['$element', '$log', '$scope'];

	function TwDateController($element, $log, $scope) {
		var vm = this;

		vm.updateDateModelAndValidationClasses = updateDateModelAndValidationClasses;

		vm.explodeDateModel = explodeDateModel;
		vm.adjustLastDay = adjustLastDay;
		vm.validDateModel = isValidDateModel;

		var DEFAULT_LOCALE_EN = 'en';
		var DEFAULT_MONTHS_EN = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		var STRING_TYPE = 'string';
		var OBJECT_TYPE = 'object';

		var VALIDATORS = {
			pattern: isExplodedDatePatternCorrect,
			min: isExplodedDateAboveMin,
			max: isExplodedDateBewlowMax
		};

		function init() {
			if (vm.date) {
				applyDateModelIfValidOrThrowError();
			} else {
				if (vm.modelType) {
					if (isValidDateModelType(vm.modelType)) {
						vm.dateModelType = vm.modelType;
					} else {
						throw new Error ('Invalid modelType, should be ' + STRING_TYPE + ' or ' + OBJECT_TYPE);
					}
				} else {
					vm.dateModelType = OBJECT_TYPE;
				}
				explodeDefaultDate();
			}

			setDateRequired();
			setDateDisabled();
			setDateLocale();
			setDateRange();

			setMonths();

			registerWatchers();
		}

		function isValidDateModelType(modelType) {
			return modelType === STRING_TYPE || modelType === OBJECT_TYPE;
		}

		function applyDateModelIfValidOrThrowError() {
			if (isValidDateModel()) {
				vm.dateModelType = typeof vm.date === 'string' ? STRING_TYPE : OBJECT_TYPE;
				vm.explodeDateModel();
			} else {
				throw new Error('date model passed should either be instance of Date or valid ISO8601 string');
			}
		}

		function setMonths() {
			vm.dateMonths = getMonthsBasedOnIntlSupportForLocale();
		}

		function setDateRequired() {
			vm.dateRequired = vm.ngRequired !== undefined ? vm.ngRequired : vm.required !== undefined;
		}
		function setDateDisabled() {
			vm.dateDisabled = vm.ngDisabled !== undefined ? vm.ngDisabled : vm.disabled !== undefined;
		}

		function setDateLocale() {
			if (vm.locale) {
				vm.dateLocale = vm.locale;
			}
			if (vm.twLocale) {
				vm.dateLocale = vm.twLocale;
			}
			if (!vm.dateLocale) {
				setDefaultDateLocale();
			}
		}

		function setDefaultDateLocale() {
			vm.dateLocale = DEFAULT_LOCALE_EN;
		}

		function setDateRange() {
			vm.dateRange = {};
			setDateRangeWithStringInputs();
			setDateRangeWithNgInputs();
		}

		function setDateRangeWithStringInputs() {
			if (validDateString(vm.minDateString)) {
				vm.dateRange.min = new Date(vm.minDateString);
			}
			if (validDateString(vm.maxDateString)) {
				vm.dateRange.max = new Date(vm.maxDateString);
			}
		}

		function setDateRangeWithNgInputs() {
			if (validDate(vm.ngMin)) {
				vm.dateRange.min = new Date(vm.ngMin);
			}
			if (validDate(vm.ngMax)) {
				vm.dateRange.max = new Date(vm.ngMax);
			}
		}

		function explodeDateModel() {
			if (typeof vm.date === "string") {
				explodeDateString(vm.date);
			} else {
				explodeDateObject(vm.date);
			}
		}

		function explodeDateString(dateString) {
			explodeDateObject(new Date(dateString));
		}

		function explodeDateObject(dateObj) {
			vm.day = dateObj.getDate();
			vm.month = dateObj.getMonth();
			vm.year = dateObj.getFullYear();
		}

		function explodeDateModelIfValid() {
			if (isValidDateModel()) {
				vm.explodeDateModel();
			}
		}

		function explodeDefaultDate() {
			vm.day = null;
			vm.month = 0;
			vm.year = null;
		}

		function isValidDateModel() {
			return validDate(vm.date);
		}

		function validDate(date) {
			return validDateObject(date) || validDateString(date);
		}

		function validDateObject(dateObj) {
			return Object.prototype.toString.call(dateObj) === "[object Date]"
				&& !isNaN(dateObj.getTime());
		}

		function validDateString(dateString) {
			return typeof dateString === 'string' && validDateObject(new Date(dateString));
		}

		function registerWatchers() {
			$scope.$watch('vm.date', function() {
				explodeDateModelIfValid();
			});

			$scope.$watch('vm.ngRequired', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					setDateRequired();
				}
			});

			$scope.$watch('vm.ngDisabled', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					setDateDisabled();
				}
			});

			$scope.$watch('vm.ngMin', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					setDateRange();
				}
			});

			$scope.$watch('vm.ngMax', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					setDateRange();
				}
			});

			$scope.$watch('vm.twLocale', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					setDateLocale();
					setMonths();
				}
			});

			$scope.$watch('vm.month', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					vm.adjustLastDay();
				}
			});
		}

		function getMonthsBasedOnIntlSupportForLocale() {
			var monthNames;

			if (isIntlSupportedForLocale(vm.dateLocale)) {
				monthNames = getMonthNamesForLocale();
			} else {
				$log.warn('i18n not supported for locale "' + vm.dateLocale + '"');
				monthNames = DEFAULT_MONTHS_EN;
			}

			return extendMonthsWithIds(monthNames);
		}

		function isIntlSupportedForLocale(locale) {
			return isIntlSupported() && window.Intl.DateTimeFormat.supportedLocalesOf([locale]).length > 0;
		}

		function isIntlSupported() {
			return window.Intl && typeof window.Intl === 'object';
		}

		function getMonthNamesForLocale() {
			var months = [];
			var date = new Date();
			for(var i = 0; i < 12; i++) {
				date.setMonth(i);
				months.push(
					date.toLocaleDateString(vm.dateLocale, {month: "long"})
				);
			}
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
			return typeof value === 'number';
		}


		function isExplodedDateAboveMin() {
			return vm.dateRange.min ? getExplodedDateAsDate() >= vm.dateRange.min : true;
		}

		function isExplodedDateBewlowMax() {
			return vm.dateRange.max ? getExplodedDateAsDate() <= vm.dateRange.max : true;
		}

		function getExplodedDateAsDate() {
			return new Date(
				Number(vm.year),
				Number(vm.month),
				Number(vm.day)
			);
		}

		function updateDateModelAndValidationClasses() {
			vm.adjustLastDay();

			var validationClasses = updateValidationClassesAndReturnList(VALIDATORS);

			if (containsInvalidClass(validationClasses)) {
				vm.date = null;
				return;
			}

			var dateObj = getExplodedDateAsDate();

			if (vm.dateModelType === STRING_TYPE) {
				vm.date = getIsoDateWithoutTime(dateObj.toISOString());
			} else {
				vm.date = dateObj;
			}
		}

		function getIsoDateWithoutTime(dateAsISOString) {
			return dateAsISOString.substr(0, dateAsISOString.indexOf('T'));
		}

		function updateValidationClassesAndReturnList(validators) {
			var newClasses = [];
			angular.forEach(validators, function(validator, validatorName) {
				var validClassName = 'ng-valid-' + validatorName;
				var inValidClassName = 'ng-invalid-' + validatorName;
				if (validator()) {
					$element.addClass(validClassName);
					newClasses.push(validClassName);
					$element.removeClass(inValidClassName);
				} else {
					$element.addClass(inValidClassName);
					newClasses.push(inValidClassName);
					$element.removeClass(validClassName);
				}
			});
			return newClasses;
		}

		function containsInvalidClass(validationClasses) {
			for (var i=0; i<validationClasses.length; i++) {
				var className = validationClasses[i];
				if (className.indexOf('-invalid-') > 0) {
					return true;
				}
			}
			return false;
		}

		function stringifyDateObject(dateObj) {
			return dateObj.getFullYear()
				+ '-' + pad(dateObj.getMonth() + 1)
				+ '-' + pad(dateObj.getDate());
		}

		function pad(n) {
			return (n < 10) ? '0' + n : n;
		}

		function adjustLastDay() {
			var lastUTCDateForMonthAndYear = new Date(Date.UTC(vm.year, vm.month + 1, 0)); // to get last day of month
			var lastUTCDayForMonthAndYear = lastUTCDateForMonthAndYear.getUTCDate();

			if (vm.day > lastUTCDayForMonthAndYear) {
				vm.day = lastUTCDayForMonthAndYear;
			}
		}

		init();
	}

})(window.angular);
