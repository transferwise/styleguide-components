'use strict';

describe('CameraOverlayHandler', function() {
  var CameraOverlayHandler,
    containerHeight,
    containerWidth,
    imgNaturalHeight,
    imgNaturalWidth;

  beforeEach(function() {
    angular.mock.module('tw.styleguide.forms.upload');

    angular.mock.inject(function($injector) {
      CameraOverlayHandler = $injector.get('CameraOverlayHandler');
    });
  });

  describe('when displaying an overlay "longer" than container box', function() {
    beforeEach(function() {
      containerHeight = 100;
      containerWidth = 100;
      imgNaturalHeight = 200;
      imgNaturalWidth = 100;
    });

    it('should shrink overlay so that overlay\'s height fits the height of container', function () {
      const result = CameraOverlayHandler.getOverlaySpecificationsWrtContainer(
        containerHeight, containerWidth,
        imgNaturalHeight, imgNaturalWidth
      );
      expect(result.height).toBeCloseTo(85, 1);
      expect(result.width).toBeCloseTo(42.5, 1);
      expect(result.yOffset).toBeCloseTo(7.5, 1);
      expect(result.xOffset).toBeCloseTo(28.75, 2);
    });
  });

  describe('when displaying an overlay "wider" than container box', function() {
    beforeEach(function() {
      containerHeight = 100;
      containerWidth = 100;
      imgNaturalHeight = 100;
      imgNaturalWidth = 200;
    });

    it('should shrink overlay so that overlay\'s width fits the width of container', function () {
      const result = CameraOverlayHandler.getOverlaySpecificationsWrtContainer(
        containerHeight, containerWidth,
        imgNaturalHeight, imgNaturalWidth
      );
      expect(result.height).toBeCloseTo(42.5, 1);
      expect(result.width).toBeCloseTo(85, 1);
      expect(result.yOffset).toBeCloseTo(28.75, 2);
      expect(result.xOffset).toBeCloseTo(7.5, 1);
    });
  });
});
