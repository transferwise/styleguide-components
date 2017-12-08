import angular from 'angular';
import FormControl from '../dynamic-form-control/';
import FormGroup from '../form-group/';
import Fieldset from './fieldset.component.js';
import RequirementsService from '../../services/requirements/';

export default angular
  .module('tw.styleguide.forms.fieldset', [
    FormControl,
    FormGroup,
    RequirementsService
  ])
  .component('twFieldset', Fieldset).name;
