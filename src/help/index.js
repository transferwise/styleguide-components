import angular from 'angular';

import PopOver from './pop-over';
import ToolTip from './tool-tip';

export default angular.module('tw.styleguide.help', [
  PopOver,
  ToolTip
]).name;
