'use strict';

describe('Given a telephone number component', function() {
  var $compile, $scope, $timeout, component, select, input;

  var PREFIX_SELECTOR = 'input[name=phoneNumberPrefix]';
  var PREFIX_SELECT_SELECTOR = 'tw-select[name=phoneNumberPrefix]';
  var NUMBER_SELECTOR = 'input[name=phoneNumber]';

  beforeEach(function() {
    angular.mock.module('tw.styleguide.forms.telephone');

    angular.mock.inject(function($injector) {
      var $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $timeout = $injector.get('$timeout');
      $scope = $rootScope.$new();
    });

    $scope.ngChange = jasmine.createSpy('ngChange');
    $scope.ngFocus = jasmine.createSpy('ngFocus');
    $scope.ngBlur = jasmine.createSpy('ngBlur');

    component = getComponent($scope);
    input = component.querySelector(NUMBER_SELECTOR);
    select = component.querySelector(PREFIX_SELECT_SELECTOR);
  });

  describe('when initialised without a model', function() {
    it('should leave model undefined', function() {
      expect($scope.ngModel).toBeUndefined();
    });
    it('should set prefix control to default UK value', function() {
      expect(getSelectValue(select)).toEqual("+44");
    });
    it('should set number control to empty', function() {
      expect(input.value).toBe('');
    });
    it('should not trigger change handler', function() {
      expect($scope.ngChange).not.toHaveBeenCalled();
    });
    it('should not trigger focus handler', function() {
      expect($scope.ngFocus).not.toHaveBeenCalled();
    });
    it('should not trigger blur handler', function() {
      expect($scope.ngBlur).not.toHaveBeenCalled();
    });
    it('should not disable the select', function() {
      expect(select.hasAttribute('disabled')).toBe(false);
    });
    it('should not disable the input', function() {
      expect(input.hasAttribute('disabled')).toBe(false);
    });
  });

  describe('when a valid model is supplied', function() {
    beforeEach(function() {
      $scope.ngModel = '+44123456789';
      $scope.$apply();
    });
    it('should set control values correctly', function() {
      expect(getSelectValue(select)).toEqual("+44");
      expect(input.value).toBe('123456789');
    });
    it('should leave number model as it was defined', function() {
      expect($scope.ngModel).toBe('+44123456789');
    });
  });

  describe('when a model is supplied that could match more than one prefix', function() {
    beforeEach(function() {
      $scope.ngModel = '+1868123456789';
      $scope.$apply();
    });
    it('should set the select to the longest matching prefix', function() {
      expect(getSelectValue(select)).toEqual("+1868");
    });
    it('should set the number input to the rest of the number', function() {
      expect(input.value).toBe('123456789');
    });
  });

  describe('when a model is supplied with no matching prefix', function() {
    beforeEach(function() {
      $scope.ngModel = '+999123456789';
      $scope.$apply();
    });
    it('should empty the select', function() {
      expect(getSelectValue(select)).toEqual("");
    });
    it('should put the whole value in the input without the plus', function() {
      expect(input.value).toBe('999123456789');
    });
  });

  describe('when a model is supplied without a prefix', function() {
    beforeEach(function() {
      $scope.ngModel = '+44123456789';
      $scope.$apply();

      $scope.ngModel = '12345';
      $scope.$digest();
    });
    it('should not re-explode model', function() {
      expect(getSelectValue(select)).toEqual("+44");
      expect(input.value).toBe('123456789');
    });
  });

  describe('when a non-string model is supplied', function() {
    beforeEach(function() {
      $scope.ngModel = '+44123456789';
      $scope.$apply();

      $scope.ngModel = 1234;
      $scope.$digest();
    });
    it('should not re-explode model', function() {
      expect(getSelectValue(select)).toEqual("+44");
      expect(input.value).toBe('123456789');
    });
  });

  describe('when an invalid model is supplied', function() {
    beforeEach(function() {
      $scope.ngModel = '+44123456789';
      $scope.$apply();

      $scope.ngModel = '+123';
      $scope.$digest();
    });
    it('should not re-explode model', function() {
      expect(getSelectValue(select)).toEqual("+44");
      expect(input.value).toBe('123456789');
    });
  });

  describe('when the select is focussed', function() {
    beforeEach(function() {
      $scope.ngModel = '+44123456789';
      $scope.$apply();
      dispatchEvent(select, 'focus');
    });

    it('should trigger the focus handler', function() {
      expect($scope.ngFocus).toHaveBeenCalledWith();
    });

    describe('and then changed', function() {
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

    describe('and then is blurred', function() {
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

  describe('when the input is focussed', function() {
    beforeEach(function() {
      $scope.ngModel = '+44123456789';
      $scope.$apply();
      dispatchEvent(input, 'focus');
    });

    it('should trigger the focus handler', function() {
      expect($scope.ngFocus).toHaveBeenCalledWith();
    });

    describe('and then changed to a valid number', function() {
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

    describe('and then changed to a value with special characters', function() {
      beforeEach(function() {
        setInputValue(input, '9-87 654.321');
      });
      it('should strip the special characters from the model', function() {
        expect($scope.ngModel).toBe('+44987654321');
      });
    });

    describe('and changed to an invalid value', function() {
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

    describe('and then blurred', function() {
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
  });

  describe('when ngRequired is true', function() {
    beforeEach(function() {
      $scope.ngRequired = true;
    });

    describe('and model is not set', function() {
      beforeEach(function() {
        $scope.ngModel = null;
        $scope.$apply();
      });
      it('should be $invalid', function() {
        expect(component.classList).not.toContain('ng-valid');
        expect(component.classList).toContain('ng-invalid');
        expect(component.classList).toContain('ng-invalid-required');
      });
    });

    describe('and the model is valid', function() {
      beforeEach(function() {
        $scope.ngModel = '+44123456789';
        $scope.$apply();
      });
      it('should be $valid', function() {
        expect(component.classList).toContain('ng-valid');
        expect(component.classList).not.toContain('ng-invalid');
        expect(component.classList).not.toContain('ng-invalid-required');
      });
    });
  });

  describe('when ngDisabled is true', function() {
    beforeEach(function() {
      $scope.ngDisabled = true
      $scope.$apply();
    });

    it('should disable the select', function() {
      expect(select.hasAttribute('disabled')).toBe(true);
    });
    it('should disable the input', function() {
      expect(input.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('when supplied with a locale', function() {
    describe('and a value', function() {
      beforeEach(function() {
        $scope.ngModel = '+12345678';
        $scope.locale = 'es-ES';
        $scope.$apply();
      });
      it('should use the prefix of the supplied value', function() {
        expect(getSelectValue(select)).toBe("+1");
      });
    });

    describe('and no value', function() {
      beforeEach(function() {
        $scope.ngModel = null;
        $scope.locale = 'es-ES';
        $scope.$apply();
      });
      it('should default the prefix to the local country', function() {
        expect(getSelectValue(select)).toBe("+34");
      });
    });

    describe('that is incorrect and no value', function() {
      beforeEach(function() {
        $scope.ngModel = null;
        $scope.locale = 'xx-XX';
        $scope.$apply();
      });
      it('should default to +44 (UK)', function() {
        expect(getSelectValue(select)).toBe("+44");
      });
    });
  });

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

  function getComponent($scope) {
    var template = " \
      <tw-telephone \
        ng-model='ngModel' \
        ng-required='ngRequired' \
        ng-disabled='ngDisabled' \
        ng-change='ngChange(number)' \
        ng-focus='ngFocus()' \
        ng-blur='ngBlur()' \
        locale='{{ locale }}' \
      ></tw-telephone>";

    var $template = angular.element(template);
    var $component = $compile($template)($scope);
    $scope.$digest();
    return $component[0];
  }
});
