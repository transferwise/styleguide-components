'use strict';

describe('Telephone', function() {
  var $compile, $scope, $timeout, element, select, input;

  var PREFIX_SELECTOR = 'input[name=phoneNumberPrefix]';
  var PREFIX_SELECT_SELECTOR = 'tw-select[name=phoneNumberPrefix]';
  var NUMBER_SELECTOR = 'input[name=phoneNumber]';

  beforeEach(function() {
    module('tw.styleguide.forms');

    inject(function($injector) {
      var $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $timeout = $injector.get('$timeout');
      $scope = $rootScope.$new();
    });

    $scope.ngChange = jasmine.createSpy('ngChange');
    $scope.ngFocus = jasmine.createSpy('ngFocus');
    $scope.ngBlur = jasmine.createSpy('ngBlur');
  });

  describe('init', function() {
    describe('when empty input $scope is passed', function() {
      beforeEach(function() {
        $scope.ngModel = null;
        element = getCompiledDirectiveElement($scope);
        input = element.querySelector(NUMBER_SELECTOR);
        select = element.querySelector(PREFIX_SELECT_SELECTOR);
      });
      it('should leave model empty', function() {
        expect($scope.ngModel).toBe(null);
      });
      it('should set prefix control to default value', function() {
        expect(getSelectValue(select)).toEqual("+44");
      });
      it('should set number control to empty', function() {
        expect(input.value).toBe('');
      });
    });

    describe('when a valid model is passed', function() {
      beforeEach(function() {
        $scope.ngModel = '+44123456789';
        element = getCompiledDirectiveElement($scope);
        input = element.querySelector(NUMBER_SELECTOR);
        select = element.querySelector(PREFIX_SELECT_SELECTOR);
      });
      it('should set control values correctly', function() {
        expect(getSelectValue(select)).toEqual("+44");
        expect(input.value).toBe('123456789');
      });
      it('should leave number model as it was defined', function() {
        expect($scope.ngModel).toBe('+44123456789');
      });
      it('should trigger the change handler', function() {
        setNumberUsingControls(select, input, "+33", '09876543');
        expect($scope.ngChange).toHaveBeenCalledWith(undefined);
      });
    });

    describe('when a model is passed that could match more than one prefix', function() {
      beforeEach(function() {
        $scope.ngModel = '+1868123456789';
        element = getCompiledDirectiveElement($scope);
        input = element.querySelector(NUMBER_SELECTOR);
        select = element.querySelector(PREFIX_SELECT_SELECTOR);
      });
      it('should match the longest prefix', function() {
        expect(getSelectValue(select)).toEqual("+1868");
        expect(input.value).toBe('123456789');
      });
    });

    describe('when a model is passed with no matching prefix', function() {
      beforeEach(function() {
        $scope.ngModel = '+999123456789';
        element = getCompiledDirectiveElement($scope);
        input = element.querySelector(NUMBER_SELECTOR);
        select = element.querySelector(PREFIX_SELECT_SELECTOR);
      });
      it('should empty the select', function() {
        expect(getSelectValue(select)).toEqual("");
      });
      it('should put the whole value in the input without the plus', function() {
        expect(input.value).toBe('999123456789');
      });
    });

    describe('when ngRequired input $scope is passed', function() {
      it('should be $invalid when model is null', function() {
        $scope.ngModel = null;
        $scope.ngRequired = true;
        element = getCompiledDirectiveElement($scope);

        expect(element.classList).not.toContain('ng-valid');
        expect(element.classList).toContain('ng-invalid');
        expect(element.classList).toContain('ng-invalid-required');
      });
      it('should be $valid when model is valid date', function() {
        $scope.ngModel = '+44123456789';
        $scope.ngRequired = true;
        element = getCompiledDirectiveElement($scope);

        expect(element.classList).toContain('ng-valid');
        expect(element.classList).not.toContain('ng-invalid');
        expect(element.classList).not.toContain('ng-invalid-required');
      });
    });

    describe('when ngDisabled == true', function() {
      it('should be disabled', function() {
        $scope.ngModel = null;
        $scope.ngDisabled = true
        element = getCompiledDirectiveElement($scope);

        expect(element.querySelector(PREFIX_SELECTOR).hasAttribute('disabled')).toBe(true);
        expect(element.querySelector(NUMBER_SELECTOR).hasAttribute('disabled')).toBe(true);
      });
    });

    describe('when ngDisabled == false', function() {
      it('should not be disabled', function() {
        $scope.ngModel = null;
        $scope.ngDisabled = false;
        element = getCompiledDirectiveElement($scope);

        expect(element.querySelector(PREFIX_SELECTOR).hasAttribute('disabled')).toBe(false);
        expect(element.querySelector(NUMBER_SELECTOR).hasAttribute('disabled')).toBe(false);
      });
    });

    describe('when a locale is supplied', function() {
      describe('along with a value', function() {
        it('should use the prefix of the supplied value', function() {
          $scope.ngModel = '+12345678';
          $scope.locale = 'es-ES';
          element = getCompiledDirectiveElement($scope);
          select = element.querySelector(PREFIX_SELECTOR);

          expect(getSelectValue(select)).toBe("+1");
        });
      });
      describe('without a value', function() {
        it('should default the prefix to the local country', function() {
          $scope.ngModel = null;
          $scope.locale = 'es-ES';
          element = getCompiledDirectiveElement($scope);
          select = element.querySelector(PREFIX_SELECTOR);

          expect(getSelectValue(select)).toBe("+34");
        });
      });
      describe('with an incorrect value', function() {
        it('should default to +44 (UK)', function() {
          $scope.ngModel = null;
          $scope.locale = 'xx-XX';
          element = getCompiledDirectiveElement($scope);
          select = element.querySelector(PREFIX_SELECTOR);

          expect(getSelectValue(select)).toBe("+44");
        });
      });
    });
  });

  describe('onChanges watchers', function() {
    describe('ngModel', function() {
      beforeEach(function() {
        $scope.ngModel = '+44123456789';
        element = getCompiledDirectiveElement($scope);
        select = element.querySelector(PREFIX_SELECTOR);
        input = element.querySelector(NUMBER_SELECTOR);
      });
      describe('when a valid string', function() {
        it('should re-explode model correctly', function() {
          $scope.ngModel = '+33987654321';
          $scope.$digest();

          expect(getSelectValue(select)).toEqual("+33");
          expect(input.value).toBe('987654321');
        });
      });
      describe('when not a string', function() {
        it('should not re-explode model', function() {
          $scope.ngModel = 1234;
          $scope.$digest();

          expect(getSelectValue(select)).toEqual("+44");
          expect(input.value).toBe('123456789');
        });
      });
      describe('when an invalid string', function() {
        // TODO should this be more permissive for bad old data?
        it('should not re-explode model', function() {
          $scope.ngModel = '12345';
          $scope.$digest();

          expect(getSelectValue(select)).toEqual("+44");
          expect(input.value).toBe('123456789');

          $scope.ngModel = '+123';
          $scope.$digest();

          expect(getSelectValue(select)).toEqual("+44");
          expect(input.value).toBe('123456789');
        });
      });
    });

    describe('ngDisabled', function() {
      beforeEach(function() {
        $scope.ngModel = null;
        $scope.ngDisabled = true;
        element = getCompiledDirectiveElement($scope);
        select = element.querySelector(PREFIX_SELECTOR);
        input = element.querySelector(NUMBER_SELECTOR);
      });
      it('should disable controls', function() {
        expect(select.hasAttribute('disabled')).toBe(true);
        expect(input.hasAttribute('disabled')).toBe(true);
      });
      it('should enable controls on change', function() {
        $scope.ngDisabled = false;
        $scope.$digest();

        expect(select.hasAttribute('disabled')).toBe(false);
        expect(input.hasAttribute('disabled')).toBe(false);
      });
    });
  });

  describe('user interactions', function() {
    beforeEach(function() {
      $scope.ngModel = '+44123456789';
      element = getCompiledDirectiveElement($scope);

      select = element.querySelector(PREFIX_SELECT_SELECTOR);
      input = element.querySelector(NUMBER_SELECTOR);
    });

    describe('with the select', function() {
      describe('when changed', function() {
        beforeEach(function() {
          setSelectValue(select, "+33");
        })
        it('should update the model', function() {
          expect($scope.ngModel).toBe('+33123456789');
        });
        it('should trigger the change handler', function() {
          expect($scope.ngChange).toHaveBeenCalledWith(undefined);
        });
        it('should update pristine status', function() {
          expect(select.classList).not.toContain('ng-pristine');
          expect(select.classList).toContain('ng-dirty');
        });
      });

      describe('when focussed', function() {
        beforeEach(function() {
          dispatchEvent(select, 'focus');
        });
        it('should trigger the focus handler', function() {
          expect($scope.ngFocus).toHaveBeenCalledWith();
        });
      });

      describe('when blurred', function() {
        beforeEach(function() {
          dispatchEvent(select, 'blur');
        });
        it('should trigger the blur handler', function() {
          expect($scope.ngBlur).toHaveBeenCalledWith();
        });
        it('should update touched status', function() {
          expect(select.classList).toContain('ng-touched');
        });
      });
    });

    describe('with the input', function() {
      describe('when changed', function() {
        beforeEach(function() {
          setInputValue(input, '987654321');
        })
        it('should update the model', function() {
          expect($scope.ngModel).toBe('+44987654321');
        });
        it('should trigger the change handler', function() {
          expect($scope.ngChange).toHaveBeenCalledWith(undefined);
        });
        it('should update pristine status on change', function() {
          expect(input.classList).not.toContain('ng-pristine');
          expect(input.classList).toContain('ng-dirty');
        });
      });

      describe('when changed to a value with special characters', function() {
        beforeEach(function() {
          setInputValue(input, '9-87 654.321');
        });
        it('should strip the special characters from the model', function() {
          expect($scope.ngModel).toBe('+44987654321');
        });
      });

      describe('when focussed', function() {
        beforeEach(function() {
          dispatchEvent(input, 'focus');
        });
        it('should trigger the focus handler', function() {
          expect($scope.ngFocus).toHaveBeenCalledWith();
        });
      });

      describe('when blurred', function() {
        beforeEach(function() {
          dispatchEvent(input, 'blur');
        });
        it('should trigger the blur handler', function() {
          expect($scope.ngBlur).toHaveBeenCalledWith();
        });
        it('should update touched status', function() {
          expect(input.classList).toContain('ng-touched');
        });
      });

      describe('when invalid', function() {
        beforeEach(function() {
          setInputValue(input, 'abc');
        });
        it('should return an undefined model', function() {
          expect($scope.ngModel).toBeUndefined();
        });
        it('should call the change handler', function() {
          expect($scope.ngChange).toHaveBeenCalledWith(undefined);
        });
        it('should leave the prefix as is', function() {
          expect(getSelectValue(select)).toBe('+44');
        });
      });
    });
  });

  function setNumberUsingControls(select, input, prefix, number) {
    try {
      setSelectValue(select, prefix);
      setInputValue(input, number);
    } catch(ex) {
      console.log(ex.message);
    }
  }

  function setInputValue(input, value) {
    input.value = value;
    dispatchEvent(input, 'input');
  }

  function setSelectValue(select, value) {
    angular.element(select).controller('ngModel').$setViewValue(value);
    $timeout.flush();
  }

  function getSelectValue(select) {
    return angular.element(select).controller('ngModel').$viewValue;
  }

  function dispatchEvent(element, type) {
    element.dispatchEvent(new CustomEvent(type));
  }

  function getCompiledDirectiveElement(scope, template) {
    if (!template) {
      template = " \
        <tw-telephone \
          ng-model='ngModel' \
          ng-required='ngRequired' \
          ng-disabled='ngDisabled' \
          ng-change='ngChange(number)' \
          ng-focus='ngFocus()' \
          ng-blur='ngBlur()' \
          locale='{{ locale }}' \
        ></tw-telephone>";
    }

    var element = angular.element(template);
    var compiledElement = $compile(element)(scope);
    scope.$digest();
    return compiledElement[0];
  }
});
