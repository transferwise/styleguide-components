describe('TwPopoverService', function() {
  var PopoverService = null;

  var promoElement;
  var popover;

  var config;

  beforeEach(function() {
    angular.mock.module('tw.styleguide.help.popover');

    angular.mock.inject(function($injector) {
      PopoverService = $injector.get('twPopOverService');
    });
  });

  it('should load the service', function() {
    expect(typeof PopoverService).toBe('object');
  });

  describe('when the body element is 200px wide', function() {
    beforeEach(function() {
      /**
       * Shared DOM structure between test suites polutes this test suite
       */
      document.body.innerHTML = '';
      document.body.style.width = '200px';
    });

    beforeEach(function() {
      promoElement = getPromotedElement({
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '10px',
        height: '10px'
      });

      config = getPopoverConfiguration({
        element: {
          node: promoElement
        }
      });

      document.body.appendChild(promoElement);

      popover = PopoverService.showPopover(config);
    });

    it('should append the popover and make it visible', function() {
      var popoverAppended = document.body.contains(popover);
      var popoverVisible = !popover.classList.contains('scale-down');
      var popoverVisibility = popoverAppended && popoverVisible;

      expect(popoverVisibility).toBe(true);
    });

    it('should have the correct title', function() {
      var popoverTitleElement = popover.querySelector('.popover-title');
      var popoverTitle = popoverTitleElement && popoverTitleElement.innerHTML.trim();

      expect(popoverTitle).toBe(config.popover.content.title);
    });

    it('should have the correct content', function() {
      var popoverContentElement = popover.querySelector('.popover-content');
      var popoverContent = popoverContentElement && popoverContentElement.innerHTML.trim();

      expect(popoverContent).toBe(config.popover.content.content);
    });

    it('should have the correct image', function() {
      var popoverImageElement = popover.querySelector('.popover-image');
      var popoverImageURL = popoverImageElement && popoverImageElement.getAttribute('src');

      expect(popoverImageURL).toBe(config.popover.content.image);
    });

    it('should position the popover on the right of the promoted element', function() {
      var promoElement = document.body.querySelector('.promoted-element');

      var promoElementWidth = parseInt(promoElement.style.width);
      var popoverLeftOffset = parseInt(popover.style.left);

      expect(popoverLeftOffset).toBe(promoElementWidth + config.popover.customOptions.spacing);
      expect(popover.classList.contains(config.popover.options.placement)).toBe(true);
    });

    describe('when positioning on the left', function() {
      beforeEach(function() {
        document.body.innerHTML = '';
      });

      beforeEach(function() {
        promoElement = getPromotedElement({
          position: 'fixed',
          top: '0px',
          left: '0px',
          width: '10px',
          height: '10px'
        });

        config = getPopoverConfiguration({
          element: {
            node: promoElement
          },
          popover: {
            options: {
              placement: 'left'
            }
          }
        });

        document.body.appendChild(promoElement);

        popover = PopoverService.showPopover(config);
      });

      it('should position the popover on the right when there is no space on the left', function() {
        var promoElement = document.body.querySelector('.promoted-element');

        var promoElementWidth = parseInt(promoElement.style.width);
        var popoverLeftOffset = parseInt(popover.style.left);

        expect(popoverLeftOffset).toBe(promoElementWidth + config.popover.customOptions.spacing);
        expect(popover.classList.contains('right')).toBe(true);
      });
    });

    describe('when the modal transformation option is enabled', function() {
      beforeEach(function() {
        document.body.innerHTML = '';
      });

      beforeEach(function() {
        promoElement = getPromotedElement({
          position: 'fixed',
          top: '0px',
          left: '0px',
          width: '10px',
          height: '10px'
        });

        config = getPopoverConfiguration({
          element: {
            node: promoElement
          },
          popover: {
            customOptions: {
              modalTransform: true
            }
          }
        });

        document.body.appendChild(promoElement);

        popover = PopoverService.showPopover(config);
      });

      it('should render the popover in modal mode', function() {
        var popoverAppended = document.body.contains(popover);
        var popoverIsVisible = !popover.classList.contains('scale-down');
        var popoverVisible = popoverAppended && popoverIsVisible;

        expect(popoverVisible).toBe(true);
        expect(popover.classList.contains('popover-modal'));
      });
    });

    describe('when we hide a popover', function() {
      beforeEach(function() {
        PopoverService.hidePopover(config);
      });

      it('should hide the popover', function() {
        var popoverAppended = document.body.contains(popover);
        var popoverHidden = popover.classList.contains('scale-down');
        var popoverNotVisible = popoverAppended && popoverHidden;

        expect(popoverNotVisible).toBe(true);
      });
    });
  });

  function getPromotedElement(styles) {
    var promoElement = document.createElement('div');
    promoElement.className = 'promoted-element';

    Object.keys(styles).forEach(function(key) {
      promoElement.style[key] = styles[key];
    });

    return promoElement;
  }

  function getPopoverConfiguration(config) {
    var DEFAULT_CONFIG = {
      element: {
        node: undefined
      },
      popover: {
        content: {
          title: '<span>Transferwise</span>',
          content: '<span>Rules</span>',
          image: 'http://transferwise.com/logo.png'
        },
        options: {
          container: 'body',
          contentHtml: true,
          placement: 'right-top',
          trigger: 'click',
          template:
            "<div class='popover'>" +
            "<h3 class='popover-title'></h3>" +
            "<img class='popover-image' />" +
            "<div class='popover-content'></div>" +
            '</div>'
        },
        customOptions: {
          spacing: 10,
          fixedPosition: false,
          highlightElement: false,
          modalTransform: false
        }
      }
    };

    return merge(DEFAULT_CONFIG, config);
  }

  function merge(current, update) {
    Object.keys(update).forEach(function(key) {
      if (
        current.hasOwnProperty(key) &&
        typeof current[key] === 'object' &&
        !(current[key] instanceof Array)
      ) {
        merge(current[key], update[key]);
      } else {
        current[key] = update[key];
      }
    });
    return current;
  }
});
