import angular from 'angular';
import FormControl from '../dynamic-form-control/';
import Field from './field.component.js';
import RequirementsService from '../../services/requirements/';

export default angular
  .module('tw.styleguide.forms.field', [
    FormControl,
    RequirementsService
  ])
  .component('twField', Field).name;
