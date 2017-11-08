describe('Popover directive', function() {
  var $compile,
      $rootScope,
      $scope,
      $window,
      popover;

  beforeEach(module('tw.styleguide-components'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();
    $window = $injector.get('$window');
  }));

  describe('when we click on a popover trigger', function () {
    beforeEach(function () {
      var promotedElement = getCompiledDirectiveElement($scope)[0];
      promotedElement.click();

      popover = document.querySelector('.popover');
    });

    afterEach(function() {
      $window.document.body.removeChild(document.querySelector('.popover'));
    });

    it('should append a popover on the body', function () {
      var popoverAppended = $window.document.body.contains(popover);
      var popoverVisible = !popover.classList.contains('scale-down');
      var popoverVisibility = popoverAppended && popoverVisible;

      expect(popoverVisibility).toBe(true);
    });

    it('should have a working custom template', function() {
      var popoverContent = popover.querySelector('.popover-content');
      var popoverInfo = popover.querySelector('.popover-info');

      popoverContent = popoverContent && popoverContent.innerHTML.trim();
      popoverInfo = popoverInfo && popoverInfo.innerHTML.trim();

      expect(popoverContent === popoverInfo).toBe(true);
    })

    describe('when we click outside the popover', function () {
      beforeEach(function () {
        $window.document.body.click();
      });

      it('should hide the popover', function () {
        var popoverAppended = $window.document.body.contains(popover);
        var popoverHidden = popover.classList.contains('scale-down');
        var popoverNotVisible = popoverAppended && popoverHidden;

        expect(popoverNotVisible).toBe(true);
      });
    });
  });

  function getCompiledDirectiveElement(scope, template) {
    if (!template) {
      template = " \
        <a tw-pop-over \
          data-original-title='Popover title' \
          data-content='Full description copy, explaining in more detail'\
          data-content-html='<div class=\"popover-content\">__content__</div> \
                             <div class=\"popover-info\">__content__</div>'> \
            Clicky \
        </a>";
    }

    var element = angular.element(template);
    var compiledElement = $compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }
});
