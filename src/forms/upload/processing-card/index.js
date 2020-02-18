import angular from 'angular';
import ProcessingCard from './processing-card.component';
import ProcessingMini from './processing-mini.component';
import AsyncFileReader from '../services/async-file-reader.service.js';
import AsyncFileSaver from '../services/async-file-saver.service.js';
import FileValidationService from '../services/file-validation.service.js';
import AsyncTasksConfig from '../../../services/asyncTasksConfig';

export default angular
  .module('tw.styleguide.forms.upload.processing', [
    AsyncTasksConfig,
    AsyncFileReader,
    AsyncFileSaver,
    FileValidationService
  ])
  .component('twUploadProcessing', ProcessingCard)
  .component('twUploadProcessingMini', ProcessingMini)
  .name;
