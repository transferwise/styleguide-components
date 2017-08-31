import template from './cards.html';

const TwCards = {
  template,
  bindings: {
    inactive: '=?'
  },
  transclude: true
};

export default TwCards;
