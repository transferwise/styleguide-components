import TwProcessController from './tw-process.controller.js';
import template from './process.html';

const TwProcess = {
  bindings: {
    state: '<',
    size: '@',
    onStop: '&',
    promise: '<'
  },
  controller: TwProcessController,
  template
};

export default TwProcess;
