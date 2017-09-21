import angular from 'angular';
import ToolTip from './tool-tip.directive.js';

export default angular
  .module('tw.styleguide.help.tooltip', [])
  .directive('twToolTip', ToolTip).name;
