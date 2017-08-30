import TwCardsService from './tw-cards.service.js';
import TwCardController from './tw-card.controller.js';

function TwCard() {
  return {
    require: {
      cardContainerController: '^twCards'
    },
    controllerAs: '$ctrl',
    bindToController: true,
    replace: true,
    scope: {
      state: '@',
      index: '<',
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
    controller: TwCardController,
    template: require('./card.html'),
    link: function ($scope, $element, $attrs, $ctrl) {
      var cardController = $scope.$ctrl;

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
  };
}

export default TwCard;
