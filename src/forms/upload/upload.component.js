import controller from './upload.controller.js';
import template from './upload.html';
import './upload.less';

const Upload = {
  controller,
  template,
  bindings: {
    ngDisabled: '<',
    ngModel: '=',
    ngChange: '&',
    name: '@',
    icon: '@', // illustration in icon shown in upload box
    helpImage: '@', // illustration in image showin in upload box, if specified, replaces icon
    label: '@',
    placeholder: '@',

    buttonText: '@', // Button text shown in default state
    cancelText: '@', // Text instructing to go back to re-upload after upload is done
    droppingText: '@', // Text shown when hovering with a file

    processingText: '@', // Text shown while processing/uploading
    successText: '@', // Text after upload is successful, shown quite briefly before preview
    failureText: '@',
    noCameraText: '@',
    noCameraMessage: '@',

    tooLargeMessage: '@',
    // wrongTypeMessage: '@',

    validationMessages: '<',

    size: '@',
    accept: '@',
    httpOptions: '<',

    onStart: '=',
    onSuccess: '=',
    onFailure: '=',
    onCancel: '=',

    maxSize: '<', // TODO move to ngMax?

    // Camera capture upload options

    /* Source of file to upload
     * Possible values
     * CAMERA_ONLY (allow only camera upload)
     * FILE_ONLY (allow only upload from file system)
     * ANY (we dont care)
     */
    source: '<',
    cameraGuidelines: '<',

    description: '@', // DEPRECATED for label
    instructions: '@', // DEPRECATED for placeholder
  }
};

export default Upload;
