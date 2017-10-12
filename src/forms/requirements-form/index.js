import angular from 'angular';
import RequirementsFormService from './requirements-form.service.js';
import RequirementsForm from './requirements-form.component.js';
import Tabs from '../../navigation/tabs/';
import Fieldset from '../../forms/fieldset/';

export default angular
  .module('tw.styleguide.forms.requirements-form', [
    Tabs,
    Fieldset
  ])
  .service('TwRequirementsFormService', RequirementsFormService)
  .component('twRequirementsForm', RequirementsForm).name;
