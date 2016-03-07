(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.controller('TwDateController', TwDateController);

	TwDateController.$inject = ['$element', '$scope'];

	function TwDateController($element, $scope) {
		var vm = this;

		vm.updateDateModel = updateDateModel;

		vm.explodeDateModel = explodeDateModel;
		vm.correctHighDay = correctHighDay;
		vm.validDateModel = validDateModel;

		function init() {
			if (validDateModel()) {
				vm.explodeDateModel();
			} else {
				explodeDefaultDate();
			}

			vm.months = getMonths(vm.locale);

			if (vm.ngRequired === undefined) {
				vm.ngRequired = vm.required !== undefined;
			}
			if (vm.ngDisabled === undefined) {
				vm.ngDisabled = vm.disabled !== undefined;
			}

			registerWatchers();
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
			vm.month = dateObj.getUTCMonth() + 1;
			vm.year = dateObj.getUTCFullYear();
		}

		function explodeDateModelIfValid() {
			if (validDateModel()) {
				vm.explodeDateModel();
			}
		}

		function explodeDefaultDate() {
			vm.day = null;
			vm.month = 1;
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
					vm.day = vm.correctHighDay(vm.day, vm.month, vm.year);
				}
			});
		}

		function getMonths(locale) {
			if (!locale) {
				locale = 'en-GB';
			}

			if (isLocalDateStringSupported(locale)) {
				return getWellFormattedMonths(locale);
			} else {
				return getEnglishMonths();
			}
		}

		function isLocalDateStringSupported(locale) {
			try {
				var date = new Date();
				var monthName = date.toLocaleDateString(locale, {month: "long"});
				return monthName !== date.toLocaleDateString(locale);
			} catch (ex) {
				return false;
			}
		}

		function getWellFormattedMonths(locale) {
			var monthNameRegex = /^[a-zA-Z ]+$/;
			var months = [];

			var date = new Date(), monthName;
			for(var i = 0; i < 12; i++) {
				date.setMonth(i);
				monthName = date.toLocaleDateString(locale, {month: "long"});

				if (!monthNameRegex.test(monthName)) {
					monthName = monthName.replace(/\d+/g,'').replace(/\W+/g,'');
				} else {
					monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
				}

				months.push({
					id: i + 1,
					name: monthName
				});
			}
			return months;
		}

		function getEnglishMonths() {
			return [
				{id: 1, name: "January"},
				{id: 2, name: "February"},
				{id: 3, name: "March"},
				{id: 4, name: "April"},
				{id: 5, name: "May"},
				{id: 6, name: "June"},
				{id: 7, name: "July"},
				{id: 8, name: "August"},
				{id: 9, name: "September"},
				{id: 10, name: "October"},
				{id: 11, name: "November"},
				{id: 12, name: "December"}
			];
		}

		function updateDateModel() {
			var dateObj;

			if (!vm.day ||
				vm.month === null ||
				vm.month === undefined ||
				!vm.year) {
				vm.date = null;

				$element.addClass("ng-invalid-pattern");

				return;
			}

			vm.day = vm.correctHighDay(vm.day, vm.month, vm.year);

			dateObj = new Date(Date.UTC(
				Number(vm.year),
				Number(vm.month) - 1,
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

		function correctHighDay(day, month, year) {
			var dateObj = new Date(0);
			dateObj.setUTCFullYear(year);
			dateObj.setUTCMonth(month); // for month, 0=Jan
			dateObj.setUTCDate(0);
			if (day > dateObj.getUTCDate()) {
				return dateObj.getUTCDate();
			}
			return day;
		}

		init();
	}

})(window.angular);
