import controller from './requirements-form.controller.js';
import template from './requirements-form.html';

const RequirementsForm = {
  controller,
  template,
  bindings: {
    model: '=',
    onModelChange: '<',
    requirements: '<',
    uploadOptions: '<',
    locale: '@',
    onRefreshRequirements: '&?',
    validationMessages: '<',
    errorMessages: '<',
    isValid: '=?'
  }
};


export default RequirementsForm;
