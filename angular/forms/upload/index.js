import TwUpload from './tw-upload.component.js';
import TwFileInput from './tw-file-input.directive.js';

export default angular
  .module('tw.styleguide.forms.upload', [])
  .directive('twFileInput', TwFileInput)
  .component('twUpload', TwUpload).name;
