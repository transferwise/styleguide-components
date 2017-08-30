import FieldsetController from './fieldset.controller.js';

const Fieldset = {
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
  controller: FieldsetController,
  template: require('./fieldset.html')
};

export default Fieldset;
