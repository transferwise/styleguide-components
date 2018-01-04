import controller from './field.controller.js';
import template from './field.html';

const Field = {
  controller,
  template,
  bindings: {
    model: '=',
    initialField: '<field',
    uploadOptions: '<',
    locale: '@',
    changeHandler: '&?onChange',
    focusHandler: '&?onFocus',
    blurHandler: '&?onBlur',
    validationMessages: '<',
    errorMessage: '<',
    warningMessage: '<'
  }
};

export default Field;
