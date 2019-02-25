import angular from 'angular';
import template from './demo.html';

import schema from './demo.json';

class controller {
  $onInit() {
    this.errors = {
      currency: 'This one is bad',
      accountNumber: 'Also this one',
      streetAddress: 'And this one could be better',
      shareholders: [{
        firstName: 'Will it...'
      }, {
        lastName: 'Wont it...'
      }]
    };

    this.errors = {};
    this.schema = schema;

    this.model = {
      name: 'Example',
      taxRegistered: true,
      shareholders: [{
        firstName: 'jimbob'
      }],
      streetAddress: '22 Accacia Avenue'
    };
  }

  onModelChange(model) {
    console.log('outer', model); // eslint-disable-line
    this.model = model;
  }

  onRefreshRequirements(model) { // eslint-disable-line
    console.log('refresh', model); // eslint-disable-line
  }
}

export default angular
  .module('tw.styleguide.demo.json-schema', [])
  .component('jsonSchemaDocs', {
    controller,
    template
  }).name;
