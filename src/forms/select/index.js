import angular from 'angular';
import Select from './select.component.js';
import DomService from '../../services/dom/';

export default angular
  .module('tw.styleguide.forms.select', [
    DomService
  ])
  .component('twSelect', Select).name;
