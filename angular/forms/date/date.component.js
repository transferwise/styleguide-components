import DateControlController from  './date.controller.js';

const DateControl = {
  require: 'ngModel',
  controller: DateControlController,
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

export default DateControl;
