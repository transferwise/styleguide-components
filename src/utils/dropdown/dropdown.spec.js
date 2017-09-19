'use strict';

fdescribe('Dropdown', function() {
  var $compile,
    $rootScope,
    $scope,
    $document,
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

  var doc;

  testUtils = new TestUtils();

  beforeEach(function() {
    // Create a new virtual document
    doc = document.implementation.createHTMLDocument();

    module('tw.styleguide.utils', function($provide) {
      // Use our virtual document when $document service injected
      $provide.value('$document', angular.element(doc));
    });
  });
  //beforeEach(module('tw.styleguide.utils'));
  // beforeEach(module('tw.styleguide.services'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $document = $injector.get('$document');
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
      console.log('click to open');
      trigger.dispatchEvent(new Event('click'));
      console.log(parent.classList);
    });
    it('should open the dropdown', function() {
      expect(parent.classList.contains('open')).toBe(true);
    });

    describe('and then clicking outside', function() {
      beforeEach(function() {
        console.log('click outside...');
        console.log(parent.classList);
        var body = doc.getElementsByTagName('body')[0];
        body.dispatchEvent(new Event('click'));
        // outside.dispatchEvent(new Event('click')); // TODO doesn't trigger body handler?
      });
      it('should close the dropdown', function() {
        // console.log(document);
        expect(parent.classList.contains('open')).toBe(false);
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
        expect(linkOne).toBe(doc.activeElement);
      });
    });
  });

  fdescribe('when focused on a dropdown link', function() {
    beforeEach(function() {
      // Open drop down
      trigger.dispatchEvent(new Event('click'));
      linkOne.focus();
    });
    fit('should be focussed', function() {
      console.log(linkOne);
      console.log(doc.activeElement);
      expect(doc.activeElement).toBe(linkOne);
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
        console.log(linkTwo);
        console.log(doc.activeElement);
        //expect(document.activeElement).toBe(linkTwo);
        expect($(linkTwo).is(':focus')).toBe(linkTwo);
      });
    });

    describe('and press up arrow', function() {
      beforeEach(function() {
        testUtils.typeKeyCode(linkOne, testUtils.keys.up);
      });
      it('should move focus to next link', function() {
        expect(linkOne).toBe(doc.activeElement);
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
    var compiled = testUtils.compileTemplate($scope, $compile, template);
    angular.element(doc).find('body').append(compiled);
    // angular.element('body').append(compiled);
    return compiled;
  }
});
