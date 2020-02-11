class DefaultCardController {
  constructor($element) {
    this.$element = $element;
    this.showLiveCaptureScreen = false;
  }

  $onChanges(changes) {
    if (changes.icon) {
      this.viewIcon = changes.icon.currentValue ? changes.icon.currentValue : 'upload';
    }
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
