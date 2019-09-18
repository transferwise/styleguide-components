'use strict';

describe('Given a camera only upload component', function() {
  var $q,
    $compile,
    $rootScope,
    $scope,
    CameraCaptureScreenHandler,
    directiveController,
    directiveElement;

  beforeEach(function() {
    module('tw.styleguide.forms.upload');

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();
      $q = $injector.get('$q');
      CameraCaptureScreenHandler = $injector.get('CameraCaptureScreenHandler');
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

    directiveElement = getCompiledDirectiveElement($scope, template);
    directiveController = directiveElement.controller('twCameraOnlyUpload');
  });

  describe('After startLiveCamFlow is triggered', function() {
    beforeEach(function() {
      spyOn(directiveController, 'tryAcquireFullScreen').and.returnValue($q.resolve());
      spyOn(directiveController, 'tryAcquireMediaStream').and.returnValue($q.resolve());
      spyOn(directiveController, 'onVideoStreamAcquisition').and.callThrough();
    });

    it('Should try to acquire full screen', function() {
      startLiveCameraFlow(directiveController);
      expect(directiveController.tryAcquireFullScreen).toHaveBeenCalled();
    });

    it('Should try to acquire media stream after getting full screen', function() {
      directiveController.tryAcquireFullScreen.and.returnValue($q.resolve());
      startLiveCameraFlow(directiveController);
      expect(directiveController.tryAcquireMediaStream).toHaveBeenCalled();
    });

    it('Should try to acquire media stream after not getting full screen', function() {
      directiveController.tryAcquireFullScreen.and.returnValue($q.reject());
      startLiveCameraFlow(directiveController);
      expect(directiveController.tryAcquireMediaStream).toHaveBeenCalled();
    });

    it('Should display video after video stream acquisition', function(){
      directiveController.tryAcquireMediaStream.and.returnValue($q.resolve());
      startLiveCameraFlow(directiveController);
      expect(directiveController.onVideoStreamAcquisition).toHaveBeenCalled();
      expect($(getVideoElement(directiveElement[0])).hasClass('ng-hide')).not.toBeTruthy();
      expect($(getDisplayCanvasElement(directiveElement[0])).hasClass('ng-hide')).toBeTruthy();
    });

    it('Should quit on video stream acquisition failure', function(){
      directiveController.tryAcquireMediaStream.and.returnValue($q.reject());
      startLiveCameraFlow(directiveController);
      expect(directiveController.onVideoStreamAcquisition).not.toHaveBeenCalled();
      expect($(getVideoPreviewElement(directiveElement[0])).hasClass('ng-hide')).toBeTruthy();
      expect($scope.onCaptureScreenClose).toHaveBeenCalled();
    });
  });

  describe('After entering live upload flow', function() {
    beforeEach(function() {
      spyOn(directiveController, 'tryAcquireFullScreen').and.returnValue($q.resolve());
      spyOn(directiveController, 'tryAcquireMediaStream').and.returnValue($q.resolve());
      startLiveCameraFlow(directiveController);
    });

    it('Should quit live upload flow when cancel is clicked', function () {
      spyOn(directiveController, 'onCaptureScreenClose').and.callThrough();
      getVideoCancelButton(directiveElement[0]).click();
      expect($(getVideoPreviewElement(directiveElement[0])).hasClass('ng-hide')).toBeTruthy();
      expect($scope.onCaptureScreenClose).toHaveBeenCalled();
    });

    it('Should show capture screen when capture is clicked', function () {
      setupScreen();
      spyOn(directiveController, 'onCaptureBtnClick').and.callThrough();
      getVideoConfirmButton(directiveElement[0]).click();
      expect($(getVideoElement(directiveElement[0])).hasClass('ng-hide')).toBeTruthy();
      const canvas = getDisplayCanvasElement(directiveElement[0]);
      expect($(canvas).hasClass('ng-hide')).not.toBeTruthy();
      expect(canvas.height).toBe(90);
      expect(canvas.width).toBe(40);
      expect($(canvas).offset().top).toBe(0);
      expect($(canvas).offset().left).toBe(0);

      // Setting up a portrait screen, other orientations have been tested in screen handler
      function setupScreen() {
        directiveController.captureButtonDisabled = false;
        directiveController.videoHeight = 111.0;
        directiveController.videoWidth = 100.0;
        directiveController.screenHeight = 90.0;
        directiveController.screenWidth = 40.0;
        directiveController.videoResHeight = 100.0;
        directiveController.videoResWidth = 40.0;
      }
    });
  });

  describe('When at video capture preview screen', function() {
    beforeEach(function() {
      spyOn(directiveController, 'tryAcquireFullScreen').and.returnValue($q.resolve());
      spyOn(directiveController, 'tryAcquireMediaStream').and.returnValue($q.resolve());
      startLiveCameraFlow(directiveController);
      directiveController.onCaptureBtnClick();
      $scope.$apply();
    });

    it('Should re-enter video preview when capture cancel is clicked', function () {
      getCaptureCancelButton(directiveElement[0]).click();
      // Video preview is shown
      expect($(getVideoElement(directiveElement[0])).hasClass('ng-hide')).not.toBeTruthy();
      expect($(getDisplayCanvasElement(directiveElement[0])).hasClass('ng-hide')).toBeTruthy();
      // Video control buttons are shown
      expect(getVideoCancelButton(directiveElement[0])).toBeTruthy();
      expect(getVideoConfirmButton(directiveElement[0])).toBeTruthy();
      // Canvas control buttons are hidden
      expect(getCaptureCancelButton(directiveElement[0])).not.toBeTruthy();
      expect(getCaptureConfirmButton(directiveElement[0])).not.toBeTruthy();
    });

    it('Should perform file upload when confirm button is clicked', function () {
      setupScreen();
      spyOn(directiveController.uploadCanvas,'toBlob').and.callFake(function(callback) {
        // Mock to skip async behavior
        callback();
      });

      getCaptureConfirmButton(directiveElement[0]).click();
      expect($scope.onUserCaptureConfirmation).toHaveBeenCalled();
      expect($scope.onCaptureScreenClose).toHaveBeenCalled();
      const canvas = getUploadCanvasElement(directiveElement[0]);
      expect($(canvas).hasClass('ng-hide')).toBeTruthy();
      expect(canvas.height).toBe(90);
      expect(canvas.width).toBe(40);
      expect($(canvas).offset().top).toBe(0);
      expect($(canvas).offset().left).toBe(0);

      // Setting up a portrait screen, other orientations have been tested in screen handler
      function setupScreen() {
        directiveController.videoHeight = 111.0;
        directiveController.videoWidth = 100.0;
        directiveController.screenHeight = 90.0;
        directiveController.screenWidth = 40.0;
        directiveController.videoResHeight = 100.0;
        directiveController.videoResWidth = 40.0;
      }
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

  function getCompiledDirectiveElement($scope, template) {
    var element = angular.element(template);
    var compiledElement = $compile(element)($scope);
    $scope.$digest();
    return compiledElement;
  }
});
