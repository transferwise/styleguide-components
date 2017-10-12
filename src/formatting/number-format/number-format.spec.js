'use strict';

describe('NumberFormat filter, ', function() {
  var $compile,
      $rootScope,
      $scope,
      $element,
      $timeout,
      input;

  beforeEach(module('tw.styleguide-components'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $timeout = $injector.get('$timeout');
    $scope = $rootScope.$new();
  }));

  describe('Given an integer number', function() {
    beforeEach(function() {
      $scope.value = 123456;
      $element = getCompiledDirectiveElement($scope);
      $scope.$apply();
    });

    it('should format the value', function() {
      var textValue = $element.text().trim();
      if (isNumberLocaleSupported()) {
        expect(textValue).toBe('123,456');
      } else {
        expect(textValue).toBe('123456');
      }
    });
  });

  describe('Given a decimal number', function() {
    beforeEach(function() {
      $scope.value = 1234.56;
      $element = getCompiledDirectiveElement($scope);
      $scope.$apply();
    });

    it('should format the value', function() {
      var textValue = $element.text().trim();
      if (isNumberLocaleSupported()) {
        expect(textValue).toBe('1,234.56');
      } else {
        expect(textValue).toBe('1234.56');
      }
    });
  });

  describe('Given a numeric integer string', function() {
    beforeEach(function() {
      $scope.value = '123456';
      $element = getCompiledDirectiveElement($scope);
      $scope.$apply();
    });

    it('should format the value', function() {
      var textValue = $element.text().trim();
      if (isNumberLocaleSupported()) {
        expect(textValue).toBe('123,456');
      } else {
        expect(textValue).toBe('123456');
      }
    });
  });

  describe('Given a decimal numeric string', function() {
    beforeEach(function() {
      $scope.value = '1234.56';
      $element = getCompiledDirectiveElement($scope);
      $scope.$apply();
    });

    it('should format the value', function() {
      var textValue = $element.text().trim();
      if (isNumberLocaleSupported()) {
        expect(textValue).toBe('1,234.56');
      } else {
        expect(textValue).toBe('1234.56');
      }
    });
  });

  function getCompiledDirectiveElement(scope, template) {
    if (!template) {
      template = " \
        <span>{{value | twNumberFormat : 'en-GB'}}</span>";
    }

    var element = angular.element(template);
    var compiledElement = $compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }

  function isNumberLocaleSupported() {
    var num = 1234;
    var numString = num.toLocaleString('en-GB');
    return numString === '1,234';
  }
});
