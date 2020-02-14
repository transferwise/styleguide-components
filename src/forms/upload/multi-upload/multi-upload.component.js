import controller from './multi-upload.controller';
import template from './multi-upload.html';

const Component = {
  controller,
  template,
  bindings: {
    ngDisabled: '<',
    ngModel: '=',
    ngChange: '&',
    name: '@',
    label: '@',
    placeholder: '@',
    icon: '@', // illustration in icon shown in upload box

    buttonText: '@', // Button text shown in default state
    cancelText: '@', // Text instructing to go back to re-upload after upload is done

    processingText: '@', // Text shown while processing/uploading
    successText: '@', // Text after upload is successful, shown quite briefly before preview
    failureText: '@',

    tooLargeMessage: '@',
    // wrongTypeMessage: '@',

    validationMessages: '<',

    accept: '@',
    httpOptions: '<',

    onStart: '=',
    onSuccess: '=',
    onFailure: '=',
    onCancel: '=',

    maxSize: '<', // TODO move to ngMax?
  }
};

export default Component;
