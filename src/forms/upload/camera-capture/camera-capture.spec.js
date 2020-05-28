'use strict';

import screenfull from 'screenfull';

describe('Given a camera capture component', () => {
  let $q,
    $compile,
    $scope,
    $window,
    $timeout,
    $component,
    controller,
    component,
    mockCanvasContext;

  const template = " \
  <tw-camera-capture \
    guidelines='guidelines' \
    on-cancel='onCancel()' \
    on-capture='onCapture(file)' \
  </tw-camera-capture>";

  beforeEach(function() {
    angular.mock.module('tw.styleguide.forms.upload');

    angular.mock.inject(function($injector) {
      $compile = $injector.get('$compile');
      $window = $injector.get('$window');
      $timeout = $injector.get('$timeout');
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
      $scope.guidelines = {direction: inputDirection};
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

      it('should appear mirrored if a user-facing (selfie) cam was requested', () => {
        $scope.guidelines = {direction: 'eNVironmENT'};
        compileComponent();
        expect(findVideoElement().classList).not.toContain('mirrored');

        $scope.guidelines = {direction: 'uSeR'};
        compileComponent();
        expect(findVideoElement().classList).toContain('mirrored');
      });
    });

    describe('the overlay guidelines for the viewfinder', () => {
      it('should display an overlay outline if it was specified', () => {
        $scope.guidelines = {outline: 'some-pic.png'};
        compileComponent();

        expect(findOverlayElement()).toBeTruthy();
        expect(findOverlayElement().classList).not.toContain('ng-hide');
      });

      it('should not display if an overlay outline was unspecified', () => {
        $scope.guidelines = null;
        compileComponent();

        expect(findOverlayElement()).toBeFalsy();
      });

      describe('should be sized into the largest square possible that fits into the active viewfinder area while maintaining a 5% margin on each side', () => {
        it.each([
          ['landscape video with aspect ratio matching screen', 16, 9, 1600, 900, 810],
          ['landscape video with top-bottom letterboxing', 16, 9, 1600, 1000, 810],
          ['landscape video with left-right letterboxing', 16, 9, 1700, 900, 810],
          ['portrait video with aspect ratio matching screen', 9, 16, 90, 160, 81],
          ['portrait video with top-bottom letterboxing', 9, 16, 90, 170, 81],
          ['portrait video with left-right letterboxing', 9, 16, 100, 160, 81],
        ])('%s', (description, videoWidth, videoHeight, clientWidth, clientHeight, expectedOverlayLength) => {
          $scope.guidelines = {outline: 'some-pic.png'};
          compileComponent();

          controller.findContainer = () => ({clientWidth, clientHeight});
          controller.findViewfinder = () => ({videoWidth, videoHeight});

          controller.calculateWidths();
          $timeout.flush();

          expect(parseNumberOfPixels(findOverlayElement().style.width)).toBeCloseTo(expectedOverlayLength);
          expect(parseNumberOfPixels(findOverlayElement().style.height)).toBeCloseTo(expectedOverlayLength);

          function parseNumberOfPixels(pxString) {
            return parseFloat(pxString.match(/[\d\.]+/));
          }
        })
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

    describe('the displayed canvas', () => {
      describe('should be sized as largely as possible without breaking its aspect ratio or exceeding the screen', () => {
        it.each([
          ['landscape canvas with aspect ratio matching screen', 16, 9, 1600, 900, 1600],
          ['landscape canvas with top-bottom letterboxing', 16, 9, 1600, 1000, 1600],
          ['landscape canvas with left-right letterboxing', 16, 9, 1700, 900, 1600],
          ['portrait canvas with aspect ratio matching screen', 9, 16, 90, 160, 90],
          ['portrait canvas with top-bottom letterboxing', 9, 16, 90, 170, 90],
          ['portrait canvas with left-right letterboxing', 9, 16, 100, 160, 90],
        ])('%s', (description, videoWidth, videoHeight, clientWidth, clientHeight, expectedCanvasDisplayWidth) => {
          controller.findContainer = () => ({clientWidth, clientHeight});
          controller.findViewfinder = () => ({videoWidth, videoHeight});
  
          controller.calculateWidths();
          $timeout.flush();
  
          // canvas intrinsic resolution. Must match source video intrinsic resolution.
          // expect(findCanvasElement().width).toBe(videoWidth);
          // expect(findCanvasElement().height).toBe(videoHeight);

          // canvas display resolution.
          expect(parseNumberOfPixels(findCanvasElement().style.width)).toBeCloseTo(expectedCanvasDisplayWidth);
  
          function parseNumberOfPixels(pxString) {
            return parseFloat(pxString.match(/[\d\.]+/));
          }
        })
      });
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

  function findContainerElement() {
    return controller.findContainer();
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
