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
      this.log = (message) => {
        console.log(message); // eslint-disable-line
      };

      this.sizes = [
        { value: 'sm', label: 'Small' },
        { value: '', label: 'Medium' },
        { value: 'lg', label: 'Large' }
      ];
    },
    template
  }).name;
