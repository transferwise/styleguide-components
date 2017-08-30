import TwCheckboxController from './tw-checkbox.controller.js';

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
  template: require('./checkbox.html')
};

export default TwCheckbox;
