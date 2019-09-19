// Service resolving video and canvas screen sizes
class CameraCaptureScreenHandler {
  constructor(
    $log
  ) {
    this.$log = $log;
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
    videoHeight, videoWidth,
    screenHeight, screenWidth,
    videoResHeight, videoResWidth
  ) {
    this.$log.debug('Recomputing canvas');
    this.$log.debug(`video width : ${videoWidth}`);
    this.$log.debug(`video height : ${videoHeight}`);
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
        videoHeight, videoWidth,
        screenHeight, screenWidth,
        videoResHeight, videoResWidth
      );
    } else if (hasNarrowVideoInLandScapeScreen(
      screenHeight, screenWidth,
      videoResHeight, videoResWidth
    )) {
      this.$log.debug('(canvas) Landscape narrow screen');
      canvasDimensions = getCanvasSpecsForLandscapeScreenWithNarrowVideo(
        videoHeight, videoWidth,
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

    const [
      height, width,
      yOffset, xOffset,
      paintHeight, paintWidth
    ] = canvasDimensions;

    this.$log.debug(`canvas width : ${width}`);
    this.$log.debug(`canvas height : ${height}`);
    this.$log.debug(`canvas x-offset : ${xOffset}`);
    this.$log.debug(`canvas y-offset : ${yOffset}`);
    this.$log.debug(`canvas width to paint : ${paintWidth}`);
    this.$log.debug(`canvas height to paint : ${paintHeight}`);

    return canvasDimensions;
  }
}

/**
 * Functions below handle cases when screen dimension and video resolution
 * resolve into a narrow video screen with thin and ugly margines at sides
 * In this case we truncate the dimension of video causing the ugly margines
 * and get video to fill up the entire screen
 */

function hasNarrowVideoInPortraitScreen(screenHeight, screenWidth, videoResHeight, videoResWidth) {
  return screenHeight > screenWidth && videoResHeight / videoResWidth > screenHeight / screenWidth;
}

function getCanvasSpecsForPortraitScreenWithNarrowVideo(
  videoHeight, videoWidth,
  screenHeight, screenWidth,
  videoResHeight, videoResWidth
) {
  return [
    screenHeight, // height
    screenWidth, // width
    0, // yOffset
    0, // xOffSet
    parseInt(videoResHeight / (videoHeight / 100.0), 10), // paint height
    videoResWidth // paint width
  ];
}

function hasNarrowVideoInLandScapeScreen(screenHeight, screenWidth, videoResHeight, videoResWidth) {
  return screenWidth > screenHeight && videoResWidth / videoResHeight > screenWidth / screenHeight;
}

function getCanvasSpecsForLandscapeScreenWithNarrowVideo(
  videoHeight, videoWidth,
  screenHeight, screenWidth,
  videoResHeight, videoResWidth
) {
  return [
    screenHeight, // height
    screenWidth, // width
    0, // yOffset
    0, // xOffSet
    videoResHeight, // paint height
    parseInt(videoResWidth / (videoWidth / 100), 10) // paint width
  ];
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

  return [
    canvasHeight, // height
    canvasWidth, // width
    canvasYOffset, // yOffset
    canvasXOffset, // xOffset
    videoResHeight, // paintHeight
    videoResWidth // paintWidth
  ];
}

CameraCaptureScreenHandler.$inject = [
  '$log',
];

export default CameraCaptureScreenHandler;
