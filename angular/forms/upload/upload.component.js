import UploadController from './upload.controller.js';

const Upload = {
  controller: UploadController,
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
  template: require('./upload.html')
};

export default Upload;
