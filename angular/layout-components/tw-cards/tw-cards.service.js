
  function TwCardsService() {
    var expandedIndex = -1; // index of expanded card, -1 when all closed
    var cards = []; // boolean array of card controllers

    this.toggle = function(index) {
      if (expandedIndex !== -1  && expandedIndex !== index) {
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

    this.addCard = function(scope) {
      cards.push(scope);
    };

    this.getExpandedIndex = function() {
      return expandedIndex;
    };

    this.updateExpandedIndex = function(newExpandedIndex) {
      expandedIndex = newExpandedIndex;
    };

    this.getCard = function(index) {
      return cards[index];
    };

    this.getLength = function() {
      return cards.length;
    };
  }

  export default TwCardsService;
