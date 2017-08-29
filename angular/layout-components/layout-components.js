import angular from 'angular';

import TwCard from './tw-cards/tw-card.directive.js';
import TwCards from './tw-cards/tw-cards.component.js';

export default angular.module('tw.layout-components', [
  TwCard,
  TwCards
]).name;
