import angular from 'angular';
import PopOver from './pop-over.directive.js';
import PopOverService from './pop-over.service.js';

export default angular
  .module('tw.styleguide.help.popover', [])
  .service('twPopOverService', PopOverService)
  .directive('twPopOver', PopOver).name;
