import angular from 'angular';
import template from './checkbox-group.demo.html';

class CheckboxGroupController {
  constructor() {
    this.options = [{
      value: '1',
      label: 'One'
    },
    {
      value: '2',
      label: 'Two'
    }];
  }
  log(message) { // eslint-disable-line
    console.log(message); // eslint-disable-line
  }
}

export default angular
  .module('tw.styleguide.demo.forms.checkbox-group', [])
  .component('twCheckboxGroupDocs', {
    bindings: {
      model: '='
    },
    controller: CheckboxGroupController,
    template
  }).name;
