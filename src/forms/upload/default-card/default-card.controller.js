class DefaultCardController {
  constructor($element) {
    this.$element = $element;
    this.showLiveCaptureScreen = false;
  }

  onCameraCaptureCancel() {
    this.showLiveCaptureScreen = false;
  }

  onCameraCaptureConfirm(file) {
    this.showLiveCaptureScreen = false;
    this.onFileCapture({ file });
  }

  onUploadButtonClick() {
    if (this.isLiveCameraUpload) {
      this.showLiveCaptureScreen = true;
    }
  }

  onManualUpload() {
    const element = this.$element[0];
    const uploadInput = element.querySelector('.tw-droppable-input');
    const file = uploadInput.files[0];

    this.onFileCapture({ file });
  }
}

DefaultCardController.$inject = ['$element'];

export default DefaultCardController;
