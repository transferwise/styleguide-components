import angular from 'angular';
import template from './submit.demo.html';

class controller {
  constructor($q, $timeout) {
    this.$q = $q;
    this.$timeout = $timeout;
  }

  // eslint-disable-next-line
  log(message) {
    console.log(`Submit: ${message}`); // eslint-disable-line
  }

  onSubmit() {
    const $ctrl = this;
    this.promise = this.$q((resolve, reject) => {
      $ctrl.$timeout(() => {
        if ($ctrl.shouldSucceed) {
          resolve();
        } else {
          reject();
        }
      }, 2000);
    });
  }
}

controller.$inject = ['$q', '$timeout'];

export default angular
  .module('tw.styleguide.demo.forms.submit', [])
  .component('twSubmitDocs', {
    bindings: {
      sizes: '<'
    },
    controller,
    template
  }).name;
