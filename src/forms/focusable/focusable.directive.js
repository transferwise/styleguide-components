import FocusableController from './focusable.controller.js';

function Focusable() {
  return {
    restrict: 'A',
    controller: FocusableController
  };
}

export default Focusable;
