(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.service('TwDateService', TwDateService);

	function TwDateService() {
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

		var DEFAULT_DAYS_EN = [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday'
		];

		this.getLastDayOfMonth = function(year, month) {
			var lastDay = this.getUTCDate(year, month + 1, 0);
			return lastDay.getUTCDate();
		};

		this.getUTCDate = function(year, month, day) {
			var date = new Date();
			date.setUTCFullYear(year, month, day);
			date.setUTCHours(0);
			date.setUTCMinutes(0);
			date.setUTCSeconds(0);
			date.setUTCMilliseconds(0);
			return date;
		};

		this.getDayNamesForLocale = function(locale, format) {
			if (!format) {
				format = 'long';  // or 'narrow' or 'short'
			}
			if (!isIntlSupportedForLocale(locale)) {
				return DEFAULT_DAYS_EN;
			}

			var days = [], date;
			for(var i = 1; i <= 7; i++) {
				// Day in middle of month avoids timezone issues
				date = this.getUTCDate(2001, 0, i); // First day of millenium was monday
				var dayName = date.toLocaleDateString(locale, {weekday: format});
				dayName = dayName[0].toUpperCase() + dayName.substring(1);
				days.push(dayName);
			}
			return days;
		};

		this.getMonthNamesForLocale = function(locale, format) {
			if (!format) {
				format = 'long';  // or 'narrow' or 'short'
			}
			if (!isIntlSupportedForLocale(locale)) {
				return DEFAULT_MONTHS_EN;
			}

			var months = [], date;
			for(var i = 0; i < 12; i++) {
				// Day in middle of month avoids timezone issues
				date = new Date(Date.UTC(2000, i, 15));
				var monthName = date.toLocaleDateString(locale, {month: format});
				monthName = monthName[0].toUpperCase() + monthName.substring(1);
				months.push(monthName);
			}
			return months;
		};

		this.getWeekday = function(year, month, day) {
			var utcDate = this.getUTCDate(year, month, day);
			return utcDate.getUTCDay();
		};

		this.isMonthBeforeDay = function(locale) {
			if (locale.indexOf('US', locale.length - 2) !== -1) {
				return true;
			}
			return false;
		};

		this.addYears = function(date, years) {
			return this.addToDate(date, years, 0, 0);
		};
		this.addMonths = function(date, months) {
			return this.addToDate(date, 0, months, 0);
		};
		this.addDays = function(date, days) {
			return this.addToDate(date, 0, 0, days);
		};

		this.addToDate = function(date, years, months, days) {
			return this.getUTCDate(
				date.getUTCFullYear() + years,
				date.getUTCMonth() + months,
				date.getUTCDate() + days
			);
		};

		function isIntlSupportedForLocale(locale) {
			return window.Intl &&
				typeof window.Intl === 'object' &&
				window.Intl.DateTimeFormat.supportedLocalesOf([locale]).length > 0;
		}
	}
})(window.angular);
