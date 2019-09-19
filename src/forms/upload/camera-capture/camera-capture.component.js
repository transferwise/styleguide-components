import controller from './camera-capture.controller.js';
import template from './camera-capture.html';
import './camera-capture.less';

const CameraCapture = {
  controller,
  template,
  bindings: {
    overlay: '@', // Optional
    direction: '@', // environment/user

    onCancel: '&',
    onConfirm: '&',

    /**
     * Need this parameter to skip user interaction
     * during controller initialization in unit tests
     */
    testMode: '@' // true/false
  }
};

export default CameraCapture;
