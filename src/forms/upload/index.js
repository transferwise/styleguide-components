import angular from 'angular';

import Upload from './upload.component.js';

import CaptureCard from './capture-card';
import DroppingCard from './dropping-card';
import ProcessingCard from './processing-card';
import SuccessCard from './success-card';
import ErrorCard from './error-card';
import CameraCapture from './camera-capture';
import UploadButton from './upload-button';
import CameraButton from './camera-button';

import FileInput from './file-input.directive.js';

import MultiUpload from './multi-upload';
import Droppable from './droppable';

export default angular
  .module('tw.styleguide.forms.upload', [
    CaptureCard,
    DroppingCard,
    ProcessingCard,
    SuccessCard,
    ErrorCard,
    CameraCapture,
    UploadButton,
    CameraButton,
    MultiUpload,
    Droppable
  ])
  .directive('twFileInput', FileInput)
  .component('twUpload', Upload)
  .name;
