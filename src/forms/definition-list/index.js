import angular from 'angular';
import DefinitionList from './definition-list.component.js';

import Formatting from '../../formatting';

export default angular
  .module('tw.styleguide.requirements.definition-list', [
    Formatting
  ])
  .component('twDefinitionList', DefinitionList).name;
