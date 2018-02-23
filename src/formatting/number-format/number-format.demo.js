import angular from 'angular';
import template from './number-format.demo.html';

export default angular
  .module('tw.styleguide.demo.formatting.number-format', [])
  .component('twNumberFormatDocs', {
    bindings: {
      locales: '<'
    },
    controller() {
      this.number = 123456.78;
      this.locale = 'en-GB';
      this.precision = null;
    },
    template
  }).name;
