import TwRequirementsFormController from './tw-requirements-form.controller.js';

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
  template: require('./requirements-form.html')
};


export default TwRequirementsForm;
