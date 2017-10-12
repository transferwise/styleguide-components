import angular from 'angular';
import RequirementsService from './requirements.service.js';

export default angular
  .module('tw.styleguide.services.requirements', [])
  .service('TwRequirementsService', RequirementsService).name;
