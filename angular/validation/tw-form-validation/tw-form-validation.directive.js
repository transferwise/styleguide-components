
(function(angular) {
  'use strict';

  angular
    .module('tw.form-validation')
    .directive('form', TwFormValidation);

  function TwFormValidation() {
    return {
      restrict: 'E',
      link: function(scope, element) {
        $(element).on('submit', function() {
          // Submitting the form won't trigger form controls own validation
          var elements = $(element).find("[tw-validation].ng-invalid");

          elements.closest(".form-group").addClass("has-error");
          elements.closest(".checkbox, .radio").addClass("has-error");

          return true;
        });
      }
    };
  }
})(window.angular);
