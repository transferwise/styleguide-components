import angular from 'angular';

import Focusable from './tw-focusable/tw-focusable.directive.js';
import Affix from './tw-affix/tw-affix.directive.js';
import PopOver from './tw-pop-over/tw-pop-over.directive.js';
import ToolTip from './tw-tool-tip/tw-tool-tip.directive.js';
import TextFormatDirective from './tw-text-format/tw-text-format.directive.js';
import TextFormatFilter from './tw-text-format/tw-text-format.filter.js';

export default angular.module('tw.form-styling', [
  Focusable,
  Affix,
  PopOver,
  ToolTip,
  TextFormatDirective,
  TextFormatFilter
]).name;
