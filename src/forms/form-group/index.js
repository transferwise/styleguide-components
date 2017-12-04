import angular from 'angular';
import FormControl from '../dynamic-form-control/';
import FormGroup from './form-group.component.js';

export default angular
  .module('tw.styleguide.forms.form-group', [
    FormControl
  ])
  .component('twFormGroup', FormGroup).name;
