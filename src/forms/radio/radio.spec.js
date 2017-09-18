'use strict';

describe('Radio', function() {
  var $compile,
    $rootScope,
    $scope,
    $ngModel,
    templateElement,
    directiveElement,
    buttons,
    buttonOne,
    buttonTwo;

  var DIRECTIVE_SELECTOR = 'tw-radio';
  var BUTTON_SELECTOR = 'button';
  var INPUT_SELECTOR = 'input';
  var LABEL_SELECTOR = '.checkbox label';

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
    $scope.ngFocus = function() { console.log("focus!!!!!!!!!!"); };
    $scope.ngBlur = function() { console.log("blur!!!!!!!!!!"); };
    templateElement = getCompiledTemplateElement($scope);
    directiveElement = templateElement.find(DIRECTIVE_SELECTOR);
    $ngModel = directiveElement.controller('ngModel');
    buttons = directiveElement.find(BUTTON_SELECTOR);
    buttonOne = $(buttons[0]);
    buttonTwo = $(buttons[1]);
  }));

  describe('init', function() {
    it('should add radio replacement for each directive', function() {
      expect(buttons.length).toBe(2);
    });
    it('should name a hidden form control', function() {
      var hiddenInput = directiveElement.find(INPUT_SELECTOR);
      expect(hiddenInput.attr('name')).toBe('myCheckbox');
      expect(hiddenInput.attr('value')).toBe('1');
    });
    it('should not be checked when ngModel does not match value', function() {
      // TODO Requires CSS!!!
      //expect(buttons.find('.tw-radio-check').is(':visible')).toBe(false);
      expect(buttonOne.hasClass('checked')).toBe(false);
    });

    it('should already be checked when ngModel matches value', function() {
      $scope.ngModel = '1';
      templateElement = getCompiledTemplateElement($scope);
      buttons = templateElement.find(BUTTON_SELECTOR);
      buttonOne = $(buttons[0]);
      // TODO Requires CSS!!!
      //expect(templateElement.find('.tw-radio-check').is(':visible')).toBe(true);
      expect(buttonOne.hasClass('checked')).toBe(true);
    });
  });
  describe('interactions', function() {
    it('should select first radio when first button clicked', function() {
      buttonOne.trigger('click');
      expect($scope.ngModel).toBe('1');
      expect(buttonOne.hasClass('checked')).toBe(true);
      expect(buttonTwo.hasClass('checked')).toBe(false);
    });
    // TODO test browsers do not propogate this in the same way?
    xit('should change ngModel to value of this radio when surrounding label clicked', function() {
      buttonOne.closest('label').trigger('click');
      expect($scope.ngModel).toBe('1');
    });
    it('should select second radio when second radio subsequently clicked', function() {
      buttonOne.trigger('click');
      buttonTwo.trigger('click');
      expect($scope.ngModel).toBe('2');
      expect(buttonOne.hasClass('checked')).toBe(false);
      expect(buttonTwo.hasClass('checked')).toBe(true);
    });

    it('should set ngModel.$dirty when button clicked', function() {
      buttonOne.triggerHandler('click');
      expect($ngModel.$dirty).toBe(true);
    });

    it('should set ngModel.$touched when blured', function() {
      buttonOne.triggerHandler('blur')
      expect($ngModel.$touched).toBe(true);
    });

    it('should style nearest ".radio label" when focussed', function() {
      buttonOne.triggerHandler('focus');
      expect(directiveElement.closest('.radio').find('label').hasClass('focus')).toBe(true);
    });

    it('should style nearest parent form-group when focussed', function() {
      buttonOne[0].dispatchEvent(new Event('focus'));
      expect(directiveElement.closest('.form-group').hasClass('focus')).toBe(true);
    });

    it('should style nearest parent radio label when focussed', function() {
      buttonOne.triggerHandler('focus');
      expect(directiveElement.closest('.radio').find('label').hasClass('focus')).toBe(true);
    });
  });
  describe('validation', function() {
    it('should have ng-invalid when required and unchecked', function() {
      expect(directiveElement.hasClass('ng-invalid')).toBe(true);
      expect($ngModel.$invalid).toBe(true);
    });
    // TODO Not usre this should be invalid as not dirty, just touched
    xit('should be invalid when required, blurred, and unchecked', function() {
      var checkboxContainer = buttonOne.closest('.checkbox');
      buttonOne.triggerHandler('focus');
      buttonOne.triggerHandler('blur');
      expect(checkboxContainer.hasClass('has-error')).toBe(true);
    });
  });
  describe('when disabled', function() {
    it('should not select first radio on click', function() {
      $scope.ngDisabled = true;
      templateElement = getCompiledTemplateElement($scope);
      buttonOne = $(templateElement.find('button')[0]);

      buttonOne.trigger('click');
      expect($scope.ngModel).toBe(null);
      expect(buttonOne.hasClass('checked')).toBe(false);
    });
  });


  describe('ng-value', function() {
    var labels, labelOne, labelTwo;

    beforeEach(function() {
      var template = " \
      <label> \
          <tw-radio name='{{name}}' \
              ng-model='ngModel' \
              ng-value='ngValue1' /> \
      </label> \
      <label> \
          <tw-radio name='{{name}}' \
              ng-model='ngModel' \
              ng-value='ngValue2' /> \
      </label>";

      $scope.ngValue1 = 99;
      $scope.ngValue2 = true;
      $scope.ngModel = null;

      templateElement = getCompiledTemplateElement($scope, template);
      buttons = templateElement.find(BUTTON_SELECTOR);
      buttonOne = $(buttons[0]);
      buttonTwo = $(buttons[1]);
      labels = templateElement.find('label');
      labelOne = $(labels[0]);
      labelTwo = $(labels[1]);
    });

    it('should not set ngModel to ngValue until checked ', function() {
      expect($scope.ngModel).toBe(null);
    });
    it('should not check buttons when ngModel not set', function() {
      expect(buttonOne.hasClass('checked')).toBe(false);
      expect(buttonTwo.hasClass('checked')).toBe(false);
    });
    it('should set ngModel to the first ngValue if button clicked', function() {
      buttonOne.trigger('click');
      expect($scope.ngModel).toBe(99);
    });
    // TODO this does not trigger chnage in the same way as real browsers
    xit('should set ngModel to the first ngValue if label clicked', function() {
      labelOne.trigger('click');
      expect($scope.ngModel).toBe(99);
    });
    it('should check first button when first button clicked', function() {
      buttonOne.trigger('click');
      expect(buttonOne.hasClass('checked')).toBe(true);
      expect(buttonTwo.hasClass('checked')).toBe(false);
    });
    it('should set ngModel to the second ngValue if checked', function() {
      buttonTwo.trigger('click');
      expect($scope.ngModel).toBe(true);
    });
    it('should check second button when second button clicked', function() {
      buttonOne.trigger('click');
      buttonTwo.trigger('click');
      expect(buttonOne.hasClass('checked')).toBe(false);
      expect(buttonTwo.hasClass('checked')).toBe(true);
    });
    it('should have a hidden input withe supplied value', function() {
      var hiddenInputOne = $(templateElement.find(INPUT_SELECTOR)[0]);
      expect(hiddenInputOne.attr('value')).toBe('99');
    });
  });

  describe('ng-focus', function() {
    xit('should be triggered when button focussed', function() {
      spyOn($scope, 'ngFocus').and.callThrough();
      templateElement = getCompiledTemplateElement($scope);
      buttons = templateElement.find(BUTTON_SELECTOR);
      buttonOne = $(buttons[0]);
      buttonOne.triggerHandler('focus');
      expect($scope.ngFocus).toHaveBeenCalled();
    });
  });
  describe('ng-blur', function() {
    xit('should be triggered when button blurred', function() {
      spyOn($scope, 'ngBlur').and.callThrough();
      templateElement = getCompiledTemplateElement($scope);
      buttons = templateElement.find(BUTTON_SELECTOR);
      buttonOne = $(buttons[0]);

      buttonOne.triggerHandler('blur');
      expect($scope.ngBlur).toHaveBeenCalled();
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
    return compiledElement;
  }
});
