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
    onUserCaptureConfirmation: '&',

    /**
     * Need this parameter to skip user interaction
     * during controller initialization in unit tests
     */
    testMode: '@' // true/false
  }
};

export default CameraOnlyUpload;
