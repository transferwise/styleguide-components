class UploadController {
  constructor(
    $element,
    $scope,
    $attrs,
    DroppableService,
    FileValidationService,
  ) {
    this.$element = $element;
    this.$attrs = $attrs;
    this.droppable = DroppableService;
    this.FileValidationService = FileValidationService;

    this.isProcessing = false;
    this.showModal = false;

    if ((this.processingText || this.successText || this.failureText)
        && (!this.processingText || !this.successText || !this.failureText)) {
      throw new Error('Supply all of processing, success, and failure text, or supply none.');
    }

    this.addDragHandlers($scope, $element);
  }

  $onChanges(changes) {
    if (changes.source) {
      this.isLiveCameraUpload = changes.source.currentValue === 'CAMERA_ONLY';
    }
  }

  onFileCapture(file) {
    if (this.ngDisabled) {
      return;
    }

    if (!file) {
      throw new Error('Could not retrieve file');
    }

    this.file = file;
  }

  reset() {
    this.isProcessing = false;
    this.isDone = false;
    this.isDroppable = false;

    this.droppable.reset();

    this.clearHtmlInput();
    this.setNgModel(null);

    if (this.onCancel) {
      this.onCancel();
    }
  }

  clearHtmlInput() {
    if (this.$element[0].querySelectorAll('input')) {
      this.$element[0].querySelectorAll('input').forEach((input) => {
        input.value = null;
      });
    }
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

  addDragHandlers($scope, $element) {
    // Get native element
    const element = $element[0];

    element.addEventListener('dragenter', (event) => {
      this.isDroppable = this.droppable.onDragEnter(event) && !this.isLiveCameraUpload;
      $scope.$apply();
    }, false);

    element.addEventListener('dragover', this.droppable.onDragOver, false);

    element.addEventListener('dragleave', (event) => {
      this.isDroppable = this.droppable.onDragLeave(event);
      $scope.$apply();
    }, false);

    element.addEventListener('drop', (event) => {
      this.onFileCapture(this.droppable.getDroppedFiles(event)[0]);
      $scope.$apply();
    }, false);
  }

  toggleImageModal() {
    this.showModal = !this.showModal;
  }

  onProcessStart(file) {
    this.isDroppable = false;
    this.isDone = false;
    this.isProcessing = true;

    if (this.onStart) {
      this.onStart({ file });
    }
  }

  onProcessSuccess(file, dataUrl, id, response) {
    this.isDone = true;
    this.isProcessing = false;
    this.dataUrl = dataUrl;
    this.isImage = this.FileValidationService.isImage(file);

    if (this.httpOptions && id) {
      this.setNgModel(id);
    } else {
      this.setNgModel(dataUrl);
    }

    this.onSuccess({ file, response });
  }

  onProcessFailure(error) {
    console.log(error); // eslint-disable-line

    if (this.onFailure) {
      this.onFailure({ error });
    }
  }
}

UploadController.$inject = [
  '$element',
  '$scope',
  '$attrs',
  'DroppableService',
  'FileValidationService'
];

export default UploadController;
