'use strict';

describe('CameraCaptureScreenHandler', function() {
  var $compile,
    $rootScope,
    $timeout,
    CameraCaptureScreenHandler;

  beforeEach(function() {
    module('tw.styleguide.forms');

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $timeout = $injector.get('$timeout');
      CameraCaptureScreenHandler = $injector.get('CameraCaptureScreenHandler');
    });
  });

  it("gets correct video dimension for portrait narrow screen", function() {
    const screenHeight = 90.0;
    const screenWidth = 40.0;
    const videoResHeight = 100.0;
    const videoResWidth = 40.0;
    const { videoHeight, videoWidth } = CameraCaptureScreenHandler.getVideoSpecifications(
        screenHeight, screenWidth,
        videoResHeight, videoResWidth
      );
    expect(videoWidth).toBeCloseTo(100, 2);
    expect(videoHeight).toBeCloseTo(111, 2);
  });

  it("gets correct video dimension for landscape narrow screen", function() {
    const screenHeight = 40.0;
    const screenWidth = 90.0;
    const videoResHeight = 40.0;
    const videoResWidth = 100.0;
    const { videoHeight, videoWidth } = CameraCaptureScreenHandler.getVideoSpecifications(
        screenHeight, screenWidth,
        videoResHeight, videoResWidth
      );
    expect(videoWidth).toBeCloseTo(111, 2);
    expect(videoHeight).toBeCloseTo(100, 2);
  });

  it("gets correct video dimension for the perfect screen", function() {
    const screenHeight = 40.0;
    const screenWidth = 40.0;
    const videoResHeight = 80.0;
    const videoResWidth = 80.0;
    const { videoHeight, videoWidth } = CameraCaptureScreenHandler.getVideoSpecifications(
      screenHeight, screenWidth,
      videoResHeight, videoResWidth
    );
    expect(videoWidth).toBeCloseTo(100, 2);
    expect(videoHeight).toBeCloseTo(100, 2);
  });

  it("gets correct canvas dimension for portrait narrow screen", function() {
    const videoHeight = 111.0;
    const videoWidth = 100.0;
    const screenHeight = 90.0;
    const screenWidth = 40.0;
    const videoResHeight = 100.0;
    const videoResWidth = 40.0;
    const [
      height, width,
      yOffset, xOffset,
      paintHeight, paintWidth
    ] = CameraCaptureScreenHandler.getCanvasSpecifications(
      videoHeight, videoWidth,
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

  it("gets correct canvas dimension for landscape narrow screen", function() {
    const videoWidth = 111.0;
    const videoHeight = 100.0;
    const screenWidth = 90.0;
    const screenHeight = 40.0;
    const videoResWidth = 100.0;
    const videoResHeight = 40.0;
    const [
      height, width,
      yOffset, xOffset,
      paintHeight, paintWidth
    ] = CameraCaptureScreenHandler.getCanvasSpecifications(
      videoHeight, videoWidth,
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

  it("gets correct canvas dimension for normal portrait screen", function() {
    const videoWidth = 100.0;
    const videoHeight = 100.0;
    const screenWidth = 100.0;
    const screenHeight = 80.0;
    const videoResWidth = 100.0;
    const videoResHeight = 100.0;
    const [
      height, width,
      yOffset, xOffset,
      paintHeight, paintWidth
    ] = CameraCaptureScreenHandler.getCanvasSpecifications(
      videoHeight, videoWidth,
      screenHeight, screenWidth,
      videoResHeight, videoResWidth
    );
    expect(xOffset).toBeCloseTo(10, 2);
    expect(yOffset).toBeCloseTo(0, 2);
    expect(height).toBeCloseTo(80, 2);
    expect(width).toBeCloseTo(80, 2);
    expect(paintWidth).toBeCloseTo(100, 2);
    expect(paintHeight).toBeCloseTo(100, 2);
  });

  it("gets correct canvas dimension for normal landscape screen", function() {
    const videoWidth = 100.0;
    const videoHeight = 100.0;
    const screenWidth = 80.0;
    const screenHeight = 100.0;
    const videoResWidth = 100.0;
    const videoResHeight = 100.0;
    const [
      height, width,
      yOffset, xOffset,
      paintHeight, paintWidth
    ] = CameraCaptureScreenHandler.getCanvasSpecifications(
      videoHeight, videoWidth,
      screenHeight, screenWidth,
      videoResHeight, videoResWidth
    );
    expect(xOffset).toBeCloseTo(0, 2);
    expect(yOffset).toBeCloseTo(10, 2);
    expect(height).toBeCloseTo(80, 2);
    expect(width).toBeCloseTo(80, 2);
    expect(paintWidth).toBeCloseTo(100, 2);
    expect(paintHeight).toBeCloseTo(100, 2);
  });

  it("gets correct canvas dimension for the perfect screen", function() {
    const videoWidth = 100.0;
    const videoHeight = 100.0;
    const screenWidth = 40.0;
    const screenHeight = 40.0;
    const videoResWidth = 80.0;
    const videoResHeight = 80.0;
    const [
      height, width,
      yOffset, xOffset,
      paintHeight, paintWidth
    ] = CameraCaptureScreenHandler.getCanvasSpecifications(
      videoHeight, videoWidth,
      screenHeight, screenWidth,
      videoResHeight, videoResWidth
    );
    expect(xOffset).toBeCloseTo(0, 2);
    expect(yOffset).toBeCloseTo(0, 2);
    expect(height).toBeCloseTo(screenHeight, 2);
    expect(width).toBeCloseTo(screenWidth, 2);
    expect(paintWidth).toBeCloseTo(80, 2);
    expect(paintHeight).toBeCloseTo(80, 2);
  });
});
