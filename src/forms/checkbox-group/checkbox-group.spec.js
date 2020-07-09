'use strict';

import checkboxGroup from ".";

describe('Checkbox Group', function() {
  var $compile,
    $rootScope,
    $scope,
    $ngModel,
    $timeout,
    internalModel,
    templateElement,
    directiveElement,
    button,
    checkbox,
    Checkbox;

  var DIRECTIVE_SELECTOR = 'tw-checkbox-group';
  var BUTTON_SELECTOR = 'button';
  var CHECKBOX_SELECTOR = "tw-checkbox";
  
  beforeEach(function() {
    Checkbox = getMockComponent('twCheckbox');

    angular.mock.module('tw.styleguide.forms.checkbox');
    angular.mock.module('tw.styleguide.forms.checkbox-group');
    
    angular.mock.inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $timeout = $injector.get('$timeout');
    });

    $scope = $rootScope.$new();

    $scope.ngModel = null;
    $scope.name = 'myCheckboxGroup';
    $scope.ngDisabled = false;
    $scope.ngRequired = true;
    $scope.options = [{value: "1", label: "test 1"}, {value: "2", label: "test 2"}];

    
    templateElement = getCompiledTemplateElement($scope);
    directiveElement = () => templateElement.find(DIRECTIVE_SELECTOR);
    $ngModel = () => directiveElement().controller('ngModel');
    internalModel = () => angular.element(directiveElement()).scope();
    checkbox = () =>  directiveElement().find(CHECKBOX_SELECTOR);
    button = () => directiveElement().find(BUTTON_SELECTOR);
  });

  describe('init', function() {
    it('should render checkboxes for all options', function() {
      expect(checkbox().length).toBe(2);
    });

    it('should render correct initial value', function() {
      $scope.ngModel = ["1"];
      $scope.$apply()
      
      expect(getCheckBoxValue(checkbox()[0])).toBe(true);
      expect(getCheckBoxValue(checkbox()[1])).toBeFalsy();
      
      $scope.ngModel = ["1", "2"];
      $scope.$apply()
      expect(getCheckBoxValue(checkbox()[0])).toBe(true);
      expect(getCheckBoxValue(checkbox()[1])).toBe(true);
      
    });
  });

  describe('interactions', function() {
    it('should change the model when checkbox gets checked', function() {
      expect(getCheckBoxValue(checkbox()[0])).toBeFalsy();
      button()[0].click();
      expect(getCheckBoxValue(checkbox()[0])).toBe(true);
      expect($ngModel().$viewValue).toEqual(["1"]);
    });

    it('should pass "disabled" prop to checkboxes', function() {
      expect(checkbox()[0].getAttribute('disabled')).toBe(null)
      $scope.ngDisabled = true
      $scope.$apply();
      expect(checkbox()[0].getAttribute('disabled')).toBe("disabled")
    });

    it('should be invalid when required, interacted with, and none of checkboxes is checked', function() {
      var form = templateElement.find('.form-group');
      expect(form.hasClass('has-error')).toBe(false);
      button()[0].click();
      $scope.$digest();
      $timeout.flush();
      expect(form.hasClass('has-error')).toBe(false);
      button()[0].click();
      $scope.$digest();
      $timeout.flush();
      expect(form.hasClass('has-error')).toBe(true);
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
