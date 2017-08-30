import TwRadioController from './tw-radio.controller.js';

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
  template: require('./radio.html')
};

export default TwRadio;
