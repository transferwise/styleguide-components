import controller from './fieldset.controller.js';
import template from './fieldset.html';
import './fieldset.less';

const Fieldset = {
  controller,
  template,
  bindings: {
    model: '=',
    initialFields: '<fields',
    requiredFields: '<',
    uploadOptions: '<',
    locale: '@',
    title: '@',
    description: '@',
    onModelChange: '&?',
    onValidityChange: '&?',
    onRefreshRequirements: '&?',
    onFieldFocus: '&?',
    onFieldBlur: '&?',
    onFieldChange: '&?',
    validationMessages: '<',
    errorMessages: '<',
    warningMessages: '<',
    isValid: '=?',
    narrow: '<'
  }
};

export default Fieldset;
