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
import MultiUpload from './multi-upload';
import DragAndDrop from '../drag-and-drop';

export default angular
  .module('tw.styleguide.forms.upload', [
    CaptureCard,
    DroppingCard,
    ProcessingCard,
    SuccessCard,
    CameraCapture,
    UploadButton,
    CameraButton,
    MultiUpload,
    DragAndDrop
  ])
  .directive('twFileInput', FileInput)
  .component('twUpload', Upload)
  .name;
