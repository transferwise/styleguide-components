import angular from 'angular';
import ProcessingCard from './processing-card.component';
import ProcessingMini from './processing-mini.component';

export default angular
  .module('tw.styleguide.forms.upload.processing', [])
  .component('twUploadProcessing', ProcessingCard)
  .component('twUploadProcessingMini', ProcessingMini)
  .name;
