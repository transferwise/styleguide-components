import angular from 'angular';
import $ from 'jquery';

/* TODO deprecate in V1, opt-in through tw-focusable */
angular
  .module('tw.styleguide.styling.default-focus', [])
  .directive('formControl', FormControlStyling);

function FormControlStyling() {
  return {
    restrict: 'C',
    link: FocusableLink
  };
}


function Focusable() {
  return {
    restrict: 'A',
    link: FocusableLink
  };
}

function FocusableLink(scope, element) {
  const formGroup = $(element).closest('.form-group');

  $(element)
    .on('focus', () => {
      formGroup.addClass('focus');
    })
    .on('blur', () => {
      formGroup.removeClass('focus');
    });
}

export default Focusable;
