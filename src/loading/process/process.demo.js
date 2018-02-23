import angular from 'angular';
import template from './process.demo.html';

export default angular
  .module('tw.styleguide.demo.loading.process', [])
  .component('twProcessDocs', {
    controller() {
      this.log = function (message) { console.log(message); };
    },
    template
  }).name;
