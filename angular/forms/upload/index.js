import Upload from './upload.component.js';
import FileInput from './file-input.directive.js';

export default angular
  .module('tw.styleguide.forms.upload', [])
  .directive('twFileInput', FileInput)
  .component('twUpload', Upload).name;
