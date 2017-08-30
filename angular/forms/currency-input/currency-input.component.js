import CurrencyInputController from  './currency-input.controller.js';

const CurrencyInput = {
  require: 'ngModel',
  controller: CurrencyInputController,
  transclude: {
    'addon': '?addon'
  },
  bindings: {
    ngModel: '=',
    ngChange: '&',
    ngMin: '<',
    ngMax: '<',
    ngRequired: '<',
    ngDisabled: '<',
    currency: '=',
    currencyCode: '@',
    placeholder: '@',
    size: '@',
    locale: '@'
  },
  template: require('./currency-input.html')
};

export default CurrencyInput;
