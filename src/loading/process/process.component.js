import controller from './process.controller.js';
import template from './process.html';

const Process = {
  controller,
  template,
  bindings: {
    state: '<',
    size: '@',
    onStop: '&',
    promise: '<'
  }
};

export default Process;
