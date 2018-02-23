import angular from 'angular';
import template from './radio.demo.html';

export default angular
  .module('tw.styleguide.demo.forms.radio', [])
  .component('twRadioDocs', {
    bindings: {
      model: '='
    },
    controller() {
      this.radio = { required: true };
      this.log = function (message) { console.log(message); };
    },
    template
  }).name;
