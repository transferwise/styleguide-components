
import controller from './card.controller.js';
import template from './card.html';

function Card() {
  return {
    controller,
    template,
    require: {
      cardContainerController: '^twCards'
    },
    controllerAs: '$ctrl',
    bindToController: true,
    replace: true,
    scope: {
      state: '@',
      index: '<',
      showform: '<?',
      open: '<?',
      disabled: '=?',
      inactive: '<'
    },
    transclude: {
      collapsedCard: 'collapsed',
      expandedCard: 'expanded',
      cardForm: '?cardForm',
      cardIcon: 'cardIcon',
    },
    link: CardLink
  };
}

function CardLink($scope, $element, $attrs, $ctrl) {
  const cardController = $scope.$ctrl;

  cardController.addCard(cardController);
  cardController.index = cardController.getLength() - 1;
  cardController.inactive = $ctrl.cardContainerController.inactive;

  if (cardController.open === true &&
    cardController.getExpandedIndex() === -1) { // only takes first pre-expanded card
    cardController.updateExpandedIndex(cardController.index);
  } else {
    cardController.open = false;
  }

  if (cardController.disabled == null) {
    cardController.disabled = false;
  }
}

export default Card;
