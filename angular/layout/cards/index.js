import TwCardsService from './tw-cards.service.js';
import TwCard from './tw-card.directive.js';
import TwCards from './tw-cards.component.js';

export default angular
  .module('tw.styleguide.layout.cards', [])
  .service('TwCardsService', TwCardsService)
  .component('twCards', TwCards)
  .directive('twCard', TwCard).name;
