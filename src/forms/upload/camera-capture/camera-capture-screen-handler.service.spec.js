'use strict';

describe('CameraCaptureScreenHandler', function() {
  var $compile,
    $rootScope,
    $timeout,
    CameraCaptureScreenHandler,
    screenHeight,
    screenWidth,
    videoResHeight,
    videoResWidth,
    videoHeightInPercentage,
    videoWidthInPercentage,
    overlayHeight,
    overlayWidth;

  beforeEach(function() {
    module('tw.styleguide.forms.upload');

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $timeout = $injector.get('$timeout');
      CameraCaptureScreenHandler = $injector.get('CameraCaptureScreenHandler');
    });
  });

  describe('when displaying an overlay of an ID card (width : height is approximately 2)', function() {
    beforeEach(function() {
      // Using dimension of Singapore ID here :)
      overlayHeight = 500;
      overlayWidth = 850;
    });

    describe('when screen is portrait', function () {
      beforeEach(function () {
        screenHeight = 600;
        screenWidth = 400;
      });

      it('should render an overlay with thin margins on left and right with original shape preserved', function () {
        const result = CameraCaptureScreenHandler.getOverlaySpecifications(
          screenHeight, screenWidth,
          overlayHeight, overlayWidth
        );

        expect(result.height).toBeCloseTo(200, 1);
        expect(result.width).toBeCloseTo(340, 1);
        expect(result.yOffset).toBeCloseTo(160, 1);
        expect(result.xOffset).toBeCloseTo(30, 1);
      });
    });

    describe('when screen is landscape', function () {
      beforeEach(function () {
        screenHeight = 400;
        screenWidth = 700;
      });

      it('should render an overlay centered in screen with original shape preserved', function () {
        const result = CameraCaptureScreenHandler.getOverlaySpecifications(
          screenHeight, screenWidth,
          overlayHeight, overlayWidth
        );

        expect(result.height).toBeCloseTo(200, 1);
        expect(result.width).toBeCloseTo(340, 1);
        expect(result.yOffset).toBeCloseTo(80, 1);
        expect(result.xOffset).toBeCloseTo(180, 1);
      });
    });
  });

  describe('when screen is portrait and video resolution is thin ' +
    'leaving smaller black margins on left and right of screen', function() {

    beforeEach(function() {
      videoHeightInPercentage = 111.0;
      videoWidthInPercentage = 100.0;
      screenHeight = 90.0;
      screenWidth = 40.0;
      videoResHeight = 100.0;
      videoResWidth = 40.0;
    });

    it("stretches video to remove margins by overflowing video height", function() {
      const result = CameraCaptureScreenHandler.getVideoSpecifications(
        screenHeight, screenWidth,
        videoResHeight, videoResWidth
      );
      expect(result.videoWidthInPercentage).toBeCloseTo(100, 2);
      expect(result.videoHeightInPercentage).toBeCloseTo(111, 2);
    });

    it("gives canvas dimension with truncated resolution in height", function() {
      const {
        height, width,
        yOffset, xOffset,
        paintHeight, paintWidth
      } = CameraCaptureScreenHandler.getCanvasSpecifications(
        videoHeightInPercentage, videoWidthInPercentage,
        screenHeight, screenWidth,
        videoResHeight, videoResWidth
      );
      expect(xOffset).toBeCloseTo(0, 2);
      expect(yOffset).toBeCloseTo(0, 2);
      expect(height).toBeCloseTo(screenHeight, 2);
      expect(width).toBeCloseTo(screenWidth, 2);
      expect(paintHeight).toBeCloseTo(90, 2);
      expect(paintWidth).toBeCloseTo(40, 2);
    });
  });

  describe('when screen is landscape and video resolution is wide ' +
    'leaving smaller black margins on top and bottom of screen', function() {

    beforeEach(function() {
      videoHeightInPercentage = 100.0;
      videoWidthInPercentage = 111.0;
      screenHeight = 40.0;
      screenWidth = 90.0;
      videoResHeight = 40.0;
      videoResWidth = 100.0;
    });

    it("stretches video to remove margins by overflowing video width", function() {
      const result = CameraCaptureScreenHandler.getVideoSpecifications(
        screenHeight, screenWidth,
        videoResHeight, videoResWidth
      );
      expect(result.videoWidthInPercentage).toBeCloseTo(111, 2);
      expect(result.videoHeightInPercentage).toBeCloseTo(100, 2);
    });

    it("gives canvas dimension with truncated resolution in width", function() {
      const {
        height, width,
        yOffset, xOffset,
        paintHeight, paintWidth
      } = CameraCaptureScreenHandler.getCanvasSpecifications(
        videoHeightInPercentage, videoWidthInPercentage,
        screenHeight, screenWidth,
        videoResHeight, videoResWidth
      );
      expect(xOffset).toBeCloseTo(0, 2);
      expect(yOffset).toBeCloseTo(0, 2);
      expect(height).toBeCloseTo(screenHeight, 2);
      expect(width).toBeCloseTo(screenWidth, 2);
      expect(paintWidth).toBeCloseTo(90, 2);
      expect(paintHeight).toBeCloseTo(40, 2);
    });
  });

  describe('when screen is portrait and video resolution is wide ' +
    'leaving black margins on top and bottom of screen', function() {

    beforeEach(function () {
      videoHeightInPercentage = 100.0;
      videoWidthInPercentage = 100.0;
      screenHeight = 90.0;
      screenWidth = 40.0;
      videoResHeight = 40.0;
      videoResWidth = 80.0;
    });

    it("keeps video dimension as is", function() {
      const result = CameraCaptureScreenHandler.getVideoSpecifications(
        screenHeight, screenWidth,
        videoResHeight, videoResWidth
      );
      expect(result.videoWidthInPercentage).toBeCloseTo(100, 2);
      expect(result.videoHeightInPercentage).toBeCloseTo(100, 2);
    });

    it("gets canvas dimension overlaying video position", function() {
      const {
        height, width,
        yOffset, xOffset,
        paintHeight, paintWidth
      } = CameraCaptureScreenHandler.getCanvasSpecifications(
        videoHeightInPercentage, videoWidthInPercentage,
        screenHeight, screenWidth,
        videoResHeight, videoResWidth
      );
      expect(xOffset).toBeCloseTo(0, 2);
      expect(yOffset).toBeCloseTo(35, 2);
      expect(width).toBeCloseTo(screenWidth, 2);
      expect(height).toBeCloseTo(20, 2);
      expect(paintWidth).toBeCloseTo(videoResWidth, 2);
      expect(paintHeight).toBeCloseTo(videoResHeight, 2);
    });
  });

  describe('when screen is landscape and video resolution is thin ' +
    'leaving black margins on left and right of screen', function() {

    beforeEach(function () {
      videoHeightInPercentage = 100.0;
      videoWidthInPercentage = 100.0;
      screenHeight = 40.0;
      screenWidth = 90.0;
      videoResHeight = 20.0;
      videoResWidth = 10.0;
    });

    it("keeps video dimension as is", function() {
      const result = CameraCaptureScreenHandler.getVideoSpecifications(
        screenHeight, screenWidth,
        videoResHeight, videoResWidth
      );
      expect(result.videoWidthInPercentage).toBeCloseTo(100, 2);
      expect(result.videoHeightInPercentage).toBeCloseTo(100, 2);
    });

    it("gets canvas dimension overlaying video position", function() {
      const {
        height, width,
        yOffset, xOffset,
        paintHeight, paintWidth
      } = CameraCaptureScreenHandler.getCanvasSpecifications(
        videoHeightInPercentage, videoWidthInPercentage,
        screenHeight, screenWidth,
        videoResHeight, videoResWidth
      );
      expect(xOffset).toBeCloseTo(35, 2);
      expect(yOffset).toBeCloseTo(0, 2);
      expect(width).toBeCloseTo(20, 2);
      expect(height).toBeCloseTo(screenHeight, 2);
      expect(paintWidth).toBeCloseTo(videoResWidth, 2);
      expect(paintHeight).toBeCloseTo(videoResHeight, 2);
    });
  });

  describe('when screen perfect', function() {

    beforeEach(function () {
      videoHeightInPercentage = 100.0;
      videoWidthInPercentage = 100.0;
      screenHeight = 80.0;
      screenWidth = 80.0;
      videoResHeight = 40.0;
      videoResWidth = 40.0;
    });

    it("keeps video dimension as is", function () {
      const result = CameraCaptureScreenHandler.getVideoSpecifications(
        screenHeight, screenWidth,
        videoResHeight, videoResWidth
      );
      expect(result.videoWidthInPercentage).toBeCloseTo(100, 2);
      expect(result.videoHeightInPercentage).toBeCloseTo(100, 2);
    });

    it("gives canvas dimension with untruncated video and screen dimensions", function() {
      const {
        height, width,
        yOffset, xOffset,
        paintHeight, paintWidth
      } = CameraCaptureScreenHandler.getCanvasSpecifications(
        videoHeightInPercentage, videoWidthInPercentage,
        screenHeight, screenWidth,
        videoResHeight, videoResWidth
      );
      expect(xOffset).toBeCloseTo(0, 2);
      expect(yOffset).toBeCloseTo(0, 2);
      expect(width).toBeCloseTo(screenWidth, 2);
      expect(height).toBeCloseTo(screenHeight, 2);
      expect(paintWidth).toBeCloseTo(videoResHeight, 2);
      expect(paintHeight).toBeCloseTo(videoResWidth, 2);
    });
  });
});
