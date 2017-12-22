'use strict';

describe('Phone Number', function() {
  var $compile, $scope, $timeout, element;

  var PREFIX_SELECTOR = 'input[name=phoneNumberPrefix]';
  var PREFIX_SELECT_SELECTOR = 'tw-select[name=phoneNumberPrefix]';
  var NUMBER_SELECTOR = 'input[name=phoneNumber]';
  var COUNTRIES = [
    { callingCode: '44', iso2Code: 'GG', iso3Code: 'ggy', name: 'Guernsey' },
    { callingCode: '44', iso2Code: 'GB', iso3Code: 'gbr', name: 'United Kingdom' },
    { callingCode: '33', iso2Code: 'FR', iso3Code: 'fra', name: 'France' }
  ];
  var ngChangeSpy = jasmine.createSpy('ngChange');

  beforeEach(function() {
    module('tw.styleguide.forms');

    inject(function($injector) {
      var $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $timeout = $injector.get('$timeout');
      $scope = $rootScope.$new();
      $scope.countries = COUNTRIES;
      $scope.ngChange = ngChangeSpy;
    });
  });

  describe('init', function() {
    describe('when empty input $scope is passed', function() {
      beforeEach(function() {
        $scope.ngModel = null;
        element = getCompiledDirectiveElement($scope);
      });
      it('should leave model empty', function() {
        expect($scope.ngModel).toBe(null);
      });
      it('should set prefix control to default value', function() {
        expect(selectedPrefixValue(element)).toEqual(COUNTRIES[0]);
      });
      it('should set number control to empty', function() {
        expect(numberValue(element)).toBe('');
      });
    });
    describe('when phone number model input $scope is passed', function() {
        beforeEach(function() {
          $scope.ngModel = '+44123456789';
          element = getCompiledDirectiveElement($scope);
        });
        it('should set control values correctly', function() {
          expect(selectedPrefixValue(element)).toEqual(COUNTRIES[0]);
          expect(numberValue(element)).toBe('123456789');
        });
        it('should leave number model as it was defined', function() {
          expect($scope.ngModel).toBe('+44123456789');
        });
        it('should return an updated number as a string', function() {
          setNumberUsingControls(element, COUNTRIES[2], '09876543');
          expect(ngChangeSpy).toHaveBeenCalledWith('+3309876543');
        });
    });
    describe('when ngRequired input $scope is passed', function() {
      var ngModelController;
      it('should be $invalid when model is null', function() {
        $scope.ngModel = null;
        $scope.ngRequired = true;
        element = getCompiledDirectiveElement($scope);
        ngModelController = element.controller('ngModel');

        expect(ngModelController.$invalid).toBe(true);
        expect(element.hasClass('ng-valid')).toBe(false);
        expect(element.hasClass('ng-invalid')).toBe(true);
        expect(element.hasClass('ng-invalid-required')).toBe(true);
      });
      it('should be $valid when model is valid date', function() {
        $scope.ngModel = '+44123456789';
        $scope.ngRequired = true;
        element = getCompiledDirectiveElement($scope);
        ngModelController = element.controller('ngModel');

        expect(ngModelController.$valid).toBe(true);
        expect(element.hasClass('ng-valid')).toBe(true);
        expect(element.hasClass('ng-invalid')).toBe(false);
        expect(element.hasClass('ng-invalid-required')).toBe(false);
      });
    });
    describe('when ngDisabled=true', function() {
      it('should be disabled', function() {
        $scope.ngModel = null;
        $scope.ngDisabled = true
        element = getCompiledDirectiveElement($scope);
        expect(element.find(PREFIX_SELECTOR).attr('disabled')).toBeDefined();
        expect(element.find(NUMBER_SELECTOR).attr('disabled')).toBeDefined();
      });
    });
    describe('when ngDisabled=false', function() {
      it('should not be disabled', function() {
        $scope.ngModel = null;
        $scope.ngDisabled = false;
        element = getCompiledDirectiveElement($scope);
        expect(element.find(PREFIX_SELECTOR).attr('disabled')).not.toBeDefined();
        expect(element.find(NUMBER_SELECTOR).attr('disabled')).not.toBeDefined();
      });
    });
  });

  describe('onChanges watchers', function() {
    describe('ngModel', function() {
      var $prefixInput, $numberInput, prefixModelController;

      beforeEach(function() {
        $scope.ngModel = '+44123456789';
        element = getCompiledDirectiveElement($scope);
        $prefixInput = element.find(PREFIX_SELECTOR);
        $numberInput = element.find(NUMBER_SELECTOR);
      });
      it('should re-explode model correctly if new model is valid', function() {
        $scope.ngModel = '+33987654321';
        $scope.$digest();

        expect(selectedPrefixValue(element)).toEqual(COUNTRIES[2]);
        expect(numberValue(element)).toBe('987654321');
      });
      it('should not re-explode model if new model is not a string', function() {
        $scope.ngModel = 1234;
        $scope.$digest();

        expect(selectedPrefixValue(element)).toEqual(COUNTRIES[0]);
        expect(numberValue(element)).toBe('123456789');
      });
      it('should not re-explode model if new model is not starting with a +', function() {
        $scope.ngModel = '12345';
        $scope.$digest();

        expect(selectedPrefixValue(element)).toEqual(COUNTRIES[0]);
        expect(numberValue(element)).toBe('123456789');
      });
      it('should not re-explode model if new model is shorter than 4', function() {
        $scope.ngModel = '1234';
        $scope.$digest();

        expect(selectedPrefixValue(element)).toEqual(COUNTRIES[0]);
        expect(numberValue(element)).toBe('123456789');
      });
    });
    describe('ngRequired', function() {
      var $prefixSelect, $numberInput;
      beforeEach(function() {
        $scope.ngModel = null;
        $scope.ngRequired = true;
        element = getCompiledDirectiveElement($scope);
        $prefixSelect = element.find(PREFIX_SELECT_SELECTOR);
        $numberInput = element.find(NUMBER_SELECTOR);
      });
      it('should require controls', function() {
        expect($prefixSelect.attr('required')).toBe('required');
        expect($numberInput.is(':required')).toBe(true);
      });

      it('should not require controls on change', function() {
        $scope.ngRequired = false;
        $scope.$digest();

        expect($prefixSelect.is(':required')).toBe(false);
        expect($numberInput.is(':required')).toBe(false);
      });
    });
    describe('ngDisabled', function() {
      var $prefixInput, $numberInput;
      beforeEach(function() {
        $scope.ngModel = null;
        $scope.ngDisabled = true;
        element = getCompiledDirectiveElement($scope);
        $prefixInput = element.find(PREFIX_SELECTOR);
        $numberInput = element.find(NUMBER_SELECTOR);
      });
      it('should disable controls', function() {
        expect($prefixInput.is(':disabled')).toBe(true);
        expect($numberInput.is(':disabled')).toBe(true);
      });
      it('should enable controls on change', function() {
        $scope.ngDisabled = false;
        $scope.$digest();

        expect($prefixInput.is(':disabled')).toBe(false);
        expect($numberInput.is(':disabled')).toBe(false);
      });
    });
  });

  describe('user interactions', function() {
    var element, $prefixSelect, $numberInput;

    beforeEach(function() {
      $scope.ngModel = '+44123456789';
      element = getCompiledDirectiveElement($scope);

      $prefixSelect = element.find(PREFIX_SELECT_SELECTOR);
      $numberInput = element.find(NUMBER_SELECTOR);
    });

    describe('with prefix select', function() {
      it('should update prefix and ngModel', function() {
        simulatePrefixSelection(element, 2);
        expect(ngChangeSpy).toHaveBeenCalledWith('+33123456789');
      });
      it('should update touched status on change', function() {
        $prefixSelect[0].dispatchEvent(new CustomEvent('blur'));
        simulatePrefixSelection($prefixSelect, 1);
        expect($prefixSelect.hasClass('ng-touched')).toBe(true);
      });
      it('should update pristine status on change', function() {
        simulatePrefixSelection(element, 1);
        expect($prefixSelect.hasClass('ng-pristine')).toBe(false);
      });
    });

    describe('with localNumber input', function() {
      it('should update localNumber and ngModel', function() {
        $numberInput.val('987654321').triggerHandler('input');
        expect(ngChangeSpy).toHaveBeenCalledWith('+44987654321');
      });
      it('should update touched status on blur', function() {
        $numberInput[0].dispatchEvent(new CustomEvent('blur'));
        expect($numberInput.hasClass('ng-touched')).toBe(true);
      });
      it('should update pristine status on change', function() {
        $numberInput.val('987654321').triggerHandler('input');
        expect($numberInput.hasClass('ng-pristine')).toBe(false);
      });
      it('should ignore localNumber part of the model when invalid', function() {
        $numberInput.val('abc').triggerHandler('input');
        expect(ngChangeSpy).toHaveBeenCalledWith('+44');
      });
    });

    function simulatePrefixSelection(element, index) {
      element.find('tw-select').triggerHandler('click');

      var dropdown = element.find('.dropdown-menu');
      dropdown.find('a')[index].click();
      $timeout.flush();
    };
  });

  function setNumberUsingControls(element, prefix, number) {
    try {
      var prefixModelController = element.find(PREFIX_SELECTOR).controller('ngModel');
      prefixModelController.$setViewValue(prefix);
      element.find(NUMBER_SELECTOR).val(number).trigger('input');
    } catch(ex) {
      console.log(ex.message);
    }
  }

  function selectedPrefixValue(element) {
    return element.find(PREFIX_SELECTOR).controller('ngModel').$viewValue;
  }

  function numberValue(element) {
    return element.find(NUMBER_SELECTOR).val();
  }

  function getCompiledDirectiveElement(scope, template) {
    if (!template) {
      template = " \
        <tw-phone-number \
          countries='countries' \
          ng-model='ngModel' \
          ng-required='ngRequired' \
          ng-disabled='ngDisabled' \
          ng-change='ngChange(newNumber)' \
        ></tw-phone-number>";
    }

    var element = angular.element(template);
    var compiledElement = $compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }

  function getViewModel(element) {
    return element.isolateScope().$ctrl;
  }
});
