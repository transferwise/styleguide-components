import angular from 'angular';
import template from './definition-list.demo.html';

export default angular
  .module('tw.styleguide.demo.forms.definition-list', [])
  .component('twDefinitionListDocs', {
    bindings: {
      model: '=',
      fields: '='
    },
    template
  }).name;
