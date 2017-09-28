'use strict';

describe('DateTimeFormat filter, ', function() {
  var $compile,
      $rootScope,
      $scope,
      $element,
      input;

  beforeEach(module('tw.styleguide-components'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();
  }));

  describe('Given the locale is en-GB', function() {
    beforeEach(function() {
      $scope.locale = "en-GB";
      $scope.value = new Date(2016,10,1,15,25);
      $element = getCompiledDirectiveElement($scope);
      $scope.$apply();
    });

    it('should format the value', function() {
      var textValue = $element.text().trim();
      expect(textValue).toBe('1st November 2016 3:25pm');
    });
  });

  describe('Given the locale is ja-JP', function() {
    beforeEach(function() {
      $scope.locale = "ja-JP";
      $scope.value = new Date(2016,10,1,15,25);
      $element = getCompiledDirectiveElement($scope);
      $scope.$apply();
    });

    it('should format the value', function() {
      var textValue = $element.text().trim();
      expect(textValue).toBe('2016年11月1日 15:25の');
    });
  });

  function getCompiledDirectiveElement(scope, template) {
    if (!template) {
      template = " \
        <span>{{value | twDateTime:locale}}</span>";
    }

    var element = angular.element(template);
    var compiledElement = $compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }
});
