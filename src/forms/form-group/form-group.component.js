import controller from './form-group.controller.js';
import template from './form-group.html';

const FormGroup = {
  controller,
  template,
  bindings: {
    model: '=',
    field: '<',
    uploadOptions: '<',
    locale: '@',
    onChange: '&',
    onBlur: '&',
    validationMessages: '<',
    errorMessage: '<'
  }
};

export default FormGroup;
