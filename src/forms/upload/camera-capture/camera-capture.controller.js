import screenfull from 'screenfull'; // MIT@https://github.com/sindresorhus/screenfull.js

class CameraCaptureController {
  constructor(
    $element,
    $scope,
    $window,
    $q,
    $attrs,
    $log,
    CameraCaptureScreenHandler
  ) {
    this.$element = $element;
    this.$attrs = $attrs;
    this.$scope = $scope;
    this.$log = $log;
    this.$q = $q;
    this.$window = $window;
    this.CameraCaptureScreenHandler = CameraCaptureScreenHandler;
  }

  $onInit() {
    // Video preview control
    this.showVideoPreview = false;
    this.showVideoInPreview = true;
    this.showCaptureInPreview = false;
    this.mediaStream = null;

    // Live cam flow button control
    this.captureButtonDisabled = true;

    // Dimension/resolution controll
    this.screenHeight = 0.0;
    this.screenWidth = 0.0;
    this.videoResHeight = 0.0;
    this.videoResWidth = 0.0;

    this.overlayWidth = 0;
    this.overlayHeight = 0;
    this.overlayXOffset = 0;
    this.overlayYOffset = 0;
    this.displayCanvasXOffset = 0; // in px
    this.displayCanvasYOffset = 0; // in px
    this.videoXOffset = 0; // video x offset in percentage
    this.videoHeight = 100; // video height in percentage
    this.videoWidth = 100; // video width in percentage

    if (!this.hasGetUserMedia()) {
      // TODO: haoyuan how to handle get user media not being available?
      this.$log.warn('getUserMedia() is not supported by your browser');
    }

    this.overlayElement = this.$element[0].querySelector('#video-preview #overlay');
    this.displayCanvas = this.$element[0].querySelector('#video-preview #display-canvas');
    this.uploadCanvas = this.$element[0].querySelector('#video-preview #upload-canvas');
    this.videoPreviewElement = this.$element[0].querySelector('#video-preview');
    this.video = this.$element[0].querySelector('#video-preview #video');
    this.video.addEventListener('play', createVideoPlayCallback(this));

    this.$window.addEventListener('orientationchange', createOrientationChangeCallback(this), false);

    // TODO haoyuan : add change event listener to screenful,
    //  existing full screen should quit capture instead of showing non full screen camera
    if (!this.testMode || this.testMode.toLowerCase() !== 'true') {
      this.$window.navigator.mediaDevices.enumerateDevices().then((devices) => {
        // If device only has one camera, assume it is selfie cam
        const numVideoDevices = devices.filter(device => device.kind === 'videoinput').length;
        this.$log.debug(`Found ${numVideoDevices} video devices.`);
        if (numVideoDevices === 1 || !this.direction) {
          this.direction = 'user';
        } else {
          this.direction = this.direction.toLowerCase();
        }

        // Flip video along x axis so selfie video becomes a mirror
        if (this.direction === 'user') {
          this.$log.debug('Changed user video to mirror');
          this.video.classList.add('display-mirror');
          this.isVideoHorizontallyFlipped = true;
        }

        this.cameraConstraints = {
          video: {
            width: {
              min: 640,
              ideal: 1280,
              max: 1280
            },
            facingMode: {
              ideal: this.direction
            }
          },
          audio: false
        };
        this.startLiveCamFlow();
      });
    }
  }

  // Acquire and attach video stream to video tag.
  startLiveCamFlow() {
    this.$log.debug('----- Live cam flow start -----');
    this.captureButtonDisabled = true;
    this.overlayLoaded = false;
    this.videoPlaying = false;

    // Display video component in full screen
    // This part of code cannot be in callback due to browser security requirement
    this.video.pause();

    this.tryAcquireFullScreen()
      .then(() => {
        this.$log.debug('Acquired full screen.');
      })
      .catch(() => {
        this.$log.warn('Failed to acquire full screen.');
      })
      .finally(() => {
        // After trying to acquire full screen, resolve video stream
        this.setScreenDimensions();
        if (this.overlayElement.naturalHeight === 0 || this.overlayElement.naturalWidth === 0) {
          this.$log.debug('Overlay has not loaded after full screen is acquired');
          this.overlayElement.addEventListener('load', createOverlayOnLoadCallback(this));
        } else {
          this.$log.debug('Overlay has loaded before full screen is acquired');
          createOverlayOnLoadCallback(this).call();
        }
        this.tryAcquireMediaStream()
          .then((stream) => {
            this.onVideoStreamAcquisition(stream);
          })
          .catch((err) => {
            // TODO haoyuan : Should somehow ask user to refresh page to reaquire permission
            this.$log.error(err);
            this.onCancelBtnClick();
          });
      });
  }

  tryAcquireFullScreen() {
    if (screenfull.enabled) {
      if (!screenfull.isFullscreen) {
        return screenfull.request(this.videoPreviewElement);
      }
      return this.$q.resolve();
    }
    return this.$q.reject();
  }

  onVideoStreamAcquisition(stream) {
    this.mediaStream = stream;

    /*
     This is done instead of just reassigning video stream everytime
     to prevent screen from blinking excessively during switch
      */
    if (this.video.srcObject !== this.mediaStream) {
      this.video.srcObject = this.mediaStream;
    }

    // Toggle controls
    this.showVideoPreview = true;
    this.showVideoInPreview = true;
    this.showCaptureInPreview = false;

    this.video.play();
  }

  tryAcquireMediaStream() {
    if (!this.mediaStream) {
      return navigator.mediaDevices.getUserMedia(this.cameraConstraints);
    }
    return this.$q.resolve(this.mediaStream);
  }

  setScreenDimensions() {
    // TODO haoyuan : firefox is recognizing pixel's btm bar
    this.$log.debug(`screen : ${this.$window.screen.height} x ${this.$window.screen.width}`);
    this.$log.debug(`screen available : ${this.$window.screen.availHeight} x ${this.$window.screen.availWidth}`);
    this.$log.debug(`screen inner : ${this.$window.innerHeight} x ${this.$window.innerWidth}`);
    this.screenHeight = this.$window.innerHeight;
    this.screenWidth = this.$window.innerWidth;
    this.$log.debug(`**screen resolved** : ${this.screenHeight} x ${this.screenWidth}`);
  }

  closeVideoStream() {
    if (screenfull.enabled) {
      screenfull.exit();
    }
    this.video.srcObject = null;
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
    this.showVideoPreview = false;
    this.captureButtonDisabled = true;
  }

  onCancelBtnClick() {
    this.closeVideoStream();
    this.onCancel();
  }

  onCaptureBtnClickTest() {
    if (this.video.classList.contains('display-mirror')) {
      this.video.classList.remove('display-mirror');
    } else {
      this.video.classList.add('display-mirror');
    }
  }

  onCaptureBtnClick() {
    const {
      height, width,
      yOffset, xOffset,
      paintHeight, paintWidth
    } = this.CameraCaptureScreenHandler.getCanvasSpecifications(
      this.videoHeight,
      this.videoWidth,
      this.screenHeight,
      this.screenWidth,
      this.videoResHeight,
      this.videoResWidth
    );
    this.displayCanvasYOffset = yOffset;
    this.displayCanvasXOffset = xOffset;
    this.displayCanvas.width = width;
    this.displayCanvas.height = height;
    /* Confusing draw image method for video
     * Despite video dimension can be more than 100%, the video never extends beyond the screen
     * Instead, its resolution gets truncated to fit the screen perfectly
     * Thus drawing always starts from (0, 0)
     */
    const ctx = this.displayCanvas.getContext('2d');
    ctx.resetTransform();
    ctx.drawImage(this.video, 0, 0, paintWidth, paintHeight, 0, 0, width, height);
    this.showCaptureInPreview = true;
    this.showVideoInPreview = false;
  }

  onRecaptureBtnClick() {
    this.startLiveCamFlow();
  }

  onUploadBtnClick() {
    this.uploadCanvas.width = this.displayCanvas.width;
    this.uploadCanvas.height = this.displayCanvas.height;
    this.uploadCanvas.getContext('2d').drawImage(this.displayCanvas, 0, 0, this.displayCanvas.width, this.displayCanvas.height);
    // Support : https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
    this.uploadCanvas.toBlob(createUploadCallback(this), 'image/png', 1.0);
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

  hasGetUserMedia() {
    return !!(this.$window.navigator.mediaDevices
      && this.$window.navigator.mediaDevices.getUserMedia);
  }
}

/**
 * Need to use this pattern here because
 * we only get height and width of video after it is playing
 */
function createOverlayOnLoadCallback($ctrl) {
  return function overlayOnLoadCallback() {
    if (!$ctrl.overlay) {
      return;
    }
    const {
      height: overlayHeight,
      width: overlayWidth,
      yOffset: overlayYOffset,
      xOffset: overlayXOffset
    } = $ctrl.CameraCaptureScreenHandler
      .getOverlaySpecifications(
        $ctrl.screenHeight, $ctrl.screenWidth,
        $ctrl.overlayElement.naturalHeight, $ctrl.overlayElement.naturalWidth
      );

    $ctrl.overlayYOffset = overlayYOffset;
    $ctrl.overlayXOffset = overlayXOffset;
    $ctrl.overlayHeight = overlayHeight;
    $ctrl.overlayWidth = overlayWidth;

    $ctrl.overlayLoaded = true;
  };
}

/**
 * Need to use this pattern here because
 * we only get height and width of video after it is playing
 */
function createVideoPlayCallback($ctrl) {
  return function videoPlayCallback() {
    $ctrl.captureButtonDisabled = false;
    if (!this) {
      return;
    }
    if (this.videoHeight === 0 || this.videoWidth === 0) {
      // Video is not playing, listen for it to start
      this.addEventListener('playing', function videoPlayingCallback() {
        assignVideoDimensions(this);
        $ctrl.videoPlaying = true;
        this.removeEventListener('playing', videoPlayingCallback);
      });
    } else {
      $ctrl.videoPlaying = true;
      assignVideoDimensions(this);
    }

    function assignVideoDimensions(video) {
      $ctrl.videoResHeight = video.videoHeight;
      $ctrl.videoResWidth = video.videoWidth;
      $ctrl.$log.debug(`playing updated video : ${$ctrl.videoResHeight} x ${$ctrl.videoResWidth}`);
      const { videoHeightInPercentage, videoWidthInPercentage } = $ctrl.CameraCaptureScreenHandler
        .getVideoSpecifications(
          $ctrl.screenHeight, $ctrl.screenWidth,
          $ctrl.videoResHeight, $ctrl.videoResWidth
        );
      /**
       * When video width is more than screen width
       * natural video will overflow to right of screen
       * As selfie cam is flipped, the overflown part will be flipped onto the screen on the left
       * When drawing canvas from video, video transformation is not considered
       * Thus by naturally drawing the screen, canvas image will mismatch with video
       * We needed to apply an offset here
       * to make sure overflown part in unflipped video is still overflown in flipped video
       */
      if ($ctrl.isVideoHorizontallyFlipped && videoWidthInPercentage > 100.0) {
        $ctrl.videoXOffset = 100 - videoWidthInPercentage;
      }
      $ctrl.videoHeight = videoHeightInPercentage;
      $ctrl.videoWidth = videoWidthInPercentage;
      $ctrl.$scope.$apply();
    }
  };
}

// Resize listener listens to end of orientation change event
function createOrientationChangeCallback($ctrl) {
  // TODO haoyuan : should we cancel the capture if screen rotates?
  return function orientationChangeCallback() {
    const onOrientationChange = function onOrientationChange() {
      if ($ctrl.showVideoPreview) {
        $ctrl.$log.debug('Orientation change detected, recompute screen');
        $ctrl.startLiveCamFlow();
      }
      $ctrl.$window.removeEventListener('resize', onOrientationChange);
    };
    $ctrl.$window.addEventListener('resize', onOrientationChange);
  };
}

function createUploadCallback($ctrl) {
  return function uploadCallback(blob) {
    if (screenfull.enabled) {
      screenfull.exit();
    }
    $ctrl.showVideoPreview = false;
    $ctrl.closeVideoStream();
    $ctrl.onConfirm({ file: blob });
  };
}

CameraCaptureController.$inject = [
  '$element',
  '$scope',
  '$window',
  '$q',
  '$attrs',
  '$log',
  'CameraCaptureScreenHandler'
];

export default CameraCaptureController;
