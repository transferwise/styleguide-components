'use strict';

describe('Given a camera only upload component', function() {
  var $q,
    $compile,
    $rootScope,
    $scope,
    controller,
    component,
    acquireFullScreenRequest,
    acquireMediaStreamRequest;

  beforeEach(function() {
    module('tw.styleguide.forms.upload');

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();
      $q = $injector.get('$q');
    });

    var template = " \
      <tw-camera-only-upload \
        on-capture-screen-close='onCaptureScreenClose()' \
        on-user-capture-confirmation='onUserCaptureConfirmation(file)' \
        test-mode='true'> \
      </tw-camera-only-upload>";

    // Create spies for callbacks
    $scope.onCaptureScreenClose = jasmine.createSpy('onCaptureScreenClose');
    $scope.onUserCaptureConfirmation = jasmine.createSpy('onUserCaptureConfirmation');

    const $component = getComponent($scope, template);
    controller = $component.controller('twCameraOnlyUpload');
    component = $component[0];

    acquireFullScreenRequest = $q.defer();
    acquireMediaStreamRequest = $q.defer();

    spyOn(controller, 'tryAcquireFullScreen').and.returnValue(acquireFullScreenRequest.promise);
    spyOn(controller, 'tryAcquireMediaStream').and.returnValue(acquireMediaStreamRequest.promise);
  });

  describe('After startLiveCamFlow is triggered', function() {
    beforeEach(function() {
      spyOn(controller, 'onVideoStreamAcquisition').and.callThrough();
    });

    it('should try to acquire full screen', function() {
      startLiveCameraFlow(controller);
      expect(controller.tryAcquireFullScreen).toHaveBeenCalled();
    });

    describe('when we get full screen successfully', function() {
      beforeEach(function() {
        acquireFullScreenRequest.resolve();
        acquireMediaStreamRequest.resolve();
        startLiveCameraFlow(controller);
      });

      it('should try to acquire the media stream', function() {
        expect(controller.tryAcquireMediaStream).toHaveBeenCalled();
      });

      it('should fire the stream acquisition handler', function(){
        expect(controller.onVideoStreamAcquisition).toHaveBeenCalled();
      });

      it('should show the video element', function() {
        expect(getVideoElement(component).classList).not.toContain('ng-hide');
      });

      it('should show the display canvas', function() {
        expect(getDisplayCanvasElement(component).classList).not.toContain('ng-hide');
      });
    });

    describe('when we fail to get full screen', function() {
      beforeEach(function() {
        acquireFullScreenRequest.reject();
        startLiveCameraFlow(controller);
      });

      it('should try to acquire media stream after not getting full screen', function() {
        expect(controller.tryAcquireMediaStream).toHaveBeenCalled();
      });

      it('should not call the stream acquisition handler', function(){
        expect(controller.onVideoStreamAcquisition).not.toHaveBeenCalled();
      });

      it('should call the onCaptureScreenClose callback', function() {
        expect($scope.onCaptureScreenClose).toHaveBeenCalled();
      });

      it('should hide the video element', function() {
        expect(getVideoElement(component).classList).toContain('ng-hide');
      });

      it('should hide the display canvas', function() {
        expect(getDisplayCanvasElement(component).classList).toContains('ng-hide');
      });
    });
  });

  describe('After entering live upload flow', function() {
    beforeEach(function() {
      acquireFullScreenRequest.resolve();
      acquireMediaStreamRequest.resolve();
      spyOn(controller, 'onCaptureScreenClose').and.callThrough();
      spyOn(controller, 'onCaptureBtnClick').and.callThrough();
      startLiveCameraFlow(controller);
    });

    describe('when cancel button is clicked', function() {
      beforeEach(function() {
        getVideoCancelButton(component).click();
      });

      it('should hide the video preview', function () {
        expect(getVideoPreviewElement(component).classList).toContain('ng-hide');
      });

      it('should call the onCaptureScreenClose handler', function () {
        expect($scope.onCaptureScreenClose).toHaveBeenCalled();
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

  describe('When at video capture preview screen', function() {
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

        spyOn(controller.uploadCanvas,'toBlob').and.callFake(function(callback) {
          // Mock to skip async behavior
          callback();
        });

        canvas = getUploadCanvasElement(component);
        getCaptureConfirmButton(component).click();
      });

      it('should call the onUserCaptureConfirmation handler', function () {
        expect($scope.onUserCaptureConfirmation).toHaveBeenCalled();
      });

      it('should call the onCaptureScreenClose handler', function () {
        expect($scope.onCaptureScreenClose).toHaveBeenCalled();
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
    var element = angular.element(template);
    var compiledElement = $compile(element)($scope);
    $scope.$digest();
    return compiledElement;
  }
});
