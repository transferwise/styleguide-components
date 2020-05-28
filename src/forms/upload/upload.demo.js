import angular from 'angular';
import template from './upload.demo.html';

// Mock the file saver for the purposes of the demo.
class AsyncFileSaverMock {
  constructor($q) {
    this.$q = $q;
  }

  save(fieldName, file, httpOptions) {
    if (httpOptions.url === '404') {
      return this.$q.reject({
        data: { message: 'Error message from server' }
      });
    }

    return this.$q.resolve({
      data: {
        id: 1234,
        message: 'This photo passed our automatic checks',
        details: ['So its ready for our team to review']
      }
    });
  }
}

AsyncFileSaverMock.$inject = ['$q'];

angular
  .module('tw.styleguide.forms.upload')
  .service('AsyncFileSaver', AsyncFileSaverMock);

function controller($scope) {
  const $ctrl = this;
  this.$scope = $scope;

  this.$scope.$watch('$ctrl.showNgModel', (newValue) => {
    if (newValue) {
      this.model = this.modelToBind;
    } else {
      this.model = null;
    }
  });

  this.onStart = () => {
    this.log('File upload starting');
  };

  this.onFinish = () => {
    this.log('File upload finished');
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

  this.label = 'Front of your ID document';
  $ctrl.processingText = 'Processing...';
  $ctrl.droppingText = 'Drop file to begin...';
  $ctrl.successText = 'Upload complete!';
  $ctrl.failureText = 'Upload failed!';
  $ctrl.noCameraText = 'Couldn\'t detect your camera';
  $ctrl.noCameraMessage = 'Please enable camera permissions, try a different browser, or use a different device.';

  this.makeFancy = () => {};

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

  this.sources = [
    { value: 'CAMERA_ONLY', label: 'CAMERA_ONLY' },
    { value: 'UPLOAD_ONLY', label: 'UPLOAD_ONLY' },
    { value: 'ANY', label: 'ANY' }
  ];

  this.cameraDirections = [
    { value: 'ENVIRONMENT', label: 'ENVIRONMENT' },
    { value: 'USER', label: 'USER' }
  ];

  this.icons = [
    { value: 'upload', label: 'Upload' },
    { value: 'id', label: 'ID' },
    { value: 'pdf', label: 'PDF' }
  ];

  this.log = (message) => {
    console.log(message); // eslint-disable-line
  };
}

controller.$inject = ['$scope'];

export default angular
  .module('tw.styleguide.demo.forms.upload', [])
  .component('twUploadDocs', {
    bindings: {
      model: '=',
      sizes: '<'
    },
    controller,
    template
  }).name;
