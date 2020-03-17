import angular from 'angular';
import template from './multi-upload.demo.html';

// Mock the file saver for the purposes of the demo.
class AsyncFileSaverMock {
  constructor($q) {
    this.$q = $q;
  }

  save(fieldName, file, httpOptions) {
    if (httpOptions.url === '404') {
      return this.$q.reject({
        data: {}
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
  .module('tw.styleguide.forms.upload.multi')
  .service('AsyncFileSaver', AsyncFileSaverMock);

function controller($scope) {
  const $ctrl = this;
  this.$scope = $scope;

  this.onStart = () => {
    this.log('File upload starting');
  };

  this.onFinish = () => {
    this.log('File upload finished');
  };

  this.label = 'Your files';
  $ctrl.processingText = 'Uploading...';
  $ctrl.droppingText = 'Drag files to upload';
  $ctrl.successText = 'Upload complete!';
  $ctrl.failureText = 'Upload failed!';
  $ctrl.addMoreButtonText = 'Add more files';

  $ctrl.onFailure = (error) => {
    $ctrl.failureText = error.data.message || $ctrl.failureText;
  };

  this.makeFancy = () => {};

  this.acceptOptions = [
    { value: '.png', label: 'PNG (.png)' },
    { value: '.jpg,.jpeg', label: 'JPG (.jpg,.jpeg)' },
    { value: 'image/*', label: 'Images (image/*)' },
    { value: 'video/*', label: 'Video (video/*)' },
    { value: 'audio/*', label: 'Audio (audio/*)' }
  ];

  this.log = (message) => {
    console.log(message); // eslint-disable-line
  };
}

controller.$inject = ['$scope'];

export default angular
  .module('tw.styleguide.demo.forms.multi.upload', [])
  .component('twMultiUploadDocs', {
    bindings: {
      model: '=',
      ngModel: '=',
      sizes: '<'
    },
    controller,
    template
  }).name;
