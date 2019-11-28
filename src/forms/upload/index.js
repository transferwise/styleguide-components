import angular from 'angular';

import Upload from './upload.component.js';
import CameraCapture from './camera-capture/camera-capture.component.js';
import CameraCaptureScreenHandler from './camera-capture/camera-capture-screen-handler.service';
import CameraOverlayHandler from './camera-capture/camera-overlay-handler.service';
import FileInput from './file-input.directive.js';
import AsyncFileReader from './async-file-reader.service.js';
import AsyncFileSaver from './async-file-saver.service.js';
import AsyncTasksConfig from '../../services/asyncTasksConfig';
import ImageDetailsModal from './image-details-modal/image-details-modal.component.js';

export default angular
  .module('tw.styleguide.forms.upload', [AsyncTasksConfig])
  .directive('twFileInput', FileInput)
  .service('AsyncFileReader', AsyncFileReader)
  .service('AsyncFileSaver', AsyncFileSaver)
  .service('CameraCaptureScreenHandler', CameraCaptureScreenHandler)
  .service('CameraOverlayHandler', CameraOverlayHandler)
  .component('twCameraCapture', CameraCapture)
  .component('twUpload', Upload)
  .component('twImageDetailsModal', ImageDetailsModal)
  .name;
