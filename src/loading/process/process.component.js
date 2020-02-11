import controller from './process.controller.js';
import template from './process.html';

const Process = {
  controller,
  template,
  bindings: {
    state: '<', // null - processing, -1 - failed, 0 - hidden, 1 - success
    size: '@',
    onStop: '&',
    promise: '<'
  }
};

export default Process;
