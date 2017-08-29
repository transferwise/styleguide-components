import TwUploadDroppable from './tw-upload-droppable.directive.js';
import TwFileSelect from './tw-file-select.directive.js';

export default angular
  .module('tw.styleguide.forms.upload-droppable', [])
  .directive('twFileSelect', TwFileSelect)
  .component('twUploadDroppable', TwUploadDroppable).name;
