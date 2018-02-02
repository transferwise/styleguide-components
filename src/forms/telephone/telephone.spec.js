'use strict';

fdescribe('Telephone', function() {
  var $compile, $scope, $timeout, element, select, input;

  var PREFIX_SELECTOR = 'input[name=phoneNumberPrefix]';
  var PREFIX_SELECT_SELECTOR = 'tw-select[name=phoneNumberPrefix]';
  var NUMBER_SELECTOR = 'input[name=phoneNumber]';

  var ngChangeSpy = jasmine.createSpy('ngChange');

  beforeEach(function() {
    module('tw.styleguide.forms');

    inject(function($injector) {
      var $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $timeout = $injector.get('$timeout');
      $scope = $rootScope.$new();
      $scope.ngChange = ngChangeSpy;
    });
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

    describe('when phone number model input $scope is passed', function() {
      beforeEach(function() {
        $scope.ngModel = '+44123456789';
        element = getCompiledDirectiveElement($scope);
        input = element.querySelector(NUMBER_SELECTOR);
        select = element.querySelector(PREFIX_SELECT_SELECTOR);
      });
      it('should set control values correctly', function() {
        expect(getSelectValue(select)).toEqual("+44");
        expect(input.value).toBe('123456789'); // Format is **** *** ***
      });
      it('should leave number model as it was defined', function() {
        expect($scope.ngModel).toBe('+44123456789');
      });
      it('should return an updated number as a string', function() {
        setNumberUsingControls(select, input, "+33", '09876543');
        expect(ngChangeSpy).toHaveBeenCalledWith('+3309876543');
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
  });

  describe('onChanges watchers', function() {
    describe('ngModel', function() {
      beforeEach(function() {
        $scope.ngModel = '+44123456789';
        element = getCompiledDirectiveElement($scope);
        select = element.querySelector(PREFIX_SELECTOR);
        input = element.querySelector(NUMBER_SELECTOR);
      });
      it('should re-explode model correctly if new model is valid', function() {
        $scope.ngModel = '+33987654321';
        $scope.$digest();

        expect(getSelectValue(select)).toEqual("+33");
        expect(input.value).toBe('987654321');
      });
      it('should not re-explode model if new model is not a string', function() {
        $scope.ngModel = 1234;
        $scope.$digest();

        expect(getSelectValue(select)).toEqual("+44");
        expect(input.value).toBe('123456789');
      });
      it('should not re-explode model if new model is not starting with a +', function() {
        $scope.ngModel = '12345';
        $scope.$digest();

        expect(getSelectValue(select)).toEqual("+44");
        expect(input.value).toBe('123456789');
      });
      it('should not re-explode model if new model is shorter than 4', function() {
        $scope.ngModel = '1234';
        $scope.$digest();

        expect(getSelectValue(select)).toEqual("+44");
        expect(input.value).toBe('123456789');
      });
    });

    describe('ngRequired', function() {
      beforeEach(function() {
        $scope.ngModel = null;
        $scope.ngRequired = true;
        element = getCompiledDirectiveElement($scope);
        select = element.querySelector(PREFIX_SELECT_SELECTOR);
        input = element.querySelector(NUMBER_SELECTOR);
      });
      it('should require controls', function() {
        expect(select.hasAttribute('required')).toBe(true);
        expect(input.hasAttribute('required')).toBe(true);
      });
      it('should not require controls on change', function() {
        $scope.ngRequired = false;
        $scope.$digest();

        expect(select.hasAttribute('required')).toBe(false);
        expect(input.hasAttribute('required')).toBe(false);
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

    describe('with prefix select', function() {
      it('should update prefix and ngModel', function() {
        setSelectValue(select, "+33");
        expect(ngChangeSpy).toHaveBeenCalledWith('+33123456789');
      });
      it('should update touched status on blur', function() {
        select.dispatchEvent(new CustomEvent('blur'));
        expect(select.classList).toContain('ng-touched');
      });
      it('should update pristine status on change', function() {
        setSelectValue(select, "+1");
        expect(select.classList).not.toContain('ng-pristine');
        expect(select.classList).toContain('ng-dirty');
      });
    });

    describe('with localNumber input', function() {
      it('should update localNumber and ngModel', function() {
        input.value = '987654321'
        dispatchEvent(input, 'input');
        expect(ngChangeSpy).toHaveBeenCalledWith('+44987654321');
      });
      it('should update touched status on blur', function() {
        dispatchEvent(input, 'blur');
        expect(input.classList).toContain('ng-touched');
      });
      it('should update pristine status on change', function() {
        input.value = '987654321';
        dispatchEvent(input, 'input');
        expect(input.classList).not.toContain('ng-pristine');
        expect(input.classList).toContain('ng-dirty');
      });
      it('should ignore localNumber part of the model when invalid', function() {
        input.value = 'abc';
        dispatchEvent(input, 'input');
        expect(ngChangeSpy).toHaveBeenCalledWith('+44');
      });
    });
  });

  function setNumberUsingControls(select, input, prefix, number) {
    try {
      angular.element(select).controller('ngModel').$setViewValue(prefix);
      input.value = number;
      dispatchEvent(input, 'input');
    } catch(ex) {
      console.log(ex.message);
    }
  }

  function setSelectValue(select, value) {
    angular.element(select).controller('ngModel').$setViewValue(value);
    //select.click();
    //var dropdownLinks = element.querySelector('.dropdown-menu a');
    //dropdownLinks[index].dispatchEvent(new CustomEvent('click'));
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
          ng-change='ngChange(newNumber)' \
          ng-focus='ngFocus()' \
          ng-blur='ngBlur()' \
          locale='locale' \
        ></tw-telephone>";
    }

    var element = angular.element(template);
    var compiledElement = $compile(element)(scope);
    scope.$digest();
    return compiledElement[0];
  }
});
