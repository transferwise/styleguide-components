import FormControl from '../dynamic-form-control/';
import Fieldset from './tw-fieldset.component.js';

export default angular
  .module('tw.styleguide.forms.fieldset', [])
  .component('twFieldset', Fieldset).name;
