import angular from 'angular';
import template from './decision-list.demo.html';

export default angular
  .module('tw.styleguide.demo.forms.decision-list', [])
  .component('twDecisionListDocs', {
    controller() {
      this.options = [{
        title: 'First option',
        description: 'Description of this option',
        $ref: '/requirements/optionOne'
      }, {
        title: 'Second option',
        description: 'Description of this option',
        $ref: '/requirements/optionTwo'
      }, {
        title: 'Third option',
        description: 'Description of this option',
        $ref: '/requirements/optionThree'
      }];

      this.oneOf = 'oneOf';
      this.anyOf = 'anyOf';
    },
    template
  }).name;
