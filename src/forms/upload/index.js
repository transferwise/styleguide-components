import angular from 'angular';

import Upload from './upload.component.js';

import CaptureCard from './capture-card';
import DroppingCard from './dropping-card';
import ProcessingCard from './processing-card';
import SuccessCard from './success-card';
import CameraCapture from './camera-capture';
import UploadButton from './upload-button';
import CameraButton from './camera-button';

import FileInput from './file-input.directive.js';

import AsyncTasksConfig from '../../services/asyncTasksConfig';

import AsyncFileReader from './services/async-file-reader.service.js';
import AsyncFileSaver from './services/async-file-saver.service.js';
import FileValidationService from './services/file-validation.service.js';

import DragAndDrop from '../drag-and-drop';

export default angular
  .module('tw.styleguide.forms.upload', [
    AsyncTasksConfig,
    CaptureCard,
    DroppingCard,
    ProcessingCard,
    SuccessCard,
    CameraCapture,
    UploadButton,
    CameraButton,
    DragAndDrop
  ])
  .directive('twFileInput', FileInput)
  .service('AsyncFileReader', AsyncFileReader)
  .service('AsyncFileSaver', AsyncFileSaver)
  .service('FileValidationService', FileValidationService)
  .component('twUpload', Upload)
  .name;
