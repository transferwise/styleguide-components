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
    DroppableService,
    FileValidationService,
  ) {
    this.$timeout = $timeout;
    this.$element = $element;
    this.$attrs = $attrs;
    this.$q = $q;
    this.AsyncFileReader = AsyncFileReader;
    this.AsyncFileSaver = AsyncFileSaver;
    this.AsyncTasksConfig = AsyncTasksConfig;
    this.droppable = DroppableService;
    this.FileValidation = FileValidationService;

    // First isImage updated only at select times, second updated instantly.
    this.isImage = false;
    this.isImage_instant = false;

    this.isProcessing = false;

    this.processingState = null; // null (processing), -1 (failed), 0 (hidden), 1 (success)

    this.showModal = false;

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

    // this.showLiveCaptureScreen = false;
  }

  onManualReupload() {
    const element = this.$element[0];
    const uploadInput = element.querySelector('.tw-droppable-input-reupload');
    const file = uploadInput.files[0];

    this.onFileCapture(file);
  }

  onFileCapture(file) {
    if (this.ngDisabled) {
      return;
    }

    if (!file) {
      throw new Error('Could not retrieve file');
    }

    this.reset();

    this.isImage_instant = this.FileValidation.isImage(file);
    this.fileName = file.name;

    this.isProcessing = true;
    this.processingState = null;

    triggerHandler(this.onStart, file);

    if (!this.FileValidation.isSmallerThanMaxSize(file, this.maxSize)) {
      this.isTooLarge = true;
      asyncFailure({
        status: 413,
        statusText: 'Request Entity Too Large'
      }, null, this);
      return;
    }

    if (this.httpOptions) {
      // Post file now
      this.asyncFileRead(file)
        .then((dataUrl) => {
          this.asyncFileSave(file)
            .then(response => asyncSuccess(response, dataUrl, this))
            .catch((error) => {
              if (error.status === 422) {
                // Note: Only if async action returns 422, do we want to process that error
                asyncFailure(error, dataUrl, this);
              } else {
                // Note: If async action fails, we continue with original flow
                asyncSuccess(null, dataUrl, this);
              }
            });
        })
        .catch(error => asyncFailure(error, null, this));
    } else {
      // Post on form submit
      this.asyncFileRead(file)
        .then(dataUrl => asyncSuccess(null, dataUrl, this))
        .catch(error => asyncFailure(error, null, this));
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
    this.droppable.reset();
    this.isDone = false;
    this.isTooLarge = false;
    this.isWrongType = false;
    if (this.$element[0].querySelectorAll('input')) {
      this.$element[0].querySelectorAll('input').forEach((input) => {
        input.value = null;
      });
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
      this.isDroppable = this.droppable.onDragEnter(event) && !this.isLiveCameraUpload;
      $scope.$apply();
    }, false);

    $element[0].addEventListener('dragover', this.droppable.onDragOver, false);

    $element[0].addEventListener('dragleave', (event) => {
      this.isDroppable = this.droppable.onDragLeave(event);
      $scope.$apply();
    }, false);

    $element[0].addEventListener('drop', (event) => {
      this.onFileCapture(this.droppable.getDroppedFiles(event)[0]);
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

  toggleImageModal() {
    this.showModal = !this.showModal;
  }
}

function triggerHandler(method, argument) {
  if (method && typeof method === 'function') {
    method(argument);
  }
}

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
    $ctrl.firstError = $ctrl.errorReasons[0];
  } else if ($ctrl.httpOptions && error.originalData && error.originalData.message) {
    // Note: error data can manipulated by interceptors, this ensures we still get data needed
    $ctrl.errorMessage = error.originalData.message;
    $ctrl.errorReasons = error.originalData.errors || [];
    $ctrl.firstError = $ctrl.errorReasons[0];
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
  'AsyncTasksConfig',
  'DroppableService',
  'FileValidationService'
];

export default UploadController;
