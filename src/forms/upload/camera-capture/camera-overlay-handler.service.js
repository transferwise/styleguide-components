// Service resolving video and canvas screen sizes
class CameraOverlayHandler {
  constructor(
  ) {
    this.overlayXMargin = 0.075;
    this.overlayYMargin = 0.075;
  }

  /**
   * Given a box container, produce overlay with certain dimensions
   * and certain offsets wrt the container
   */
  getOverlaySpecificationsWrtContainer(
    containerHeight, containerWidth,
    overlayNaturalHeight, overlayNaturalWidth
  ) {
    const overlayHeightWidthRatio = overlayNaturalHeight / overlayNaturalWidth;
    // Max width and height are container width/height with margins applied
    const maxWidth = containerWidth - 2 * containerWidth * this.overlayXMargin;
    const maxHeight = containerHeight - 2 * containerHeight * this.overlayYMargin;

    let width;
    let height;
    // Overlay dimension is being restricted by width
    if (maxWidth * overlayHeightWidthRatio >= maxHeight) {
      height = maxHeight;
      width = height / overlayHeightWidthRatio;
    } else {
      width = maxWidth;
      height = width * overlayHeightWidthRatio;
    }

    const xOffset = (containerWidth - width) / 2;
    const yOffset = (containerHeight - height) / 2;

    return {
      height,
      width,
      yOffset,
      xOffset
    };
  }
}

CameraOverlayHandler.$inject = [
];

export default CameraOverlayHandler;
