import angular from 'angular';
import template from './upload.demo.html';

// Mock the file saver for the purposes of the demo.
class AsyncFileSaverMock {
  constructor($q) {
    this.$q = $q;
  }

  save() {
    return this.$q.resolve({
      data: {
        id: 1234
      }
    });
  }
}

AsyncFileSaverMock.$inject = ['$q'];

angular
  .module('tw.styleguide.forms.upload')
  .service('AsyncFileSaver', AsyncFileSaverMock);

export default angular
  .module('tw.styleguide.demo.forms.upload', [])
  .component('twUploadDocs', {
    bindings: {
      model: '=',
      sizes: '<'
    },
    controller() {
      const $ctrl = this;

      this.onStart = () => {
        this.log('File upload starting');
      };
      this.onSuccess = () => {
        this.log('File upload complete');
      };
      this.onFailure = (error) => {
        this.log('File upload failure');
        if (error.status === 404) {
          $ctrl.errorMessage = 'Bad URL';
        } else {
          $ctrl.errorMessage = 'Unknown error';
        }
      };
      this.onCancel = () => {
        this.log('File upload cancelled');
      };

      this.makeFancy = () => {
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

      this.sizes = [
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' }
      ];

      this.icons = [
        { value: 'upload', label: 'Upload' },
        { value: 'id', label: 'ID' },
        { value: 'pdf', label: 'PDF' }
      ];

      this.log = (message) => {
        console.log(message); // eslint-disable-line
      };
    },
    template
  }).name;
