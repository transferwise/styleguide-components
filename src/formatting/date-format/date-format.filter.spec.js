'use strict';

describe('DateFormat filter, ', function() {
  var $compile,
      $rootScope,
      $scope,
      $element,
      input,
      DateService;

  beforeEach(module('tw.styleguide-components'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    DateService = $injector.get('TwDateService');
    $scope = $rootScope.$new();
  }));

  describe('Given the locale is en-GB', function() {
    beforeEach(function() {
      $scope.locale = "en-GB";
      spyOn(DateService, 'getUTCDateString').and.callThrough();
      spyOn(DateService, 'getLocaleDateString').and.callThrough();
      $element = getCompiledDirectiveElement($scope);
    });

    describe('and an iso string is supplied without time data', function() {
      beforeEach(function() {
        $scope.value = "2016-11-05";
        $scope.$apply();
      });

      it('should format the value', function() {
        var textValue = $element.text().trim();
        expect(textValue).toBe('5th November 2016');
      });
      it('should format the date as if UTC', function() {
        expect(DateService.getUTCDateString).toHaveBeenCalled();
        expect(DateService.getLocaleDateString).not.toHaveBeenCalled();
      });
    });

    describe('and an iso string is supplied with time data', function() {
      beforeEach(function() {
        $scope.value = "2016-11-05T00:00:00Z";
        $scope.$apply();
      });

      it('should format the value', function() {
        var textValue = $element.text().trim();
        expect(textValue).toBe('5th November 2016');
      });
      it('should format the date according to the local timezone', function() {
        expect(DateService.getLocaleDateString).toHaveBeenCalled();
        expect(DateService.getUTCDateString).not.toHaveBeenCalled();
      });
    });

    describe('and a date object is supplied', function() {
      beforeEach(function() {
        $scope.value = new Date("2016-11-05T00:00:00Z");
        $scope.$apply();
      });

      it('should format the value', function() {
        var textValue = $element.text().trim();
        expect(textValue).toBe('5th November 2016');
      });
      it('should format the date according to the local timezone', function() {
        expect(DateService.getLocaleDateString).toHaveBeenCalled();
        expect(DateService.getUTCDateString).not.toHaveBeenCalled();
      });
    });

    describe('and a short format is requested', function() {
      beforeEach(function() {
        $scope.value = new Date("2016-11-05T00:00:00Z");
        $scope.format = 'short';
        $scope.$apply();
      });

      it('should shorten the formatted value', function() {
        var textValue = $element.text().trim();
        expect(textValue).toBe('5th Nov 2016');
      });
    });

    describe('and a long format is requested', function() {
      beforeEach(function() {
        $scope.value = new Date("2016-11-05T00:00:00Z");
        $scope.format = 'long';
        $scope.$apply();
      });

      it('should lengthen the formatted value', function() {
        var textValue = $element.text().trim();
        expect(textValue).toBe('Saturday, 5th November 2016');
      });
    });
  });

  describe('Given the locale is ja-JP', function() {
    beforeEach(function() {
      $scope.locale = "ja-JP";
      $scope.value = new Date(2016,10,5);
      $element = getCompiledDirectiveElement($scope);
      $scope.$apply();
    });

    it('should format the value in Japanese format', function() {
      var textValue = $element.text().trim();
      expect(textValue).toBe('2016年11月5日');
    });
  });

  function getCompiledDirectiveElement(scope, template) {
    if (!template) {
      template = " \
        <span>{{value | twDateFormat : locale : format }}</span>";
    }

    var element = angular.element(template);
    var compiledElement = $compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }
});
