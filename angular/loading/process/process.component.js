import ProcessController from './process.controller.js';

const Process = {
  bindings: {
    state: '<',
    size: '@',
    onStop: '&',
    promise: '<'
  },
  controller: ProcessController,
  template: require('./process.html')
};

export default Process;
