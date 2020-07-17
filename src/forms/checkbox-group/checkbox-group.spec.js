'use strict';

import checkboxGroup from ".";

describe('Checkbox Group', () => {
  var $compile,
    $rootScope,
    $scope,
    template,
    $element,
    checkbox1,
    checkbox2,
    button1,
    button2;

  var COMPONENT_SELECTOR = 'tw-checkbox-group';
  var BUTTON_SELECTOR = 'button';
  var CHECKBOX_SELECTOR = "tw-checkbox";

  beforeEach(() => {
    angular.mock.module('tw.styleguide.forms.checkbox');
    angular.mock.module('tw.styleguide.forms.checkbox-group');

    angular.mock.inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
    });

    $scope = $rootScope.$new();

    $scope.ngModel = [1];
    $scope.name = 'myCheckboxGroup';
    $scope.ngDisabled = false;
    $scope.ngRequired = true;
    $scope.options = [{value: 1, label: 'One'}, {value: 2, label: 'Two'}];

    template = getCompiledTemplateElement($scope);
    $element = template.find(COMPONENT_SELECTOR);

    [ checkbox1, checkbox2 ] = $element.find(CHECKBOX_SELECTOR);
    [ button1, button2] = $element.find(BUTTON_SELECTOR);
  });

  describe('init', () => {
    it('should render checkboxes for all options', () => {
      expect($element.find(CHECKBOX_SELECTOR).length).toBe(2);
    });

    it('should render correct initial value', () => {
      expect(getCheckBoxValue(checkbox1)).toBe(true);
      expect(getCheckBoxValue(checkbox2)).toBe(false);
    });

    it('should render the correct labels', () => {
      const [ label1, label2 ] = $element.find('label');
      expect(label1.innerText.trim()).toBe('One');
      expect(label2.innerText.trim()).toBe('Two');
    });
  });

  describe('when the model that is passed in changes', () => {
    beforeEach(() => {
      $scope.ngModel = [2];
      $scope.$apply();
    });
    it('should update the checkboxes to reflect the model', () => {
      expect(getCheckBoxValue(checkbox1)).toBe(false);
      expect(getCheckBoxValue(checkbox2)).toBe(true);
    });
  });

  describe('when the options that are passed in change and the model is still valid', () => {
    beforeEach(() => {
      $scope.options = [{value: 1, label: 'One'}, {value: 3, label: 'Three'}];
      $scope.$apply();
      [ checkbox1, checkbox2 ] = $element.find(CHECKBOX_SELECTOR);
    });

    it('should update the labels', () => {
      const [ label1, label2 ] = $element.find('label');
      expect(label1.innerText.trim()).toBe('One');
      expect(label2.innerText.trim()).toBe('Three');
    });

    it('should update the checkboxes to reflect the model', () => {
      expect(getCheckBoxValue(checkbox1)).toBe(true);
      expect(getCheckBoxValue(checkbox2)).toBe(false);
    });

    it('should maintain the model value', () => {
      expect($scope.model).toEqual([1]);
    });
  });

  describe('when the options that are passed in change and the model is no longer valid', () => {
    beforeEach(() => {
      $scope.options = [{value: 2, label: 'Two'}, {value: 3, label: 'Three'}];
      $scope.$apply();
      [ checkbox1, checkbox2 ] = $element.find(CHECKBOX_SELECTOR);
    });

    it('should update the labels', () => {
      const [ label1, label2 ] = $element.find('label');
      expect(label1.innerText.trim()).toBe('Two');
      expect(label2.innerText.trim()).toBe('Three');
    });

    it('should update the checkboxes to reflect the model', () => {
      expect(getCheckBoxValue(checkbox1)).toBe(false);
      expect(getCheckBoxValue(checkbox2)).toBe(false);
    });

    it('should update the model value', () => {
      expect($scope.model).toEqual([]);
    });
  });

  describe('when the checxboxes are clicked', () => {
    beforeEach(() => {
      button1.click();
      button2.click();
    });
    it('should update the model', () => {
      expect(getCheckBoxValue(checkbox1)).toBe(false);
      expect(getCheckBoxValue(checkbox2)).toBe(true);
      expect($element.controller('ngModel').$viewValue).toEqual([2]);
    });
  });

  describe('when the control is disabled', () => {
    beforeEach(() => {
      $scope.ngDisabled = true
      $scope.$apply();
    });
    it('should pass "disabled" prop to checkboxes', () => {
      expect(checkbox1.getAttribute('disabled')).toBe('disabled');
      expect(checkbox2.getAttribute('disabled')).toBe('disabled');
    });
  });

  describe('when a value is required, the control has been interacted with and none of the checkboxes are selected', () => {
    fit('the form group should be invalid ', () => {
      const formGroup = template.find('.form-group')[0];

      expect(formGroup.classList).not.toContain('has-error');
      button1.click();
      expect(formGroup.classList).toContain('has-error');
      button2.click();
      expect(formGroup.classList).not.toContain('has-error');
    });
  });

  function getCheckBoxValue(checkbox) {
    return angular.element(checkbox).controller('ngModel').$viewValue;
  }

  function getCompiledTemplateElement($scope, template) {
    if (!template) {
      template = " \
        <div> \
        <div class='form-group'> \
          <tw-checkbox-group name='{{name}}' \
            options=\"options\" \
            ng-model='ngModel' \
            ng-required='ngRequired' \
            ng-click='ngClick' \
            ng-disabled='ngDisabled' \
            ng-blur='ngBlur' /> \
        </div></div>";
    }
    var element = angular.element(template);
    var compiledElement = $compile(element)($scope);

    $scope.$digest();
    return compiledElement;
  }
});
