import angular from 'angular';

function FocusableLink(scope, element) {
  const formGroup = $(element).closest('.form-group')[0]; // eslint-disable-line
  const focusable = element[0];

  if (formGroup && focusable) {
    focusable.addEventListener('focus', () => {
      formGroup.classList.add('focus');
    });
    focusable.addEventListener('blur', () => {
      formGroup.classList.remove('focus');
    });
  }
}

function Focusable() {
  return {
    restrict: 'A',
    link: FocusableLink
  };
}

// TODO this module is not loaded under styleguide-components
function FormControlStyling() {
  return {
    restrict: 'C',
    link: FocusableLink
  };
}

/* TODO deprecate in V1, opt-in through tw-focusable */
angular
  .module('tw.styleguide.styling.default-focus', [])
  .directive('formControl', FormControlStyling);

export default Focusable;
