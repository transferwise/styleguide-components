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

  onCameraCancel() {
    this.showLiveCaptureScreen = false;
  }

  onCameraCapture(file) {
    this.showLiveCaptureScreen = false;
    this.onFileCapture({ file });
  }

  onCameraButtonClick() {
    this.showLiveCaptureScreen = true;
  }

  onButtonCapture(files) {
    const file = files[0];
    this.onFileCapture({ file });
  }
}

DefaultCardController.$inject = ['$element'];

export default DefaultCardController;
