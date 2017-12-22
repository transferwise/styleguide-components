import controller from './fieldset.controller.js';
import template from './fieldset.html';

const Fieldset = {
  controller,
  template,
  bindings: {
    model: '=',
    rawFields: '<fields',
    uploadOptions: '<',
    locale: '@',
    title: '@',
    description: '@',
    onRefreshRequirements: '&?',
    onFieldFocus: '&?',
    onFieldBlur: '&?',
    onFieldChange: '&?',
    validationMessages: '<',
    errorMessages: '<',
    isValid: '=?',
    narrow: '<'
  }
};

export default Fieldset;
