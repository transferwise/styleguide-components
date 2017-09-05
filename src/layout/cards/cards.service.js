
function TwCardsService() {
  let expandedIndex = -1; // index of expanded card, -1 when all closed
  const cards = []; // boolean array of card controllers

  this.toggle = (index) => {
    if (expandedIndex !== -1 && expandedIndex !== index) {
      cards[expandedIndex].open = false;
      expandedIndex = -1;
    }
    if (cards[index].open) {
      cards[index].open = false;
    } else {
      expandedIndex = index;
      cards[index].open = true;
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
