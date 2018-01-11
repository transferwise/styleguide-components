import angular from 'angular';

import UploadController from './upload.controller.js';
import Upload from './upload.component.js';
import FileInput from './file-input.directive.js';

export default angular
  .module('tw.styleguide.forms.upload', [])
  .controller('UploadController', UploadController)
  .directive('twFileInput', FileInput)
  .component('twUpload', Upload).name;
