import angular from 'angular';
import template from './demo.html';

import PopOver from './pop-over/pop-over.demo.js';
import ToolTip from './tool-tip/tool-tip.demo.js';

export default angular.module('tw.styleguide.demo.help', [
  PopOver,
  ToolTip
]).component('helpComponents', { template }).name;
