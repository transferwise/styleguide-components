import controller from './form-control.controller.js';
import template from './form-control.html';

const FormControl = {
  controller,
  template,
  require: {
    $ngModel: 'ngModel'
  },
  bindings: {
    type: '@',
    name: '@',
    id: '@',
    label: '@',
    description: '@',
    placeholder: '@',
    step: '@',
    locale: '@',
    uploadAccept: '@',
    uploadIcon: '@',
    uploadTooLargeMessage: '@',
    options: '<',

    ngModel: '=',
    ngChange: '&',
    ngFocus: '&',
    ngBlur: '&',
    ngRequired: '<',
    ngDisabled: '<',

    // ngMinlength/ngMaxlength have default behaviour that cannot be overridden
    ngMinlength: '<twMinlength',
    ngMaxlength: '<twMaxlength',
    ngMin: '<',
    ngMax: '<',
    ngPattern: '<',

    uploadOptions: '<',
    help: '<helpOptions',
    textFormat: '<',
    validationAsync: '<',
    persistAsync: '<',
    onAsyncFailure: '&',
    onAsyncSuccess: '&',
    // Live capture parameters for upload component
    fileUploadSource: '<',
    cameraOptions: '<'
  }
};

export default FormControl;
