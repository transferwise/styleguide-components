import controller from './upload-live-camera.controller.js';
import template from './upload-live-camera.html';
import './upload-live-camera.less';

const UploadLiveCam = {
  controller,
  template,
  bindings: {

    illustrationImage: '@',

    // Texts below pictures
    label: '@', // Optional
    placeholder: '@',

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
  }
};

export default UploadLiveCam;
