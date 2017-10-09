import controller from './definition-list.controller.js';
import template from './definition-list.html';

const DefinitionList = {
  controller,
  template,
  bindings: {
    model: '<',
    fields: '<',
    locale: '@'
  }
};

export default DefinitionList;
