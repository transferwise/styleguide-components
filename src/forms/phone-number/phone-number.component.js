import controller from './phone-number.controller.js';
import template from './phone-number.html';

const PhoneNumberControl = {
  controller,
  template,
  bindings: {
    ngModel: '<',
    ngRequired: '<',
    ngDisabled: '<',
    ngChange: '&',
    countries: '<',
    searchPlaceholder: '@',
  },
  transclude: true,
};

export default PhoneNumberControl;
