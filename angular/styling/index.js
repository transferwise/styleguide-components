import angular from 'angular';

import PopOver from './pop-over/tw-pop-over.directive.js';
import ToolTip from './tool-tip/tw-tool-tip.directive.js';
import Loader from './loader/tw-loader.component.js';
import Process from './process/tw-process.component.js';

export default angular.module('tw.form-styling', [
  PopOver,
  ToolTip,
  Loader,
  Process
]).name;
