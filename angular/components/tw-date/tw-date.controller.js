(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.controller('TwDateController', TwDateController);

	TwDateController.$inject = ['$element', '$log', '$scope'];

	function TwDateController($element, $log, $scope) {
		var vm = this;

		vm.updateDateModel = updateDateModel;

		vm.explodeDateModel = explodeDateModel;
		vm.adjustLastDay = adjustLastDay;
		vm.validDateModel = validDateModel;

		var DEFAULT_LOCALE_EN = 'en-GB';
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

		function init() {
			if (validDateModel()) {
				vm.explodeDateModel();
			} else {
				explodeDefaultDate();
			}

			setDefaultLocaleIfNeeded();

			setYearRange();

			vm.months = getMonthsBasedOnIntlSupportForLocale();

			if (vm.ngRequired === undefined) {
				vm.ngRequired = vm.required !== undefined;
			}
			if (vm.ngDisabled === undefined) {
				vm.ngDisabled = vm.disabled !== undefined;
			}

			registerWatchers();
		}

		function setYearRange() {
			//vm.maxUTCYear = new Date(Date.UTC(vm.ngMin))
		}

		function setDefaultLocaleIfNeeded() {
			if (!vm.locale) {
				setDefaultLocale();
			}
		}

		function setDefaultLocale() {
			vm.locale = DEFAULT_LOCALE_EN;
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
			vm.day = dateObj.getUTCDate();
			vm.month = dateObj.getUTCMonth();
			vm.year = dateObj.getUTCFullYear();
		}

		function explodeDateModelIfValid() {
			if (validDateModel()) {
				vm.explodeDateModel();
			}
		}

		function explodeDefaultDate() {
			vm.day = null;
			vm.month = 0;
			vm.year = null;
		}

		function validDateModel() {
			return validDateObject(vm.date) || validDateString(vm.date);
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

			$scope.$watch('vm.month', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					vm.adjustLastDay();
				}
			});

			$scope.$watch('vm.locale', function(newValue, oldValue) {
				if (newValue !== oldValue) {
					vm.months = getMonthsBasedOnIntlSupportForLocale(vm.locale);
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
					date.toLocaleDateString(vm.locale, {month: "long"})
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
			return isNumber(vm.day) && isNumber(vm.month) && isNumber(vm.year);
		}

		function isNumber(value) {
			return typeof value === 'number';
		}

		function updateDateModel() {
			var dateObj;

			if (!isExplodedDatePatternCorrect()) {
				vm.date = null;
				$element.addClass("ng-invalid-pattern");
				return;
			}

			vm.adjustLastDay();

			dateObj = new Date(Date.UTC(
				Number(vm.year),
				Number(vm.month),
				Number(vm.day)
			));

			/**/
			var minObj = new Date(vm.ngMin);
			var maxObj = new Date(vm.ngMax);

			if (dateObj < minObj) {
				$element.addClass("ng-invalid-min");
				return;
			}
			if (dateObj > maxObj) {
				$element.addClass("ng-invalid-max");
				return;
			}
			/**/

			$element.removeClass("ng-invalid-min");
			$element.removeClass("ng-invalid-max");
			$element.removeClass("ng-invalid-pattern");

			if (typeof vm.date === "string") {
				vm.date = stringifyDateObject(dateObj);
			} else {
				vm.date = dateObj;
			}
		}

		function stringifyDateObject(dateObj) {
			return dateObj.getUTCFullYear()
				+ '-' + pad(dateObj.getUTCMonth() + 1)
				+ '-' + pad(dateObj.getUTCDate());
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
