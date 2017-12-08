import angular from 'angular';
import FormControl from '../dynamic-form-control/';
import FormGroup from './form-group.component.js';
import RequirementsService from '../../services/requirements/';

export default angular
  .module('tw.styleguide.forms.form-group', [
    FormControl,
    RequirementsService
  ])
  .component('twFormGroup', FormGroup).name;
