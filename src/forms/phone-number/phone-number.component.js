import controller from './phone-number.controller.js';
import template from './phone-number.html';

const PhoneNumberControl = {
  controller,
  template,
  require: {
    $ngModel: 'ngModel'
  },
  bindings: {
    ngModel: '=',
    ngRequired: '<',
    ngDisabled: '<',
    countries: '<',
    defaultCountry: '<',
    searchPlaceholder: '@'
  }
};

export default PhoneNumberControl;
