import TwRequirementsService from './tw-requirements.service.js';
import TwRequirementsForm from './tw-requirements-form.component.js';

export default angular
  .module('tw.styleguide.forms.requirements-form', [])
  .service('TwRequirementsService', TwRequirementsService)
  .component('twRequirementsForm', TwRequirementsForm).name;
