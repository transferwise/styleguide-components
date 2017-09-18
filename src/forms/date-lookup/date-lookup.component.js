import controller from './date-lookup.controller.js';
import template from './date-lookup.html';

const DateLookup = {
  controller,
  template,
  require: {
    $ngModel: 'ngModel'
  },
  bindings: {
    ngModel: '=',
    ngChange: '&',
    ngMin: '=',
    ngMax: '=',
    ngRequired: '=',
    ngDisabled: '=',
    placeholder: '@',
    size: '@',
    locale: '@',
    label: '@',
    shortDate: '<'
  }
};

export default DateLookup;
