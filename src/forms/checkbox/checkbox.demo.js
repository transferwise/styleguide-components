import angular from 'angular';
import template from './checkbox.demo.html';

class CheckboxController {
  constructor() {
    this.checkbox = { required: true };
  }
  log(message) { // eslint-disable-line
    console.log(message); // eslint-disable-line
  }
}

export default angular
  .module('tw.styleguide.demo.forms.checkbox', [])
  .component('twCheckboxDocs', {
    bindings: {
      model: '='
    },
    controller: CheckboxController,
    template
  }).name;
