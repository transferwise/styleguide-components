/* DEPRECATED in favour of upload */

import UploadDroppable from './upload-droppable.directive.js';
import FileSelect from './file-select.directive.js';

export default angular
  .module('tw.styleguide.forms.upload-droppable', [])
  .directive('twFileSelect', FileSelect)
  .component('twUploadDroppable', UploadDroppable).name;
