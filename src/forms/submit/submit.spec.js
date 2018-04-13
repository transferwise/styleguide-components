'use strict';

describe('Given a submit button component', function() {
  var $compile, $rootScope, $scope, $timeout, $q, form, button, process;

  var PROCESS_SELECTOR = 'tw-process';
  var BUTTON_SELECTOR = 'button';

  beforeEach(function() {
    module('tw.styleguide.forms');

    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $timeout = $injector.get('$timeout');
      $q = $injector.get('$q');
      $scope = $rootScope.$new();
    });

    $scope.label = 'Submit';
    $scope.onSubmit = jasmine.createSpy('onSubmit');
    $scope.onSuccess = jasmine.createSpy('onSuccess');
    $scope.onFailure = jasmine.createSpy('onFailure');

    form = getCompiledDirectiveElement($scope);
    button = form.querySelector(BUTTON_SELECTOR);
    process = button.querySelector(PROCESS_SELECTOR);
  });

  describe('when initialised', function() {
    it('should render without a process component visible', function() {
      expect(process).toBeFalsy();
    });
    it('should render the supplied label', function() {
      expect(button.innerText.trim()).toEqual($scope.label);
    });
    it('should render a primary submit button', function() {
      expect(button.classList).toContain('btn-primary');
    });
  });

  describe('when a parent form is submitted', function() {
    beforeEach(function() {
      dispatchEvent(form, 'submit');
      $scope.$digest();
    });
    it('should disabled the button', function() {
      expect(button.hasAttribute('disabled')).toBeTruthy();
    });
    it('should trigger the submit callback', function() {
      expect($scope.onSubmit).toHaveBeenCalled();
    });
  });

  describe('when the button is clicked', function() {
    beforeEach(function() {
      dispatchEvent(button, 'click');
      $scope.$digest();
    });
    it('should submit the form', function() {
      expect($scope.testForm.$submitted).toBe(true);
    });
    it('should disabled the button', function() {
      expect(button.hasAttribute('disabled')).toBeTruthy();
    });
    it('should trigger the submit callback', function() {
      expect($scope.onSubmit).toHaveBeenCalled();
    });
  });

  describe('when assigned a promise', function() {
    beforeEach(function() {
      dispatchEvent(button, 'click');
      $scope.promise = $q.defer().promise;
      $scope.$digest();
      $timeout.flush();
      process = button.querySelector(PROCESS_SELECTOR);
    });
    it('should show the process component', function() {
      expect(process).toBeTruthy();
    });
  });

  describe('when a promise resolves succesfully', function() {
    beforeEach(function() {
      dispatchEvent(button, 'click');
      $scope.promise = $q.when(true);
      $scope.$digest();
      $timeout.flush();
      process = form.querySelector(PROCESS_SELECTOR);
    });
    // TODO mock component and test bindings
    // it('should pass success state to process indicator', function() {
    //
    // });
    it('should trigger the success callback', function() {
      expect($scope.onSuccess).toHaveBeenCalled();
    });
    it('should reenable the button', function() {
      expect(button.hasAttribute('disabled')).toBeFalsy();
    });
  });

  describe('when a promise resolution fails', function() {
    beforeEach(function() {
      dispatchEvent(button, 'click');
      $scope.promise = $q.reject();
      $scope.$digest();
      $timeout.flush();
      process = button.querySelector(PROCESS_SELECTOR);
    });
    it('should show a failed result', function() {
      expect(button.classList).toContain('btn-danger');
    });
    // TODO mock component and test bindings
    // it('should pass failure state to process indicator', function() {
    //
    // });
    it('should trigger the failure callback', function() {
      expect($scope.onFailure).toHaveBeenCalled();
    });
    it('should reenable the button', function() {
      expect(button.hasAttribute('disabled')).toBeFalsy();
    });
  });

  describe('when resubmitting after a failure ', function() {
    beforeEach(function() {
      dispatchEvent(button, 'click');
      $scope.promise = $q.reject();
      $scope.$digest();
      $timeout.flush();
      dispatchEvent(button, 'click');
      $scope.promise = $q.defer().promise;
      $scope.$digest();
    });
    it('should revert to primary button styling', function() {
      expect(button.classList).not.toContain('btn-danger');
      expect(button.classList).toContain('btn-primary');
    });
  });

  function dispatchEvent(element, type) {
    element.dispatchEvent(new CustomEvent(type));
  }

  function getCompiledDirectiveElement(scope, template) {
    if (!template) {
      template = " \
        <form name='testForm'> \
          <tw-submit \
            label='label' \
            promise='promise' \
            ng-disabled='ngDisabled' \
            on-submit='onSubmit()' \
            on-success='onSuccess()' \
            on-failure='onFailure()' \
          ></tw-submit> \
        </form>";
    }

    var element = angular.element(template);
    var compiledElement = $compile(element)(scope);
    scope.$digest();
    return compiledElement[0];
  }
});
