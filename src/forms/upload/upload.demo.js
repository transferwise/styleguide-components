import angular from 'angular';
import template from './upload.demo.html';

export default angular
  .module('tw.styleguide.demo.forms.upload', [])
  .component('twUploadDocs', {
    bindings: {
      model: '=',
      sizes: '<'
    },
    controller() {
      const $ctrl = this;

      this.onStart = function () {
        console.log('File upload starting');
      };
      this.onSuccess = function () {
        console.log('File upload complete');
      };
      this.onFailure = function (error) {
        console.log('File upload failure');
        if (error.status === 404) {
          $ctrl.errorMessage = 'Bad URL';
        } else {
          $ctrl.errorMessage = 'Unknown error';
        }
      };
      this.onCancel = function () {
        console.log('File upload cancelled');
      };

      this.makeFancy = function () {
        $ctrl.label = 'Front of your ID document';
        $ctrl.processingText = 'Processing...';
        $ctrl.successText = 'Upload complete!';
        $ctrl.failureText = 'Upload failed!';
      };

      this.acceptOptions = [
        { value: '.png', label: 'PNG (.png)' },
        { value: '.jpg,.jpeg', label: 'JPG (.jpg,.jpeg)' },
        { value: 'image/*', label: 'Images (image/*)' },
        { value: 'video/*', label: 'Video (video/*)' },
        { value: 'audio/*', label: 'Audio (audio/*)' }
      ];

      this.log = function (message) { console.log(message); };
    },
    template
  }).name;
