import angular from 'angular';

import Card from './layout/cards/tw-card.directive.js';
import Cards from './layout/cards/tw-cards.component.js';

export default angular.module('tw.layout-components', [
  Card,
  Cards
]).name;
