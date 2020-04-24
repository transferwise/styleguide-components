
import controller from './checkbox-group.controller.js';
import template from './checkbox-group.html';

const Checkbox = {
  controller,
  template,
  require: {
    $ngModel: 'ngModel'
  },
  bindings: {
    name: '@',
    ngChange: '&',
    ngModel: '=',
    ngRequired: '<',
    ngDisabled: '<',
    options: '<',
  }
};

export default Checkbox;
