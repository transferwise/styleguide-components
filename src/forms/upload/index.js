import angular from 'angular';

import Upload from './upload.component.js';
import CameraCapture from './camera-capture/camera-capture.component.js';
import CameraCaptureScreenHandler from './camera-capture/camera-capture-screen-handler.service';
import CameraOverlayHandler from './camera-capture/camera-overlay-handler.service';
import FileInput from './file-input.directive.js';
import AsyncFileReader from './async-file-reader.service.js';
import AsyncFileSaver from './async-file-saver.service.js';
import AsyncTasksConfig from '../../services/asyncTasksConfig';

export default angular
  .module('tw.styleguide.forms.upload', [])
  .directive('twFileInput', FileInput)
  .service('AsyncFileReader', AsyncFileReader)
  .service('AsyncFileSaver', AsyncFileSaver)
  .service('CameraCaptureScreenHandler', CameraCaptureScreenHandler)
  .service('CameraOverlayHandler', CameraOverlayHandler)
  .service('AsyncTasksConfig', AsyncTasksConfig)
  .component('twCameraCapture', CameraCapture)
  .component('twUpload', Upload)
  .name;
