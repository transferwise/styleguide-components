describe('TwPopoverService', function() {
  var service = null,
    $window = null,
    popover = null,

    promotedElementTemplate = " \
      <a class='promoted-element'> \
        Show a popover next to this element \
      </a>",
    popoverOptions = {
      'placement': 'right',
      'title': 'Transferwise',
      'content': 'Rules',
      'info': 'More info',
      'template': " \
        <div class='popover-title'>__title__</div> \
        <div class='popover-content'>__content__</div> \
        <div class='popover-info'>__info__</div> \
      "
    };

  beforeEach(module('tw.styleguide-components'));

  beforeEach(inject(function($injector) {
    service = $injector.get('twPopOverService');
    $window = $injector.get('$window');
  }));

  describe('when we show a popover', function() {
    beforeEach(function() {
      /**
       * Insert the element, for which we want to display the popover, as the
       * last child of the body tag
       */
      $window.document.body.insertAdjacentHTML('beforeend', promotedElementTemplate);

      /**
       * Display the popover for the .promoted-element with the @popoverOptions
       */
      service.showPopover(document.querySelector('.promoted-element'), popoverOptions);

      popover = document.querySelector('.popover');
    });

    afterEach(function() {
      $window.document.body.removeChild(document.querySelector('.promoted-element'));
      $window.document.body.removeChild(document.querySelector('.popover'));
    });

    it('should append the popover to the body element', function () {
      var popoverAppended = $window.document.body.contains(popover);
      var popoverVisible = !popover.classList.contains('scale-down');
      var popoverVisibility = popoverAppended && popoverVisible;

      expect(popoverVisibility).toBe(true);
    });

    it('should have the correct title', function() {
      var popoverTitleElement = popover.querySelector('.popover-title');
      var popoverTitle = popoverTitleElement && popoverTitleElement.innerHTML.trim();

      expect(popoverTitle).toBe(popoverOptions.title);
    });

    it('should have the correct content', function() {
      var popoverContentElement = popover.querySelector('.popover-content');
      var popoverContent = popoverContentElement && popoverContentElement.innerHTML.trim();

      expect(popoverContent).toBe(popoverOptions.content);
    });

    it('should work with a custom template', function() {
      var popoverInfoElement = popover.querySelector('.popover-info');
      var popoverInfo = popoverInfoElement && popoverInfoElement.innerHTML.trim();

      expect(popoverInfo).toBe(popoverOptions.info);
    });

    describe('when we hide a popover', function() {
      beforeEach(function() {
        service.hidePopover();
      });

      it('should hide the popover', function() {
        var popoverAppended = $window.document.body.contains(popover);
        var popoverHidden = popover.classList.contains('scale-down');
        var popoverNotVisible = popoverAppended && popoverHidden;

        expect(popoverNotVisible).toBe(true);
      });
    });
  });
});
