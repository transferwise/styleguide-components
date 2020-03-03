class UploadController {
  constructor(
    $element,
    $scope,
    $attrs,
    FileValidationService,
  ) {
    this.$element = $element;
    this.$attrs = $attrs;
    this.FileValidationService = FileValidationService;

    this.isProcessing = false;
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

  isDropEligible() {
    return this.source !== 'CAMERA_ONLY';
  }

  onDragEnter() {
    this.isDroppable = this.isDropEligible();
  }

  onDragLeave() {
    this.isDroppable = false;
  }

  onDrop(files) {
    this.isDroppable = false;
    this.onFileCapture(files[0]);
  }

  onProcessStart(file) {
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

    this.onSuccess(file, response);
  }

  onProcessFailure(error) {
    if (this.onFailure) {
      this.onFailure({ error });
    }
  }
}

UploadController.$inject = [
  '$element',
  '$scope',
  '$attrs',
  'FileValidationService'
];

export default UploadController;
