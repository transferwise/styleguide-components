import screenfull from 'screenfull'; // MIT@https://github.com/sindresorhus/screenfull.js

class CameraCaptureController {
  constructor(
    $element,
    $scope,
    $window,
    $document,
    $q,
    $attrs,
    $log,
    $timeout,
  ) {
    this.$element = $element;
    this.$attrs = $attrs;
    this.$scope = $scope;
    this.$log = $log;
    this.$timeout = $timeout;
    this.$q = $q;
    this.$window = $window;
    this.$document = $document;
  }

  $onInit() {
    this.mode = 'loading'; // 3 states: 'loading' -> 'capture' <-> 'confirm'.

    this.mediaStream = null;

    // Used to programatically size overlay and sensor.
    this.overlaySquareLength = 0;
    this.sensorWidth = 0;

    if (!this.hasGetUserMedia()) {
      // TODO: haoyuan how to handle get user media not being available?
      this.$log.warn('getUserMedia() is not supported by your browser');
    }

    // lock document scroll.
    this.previousBodyOverflowStyle = this.$document[0].body.style.overflow;
    this.$document[0].body.style.overflow = 'hidden'; // lock document scroll.

    this.$window.addEventListener('resize', this.calculateWidths.bind(this));

    // TODO haoyuan : add change event listener to screenful,
    //  existing full screen should quit capture instead of showing non full screen camera
    this.startLiveCamFlow();
  }

  $onDestroy() {
    this.$window.removeEventListener('resize', this.calculateWidths.bind(this));

    // restore document scroll.
    this.$document[0].body.style.overflow = this.previousBodyOverflowStyle;
  }

  // Programatically update overlay/sensor widths, as it's not achievable through CSS.
  calculateWidths() {
    this.$timeout(() => { // helps ensure it's always in a digest cycle.
      const container = this.findContainer();
      const screenWidth = container.clientWidth;
      const screenHeight = container.clientHeight;

      const viewfinder = this.findViewfinder();
      const cameraWidth = viewfinder.videoWidth;
      const cameraHeight = viewfinder.videoHeight;

      if (!cameraWidth || !cameraHeight) {
        this.$timeout(this.calculateWidths.bind(this), 100); // Keep trying until video's ready.
        return;
      }

      const scaleFactor = Math.min(screenWidth / cameraWidth, screenHeight / cameraHeight);

      const sensorWidth = scaleFactor * cameraWidth;
      const sensorHeight = scaleFactor * cameraHeight;

      // Setting width is sufficient, height auto-scales to maintain aspect ratio.
      this.sensorWidth = sensorWidth;

      // 90% because we leave a 5% margin on each side,
      // in order for overlay image to never touch screen edge.
      this.overlaySquareLength = Math.min(sensorWidth, sensorHeight) * 0.9;
    });
  }

  // Acquire and attach video stream to video tag.
  startLiveCamFlow() {
    this.$log.debug('----- Live cam flow start -----');

    // acquire media 1st, switch to fullscreen 2nd, so that permissions get asked before fullscreen.
    this.tryAcquireMediaStream()
      .then((stream) => {
        this.mediaStream = stream;

        return this.tryAcquireFullScreen()
          .catch(this.$log.warn)
          .finally(() => {
            // regardless of whether fullscreen works, continue to link the stream and video.
            this.assignStreamToVideo();
          });
      }).catch((err) => {
        // TODO haoyuan : Should somehow ask user to refresh page to reaquire permission
        this.$log.error(err);
        this.onCancelBtnClick();
      });
  }

  tryAcquireFullScreen() {
    if (screenfull.isEnabled) {
      if (!screenfull.isFullscreen) {
        return screenfull.request(this.container);
      }
      return this.$q.resolve();
    }
    return this.$q.reject('switching to full screen is not enabled.');
  }

  assignStreamToVideo() {
    const video = this.findViewfinder();

    // This is done instead of just reassigning video stream everytime
    // to prevent screen from blinking excessively during switch
    if (video.srcObject !== this.mediaStream) {
      video.srcObject = this.mediaStream;
    }

    video.play().then(this.calculateWidths.bind(this));

    this.mode = 'capture';
  }

  tryAcquireMediaStream() {
    if (!this.mediaStream) {
      if (!this.direction || ['environment', 'user'].indexOf(this.direction.toLowerCase()) === -1) {
        // Assume environment cam by default, if unspecified.
        // TODO: This favours single-camera smartphones, but disfavours desktop webcams.
        // we can import @transferwise/ng-browser-info to infer if we're mobile,
        // and default to user/environment accordingly.
        this.direction = 'environment';
      }

      this.cameraConstraints = {
        video: {
          width: { ideal: 2300 },
          height: { ideal: 2300 },
          facingMode: {
            ideal: this.direction.toLowerCase()
          }
        },
        audio: false
      };
      return this.$window.navigator.mediaDevices.getUserMedia(this.cameraConstraints);
    }

    return this.$q.resolve(this.mediaStream);
  }

  closeVideoStream() {
    if (screenfull.isEnabled) {
      screenfull.exit();
    }
    this.findViewfinder().srcObject = null;
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
  }

  onCancelBtnClick() {
    this.closeVideoStream();
    this.onCancel();
  }

  onCaptureBtnClick() {
    const videoElement = this.findViewfinder();
    const canvasElement = this.findSensor();

    videoElement.pause();
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    canvasElement.getContext('2d').drawImage(videoElement, 0, 0);

    this.mode = 'confirm';
  }

  onRecaptureBtnClick() {
    this.findViewfinder().play();
    this.mode = 'capture';
  }

  onUploadBtnClick() {
    // Support : https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
    this.findSensor().toBlob(createUploadCallback(this), 'image/jpeg', 0.92);
  }

  // TODO: what is this?
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

  hasGetUserMedia() {
    return !!((this.$window.navigator.mediaDevices || {}).getUserMedia);
  }

  findContainer() { return this.$element[0].querySelector('#camera'); }

  findViewfinder() { return this.$element[0].querySelector('#cameraViewfinder'); }

  findSensor() { return this.$element[0].querySelector('#cameraSensor'); }
}

function createUploadCallback($ctrl) {
  return function uploadCallback(blob) {
    if (screenfull.isEnabled) {
      screenfull.exit();
    }
    $ctrl.showVideoPreview = false;
    $ctrl.closeVideoStream();
    $ctrl.$scope.$applyAsync(() => {
      $ctrl.onCapture({ file: blob });
    });
  };
}

CameraCaptureController.$inject = [
  '$element',
  '$scope',
  '$window',
  '$document',
  '$q',
  '$attrs',
  '$log',
  '$timeout',
];

export default CameraCaptureController;
