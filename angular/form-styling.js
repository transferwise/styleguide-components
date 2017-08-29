import angular from 'angular';

import PopOver              from './help/pop-over/';
import ToolTip              from './help/tool-tip/';
import TextFormatDirective  from './formatting/text-format/tw-text-format.directive.js';
import TextFormatFilter     from './formatting/text-format/tw-text-format.filter.js';

export default angular.module('tw.form-styling', [
  PopOver,
  ToolTip,
  TextFormatDirective,
  TextFormatFilter
]).name;
