class Controller {
  constructor($element) {
    this.$element = $element;
    this.showLiveCaptureScreen = false;
    this.cameraFailed = false;
  }

  $onChanges(changes) {
    if (changes.icon) {
      this.viewIcon = changes.icon.currentValue ? changes.icon.currentValue : 'upload';
    }
  }

  onCameraCancel() {
    this.showLiveCaptureScreen = false;
  }

  onCameraError() {
    this.showLiveCaptureScreen = false;
    this.cameraFailed = true;
  }

  onCameraCapture(file) {
    this.showLiveCaptureScreen = false;
    this.onFileCapture({ file });
  }

  onCameraButtonClick() {
    this.showLiveCaptureScreen = true;
    this.cameraFailed = false;
  }

  onButtonCapture(files) {
    const file = files[0];
    this.onFileCapture({ file });
  }
}

Controller.$inject = ['$element'];

export default Controller;
