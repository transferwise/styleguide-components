import angular from 'angular';
import Radio from './radio.component.js';
import DomService from '../../services/dom';

export default angular
  .module('tw.styleguide.forms.radio', [
    DomService
  ])
  .component('twRadio', Radio).name;
