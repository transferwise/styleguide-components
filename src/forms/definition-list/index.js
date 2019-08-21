import angular from 'angular';
import DefinitionList from './definition-list.component.js';

import Formatting from '../../formatting';
import RequirementsService from '../../services/requirements';
import DateService from '../../services/date';

export default angular
  .module('tw.styleguide.requirements.definition-list', [
    Formatting,
    RequirementsService,
    DateService
  ])
  .component('twDefinitionList', DefinitionList).name;
