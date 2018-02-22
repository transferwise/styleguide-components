fdescribe('FormControl', function() {
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

  testSimpleControl('text', 'input[type=text]', 'example');
  testSimpleControl('password', 'input[type=password]', 'qwerty');
  testSimpleControl('number', 'input[type=number]', 123456);
  testSimpleControl('textarea', 'textarea', 'Lorem ipsum');

  testTextControlValidation('text', 'input[type=text]');
  testTextControlValidation('password', 'input[type=password]');
  testTextControlValidation('textarea', 'textarea');

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

    testRequiredValidation(function() {
      input.value = 4;
      input.dispatchEvent(new Event('input'));
    }, 4);

    testMinMaxValidation(function() {
      // setBelowMin
      input.value = 1;
      input.dispatchEvent(new Event('input'));
    }, function() {
      // setAboveMax
      input.value = 6;
      input.dispatchEvent(new Event('input'));
    }, function() {
      // setValid
      input.value = 4;
      input.dispatchEvent(new Event('input'));
    }, 4);
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

    testFocusHandler(function() {
      selectElem.dispatchEvent(new Event('focus'));
    });
    testChangeHandler(function() {
      var selectModelController = angular.element(selectElem).controller('ngModel');
      selectModelController.$setViewValue('2');
    }, '2');
    testBlurHandler(function() {
      selectElem.dispatchEvent(new Event('blur'));
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

    testFocusHandler(function() {
      checkbox.dispatchEvent(new Event('focus'));
    });

    testChangeHandler(function() {
      checkbox.querySelector('button').click();
    }, true);

    testBlurHandler(function() {
      checkbox.dispatchEvent(new Event('blur'));
    });

    testRequiredValidation(function() {
      checkbox.querySelector('button').click();
    }, true);
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

    testFocusHandler(function() {
      radios[0].dispatchEvent(new Event('focus'));
    });

    testChangeHandler(function() {
      radios[0].querySelector('button').click();
    }, 1);

    testBlurHandler(function() {
      radios[0].dispatchEvent(new Event('blur'));
    });

    testRequiredValidation(function() {
      radios[0].querySelector('button').click();
    }, 1);
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
      formGroup = compileTemplate(
        "<div class='form-group'> \
          <label class='control-label'></label> \
          <tw-form-control type='date' \
            ng-model='model' \
            locale='en-GB' \
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

    testFocusHandler(function() {
      dayInput.dispatchEvent(new Event('focus'));
    });

    testChangeHandler(function() {
      dayInput.value = '01';
      dayInput.dispatchEvent(new Event('input'));
      yearInput.value = '2016';
      yearInput.dispatchEvent(new Event('input'));
    }, '2016-01-01');

    testBlurHandler(function() {
      yearInput.dispatchEvent(new Event('blur'));
    });
  });

  describe('type: date validation', function() {
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

    testRequiredValidation(function() {
      // setValid 2016-01-01
      dayInput.value = '01';
      dayInput.dispatchEvent(new Event('input'));
      yearInput.value = '2016';
      yearInput.dispatchEvent(new Event('input'));
    }, '2016-01-01');

    testMinMaxValidation(function() {
      // setBelowMin 2010-01-01
      dayInput.value = '01';
      dayInput.dispatchEvent(new Event('input'));
      yearInput.value = '2010';
      yearInput.dispatchEvent(new Event('input'));
    }, function() {
      // setAboveMax 2020-01-01
      dayInput.value = '01';
      dayInput.dispatchEvent(new Event('input'));
      yearInput.value = '2020';
      yearInput.dispatchEvent(new Event('input'));
    }, function() {
      // setValid 2016-01-01
      dayInput.value = '01';
      dayInput.dispatchEvent(new Event('input'));
      yearInput.value = '2016';
      yearInput.dispatchEvent(new Event('input'));
    }, '2016-01-01');

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

  function testSimpleControl(controlType, selector, valueToSet) {
    describe('type: ' + controlType, function() {
      beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        $compile = $injector.get('$compile');
        $timeout = $injector.get('$timeout');
      }));

      beforeEach(function() {
        $scope.onFocus = jasmine.createSpy('onFocus');
        $scope.onBlur = jasmine.createSpy('onBlur');
        $scope.onChange = jasmine.createSpy('onChange');

        $scope.model = null;
        element = compileTemplate(
          "<tw-form-control type='" + controlType + "' \
            ng-model='model' \
            ng-focus='onFocus()' \
            ng-blur='onBlur()'' \
            ng-change='onChange(value)'> \
          </tw-form-control>");
        input = element.querySelector(selector);
      });

      it('should render a ' + controlType + ' control', function() {
        expect(input).toBeTruthy();
      });

      testFocusHandler(function() {
        input.dispatchEvent(new Event('focus'));
      });

      testChangeHandler(function() {
        input.value = valueToSet;
        input.dispatchEvent(new Event('input'));
      }, valueToSet);

      testBlurHandler(function() {
        input.dispatchEvent(new Event('blur'));
      });
    });
  }

  function testTextControlValidation(controlType, selector) {
    describe('type: ' + controlType + ' - validation', function() {
      beforeEach(function() {
        $scope.model = '';
        $scope.pattern = '[a-z]+';
        formGroup = compileTemplate(
          "<div class='form-group'> \
            <label class='control-label'></label> \
            <tw-form-control type='" + controlType + "' \
              ng-model='model' \
              ng-minlength='4' \
              ng-maxlength='6' \
              ng-pattern='pattern' \
              ng-required='true'> \
            </tw-form-control> \
          </div>"
        );
        input = formGroup.querySelector(selector);
        element = formGroup.querySelector('tw-form-control');
      });

      testRequiredValidation(function() {
        input.value = 'abcd';
        input.dispatchEvent(new Event('input'));
      }, 'abcd');

      testLengthValidation(function() {
        input.value = 'abc';
        input.dispatchEvent(new Event('input'));
      }, function() {
        input.value = 'abcdefg';
        input.dispatchEvent(new Event('input'));
      }, function() {
        input.value = 'abcd';
        input.dispatchEvent(new Event('input'));
      }, 'abcd');

      testPatternValidation(function() {
        input.value = '1';
        input.dispatchEvent(new Event('input'));
      }, function() {
        input.value = 'abcd';
        input.dispatchEvent(new Event('input'));
      }, 'abcd');
    });
  }

  function testFocusHandler(performFocus) {
    describe('when focused', function() {
      beforeEach(performFocus);

      it('should call the focus handler', function() {
        expect($scope.onFocus).toHaveBeenCalled();
      });
    });
  }

  function testChangeHandler(performChange, expectedValue) {
    describe('when changed', function() {
      beforeEach(performChange);

      it('should set the correct value', function() {
        expect($scope.model).toBe(expectedValue);
      });
      it('should set the control to $dirty', function() {
        expect(element.classList).toContain("ng-dirty");
      });
      it('should call the change handler', function() {
        expect($scope.onChange).toHaveBeenCalled();
      });
    });
  }

  function testBlurHandler(performBlur) {
    describe('when blurred', function() {
      beforeEach(performBlur);

      it('should set the control to $touched', function() {
        expect(element.classList).toContain("ng-touched");
      });
      it('should call the blur handler', function() {
        expect($scope.onBlur).toHaveBeenCalled();
      });
    });
  }

  function testRequiredValidation(setValidValue, expectedModel) {
    describe('when required and no value entered', function() {
      it('should set ngModel.$invalid', function() {
        expect(element.classList).toContain("ng-invalid");
        expect(element.classList).toContain("ng-invalid-required");
      });
      it('should not bind to the model', function() {
         expect($scope.model).toBeFalsy();
      });
    });

    describe('when required and value is entered', function() {
      beforeEach(setValidValue);

      it('should set ngModel.$valid', function() {
        expect(element.classList).toContain("ng-valid-required");
      });
      it('should bind to the model', function() {
        expect($scope.model).toBe(expectedModel);
      });
    });
  }

  function testMinMaxValidation(setBelowMin, setAboveMax, setValid, expectedModel) {
    describe('when value is below min', function() {
      beforeEach(setBelowMin);
      it('should set ngModel.$invalid', function() {
        expect(element.classList).toContain("ng-invalid");
        expect(element.classList).toContain("ng-invalid-min");
      });
      it('should not bind to the model', function() {
        expect($scope.model).toBeFalsy();
      });
    });

    describe('when value is above max', function() {
      beforeEach(setAboveMax);
      it('should set ngModel.$invalid', function() {
        expect(element.classList).toContain("ng-invalid");
        expect(element.classList).toContain("ng-invalid-max");
      });
      it('should not bind to the model', function() {
        expect($scope.model).toBeFalsy();
      });
    });

    describe('when value is between min and max', function() {
      beforeEach(setValid);
      it('should set ngModel.$valid', function() {
        expect(element.classList).toContain("ng-valid");
        expect(element.classList).toContain("ng-valid-min");
        expect(element.classList).toContain("ng-valid-max");
      });
      it('should bind the value to the model', function() {
        expect($scope.model).toBe(expectedModel);
      });
    });
  }

  function testLengthValidation(setBelowMin, setAboveMax, setValid, expectedModel) {
    describe('when entered value is shorter than min length', function() {
      beforeEach(setBelowMin);
      it('should set ngModel.$invalid', function() {
        expect(element.classList).toContain("ng-invalid");
        expect(element.classList).toContain("ng-invalid-minlength");
      });
      it('should not bind to the model', function() {
        expect($scope.model).toBeFalsy();
      });
    });

    describe('when entered value is longer than max length', function() {
      beforeEach(setAboveMax);
      it('should set ngModel.$valid when value is longer than min length', function() {
        expect(element.classList).toContain("ng-invalid");
        expect(element.classList).toContain("ng-invalid-maxlength");
      });
      it('should not bind to the model', function() {
        expect($scope.model).toBeFalsy();
      });
    });

    describe('when entered value is between min and max length', function() {
      beforeEach(setValid);
      it('should set ngModel.$valid', function() {
        expect(element.classList).toContain("ng-valid-maxlength");
      });
      it('should bind to the model', function() {
        expect($scope.model).toBe(expectedModel);
      });
    });
  }

  function testPatternValidation(setInvalid, setValid, expectedModel) {
    describe('when entered value does not match pattern', function() {
      beforeEach(setInvalid);
      it('should set ngModel.$invalid', function() {
        expect(element.classList).toContain("ng-invalid");
        expect(element.classList).toContain("ng-invalid-pattern");
      });
      it('should not bind to the model', function() {
        expect($scope.model).toBeFalsy();
      });
    });

    describe('when entered value matches pattern', function() {
      beforeEach(setValid);
      it('should set ngModel.$valid', function() {
        expect(element.classList).toContain("ng-valid-pattern");
      });
      it('should bind to the model', function() {
        expect($scope.model).toBe(expectedModel);
      });
    });
  }
});
