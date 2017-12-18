import controller from './field.controller.js';
import template from './field.html';

const Field = {
  controller,
  template,
  bindings: {
    model: '=',
    field: '<options',
    uploadOptions: '<',
    locale: '@',
    changeHandler: '&?onChange',
    focusHandler: '&?onFocus',
    blurHandler: '&?onBlur',
    validationMessages: '<',
    errorMessage: '<'
  }
};

export default Field;
