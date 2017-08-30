import RadioController from './radio.controller.js';

const Radio = {
  require: 'ngModel',
  controller: RadioController,
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

export default Radio;
