import controller from  './date.controller.js';
import template from './date.html';

const DateControl = {
  controller,
  template,
  require: 'ngModel',
  bindings: {
    ngModel: '=',
    required: '@',
    ngRequired: '<',
    disabled: '@',
    ngDisabled: '<',
    locale: '@',
    twLocale: '<',
    min: '@',
    ngMin: '<',
    max: '@',
    ngMax: '<',
    modelType: '@'
  }
};

export default DateControl;
