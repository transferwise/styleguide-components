import template from './cards.html';

const TwCards = {
  controller: function() {},
  template,
  bindings: {
    inactive: '=?'
  },
  transclude: true
};

export default TwCards;
