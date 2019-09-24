'use strict';

describe('Field', function() {
  var $compile,
      $rootScope,
      $scope,
      element,
      formGroup,
      $timeout;

  beforeEach(function() {
    angular.mock.module('tw.styleguide.forms.field');

    angular.mock.inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $timeout = $injector.get('$timeout');
    });

    $scope = $rootScope.$new();
    $scope.model;
    $scope.onChange = jasmine.createSpy();
    $scope.onFocus = jasmine.createSpy();
    $scope.onBlur = jasmine.createSpy();
  });

  describe('when given a title for the field', function() {
    beforeEach(function() {
      $scope.options = { title: "Control label", type: "string" };
      element = getCompiledDirectiveElement();
    });

    it('should render a control label', function() {
      expect(element.querySelector('label').innerText.trim()).toBe('Control label')
    });
  });

  describe('when given type:string', function() {
    describe('and no format', function() {
      beforeEach(function() {
        $scope.options = { type: "string" };
        element = getCompiledDirectiveElement();
      });

      it('should render a text input', function() {
        expect(element.querySelector('input[type=text]')).toBeTruthy();
      });
    });

    describe('and date format', function() {
      beforeEach(function() {
        $scope.options = { type: "string", format: "date" };
        element = getCompiledDirectiveElement();
      });

      it('should render a date control', function() {
        expect(element.querySelector('tw-date')).toBeTruthy();
      });
    });

    describe('and base64url format', function() {
      beforeEach(function() {
        $scope.options = { type: "string", format: "base64url" };
        element = getCompiledDirectiveElement();
      });

      it('should render a file upload', function() {
        expect(element.querySelector('tw-upload')).toBeTruthy();
      });

      it('should not render a visible label', function() {
        expect(element.querySelector('.control-label')).toBeFalsy();
      });

      describe('and camera capture attributes', function() {
        beforeEach(function() {
          const cameraCaptureAttributes = {
            sourceType: "CAMERA_ONLY",
            helpOptions: {
              image: "helpImage"
            },
            cameraOptions: {
              overlay: "overlay",
              direction: "direction"
            }
          };
          $scope.options = $.extend($scope.options, cameraCaptureAttributes);
          element = getCompiledDirectiveElement();
        });

        it('should render a file upload with camera capture attributes', function() {
          const uploadElement = element.querySelector('tw-upload');
          expect(uploadElement).toBeTruthy();
          expect(uploadElement.getAttribute('help-image')).toBe('helpImage');
          expect(uploadElement.getAttribute('camera-overlay')).toBe('overlay');
          expect(uploadElement.getAttribute('camera-direction')).toBe('direction');
        });
      });
    });

    describe('and password control override', function() {
      beforeEach(function() {
        $scope.options = { type: "string", control: "password" };
        element = getCompiledDirectiveElement();
      });

      it('should render a password control', function() {
        expect(element.querySelector('input[type=password]')).toBeTruthy();
      });
    });

    describe('and telephone control override', function() {
      beforeEach(function() {
        $scope.options = { type: "string", control: "tel" };
        element = getCompiledDirectiveElement();
      });

      it('should render a telephone control', function() {
        expect(element.querySelector('tw-telephone')).toBeTruthy();
      });
    });
  });

  describe('when given type:number', function() {
    beforeEach(function() {
      $scope.options = { type: "number" };
      element = getCompiledDirectiveElement();
    });

    it('should render a number input', function() {
      expect(element.querySelector('input[type=number]')).toBeTruthy();
    });
  });

  describe('when given type:boolean', function() {
    beforeEach(function() {
      $scope.options = { type: "boolean" };
      element = getCompiledDirectiveElement();
    });

    it('should render a checkbox', function() {
      expect(element.querySelector('tw-checkbox')).toBeTruthy();
    });
  });

  describe('when given field.values', function() {
    describe('if there are 3 or less', function() {
      beforeEach(function() {
        $scope.options = {
          type: "number",
          values: [{value: 1, label: "One"}, {value: 2, label: "Two"}]
        };
        element = getCompiledDirectiveElement();
      });

      it('should render radio buttons', function() {
        expect(element.querySelectorAll('tw-radio').length).toBe(2);
      });
    });
    describe('if there are 4 or more', function() {
      beforeEach(function() {
        $scope.options = {
          type: "number",
          values: [
            {value: 1, label: "One"},
            {value: 2, label: "Two"},
            {value: 3, label: "Three"},
            {value: 4, label: "Four"}
          ]
        };
        element = getCompiledDirectiveElement();
      });

      it('should render a select', function() {
        expect(element.querySelector('tw-select')).toBeTruthy();
      });
    });
    describe('if control:select is supplied', function() {
      beforeEach(function() {
        $scope.options = {
          type: "number",
          control: "select",
          values: [{value: 1, label: "One"}, {value: 2, label: "Two"}]
        };
        element = getCompiledDirectiveElement();
      });

      it('should render select regardless of number of options', function() {
        expect(element.querySelector('tw-select')).toBeTruthy();
      });
    });
  });

  describe('when the model already contains a value', function() {
    beforeEach(function() {
      $scope.options = { type: "string" };
      $scope.model = 'supplied value';
      element = getCompiledDirectiveElement();
    });

    it('should render the model value in the control', function() {
      expect(element.querySelector('input').value).toBe('supplied value');
    });
  });

  describe('when the model is not set and there is a default value', function() {
    beforeEach(function() {
      $scope.options = { type: "string", default: "default value" };
      element = getCompiledDirectiveElement();
    });

    it('should render the default value in the control', function() {
      expect(element.querySelector('input').value).toBe('default value');
    });
  });

  describe('when there is a model value and a default value', function() {
    beforeEach(function() {
      $scope.options = { type: "string", default: "default value" };
      $scope.model = 'model value';
      element = getCompiledDirectiveElement();
    });

    it('should render the model value in the control', function() {
      expect(element.querySelector('input').value).toBe('model value');
    });
  });

  describe('when the field is required and has only one enum value', function() {
    beforeEach(function() {
      $scope.options = { type: "string", enum: ['valid'] };
      $scope.required = true;
      $scope.model = 'invalid';
      element = getCompiledDirectiveElement();
    });

    it('should set the model value to the enum', function() {
      expect($scope.model).toBe('valid');
      expect(element.querySelector('input').value).toBe('valid');
    });
  });

  describe('when given an error message', function() {
    beforeEach(function() {
      $scope.options = { type: "string" };
      $scope.errorMessage = 'Custom error';
      element = getCompiledDirectiveElement();
      formGroup = element.querySelector('.form-group');
    });

    it('should render in an error state', function() {
      expect(formGroup.classList).toContain('has-error');
    });

    it('should render the message', function() {
      expect(element.querySelector('.error-provided').innerText.trim()).toBe('Custom error');
    });

    describe('and the value is changed', function() {
      beforeEach(function() {
        var input = element.querySelector('input');
        input.value = 'something';
        input.dispatchEvent(new Event('input'));
        $timeout.flush();
      });
      it('should remove the error message', function() {
        var errorMessages = element.querySelector('.error-messages');
        expect(formGroup.classList).not.toContain('has-error');
        expect(errorMessages).toBeFalsy();
      });
    });
  });

  describe('when given hidden: true', function() {
    beforeEach(function() {
      $scope.options = { type: "string", hidden: true };
      element = getCompiledDirectiveElement();
      formGroup = element.querySelector('.form-group');
    });

    it('should not be visible', function() {
      expect(formGroup.classList).toContain('hidden');
    });
  });

  describe('when the control is focused', function() {
    beforeEach(function() {
      $scope.options = { type: "string"};
      element = getCompiledDirectiveElement();
      element.querySelector('input').dispatchEvent(new Event('focus'));
    });

    it('should trigger the onFocus handler', function() {
      expect($scope.onFocus).toHaveBeenCalled();
    });
  });

  describe('when the control value changes', function() {
    beforeEach(function() {
      $scope.options = { type: "string" };
      $scope.errorMessage = 'Custom error';
      element = getCompiledDirectiveElement();
      element.querySelector('input').value = 'changed';
      element.querySelector('input').dispatchEvent(new Event('input'));
      formGroup = element.querySelector('.form-group');
      $timeout.flush();
    });

    it('should update the model', function() {
      expect($scope.model).toBe('changed');
    });

    it('should hide custom error message', function() {
      expect(element.querySelector('.error-provided')).toBeFalsy();
    });

    it('should remove custom error state', function() {
      expect(formGroup.classList).not.toContain('has-error');
    });

    it('should trigger the onChange handler', function() {
      expect($scope.onChange).toHaveBeenCalled();
    });
  });

  describe('when the control is blurred', function() {
    beforeEach(function() {
      $scope.options = { type: "string"};
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

  // TODO validation
  // TODO help information
  // TODO display formats

  function getCompiledDirectiveElement() {
    var template = " \
      <tw-field \
        name='keyName' \
        model='model' \
        field='options' \
        required='required' \
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
