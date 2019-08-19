import angular from 'angular';
import Checkbox from './checkbox.component.js';
import DomService from '../../services/dom';

export default angular
  .module('tw.styleguide.forms.checkbox', [
    DomService
  ])
  .component('twCheckbox', Checkbox).name;
