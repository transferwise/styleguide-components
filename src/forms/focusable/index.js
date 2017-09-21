import angular from 'angular';
import Focusable from './focusable.directive.js';
import FormControlFocus from './form-control.directive.js';
import DomService from '../../services/dom/';

export default angular
  .module('tw.styleguide.forms.focusable', [
    DomService
  ])
  .directive('twFocusable', Focusable)
  .directive('formControl', FormControlFocus).name;
