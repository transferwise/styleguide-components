import TwFieldsetController from './tw-fieldset.controller.js';

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
  template: require('./fieldset.html')
};

export default TwFieldset;
