import controller from './radio.controller.js';
import template from './radio.html';

const Radio = {
  controller,
  template,
  require: {
    $ngModel: 'ngModel'
  },
  bindings: {
    name: '@',
    value: '@',
    ngModel: '=',
    ngValue: '<',
    ngRequired: '<',
    ngDisabled: '<',
    ngChange: '&'
  }
};

export default Radio;
