import TwUploadController from './tw-upload.controller.js';
import template from './upload.html';

const TwUpload = {
  controller: TwUploadController,
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
  },
  template
};

export default TwUpload;
