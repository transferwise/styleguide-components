import angular from 'angular';
import DomService from '../../services/dom/dom.service.js'; // eslint-disable-line

class FocusableController {
  constructor($element, TwDomService) {
    const element = $element[0];
    const formGroup = TwDomService.getClosestParentByClassName(element, 'form-group');

    if (formGroup && element) {
      element.addEventListener('focus', () => {
        formGroup.classList.add('focus');
      });
      element.addEventListener('blur', () => {
        formGroup.classList.remove('focus');
      });
    }
  }
}

FocusableController.$inject = ['$element', 'TwDomService'];

function Focusable() {
  return {
    restrict: 'A',
    controller: FocusableController
  };
}

// TODO this module is not loaded under styleguide-components
function FormControlStyling() {
  return {
    restrict: 'C',
    controller: FocusableController
  };
}

/* TODO deprecate in V1, opt-in through tw-focusable */
angular
  .module('tw.styleguide.styling.default-focus', [])
  .directive('formControl', FormControlStyling);

export default Focusable;
