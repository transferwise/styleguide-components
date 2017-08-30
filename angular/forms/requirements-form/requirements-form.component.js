import RequirementsFormController from './requirements-form.controller.js';

const RequirementsForm = {
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
  controller: RequirementsFormController,
  template: require('./requirements-form.html')
};


export default RequirementsForm;
