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

  describe('when no locale supplied', function() {
    beforeEach(function() {
      $scope.value = 123456;
      $element = getCompiledDirectiveElement($scope);
      $scope.$apply();
    });
    it('should default to en-GB format', function() {
      var textValue = $element.text().trim();
      if (isNumberLocaleSupported()) {
        expect(textValue).toEqual('123,456');
      } else {
        expect(textValue).toEqual('123456');
      }
    });
  });

  describe('when en-GB locale supplied', function() {
    beforeEach(function() {
      $scope.locale = 'en-GB';
    });
    describe('and given an integer number', function() {
      beforeEach(function() {
        $scope.value = 123456;
        $element = getCompiledDirectiveElement($scope);
        $scope.$apply();
      });

      it('should format the value', function() {
        var textValue = $element.text().trim();
        if (isNumberLocaleSupported()) {
          expect(textValue).toEqual('123,456');
        } else {
          expect(textValue).toEqual('123456');
        }
      });
    });

    describe('and given a decimal number', function() {
      beforeEach(function() {
        $scope.value = 1234.56;
        $element = getCompiledDirectiveElement($scope);
        $scope.$apply();
      });

      it('should format the value', function() {
        var textValue = $element.text().trim();
        if (isNumberLocaleSupported()) {
          expect(textValue).toEqual('1,234.56');
        } else {
          expect(textValue).toEqual('1234.56');
        }
      });
    });

    describe('and given a numeric integer string', function() {
      beforeEach(function() {
        $scope.value = '123456';
        $element = getCompiledDirectiveElement($scope);
        $scope.$apply();
      });

      it('should format the value', function() {
        var textValue = $element.text().trim();
        if (isNumberLocaleSupported()) {
          expect(textValue).toEqual('123,456');
        } else {
          expect(textValue).toEqual('123456');
        }
      });
    });

    describe('and given a decimal numeric string', function() {
      beforeEach(function() {
        $scope.value = '1234.56';
        $element = getCompiledDirectiveElement($scope);
        $scope.$apply();
      });

      it('should format the value', function() {
        var textValue = $element.text().trim();
        if (isNumberLocaleSupported()) {
          expect(textValue).toEqual('1,234.56');
        } else {
          expect(textValue).toEqual('1234.56');
        }
      });
    });
  });

  describe('when es-ES locale supplied', function() {
    beforeEach(function() {
      $scope.locale = 'es-ES';
    });
    describe('and given an integer number', function() {
      beforeEach(function() {
        $scope.value = 123456;
        $element = getCompiledDirectiveElement($scope);
        $scope.$apply();
      });

      it('should format the value', function() {
        var textValue = $element.text().trim();
        if (isNumberLocaleSupported()) {
          expect(textValue).toEqual('123.456');
        } else {
          expect(textValue).toEqual('123456');
        }
      });
    });

    describe('and given a decimal number', function() {
      beforeEach(function() {
        $scope.value = 1234.56;
        $element = getCompiledDirectiveElement($scope);
        $scope.$apply();
      });

      it('should format the value', function() {
        var textValue = $element.text().trim();
        if (isNumberLocaleSupported()) {
          expect(textValue).toEqual('1.234,56');
        } else {
          expect(textValue).toEqual('1234.56');
        }
      });
    });

    describe('and given a numeric integer string', function() {
      beforeEach(function() {
        $scope.value = '123456';
        $element = getCompiledDirectiveElement($scope);
        $scope.$apply();
      });

      it('should format the value', function() {
        var textValue = $element.text().trim();
        if (isNumberLocaleSupported()) {
          expect(textValue).toEqual('123.456');
        } else {
          expect(textValue).toEqual('123456');
        }
      });
    });

    describe('and given a decimal numeric string', function() {
      beforeEach(function() {
        $scope.value = '1234.56';
        $element = getCompiledDirectiveElement($scope);
        $scope.$apply();
      });

      it('should format the value', function() {
        var textValue = $element.text().trim();
        if (isNumberLocaleSupported()) {
          expect(textValue).toEqual('1.234,56');
        } else {
          expect(textValue).toEqual('1234.56');
        }
      });
    });
  });

  function getCompiledDirectiveElement(scope, template) {
    if (!template) {
      template = " \
        <span>{{value | twNumberFormat : locale}}</span>";
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
