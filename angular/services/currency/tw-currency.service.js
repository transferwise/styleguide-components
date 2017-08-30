
function TwCurrencyService() {
  var currencyDecimals = {
    'BIF': 0,
    'BYR': 0,
    'CLP': 0,
    'DJF': 0,
    'GNF': 0,
    'JPY': 0,
    'KMF': 0,
    'KRW': 0,
    'MGA': 0,
    'PYG': 0,
    'RWF': 0,
    'VND': 0,
    'VUV': 0,
    'XAF': 0,
    'XOF': 0,
    'XPF': 0,
    // technically HUF does have decimals, but due to the exchange rate banks do not accept decimal amounts
    'HUF': 0,

    'BHD': 3,
    'JOD': 3,
    'KWD': 3,
    'OMR': 3,
    'TND': 3
  };

  this.getDecimals = function(currency) {
    if (currency.toUpperCase &&
      typeof(currencyDecimals[currency.toUpperCase()]) !== 'undefined') {
      return currencyDecimals[currency.toUpperCase()];
    }
    return 2;
  };
}

export default angular
  .module('tw.styleguide.services.currency-data', [])
  .service('TwCurrencyService', TwCurrencyService).name;
