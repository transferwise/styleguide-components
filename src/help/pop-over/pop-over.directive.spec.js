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

    it('should display the correct title', function() {
      var popoverTitle = popover.querySelector('.popover-title');

      expect(popoverTitle.innerHTML).toBe('&lt;span&gt;Popover title&lt;/span&gt;');
    });

    it('should have a working custom template', function() {
      var popoverImage = popover.querySelector('.popover-image');
      var popoverAlt = popoverImage.getAttribute('src');

      expect(popoverAlt).toBe('http://www.transferwise.com/logo.png');
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
          data-original-title='<span>Popover title</span>' \
          data-content='Full description copy, explaining in more detail'\
          data-image='http://www.transferwise.com/logo.png'\
          data-template='<h3 class=\"popover-title\"></h3> \
                         <img class=\"popover-image\" alt=\"Popover content\" /> \
                         <div class=\"popover-content\"></div>'> \
            Click it \
        </a>";
    }

    var element = angular.element(template);
    var compiledElement = $compile(element)(scope);
    scope.$digest();
    return compiledElement;
  }
});
