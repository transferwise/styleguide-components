import controller from './submit.controller.js';
import template from './submit.html';

const Submit = {
  controller,
  template,
  bindings: {
    label: '<',
    promise: '<',
    submitCallback: '&onSubmit',
    successCallback: '&onSuccess',
    failureCallback: '&?onFailure',
    ngDisabled: '<'
  }
};

export default Submit;
