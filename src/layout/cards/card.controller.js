
class CardController {
  constructor($transclude, TwCardsService) {
    this.toggle = TwCardsService.toggle;
    this.addCard = TwCardsService.addCard;
    this.getExpandedIndex = TwCardsService.getExpandedIndex;
    this.updateExpandedIndex = TwCardsService.updateExpandedIndex;
    this.getCard = TwCardsService.getCard;
    this.getLength = TwCardsService.getLength;
  }

  isExpanded() {
    return this.open;
  }

  collapse() {
    this.open = false;

    if (this.onCollapse) {
      this.onCollapse();
    }
  }

  expand() {
    this.open = true;

    if (this.onExpand) {
      this.onExpand();
    }
  }
}

CardController.$inject = [
  '$transclude',
  'TwCardsService'
];

export default CardController;
