import TwDateController from  './tw-date.controller.js';
import template from './date.html';

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
  template
};

export default TwDate;
