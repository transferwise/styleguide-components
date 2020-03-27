'use strict';

describe('Given a camera capture component', function() {
  var $q,
    $compile,
    $rootScope,
    $scope,
    $window,
    controller,
    component;

  // Promises
  var acquireFullScreenRequest,
    acquireMediaStreamRequest;

  // Spies
  var tryAcquireMediaStreamSpy;

  beforeEach(function() {
    angular.mock.module('tw.styleguide.forms.upload');

    angular.mock.inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $window = $injector.get('$window');
      $scope = $rootScope.$new();
      $q = $injector.get('$q');
    });

    const template = " \
      <tw-camera-capture \
        direction='ENVIRONMENT' \
        on-cancel='onCancel()' \
        on-capture='onCapture(file)' \
        test-mode='true'> \
      </tw-camera-capture>";

    // Create spies for callbacks
    $scope.onCancel = jest.fn();
    $scope.onCapture = jest.fn();

    const $component = getComponent($scope, template);
    controller = $component.controller('twCameraCapture');
    component = $component[0];

    acquireFullScreenRequest = $q.defer();
    acquireMediaStreamRequest = $q.defer();

    tryAcquireMediaStreamSpy = jest.spyOn(controller, 'tryAcquireMediaStream');
    tryAcquireMediaStreamSpy.mockReturnValue(acquireMediaStreamRequest.promise);

    jest.spyOn(controller, 'tryAcquireFullScreen').mockReturnValue(acquireFullScreenRequest.promise);
  });

  describe('after startLiveCamFlow is triggered', function() {
    beforeEach(function() {
      jest.spyOn(controller, 'onVideoStreamAcquisition');
    });

    it('should try to acquire full screen', function() {
      startLiveCameraFlow(controller);
      expect(controller.tryAcquireFullScreen).toHaveBeenCalled();
    });

    describe('when we get full screen successfully', function() {
      beforeEach(function () {
        acquireFullScreenRequest.resolve();
        acquireMediaStreamRequest.resolve();
        startLiveCameraFlow(controller);
      });

      it('should try to acquire the media stream', function () {
        expect(controller.tryAcquireMediaStream)
          .toHaveBeenCalled();
      });
    });

    describe('when we fail to get full screen', function() {
      beforeEach(function () {
        acquireFullScreenRequest.reject();
        startLiveCameraFlow(controller);
      });

      it('should try to acquire media stream after not getting full screen', function () {
        expect(controller.tryAcquireMediaStream)
          .toHaveBeenCalled();
      });
    });

    describe('after trying to acquire full screen regardless of success or failure', function() {
      beforeEach(function () {
        acquireFullScreenRequest.resolve();
      });

      describe('when we acquire media stream successfully', function() {
        beforeEach(function () {
          acquireMediaStreamRequest.resolve();
          startLiveCameraFlow(controller);
        });
        it('should fire the stream acquisition handler', function(){
          expect(controller.onVideoStreamAcquisition).toHaveBeenCalled();
        });

        it('should show the video element', function() {
          expect(getVideoElement(component).classList).not.toContain('ng-hide');
        });

        it('should not show the display canvas', function() {
          expect(getDisplayCanvasElement(component).classList).toContain('ng-hide');
        });
      });

      describe('when we fail to acquire media stream', function() {
        beforeEach(function () {
          acquireMediaStreamRequest.reject();
          startLiveCameraFlow(controller);
        });

        it('should not call the stream acquisition handler', function(){
          expect(controller.onVideoStreamAcquisition).not.toHaveBeenCalled();
        });

        it('should shutdown thus calling the onCancel callback', function() {
          expect($scope.onCancel).toHaveBeenCalled();
        });
      });
    });
  });

  describe('when trying to acquire media stream', function() {
    var enumerateDevicesRequest;

    beforeEach(function() {
      enumerateDevicesRequest = $q.defer();
      tryAcquireMediaStreamSpy.and.callThrough();
      jest.spyOn($window.navigator.mediaDevices, 'enumerateDevices').mockReturnValue(enumerateDevicesRequest.promise);
      jest.spyOn($window.navigator.mediaDevices, 'getUserMedia').mockImplementation(function(){});
      controller.mediaStream = null;
    });

    it('camera direction defaults to user if device only has one video input', function() {
      enumerateDevicesRequest.resolve([{kind: 'videoInput'}, {kind: 'audioInput'}, {kind: 'audioInput'}]);
      controller.tryAcquireMediaStream().then(() => {
        expect(controller.direction).toBe('user');
      });
    });

    it('camera direction takes input value if device has more than 1 video input', function() {
      enumerateDevicesRequest.resolve([{kind: 'videoInput'}, {kind: 'videoInput'}, {kind: 'audioInput'}]);
      controller.tryAcquireMediaStream().then(() => {
        expect(controller.direction).toBe('environment');
      });
    });
  });

  describe('after entering live upload flow', function() {
    beforeEach(function() {
      acquireFullScreenRequest.resolve();
      acquireMediaStreamRequest.resolve();
      jest.spyOn(controller, 'onCancel');
      jest.spyOn(controller, 'onCaptureBtnClick');
      startLiveCameraFlow(controller);
    });

    describe('when cancel button is clicked', function() {
      beforeEach(function() {
        getVideoCancelButton(component).click();
      });

      it('should hide the video preview', function () {
        expect(getVideoPreviewElement(component).classList).toContain('ng-hide');
      });

      it('should shutdown thus calling the onCancel handler', function () {
        expect($scope.onCancel).toHaveBeenCalled();
      });
    });

    describe('when capture button is clicked', function() {
      let canvas;

      beforeEach(function() {
        // Setting up a portrait screen, other orientations have been tested in screen handler
        controller.captureButtonDisabled = false;
        controller.videoHeight = 111.0;
        controller.videoWidth = 100.0;
        controller.screenHeight = 90.0;
        controller.screenWidth = 40.0;
        controller.videoResHeight = 100.0;
        controller.videoResWidth = 40.0;
        getVideoConfirmButton(component).click();
        canvas = getDisplayCanvasElement(component);
      });

      it('should hide video element', function () {
        expect(getVideoElement(component).classList).toContain('ng-hide');
      });

      it('should not hide the canvas', function () {
        expect(canvas.classList).not.toContain('ng-hide');
      });

      it('should show the canvas at the right size', function() {
        expect(canvas.height).toBe(90);
        expect(canvas.width).toBe(40);
        expect($(canvas).offset().top).toBe(0);
        expect($(canvas).offset().left).toBe(0);
      });
    });
  });

  describe('when at video capture preview screen', function() {
    beforeEach(function() {
      acquireFullScreenRequest.resolve();
      acquireMediaStreamRequest.resolve();
      startLiveCameraFlow(controller);
      controller.onCaptureBtnClick();
      $scope.$apply();
    });

    describe('when cancel button is clicked', function() {
      beforeEach(function() {
        getCaptureCancelButton(component).click();
      });

      it('should show video preview', function () {
        expect(getVideoElement(component).classList).not.toContain('ng-hide');
      });

      it('should not show the canvas element', function () {
        expect(getDisplayCanvasElement(component).classList).toContain('ng-hide');
      });

      it('should show the video control buttons', function () {
        expect(getVideoCancelButton(component)).toBeTruthy();
        expect(getVideoConfirmButton(component)).toBeTruthy();
      });

      it('should hide the canvas control buttons', function() {
        expect(getCaptureCancelButton(component)).not.toBeTruthy();
        expect(getCaptureConfirmButton(component)).not.toBeTruthy();
      });
    });

    describe('when confirm button is clicked', function() {
      let canvas;

      beforeEach(function() {
        // Setting up a portrait screen, other orientations have been tested in screen handler
        controller.videoHeight = 111.0;
        controller.videoWidth = 100.0;
        controller.screenHeight = 90.0;
        controller.screenWidth = 40.0;
        controller.videoResHeight = 100.0;
        controller.videoResWidth = 40.0;

        jest.spyOn(controller.uploadCanvas,'toBlob').mockImplementation(function(callback) {
          // Mock to skip async behavior
          callback();
        });

        canvas = getUploadCanvasElement(component);
        getCaptureConfirmButton(component).click();
      });

      it('should call the onCapture handler', function () {
        expect($scope.onCapture).toHaveBeenCalled();
      });

      it('should not call the onCancel handler', function () {
        expect($scope.onCancel).not.toHaveBeenCalled();
      });

      it('should hide the canvas', function () {
        expect(canvas.classList).toContain('ng-hide');
      });
    });
  });

  function startLiveCameraFlow(controller) {
    controller.startLiveCamFlow();
    controller.$scope.$apply();
  }

  function getVideoPreviewElement(element) {
    return element.querySelector('#video-preview');
  }

  function getVideoElement(element) {
    return element.querySelector('#video');
  }

  function getDisplayCanvasElement(element) {
    return element.querySelector('#display-canvas');
  }

  function getUploadCanvasElement(element) {
    return element.querySelector('#upload-canvas');
  }

  function getVideoCancelButton(element) {
    return element.querySelector('#video-cancel');
  }

  function getVideoConfirmButton(element) {
    return element.querySelector('#video-confirm');
  }

  function getCaptureCancelButton(element) {
    return element.querySelector('#capture-cancel');
  }

  function getCaptureConfirmButton(element) {
    return element.querySelector('#capture-confirm');
  }

  function getComponent($scope, template) {
    const element = angular.element(template);
    const compiledElement = $compile(element)($scope);
    $scope.$digest();
    return compiledElement;
  }
});
