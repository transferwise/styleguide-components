import controller from './camera-only-upload.controller.js';
import template from './camera-only-upload.html';
import './camera-only-upload.less';

const CameraOnlyUpload = {
  controller,
  template,
  bindings: {
    cameraOverlay: '@', // Optional
    cameraFaceMode: '@', // environment/user

    // Angular binding
    ngDisabled: '<', // TODO prolly not needed
    ngModel: '=', // TODO prolly not needed
    ngChange: '&', // TODO prolly not needed

    name: '@', // TODO prolly not needed form name

    errorMessage: '@', // TODO prolly not needed

    showCaptureScreen: '=',
    onUserCaptureConfirmation: '&'
  }
};

export default CameraOnlyUpload;
