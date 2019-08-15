import angular from 'angular';
import RequirementsForm from './requirements-form.component.js';
import Tabs from '../../navigation/tabs';
import Fieldset from '../fieldset';

export default angular
  .module('tw.styleguide.forms.requirements-form', [
    Tabs,
    Fieldset
  ])
  .component('twRequirementsForm', RequirementsForm).name;
