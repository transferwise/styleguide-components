import AmountCurrencySelectController from  './amount-currency-select.controller.js';

const AmountCurrencySelect = {
  require: 'ngModel',
  controller: AmountCurrencySelectController,
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
  },
  template: require('./amount-currency-select.html')
};

export default AmountCurrencySelect;
