'use strict';

describe('CurrencyFormat filter, ', function() {
  var $compile,
      $rootScope,
      $scope,
      $element,
      input,
      textValue,
      LocaleService;

  beforeEach(module('tw.styleguide-components'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();
    LocaleService = $injector.get('TwLocaleService');
  }));

  describe('when no locale supplied', function() {
    beforeEach(function() {
      $scope.value = 1234.56;
      $scope.currency = 'GBP';
      LocaleService.setCurrent('fr-FR');
      $element = getCompiledDirectiveElement($scope);
      textValue = $element.text().trim();
    });

    it('should use the locale from the locale service', function() {
      if (isNumberLocaleSupported()) {
        expect(textValue).toEqual('1 234,56 GBP');
      } else {
        expect(textValue).toEqual('1234.56 GBP');
      }
    });
  });

  describe('when en-GB locale supplied', function() {
    beforeEach(function() {
      $scope.locale = 'en-GB';
    });

    describe('with an integer', function() {
      beforeEach(function() {
        $scope.value = 123456;
        $scope.currency = 'GBP';
        $element = getCompiledDirectiveElement($scope);
        textValue = $element.text().trim();
      });

      it('should format without decimals', function() {
        if (isNumberLocaleSupported()) {
          expect(textValue).toEqual('123,456 GBP');
        } else {
          expect(textValue).toEqual('123456 GBP');
        }
      });
    });

    describe('with a float', function() {
      beforeEach(function() {
        $scope.value = 1234.5;
      });

      describe('and a 0 decimal currency', function() {
        beforeEach(function() {
          $scope.currency = 'JPY';
          $element = getCompiledDirectiveElement($scope);
          textValue = $element.text().trim();
        });

        it('should format with 0 decimals', function() {
          if (isNumberLocaleSupported()) {
            expect(textValue).toEqual('1,235 JPY');
          } else {
            expect(textValue).toEqual('1235 JPY');
          }
        });
      });

      describe('and a 2 decimal currency', function() {
        beforeEach(function() {
          $scope.currency = 'GBP';
          $element = getCompiledDirectiveElement($scope);
          $scope.$apply();
          textValue = $element.text().trim();
        });

        it('should format with 2 decimals', function() {
          if (isNumberLocaleSupported()) {
            expect(textValue).toEqual('1,234.50 GBP');
          } else {
            expect(textValue).toEqual('1234.50 GBP');
          }
        });
      });

      describe('and a 3 decimal currency', function() {
        beforeEach(function() {
          $scope.currency = 'JOD';
          $element = getCompiledDirectiveElement($scope);
          textValue = $element.text().trim();
        });

        it('should format the value with 3 decimals', function() {
          if (isNumberLocaleSupported()) {
            expect(textValue).toEqual('1,234.500 JOD');
          } else {
            expect(textValue).toEqual('1234.500 JOD');
          }
        });
      });
    });

    describe('with a numeric integer string', function() {
      beforeEach(function() {
        $scope.value = '123456';
        $scope.currency = 'GBP';
        $element = getCompiledDirectiveElement($scope);
        $scope.$apply();
        textValue = $element.text().trim();
      });

      it('should format without decimals', function() {
        if (isNumberLocaleSupported()) {
          expect(textValue).toEqual('123,456 GBP');
        } else {
          expect(textValue).toEqual('123456 GBP');
        }
      });
    })

    describe('with a float string', function() {
      beforeEach(function() {
        $scope.value = '1234.5';
      });

      describe('and a 0 decimal currency', function() {
        beforeEach(function() {
          $scope.currency = 'JPY';
          $element = getCompiledDirectiveElement($scope);
          textValue = $element.text().trim();
        });

        it('should format with 0 decimals', function() {
          if (isNumberLocaleSupported()) {
            expect(textValue).toEqual('1,235 JPY');
          } else {
            expect(textValue).toEqual('1235 JPY');
          }
        });
      });

      describe('and a 2 decimal currency', function() {
        beforeEach(function() {
          $scope.currency = 'GBP';
          $element = getCompiledDirectiveElement($scope);
          textValue = $element.text().trim();
        });

        it('should format with 2 decimals', function() {
          if (isNumberLocaleSupported()) {
            expect(textValue).toEqual('1,234.50 GBP');
          } else {
            expect(textValue).toEqual('1234.50 GBP');
          }
        });
      });

      describe('and a 3 decimal currency', function() {
        beforeEach(function() {
          $scope.currency = 'JOD';
          $element = getCompiledDirectiveElement($scope);
          textValue = $element.text().trim();
        });

        it('should format the value with 3 decimals', function() {
          if (isNumberLocaleSupported()) {
            expect(textValue).toEqual('1,234.500 JOD');
          } else {
            expect(textValue).toEqual('1234.500 JOD');
          }
        });
      });
    });
  });

  describe('when es-ES locale supplied', function() {
    beforeEach(function() {
      $scope.locale = 'es-ES';
    });

    describe('with an integer', function() {
      beforeEach(function() {
        $scope.value = 123456;
        $scope.currency = 'GBP';
        $element = getCompiledDirectiveElement($scope);
        textValue = $element.text().trim();
      });

      it('should format without decimals', function() {
        if (isNumberLocaleSupported()) {
          expect(textValue).toEqual('123.456 GBP');
        } else {
          expect(textValue).toEqual('123456 GBP');
        }
      });
    });

    describe('with a float', function() {
      beforeEach(function() {
        $scope.value = 1234.5;
      });

      describe('and a 0 decimal currency', function() {
        beforeEach(function() {
          $scope.currency = 'JPY';
          $element = getCompiledDirectiveElement($scope);
          textValue = $element.text().trim();
        });

        it('should format with 0 decimals', function() {
          if (isNumberLocaleSupported()) {
            expect(textValue).toEqual('1.235 JPY');
          } else {
            expect(textValue).toEqual('1235 JPY');
          }
        });
      });

      describe('and a 2 decimal currency', function() {
        beforeEach(function() {
          $scope.currency = 'GBP';
          $element = getCompiledDirectiveElement($scope);
          textValue = $element.text().trim();
        });

        it('should format with 2 decimals', function() {
          if (isNumberLocaleSupported()) {
            expect(textValue).toEqual('1.234,50 GBP');
          } else {
            expect(textValue).toEqual('1234.50 GBP');
          }
        });
      });

      describe('and a 3 decimal currency', function() {
        beforeEach(function() {
          $scope.currency = 'JOD';
          $element = getCompiledDirectiveElement($scope);
          textValue = $element.text().trim();
        });

        it('should format the value with 3 decimals', function() {
          if (isNumberLocaleSupported()) {
            expect(textValue).toEqual('1.234,500 JOD');
          } else {
            expect(textValue).toEqual('1234.500 JOD');
          }
        });
      });
    });

    describe('with a numeric integer string', function() {
      beforeEach(function() {
        $scope.value = '123456';
        $scope.currency = 'GBP';
        $element = getCompiledDirectiveElement($scope);
        textValue = $element.text().trim();
      });

      it('should format without decimals', function() {
        if (isNumberLocaleSupported()) {
          expect(textValue).toEqual('123.456 GBP');
        } else {
          expect(textValue).toEqual('123456 GBP');
        }
      });
    })

    describe('with a float string', function() {
      beforeEach(function() {
        $scope.value = '1234.5';
      });

      describe('and a 0 decimal currency', function() {
        beforeEach(function() {
          $scope.currency = 'JPY';
          $element = getCompiledDirectiveElement($scope);
          textValue = $element.text().trim();
        });

        it('should format with two decimals', function() {
          if (isNumberLocaleSupported()) {
            expect(textValue).toEqual('1.235 JPY');
          } else {
            expect(textValue).toEqual('1235 JPY');
          }
        });
      });

      describe('and a 2 decimal currency', function() {
        beforeEach(function() {
          $scope.currency = 'GBP';
          $element = getCompiledDirectiveElement($scope);
          textValue = $element.text().trim();
        });

        it('should format with two decimals', function() {
          if (isNumberLocaleSupported()) {
            expect(textValue).toEqual('1.234,50 GBP');
          } else {
            expect(textValue).toEqual('1234.50 GBP');
          }
        });
      });

      describe('and a 3 decimal currency', function() {
        beforeEach(function() {
          $scope.currency = 'JOD';
          $element = getCompiledDirectiveElement($scope);
          textValue = $element.text().trim();
        });

        it('should format the value with 3 decimals', function() {
          if (isNumberLocaleSupported()) {
            expect(textValue).toEqual('1.234,500 JOD');
          } else {
            expect(textValue).toEqual('1234.500 JOD');
          }
        });
      });
    });
  });

  function getCompiledDirectiveElement(scope, template) {
    if (!template) {
      template = " \
        <span>{{ value | twCurrencyFormat : currency : locale }}</span>";
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
