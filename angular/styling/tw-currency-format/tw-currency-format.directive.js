(function(angular) {
	'use strict';

	angular
		.module('tw.form-styling')
		.directive('twCurrencyFormat', ['$locale', TwCurrencyFormat]);

	function TwCurrencyFormat($locale) {
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
						var locale = getLocale(attrs);
						try {
							return OSREC.CurrencyFormatter.format(value, {
								currency: currency,
								symbol: '',
								locale: locale
							}).trim();
						} catch(ex) {
							//console.log(ex);
							return value.toString();
						}
					}
					return value.toString();
				}

				function parseCurrency(value) {
					if (OSREC && value) {
						var decimalSeparator = getDecimalSeparator(
							getCurrencyCode(attrs),
							getLocale(attrs)
						);

						return parseString(value, decimalSeparator);
					}
					return value;
				}

				function getCurrencyCode(attrs) {
					// Locale overrides currency so we can just use GBP
					return attrs.twCurrencyCode ? attrs.twCurrencyCode.toUpperCase() : 'GBP';
				}
				function getLocale(attrs) {
					return attrs.twCurrencyFormat ? attrs.twCurrencyFormat : 'en_GB';
				}

				function getDecimalSeparator(currency, locale) {
					try {
						var zeroCase = OSREC.CurrencyFormatter.getFormatter({
							currency: currency,
							symbol: '',
							locale: locale
						})(0).trim();

						// TODO if we are happy to use angular $locale we use this over OSREC
						//decimalSeparator = $locale.NUMBER_FORMATS.DECIMAL_SEP,
						//thousandsDelimiter = $locale.NUMBER_FORMATS.GROUP_SEP,
						return zeroCase[1];
					} catch(ex) {
						//console.log(ex);
						return ".";
					}
				}

				function parseString(amountString, decimalSeparator) {
					// TODO potentially different parsing for user entered than automated
					// user may enter wrong decimal separator
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
