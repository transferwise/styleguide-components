import angular from 'angular';

import PopOver from './help/pop-over/tw-pop-over.directive.js';
import ToolTip from './help/tool-tip/tw-tool-tip.directive.js';
import TextFormatDirective from './formatting/text-format/tw-text-format.directive.js';
import TextFormatFilter from './formatting/text-format/tw-text-format.filter.js';

export default angular.module('tw.form-styling', [
  PopOver,
  ToolTip,
  TextFormatDirective,
  TextFormatFilter
]).name;
