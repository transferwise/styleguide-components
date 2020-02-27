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
    secondaryButtonText: '@', // Button text shown in processing state

    droppingText: '@', // Text shown when hovering with a file
    processingText: '@', // Text shown while processing/uploading
    successText: '@', // Text after upload is successful, shown quite briefly before preview
    failureText: '@',

    tooLargeMessage: '@',
    // wrongTypeMessage: '@',

    validationMessages: '<',

    onStart: '&',
    onFinish: '&',

    accept: '@',
    httpOptions: '<',

    maxSize: '<', // TODO move to ngMax?
  }
};

export default Component;
