import angular from 'angular';
import Radio from './radio.component.js';
import DomService from '../../services/dom';
import Focusable from '../focusable';

export default angular
  .module('tw.styleguide.forms.radio', [
    DomService,
    Focusable
  ])
  .component('twRadio', Radio).name;
