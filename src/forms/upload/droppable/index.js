import angular from 'angular';
import twDrop from './tw-drop.directive';
import twDragEnter from './tw-drag-enter.directive';
import twDragLeave from './tw-drag-leave.directive';

export default angular
  .module('tw.styleguide.droppable', [])
  .directive('twDrop', twDrop)
  .directive('twDragEnter', twDragEnter)
  .directive('twDragLeave', twDragLeave)
  .name;
