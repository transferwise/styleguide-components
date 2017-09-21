
class CardController {
  constructor($transclude, TwCardsService) {
    this.toggle = TwCardsService.toggle;
    this.addCard = TwCardsService.addCard;
    this.getExpandedIndex = TwCardsService.getExpandedIndex;
    this.updateExpandedIndex = TwCardsService.updateExpandedIndex;
    this.getCard = TwCardsService.getCard;
    this.getLength = TwCardsService.getLength;
  }
}

CardController.$inject = [
  '$transclude',
  'TwCardsService'
];

export default CardController;
