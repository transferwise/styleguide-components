import TwRadioController from './tw-radio.controller.js';
import template from './radio.html';

const TwRadio = {
  require: 'ngModel',
  controller: TwRadioController,
  bindings: {
    name: "@",
    value: "@",
    ngModel: '=',
    ngValue: '<',
    ngRequired: '<',
    ngDisabled: '<',
    ngChange: '&'
  },
  template
};

export default TwRadio;
