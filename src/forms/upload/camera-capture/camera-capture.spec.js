'use strict';

import screenfull from 'screenfull';

describe('Given a camera capture component', () => {
  let $q,
    $compile,
    $scope,
    $window,
    $component,
    controller,
    component,
    mockCanvasContext;

  const template = " \
  <tw-camera-capture \
    direction='{{direction}}' \
    overlay='{{overlay}}'\
    on-cancel='onCancel()' \
    on-capture='onCapture(file)' \
  </tw-camera-capture>";

  beforeEach(function() {
    angular.mock.module('tw.styleguide.forms.upload');

    angular.mock.inject(function($injector) {
      $compile = $injector.get('$compile');
      $window = $injector.get('$window');
      $scope = $injector.get('$rootScope').$new();
      $q = $injector.get('$q');
    });

    $window.navigator.mediaDevices = {
      getUserMedia: jest.fn(() => $q.resolve({
        getTracks: jest.fn(() => [])
      })),
    }

    screenfull.request.mockImplementation(() => $q.resolve());

    HTMLMediaElement.prototype.play = jest.fn(() => $q.resolve());
    HTMLMediaElement.prototype.pause = jest.fn();

    mockCanvasContext = {
      drawImage: jest.fn()
    };
    HTMLCanvasElement.prototype.getContext = jest.fn(() => mockCanvasContext);

    $scope.onCancel = jest.fn();
    $scope.onCapture = jest.fn();
  });

  describe('when initialising', () => {
    it.each([
      ['uSeR', 'user'],
      ['EnVirONMent', 'environment'],
      [null, 'environment'],
    ])('should request for a media device with the right preferred direction', (inputDirection, expected) => {
      $scope.direction = inputDirection;
      compileComponent();

      expect($window.navigator.mediaDevices.getUserMedia).toHaveBeenCalledTimes(1);
      expect($window.navigator.mediaDevices.getUserMedia.mock.calls[0][0]).toMatchObject({
        video: {
          facingMode: {ideal: expected}
        }
      });
      expect(controller.mediaStream).toBeTruthy();
    });

    it('should trigger a switch to fullscreen', () => {
      screenfull.request.mockClear();
      compileComponent();

      expect(screenfull.request).toHaveBeenCalledTimes(1);
    });

    describe('if fullscreen switching succeeds', () => {
      it('should progress to the capture screen', () => {
        compileComponent();

        expect(controller.mode).toBe('capture');
      });
    })

    describe('if fullscreen switching fails', () => {
      it('should still progress to the capture screen', () => {
        screenfull.request.mockImplementation(() =>$q.reject());

        compileComponent();

        expect(controller.mode).toBe('capture');
      });
    })
  });

  describe('when capturing', () => {
    describe('the viewfinder window', () => {
      it('should show a playing video as the camera\'s viewfinder', () => {
        compileComponent();

        expect(findVideoElement().play).toHaveBeenCalled();
        expect(findVideoElement().classList).not.toContain('ng-hide');
        expect(findCanvasElement().classList).toContain('ng-hide');
      });
    });

    describe('the overlay guidelines for the viewfinder', () => {
      it('should display if an overlay was specified', () => {
        $scope.overlay = 'some-pic.png';
        compileComponent();

        expect(findOverlayElement()).toBeTruthy();
        expect(findOverlayElement().classList).not.toContain('ng-hide');
      });

      it('should not display if an overlay was unspecified', () => {
        $scope.overlay = null;
        compileComponent();

        expect(findOverlayElement()).toBeFalsy();
      });
    });

    describe('the controls', () => {
      it('should display a capture button', () => {
        expect(findCaptureButton()).toBeTruthy();
        expect(findCaptureButton().classList).not.toContain('ng-hide');
      });

      describe('when capture is pressed', () => {
        beforeEach(() => {
          screenfull.exit.mockClear();

          compileComponent();
          findCaptureButton().click();
        });

        it('should switch to the confirmation screen', () => {
          expect(controller.mode).toBe('confirm');
        });
      });

      it('should display a cancel button', () => {
        expect(findCancelButton()).toBeTruthy();
        expect(findCancelButton().classList).not.toContain('ng-hide');
      });

      describe('when cancel is pressed', () => {
        beforeEach(() => {
          screenfull.exit.mockClear();

          compileComponent();
          findCancelButton().click();
        });

        it('should exit fullscreen', () => {
          expect(screenfull.exit).toHaveBeenCalledTimes(1);
        });

        it('should trigger the bound onCancel callback', () => {
          expect($scope.onCancel).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('when confirming', () => {
    beforeEach(() => {
      compileComponent();
      findCaptureButton().click();
    });

    it('should draw an image to the canvas and show it', () => {
      expect(mockCanvasContext.drawImage).toHaveBeenCalledTimes(1);
      expect(findCanvasElement()).toBeTruthy();
      expect(findCanvasElement().classList).not.toContain('ng-hide');
    });

    it('should pause and hide the video', () => {
      expect(findVideoElement().pause).toHaveBeenCalledTimes(1);
      expect(findVideoElement().classList).toContain('ng-hide');
    });

    describe('the controls', () => {
      it('should display a confirm button', () => {
        expect(findConfirmButton()).toBeTruthy();
        expect(findConfirmButton().classList).not.toContain('ng-hide');
      });

      describe('when confirm is pressed', () => {
        beforeEach(() => {
          jest.spyOn(findCanvasElement(),'toBlob').mockImplementation(callback => {
            callback();
          });
          findConfirmButton().click();
        });

        it('should trigger the bound onCapture callback', () => {
          expect($scope.onCapture).toHaveBeenCalledTimes(1);
        });
      });

      it('should display a cancel button', () => {
        expect(findCancelButton()).toBeTruthy();
        expect(findCancelButton().classList).not.toContain('ng-hide');
      });

      describe('when cancel is pressed', () => {
        beforeEach(() => {
          compileComponent();
          findCancelButton().click();
        });

        it('should switch back to the capture screen', () => {
          expect(controller.mode).toBe('capture');
        });
      });
    });
  });

  function compileComponent() {
    const element = angular.element(template);
    $component = $compile(element)($scope);
    $scope.$digest();
    controller = $component.controller('twCameraCapture');
    component = $component[0];
  }

  function findVideoElement() {
    return controller.findViewfinder();
  }

  function findCanvasElement() {
    return controller.findSensor();
  }

  function findOverlayElement() {
    return component.querySelector('#cameraViewfinderOverlay');
  }

  function findCaptureButton() {
    return component.querySelector('.camera-ctrl-btn-big');
  }

  function findConfirmButton() {
    return component.querySelector('.camera-ctrl-btn-confirm');
  }

  function findCancelButton() {
    return component.querySelector('.camera-ctrl-btn-cancel');
  }
});
