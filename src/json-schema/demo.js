import angular from 'angular';
import template from './demo.html';
import controller from './demo.controller';

import playgroundController from './demo.playground.controller';
import playgroundTemplate from './demo.playground.html';

export default angular
  .module('tw.styleguide.demo.json-schema', [])
  .component('jsonSchemaDocs', {
    controller,
    template
  })
  .component('jsonSchemaPlayground', {
    controller: playgroundController,
    template: playgroundTemplate
  }).name;
