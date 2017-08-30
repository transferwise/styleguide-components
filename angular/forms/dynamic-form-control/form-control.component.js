import FormControlController from './form-control.controller.js';

const FormControl = {
  require: 'ngModel',
  transclude: true,
  controller: FormControlController,
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
  },
  template: require('./form-control.html')
};

export default FormControl;
