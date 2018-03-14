
function TwCardsService() {
  let expandedIndex = -1; // index of expanded card, -1 when all closed
  const cards = []; // boolean array of card controllers

  this.toggle = (index) => {
    if (expandedIndex !== -1 && expandedIndex !== index) {
      if (cards[expandedIndex].isExpanded()) {
        cards[expandedIndex].collapse();
      }
      expandedIndex = -1;
    }

    const card = cards[index];
    if (card.isExpanded()) {
      card.collapse();
    } else {
      expandedIndex = index;
      card.expand();
    }
  };

  this.addCard = (scope) => {
    cards.push(scope);
  };

  this.updateExpandedIndex = (newExpandedIndex) => {
    expandedIndex = newExpandedIndex;
  };

  this.getCard = index => cards[index];
  this.getLength = () => cards.length;
  this.getExpandedIndex = () => expandedIndex;
}

export default TwCardsService;
