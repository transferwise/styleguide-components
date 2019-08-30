import controller from './camera-only-upload.controller.js';
import template from './camera-only-upload.html';
import './camera-only-upload.less';

const CameraOnlyUpload = {
  controller,
  template,
  bindings: {
    cameraOverlay: '@', // Optional
    cameraFaceMode: '@', // environment/user

    // Work flow related text msgs
    processingText: '@', // Text while uploading
    successText: '@', // Text after upload is successful, shown quite briefly before preview
    failureText: '@',
    cancelText: '@', // Go back to re-upload after upload is done

    // Angular binding
    ngDisabled: '<',
    ngModel: '=',
    ngChange: '&',

    // Custom events
    onStart: '=',
    onSuccess: '=',
    onFailure: '=',
    onCancel: '=',

    name: '@', // form name

    errorMessage: '@',
    httpOptions: '<',

    onUserCaptureConfirmation: '&'
  }
};

export default CameraOnlyUpload;
