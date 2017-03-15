(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.controller('TwDateController', TwDateController);

	TwDateController.$inject = ['$element', '$log', '$scope'];

	function TwDateController($element, $log, $scope) {
		var vm = this,
			ngModel,
			initialisedWithDate = false;

		vm.updateDateModelAndValidationClasses = updateDateModelAndValidationClasses;

		vm.explodeDateModel = explodeDateModel;
		vm.combineDate = combineDate;
		vm.adjustLastDay = adjustLastDay;
		vm.validDate = validDate;

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

		function init() {
			if (vm.ngModel) {
				applyDateModelIfValidOrThrowError();
				initialisedWithDate = true;
			} else {
				if (vm.modelType) {
					if (vm.modelType === STRING_TYPE || vm.modelType === OBJECT_TYPE) {
						vm.dateModelType = vm.modelType;
					} else {
						throw new Error('Invalid modelType, should be ' + STRING_TYPE + ' or ' + OBJECT_TYPE);
					}
				} else {
					vm.dateModelType = OBJECT_TYPE;
				}

				vm.day = null;
				vm.month = 0;
				vm.year = null;
			}

			ngModel = $element.controller('ngModel');

			ngModel.$validators.min = function(value) {
				var limit = prepDateLimitForComparison(vm.ngMin, vm.min);
				var dateValue = prepDateValueForComparison(value);

				return !limit || !dateValue || dateValue >= limit;
			};
			ngModel.$validators.max = function(value) {
				var limit = prepDateLimitForComparison(vm.ngMax, vm.max);
				var dateValue = prepDateValueForComparison(value);

				return !limit || !dateValue || dateValue <= limit;
			};

			setDateRequired();
			setDateDisabled();
			setDateLocale();

			setMonths();

			registerWatchers();
		}

		function prepDateLimitForComparison(ngLimit, attrLimit) {
			var limit = ngLimit ? ngLimit : (attrLimit ? attrLimit : false);
			if (!limit) {
				return false;
			}
			limit = typeof limit === 'string' ? new Date(limit) : limit;
			if (!validDateObject(limit)) {
				return false;
			}
			return limit;
		}

		function prepDateValueForComparison(dateValue) {
			return typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
		}

		function applyDateModelIfValidOrThrowError() {
			if (validDate(vm.ngModel)) {
				vm.dateModelType = typeof vm.ngModel === 'string' ? STRING_TYPE : OBJECT_TYPE;
				vm.explodeDateModel(vm.ngModel);
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
			if (!vm.locale) {
				vm.locale = DEFAULT_LOCALE_EN;
			}
			if (vm.locale.indexOf('US', vm.locale.length - 2) !== -1) {
				vm.monthBeforeDay = true;
			} else {
				vm.monthBeforeDay = false;
			}
		}

		function explodeDateModel(date) {
			var dateObj = typeof date === 'string' ? new Date(date) : date;

			vm.day = dateObj.getDate();
			vm.month = dateObj.getMonth();
			vm.year = dateObj.getFullYear();
		}

		function validDate(date) {
			return validDateObject(date) || validDateString(date);
		}

		function validDateObject(dateObj) {
			return Object.prototype.toString.call(dateObj) === '[object Date]'
				&& !isNaN(dateObj.getTime());
		}

		function validDateString(dateString) {
			return typeof dateString === 'string' && validDateObject(new Date(dateString));
		}

		function registerWatchers() {
			$scope.$watch('vm.day', function(newValue, oldValue) {
				if (newValue !== oldValue && initialisedWithDate) {
					ngModel.$setDirty();
				}
			});
			$scope.$watch('vm.month', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					vm.adjustLastDay();
					ngModel.$setTouched();  // Input watcher doesn't work for month
					if (initialisedWithDate) {
						ngModel.$setDirty();
					}
				}
			});
			$scope.$watch('vm.year', function(newValue, oldValue) {
				if (newValue !== oldValue && initialisedWithDate) {
					ngModel.$setDirty();
				}
			});

			$scope.$watch('vm.ngModel', function(newValue, oldValue) {
				if (newValue === oldValue) {
					return;
				}

				if (validDate(vm.ngModel)) {
					ngModel.$setDirty();
					vm.explodeDateModel(vm.ngModel);
				}
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

			$scope.$watch('vm.locale', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					setDateLocale();
					setMonths();
				}
			});
		}

		function getMonthsBasedOnIntlSupportForLocale() {
			var monthNames;

			if (isIntlSupportedForLocale(vm.locale)) {
				monthNames = getMonthNamesForLocale();
			} else {
				$log.warn('i18n not supported for locale "' + vm.locale + '"');
				monthNames = DEFAULT_MONTHS_EN;
			}

			return extendMonthsWithIds(monthNames);
		}

		function isIntlSupportedForLocale(locale) {
			return window.Intl &&
				typeof window.Intl === 'object' &&
				window.Intl.DateTimeFormat.supportedLocalesOf([locale]).length > 0;
		}

		function getMonthNamesForLocale() {
			var months = [], date;
			for(var i = 0; i < 12; i++) {
				// Day in middle of month avoids timezone issues
				date = new Date(Date.UTC(2000, i, 15));
				var monthName = date.toLocaleDateString(vm.locale, {month: 'long'});
				monthName = monthName[0].toUpperCase() + monthName.substring(1);
				months.push(monthName);
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
			return isNumber(vm.year) &&
				isNumber(vm.day) &&
				(isNumber(vm.month) || isNumericString(vm.month));
		}

		function isNumber(value) {
			return typeof value === 'number';
		}
		function isNumericString(value) {
			return typeof value === 'string' && !isNaN(Number(vm.month));
		}

		function combineDate() {
			var date = new Date(Number(vm.year), Number(vm.month), Number(vm.day), 12, 0, 0);
			// otherwise if year is <100, e.g 99 it becomes 1999
			date.setFullYear(vm.year);
			return date;
		}

		function updateDateModelAndValidationClasses() {
			vm.adjustLastDay();

			if (!isExplodedDatePatternCorrect()) {
				ngModel.$setViewValue(null);
				return;
			}

			var dateObj = combineDate();

			if (vm.dateModelType === STRING_TYPE) {
				var isoString = dateObj.toISOString();
				var dateString = isoString.substring(0, isoString.indexOf('T'));

				ngModel.$setViewValue(dateString);
			} else {
				ngModel.$setViewValue(dateObj);
			}
		}

		function adjustLastDay() {
			var day = Number(vm.day),
				month = Number(vm.month),
				year = Number(vm.year);

			var lastUTCDateForMonthAndYear = new Date(year, month + 1, 0, 12, 0, 0); // to get last day of month
			var lastUTCDayForMonthAndYear = lastUTCDateForMonthAndYear.getUTCDate();

			if (day > lastUTCDayForMonthAndYear) {
				// Using setViewValue does not update DOM, only model.
				vm.day = parseInt(lastUTCDayForMonthAndYear, 10);
			}
		}

		init();
	}

})(window.angular);
