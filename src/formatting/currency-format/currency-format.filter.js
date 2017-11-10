
import CurrencyServiceModule from '../../services/currency/';  // eslint-disable-line
import NumberFormat from '../number-format/'; // eslint-disable-line

function CurrencyFormatFilter($filter, CurrencyService, numberFormat) {
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

    if (!locale) {
      return `${numberFormat(number, 'en-GB', precision)} ${currency}`;
    }
    return `${numberFormat(number, locale, precision)} ${currency}`;
  };
}

CurrencyFormatFilter.$inject = [
  '$filter',
  'TwCurrencyService',
  'twNumberFormatFilter'
];

export default CurrencyFormatFilter;
