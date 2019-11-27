import angular from 'angular';

class UploadController {
  constructor(
    $timeout,
    $element,
    $scope,
    $transclude,
    $q,
    $attrs,
    AsyncFileReader,
    AsyncFileSaver,
    AsyncTasksConfig,
  ) {
    this.$timeout = $timeout;
    this.$element = $element;
    this.$attrs = $attrs;
    this.$q = $q;
    this.AsyncFileReader = AsyncFileReader;
    this.AsyncFileSaver = AsyncFileSaver;
    this.AsyncTasksConfig = AsyncTasksConfig;

    // First isImage updated only at select times, second updated instantly.
    this.isImage = false;
    this.isImage_instant = false;

    this.dragCounter = 0;
    this.isProcessing = false;

    this.processingState = null;

    this.checkForTranscludedContent($transclude);

    this.isLiveCameraUpload = this.source && this.source === 'CAMERA_ONLY';
    $scope.$watch('$ctrl.source', () => {
      this.isLiveCameraUpload = this.source && this.source === 'CAMERA_ONLY';
    });

    $scope.$watch('$ctrl.icon', () => {
      this.viewIcon = this.icon ? this.icon : 'upload';
    });

    if ((this.processingText || this.successText || this.failureText)
        && (!this.processingText || !this.successText || !this.failureText)) {
      throw new Error('Supply all of processing, success, and failure text, or supply none.');
    }

    this.addDragHandlers($scope, $element);

    this.showLiveCaptureScreen = false;
  }

  onUploadButtonClick() {
    if (this.isLiveCameraUpload) {
      this.showLiveCaptureScreen = true;
    }
  }

  onCameraCaptureCancel() {
    this.showLiveCaptureScreen = false;
  }

  onCameraCaptureConfirm(file) {
    this.onFileConfirmation(file);
    this.showLiveCaptureScreen = false;
  }

  // Function binding for file upload by input tag
  onManualUpload() {
    const element = this.$element[0];
    const uploadInput = element.querySelector('.tw-droppable-input');
    const file = uploadInput.files[0];

    this.onFileConfirmation(file);
  }

  // Function binding for file upload by live
  onFileConfirmation(file) {
    if (!file) {
      throw new Error('Could not retrieve file');
    }

    this.fileDropped(file);
  }

  fileDropped(file) {
    if (this.ngDisabled) {
      return;
    }

    this.reset();

    this.isImage_instant = (file.type && file.type.indexOf('image') > -1);
    this.fileName = file.name;

    this.isProcessing = true;
    this.processingState = null;

    triggerHandler(this.onStart, file);

    if (!isSizeValid(file, this.maxSize)) {
      this.isTooLarge = true;
      asyncFailure({
        status: 413,
        statusText: 'Request Entity Too Large'
      }, null, this);
      return;
    }

    /*
    if (!isTypeValid(file, this.accept)) {
      this.isWrongType = true;
      asyncFailure({
        status: 415,
        statusText: 'Unsupported Media Type'
      }, this);
      return;
    }
    */

    /*
     * NOTE: We temporarily want to ignore httpOptions until a full solution is implemented
     * Currently httpOptions.url is a relative path, but needs to know its baseUrl
     * As this call will return a 404, stopping a user from continuing the flow.
    */

    // if (this.httpOptions) {
    //   // Post file now
    //   this.asyncFileRead(file)
    //     .then((dataUrl) => {
    //       this.asyncFileSave(file)
    //         .then(response => asyncSuccess(response, dataUrl, this))
    //         .catch(error => asyncFailure(error, dataUrl, this));
    //     })
    //     .catch(error => asyncFailure(error, null, this));
    // } else {
    // Post on form submit
      this.asyncFileRead(file)
        .then(response => asyncSuccess(null, response, this))
        .catch(error => asyncFailure(error, this));
    // }
  }

  onDragEnter() {
    this.dragCounter++;
    if (this.dragCounter >= 1 && !this.ngDisabled) {
      // do not enable dropping for camera only upload mode
      this.isDroppable = !this.isLiveCameraUpload;
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
    if (this.$element[0].querySelector('input')) {
      this.$element[0].querySelector('input').value = null;
    }
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

  asyncFileSave(file) {
    const httpOptions = this.AsyncTasksConfig.extendHttpOptions(this.httpOptions);
    return this.AsyncFileSaver.save(this.name, file, httpOptions);
  }

  asyncFileRead(file) {
    return this.AsyncFileReader.read(file);
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

function isSizeValid(file, maxSize) {
  return !(angular.isNumber(maxSize) && file.size > maxSize);
}

/*
// TODO validate file type
function isTypeValid(file, accept) {
  return true;
  // this.isWrongType = true;
}
*/

function showDataImage(dataUrl, $ctrl) {
  // Only set isImage at this point to avoid trying to show another file type
  $ctrl.isImage = $ctrl.isImage_instant;
  if ($ctrl.isImage) {
    $ctrl.image = dataUrl;
  }
}

function asyncSuccess(apiResponse, dataUrl, $ctrl) {
  // Start changing process indicator immediately
  $ctrl.processingState = 1;

  if ($ctrl.httpOptions
      && $ctrl.httpOptions.idProperty
      && apiResponse
      && apiResponse.data
      && apiResponse.data[$ctrl.httpOptions.idProperty]) {
    const imageId = apiResponse.data[$ctrl.httpOptions.idProperty];
    $ctrl.setNgModel(imageId);
    $ctrl.successMessage = apiResponse.data.message;
    $ctrl.successDetails = apiResponse.data.details ? apiResponse.data.details[0] : null;
  } else {
    $ctrl.setNgModel(dataUrl);
  }

  showDataImage(dataUrl, $ctrl);

  if ($ctrl.ngChange) {
    $ctrl.ngChange();
  }

  // Wait before updating text
  $ctrl.$timeout(() => {
    $ctrl.isProcessing = false;
    $ctrl.isSuccess = true;
  }, 3000);

  // Allow a small amount of extra time before notifying external handlers
  $ctrl.$timeout(() => {
    triggerHandler($ctrl.onSuccess, dataUrl);
    $ctrl.isDone = true;
  }, 3800);

  return dataUrl;
}

function asyncFailure(error, dataUrl, $ctrl) {
  // Start changing process indicator immediately
  $ctrl.processingState = -1;

  if ($ctrl.httpOptions && error.data && error.data.message) {
    $ctrl.errorMessage = error.data.message;
    $ctrl.errorReasons = error.data.errors || [];
    $ctrl.topError = $ctrl.errorReasons[0];
  }

  if (dataUrl) {
    showDataImage(dataUrl, $ctrl);
  }

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
  '$scope',
  '$transclude',
  '$q',
  '$attrs',
  'AsyncFileReader',
  'AsyncFileSaver',
  'AsyncTasksConfig'
];

export default UploadController;
