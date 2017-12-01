import template from './currency-format.html';

const CurrencyDisplay = {
  template,
  bindings: {
    amount: '<',
    currency: '<',
    locale: '<'
  }
};

export default CurrencyDisplay;
