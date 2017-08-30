import TwCurrencyInputController from  './tw-currency-input.controller.js';

const TwCurrencyInput = {
  require: 'ngModel',
  controller: TwCurrencyInputController,
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

export default TwCurrencyInput;
