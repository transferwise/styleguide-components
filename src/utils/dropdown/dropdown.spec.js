'use strict';

fdescribe('Dropdown', function() {
  var $compile,
    $rootScope,
    $scope,
    template,
    trigger,
    parent,
    dropdown,
    outside,
    linkOne,
    linkTwo,
    testUtils;

  var TRIGGER_SELECTOR = '[tw-dropdown]';
  var PARENT_SELECTOR = 'dropdown';
  var DROPDOWN_SELECTOR = 'dropdown-menu';
  var OUTSIDE_SELECTOR = 'outside';
  var LINK_ONE_SELECTOR = 'link-one';
  var LINK_TWO_SELECTOR = 'link-two';

  testUtils = new TestUtils();

  beforeEach(module('tw.styleguide.utils'));
  // beforeEach(module('tw.styleguide.services'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();

    template = getCompiledTemplateElement($scope)[0];
    trigger = template.querySelector(TRIGGER_SELECTOR);
    parent = template.getElementsByClassName(PARENT_SELECTOR)[0];
    dropdown = template.getElementsByClassName(DROPDOWN_SELECTOR)[0];
    outside = template.getElementsByClassName(OUTSIDE_SELECTOR)[0];
    linkOne = template.getElementsByClassName(LINK_ONE_SELECTOR)[0];
    linkTwo = template.getElementsByClassName(LINK_TWO_SELECTOR)[0];
  }));

  describe('when clicking on trigger', function() {
    beforeEach(function() {
      trigger.dispatchEvent(new Event('click'));
    });
    it('should open the dropdown', function() {
      expect(parent.classList.contains('open')).toBe(true);
    });

    fdescribe('and then clicking outside', function() {
      beforeEach(function() {
        outside.dispatchEvent(new Event('click'));
      });
      it('should close the dropdown', function() {
        // console.log(document);
        expect(parent.classList.contains('open')).toBe(false);
      });

      it('should handle clicks on the body', function() {
        document.getElementsByTagName('body')[0].dispatchEvent(new Event('Click'));
        expect(true).toBe(false);
      });
    });

    describe('and then clicking a link inside the dropdown', function() {
      beforeEach(function() {
        linkOne.dispatchEvent(new Event('click'));
      });
      it('should close the dropdown', function() {
        expect(parent.classList.contains('open')).toBe(false);
      });
    });

    describe('and pressing down arrow', function() {
      beforeEach(function() {
        testUtils.typeKeyCode(trigger, testUtils.keys.down);
      });
      it('should focus on first option', function() {
        expect(linkOne).toBe(document.activeElement);
      });
    });
  });

  describe('when focused on a dropdown link', function() {
    beforeEach(function() {
      // Open drop down
      trigger.dispatchEvent(new Event('click'));
      linkOne.focus();
    });

    describe('and press return', function() {
      beforeEach(function() {
        testUtils.typeKeyCode(linkOne, testUtils.keys.return);
      });
      it('should click the link', function() {

      });
      it('should close the dropdown', function() {
        expect(parent.classList.contains('open')).toBe(false);
      });
    });

    describe('and press down arrow', function() {
      beforeEach(function() {
        testUtils.typeKeyCode(linkOne, testUtils.keys.down);
      });
      it('should move focus to next link', function() {
        expect(linkTwo).toBe(document.activeElement);
      });
    });

    describe('and press up arrow', function() {
      beforeEach(function() {
        testUtils.typeKeyCode(linkOne, testUtils.keys.up);
      });
      it('should move focus to next link', function() {
        expect(linkOne).toBe(document.activeElement);
      });
    });
  });


  function getCompiledTemplateElement($scope, template) {
    if (!template) {
      template = " \
        <div class='template'> \
          <div class='dropdown'> \
            <button class='trigger' tw-dropdown>Trigger</button> \
            <ul class='dropdown-menu'> \
              <li><a ng-click='' class='link-one'>One</a></li> \
              <li><span class='non-clickable'>One</span></li> \
              <li><a ng-click='' class='link-two'>Two</a></li> \
            </ul> \
          </div> \
          <div class='outside'></div> \
        </div>";
    }
    return testUtils.compileTemplate($scope, $compile, template);
  }
});
