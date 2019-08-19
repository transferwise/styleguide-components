import angular from 'angular';
import Field from '../field';
import Fieldset from './fieldset.component.js';
import RequirementsService from '../../services/requirements';

export default angular
  .module('tw.styleguide.forms.fieldset', [
    Field,
    RequirementsService
  ])
  .component('twFieldset', Fieldset).name;
