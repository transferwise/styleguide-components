'use strict';

describe('Popover directive', function() {
  var $compile,
      $rootScope,
      $scope,
      $window,
      element;

  beforeEach(module('tw.styleguide-components'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();
    $window = $injector.get('$window');
  }));

  describe('when we click on a popover trigger', function () {
    beforeEach(function () {
      element = getCompiledDirectiveElement($scope)[0];
      element.click();
    });

    it('should append a popover on the body', function () {
      var popover = document.querySelector('.popover');
      var bodyChildren = [].slice.call($window.document.body.children);
      var popoverAppended = bodyChildren.indexOf(popover) >= 0;
      var popoverVisible = !popover.classList.contains('scale-down');

      expect(popoverAppended && popoverVisible).toBe(true);
    });

    describe('when we click outside the popover', function () {
      beforeEach(function () {
        document.body.click();
      });

      it('should hide the popover', function () {
        var popover = document.querySelector('.popover');
        var bodyChildren = [].slice.call($window.document.body.children);
        var popoverAppended = bodyChildren.indexOf(popover) >= 0;
        var popoverInvisible = popover.classList.contains('scale-down');

        expect(popoverAppended && popoverInvisible).toBe(true);
      });
    });
  });

  function getCompiledDirectiveElement(scope, template) {
    if (!template) {
      template = " \
        <a tw-pop-over \
          data-original-title='Popover title' \
          data-content='Full description copy, explaining in more detail'>\
            Simple click based \
        </a>";
    }

    var element = angular.element(template);
    var compiledElement = $compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }
});
