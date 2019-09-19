import controller from './upload.controller.js';
import template from './upload.html';

const Upload = {
  controller,
  template,
  transclude: true,
  bindings: {
    ngDisabled: '<',
    ngModel: '=',
    ngChange: '&',
    name: '@',
    icon: '@', // illustration in icon shown in upload box
    helpImage: '@', // illustration in image showin in upload box, if specified, replaces icon
    label: '@',
    placeholder: '@',
    description: '@', // DEPRECATED for label
    instructions: '@', // DEPRECATED for placeholder
    buttonText: '@',
    cancelText: '@', // Text instructing to go back to re-upload after upload is done
    processingText: '@', // Text shown while uploading
    successText: '@', // Text after upload is successful, shown quite briefly before preview
    failureText: '@',
    errorMessage: '@',
    tooLargeMessage: '@',
    // wrongTypeMessage: '@',
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
    cameraOverlay: '@', // Optional
    cameraFaceMode: '@' // environment/user
  }
};

export default Upload;
