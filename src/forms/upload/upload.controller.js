import angular from 'angular';

class UploadController {
  constructor(
    $timeout,
    $element,
    $http,
    $scope,
    $transclude,
    $q,
    $attrs
  ) {
    this.$timeout = $timeout;
    this.$element = $element;
    this.$http = $http;
    this.$attrs = $attrs;
    this.$q = $q;

    // First isImage updated only at select times, second updated instantly.
    this.isImage = false;
    this.isImage_instant = false;

    this.dragCounter = 0;
    this.isProcessing = false;

    this.processingState = null;

    this.checkForTranscludedContent($transclude);

    $scope.$watch('$ctrl.icon', () => {
      this.viewIcon = this.icon ? this.icon : 'upload';
    });

    if ((this.processingText || this.successText || this.failureText) &&
        (!this.processingText || !this.successText || !this.failureText)) {
      throw new Error('Supply all of processing, success, and failure text, or supply none.');
    }

    this.addDragHandlers($scope, $element);
  }

  onManualUpload() {
    const element = this.$element[0];
    const uploadInput = element.querySelector('.tw-droppable-input');
    const file = uploadInput.files[0];

    if (!file) {
      throw new Error('Could not retrieve file');
    }

    this.fileDropped(file);
  }

  fileDropped(file) {
    this.reset();

    this.isImage_instant = (file.type && file.type.indexOf('image') > -1);
    this.fileName = file.name;

    this.isProcessing = true;
    this.processingState = null;

    triggerHandler(this.onStart, file);

    if (!isSizeValid(file, this.maxSize)) {
      this.isTooLarge = true;
      this.asyncFailure({
        status: 413,
        statusText: 'Request Entity Too Large'
      });
      return;
    }

    if (!isTypeValid(file, this.accept)) {
      this.isWrongType = true;
      this.asyncFailure({
        status: 415,
        statusText: 'Unsupported Media Type'
      });
      return;
    }

    if (this.httpOptions) {
      // Post file now
      this.$q
        .all([
          this.asyncPost(file),
          this.asyncFileRead(file)
        ])
        .then((response) => {
          asyncSuccess(response[0], this);
          return response;
        })
        .then((response) => {
          showDataImage(response[1], this);
          return response;
        })
        .catch(error => asyncFailure(error, this));
    } else {
      // Post on form submit
      this.asyncFileRead(file)
        .then(response => asyncSuccess(response, this))
        .then(response => showDataImage(response, this))
        .catch(error => asyncFailure(error, this));
    }
  }

  onDragEnter() {
    this.dragCounter++;
    if (this.dragCounter >= 1) {
      this.isDroppable = true;
    }
  }
  onDragLeave() {
    this.dragCounter--;
    if (this.dragCounter <= 0) {
      this.isDroppable = false;
    }
  }

  clear() {
    this.reset();
    triggerHandler(this.onCancel);
  }

  reset() {
    this.isDroppable = false;
    this.isProcessing = false;
    this.isSuccess = false;
    this.isError = false;
    this.dragCounter = 0;
    this.isDone = false;
    this.isTooLarge = false;
    this.isWrongType = false;
    this.$element[0].querySelector('input').value = null;
    this.setNgModel(null);
  }

  setNgModel(value) {
    // If ngModel not assignable, we don't want to error.
    if (typeof this.$attrs.ngModel !== 'undefined') {
      const $ngModel = this.$element.controller('ngModel');
      if (!$ngModel.$setViewValue) {
        return;
      }
      $ngModel.$setViewValue(value);
    }
  }

  asyncPost(file) {
    const formData = new FormData();
    formData.append(this.name, file);

    const $httpOptions = prepareHttpOptions(angular.copy(this.httpOptions));
    return this.$http.post($httpOptions.url, formData, $httpOptions);
  }

  asyncFileRead(file) {
    const reader = new FileReader();
    const deferred = this.$q.defer();

    // When the reader finishes loading resolve the promise
    reader.onload = (event) => {
      deferred.resolve(event.target.result);
    };
    reader.onerror = (event) => {
      deferred.reject(event);
    };

    // Load the file
    reader.readAsDataURL(file);
    return deferred.promise;
  }

  addDragHandlers($scope, $element) {
    $element[0].addEventListener('dragenter', (event) => {
      event.preventDefault();
      this.onDragEnter();
      $scope.$apply();
    }, false);

    $element[0].addEventListener('dragover', (event) => {
      event.preventDefault();
    }, false);

    $element[0].addEventListener('dragleave', (event) => {
      event.preventDefault();
      this.onDragLeave();
      $scope.$apply();
    }, false);

    $element[0].addEventListener('drop', (event) => {
      event.preventDefault();
      this.fileDropped(event.dataTransfer.files[0]);
      $scope.$apply();
    }, false);
  }

  checkForTranscludedContent($transclude) {
    $transclude((clone) => {
      if (clone.length > 1 || clone.text().trim() !== '') {
        this.hasTranscluded = true;
      } else {
        this.hasTranscluded = false;
      }
    });
  }
}

function triggerHandler(method, argument) {
  if (method && typeof method === 'function') {
    method(argument);
  }
}


function prepareHttpOptions($httpOptions) {
  if (!$httpOptions.url) {
    throw new Error('You must supply a URL to post image data asynchronously');
  }
  if (!$httpOptions.headers) {
    $httpOptions.headers = {};
  }
  if ($httpOptions.method) {
    delete $httpOptions.method;
  }

  $httpOptions.headers['Content-Type'] = undefined;
  $httpOptions.transformRequest = angular.identity;

  return $httpOptions;
}

function isSizeValid(file, maxSize) {
  return !(angular.isNumber(maxSize) && file.size > maxSize);
}

// eslint-disable-next-line no-unused-vars
function isTypeValid(file, accept) {
  return true;
  // TODO validate file type
  // this.isWrongType = true;
}

function showDataImage(dataUrl, $ctrl) {
  $ctrl.setNgModel(dataUrl);
  // Only set isImage at this point to avoid trying to show another file type
  $ctrl.isImage = $ctrl.isImage_instant;
  if ($ctrl.isImage) {
    $ctrl.image = dataUrl;
  }
}

function asyncSuccess(response, $ctrl) {
  // Start changing process indicator immediately
  $ctrl.processingState = 1;

  // Wait before updating text
  $ctrl.$timeout(() => {
    $ctrl.isProcessing = false;
    $ctrl.isSuccess = true;
  }, 3000);

  // Allow a small amount of extra time before notifying external handlers
  $ctrl.$timeout(() => {
    triggerHandler($ctrl.onSuccess, response);
    $ctrl.isDone = true;
  }, 3800);

  return response;
}

function asyncFailure(error, $ctrl) {
  // Start changing process indicator immediately
  $ctrl.processingState = -1;

  // Wait before updating text
  $ctrl.$timeout(() => {
    $ctrl.isProcessing = false;
    $ctrl.isError = true;
  }, 3000);

  // Allow a small amount of extra time before notifying external handlers
  $ctrl.$timeout(() => {
    triggerHandler($ctrl.onFailure, error);
    $ctrl.isDone = true;
  }, 4100); // 3500); TODO for some reason more time is needed

  return error;
}

UploadController.$inject = [
  '$timeout',
  '$element',
  '$http',
  '$scope',
  '$transclude',
  '$q',
  '$attrs'
];

export default UploadController;
