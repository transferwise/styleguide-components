'use strict';

describe('Field', function() {
  var $compile,
      $rootScope,
      $scope,
      element;

  beforeEach(module('tw.styleguide-components'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();
    $scope.model;
    $scope.onChange = function () {};
    $scope.onFocus = function () {};
    $scope.onBlur = function () {};

    spyOn($scope, 'onChange');
    spyOn($scope, 'onFocus');
    spyOn($scope, 'onBlur');
  }));

  describe('when given a name for the field', function() {
    beforeEach(function() {
      $scope.options = { key: "keyName", name: "Control label", type: "string" };
      element = getCompiledDirectiveElement();
    });

    it('should render a control label', function() {
      expect(element.querySelector('label').innerText.trim()).toBe('Control label')
    });
  });

  describe('when given type:string', function() {
    describe('and no format', function() {
      beforeEach(function() {
        $scope.options = { key: "keyName", type: "string" };
        element = getCompiledDirectiveElement();
      });

      it('should render a text input', function() {
        expect(element.querySelector('input[type=text]')).toBeTruthy();
      });
    });

    describe('and date format', function() {
      beforeEach(function() {
        $scope.options = { key: "keyName", type: "string", format: "date" };
        element = getCompiledDirectiveElement();
      });

      it('should render a date control', function() {
        expect(element.querySelector('tw-date')).toBeTruthy();
      });
    });

    describe('and password format', function() {
      beforeEach(function() {
        $scope.options = { key: "keyName", type: "string", format: "password" };
        element = getCompiledDirectiveElement();
      });

      it('should render a password control', function() {
        expect(element.querySelector('input[type=password]')).toBeTruthy();
      });
    });

    describe('and base64url format', function() {
      beforeEach(function() {
        $scope.options = { key: "keyName", type: "string", format: "base64url" };
        element = getCompiledDirectiveElement();
      });

      it('should render a password control', function() {
        expect(element.querySelector('tw-upload')).toBeTruthy();
      });
    });
  });

  describe('when given type:number', function() {
    beforeEach(function() {
      $scope.options = { key: "keyName", type: "number" };
      element = getCompiledDirectiveElement();
    });

    it('should render a number input', function() {
      expect(element.querySelector('input[type=number]')).toBeTruthy();
    });
  });

  describe('when given type:boolean', function() {
    beforeEach(function() {
      $scope.options = { key: "keyName", type: "boolean" };
      element = getCompiledDirectiveElement();
    });

    it('should render a checkbox', function() {
      expect(element.querySelector('tw-checkbox')).toBeTruthy();
    });
  });

  describe('when the model already contains a value', function() {
    beforeEach(function() {
      $scope.options = { key: "keyName", type: "string" };
      $scope.model = 'supplied value';
      element = getCompiledDirectiveElement();
    });

    it('should render that value in the control', function() {
      expect(element.querySelector('input').value).toBe('supplied value');
    });
  });

  describe('when given an error message', function() {
    beforeEach(function() {
      $scope.options = { key: "keyName", type: "string" };
      $scope.errorMessage = 'Custom error';
      element = getCompiledDirectiveElement();
    });

    it('should render in an error state', function() {
      expect(element.querySelector('.form-group').classList.contains('has-error')).toBe(true);
    });

    it('should render the message', function() {
      expect(element.querySelector('.error-provided').innerText.trim()).toBe('Custom error');
    });
  });

  describe('when the control is focused', function() {
    beforeEach(function() {
      $scope.options = { key: "keyName", type: "string"};
      element = getCompiledDirectiveElement();
      element.querySelector('input').dispatchEvent(new Event('focus'));
    });

    it('should trigger the onFocus handler', function() {
      expect($scope.onFocus).toHaveBeenCalled();
    });
  });

  describe('when the control value changes', function() {
    beforeEach(function() {
      $scope.options = { key: "keyName", type: "string" };
      $scope.errorMessage = 'Custom error';
      element = getCompiledDirectiveElement();
      element.querySelector('input').value = 'changed';
      element.querySelector('input').dispatchEvent(new Event('input'));
    });

    it('should update the model', function() {
      expect($scope.model).toBe('changed');
    });

    it('should hide custom error message', function() {
      expect(element.querySelector('.error-provided')).toBeFalsy();
    });

    it('should remove custom error state', function() {
      expect(element.querySelector('.form-group').classList.contains('has-error')).toBe(false);
    });

    it('should trigger the onChange handler', function() {
      expect($scope.onChange).toHaveBeenCalled();
    });
  });

  describe('when the control is blurred', function() {
    beforeEach(function() {
      $scope.options = { key: "keyName", type: "string"};
      $scope.errorMessage = 'Custom error';
      element = getCompiledDirectiveElement();
      element.querySelector('input').dispatchEvent(new Event('blur'));
    });

    it('should trigger the onBlur handler', function() {
      expect($scope.onBlur).toHaveBeenCalled();
    });

    it('should not hide the custom error message', function() {
      expect(element.querySelector('.error-provided')).toBeTruthy();
    });
  });

  describe('when given legacy types', function() {
    var legacyTypes = {
      "text": "input[type=text]",
      "password": "input[type=password]",
      "date": "tw-date",
      "upload": "tw-upload",
      "checkbox": "tw-checkbox",
      "select": "tw-select",
      "radio": "tw-radio"
    };

    Object.keys(legacyTypes).forEach(function(type) {
      describe(type, function() {
        beforeEach(function() {
          if (type === 'radio') {
            // Radio won't render unless it has values
            $scope.options = { key: "keyName", type: type, valuesAllowed: [{value: 1}] };
          } else {
            $scope.options = { key: "keyName", type: type };
          }
          element = getCompiledDirectiveElement();
        });
        it('should render the correct control', function() {
          expect(element.querySelector(legacyTypes[type])).toBeTruthy();
        });
      });
    })

    describe('in sub groups', function() {
      Object.keys(legacyTypes).forEach(function(type) {
        describe(type, function() {
          beforeEach(function() {
            if (type === 'radio') {
              // Radio won't render unless it has values
              $scope.options = { group: [{ key: "keyName", type: type, valuesAllowed: [{value: 1}] }] };
            } else {
              $scope.options = { group: [{ key: "keyName", type: type }] };
            }
            element = getCompiledDirectiveElement();
          });
          it('should render the correct control', function() {
            expect(element.querySelector(legacyTypes[type])).toBeTruthy();
          });
        });
      })
    });
  });

  // TODO values types
  // TODO validation
  // TODO help information
  // TODO display formats

  function getCompiledDirectiveElement() {
    var template = " \
      <tw-field \
        model='model' \
        options='options' \
        validation-messages='validationMessages' \
        error-message='errorMessage' \
        on-change='onChange()' \
        on-focus='onFocus()' \
        on-blur='onBlur()'> \
      </tw-field>";
    var compiledElement = $compile(template)($scope);

    $scope.$digest();
    return compiledElement[0];
  }
});
