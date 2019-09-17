import controller from './camera-only-upload.controller.js';
import template from './camera-only-upload.html';
import './camera-only-upload.less';

const CameraOnlyUpload = {
  controller,
  template,
  bindings: {
    cameraOverlay: '@', // Optional
    cameraFaceMode: '@', // environment/user

    onCaptureScreenClose: '&',
    onUserCaptureConfirmation: '&'
  }
};

export default CameraOnlyUpload;
