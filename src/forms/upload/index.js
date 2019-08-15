import angular from 'angular';

import Upload from './upload.component.js';
import FileInput from './file-input.directive.js';
import AsyncFileReader from './async-file-reader.service.js';
import AsyncFileSaver from './async-file-saver.service.js';

export default angular
  .module('tw.styleguide.forms.upload', [])
  .directive('twFileInput', FileInput)
  .service('AsyncFileReader', AsyncFileReader)
  .service('AsyncFileSaver', AsyncFileSaver)
  .component('twUpload', Upload).name;
