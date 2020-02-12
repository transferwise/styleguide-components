import angular from 'angular';
import onDrop from './on-drop.directive';
import onDragEnter from './on-drag-enter.directive';
import onDragLeave from './on-drag-leave.directive';

export default angular
  .module('tw.styleguide.droppable', [])
  .directive('onDrop', onDrop)
  .directive('onDragEnter', onDragEnter)
  .directive('onDragLeave', onDragLeave)
  .name;
