
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
      showForm: '<?',
      open: '<?',
      disabled: '<?',
      inactive: '<',
      onExpand: '&',
      onCollapse: '&'
    },
    transclude: {
      collapsedCard: 'collapsed',
      expandedCard: 'expanded',
      cardForm: '?cardForm',
      cardIcon: 'cardIcon',
      modals: '?modals',
    },
    link: CardLink
  };
}

function CardLink($scope) {
  const $ctrl = $scope.$ctrl;

  $ctrl.addCard($ctrl);
  $ctrl.index = $ctrl.getLength() - 1;
  $ctrl.inactive = $ctrl.cardContainerController.inactive;

  if ($ctrl.open === true &&
    $ctrl.getExpandedIndex() === -1) { // only takes first pre-expanded card
    $ctrl.updateExpandedIndex($ctrl.index);
  } else {
    $ctrl.open = false;
  }

  if ($ctrl.disabled == null) {
    $ctrl.disabled = false;
  }
}

export default Card;
