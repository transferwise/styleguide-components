describe('FormControl', function() {
  var $compile,
    $rootScope,
    $scope,
    $timeout,
    element,
    formGroup,
    input;

  beforeEach(function() {
    module('tw.styleguide.forms');
    module('tw.styleguide.services');
  });

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $compile = $injector.get('$compile');
    $timeout = $injector.get('$timeout');

    $scope.onFocus = jasmine.createSpy('onFocus');
    $scope.onBlur = jasmine.createSpy('onBlur');
    $scope.onChange = jasmine.createSpy('onChange');
  }));

  describe('type: text', function() {
    beforeEach(function() {
      $scope.model = null;
      element = compileTemplate(
        "<tw-form-control type='text' \
          ng-model='model' \
          ng-focus='onFocus()' \
          ng-blur='onBlur()'' \
          ng-change='onChange(value)'> \
        </tw-form-control>");
      input = element.querySelector('input');
    });

    it('should render a text input', function() {
      expect(input).toBeTruthy();
      expect(input.getAttribute("type")).toBe("text");
    });

    describe('when focused', function() {
      beforeEach(function() {
        input.dispatchEvent(new Event('focus'));
      });
      it('should call the focus handler', function() {
        expect($scope.onFocus).toHaveBeenCalled();
      });
    });

    describe('when changed', function() {
      beforeEach(function() {
        input.value = 'example';
        input.dispatchEvent(new Event('input'));
      });
      it('should set the control to $dirty', function() {
        expect(element.classList).toContain("ng-dirty");
      });
      it('should call the change handler', function() {
        expect($scope.onChange).toHaveBeenCalled();
      });
    });

    describe('when blurred', function() {
      beforeEach(function() {
        input.dispatchEvent(new Event('blur'));
      });
      it('should set the control to $touched', function() {
        expect(element.classList).toContain("ng-touched");
      });
      it('should call the blur handler', function() {
        expect($scope.onBlur).toHaveBeenCalled();
      });
    });
  });

  describe('type: text - validation', function() {
    beforeEach(function() {
      $scope.model = '';
      $scope.pattern = '[a-z]+';
      formGroup = compileTemplate(
        "<div class='form-group'> \
          <label class='control-label'></label> \
          <tw-form-control type='text' \
            ng-model='model' \
            ng-minlength='4' \
            ng-maxlength='6' \
            ng-pattern='pattern' \
            ng-required='true'> \
          </tw-form-control> \
        </div>"
      );
      input = formGroup.querySelector('input');
      element = formGroup.querySelector('tw-form-control');
    });

    describe('when required and no value entered', function() {
      beforeEach(function() {
        input.value = '';
        input.dispatchEvent(new Event('input'));
      });
      it('should set ngModel.$invalid', function() {
        expect(element.classList).toContain("ng-invalid");
        expect(element.classList).toContain("ng-invalid-required");
      });
      // it('should not bind to the model', function() {
      //   expect($scope.model).toBe(null);
      // });
    });

    describe('when required and value is entered', function() {
      beforeEach(function() {
        input.value = 'abcd';
        input.dispatchEvent(new Event('input'));
      });
      it('should set ngModel.$valid', function() {
        expect(element.classList).toContain("ng-valid-required");
      });
      it('should bind to the model', function() {
        expect($scope.model).toBe('abcd');
      });
    });

    describe('when entered value is shorter than min length', function() {
      beforeEach(function() {
        input.value = 'abc';
        input.dispatchEvent(new Event('input'));
      });
      it('should set ngModel.$invalid', function() {
        expect(element.classList).toContain("ng-invalid");
        expect(element.classList).toContain("ng-invalid-minlength");
      });
      it('should not bind to the model', function() {
        expect($scope.model).toBeFalsy();
      });
    });

    describe('when entered value is longer than max length', function() {
      beforeEach(function() {
        input.value = 'abcdefg';
        input.dispatchEvent(new Event('input'));
      });
      it('should set ngModel.$valid when value is longer than min length', function() {
        expect(element.classList).toContain("ng-invalid");
        expect(element.classList).toContain("ng-invalid-maxlength");
      });
      it('should not bind to the model', function() {
        expect($scope.model).toBeFalsy();
      });
    });

    describe('when entered value is between min and max length', function() {
      beforeEach(function() {
        input.value = 'abcd';
        input.dispatchEvent(new Event('input'));
      });
      it('should set ngModel.$valid', function() {
        expect(element.classList).toContain("ng-valid-maxlength");
      });
      it('should bind to the model', function() {
        expect($scope.model).toBe('abcd');
      });
    });

    describe('when entered value does not match pattern', function() {
      beforeEach(function() {
        input.value = '1';
        input.dispatchEvent(new Event('input'));
      });
      it('should set ngModel.$invalid', function() {
        expect(element.classList).toContain("ng-invalid");
        expect(element.classList).toContain("ng-invalid-pattern");
      });
      it('should not bind to the model', function() {
        expect($scope.model).toBeFalsy();
      });
    });

    describe('when entered value matches pattern', function() {
      beforeEach(function() {
        input.value = 'abcd';
        input.dispatchEvent(new Event('input'));
      });
      it('should set ngModel.$valid', function() {
        expect(element.classList).toContain("ng-valid-pattern");
      });
      it('should bind to the model', function() {
        expect($scope.model).toBe('abcd');
      });
    });
  });

  describe('type: password', function() {
    beforeEach(function() {
      $scope.model = null;
      element = compileTemplate(
        "<tw-form-control type='password' \
          ng-model='model' \
          ng-focus='onFocus()' \
          ng-blur='onBlur()'' \
          ng-change='onChange(value)'> \
        </tw-form-control>"
      );
      input = element.querySelector('input');
    });

    it('should render a password input', function() {
      expect(input).toBeTruthy();
      expect(input.getAttribute("type")).toBe("password");
    });

    describe('when focused', function() {
      beforeEach(function() {
        input.dispatchEvent(new Event('focus'));
      });
      it('should call the focus handler', function() {
        expect($scope.onFocus).toHaveBeenCalled();
      });
    });

    describe('when changed', function() {
      beforeEach(function() {
        input.value = 'example';
        input.dispatchEvent(new Event('input'));
      });
      it('should set the control to $dirty', function() {
        expect(element.classList).toContain("ng-dirty");
      });
      it('should call the change handler', function() {
        expect($scope.onChange).toHaveBeenCalled();
      });
    });

    describe('when blurred', function() {
      beforeEach(function() {
        input.dispatchEvent(new Event('blur'));
      });
      it('should set the control to $touched', function() {
        expect(element.classList).toContain("ng-touched");
      });
      it('should call the blur handler', function() {
        expect($scope.onBlur).toHaveBeenCalled();
      });
    });
  });

  describe('type: password - validation', function() {
    beforeEach(function() {
      $scope.model = '';
      $scope.pattern = '[a-z]+';
      formGroup = compileTemplate(
        "<div class='form-group'> \
          <label class='control-label'></label> \
          <tw-form-control type='password' \
            ng-model='model' \
            ng-minlength='4' \
            ng-maxlength='6' \
            ng-pattern='pattern' \
            ng-required='true'> \
          </tw-form-control> \
        </div>"
      );
      element = formGroup.querySelector('tw-form-control');
      input = element.querySelector('input');
    });

    it('should set ngModel.$invalid when required value not set', function() {
      input.value = '';
      input.dispatchEvent(new Event('input'));
      expect(element.classList).toContain("ng-invalid");
      expect(element.classList).toContain("ng-invalid-required");
    });
    it('should set ngModel.$valid when required value set', function() {
      input.value = 'abcd';
      input.dispatchEvent(new Event('input'));
      expect(element.classList).toContain("ng-valid-required");
    });
    it('should set ngModel.$invalid when value is shorter than ngMinlength', function() {
      input.value = 'abc';
      input.dispatchEvent(new Event('input'));
      expect(element.classList).toContain("ng-invalid");
      expect(element.classList).toContain("ng-invalid-minlength");
    });
    it('should set ngModel.$valid when value is longer than ngMinlength', function() {
      input.value = 'abcd';
      input.dispatchEvent(new Event('input'));
      expect(element.classList).toContain("ng-valid-minlength");
    });
    it('should set ngModel.$invalid when value is longer than ngMaxlength', function() {
      input.value = 'abcdefg';
      input.dispatchEvent(new Event('input'));
      expect(element.classList).toContain("ng-invalid");
      expect(element.classList).toContain("ng-invalid-maxlength");
    });
    it('should set ngModel.$valid when value is shorter than ngMaxlength', function() {
      input.value = 'abcd';
      input.dispatchEvent(new Event('input'));
      expect(element.classList).toContain("ng-valid-maxlength");
    });

    it('should set ngModel.$invalid when value does not match ngPattern', function() {
      input.value = '1';
      input.dispatchEvent(new Event('input'));
      expect(element.classList).toContain("ng-invalid");
      expect(element.classList).toContain("ng-invalid-pattern");
    });
    it('should set ngModel.$valid when value does match ngPattern', function() {
      input.value = 'abcd';
      input.dispatchEvent(new Event('input'));
      expect(element.classList).toContain("ng-valid-pattern");
    });
  });

  describe('type: number', function() {
    var input;

    beforeEach(function() {
      $scope.model = null;
      element = compileTemplate(
        "<tw-form-control type='number' \
          ng-model='model' \
          ng-focus='onFocus()' \
          ng-blur='onBlur()'' \
          ng-change='onChange(value)'> \
        </tw-form-control>"
      );
      input = element.querySelector('input');
    });

    it('should render a number input', function() {
      expect(input).toBeTruthy();
      expect(input.getAttribute("type")).toBe("number");
    });

    describe('when focused', function() {
      beforeEach(function() {
        input.dispatchEvent(new Event('focus'));
      });
      it('should call the focus handler', function() {
        expect($scope.onFocus).toHaveBeenCalled();
      });
    });

    describe('when changed', function() {
      beforeEach(function() {
        input.value = 2;
        input.dispatchEvent(new Event('input'));
      });
      it('should set the control to $dirty', function() {
        expect(element.classList).toContain("ng-dirty");
      });
      it('should call the change handler', function() {
        expect($scope.onChange).toHaveBeenCalled();
      });
    });

    describe('when blurred', function() {
      beforeEach(function() {
        input.dispatchEvent(new Event('blur'));
      });
      it('should set the control to $touched', function() {
        expect(element.classList).toContain("ng-touched");
      });
      it('should call the blur handler', function() {
        expect($scope.onBlur).toHaveBeenCalled();
      });
    });
  });

  describe('type: number - validation', function() {
    beforeEach(function() {
      $scope.model = null;
      formGroup = compileTemplate(
        "<div class='form-group'> \
          <label class='control-label'></label> \
          <tw-form-control type='number' \
            ng-model='model' \
            ng-min='2' \
            ng-max='5' \
            required> \
          </tw-form-control> \
        </div>"
      );
      element = formGroup.querySelector('tw-form-control');
      input = element.querySelector('input');
    });

    it('should set ngModel.$invalid when required value not set', function() {
      expect(element.classList).toContain("ng-invalid");
      expect(element.classList).toContain("ng-invalid-required");
    });

    describe('when value is below min', function() {
      beforeEach(function() {
        input.value = '1';
        input.dispatchEvent(new Event('input'));
      });
      it('should set ngModel.$invalid', function() {
        expect(element.classList).toContain("ng-invalid");
        expect(element.classList).toContain("ng-invalid-min");
      });
      it('should not bind to the model', function() {
        expect($scope.model).toBeFalsy();
      });
    });

    describe('when value is above max', function() {
      beforeEach(function() {
        input.value = '6';
        input.dispatchEvent(new Event('input'));
      });
      it('should set ngModel.$invalid', function() {
        expect(element.classList).toContain("ng-invalid");
        expect(element.classList).toContain("ng-invalid-max");
      });
      it('should not bind to the model', function() {
        expect($scope.model).toBeFalsy();
      });
    });

    describe('when value is between min and max', function() {
      beforeEach(function() {
        input.value = '4';
        input.dispatchEvent(new Event('input'));
      });
      it('should set ngModel.$valid', function() {
        expect(element.classList).toContain("ng-valid");
        expect(element.classList).toContain("ng-valid-min");
        expect(element.classList).toContain("ng-valid-max");
      });
      it('should bind the value to the model', function() {
        expect($scope.model).toBe(4);
      });
    });
  });

  describe('type: select', function() {
    var selectElem;
    beforeEach(function() {
      $scope.model = null;
      $scope.options = [{
        'value': '1',
        'label': 'one'
      },{
        'value': '2',
        'label': 'two'
      }];

      element = compileTemplate(
        "<tw-form-control type='select' \
          ng-model='model' \
          options='options' \
          ng-required='required' \
          ng-focus='onFocus()' \
          ng-blur='onBlur()'' \
          ng-change='onChange(value)'> \
        </tw-form-control>"
      );
      selectElem = element.querySelector('tw-select');
    });

    it('should render a select', function() {
      expect(selectElem).toBeTruthy();
    });

    describe('when control is focused', function() {
      beforeEach(function() {
        selectElem.dispatchEvent(new Event('focus'));
      });
      it('should call the focus handler', function() {
        expect($scope.onFocus).toHaveBeenCalled();
      });
    });

    describe('when value is changed', function() {
      beforeEach(function() {
        var selectModelController = angular.element(selectElem).controller('ngModel');
        selectModelController.$setViewValue('2');
      });
      it('should set the control to $dirty', function() {
        expect(element.classList).toContain("ng-dirty");
      });
      it('should call the change handler', function() {
        expect($scope.onChange).toHaveBeenCalled();
      });
    });

    describe('when control is blurred', function() {
      beforeEach(function() {
        selectElem.dispatchEvent(new Event('blur'));
      });
      it('should set the control to $touched', function() {
        expect(element.classList).toContain("ng-touched");
      });
      it('should call the blur handler', function() {
        expect($scope.onBlur).toHaveBeenCalled();
      });
    });
  });

  describe('type: checkbox', function() {
    var checkbox;
    beforeEach(function() {
      $scope.model = null;
      element = compileTemplate(
        "<tw-form-control type='checkbox' \
          ng-model='model' \
          ng-required='true' \
          ng-focus='onFocus()' \
          ng-blur='onBlur()' \
          ng-change='onChange(value)'> \
        </tw-form-control>"
      );
      checkbox = element.querySelector('tw-checkbox');
    });

    it('should render a checkbox input', function() {
      expect(checkbox).toBeTruthy();
    });

    describe('when focused', function() {
      beforeEach(function() {
        checkbox.dispatchEvent(new Event('focus'));
      });
      it('should call the focus handler', function() {
        expect($scope.onFocus).toHaveBeenCalled();
      });
    });

    describe('when clicked', function() {
      beforeEach(function() {
        checkbox.querySelector('button').click();
      });
      it('should set the correct value', function() {
        expect($scope.model).toBe(true);
      });
      it('should set the control to $dirty', function() {
        expect(element.classList).toContain("ng-dirty");
      });
      it('should call the change handler', function() {
        expect($scope.onChange).toHaveBeenCalled();
      });
    });

    describe('when blurred', function() {
      beforeEach(function() {
        checkbox.dispatchEvent(new Event('blur'));
      });
      it('should set the control to $touched', function() {
        expect(element.classList).toContain("ng-touched");
      });
      it('should call the blur handler', function() {
        expect($scope.onBlur).toHaveBeenCalled();
      });
    });

    describe('when required', function() {
      it('should set ngModel.$invalid if no value set', function() {
        expect(element.classList).toContain("ng-invalid");
        expect(element.classList).toContain("ng-invalid-required");
      });
    });
  });

  describe('type: radio', function() {
    var radios, template;
    beforeEach(function() {
      template = "<tw-form-control type='radio' \
        options='options' \
        ng-model='model' \
        ng-required='required' \
        ng-focus='onFocus()' \
        ng-blur='onBlur()' \
        ng-change='onChange(value)'> \
      </tw-form-control>";

      $scope.model = null;
      $scope.options = [
        {value: 1, label: 'One'},
        {value: 2, label: 'Two'}
      ];
      $scope.required = true;
      element = compileTemplate(template);
      radios = element.querySelectorAll('tw-radio');
    });

    it('should render two radio buttons', function() {
      expect(radios.length).toBe(2);
    });
    it('should use the options correctly for the label', function() {
      var label = element.querySelector('label');
      expect(label.innerText.trim()).toContain('One');
    });

    describe('when focused', function() {
      beforeEach(function() {
        radios[0].dispatchEvent(new Event('focus'));
      });
      it('should call the focus handler', function() {
        expect($scope.onFocus).toHaveBeenCalled();
      });
    });

    describe('when clicked', function() {
      beforeEach(function() {
        radios[0].querySelector('button').click();
      });
      it('should set the correct value', function() {
        expect($scope.model).toBe(1);
      });
      it('should set the control to $dirty', function() {
        expect(element.classList).toContain("ng-dirty");
      });
      it('should call the change handler', function() {
        expect($scope.onChange).toHaveBeenCalled();
      });
    });

    describe('when blurred', function() {
      beforeEach(function() {
        radios[0].dispatchEvent(new Event('blur'));
      });
      it('should set the control to $touched', function() {
        expect(element.classList).toContain("ng-touched");
      });
      it('should call the blur handler', function() {
        expect($scope.onBlur).toHaveBeenCalled();
      });
    });

    describe(' - validation', function() {
      it('should set ngModel.$invalid when required', function() {
        $scope.required = true;
        element = compileTemplate(template);

        expect(element.classList).toContain("ng-invalid");
        expect(element.classList).toContain("ng-invalid-required");
      });
      it('should set ngModel.$valid when not required', function() {
        $scope.required = false;
        element = compileTemplate(template);

        expect(element.classList).toContain("ng-valid");
        expect(element.classList).toContain("ng-valid-required");
      });
    });
  });

  describe('type: upload - validation', function() {
    beforeEach(function() {
      $scope.model = null;
      formGroup = compileTemplate(
        "<div class='form-group'> \
          <label class='control-label'></label> \
          <tw-form-control type='upload' \
            ng-model='model' \
            ng-focus='onFocus()' \
            ng-blur='onBlur()' \
            ng-change='onChange(value)' \
            required> \
          </tw-form-control> \
        </div>"
      );
      element = formGroup.querySelector('tw-form-control');
    });
    it('should render twUpload', function() {
      expect(element.querySelector('tw-upload')).toBeTruthy();
    });
  });

  describe('type: date', function() {
    var dayInput, yearInput;
    beforeEach(function() {
      $scope.model = null;
      $scope.ngMin = '2015-04-01';
      $scope.ngMax = '2017-03-24';
      formGroup = compileTemplate(
        "<div class='form-group'> \
          <label class='control-label'></label> \
          <tw-form-control type='date' \
            ng-model='model' \
            locale='en-GB' \
            ng-min='ngMin' \
            ng-max='ngMax' \
            tw-minlength='' \
            ng-required='true' \
            ng-focus='onFocus()' \
            ng-blur='onBlur()' \
            ng-change='onChange(value)'> \
          </tw-form-control> \
        </div>"
      );
      element = formGroup.querySelector('tw-form-control');
      dayInput = element.querySelector('.tw-date-day');
      yearInput = element.querySelector('.tw-date-year');
    });

    describe('when focused', function() {
      beforeEach(function() {
        dayInput.dispatchEvent(new Event('focus'));
      });
      it('should call the focus handler', function() {
        expect($scope.onFocus).toHaveBeenCalled();
      });
    });

    describe('when changed', function() {
      beforeEach(function() {
        dayInput.value = '01';
        dayInput.dispatchEvent(new Event('input'));
        yearInput.value = '2016';
        yearInput.dispatchEvent(new Event('input'));
      });
      it('should set the correct value', function() {
        expect($scope.model).toBe('2016-01-01');
      });
      it('should set the control to $dirty', function() {
        expect(element.classList).toContain("ng-dirty");
      });
      it('should call the change handler', function() {
        expect($scope.onChange).toHaveBeenCalled();
      });
    });

    describe('when blurred', function() {
      beforeEach(function() {
        yearInput.dispatchEvent(new Event('blur'));
      });
      it('should set the control to $touched', function() {
        expect(element.classList).toContain("ng-touched");
      });
      it('should call the blur handler', function() {
        expect($scope.onBlur).toHaveBeenCalled();
      });
    });

    describe('when required and not set', function() {
      it('should set ngModel.$invalid', function() {
        expect(element.classList).toContain("ng-invalid");
        expect(element.classList).toContain("ng-invalid-required");
      });
    });

    describe('when value is below ngMin', function() {
      beforeEach(function() {
        // 2010-01-01
        dayInput.value = '01';
        dayInput.dispatchEvent(new Event('input'));
        yearInput.value = '2010';
        yearInput.dispatchEvent(new Event('input'));
      });
      it('should set ngModel.$invalid', function() {
        expect(element.classList).toContain("ng-invalid");
        expect(element.classList).toContain("ng-invalid-min");
      });
      it('should not bind to the model', function() {
        expect($scope.model).toBeFalsy();
      });
    });

    describe('when value is above ngMax', function() {
      beforeEach(function() {
        // 2020-01-01
        dayInput.value = '01';
        dayInput.dispatchEvent(new Event('input'));
        yearInput.value = '2020';
        yearInput.dispatchEvent(new Event('input'));
      })
      it('should set ngModel.$invalid', function() {
        expect(element.classList).toContain("ng-invalid");
        expect(element.classList).toContain("ng-invalid-max");
      });
      it('should not bind to the model', function() {
        expect($scope.model).toBeFalsy();
      });
    });

    describe('when value is between min and max', function() {
      beforeEach(function() {
        // 2016-01-01
        dayInput.value = '01';
        dayInput.dispatchEvent(new Event('input'));
        yearInput.value = '2016';
        yearInput.dispatchEvent(new Event('input'));
      })
      it('should set ngModel.$valid ', function() {
        expect(element.classList).toContain("ng-valid");
        expect(element.classList).toContain("ng-valid-min");
        expect(element.classList).toContain("ng-valid-max");
      });
      it('should bind to the model', function() {
        expect($scope.model).toBe('2016-01-01');
      });
    });
  });

  describe('type: hidden', function() {
    var input;
    beforeEach(function() {
      $scope.model = null;
      element = compileTemplate(
        "<tw-form-control type='hidden' \
          ng-model='model'> \
        </tw-form-control>"
      );
      input = element.querySelector('input');
    });

    it('should render a hidden input', function() {
      expect(input).toBeTruthy();
      expect(input.getAttribute("type")).toBe("hidden");
    });
  });


  function compileTemplate(template) {
    return compileElement(angular.element(template))[0];
  }

  function compileElement(element) {
    var compiledElement = $compile(element)($scope);
    $scope.$digest();
    return compiledElement;
  }
});
