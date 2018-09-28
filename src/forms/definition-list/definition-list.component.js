import controller from './definition-list.controller.js';
import template from './definition-list.html';

const DefinitionList = {
  controller,
  template,
  bindings: {
    model: '<',
    initialFields: '<fields',
    locale: '@',
    title: '@',
    narrow: '<',
    layout: '@'
  }
};

export default DefinitionList;
