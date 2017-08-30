import controller from './upload.controller.js';
import template from './upload.html';

const Upload = {
  controller,
  template,
  transclude: true,
  bindings: {
    ngModel: '=',
    name: '@',
    icon: '@',
    label: '@',
    placeholder: '@',
    description: '@', // DEPRECATED
    instructions: '@', // DEPRECATED
    buttonText: '@',
    cancelText: '@',
    processingText: '@',
    completeText: '@',
    errorMessage: '@',
    tooLargeMessage: '@',
    //wrongTypeText: '@',
    size: '@',
    accept: '@',
    httpOptions: '<',
    onStart: '=',
    onSuccess: '=',
    onFailure: '=',
    onCancel: '=',
    maxSize: '<'
  }
};

export default Upload;
