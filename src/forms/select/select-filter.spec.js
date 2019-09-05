'use strict';

describe('Select', function() {
  var $compile,
    $rootScope,
    $scope,
    component;

  var SELECT_SELECTOR = '.tw-select-hidden';
  var LIST_ITEMS_SELECTOR = '.tw-select-option-link';
  var FILTER_INPUT_SELECTOR = '.tw-select-filter';

  beforeEach(function() {
    angular.mock.module('tw.styleguide.forms.select');

    angular.mock.inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();
    });
  });

  describe('when no filter attribute is supplied', function() {
    beforeEach(function() {
      $scope.options = OPTIONS;
      $scope.ngModel = '1';
      $scope.filter = null;
      component = getComponent($scope);
    });

    it('should not be displayed in the template', function() {
      var filter = component.find(FILTER_INPUT_SELECTOR);
      expect(filter.length).toBe(0);
    });
  });

  describe('when a filter attribute is supplied', function() {
    var $filterInput,
      filterInput,
      $button,
      button;

    beforeEach(function() {
      $scope.options = OPTIONS;
      $scope.ngModel = '1';
      $scope.filter = 'Search';
      component = getComponent($scope);
      $filterInput = component.find(FILTER_INPUT_SELECTOR);
    });

    it('should render a search input in the dropdown', function() {
      expect($filterInput.length).toBe(1);
    });
  });

  describe('when using the search input', function() {
    var filterInput, $filterInput,
      button;
    beforeEach(function() {
      $scope.options = OPTIONS;
      $scope.ngModel = '1';
      $scope.filter = 'Search';

      component = getComponent($scope);

      $filterInput = component.find(FILTER_INPUT_SELECTOR);
      filterInput = $filterInput[0];
      button = component.find('.btn')[0];

      $filterInput.focus();
    });

    describe('when characters are entered', function() {
      it('should filter the list', function() {
        $filterInput.val("One").trigger('change');
        var options = component.find(LIST_ITEMS_SELECTOR);
        expect(options.length).toBe(1);
        expect(optionText(options[0])).toBe('One');
      });
      it('should include options that match case insensitively', function() {
        $filterInput.val("t").trigger('change');
        var options = component.find(LIST_ITEMS_SELECTOR);
        expect(options.length).toBe(2);
        expect(optionText(options[0])).toBe('Two');
        expect(optionText(options[1])).toBe('Three');
      });
      it('should include options that match on substrings', function() {
        $filterInput.val("ne").trigger('change');
        var options = component.find(LIST_ITEMS_SELECTOR);
        expect(options.length).toBe(1);
        expect(optionText(options[0])).toBe('One');
      });
      it('should change ngModel to first visible option if none selected', function() {
        $filterInput.val("t").trigger('change');
        var options = component.find(LIST_ITEMS_SELECTOR);
        expect($scope.ngModel).toBe('2');
        expect(optionText(options[0])).toBe('Two');
      });
    });

    describe('when an option is selected', function() {
      beforeEach(function() {
        $scope.ngModel = '2';
        $scope.$digest();
      });

      describe('and the down arrow is pressed', function() {
        beforeEach(function() {
          triggerKeyCode(filterInput, SPECIAL_KEYS.down);
        });
        it('should select the next option', function() {
          expect($scope.ngModel).toBe('3');
        });
        it('should retain focus', function() {
          expect(filterInput === document.activeElement).toBe(true);
        });
      });

      describe('and the up arrow is pressed', function() {
        beforeEach(function() {
          triggerKeyCode(filterInput, SPECIAL_KEYS.up);
        });
        it('should select the previous option', function() {
          expect($scope.ngModel).toBe('1');
        });
        it('should retain focus', function() {
          expect(filterInput === document.activeElement).toBe(true);
        });
      });

      describe('and the return key is pressed', function() {
        beforeEach(function() {
          triggerKeyCode(filterInput, SPECIAL_KEYS.return);
        });
        it('should focus back on the select button', function() {
          expect(button === document.activeElement).toBe(true);
        });
      });
    });

    describe('when no option is selected', function() {
      beforeEach(function() {
        $scope.ngModel = '99';
        $scope.$digest();
      });

      describe('and the down arrow is pressed', function() {
        beforeEach(function() {
          triggerKeyCode(filterInput, SPECIAL_KEYS.down);
        });
        it('should move to the first option ', function() {
          expect($scope.ngModel).toBe(OPTIONS[0].value);
        });
      });

      describe('and the up arrow is pressed', function() {
        beforeEach(function() {
          triggerKeyCode(filterInput, SPECIAL_KEYS.up);
        });
        it('should move to the last option  ', function() {
          expect($scope.ngModel).toBe(OPTIONS[OPTIONS.length - 1].value);
        });
      });
    });

    describe('when the last option is selected', function() {
      beforeEach(function() {
        $scope.ngModel = '3';
        $scope.$digest();
      });
      describe('and the down arrow is pressed', function() {
        beforeEach(function() {
          triggerKeyCode(filterInput, SPECIAL_KEYS.down);
        });
        it('should move focus to custom action', function() {
          expect(component.find('.custom-action')[0] === document.activeElement).toBe(true);
        });
      });
    });

    describe('when there are no matching search results', function() {
      var selectedElements
      beforeEach(function() {
        $filterInput.val('a').trigger('change');
      });
      it('should not show any options', function() {
        expect(component[0].querySelectorAll(LIST_ITEMS_SELECTOR).length).toBe(0);
      });

      describe('and the return key is pressed', function() {
        beforeEach(function() {
          triggerKeyCode(filterInput, SPECIAL_KEYS.return);
        });

        it('should prevent the default action', function() {
          var optionOne = OPTIONS[1];
          expect($scope.ngModel).toBe(optionOne.value);
        });
      });
    });
  });

  describe('when filtering two options with the same label and value', function() {
    var $filterInput;
    beforeEach(function () {
      $scope.options = [{
        value: '1',
        label: 'Cain'
      },{
        value: '0',
        label: 'Abel'
      },{
        value: '1',
        label: 'Cain'
      }];
      $scope.filter = 'Search';

      component = getComponent($scope);
      $filterInput = component.find(FILTER_INPUT_SELECTOR);
    });

    it('should show one result, removing duplicates', function() {
      $filterInput.val("ca").trigger('change');
      var options = component.find(LIST_ITEMS_SELECTOR);
      expect(options.length).toBe(1);
      expect(optionText(options[0])).toBe('Cain');
    });
  });

  function getComponent($scope, template) {
    if (!template) {
      template = " \
        <tw-select \
          options='options' \
          ng-model='ngModel' \
          filter='{{filter}}'> \
          <a href='' class='custom-action'> \
            Custom action \
          </a> \
        </tw-select>";
    }
    var element = angular.element(template);
    // append to document so we can test document.activeElement
    angular.element(document.body).append(element);
    var compiledElement = $compile(element)($scope);

    $scope.$digest();
    return compiledElement;
  }

  function optionText(optionEl) {
    return $(optionEl).text().trim();
  }

  function triggerKeyCode(target, charCode) {
    target.dispatchEvent(keyEventByCode('keydown', charCode, target));
    target.dispatchEvent(keyEventByCode('keypress', charCode, target));
    target.dispatchEvent(keyEventByCode('keyup', charCode, target));
  }

  function keyEventByCode(eventName, charCode, target) {
    var event = document.createEvent('Event');
    event.initEvent(eventName);
    event.keyCode = charCode;
    event.which = charCode;
    return event;
  }

  var SPECIAL_KEYS = {
    up: 38,
    down: 40,
    return: 13,
    tab: 9
  }

  var OPTIONS = [{
    value: '0',
    label: 'Zero'
  },{
    value: '1',
    label: 'One'
  },{
    value: '2',
    label: 'Two'
  },{
    value: '3',
    label: 'Three'
  }];
});
