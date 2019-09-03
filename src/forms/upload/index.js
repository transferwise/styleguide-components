import angular from 'angular';

import Upload from './upload.component.js';
import CameraOnlyUpload from './camera-only-upload/camera-only-upload.component.js';
import CameraCaptureScreenHandler from './camera-only-upload/camera-capture-screen-handler.service';
import FileInput from './file-input.directive.js';
import AsyncFileReader from './async-file-reader.service.js';
import AsyncFileSaver from './async-file-saver.service.js';

export default angular
  .module('tw.styleguide.forms.upload', [])
  .directive('twFileInput', FileInput)
  .service('AsyncFileReader', AsyncFileReader)
  .service('AsyncFileSaver', AsyncFileSaver)
  .service('CameraCaptureScreenHandler', CameraCaptureScreenHandler)
  .component('twCameraOnlyUpload', CameraOnlyUpload)
  .component('twUpload', Upload)
  .name;
