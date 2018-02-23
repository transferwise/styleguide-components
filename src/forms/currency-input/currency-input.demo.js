import angular from 'angular';
import template from './currency-input.demo.html';

export default angular
  .module('tw.styleguide.demo.forms.currency-input', [])
  .component('twCurrencyInputDocs', {
    bindings: {
      model: '=',
      sizes: '<'
    },
    controller() {
      this.log = (message) => {
        console.log(message); // eslint-disable-line
      };
    },
    template
  }).name;
