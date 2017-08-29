import angular from 'angular';

import Card from './tw-cards/tw-card.directive.js';
import Cards from './tw-cards/tw-cards.component.js';

export default angular.module('tw.layout-components', [
  Card,
  Cards
]).name;
