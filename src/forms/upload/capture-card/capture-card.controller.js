class Controller {
  constructor($window, $element, MediaApiService) {
    this.$window = $window;
    this.$element = $element;
    this.showLiveCaptureScreen = false;
    this.cameraFailed = false;
    this.MediaApiService = MediaApiService;
    this.checkMediaUploadSupport = this.checkMediaUploadSupport.bind(this);

    if (this.$window.document.readyState === 'complete') {
      this.checkMediaUploadSupport();
    } else {
      this.$window.addEventListener('load', this.checkMediaUploadSupport);
    }
  }

  $onChanges(changes) {
    if (changes.icon || changes.isLiveCameraUpload) {
      if ((changes.icon || {}).currentValue) {
        this.viewIcon = changes.icon.currentValue;
      } else {
        this.viewIcon = (this.isMediaUpload || (changes.isLiveCameraUpload || {}).currentValue) ? 'camera' : 'upload';
      }
    }
  }

  checkMediaUploadSupport() {
    this.isMediaUpload = this.MediaApiService.hasMediaUploadSupport();

    if (this.isMediaUpload) {
      this.viewIcon = 'camera';
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
    if (this.isMediaUpload) {
      this.MediaApiService.captureFromMedia(this.isLiveCameraUpload).then((file) => {
        this.onFileCapture({ file });
      });
    } else {
      this.showLiveCaptureScreen = true;
      this.cameraFailed = false;
    }
  }

  onButtonCapture(files) {
    const file = files[0];
    this.onFileCapture({ file });
  }
}

Controller.$inject = ['$window', '$element', 'MediaApiService'];

export default Controller;
