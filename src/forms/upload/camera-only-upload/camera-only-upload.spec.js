'use strict';

describe('Given a camera only upload component', function() {
  var $q,
    $compile,
    $rootScope,
    $scope,
    $timeout,
    $controller,
    CameraCaptureScreenHandler,
    directiveController,
    directiveElement;

  var base64url = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCA" +
   "IAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wcMEQwbn8bvgwAAAB1pV" +
   "Fh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAADElEQVQI12P4//8/AAX+" +
   "Av7czFnnAAAAAElFTkSuQmCC";

  beforeEach(function() {
    module('tw.styleguide.forms.upload');

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();
      $timeout = $injector.get('$timeout');
      $controller = $injector.get('$controller');
      $q = $injector.get('$q');
      CameraCaptureScreenHandler = $injector.get('CameraCaptureScreenHandler');
    });

    var template = " \
         <tw-camera-only-upload \
          show-capture-screen='showCaptureScreen' \
          on-capture-screen-close='onCaptureScreenClose()' \
          on-user-capture-confirmation='onUserCaptureConfirmation(file)'> \
        </tw-camera-only-upload>";

    // Create spies for callbacks
    $scope.showCaptureScreen = false;
    $scope.onCaptureScreenClose = jasmine.createSpy('onCaptureScreenClose');
    $scope.onUserCaptureConfirmation = jasmine.createSpy('onUserCaptureConfirmation');

    directiveElement = getCompiledDirectiveElement($scope, template);
    directiveController = directiveElement.controller('twCameraOnlyUpload');
  });

  describe('After it is attached', function() {
    beforeEach(function() {
      spyOn(directiveController, 'onLiveCamFlowStart').and.callFake(function() {});
    });

    it('Should not start video capture flow when showCaptureScreen changes to false', function() {
      $scope.showCaptureScreen = false;
      $scope.$apply();
      expect(directiveController.onLiveCamFlowStart).not.toHaveBeenCalled();
    });

    it('Should start video capture flow when showCaptureScreen changes to true', function() {
      $scope.showCaptureScreen = true;
      $scope.$apply();
      expect(directiveController.onLiveCamFlowStart).toHaveBeenCalled();
    });
  });

  describe('After onLiveCamFlowStart is triggered', function() {
    beforeEach(function() {
      spyOn(directiveController, 'setScreenDimensions').and.callFake(function() {});
      spyOn(directiveController, 'tryAcquireFullScreen').and.returnValue($q.resolve());
      spyOn(directiveController, 'tryAcquireMediaStream').and.returnValue($q.resolve());
      spyOn(directiveController, 'onVideoStreamAcquisition').and.callFake(function() {});
    });

    it('Should try to acquire media stream after getting full screen', function() {
      directiveController.tryAcquireFullScreen.and.returnValue($q.resolve());
      $scope.showCaptureScreen = true;
      $scope.$apply();
      expect(directiveController.setScreenDimensions).toHaveBeenCalled();
      expect(directiveController.tryAcquireMediaStream).toHaveBeenCalled();
    });

    it('Should try to acquire media stream after not getting full screen', function() {
      directiveController.tryAcquireFullScreen.and.returnValue($q.reject());
      $scope.showCaptureScreen = true;
      $scope.$apply();
      expect(directiveController.setScreenDimensions).toHaveBeenCalled();
      expect(directiveController.tryAcquireMediaStream).toHaveBeenCalled();
    });

    it('Should call onVideoStreamAcquisition after video stream acquisition', function(){
      directiveController.tryAcquireMediaStream.and.returnValue($q.resolve());
      $scope.showCaptureScreen = true;
      $scope.$apply();
      expect(directiveController.onVideoStreamAcquisition).toHaveBeenCalled();
    });

    it('Should not call onVideoStreamAcquisition after video stream acquisition', function(){
      directiveController.tryAcquireMediaStream.and.returnValue($q.reject());
      $scope.showCaptureScreen = true;
      $scope.$apply();
      expect(directiveController.onVideoStreamAcquisition).not.toHaveBeenCalled();
    });
  });

  describe('After entering live upload flow', function() {
    beforeEach(function() {
      spyOn(directiveController, 'onLiveCamFlowStart').and.callFake(function() {
        directiveController.onVideoStreamAcquisition(null);
      });
      $scope.showCaptureScreen = true;
      $scope.$apply();
    });

    it('Should quit live upload flow when cancel is clicked', function () {
      spyOn(directiveController, 'onCancelBtnClick').and.callThrough();
      spyOn(directiveController, 'onCaptureScreenClose').and.callThrough();
      const cancelButton = directiveElement[0].querySelector('#video-cancel');
      cancelButton.click();
      expect(directiveController.onCancelBtnClick).toHaveBeenCalled();
      expect(directiveController.showVideoPreview).not.toBeTruthy();
      expect($scope.onCaptureScreenClose).toHaveBeenCalled();
    });

    it('Should show capture screen when capture is clicked', function () {
      directiveController.captureButtonDisabled = false;
      spyOn(directiveController, 'onCaptureBtnClick').and.callThrough();
      spyOn(directiveController.CameraCaptureScreenHandler, 'getCanvasSpecifications')
        .and.returnValue([1, 1, 1, 1, 1, 1]);
      const confirmButton = directiveElement[0].querySelector('#video-confirm');
      confirmButton.click();
      expect(directiveController.onCaptureBtnClick).toHaveBeenCalled();
      expect(directiveController.CameraCaptureScreenHandler.getCanvasSpecifications).toHaveBeenCalled();
      expect(directiveController.showVideoInPreview).not.toBeTruthy();
      expect(directiveController.showCaptureInPreview).toBeTruthy();
    });
  });

  describe('When at video capture preview screen', function() {
    beforeEach(function() {
      spyOn(directiveController, 'onLiveCamFlowStart').and.callFake(function() {
        directiveController.onVideoStreamAcquisition(null);
      });
      $scope.showCaptureScreen = true;
      $scope.$apply();
      directiveController.showCaptureInPreview = true;
      directiveController.showVideoInPreview = false;
      $scope.$apply();
    });

    it('Should re-enter video preview when capture cancel is clicked', function () {
      spyOn(directiveController, 'onRecaptureBtnClick').and.callThrough();
      const cancelButton = directiveElement[0].querySelector('#capture-cancel');
      cancelButton.click();
      expect(directiveController.onRecaptureBtnClick).toHaveBeenCalled();
      expect(directiveController.onLiveCamFlowStart).toHaveBeenCalled();
    });
    
    it('Should perform file upload when confirm button is clicked', function () {
      spyOn(directiveController, 'onUploadBtnClick').and.callThrough();
      spyOn(directiveController.CameraCaptureScreenHandler, 'getCanvasSpecifications')
        .and.returnValue([1, 1, 1, 1, 1, 1]);
      spyOn(directiveController.uploadCanvas,'toBlob').and.callFake(function(callback) {
        // Mock to skip async behavior
        callback();
      });

      const confirmButton = directiveElement[0].querySelector('#capture-confirm');
      confirmButton.click();
      expect(directiveController.onUploadBtnClick).toHaveBeenCalled();
      expect(directiveController.CameraCaptureScreenHandler.getCanvasSpecifications).toHaveBeenCalled();
      expect($scope.onUserCaptureConfirmation).toHaveBeenCalled();
    });
  });

  function getCompiledDirectiveElement($scope, template) {
    var element = angular.element(template);
    var compiledElement = $compile(element)($scope);
    $scope.$digest();
    return compiledElement;
  }
});
