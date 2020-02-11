import angular from 'angular';
import ErrorCard from './error-card.component';

export default angular
  .module('tw.styleguide.forms.upload.error', [])
  .component('twUploadError', ErrorCard)
  .name;
