import TwCurrencyInputController from  './tw-currency-input.controller.js';
import template from './currency-input.html';

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
  template
};

export default TwCurrencyInput;
