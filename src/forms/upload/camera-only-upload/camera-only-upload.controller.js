import screenfull from 'screenfull'; // MIT@https://github.com/sindresorhus/screenfull.js

class CameraOnlyUploadController {
  constructor(
    $element,
    $scope,
    $q,
    $attrs
  ) {
    this.$element = $element;
    this.$attrs = $attrs;
    this.$scope = $scope;
    this.$q = $q;

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

    this.videoHeight = 100; // video height in percentage

    if (!hasGetUserMedia()) {
      // TODO: haoyuan how to handle get user media not being available?
      console.warn('getUserMedia() is not supported by your browser');
    }

    this.$scope.$watch('$ctrl.showCaptureScreen', (newValue, oldValue) => {
      if (newValue !== oldValue && newValue) {
        this.onLiveCamFlowStart();
      }
    });

    window.addEventListener('orientationchange', createOrientationChangeCallback(this), false);
    const video = this.$element[0].querySelector('#video-preview #video');
    video.addEventListener('play', createVideoPlayCallback(this));

    // TODO haoyuan : add change event listener to screenful,
    //  existing full screen should quit capture instead of showing non full screen camera
  }

  // Acquire and attach video stream to video tag.
  onLiveCamFlowStart() {
    console.log('----- Live cam flow start -----');
    this.captureButtonDisabled = true;

    const constraints = {
      video: {
        width: {
          min: 640,
          ideal: 1280,
          max: 1280
        },
        facingMode: {
          ideal: this.cameraFaceMode
        }
      },
      audio: false
    };

    // Display video component in full screen
    // This part of code cannot be in callback due to browser security requirement
    const videoPreviewElement = this.$element[0].querySelector('#video-preview');
    const video = this.$element[0].querySelector('#video-preview #video');
    video.pause();

    let isFullScreen = true;

    // Class method
    function tryAcquireFullScreen($ctrl) {
      if (screenfull.enabled) {
        if (!screenfull.isFullscreen) {
          return screenfull.request(videoPreviewElement);
        }
        return $ctrl.$q.resolve();
      }
      return $ctrl.$q.reject();
    }

    tryAcquireFullScreen(this)
      .then(() => {
        isFullScreen = true;
        console.log('Acquired full screen.');
      })
      .catch(() => {
        isFullScreen = false;
        console.error('Failed to acquire full screen.');
      })
      .finally(() => {
        // After trying to acquire full screen, resolve video stream
        function resolveScreenDimensions($ctrl) {
          // TODO haoyuan : firefox is recognizing pixel's btm bar
          console.log(`screen : ${window.screen.height} x ${window.screen.width}`);
          console.log(`screen available : ${window.screen.availHeight} x ${window.screen.availWidth}`);
          console.log(`screen inner : ${window.innerHeight} x ${window.innerWidth}`);

          $ctrl.screenHeight = window.innerHeight;
          $ctrl.screenWidth = window.innerWidth;
        }

        resolveScreenDimensions(this, isFullScreen);
        console.log(`**screen resolved** : ${this.screenHeight} x ${this.screenWidth}`);

        function postVideoStreamAcquisition($ctrl, stream) {
          $ctrl.mediaStream = stream;

          /*
           This is done instead of just reassigning video stream everytime
           to prevent screen from blinking excessively during switch
            */
          if (video.srcObject !== $ctrl.mediaStream) {
            video.srcObject = $ctrl.mediaStream;
          }

          // Toggle controls
          $ctrl.showVideoPreview = true;
          $ctrl.showVideoInPreview = true;
          $ctrl.showCaptureInPreview = false;

          video.play();
        }

        function tryAcquireMediaStream($ctrl) {
          if (!$ctrl.mediaStream) {
            return navigator.mediaDevices.getUserMedia(constraints);
          }
          return $ctrl.$q.resolve($ctrl.mediaStream);
        }

        tryAcquireMediaStream(this)
          .then((stream) => {
            postVideoStreamAcquisition(this, stream);
            resolveScreenDimensions(this, isFullScreen);
            console.log(`**screen resolved** : ${this.screenHeight} x ${this.screenWidth}`);
          })
          .catch((err) => {
            console.error(err);
          });
      });
  }

  closeVideoStream() {
    this.mediaStream.getTracks().forEach(track => track.stop());
    this.mediaStream = null;
    this.captureButtonDisabled = true;
    this.showCaptureScreen = false;
  }

  onCancelBtnClick() {
    if (screenfull.enabled) {
      screenfull.exit();
    }
    this.showVideoPreview = false;
    this.closeVideoStream();
    const video = this.$element[0].querySelector('#video-preview #video');
    video.srcObject = null;
  }

  onCaptureBtnClick() {
    const canvas = this.$element[0].querySelector('#video-preview #display-canvas');
    const video = this.$element[0].querySelector('#video-preview #video');
    const resolved = resolveCanvasDimensions(
      this,
      this.screenHeight,
      this.screenWidth,
      this.videoResHeight,
      this.videoResWidth
    );
    canvas.style.top = `${resolved.yOffset}px`;
    canvas.style.left = `${resolved.xOffset}px`;
    canvas.width = resolved.width;
    canvas.height = resolved.height;
    canvas.getContext('2d').drawImage(video, 0, 0, resolved.paintWidth, resolved.paintHeight, 0, 0, resolved.width, resolved.height);
    this.showCaptureInPreview = true;
    this.showVideoInPreview = false;
  }

  onRecaptureBtnClick() {
    this.onLiveCamFlowStart();
  }

  onUploadBtnClick() {
    const displayCanvas = this.$element[0].querySelector('#video-preview #display-canvas');
    const uploadCanvas = this.$element[0].querySelector('#video-preview #upload-canvas');
    const resolved = resolveCanvasDimensions(
      this,
      this.screenHeight,
      this.screenWidth,
      this.videoResHeight,
      this.videoResWidth
    );
    uploadCanvas.width = resolved.paintWidth;
    uploadCanvas.height = resolved.paintHeight;
    uploadCanvas.getContext('2d').drawImage(displayCanvas, 0, 0, resolved.paintWidth, resolved.paintHeight);
    // Support : https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
    uploadCanvas.toBlob(createUploadCallback(this), 'image/png', 1.0);
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
}

// TODO haoyuan : move this inside class?
function createVideoPlayCallback($ctrl) {
  return function videoPlayCallback() {
    function resolveVideoDimensions() {
      // Handle long portrait camera in a portrait screen leaving ugly side margins
      if ($ctrl.screenHeight > $ctrl.screenWidth
        && $ctrl.videoResHeight / $ctrl.videoResWidth > $ctrl.screenHeight / $ctrl.screenWidth) {
        console.log('Resolve video for narrow screen case');
        const videoResRatio = $ctrl.videoResHeight / $ctrl.videoResWidth;
        const screenResRatio = $ctrl.screenHeight / $ctrl.screenWidth;
        $ctrl.videoHeight = parseInt((videoResRatio / screenResRatio) * 100, 10);
      } else {
        $ctrl.videoHeight = 100;
      }
    }

    $ctrl.captureButtonDisabled = false;
    if (this.videoHeight === 0 || this.videoWidth === 0) {
      this.addEventListener('playing', function videoPlayingCallback() {
        if (this) {
          $ctrl.videoResHeight = this.videoHeight;
          $ctrl.videoResWidth = this.videoWidth;
          console.log(`playing updated video : ${$ctrl.videoResHeight} x ${$ctrl.videoResWidth}`);
          resolveVideoDimensions();
          this.removeEventListener('playing', videoPlayingCallback);
        }
      });
    } else {
      $ctrl.videoResHeight = this.videoHeight;
      $ctrl.videoResWidth = this.videoWidth;
      console.log(`play updated video : ${$ctrl.videoResHeight} x ${$ctrl.videoResWidth}`);
      resolveVideoDimensions();
    }
  };
}

// Resize listener listens to end of orientation change event
function createOrientationChangeCallback($ctrl) {
  // TODO haoyuan : should we cancel the capture if screen rotates?
  return function orientationChangeCallback() {
    const afterOrientationChange = function () {
      if ($ctrl.showVideoPreview) {
        console.log('Orientation change detected, recompute screen');
        $ctrl.onLiveCamFlowStart();
      }
      window.removeEventListener('resize', afterOrientationChange);
    };
    window.addEventListener('resize', afterOrientationChange);
  };
}

// TODO haoyuan : Add custom file upload handler here
function createUploadCallback($ctrl) {
  return function uploadCallback(blob) {
    console.log('blob created');
    console.log(blob);
    if (screenfull.enabled) {
      screenfull.exit();
    }
    $ctrl.showVideoPreview = false;
    $ctrl.onUserCaptureConfirmation({ file: blob });
    $ctrl.closeVideoStream();
  };
}

function hasGetUserMedia() {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

/**
 * Resolve canvas x, y offset from screen edge and canvas size
 * Function is based off the fact that video stream will expand
 * to fill one dimension of the screen and be centered wrt the other dimension
 * We need to know which dimension it is
 */
function resolveCanvasDimensions($ctrl, screenHeight, screenWidth, videoResHeight, videoResWidth) {
  console.log('----- Recomputing canvas -----');
  console.log(`screen width : ${screenWidth}`);
  console.log(`screen height : ${screenHeight}`);
  console.log(`video res width : ${videoResWidth}`);
  console.log(`video res height : ${videoResHeight}`);

  let canvasDimensions = null;

  // handle layout where a landscape screen has a long and narrower camera window in it
  if (screenHeight > screenWidth && videoResHeight / videoResWidth > screenHeight / screenWidth) {
    console.log('special case');
    canvasDimensions = resolveNarrowCanvas(
      $ctrl,
      screenHeight,
      screenWidth,
      videoResHeight,
      videoResWidth
    );
  } else {
    canvasDimensions = resolveNormalCanvas(
      screenHeight,
      screenWidth,
      videoResHeight,
      videoResWidth
    );
  }

  console.log(`canvas width : ${canvasDimensions.width}`);
  console.log(`canvas height : ${canvasDimensions.height}`);
  console.log(`canvas x-offset : ${canvasDimensions.xOffset}`);
  console.log(`canvas y-offset : ${canvasDimensions.yOffset}`);
  console.log(`canvas width to paint : ${canvasDimensions.paintWidth}`);
  console.log(`canvas height to paint : ${canvasDimensions.paintHeight}`);

  return canvasDimensions;
}

// Return full screen canvas for narrow screen layout
function resolveNarrowCanvas($ctrl, screenHeight, screenWidth, videoResHeight, videoResWidth) {
  return {
    height: screenHeight,
    width: screenWidth,
    xOffset: 0,
    yOffset: 0,
    // Do not draw overflow
    paintHeight: parseInt(videoResHeight / ($ctrl.videoHeight / 100), 10),
    paintWidth: videoResWidth
  };
}

function resolveNormalCanvas(screenHeight, screenWidth, videoResHeight, videoResWidth) {
  const heightMult = screenHeight / videoResHeight;
  const widthMult = screenWidth / videoResWidth;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let canvasXOffset = 0;
  let canvasYOffset = 0;
  if (heightMult * videoResWidth <= screenWidth) {
    canvasWidth = parseInt(heightMult * videoResWidth, 10);
    canvasHeight = screenHeight;
    canvasXOffset = parseInt((screenWidth - canvasWidth) / 2, 10);
    canvasYOffset = 0;
  } else if (widthMult * videoResHeight <= screenHeight) {
    canvasWidth = screenWidth;
    canvasHeight = parseInt(widthMult * videoResHeight, 10);
    canvasXOffset = 0;
    canvasYOffset = parseInt((screenHeight - canvasHeight) / 2, 10);
  } else {
    // TODO haoyuan : any backup plans on failure to resolve canvas?
    console.error('Failed to resolve canvas resolution.');
  }

  return {
    height: canvasHeight,
    width: canvasWidth,
    xOffset: canvasXOffset,
    yOffset: canvasYOffset,
    paintHeight: videoResHeight,
    paintWidth: videoResWidth
  };
}

CameraOnlyUploadController.$inject = [
  '$element',
  '$scope',
  '$q',
  '$attrs'
];

export default CameraOnlyUploadController;
