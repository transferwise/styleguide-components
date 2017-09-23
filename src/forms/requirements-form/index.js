import angular from 'angular';
import RequirementsService from './requirements.service.js';
import RequirementsForm from './requirements-form.component.js';
import Tabs from '../../navigation/tabs/';
import Fieldset from '../../forms/fieldset/';

export default angular
  .module('tw.styleguide.forms.requirements-form', [
    Tabs,
    Fieldset
  ])
  .service('TwRequirementsService', RequirementsService)
  .component('twRequirementsForm', RequirementsForm).name;
