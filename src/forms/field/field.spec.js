'use strict';

describe('Field', function() {
  var $compile,
      $rootScope,
      $scope,
      element,
      formGroup,
      $timeout,
      FormControl;

  beforeEach(function() {
    FormControl = getMockComponent('twFormControl');

    angular.mock.module('tw.styleguide.forms.form-control', FormControl);
    angular.mock.module('tw.styleguide.forms.field');

    angular.mock.inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $timeout = $injector.get('$timeout');
    });

    $scope = $rootScope.$new();
    $scope.model;
    $scope.onChange = jest.fn();
    $scope.onFocus = jest.fn();
    $scope.onBlur = jest.fn();
  });

  describe('when given a title for the field', function() {
    beforeEach(function() {
      $scope.field = { title: "Control label", type: "string" };
      element = getCompiledDirectiveElement();
    });

    it('should render a control label', function() {
      expect(element.querySelector('label').textContent.trim()).toBe('Control label')
    });
  });

  describe('when given type:string', function() {
    describe('and no format', function() {
      beforeEach(function() {
        $scope.field = { type: "string" };
        element = getCompiledDirectiveElement();
      });

      it('should ask the form control to render a text input', function() {
        expect(FormControl.bindings.type).toBe('text');
      });
    });

    describe('and date format', function() {
      beforeEach(function() {
        $scope.field = { type: "string", format: "date" };
        element = getCompiledDirectiveElement();
      });

      it('should ask the form control to render a date input', function() {
        expect(FormControl.bindings.type).toBe('date');
      });
    });

    describe('and base64url format', function() {
      beforeEach(function() {
        $scope.field = { type: "string", format: "base64url" };
        element = getCompiledDirectiveElement();
      });

      it('should ask the form control to render a file input', function() {
        expect(FormControl.bindings.type).toBe('file');
      });

      it('should not render a visible label', function() {
        expect(element.querySelector('.control-label')).toBeFalsy();
      });

      describe('and camera capture attributes', function() {
        beforeEach(function() {
          const cameraCaptureAttributes = {
            sourceType: "CAMERA_ONLY",
            help: {
              image: "helpImage"
            },
            camera: {
              overlay: "overlay",
              direction: "direction"
            }
          };
          $scope.field = $.extend($scope.field, cameraCaptureAttributes);
          element = getCompiledDirectiveElement();
        });

        it('should pass the upload options to the FormControl', function() {
          expect(FormControl.bindings.cameraOptions).toEqual($scope.field.camera);
          expect(FormControl.bindings.helpOptions).toEqual($scope.field.help);
          expect(FormControl.bindings.fileUploadSource).toEqual($scope.field.sourceType);
        });
      });
    });

    describe('and password control override', function() {
      beforeEach(function() {
        $scope.field = { type: "string", control: "password" };
        element = getCompiledDirectiveElement();
      });

      it('should ask the form control to render a password input', function() {
        expect(FormControl.bindings.type).toBe('password');
      });
    });

    describe('and telephone control override', function() {
      beforeEach(function() {
        $scope.field = { type: "string", control: "tel" };
        element = getCompiledDirectiveElement();
      });

      it('should ask the form control to render a telephone input', function() {
        expect(FormControl.bindings.type).toBe('tel');
      });
    });
  });

  describe('when given type:number', function() {
    beforeEach(function() {
      $scope.field = { type: "number" };
      element = getCompiledDirectiveElement();
    });

    // it('should render a number input', function() {
    //   expect(element.querySelector('input[type=number]')).toBeTruthy();
    // });

    it('should ask the form control to render a number input', function() {
      expect(FormControl.bindings.type).toBe('number');
    });
  });

  describe('when given type:boolean', function() {
    beforeEach(function() {
      $scope.field = { type: "boolean" };
      element = getCompiledDirectiveElement();
    });

    it('should ask the form control to render a telephone input', function() {
      expect(FormControl.bindings.type).toBe('checkbox');
    });
  });

  describe('when given field.values', function() {

    describe('if there are 3 or less', function() {
      beforeEach(function() {
        $scope.field = {
          type: "number",
          values: [{value: 1, label: "One"}, {value: 2, label: "Two"}]
        };
        element = getCompiledDirectiveElement();
      });

      it('should ask the form control to render a radio input', function() {
        expect(FormControl.bindings.type).toBe('radio');
      });
    });

    describe('if there are 4 or more', function() {
      beforeEach(function() {
        $scope.field = {
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

      it('should ask the form control to render a select input', function() {
        expect(FormControl.bindings.type).toBe('select');
      });
    });

    describe('if control:select is supplied', function() {
      beforeEach(function() {
        $scope.field = {
          type: "number",
          control: "select",
          values: [{value: 1, label: "One"}, {value: 2, label: "Two"}]
        };
        element = getCompiledDirectiveElement();
      });

      it('should ask the form control to render a select, even if low number of options', function() {
        expect(FormControl.bindings.type).toBe('select');
      });
    });
  });

  describe('when the model already contains a value', function() {
    beforeEach(function() {
      $scope.field = { type: "string" };
      $scope.model = 'supplied value';
      element = getCompiledDirectiveElement();
    });

    it('should pass it the FormControl', function() {
      expect(FormControl.bindings.ngModel).toBe('supplied value');
    });
  });

  describe('when the model is not set and there is a default value', function() {
    beforeEach(function() {
      $scope.field = { type: "string", default: "default value" };
      element = getCompiledDirectiveElement();
    });

    it('should pass it the default to the FormControl', function() {
      expect(FormControl.bindings.ngModel).toBe('default value');
    });
  });

  describe('when there is a model value and a default value', function() {
    beforeEach(function() {
      $scope.field = { type: "string", default: "default value" };
      $scope.model = 'model value';
      element = getCompiledDirectiveElement();
    });

    it('should pass the model value to the FormControl', function() {
      expect(FormControl.bindings.ngModel).toBe('model value');
    });
  });

  describe('when the field is required and has only one enum value', function() {
    beforeEach(function() {
      $scope.field = { type: "string", enum: ['valid'] };
      $scope.required = true;
      $scope.model = 'invalid';
      element = getCompiledDirectiveElement();
    });

    it('should set the model value to the enum', function() {
      expect($scope.model).toBe('valid');
      expect(FormControl.bindings.ngModel).toBe('valid');
      // expect(element.querySelector('input').value).toBe('valid');
    });
  });

  describe('when given an error message', function() {
    beforeEach(function() {
      $scope.field = { type: "string" };
      $scope.errorMessage = 'Custom error';
      element = getCompiledDirectiveElement();
      formGroup = element.querySelector('.form-group');
    });

    it('should render in an error state', function() {
      expect(formGroup.classList).toContain('has-error');
    });

    it('should render the message', function() {
      expect(element.querySelector('.error-provided').textContent.trim()).toBe('Custom error');
    });

    describe('and the value is changed', function() {
      beforeEach(function() {
        FormControl.bindings.ngChange({ model: 'something' });
        $timeout.flush();
        $scope.$apply();
      });

      it('should remove the error message', function() {
        var errorMessages = element.querySelector('.error-provided');
        expect(errorMessages).toBeFalsy();
      });
    });
  });

  describe('when given hidden: true', function() {
    beforeEach(function() {
      $scope.field = { type: "string", hidden: true };
      element = getCompiledDirectiveElement();
      formGroup = element.querySelector('.form-group');
    });

    it('should not be visible', function() {
      expect(formGroup.classList).toContain('hidden');
    });
  });

  describe('when the control is focused', function() {
    beforeEach(function() {
      $scope.field = { type: "string"};
      element = getCompiledDirectiveElement();
      FormControl.bindings.ngFocus();
    });

    it('should trigger the onFocus handler', function() {
      expect($scope.onFocus).toHaveBeenCalled();
    });
  });

  describe('when the control value changes', function() {
    beforeEach(function() {
      $scope.field = { type: "string" };
      $scope.errorMessage = 'Custom error';
      element = getCompiledDirectiveElement();

      FormControl.bindings.ngChange({ model: 'changed' });
      formGroup = element.querySelector('.form-group');
      $timeout.flush();
      $scope.$apply();
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
      $scope.field = { type: "string"};
      $scope.errorMessage = 'Custom error';
      element = getCompiledDirectiveElement();

      FormControl.bindings.ngBlur();
    });

    it('should trigger the onBlur handler', function() {
      expect($scope.onBlur).toHaveBeenCalled();
    });

    it('should not hide the custom error message', function() {
      expect(element.querySelector('.error-provided')).toBeTruthy();
    });
  });

  describe('when the FormControl triggers onAsyncFailure', function() {
    beforeEach(function() {
      $scope.field = { type: "string" };
      $scope.uploadOptions = { };
      element = getCompiledDirectiveElement();

      FormControl.bindings.onAsyncFailure({
        response: {
          data: {
            message: 'My error',
            errors: [{message: 'Too blurry'}]
          }
        }
      });
    });
    it('should extract the error message and pass it back to the form control', function() {
      expect(FormControl.bindings.uploadOptions.failureText).toBe('My error');
      expect(FormControl.bindings.uploadOptions.validationMessages).toEqual(['Too blurry']);
    });
  });

  describe('when the FormControl triggers onAsyncSuccess', function() {
    beforeEach(function() {
      $scope.field = { type: "string" };
      $scope.uploadOptions = { };
      element = getCompiledDirectiveElement();

      FormControl.bindings.onAsyncSuccess({
        response: {
          data: {
            message: 'My success'
          }
        }
      });
    });
    it('should extract the success message and pass it back to the form control', function() {
      expect(FormControl.bindings.uploadOptions.successText).toBe('My success');
    });
  });

  // TODO validation
  // TODO help information

  function getCompiledDirectiveElement() {
    var template = " \
      <tw-field \
        name='keyName' \
        model='model' \
        field='field' \
        required='required' \
        validation-messages='validationMessages' \
        error-message='errorMessage' \
        on-change='onChange()' \
        on-focus='onFocus()' \
        on-blur='onBlur()' \
        upload-options='uploadOptions'> \
      </tw-field>";
    var compiledElement = $compile(template)($scope);

    $scope.$digest();
    return compiledElement[0];
  }
});
