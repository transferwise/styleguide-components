import angular from 'angular';
import template from './date.demo.html';

export default angular
  .module('tw.styleguide.demo.forms.date', [])
  .component('twDateDocs', {
    bindings: {
      model: '=',
      locales: '<',
      sizes: '<'
    },
    controller() {
      this.date = { required: true };
      this.log = function (message) { console.log(message); };
    },
    template
  }).name;
