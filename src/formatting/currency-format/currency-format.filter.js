function CurrencyFormatFilter($filter, CurrencyService, numberFormatFilter) {
  return (number, currency, locale) => {
    let precision;

    if (typeof number === 'string' && Number(number)) {
      number = Number(number);
    }

    // If the number is an integer don't show decimals
    if (number === parseInt(number, 10)) {
      precision = 0;
    } else {
      precision = CurrencyService.getDecimals(currency);
    }

    return `${numberFormatFilter(number, precision, locale)} ${currency}`;
  };
}

CurrencyFormatFilter.$inject = [
  '$filter',
  'TwCurrencyService',
  'twNumberFormatFilter'
];

export default CurrencyFormatFilter;
