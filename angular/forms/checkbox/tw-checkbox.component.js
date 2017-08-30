import TwCheckboxController from './tw-checkbox.controller.js';
import template from './checkbox.html';

const TwCheckbox = {
  require: 'ngModel',
  controller: TwCheckboxController,
  bindings: {
    name: "@",
    ngModel: '=',
    ngTrueValue: '<',
    ngFalseValue: '<',
    ngRequired: '<',
    ngDisabled: '<'
  },
  template
};

export default TwCheckbox;
