'use strict';

describe('Checkbox', function() {
  var $compile,
    $rootScope,
    $scope,
    $ngModel,
    templateElement,
    directiveElement,
    button;

  var DIRECTIVE_SELECTOR = 'tw-checkbox';
  var BUTTON_SELECTOR = 'button';
  var INPUT_SELECTOR = 'input';
  var LABEL_SELECTOR = '.checkbox label';

  beforeEach(function() {
    angular.mock.module('tw.styleguide.forms.checkbox');

    angular.mock.inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
    });

    $scope = $rootScope.$new();

    $scope.ngModel = null;
    $scope.name = 'myCheckbox';
    $scope.ngRequired = true;

    $scope.ngClick = function() {};
    $scope.ngFocus = function() {};
    $scope.ngBlur = function() {};

    templateElement = getCompiledTemplateElement($scope);
    directiveElement = templateElement.find(DIRECTIVE_SELECTOR);
    $ngModel = directiveElement.controller('ngModel');
    button = directiveElement.find(BUTTON_SELECTOR);
  });

  describe('init', function() {
    it('should add checkbox replacement', function() {
      expect(button.length).toBe(1);
    });
    it('should name a hidden form control', function() {
      var hiddenInput = directiveElement.find(INPUT_SELECTOR);
      expect(hiddenInput.attr('name')).toBe('myCheckbox');
    });

    it('should not be checked when ngModel is false', function() {
      // TODO Requires CSS!!!
      //expect(button.find('.tw-checkbox-check').is(':visible')).toBe(false);
      expect(button.hasClass('checked')).toBe(false);
    });

    it('should already be checked when ngModel is true', function() {
      $scope.ngModel = true;
      templateElement = getCompiledTemplateElement($scope);
      button = templateElement.find(BUTTON_SELECTOR);
      // TODO Requires CSS!!!
      //expect(templateElement.find('.tw-checkbox-check').is(':visible')).toBe(true);
      expect(button.hasClass('checked')).toBe(true);
    });
  });

  describe('interactions', function() {
    it('should change state to true when button clicked', function() {
        button.trigger('click');
        expect($scope.ngModel).toBe(true);
    });

    it('should revert state to false on second click', function() {
      button.trigger('click').trigger('click');
      expect($scope.ngModel).toBe(false);
    });

    // Safari and Phantom double click for some reason,
    // I suspect default label behaviour not prevented
    xit('should toggle state when containing label is clicked', function() {
      var label = templateElement.find(LABEL_SELECTOR)[0];
      label.dispatchEvent(new CustomEvent('click'));
      expect($scope.ngModel).toBe(true);
    });

    it('should set ngModel.$dirty when button clicked', function() {
      button.trigger('click');
      expect($ngModel.$dirty).toBe(true);
    });

    it('should set ngModel.$touched when blured', function() {
      button.triggerHandler('blur')
      expect($ngModel.$touched).toBe(true);
    });

    it('should style nearest ".checkbox label" when focussed', function() {
      button.triggerHandler('focus');
      expect(directiveElement.closest('.checkbox').find('label').hasClass('focus')).toBe(true);
    });

    it('should style nearest parent form-group when focussed', function() {
      button[0].dispatchEvent(new CustomEvent('focus'));
      expect(directiveElement.closest('.form-group').hasClass('focus')).toBe(true);
    });

    it('should style nearest parent checkbox label when focussed', function() {
      button.triggerHandler('focus');
      expect(directiveElement.closest('.checkbox').find('label').hasClass('focus')).toBe(true);
    });
  });

  describe('validation', function() {
    it('should be invalid when required, interacted with, and unchecked', function() {
      button.trigger('click').trigger('click').triggerHandler('blur');
      var checkboxContainer = button.closest('.checkbox');
      expect(checkboxContainer.hasClass('has-error')).toBe(true);
      expect(button.hasClass('has-error')).toBe(true);
    });
  });

  describe('ng-true-value and ng-false-value', function() {
    beforeEach(function() {
      var template = "<tw-checkbox name='{{name}}' \
        ng-model='ngModel' \
        ng-true-value='trueValue' \
        ng-false-value='falseValue' />";

      $scope.trueValue = 'custom-true';
      $scope.falseValue = 'custom-false';
      $scope.ngModel = null;

      directiveElement = getCompiledTemplateElement($scope, template);
      button = directiveElement.find(BUTTON_SELECTOR);
    });

    it('should not set ngModel to either until changed ', function() {
      expect($scope.ngModel).toBe(null);
    });
    it('should set ngModel to the true value if checked', function() {
      button.trigger('click');
      expect($scope.ngModel).toBe('custom-true');
    });
    it('should set ngModel to the false value if unchecked', function() {
      // Set to true then false
      button.trigger('click');
      button.trigger('click');
      expect($scope.ngModel).toBe('custom-false');
    });
  });

  describe('ng-focus', function() {
    xit('should be triggered when button focussed', function() {
      jest.spyOn($scope, 'ngFocus').mockImplementation(() => {});
      templateElement = getCompiledTemplateElement($scope);
      button = templateElement.find(BUTTON_SELECTOR);
      button.triggerHandler('focus');
      expect($scope.ngFocus).toHaveBeenCalled();
    });
  });
  describe('ng-blur', function() {
    xit('should be triggered when button blurred', function() {
      jest.spyOn($scope, 'ngBlur').mockImplementation(() => {});
      templateElement = getCompiledTemplateElement($scope);
      button = templateElement.find(BUTTON_SELECTOR);
      button.triggerHandler('blur');
      expect($scope.ngBlur).toHaveBeenCalled();
    });
  });

  function getCompiledTemplateElement($scope, template) {
    if (!template) {
      template = " \
        <div class='form-group'> \
          <label class='control-label'> \
            Checkboxes \
          </label> \
          <div class='checkbox'> \
            <label> \
              <tw-checkbox name='{{name}}' \
                ng-model='ngModel' \
                ng-required='ngRequired' \
                ng-click='ngClick' \
                ng-focus='ngFocus' \
                ng-blur='ngBlur' /> \
              Checkbox label \
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
