import controller from './phone-number.controller.js';
import template from './phone-number.html';

const PhoneNumberControl = {
  controller,
  template,
  bindings: {
    ngModel: '<',
    ngRequired: '<',
    ngDisabled: '<',
    countries: '<',
    searchPlaceholder: '@',
    onNumberChange: '&',
  },
};

export default PhoneNumberControl;
