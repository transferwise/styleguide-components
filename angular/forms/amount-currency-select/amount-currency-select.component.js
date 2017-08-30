import controller from  './amount-currency-select.controller.js';
import template from './amount-currency-select.html';

const AmountCurrencySelect = {
  controller,
  template,
  require: 'ngModel',
  transclude: {
    'addon': '?addon'
  },
  bindings: {
    ngModel: '=',
    ngMin: '<',
    ngMax: '<',
    ngRequired: '<',
    ngDisabled: '<',
    ngChange: '&',

    /* Begin deprecated */
    amountReadOnly: '<',
    onAmountChange: '&',
    /* End deprecated */

    currency: '=',
    currencies: '<',
    onCurrencyChange: '&',
    currencyFilterPlaceholder: '@',

    customActionLabel: '<',
    onCustomAction: '&',

    placeholder: '@',

    size: '@',
    locale: '@'
  }
};

export default AmountCurrencySelect;
