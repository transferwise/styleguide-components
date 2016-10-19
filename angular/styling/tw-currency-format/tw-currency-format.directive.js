(function(angular) {
	'use strict';

	angular
		.module('tw.form-styling')
		.directive('twCurrencyFormat', TwCurrencyFormat);

	function TwCurrencyFormat() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ngModel) {
				ngModel.$formatters.push(formatCurrency);
				ngModel.$parsers.push(parseCurrency);

				element.on('blur', function() {
					ngModel.$setViewValue(formatCurrency(ngModel.$modelValue));
					ngModel.$render();
				});

				scope.$watch(function() {
					return attrs.twCurrencyFormat;
				}, function(newVal) {
					ngModel.$setViewValue(formatCurrency(ngModel.$modelValue));
					ngModel.$render();
				});

				function formatCurrency(value) {
					if (OSREC && value) {
						var currency = getCurrencyCode(attrs);
						return OSREC.CurrencyFormatter.format(value, { currency: currency, symbol: '' }).trim();
					}
					return value;
				}

				function parseCurrency(value) {
					if (OSREC && value) {
						var currency = getCurrencyCode(attrs),
							decimalSeparator = getDecimalSeparator(currency);

						return parseString(value, decimalSeparator);
					}
					return value;
				}

				function getCurrencyCode(attrs) {
					return attrs.twCurrencyFormat ? attrs.twCurrencyFormat.toUpperCase() : 'GBP';
				}

				function getDecimalSeparator(currency) {
					var zeroCase = OSREC.CurrencyFormatter.getFormatter({
						currency: currency,
						symbol: ''
					})(0).trim();

					// TODO if we are happy to use locale we use this over OSREC
					//decimalSeparator = $locale.NUMBER_FORMATS.DECIMAL_SEP,
					//thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP,
					return zeroCase[1];
				}

				function parseString(amountString, decimalSeparator) {
					var sections = amountString.split(decimalSeparator),
						integerString = sections[0].replace(/[^0-9]/g, ''),
						decimalString = sections[1] ? sections[1].trim() : "00",
						integerValue = Number(integerString),
						decimalValue = getDecimalValue(decimalString);

					return integerValue + decimalValue;
				}

				function getDecimalValue(decimalString) {
					// TODO This could be better
					return decimalString.length > 1 ?
						Number(decimalString.substring(0, 2)) / 100 : Number(decimalString) / 10;
				}
			}
		};
	}

})(window.angular);
