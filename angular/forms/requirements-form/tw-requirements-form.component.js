import TwRequirementsFormController from './tw-requirements-form.controller.js';
import template from './requirements-form.html';

const TwRequirementsForm = {
  bindings: {
    model: '=',
    requirements: '<',
    uploadOptions: '<',
    locale: '@',
    onRefreshRequirements: '&',
    validationMessages: '<',
    errorMessages: '<',
    isValid: '=?'
  },
  controller: TwRequirementsFormController,
  template
};


export default TwRequirementsForm;
