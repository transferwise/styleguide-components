import angular from 'angular';
import template from './checkbox.demo.html';

export default angular
  .module('tw.styleguide.demo.forms.checkbox', [])
  .component('twCheckboxDocs', {
    bindings: {
      model: '='
    },
    controller() {
      this.checkbox = { required: true };
      this.log = (message) => {
        console.log(message); // eslint-disable-line
      };
    },
    template
  }).name;
