import controller from './definition-list.controller.js';
import template from './definition-list.html';

const DefinitionList = {
  controller,
  template,
  bindings: {
    model: '<',
    fields: '<',
    locale: '@',
    legend: '@',
    narrow: '<'
  }
};

export default DefinitionList;
