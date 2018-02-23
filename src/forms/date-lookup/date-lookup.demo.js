import angular from 'angular';
import template from './date-lookup.demo.html';

export default angular
  .module('tw.styleguide.demo.forms.date-lookup', [])
  .component('twDateLookupDocs', {
    bindings: {
      model: '=',
      locales: '<',
      sizes: '<'
    },
    controller() {
      this.log = function (message) { console.log(message); };
    },
    template
  }).name;
