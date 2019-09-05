import angular from 'angular';
import Select from './select.component.js';
import DomService from '../../services/dom';
import Focusable from '../focusable';

export default angular
  .module('tw.styleguide.forms.select', [
    DomService,
    Focusable
  ])
  .component('twSelect', Select).name;
