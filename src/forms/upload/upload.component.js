import controller from './upload.controller.js';
import template from './upload.html';

const Upload = {
  controller,
  template,
  transclude: true,
  bindings: {
    ngDisabled: '<',
    ngModel: '=',
    ngChange: '&',
    name: '@',
    icon: '@',
    helpImage: '@',
    label: '@',
    placeholder: '@',
    description: '@', // DEPRECATED for label
    instructions: '@', // DEPRECATED for placeholder
    buttonText: '@',
    cancelText: '@',
    processingText: '@',
    successText: '@',
    failureText: '@',
    errorMessage: '@',
    tooLargeMessage: '@',
    // wrongTypeMessage: '@',
    size: '@',
    accept: '@',
    httpOptions: '<',
    onStart: '=',
    onSuccess: '=',
    onFailure: '=',
    onCancel: '=',
    maxSize: '<' // TODO move to ngMax?
  }
};

export default Upload;
