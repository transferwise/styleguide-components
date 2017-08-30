import controller from './form-control.controller.js';
import template from './form-control.html';

const FormControl = {
  controller,
  template,
  require: 'ngModel',
  transclude: true,
  bindings: {
    type: "@",
    name: "@",
    id: "@",
    label: "@",
    placeholder: "@",
    helpText: "@",
    step: "@",
    locale: "@",
    uploadAccept: "@",
    uploadIcon: "@",
    uploadTooLargeMessage: "@",
    options: "<",
    ngModel: "=",
    ngChange: "&",
    ngRequired: "<",
    ngDisabled: "<",
    // ngMinlength/ngMaxlength have default behaviour that cannot be overridden
    ngMinlength: "<twMinlength",
    ngMaxlength: "<twMaxlength",
    ngMin: "<",
    ngMax: "<",
    ngPattern: "<",
    uploadOptions: "<",
    textFormat: "<"
  }
};

export default FormControl;
