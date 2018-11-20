'use strict';

describe('Radio', function() {
  var $compile,
    $rootScope,
    $scope,
    $ngModelController,
    templateElement,
    twRadios,
    twRadioOne,
    twRadioTwo,
    buttons,
    buttonOne,
    buttonTwo,
    labelOne,
    labelTwo;

  var DIRECTIVE_SELECTOR = 'tw-radio';
  var BUTTON_SELECTOR = 'button';
  var INPUT_SELECTOR = 'input';
  var LABEL_SELECTOR = '.radio label';

  beforeEach(module('tw.styleguide.forms'));
  beforeEach(module('tw.styleguide.validation'));
  beforeEach(module('tw.styleguide.services'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();

    $scope.ngModel = null;
    $scope.name = 'myCheckbox';
    $scope.ngRequired = true;
    $scope.ngDisabled = false;

    $scope.ngChange = jasmine.createSpy('ngChange');
    $scope.ngFocus = jasmine.createSpy('ngFocus');
    $scope.ngBlur = jasmine.createSpy('ngBlur');

    templateElement = getCompiledTemplateElement($scope);
    twRadios = templateElement.querySelectorAll(DIRECTIVE_SELECTOR);
    twRadioOne = twRadios[0];
    twRadioTwo = twRadios[1];

    $ngModelController = angular.element(twRadioOne).controller('ngModel');

    buttons = templateElement.querySelectorAll(BUTTON_SELECTOR);
    buttonOne = twRadioOne.querySelector(BUTTON_SELECTOR);
    buttonTwo = twRadioTwo.querySelector(BUTTON_SELECTOR);

    var labels = templateElement.querySelectorAll(LABEL_SELECTOR);
    labelOne = labels[0];
    labelTwo = labels[1];
  }));

  describe('when initialised using value attributes', function() {
    it('should add radio replacement for each component', function() {
      expect(buttons.length).toBe(2);
    });
    it('should name a hidden form control', function() {
      var hiddenInput = twRadioOne.querySelector(INPUT_SELECTOR);
      expect(hiddenInput.getAttribute('name')).toBe('myCheckbox');
      expect(hiddenInput.value).toBe('1');
    });
    it('should not be checked when ngModel does not match value', function() {
      expect(buttonOne.classList).not.toContain('checked');
    });

    describe('when the model value is changed', function() {
      beforeEach(function() {
        $scope.ngModel = '1';
        $scope.$apply();
      })
      it('should check the radio with matching value', function() {
        expect(buttonOne.classList).toContain('checked');
      });
    });
  });

  describe('when the radio button is focussed', function() {
    var parentLabel, parentFormGroup;
    beforeEach(function() {
      buttonOne.dispatchEvent(new Event('focus'));
      parentFormGroup = $(twRadioOne).closest('.form-group')[0];
    });

    it('should style nearest parent form-group', function() {
      expect(parentFormGroup.classList).toContain('focus');
    });
    it('should style nearest parent radio label', function() {
      expect(labelOne.classList).toContain('focus');
    });

    // TODO cannot figure out why this doesn't work in tests (works in browser)
    xit('should trigger ngFocus', function() {
      expect($scope.ngFocus).toHaveBeenCalled();
    });

    describe('and then blurred', function() {
      beforeEach(function() {
        buttonOne.dispatchEvent(new Event('blur'));
      });

      it('should set ngModel.$touched', function() {
        expect($ngModelController.$touched).toBe(true);
      });

      // TODO cannot figure out why this doesn't work in tests (works in browser)
      xit('should trigger ngBlur', function() {
        expect($scope.ngBlur).toHaveBeenCalled();
      });
    });
  });

  describe('when the first radio button is clicked', function() {
    beforeEach(function() {
      buttonOne.dispatchEvent(new Event('click'));
    });
    it('should select the first radio', function() {
      expect($scope.ngModel).toBe('1');
      expect(buttonOne.classList).toContain('checked');
    });
    it('should not select the second radio', function() {
      expect(buttonTwo.classList).not.toContain('checked');
    });
    it('should set ngModel.$dirty', function() {
      expect($ngModelController.$dirty).toBe(true);
    });

    // TODO cannot figure out why this doesn't work in tests (works in browser)
    xit('should trigger the ngChange handler', function() {
      expect($scope.ngChange).toHaveBeenCalled();
      expect($scope.ngChange.calls.count()).toBe(1);
    });

    describe('and then the second radio button is clicked', function() {
      beforeEach(function() {
        buttonTwo.dispatchEvent(new Event('click'));
      });
      it('should deselect the first radio', function() {
        expect(buttonOne.classList).not.toContain('checked');
      });
      it('should select the second radio', function() {
        expect($scope.ngModel).toBe('2');
        expect(buttonTwo.classList).toContain('checked');
      });

      // TODO cannot figure out why this doesn't work in tests (works in browser)
      xit('should trigger the ngChange handler again', function() {
        expect($scope.ngChange).toHaveBeenCalled();
        expect($scope.ngChange.calls.count()).toBe(2);
      });
    });
  });

  describe('when a surrounding label is clicked', function() {
    beforeEach(function() {
      $(buttonOne).closest('label')[0].dispatchEvent(new Event('click'));
    });
    it('should change ngModel to value of this radio', function() {
      expect($scope.ngModel).toBe('1');
    });
    // TODO cannot figure out why this doesn't work in tests (works in browser)
    xit('should trigger the ngChange handler', function() {
      expect($scope.ngChange).toHaveBeenCalled();
      expect($scope.ngChange.calls.count()).toBe(1);
    });
  });

  describe('when clicking on a disabled radio', function() {
    beforeEach(function() {
      $scope.ngDisabled = true;
      templateElement = getCompiledTemplateElement($scope);
      buttonOne = templateElement.querySelector('button');
      buttonOne.dispatchEvent(new Event('click'));
    })
    it('should not be selected', function() {
      expect($scope.ngModel).toBe(null);
      expect(buttonOne.classList).not.toContain('checked');
    });
  });

  describe('validation', function() {
    it('should have ng-invalid when required, dirty and unchecked', function() {
      expect(twRadioOne.classList).toContain('ng-invalid');
      expect($ngModelController.$invalid).toBe(true);
    });
  });

  describe('ng-value', function() {
    beforeEach(function() {
      var template = " \
      <div> \
        <label> \
          <tw-radio name='{{name}}' \
            ng-model='ngModel' \
            ng-value='ngValue1' /> \
        </label> \
        <label> \
          <tw-radio name='{{name}}' \
            ng-model='ngModel' \
            ng-value='ngValue2' /> \
        </label> \
      </div>";

      $scope.ngValue1 = 99;
      $scope.ngValue2 = true;
      $scope.ngModel = null;

      templateElement = getCompiledTemplateElement($scope, template);
      buttons = templateElement.querySelectorAll(BUTTON_SELECTOR);
      buttonOne = buttons[0];
      buttonTwo = buttons[1];
      var labels = templateElement.querySelectorAll('label');
      labelOne = labels[0];
      labelTwo = labels[1];
    });

    it('should not set ngModel to ngValue until checked ', function() {
      expect($scope.ngModel).toBe(null);
    });
    it('should not check buttons when ngModel not set', function() {
      expect(buttonOne.classList).not.toContain('checked');
      expect(buttonTwo.classList).not.toContain('checked');
    });
    it('should have a hidden input with the supplied value', function() {
      var hiddenInputOne = templateElement.querySelector(INPUT_SELECTOR);
      expect(hiddenInputOne.value).toBe('99');
    });

    describe('when first radio is clicked', function() {
      beforeEach(function() {
        buttonOne.dispatchEvent(new Event('click'));
      });
      it('should set ngModel to the first ngValue', function() {
        expect($scope.ngModel).toBe(99);
      });
      it('should check first button', function() {
        expect(buttonOne.classList).toContain('checked');
        expect(buttonTwo.classList).not.toContain('checked');
      });

      describe('then second radio is clicked', function() {
        beforeEach(function() {
          buttonTwo.dispatchEvent(new Event('click'));
        });
        it('should set ngModel to the second ngValue', function() {
          expect($scope.ngModel).toBe(true);
        });
        it('should check second button', function() {
          expect(buttonOne.classList).not.toContain('checked');
          expect(buttonTwo.classList).toContain('checked');
        });
      });
    });

    describe('when first label is clicked', function() {
      beforeEach(function() {
        labelOne.dispatchEvent(new Event('click'));
      });
      it('should set ngModel to the first ngValue if label clicked', function() {
        expect($scope.ngModel).toBe(99);
      });
    });
  });

  function getCompiledTemplateElement($scope, template) {
    if (!template) {
      template = " \
        <div class='form-group'> \
          <label class='control-label'> \
              Radio \
          </label> \
          <div class='radio'> \
            <label> \
              <tw-radio name='{{name}}' \
                value='1' \
                ng-model='ngModel' \
                ng-required='ngRequired' \
                ng-disabled='ngDisabled' \
                ng-change='ngChange' \
                ng-focus='ngFocus' \
                ng-blur='ngBlur' /> \
              Radio label 1 \
            </label> \
          </div> \
          <div class='radio'> \
            <label> \
              <tw-radio name='{{name}}' \
                value='2' \
                ng-model='ngModel' \
                ng-required='ngRequired' \
                ng-disabled='ngDisabled' \
                ng-change='ngChange' \
                ng-focus='ngFocus' \
                ng-blur='ngBlur' /> \
              Radio label 2 \
            </label> \
          </div> \
        </div>";
    }
    var element = angular.element(template);
    var compiledElement = $compile(element)($scope);

    $scope.$digest();
    return compiledElement[0];
  }
});
