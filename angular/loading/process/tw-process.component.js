import TwProcessController from './tw-process.controller.js';

const TwProcess = {
  bindings: {
    state: '<',
    size: '@',
    onStop: '&',
    promise: '<'
  },
  controller: TwProcessController,
  template: require('./process.html')
};

export default TwProcess;
