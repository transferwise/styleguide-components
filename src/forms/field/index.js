import angular from 'angular';
import FormControl from '../form-control';
import Field from './field.component';
import RequirementsService from '../../services/requirements';
import ControlValidation from '../../validation/control-validation';

export default angular
  .module('tw.styleguide.forms.field', [
    FormControl,
    RequirementsService,
    ControlValidation
  ])
  .component('twField', Field).name;
