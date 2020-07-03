class Controller {
  constructor($element) {
    this.$element = $element;
    this.showLiveCaptureScreen = false;
    this.cameraFailed = false;
  }

  $onChanges(changes) {
    if (changes.icon || changes.isLiveCameraUpload) {
      if ((changes.icon || {}).currentValue) {
        this.viewIcon = changes.icon.currentValue;
      } else {
        this.viewIcon = (changes.isLiveCameraUpload || {}).currentValue ? 'camera' : 'upload';
      }
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
