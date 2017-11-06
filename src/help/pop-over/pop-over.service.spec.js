'use strict';

describe('TwPopoverService test', function() {
  var service = null;
  var $window = null;

  var elementWithPopover = " \
    <a class='has-popover'> \
      Show a popover next to this element \
    </a>";
  var popoverOptions = {
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

    $window.document.body.insertAdjacentHTML('beforeend', elementWithPopover);
  }));

  describe('when we show a popover', function() {
    beforeEach(function() {
      var elementWithPopover = document.querySelector('.has-popover');

      service.showPopover(elementWithPopover, popoverOptions);
    });

    afterEach(function() {
      $window.document.body.removeChild(document.querySelector('.has-popover'));
      $window.document.body.removeChild(document.querySelector('.popover'));
    });

    it('should append the popover to the body element', function () {
      var popover = document.querySelector('.popover');
      var bodyChildren = [].slice.call($window.document.body.children);
      var popoverAppended = bodyChildren.indexOf(popover) >= 0;
      var popoverVisible = !popover.classList.contains('scale-down');

      expect(popoverAppended && popoverVisible).toBe(true);
    });

    it('should have the correct title', function() {
      var popover = document.querySelector('.popover');
      var popoverTitle = popover.querySelector('.popover-title');

      expect(popoverTitle.innerHTML).toBe(popoverOptions.title);
    });

    it('should have the correct content', function() {
      var popover = document.querySelector('.popover');
      var popoverTitle = popover.querySelector('.popover-content');

      expect(popoverTitle.innerHTML.trim()).toBe(popoverOptions.content);
    });

    it('should work with a custom template', function() {
      var popover = document.querySelector('.popover');
      var popoverInfo = popover.querySelector('.popover-info');

      expect(popoverInfo.innerHTML.trim()).toBe(popoverOptions.info);
    });

    describe('when we hide a popover', function() {
      beforeEach(function() {
        service.hidePopover();
      });

      it('should hide the popover', function() {
        var popover = document.querySelector('.popover');
        var bodyChildren = [].slice.call($window.document.body.children);
        var popoverAppended = bodyChildren.indexOf(popover) >= 0;
        var popoverInvisible = popover.classList.contains('scale-down');

        expect(popoverAppended && popoverInvisible).toBe(true);
      })
    });
  });
});
