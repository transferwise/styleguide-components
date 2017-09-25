import angular from 'angular';
import FormControl from '../dynamic-form-control/';
import Fieldset from './fieldset.component.js';

export default angular
  .module('tw.styleguide.forms.fieldset', [
    FormControl
  ])
  .component('twFieldset', Fieldset).name;
