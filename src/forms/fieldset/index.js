import angular from 'angular';
import Fieldset from './fieldset.component';
import Field from '../field';
import RequirementsService from '../../services/requirements';

export default angular
  .module('tw.styleguide.forms.fieldset', [
    Field,
    RequirementsService
  ])
  .component('twFieldset', Fieldset).name;
