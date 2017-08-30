import TwRequirementsService from './tw-requirements.service.js';
import TwRequirementsForm from './tw-requirements-form.component.js';
import TwTabs from '../../navigation/tabs/';

export default angular
  .module('tw.styleguide.forms.requirements-form', [])
  .service('TwRequirementsService', TwRequirementsService)
  .component('twRequirementsForm', TwRequirementsForm).name;
