import angular from 'angular';
import PopOver from './pop-over.directive.js';

export default angular
  .module('tw.styleguide.help.popover', [])
  .directive('twPopOver', PopOver).name;
