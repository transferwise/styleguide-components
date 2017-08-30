import TwFieldsetController from './tw-fieldset.controller.js';
import template from './fieldset.html';

const TwFieldset = {
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
  },
  controller: TwFieldsetController,
  template
};

export default TwFieldset;
