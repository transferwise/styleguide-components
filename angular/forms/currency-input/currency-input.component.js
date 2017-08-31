import controller from  './currency-input.controller.js';
import template from './currency-input.html';

const CurrencyInput = {
  controller,
  template,
  require: {
    $ngModel: 'ngModel'
  },
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
  }
};

export default CurrencyInput;
