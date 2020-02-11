import angular from 'angular';
import CameraCapture from './camera-capture.component';

import CameraCaptureScreenHandler from './camera-capture-screen-handler.service';
import CameraOverlayHandler from './camera-overlay-handler.service';

export default angular
  .module('tw.styleguide.forms.upload.camera-capture', [])
  .service('CameraCaptureScreenHandler', CameraCaptureScreenHandler)
  .service('CameraOverlayHandler', CameraOverlayHandler)
  .component('twCameraCapture', CameraCapture)
  .name;
