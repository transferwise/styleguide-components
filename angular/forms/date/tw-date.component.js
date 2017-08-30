import TwDateController from  './tw-date.controller.js';

const TwDate = {
  require: 'ngModel',
  controller: TwDateController,
  bindings: {
    ngModel: '=',
    required: '@',
    ngRequired: '<',
    disabled: '@',
    ngDisabled: '<',
    locale: '@',
    twLocale: '<',
    min: '@',
    ngMin: '<',
    max: '@',
    ngMax: '<',
    modelType: '@'
  },
  template: require('./date.html')
};

export default TwDate;
