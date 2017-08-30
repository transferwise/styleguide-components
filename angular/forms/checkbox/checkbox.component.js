import CheckboxController from './checkbox.controller.js';

const Checkbox = {
  require: 'ngModel',
  controller: CheckboxController,
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

export default Checkbox;
