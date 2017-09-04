import CardsService from './cards.service.js';

class CardController {
  constructor($transclude, CardsService) {
    this.hasForm = $transclude.isSlotFilled('cardForm');
    this.toggle = CardsService.toggle;
    this.addCard = CardsService.addCard;
    this.getExpandedIndex = CardsService.getExpandedIndex;
    this.updateExpandedIndex = CardsService.updateExpandedIndex;
    this.getCard = CardsService.getCard;
    this.getLength = CardsService.getLength;
  }
}

CardController.$inject = ['$transclude', 'TwCardsService'];

export default CardController;
