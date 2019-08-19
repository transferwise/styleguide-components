import angular from 'angular';
import FormControl from '../form-control';
import Field from './field.component';
import RequirementsService from '../../services/requirements';

export default angular
  .module('tw.styleguide.forms.field', [
    FormControl,
    RequirementsService
  ])
  .component('twField', Field).name;
