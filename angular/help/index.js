import angular from 'angular';

import PopOver from './pop-over/tw-pop-over.directive.js';
import ToolTip from './tool-tip/tw-tool-tip.directive.js';

export default angular.module('tw.styleguide.help', [
  PopOver,
  ToolTip
]).name;
