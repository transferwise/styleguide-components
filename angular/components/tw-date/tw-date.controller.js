(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.controller('TwDateController', TwDateController);

	TwDateController.$inject = ['$scope', '$element'];

	function TwDateController($scope, $element) {
		var vm = this;

		vm.init = init;
		vm.explodeDate = explodeDate;
		vm.updateDate = updateDate;
		vm.correctHighDay = correctHighDay;

		vm.pad = pad;
		vm.validDate = validDate;

		function init() {
			vm.month = 1;

			vm.dateMode = typeof vm.date;

			$scope.$watch('vm.date', function(date) {
				vm.explodeDate(date);
			});

			vm.explodeDate(vm.date);

			vm.months = getMonths(vm.locale);

			// If attribute has no value make it evaluate to true
			if (vm.required === "") {
				vm.required = true;
			}
		}

		function getMonths(locale) {
			var date = new Date(), monthName;

			if (!date.toLocaleDateString) {
				// Browser doesn't support toLocaleDateString, use English
				return getEnglishMonths();
			}

			if (!locale) {
				locale = 'en-GB';
			}

			// Some local strings can throw error
			try {
				date.toLocaleDateString(locale, {month: "long"});

			} catch(ex) {
				return getEnglishMonths();
			}

			var monthNameRegex = /^[a-zA-Z ]+$/;
			var months = [];
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

		function explodeDate(date) {
			var dateObj;
			if (!date) {
				return;
			}

			if (typeof date === "string") {
				dateObj = new Date(date);
			} else {
				dateObj = date;
			}

			if (!validDate(dateObj)) {
				vm.day = null;
				vm.month = 1;
				vm.year = null;
				return;
			}

			vm.day = dateObj.getUTCDate();
			vm.month = dateObj.getUTCMonth() + 1;
			vm.year = dateObj.getUTCFullYear();
		}

		function updateDate() {
			var dateObj, dateFormatted;

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

			if (vm.dateMode === "string") {
				vm.date = dateObj.getUTCFullYear()
					+ '-' + pad(dateObj.getUTCMonth() + 1)
					+ '-' + pad(dateObj.getUTCDate());
			} else {
				vm.date = dateObj;
			}
		}

		function pad(n) {
			return (n < 10) ? '0' + n : n;
		}

		function validDate(dateObj) {
			return Object.prototype.toString.call(dateObj) === "[object Date]"
				&& !isNaN(dateObj.getTime());
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
