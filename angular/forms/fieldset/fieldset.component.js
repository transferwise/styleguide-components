import controller from './fieldset.controller.js';
import template from './fieldset.html';

const Fieldset = {
  controller,
  template,
  bindings: {
    legend: '@',
    model: '=',
    fields: '<',
    uploadOptions: '<',
    locale: '@',
    onRefreshRequirements: '&',
    validationMessages: '<',
    errorMessages: '<',
    isValid: '=?'
  }
};

export default Fieldset;
