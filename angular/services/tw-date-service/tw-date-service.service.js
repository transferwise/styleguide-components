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

		this.getLocaleDate = function(date) {
			if (!date) { date = new Date(); }
			return date.getDate();
		};
		this.getLocaleMonth = function(date) {
			if (!date) { date = new Date(); }
			return date.getMonth();
		};
		this.getLocaleFullYear = function(date) {
			if (!date) { date = new Date(); }
			return date.getFullYear();
		};
		// get UTC date for users current day
		this.getLocaleToday = function() {
			var now = new Date();
			return this.getUTCDateFromParts(
				this.getLocaleFullYear(now),
				this.getLocaleMonth(now),
				this.getLocaleDate(now)
			);
		};

		this.getUTCDate = function(date) {
			if (!date) { date = new Date(); }
			return date.getUTCDate();
		};
		this.getUTCMonth = function(date) {
			if (!date) { date = new Date(); }
			return date.getUTCMonth();
		};
		this.getUTCFullYear = function(date) {
			if (!date) { date = new Date(); }
			return date.getUTCFullYear();
		};
		this.getUTCToday = function() {
			var now = new Date();
			return this.getUTCDateFromParts(
				this.getUTCFullYear(now),
				this.getUTCMonth(now),
				this.getUTCDate(now)
			);
		};


		this.getLastDayOfMonth = function(year, month) {
			var lastDay = this.getUTCDateFromParts(year, month + 1, 0);
			return lastDay.getUTCDate();
		};

		this.getUTCDateFromParts = function(year, month, day) {
			var date = new Date();
			date.setUTCFullYear(year, month, day);
			date.setUTCHours(0);
			date.setUTCMinutes(0);
			date.setUTCSeconds(0);
			date.setUTCMilliseconds(0);
			return date;
		};

		this.getDayNamesForLocale = function(locale, format) {
			format = getValidDateFormat(format);
			locale = getValidLocale(locale);

			var days = [], date;
			for(var i = 1; i <= 7; i++) {
				date = this.getUTCDateFromParts(2001, 0, i); // This day was a monday
				days.push(getLocalisedDateName(date, locale, {weekday: format}));
			}
			return days;
		};

		this.getMonthNamesForLocale = function(locale, format) {
			format = getValidDateFormat(format);
			locale = getValidLocale(locale);

			var months = [], date;
			for(var i = 0; i < 12; i++) {
				// Day in middle of month avoids timezone issues
				date = this.getUTCDateFromParts(2000, i, 15);
				months.push(getLocalisedDateName(date, locale, {month: format}));
			}
			return months;
		};

		this.getWeekday = function(year, month, day) {
			var utcDate = this.getUTCDateFromParts(year, month, day);
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
			return this.getUTCDateFromParts(
				date.getUTCFullYear() + years,
				date.getUTCMonth() + months,
				date.getUTCDate() + days
			);
		};

		function getLocalisedDateName(date, locale, formattingObject) {
			// Strip out any numbers, in case browser (cough...Safari) doesn't respect format
			var name = date.toLocaleDateString(locale, formattingObject).replace(/[0-9]|\s/g, '');
			return name[0].toUpperCase() + name.substring(1);
		}

		function getValidDateFormat(format) {
			var validFormats = ['narrow', 'short', 'long'];
			if (!format || validFormats.indexOf(format) < 0) {
				return 'long';
			}
			return format;
		}

		function getValidLocale(locale) {
			if (!isIntlSupportedForLocale(locale)) {
				return "en-GB";
			}
			return locale;
		}

		function isIntlSupportedForLocale(locale) {
			try {
				var supportedLocales = window.Intl.DateTimeFormat.supportedLocalesOf([locale]);
				return supportedLocales.length > 0;
			} catch(error) {
				return false;
			}
		}
	}
})(window.angular);
