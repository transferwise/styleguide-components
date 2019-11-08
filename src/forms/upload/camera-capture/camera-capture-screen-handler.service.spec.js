'use strict';

describe('CameraCaptureScreenHandler', function() {
  var CameraCaptureScreenHandler,
    screenHeight,
    screenWidth,
    videoResHeight,
    videoResWidth,
    videoHeightInPercentage,
    videoWidthInPercentage;

  beforeEach(function() {
    module('tw.styleguide.forms.upload');

    inject(function($injector) {
      CameraCaptureScreenHandler = $injector.get('CameraCaptureScreenHandler');
    });
  });

  describe('when displaying an overlay', function() {
    const mockedOverlayHeight = 100;
    const mockedOverlayWidth = 110;
    const mockedOverlayYOffset = 10;
    const mockedOverlayXOffset = 20;
    beforeEach(function() {
      spyOn(CameraCaptureScreenHandler.CameraOverlayHandler, 'getOverlaySpecificationsWrtContainer')
        .and.returnValue({
          height: mockedOverlayHeight,
          width: mockedOverlayWidth,
          yOffset: mockedOverlayYOffset,
          xOffset: mockedOverlayXOffset
        })
    });

    describe('when screen is portrait', function () {
      beforeEach(function () {
        screenHeight = 600;
        screenWidth = 400;
      });

      it('should position overlay correctly by applying container xy offsets', function () {
        const result = CameraCaptureScreenHandler.getOverlaySpecifications(screenHeight, screenWidth, 0, 0);

        expect(result.height).toBe(mockedOverlayHeight);
        expect(result.width).toBe(mockedOverlayWidth);
        expect(result.yOffset).toBeCloseTo(mockedOverlayYOffset + 80, 1);
        expect(result.xOffset).toBeCloseTo(mockedOverlayXOffset, 1);
      });
    });

    describe('when screen is landscape', function () {
      beforeEach(function () {
        screenHeight = 400;
        screenWidth = 600;
      });

      it('should position overlay correctly by applying container xy offsets', function () {
        const result = CameraCaptureScreenHandler.getOverlaySpecifications(screenHeight, screenWidth, 0, 0);

        expect(result.height).toBe(mockedOverlayHeight);
        expect(result.width).toBeCloseTo(mockedOverlayWidth);
        expect(result.yOffset).toBeCloseTo(mockedOverlayYOffset, 1);
        expect(result.xOffset).toBeCloseTo(mockedOverlayXOffset + 120, 1);
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

    it("gives overlay container fully fitting the width and in upper middle portion of screen", function () {
      const {
        height, width,
        yOffset, xOffset
      } = CameraCaptureScreenHandler.constructor.getOverlayContainer(screenHeight, screenWidth);
      expect(height).toBe(40);
      expect(width).toBe(40);
      expect(yOffset).toBe(20);
      expect(xOffset).toBe(0);
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

    it("gives overlay container mostly fitting the height and in upper middle portion of screen", function () {
      const {
        height, width,
        yOffset, xOffset
      } = CameraCaptureScreenHandler.constructor.getOverlayContainer(screenHeight, screenWidth);
      expect(height).toBe(36);
      expect(width).toBe(36);
      expect(yOffset).toBe(0);
      expect(xOffset).toBe(27);
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

    it("gives overlay container fully fitting the width and in upper middle portion of screen", function () {
      const {
        height, width,
        yOffset, xOffset
      } = CameraCaptureScreenHandler.constructor.getOverlayContainer(screenHeight, screenWidth);
      expect(height).toBe(40);
      expect(width).toBe(40);
      expect(yOffset).toBe(20);
      expect(xOffset).toBe(0);
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

    it("gives overlay container mostly fitting the height and in upper middle portion of screen", function () {
      const {
        height, width,
        yOffset, xOffset
      } = CameraCaptureScreenHandler.constructor.getOverlayContainer(screenHeight, screenWidth);
      expect(height).toBe(36);
      expect(width).toBe(36);
      expect(yOffset).toBe(0);
      expect(xOffset).toBe(27);
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
