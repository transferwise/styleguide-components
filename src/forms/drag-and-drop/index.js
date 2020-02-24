import angular from 'angular';
import Drop from './drop.directive';
import DragEnter from './drag-enter.directive';
import DragLeave from './drag-leave.directive';

export default angular
  .module('tw.styleguide.forms.drag-and-drop', [])
  .directive('twDrop', Drop)
  .directive('twDragEnter', DragEnter)
  .directive('twDragLeave', DragLeave)
  .name;
