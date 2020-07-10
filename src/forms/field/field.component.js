import controller from './field.controller.js';
import template from './field.html';

const Field = {
  controller,
  template,
  bindings: {
    name: '@',
    model: '=',
    initialField: '<field',
    locale: '@',
    required: '<',
    submitted: '<',
    uploadOptions: '<',
    changeHandler: '&?onChange',
    focusHandler: '&?onFocus',
    blurHandler: '&?onBlur',
    errorMessage: '<',
    warningMessage: '<',
    validationMessages: '<'
  }
};

export default Field;
