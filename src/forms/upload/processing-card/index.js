import angular from 'angular';
import ProcessingCard from './processing-card.component';
import ProcessingMini from './processing-mini.component';
import AsyncFileReader from '../services/async-file-reader.service.js';
import AsyncFileSaver from '../services/async-file-saver.service.js';
import FileValidationService from '../services/file-validation.service.js';
import MediaApiService from '../services/media-api.service.js';
import AsyncTasksConfig from '../../../services/asyncTasksConfig';
import Process from '../../../loading/process';

export default angular
  .module('tw.styleguide.forms.upload.processing', [
    AsyncTasksConfig,
    AsyncFileReader,
    AsyncFileSaver,
    FileValidationService,
    MediaApiService,
    Process
  ])
  .component('twUploadProcessing', ProcessingCard)
  .component('twUploadProcessingMini', ProcessingMini)
  .name;
