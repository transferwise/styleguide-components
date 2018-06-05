import controller from './decision-list.controller.js';
import template from './decision-list.html';

const DecisionList = {
  controller,
  template,
  bindings: {
    type: '<',
    options: '<'
  }
};

export default DecisionList;
