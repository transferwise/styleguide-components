import angular from 'angular';
// import DomService from '../../services/dom/dom.service.js';

function FocusableLink(scope, element) {
  // TODO remove jquery
  const formGroup = $(element).closest('.form-group')[0]; // eslint-disable-line
  // const dom = new DomService();

  // const formGroup = DomService.getClosestParentByClassName(element, 'form-group');
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
