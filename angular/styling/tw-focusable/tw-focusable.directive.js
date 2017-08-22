(function(angular) {
  'use strict';

  /* TODO deprecate in V1, opt-in through tw-focusable */
  angular
    .module('tw.form-styling')
    .directive('formControl', TwFormControlStyling);

  function TwFormControlStyling() {
    return {
      restrict: 'C',
      link: FocusableLink
    };
  }

  angular
    .module('tw.form-styling')
    .directive('twFocusable', TwFocusable);

  function TwFocusable() {
    return {
      restrict: 'A',
      link: FocusableLink
    };
  }

  function FocusableLink(scope, element) {
    var formGroup = $(element).closest('.form-group');

    $(element)
      .on('focus', function() {
        formGroup.addClass('focus');
      })
      .on('blur', function() {
        formGroup.removeClass('focus');
      });
  }
})(window.angular);
