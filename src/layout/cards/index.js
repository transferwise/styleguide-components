import angular from 'angular';
import CardsService from './cards.service.js';
import Card from './card.directive.js';
import Cards from './cards.component.js';

export default angular
  .module('tw.styleguide.layout.cards', [])
  .service('TwCardsService', CardsService)
  .component('twCards', Cards)
  .directive('twCard', Card).name;
