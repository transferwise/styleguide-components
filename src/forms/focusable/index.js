import angular from 'angular';
import Focusable from './focusable.directive.js';

export default angular
  .module('tw.styleguide.forms.focusable', [])
  .directive('twFocusable', Focusable).name;
