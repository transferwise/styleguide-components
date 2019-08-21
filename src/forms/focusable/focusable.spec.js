'use strict';

describe('Focusable', function() {
  var $compile,
    $rootScope,
    $scope,
    formGroupElement,
    focusableElement;

  var FOCUSABLE_SELECTOR = '[tw-focusable]';

  beforeEach(function() {
    angular.mock.module('tw.styleguide.forms.focusable');

    angular.mock.inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
    });

    $scope = $rootScope.$new();

    formGroupElement = getCompiledTemplateElement($scope);
    focusableElement = formGroupElement.find(FOCUSABLE_SELECTOR);
  });

  describe('when focusing on an element with focus states', function() {
    beforeEach(function() {
      var focusEvent = new CustomEvent('focus');
      var element = focusableElement[0];
      element.dispatchEvent(focusEvent);
    });
    it('should apply the focus class to a parent form group', function() {
      expect(formGroupElement.hasClass('focus')).toBe(true);
    });

    describe('and then blurring the element', function() {
      beforeEach(function() {
        var blurEvent = new CustomEvent('blur');
        var element = focusableElement[0];
        element.dispatchEvent(blurEvent);
      });
      it('should not retain the focus class', function() {
        expect(formGroupElement.hasClass('focus')).toBe(false);
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
          <input type='text' class='' tw-focusable /> \
        </div>";
    }
    var element = angular.element(template);
    var compiledElement = $compile(element)($scope);

    $scope.$digest();
    return compiledElement;
  }
});
