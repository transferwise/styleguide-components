'use strict';

describe('NumberFormat filter, ', function() {
  var $compile,
      $rootScope,
      $scope,
      $element,
      input,
      textValue,
      LocaleService;

  beforeEach(function() {
    module('tw.styleguide-components');

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();
      LocaleService = $injector.get('TwLocaleService');
    });
  });

  describe('when no locale supplied', function() {
    beforeEach(function() {
      $scope.value = 123456;
      spyOn(LocaleService, 'getCurrent').and.returnValue('en-GB');
      $element = getCompiledDirectiveElement($scope);
      textValue = $element.text().trim();
    });

    it('should use the locale from the locale service', function() {
      expect(LocaleService.getCurrent).toHaveBeenCalled();
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
        textValue = $element.text().trim();
      });

      it('should format the value', function() {
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
        textValue = $element.text().trim();
      });

      it('should format the value', function() {
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
        textValue = $element.text().trim();
      });

      it('should format the value', function() {
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
        textValue = $element.text().trim();
      });

      it('should format the value', function() {
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
        textValue = $element.text().trim();
      });

      it('should format the value', function() {
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
        textValue = $element.text().trim();
      });

      it('should format the value', function() {
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
        textValue = $element.text().trim();
      });

      it('should format the value', function() {
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
        textValue = $element.text().trim();
      });

      it('should format the value', function() {
        if (isNumberLocaleSupported()) {
          expect(textValue).toEqual('1.234,56');
        } else {
          expect(textValue).toEqual('1234.56');
        }
      });
    });
  });

  describe('when a precision is supplied', function() {
    beforeEach(function() {
      $scope.locale = 'en-GB';
      $scope.value = '1234.5';
      $scope.precision = 2;
      $element = getCompiledDirectiveElement($scope);
      textValue = $element.text().trim();
    });

    it('should format the value with the correct decimals', function() {
      if (isNumberLocaleSupported()) {
        expect(textValue).toEqual('1,234.50');
      } else {
        expect(textValue).toEqual('1234.50');
      }
    });
  });

  function getCompiledDirectiveElement(scope, template) {
    if (!template) {
      template = " \
        <span>{{ value | twNumberFormat : precision : locale }}</span>";
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
