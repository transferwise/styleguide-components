// Service resolving video and canvas screen sizes
class CameraCaptureScreenHandler {
  constructor(
    $log
  ) {
    this.$log = $log;
    this.overlayXOffsetPercentage = 0.10;
    this.overlayMaxWidth = 800;
  }

  /* Get height and width of video in percentage * 100
   * Function is based off the fact that video stream will expand
   * to fill one dimension of the screen and be centered wrt the other dimension
   * We need to know which dimension it is
   */
  getVideoSpecifications(
    screenHeight, screenWidth,
    videoResHeight, videoResWidth
  ) {
    this.$log.debug('Computing video specs');
    let videoHeightInPercentage = 100;
    let videoWidthInPercentage = 100;

    if (hasNarrowVideoInPortraitScreen(
      screenHeight, screenWidth,
      videoResHeight, videoResWidth
    )) {
      this.$log.debug('(video) Portrait narrow screen');
      const videoResRatio = videoResHeight / videoResWidth;
      const screenResRatio = screenHeight / screenWidth;
      videoHeightInPercentage = parseInt((videoResRatio / screenResRatio) * 100, 10);
    } else if (hasNarrowVideoInLandScapeScreen(
      screenHeight, screenWidth,
      videoResHeight, videoResWidth
    )) {
      this.$log.debug('(video) Landscape narrow screen');
      const videoResRatio = videoResWidth / videoResHeight;
      const screenResRatio = screenWidth / screenHeight;
      videoWidthInPercentage = parseInt((videoResRatio / screenResRatio) * 100, 10);
    }
    // We should not get a "normal" case here
    this.$log.debug(`video width : ${videoWidthInPercentage}`);
    this.$log.debug(`video height : ${videoHeightInPercentage}`);

    return {
      videoHeightInPercentage,
      videoWidthInPercentage
    };
  }

  /* Get dimension, offset and resolution of drawing for canvas
   * Function is based off the fact that video stream will expand
   * to fill one dimension of the screen and be centered wrt the other dimension
   * We need to know which dimension it is
   */
  getCanvasSpecifications(
    videoHeightInPercentage, videoWidthInPercentage,
    screenHeight, screenWidth,
    videoResHeight, videoResWidth
  ) {
    this.$log.debug('Computing canvas specs');
    this.$log.debug(`video width : ${videoWidthInPercentage}`);
    this.$log.debug(`video height : ${videoHeightInPercentage}`);
    this.$log.debug(`screen width : ${screenWidth}`);
    this.$log.debug(`screen height : ${screenHeight}`);
    this.$log.debug(`video res width : ${videoResWidth}`);
    this.$log.debug(`video res height : ${videoResHeight}`);

    let canvasDimensions = null;

    // handle layout where a landscape screen has a long and narrower camera window in it
    if (hasNarrowVideoInPortraitScreen(
      screenHeight, screenWidth,
      videoResHeight, videoResWidth
    )) {
      this.$log.debug('(canvas) Portrait narrow screen');
      canvasDimensions = getCanvasSpecsForPortraitScreenWithNarrowVideo(
        videoHeightInPercentage, videoWidthInPercentage,
        screenHeight, screenWidth,
        videoResHeight, videoResWidth
      );
    } else if (hasNarrowVideoInLandScapeScreen(
      screenHeight, screenWidth,
      videoResHeight, videoResWidth
    )) {
      this.$log.debug('(canvas) Landscape narrow screen');
      canvasDimensions = getCanvasSpecsForLandscapeScreenWithNarrowVideo(
        videoHeightInPercentage, videoWidthInPercentage,
        screenHeight, screenWidth,
        videoResHeight, videoResWidth
      );
    } else {
      this.$log.debug('(canvas) Normal screen');
      canvasDimensions = getCanvasSpecs(
        screenHeight, screenWidth,
        videoResHeight, videoResWidth
      );
    }

    const {
      height, width,
      yOffset, xOffset,
      paintHeight, paintWidth
    } = canvasDimensions;

    this.$log.debug(`canvas width : ${width}`);
    this.$log.debug(`canvas height : ${height}`);
    this.$log.debug(`canvas x-offset : ${xOffset}`);
    this.$log.debug(`canvas y-offset : ${yOffset}`);
    this.$log.debug(`canvas width to paint : ${paintWidth}`);
    this.$log.debug(`canvas height to paint : ${paintHeight}`);

    return canvasDimensions;
  }

  /**
   * Overlay is going to be an image with appropriate width to indicate an ID
   * If screen is portrait, leave a margin at both sides
   * and strech overlay to fit screen width preserving ratio
   * If screen is landscrape, set a fixed max width for overlay
   * and stretch overlay to that width instead
   */
  getOverlaySpecifications(
    screenHeight, screenWidth,
    overlayNaturalHeight, overlayNaturalWidth
  ) {
    this.$log.debug('Computing overlay specs');
    const overlayHeightWidthRatio = overlayNaturalHeight / overlayNaturalWidth;

    let xOffset = screenWidth * this.overlayXOffsetPercentage;
    let width = screenWidth - 2 * xOffset;
    // Screen is too wide, likely a landscape screen
    if (width > this.overlayMaxWidth) {
      width = this.overlayMaxWidth;
      xOffset = (screenWidth - width) / 2;
      this.$log.info('Restricted overlay size');
    }
    const height = width * overlayHeightWidthRatio;
    const yOffset = (screenHeight - height) / 2;

    this.$log.debug(`overlay width : ${width}`);
    this.$log.debug(`overlay height : ${height}`);
    this.$log.debug(`overlay x-offset : ${xOffset}`);
    this.$log.debug(`overlay y-offset : ${yOffset}`);

    return {
      height,
      width,
      yOffset,
      xOffset
    };
  }
}

/**
 * Functions below handle cases when screen dimension and video resolution
 * resolve into a narrow video screen with thin and ugly margines at sides
 * In this case we truncate the dimension of video causing the ugly margines
 * and get video to fill up the entire screen
 */

function hasNarrowVideoInPortraitScreen(screenHeight, screenWidth, videoResHeight, videoResWidth) {
  return isScreenPortrait(screenHeight, screenWidth)
    && videoResHeight / videoResWidth > screenHeight / screenWidth;
}

function getCanvasSpecsForPortraitScreenWithNarrowVideo(
  videoHeight, videoWidth,
  screenHeight, screenWidth,
  videoResHeight, videoResWidth
) {
  return {
    height: screenHeight,
    width: screenWidth,
    yOffset: 0,
    xOffset: 0,
    paintHeight: parseInt(videoResHeight / (videoHeight / 100.0), 10),
    paintWidth: videoResWidth
  };
}

function hasNarrowVideoInLandScapeScreen(screenHeight, screenWidth, videoResHeight, videoResWidth) {
  return isScreenLandscape(screenHeight, screenWidth)
    && videoResWidth / videoResHeight > screenWidth / screenHeight;
}

function isScreenPortrait(screenHeight, screenWidth) {
  return screenHeight >= screenWidth;
}

function isScreenLandscape(screenHeight, screenWidth) {
  return screenWidth >= screenHeight;
}

function getCanvasSpecsForLandscapeScreenWithNarrowVideo(
  videoHeight, videoWidth,
  screenHeight, screenWidth,
  videoResHeight, videoResWidth
) {
  return {
    height: screenHeight,
    width: screenWidth,
    yOffset: 0,
    xOffset: 0,
    paintHeight: videoResHeight,
    paintWidth: parseInt(videoResWidth / (videoWidth / 100), 10)
  };
}

function getCanvasSpecs(screenHeight, screenWidth, videoResHeight, videoResWidth) {
  const heightMult = screenHeight / videoResHeight;
  const widthMult = screenWidth / videoResWidth;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let canvasXOffset = 0;
  let canvasYOffset = 0;

  if (heightMult === widthMult) {
    canvasWidth = screenWidth;
    canvasHeight = screenHeight;
    canvasXOffset = 0;
    canvasYOffset = 0;
  } else if (heightMult > widthMult) {
    canvasWidth = screenWidth;
    canvasHeight = parseInt(widthMult * videoResHeight, 10);
    canvasXOffset = 0;
    canvasYOffset = parseInt((screenHeight - canvasHeight) / 2, 10);
  } else {
    canvasWidth = parseInt(heightMult * videoResWidth, 10);
    canvasHeight = screenHeight;
    canvasXOffset = parseInt((screenWidth - canvasWidth) / 2, 10);
    canvasYOffset = 0;
  }

  return {
    height: canvasHeight,
    width: canvasWidth,
    yOffset: canvasYOffset,
    xOffset: canvasXOffset,
    paintHeight: videoResHeight,
    paintWidth: videoResWidth
  };
}

CameraCaptureScreenHandler.$inject = [
  '$log',
];

export default CameraCaptureScreenHandler;
