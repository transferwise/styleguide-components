'use strict';

describe('TextFormatFilter, ', function() {
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

  describe('Given there is a pattern', function() {
    beforeEach(function() {
      $scope.pattern = '** - ** - **';
      $scope.value = '123456';
      $element = getCompiledDirectiveElement($scope);
      $scope.$apply();
    });

    it('should format the value', function() {
      var textValue = $element.text().trim();
      expect(textValue).toBe('12 - 34 - 56');
    });
  });

  describe('When no pattern supplied', function() {
    beforeEach(function() {
      $scope.pattern = '';
      $scope.value = '123456';
      $element = getCompiledDirectiveElement($scope);
      $scope.$apply();
    });

    it('should leave the value unaltered', function() {
      var textValue = $element.text().trim();
      expect(textValue).toBe('123456');
    });
  });

  function getCompiledDirectiveElement(scope, template) {
    if (!template) {
      template = " \
        <span>{{value | twTextFormat:pattern}}</span>";
    }

    var element = angular.element(template);
    var compiledElement = $compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }
});
