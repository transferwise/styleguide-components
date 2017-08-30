import RequirementsService from './tw-requirements.service.js';
import RequirementsForm from './tw-requirements-form.component.js';
import Tabs from '../../navigation/tabs/';
import Fieldset from '../../forms/fieldset/';

export default angular
  .module('tw.styleguide.forms.requirements-form', [])
  .service('TwRequirementsService', RequirementsService)
  .component('twRequirementsForm', RequirementsForm).name;
