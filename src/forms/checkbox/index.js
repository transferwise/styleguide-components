import angular from 'angular';
import Checkbox from './checkbox.component.js';
import DomService from '../../services/dom';
import Focusable from '../focusable';

export default angular
  .module('tw.styleguide.forms.checkbox', [
    DomService,
    Focusable
  ])
  .component('twCheckbox', Checkbox).name;
