// This directive provide backwards compatibility
// It should no longer be necessary when browsers support :focus-within
import FocusableController from './focusable.controller.js';

function FormControlFocus() {
  return {
    restrict: 'C',
    controller: FocusableController
  };
}

export default FormControlFocus;
