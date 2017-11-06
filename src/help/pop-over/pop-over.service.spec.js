'use strict';

describe('TwPopoverService', function() {
  var service = null,
    $window = null,
    popover = null,

    elementWithPopover = " \
      <a class='has-popover'> \
        Show a popover next to this element \
      </a>",
    popoverOptions = {
      'placement': 'right',
      'title': 'Transferwise',
      'content': 'Rules',
      'info': 'More info',
      'html': " \
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
      $window.document.body.insertAdjacentHTML('beforeend', elementWithPopover);

      service.showPopover(document.querySelector('.has-popover'), popoverOptions);
      popover = document.querySelector('.popover');
    });

    afterEach(function() {
      $window.document.body.removeChild(document.querySelector('.has-popover'));
      $window.document.body.removeChild(document.querySelector('.popover'));
    });

    it('should append the popover to the body element', function () {
      var popoverAppended = $window.document.body.contains(popover);
      var popoverVisible = !popover.classList.contains('scale-down');
      var popoverVisibility = popoverAppended && popoverVisible;

      expect(popoverVisibility).toBe(true);
    });

    it('should have the correct title', function() {
      var popoverTitle = popover.querySelector('.popover-title');

      expect(popoverTitle.innerHTML).toBe(popoverOptions.title);
    });

    it('should have the correct content', function() {
      var popoverTitle = popover.querySelector('.popover-content');

      expect(popoverTitle.innerHTML.trim()).toBe(popoverOptions.content);
    });

    it('should work with a custom template', function() {
      var popoverInfo = popover.querySelector('.popover-info');

      expect(popoverInfo.innerHTML.trim()).toBe(popoverOptions.info);
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
