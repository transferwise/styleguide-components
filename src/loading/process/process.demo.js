import angular from 'angular';
import template from './process.demo.html';

export default angular
  .module('tw.styleguide.demo.loading.process', [])
  .component('twProcessDocs', {
    controller() {
      this.log = (message) => {
        console.log(message); // eslint-disable-line
      };
      this.processingStates = [
        { value: null, label: 'Processing' },
        { value: -1, label: 'Failed' },
        { value: 0, label: 'Hidden' },
        { value: 1, label: 'Success' }
      ];

      this.sizes = [
        { value: 'xs', label: 'Extra small' },
        { value: 'sm', label: 'Small' },
        { value: 'xl', label: 'Extra large' }
      ];
    },
    template
  }).name;
