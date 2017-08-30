
function TwCardController($transclude, TwCardsService) {
  var $ctrl = this;
  $ctrl.hasForm = $transclude.isSlotFilled("cardForm");
  $ctrl.toggle = TwCardsService.toggle;
  $ctrl.addCard = TwCardsService.addCard;
  $ctrl.getExpandedIndex = TwCardsService.getExpandedIndex;
  $ctrl.updateExpandedIndex = TwCardsService.updateExpandedIndex;
  $ctrl.getCard = TwCardsService.getCard;
  $ctrl.getLength = TwCardsService.getLength;
}

TwCardController.$inject = ['$transclude', 'TwCardsService'];

export default TwCardController;
