describe('TwPopoverService', function() {
  var service = null,
    $window = null,
    popover = null,

    promotedElementTemplate = " \
      <a class='promoted-element'> \
        Show a popover next to this element \
      </a>",
    popoverOptions = {
      'title': '<span>Transferwise</span>',
      'content': '<span>Rules</span>',
      'image': 'http://transferwise.com/logo.png',
      'placement': 'right-top',
      'template': "<div class='popover'> \n" +
        "<h3 class='popover-title'></h3> \n" +
        "<img class='popover-image' /> \n" +
        "<div class='popover-content'></div> \n" +
      '</div>',
      'contentHtml': true
    };

  beforeEach(module('tw.styleguide-components'));

  beforeEach(inject(function($injector) {
    service = $injector.get('twPopOverService');
    $window = $injector.get('$window');
  }));

  it('should load the service', function() {
    expect(typeof service).toBe('object');
  });

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

    it('should append the popover and make it visible', function () {
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

    it('should have the correct image', function() {
      var popoverImageElement = popover.querySelector('.popover-image');
      var popoverImageURL = popoverImageElement && popoverImageElement.getAttribute('src');

      expect(popoverImageURL).toBe(popoverOptions.image);
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
