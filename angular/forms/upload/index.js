import Upload from './tw-upload.component.js';
import FileInput from './tw-file-input.directive.js';

export default angular
  .module('tw.styleguide.forms.upload', [])
  .directive('twFileInput', FileInput)
  .component('twUpload', Upload).name;
