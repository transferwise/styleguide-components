import angular from 'angular';
import template from './select-smb-86.demo.html';

const foo = angular
  .module('tw.styleguide.demo.forms.select', [])
  .component('twSelectDocsSmb86', {
    bindings: {},
    controller(selectSvc, $scope) {
      $scope.$watch('$ctrl.select.size', (newVal, oldVal) => {
        console.log('selected_value (new, old)', newVal, oldVal);
      });

      $scope.$watch('$ctrl.select.buttonSizes', (newVal, oldVal) => {
        console.log('options_array (new, old)', newVal, oldVal);
      });

      /* WilsonJ: the problem of the selectedValue not displaying revolves around the
       * promise resolving immediately and both the selectedValue and optionsArray
       * being part of a singleton service, thus surviving route changes.
       */

      /* ============================================
       * Updates from here reproduce the error.
       * Uncomment the assignment line and cooment
       * the one on the next method to play around.
       */
      selectSvc.immediateResolve().then(data => {
        // this.select = data;
      });

      /* ===================================================
       * Updates from here do not reproduce the error, since
       * the respnse is wrapped on a timeout which forces
       * the update to happen on the next event loop round,
       * which would be the case for promises taking longer
       * than 16 ms to fulfil.
      */
      selectSvc.delayedResolve().then(data => {
        this.select = data;
      });
    },
    template,
  });

foo.service('selectSvc', function($q) {
  var self = this;
  self.size = 'md';

  self.buttonSizes = [
    { value: 'sm', label: 'Small button' },
    { value: 'md', label: 'Medium button' },
    { value: 'lg', label: 'Large button' },
  ];

  function immediateResolve() {
    return $q(resolve => {
      resolve({
        size: self.size,
        buttonSizes: self.buttonSizes,
      });
    });
  }

  function delayedResolve() {
    return $q(resolve => {
      setTimeout(_ =>
        resolve({
          size: self.size,
          buttonSizes: self.buttonSizes,
        }),
      );
    });
  }

  return { immediateResolve, delayedResolve };
});

export default foo.name;
