import angular from 'angular';

import TwFocusable from './tw-focusable/tw-focusable.directive.js';
import TwAffix from './tw-affix/tw-affix.directive.js';
import TwPopOver from './tw-pop-over/tw-pop-over.directive.js';
import TwToolTip from './tw-tool-tip/tw-tool-tip.directive.js';
import TwTextFormatDirective from './tw-text-format/tw-text-format.directive.js';
import TwTextFormatFilter from './tw-text-format/tw-text-format.filter.js';

const stylingModule = angular.module('tw.form-styling');

stylingModule.requires.push(TwFocusable);
stylingModule.requires.push(TwAffix);
stylingModule.requires.push(TwPopOver);
stylingModule.requires.push(TwToolTip);
stylingModule.requires.push(TwTextFormatDirective);
stylingModule.requires.push(TwTextFormatFilter);

export default stylingModule.name;

//export default angular.module('tw.form-styling', []).name;
