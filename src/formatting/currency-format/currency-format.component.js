import template from './currency-format.html';

const CurrencyFormat = {
  template,
  bindings: {
    amount: '<',
    currency: '<',
    locale: '<'
  }
};

export default CurrencyFormat;
