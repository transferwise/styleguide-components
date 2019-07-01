'use strict';

describe('Select', function() {
  var $compile,
    $rootScope,
    $scope,
    component;

  var SELECT_SELECTOR = '.tw-select-hidden';
  var LIST_ITEMS_SELECTOR = '.tw-select-option-link';
  var FILTER_INPUT_SELECTOR = '.tw-select-filter';

  var SELECTED_LABEL_SELECTOR = '.tw-select-selected .tw-select-label';
  var SELECTED_NOTE_SELECTOR = '.tw-select-selected .tw-select-note';
  var SELECTED_SECONDARY_SELECTOR = '.tw-select-selected .tw-select-secondary';
  var SELECTED_CURRENCY_FLAG_SELECTOR = '.tw-select-selected .currency-flag';
  var SELECTED_ICON_SELECTOR = '.tw-select-selected .icon';
  var SELECTED_CIRCLE_SELECTOR = '.tw-select-selected .circle';

  var OPTION_NOTE_SELECTOR = '.dropdown-menu .tw-select-note';
  var OPTION_SECONDARY_SELECTOR = '.dropdown-menu .tw-select-secondary';
  var OPTION_CURRENCY_FLAG_SELECTOR = '.dropdown-menu .currency-flag';
  var OPTION_ICON_SELECTOR = '.dropdown-menu a > .icon';
  var OPTION_CIRCLE_IMAGE_SELECTOR = '.dropdown-menu .circle img';
  var OPTION_CIRCLE_TEXT_SELECTOR = '.dropdown-menu .tw-select-circle-text';
  var OPTION_CIRCLE_ICON_SELECTOR = '.dropdown-menu .circle .icon';
  var OPTION_DISABLED_SELECTOR = '.dropdown-menu .disabled';
  var OPTION_LOAD_MORE_SELECTOR = '.dropdown-menu .tw-select-load-more';

  beforeEach(module('tw.styleguide.forms'));
  beforeEach(module('tw.styleguide.services'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();
  }));

  describe('init', function() {
    describe('basics', function() {
      beforeEach(function() {
        $scope.options = OPTIONS;
        $scope.ngModel = null;
        $scope.name = 'testName';

        component = getComponent($scope);
      });
      it('should render supplied options', function() {
        var listElements = component.find(LIST_ITEMS_SELECTOR);
        expect(listElements.length).toBe(OPTIONS.length);
      });
      it('should name hidden input like component', function() {
        expect(component.find(SELECT_SELECTOR).attr('name')).toBe($scope.name);
      });
    });

    describe('when intialised with an ngModel', function() {
      describe('as non-empty string that matches an option', function() {
        beforeEach(function() {
          $scope.options = OPTIONS;
          $scope.ngModel = '2';
          component = getComponent($scope);
        });
        it('should show selected text', function() {
          var selectedTextElement = component.find(SELECTED_LABEL_SELECTOR)[0];
          expect($(selectedTextElement).text().trim()).toBe('Two');
        });
        it('should not show placeholder', function() {
          $scope.ngRequired = true;
          component = getComponent($scope);
          var placeholerElement = component.find('.form-control-placeholder');
          expect(placeholerElement.length).toBe(0);
        });
        it('should not change ngModel', function() {
          expect($scope.ngModel).toBe('2');
        });
        it('should set the value of hidden control', function() {
          expect(component.find(SELECT_SELECTOR).val()).toBe('2');
        });
        describe('when ngModel changes', function() {
          beforeEach(function() {
            $scope.ngModel = '3';
            $scope.$digest();
          });
          it('should show new model as selected', function () {
            expect(component.find(SELECT_SELECTOR).val()).toBe('3');
          });
          it('should update the selected text', function() {
            var selectedTextElement = component.find(SELECTED_LABEL_SELECTOR)[0];
            expect($(selectedTextElement).text().trim()).toBe('Three');
          });
        });
      });
      describe('as empty string', function() {
        beforeEach(function() {
          $scope.options = OPTIONS;
          $scope.ngModel = '';
          component = getComponent($scope);
        });
        it('should not show selected text', function() {
          var selectedElement = component.find(SELECTED_LABEL_SELECTOR);
          expect(selectedElement.length).toBe(0);
        });
        it('should show placeholder', function() {
          var placeholderElement = component.find('.form-control-placeholder');
          expect(placeholderElement.length).toBe(1);
        });
        it('should not change ngModel', function() {
          expect($scope.ngModel).toBe('');
        });
      });
      describe('as string that does not match an option', function() {
        beforeEach(function() {
          $scope.options = OPTIONS;
          $scope.ngModel = '99';
          component = getComponent($scope);
        });
        it('should not show selected text', function() {
          var selectedElement = component.find(SELECTED_LABEL_SELECTOR);
          expect(selectedElement.length).toBe(0);
        });
        it('should show placeholder', function() {
          var placeholderElement = component.find('.form-control-placeholder');
          expect(placeholderElement.length).toBe(1);
        });
        it('should not change ngModel', function() {
          expect($scope.ngModel).toBe('99');
        });
        it('should not change ngModel even if ngRequired', function() {
          $scope.ngModel = '99';
          $scope.$digest();
          expect($scope.ngModel).toBe('99');
        });
      });
      describe('as non-zero number that matches an option', function() {
        beforeEach(function() {
          $scope.options = OPTIONS_NUMERIC;
          $scope.ngModel = 2;
          component = getComponent($scope);
        });
        it('should show selected text', function() {
          var selectedTextElement = component.find(SELECTED_LABEL_SELECTOR)[0];
          expect($(selectedTextElement).text().trim()).toBe('Two');
        });
        it('should not change ngModel if set', function() {
          expect($scope.ngModel).toBe(2);
        });
        it('should not show placeholder', function() {
          var placeholerElement = component.find('.form-control-placeholder');
          expect(placeholerElement.length).toBe(0);
        });
        it('should set the value of hidden control', function() {
          // always string...
          expect(component.find(SELECT_SELECTOR).val()).toBe('2');
        });
      });
      describe('as numeric zero that matches an option', function() {
        beforeEach(function() {
          $scope.options = OPTIONS_NUMERIC;
          $scope.ngModel = 0;
          component = getComponent($scope);
        });
        it('should show matching option label', function() {
          var selectedTextElement = component.find(SELECTED_LABEL_SELECTOR)[0];
          expect($(selectedTextElement).text().trim()).toBe(OPTIONS_NUMERIC[0].label);
        });
        it('should not show placeholder', function() {
          var placeholderElement = component.find('.form-control-placeholder');
          expect(placeholderElement.length).toBe(0);
        });
        it('should not change to a non-zero value', function() {
          expect($scope.ngModel).toBe(0);
        });
      });

      describe('as object that matches an option', function() {
        beforeEach(function() {
          $scope.options = OPTIONS_OBJECTS;
          $scope.ngModel = {id: 2};
          component = getComponent($scope);
        });
        it('should show selected text', function() {
          var selectedTextElement = component.find(SELECTED_LABEL_SELECTOR)[0];
          expect($(selectedTextElement).text().trim()).toBe('Two');
        });
        it('should not show placeholder', function() {
          component = getComponent($scope);
          var placeholerElement = component.find('.form-control-placeholder');
          expect(placeholerElement.length).toBe(0);
        });
        it('should not change ngModel', function() {
          expect($scope.ngModel).toEqual({id: 2});
        });
        it('should set the value of hidden control', function() {
            // always string...
          expect(component.find(SELECT_SELECTOR).val()).toBe(JSON.stringify({id: 2}));
        });
      })
    });

    describe('when ngModel not supplied', function() {
      beforeEach(function() {
        $scope.options = OPTIONS;
        $scope.ngModel = null;
        component = getComponent($scope);
      });
      it('should show placeholder', function() {
        var placeholerElement = component.find('.form-control-placeholder');
        expect(placeholerElement.length).toBe(1);
      });
      it('should not set ngModel', function() {
        expect($scope.ngModel).toBe(null);
      });
      it('should not show selected text', function() {
        var selectedElement = component.find(SELECTED_LABEL_SELECTOR);
        expect(selectedElement.length).toBe(0);
      });
    });

    describe('when ngModel not supplied but ngRequired', function() {
      beforeEach(function() {
        $scope.options = OPTIONS_EXTRAS;
        $scope.ngModel = null;
        $scope.ngRequired = true;
        component = getComponent($scope);
      });
      it('should select first option with a value', function() {
        expect($scope.ngModel).toBe(OPTIONS_EXTRAS[1].value);
      });
      it('should show selected text', function() {
        var selectedTextElement = component.find(SELECTED_LABEL_SELECTOR)[0];
        expect($(selectedTextElement).text().trim()).toBe(OPTIONS_EXTRAS[1].label);
      });
      it('should select first value even if 0', function() {
        $scope.options = OPTIONS_NUMERIC;
        $scope.ngModel = 0;
        component = getComponent($scope);
        expect($scope.ngModel).toBe(OPTIONS_NUMERIC[0].value);
      });
    });
  });

  describe('placeholder', function() {
    it('should display in options if present', function() {
      $scope.options = OPTIONS;
      $scope.placeholder = 'Please choose...';
      component = getComponent($scope);
      expect(component.find('li a').length).toBe(OPTIONS.length + 1);
    });
    it('should not display in options if not present', function() {
      $scope.options = OPTIONS;
      $scope.placeholder = null;
      component = getComponent($scope);
      expect(component.find('li a').length).toBe(OPTIONS.length);
    });
  });

  describe('click controls', function() {
    var button;
    beforeEach(function() {
      $scope.options = OPTIONS;
      $scope.ngModel = null;
      component = getComponent($scope);
      button = component.find('.btn');
    });
    it('should open dropdown when button clicked', function() {
      button.trigger('click');
      $scope.$digest();

      // TODO problem with loading dropdown.js? Or timing?
      //setTimeout(function() {
        var buttonGroupElement = component.find('.btn-group');
        //console.log(buttonGroupElement.attr('class'));
        //expect(buttonGroupElement.hasClass('open')).toBe(true);
        //expect(false).toBe(true);
      //});
    });
  });

  describe('keyboard controls', function() {
    var $button,
      button;

    beforeEach(function() {
      $scope.options = OPTIONS;
      $scope.ngModel = null;
      $scope.ngRequired = true;
      component = getComponent($scope);
      $button = component.find('.btn');
      button = $button[0];
    });

    it('should select matching option beginning with pressed letter', function() {
      triggerKeypress(button, 'O');
      var selectedElements = component.find('.active');
      expect(selectedElements.length).toBe(1);

      var selectedOptionElement = selectedElements[0];
      var OptionOne = OPTIONS[1];
      expect($scope.ngModel).toBe(OptionOne.value);
      expect($(selectedOptionElement).text().trim()).toBe(OptionOne.label);
    });
    it('should select first matching option beginning with pressed letter', function() {
      triggerKeypress(button, 'T');
      var selectedElements = component.find('.active');
      expect(selectedElements.length).toBe(1);

      var selectedOptionElement = selectedElements[0];
      expect($scope.ngModel).toBe('2');
      expect($(selectedOptionElement).text().trim()).toBe('Two');
    });
    it('should select option beginning with pressed letter case insensitively', function() {
      triggerKeypress(button, 't');
      var selectedElements = component.find('.active');
      expect(selectedElements.length).toBe(1);

      var selectedOptionElement = selectedElements[0];
      expect($scope.ngModel).toBe('2');
      expect($(selectedOptionElement).text().trim()).toBe('Two');
    });
    it('should append to existing search string to match on subsequent letters', function() {
      triggerKeypress(button, 'T');
      triggerKeypress(button, 'h');
      var selectedElements = component.find('.active');
      expect(selectedElements.length).toBe(1);

      var selectedOptionElement = selectedElements[0];
      expect($scope.ngModel).toBe('3');
      expect($(selectedOptionElement).text().trim()).toBe('Three');
    });
    it('should try a new search if appending to existing search produces no match', function() {
      triggerKeypress(button, 'T');
      triggerKeypress(button, 'o');
      var selectedElements = component.find('.active');
      expect(selectedElements.length).toBe(1);

      var selectedOptionElement = selectedElements[0];
      expect($scope.ngModel).toBe('1');
      expect($(selectedOptionElement).text().trim()).toBe('One');
    });
    it('should not use new search if appending to existing search still produces a match', function() {
      triggerKeypress(button, 'T');
      triggerKeypress(button, 'w');
      triggerKeypress(button, 'o');
      var selectedElements = component.find('.active');
      expect(selectedElements.length).toBe(1);

      var selectedOptionElement = selectedElements[0];
      expect($scope.ngModel).not.toBe('1');
      expect($(selectedOptionElement).text().trim()).not.toBe('One');
    });
    it('should open dropdown and select first option when down arrow pressed', function() {
      $button.focus();
      triggerKeyCode(button, SPECIAL_KEYS.down);
      var selectedOptionElement = component.find('.active')[0];
      var firstOption = OPTIONS[0];
      expect($scope.ngModel).toBe(firstOption.value);
      expect($(selectedOptionElement).text().trim()).toBe(firstOption.label);

      // dropdown.js not working in tests
      //var buttonGroupElement = component.find('.btn-group');
      //expect(buttonGroupElement.hasClass('open')).toBe(true);
    });

    describe('when dropdown item has focus', function() {
      it('should select item below when down arrow pressed', function() {
        $scope.ngModel = OPTIONS[1].value;
        $scope.$digest();

        var secondLink = component.find('.active a')[0];
        $(secondLink).focus();
        triggerKeyCode(secondLink, SPECIAL_KEYS.down);

        // Dropdown.js not working in tests
        var thirdLink = component.find('.active a')[0];
        //expect($scope.ngModel).toBe(OPTIONS[2].value);
        //expect($(thirdLink).text().trim()).toBe(OPTIONS[2].label);
      });
      it('should select item above when up arrow pressed', function() {
        $scope.ngModel = OPTIONS[2].value;
        $scope.$digest();

        var thirdLink = component.find('.active a')[0];
        $(thirdLink).focus();
        triggerKeyCode(thirdLink, SPECIAL_KEYS.up);

        // Dropdown.js not working in tests
        var secondLink = component.find('.active a')[0];
        //expect($scope.ngModel).toBe(OPTIONS[1].value);
        //expect($(secondLink).text().trim()).toBe(OPTIONS[1].label);
      });
      it('should not select next option when tab presses', function() {
        var firstLink = component.find('.active a')[0];
        $(firstLink).focus();
        triggerKeyCode(firstLink, SPECIAL_KEYS.down);

        var activeLink = component.find('.active a')[0];
        // TODO this test is correct, but as dropdown.js not working,
        // not testing much right now
        expect($scope.ngModel).toBe(OPTIONS[0].value);
        expect($(activeLink).text().trim()).toBe('Zero');
      });
      it('should skip next option if header', function() {
        $scope.options = OPTIONS_HEADER;
        $scope.ngModel = 1;
        $scope.$digest();

        var firstLink = component.find('.active a')[0];
        $(firstLink).focus();
        triggerKeyCode(firstLink, SPECIAL_KEYS.down);

        var activeLink = component.find('.active a')[0];
        // TODO Dropdown.js not working in tests
        //expect($scope.ngModel).toBe(3);
        //expect($(activeLink).text().trim()).toBe('Three');
      });
      it('should skip next option if disabled', function() {
        $scope.options = OPTIONS_DISABLED;
        $scope.ngModel = 1;
        $scope.$digest();

        var firstLink = component.find('.active a')[0];
        $(firstLink).focus();
        triggerKeyCode(firstLink, SPECIAL_KEYS.down);

        var activeLink = component.find('.active a')[0];
        // TODO Dropdown.js not working in tests
        //expect($scope.ngModel).toBe(3);
        //expect($(activeLink).text().trim()).toBe('Three');
      });
    });
  });

  describe('event handlers', function() {
    var button;
    beforeEach(function() {
      $scope.options = OPTIONS;
      $scope.ngModel = '1';
      $scope.onChange = function(newVale, oldVal) {};
      $scope.onBlur = function() {};
      var template = " \
        <tw-select \
          options='options' \
          ng-model='ngModel' \
          ng-change='onChange()'\
          ng-blur='onBlur()'> \
        </tw-select>";
      component = getComponent($scope, template);
      button = component.find('.btn');
    });
    it('should trigger ngChange when internal model changes', function() {
      spyOn($scope, 'onChange');
      component.controller('ngModel').$setViewValue('2');
      expect($scope.ngModel).toBe('2');
      expect($scope.onChange).toHaveBeenCalled();
    });
    // TODO Fix this
    xit('should trigger ngChange with new and old values', function() {
      spyOn($scope, 'onChange');
      component.controller('ngModel').$setViewValue('2');
      expect($scope.onChange).toHaveBeenCalledWith('2', '1');
    });
    it('should not trigger ngChange on first open', function() {
      spyOn($scope, 'onChange');
      button.trigger('click');
      expect($scope.onChange).not.toHaveBeenCalled();
    });
    // TODO does not work because code must wait 150ms for dropdown.js
    xit('should trigger ngBlur once when control loses focus', function() {
      spyOn($scope, 'onBlur');
      button.trigger('focusout');
      expect($scope.onBlur).toHaveBeenCalled();
      expect($scope.onBlur.calls.count()).toEqual(1);
    });
  });

  describe('when options change', function() {
    // TODO digest is not updating options, but this works in browser
    xit('should show new options list', function() {
      $scope.options = [{value: '90', label: 'Ninety'}];
      $scope.$digest();
      expect(component.find(LIST_ITEMS_SELECTOR).length).toBe(1);
    });
  });

  describe('when using transclusion to pass in a custom action', function() {
    beforeEach(function() {
      $scope.options = OPTIONS;
      $scope.ngModel = '1';
      var template = " \
        <tw-select \
          options='options' \
          ng-model='ngModel'> \
          <a class='transcluded-content'></a> \
        </tw-select>";
      component = getComponent($scope, template);
    });
    it('should render transcluded content in the dropdown', function() {
      var transcluded = component.find('.transcluded-content');
      expect(transcluded.length).toBe(1);
      expect(transcluded.parent().is('li')).toBe(true);
    });
  });

  describe('when no filter attribute is supplied', function() {
    it('should not be dispalyed in the template', function() {
      var filter = component.find(FILTER_INPUT_SELECTOR);
      expect(filter.length).toBe(0);
    });
  });

  describe('when a long list of options is supplied', function() {
    var template, component;
    beforeEach(function() {
      $scope.options = OPTIONS_LONG;
      $scope.ngModel = '1';
      template = " \
        <tw-select \
          options='options' \
          ng-model='ngModel'> \
        </tw-select>";
      component = getComponent($scope, template);
    });

    it('should always show the search input (without having to specify the filter attribute)', function() {
      var filterInput = component.find(FILTER_INPUT_SELECTOR)[0];
      expect(filterInput).toBeTruthy();
    });

    it('should limit the number of options initially shown', function () {
      expect(component.find(LIST_ITEMS_SELECTOR).length).toBe(300);
    });

    it('should show a "..." option at the end to load more options', function () {
      expect(component.find(OPTION_LOAD_MORE_SELECTOR).length).toBe(1);
    });

    it('should load more options when "..." is clicked', function () {
      component.find(OPTION_LOAD_MORE_SELECTOR).click();
      expect(component.find(LIST_ITEMS_SELECTOR).length).toBe(600);
      expect(component.find(OPTION_LOAD_MORE_SELECTOR).length).toBe(1);

      component.find(OPTION_LOAD_MORE_SELECTOR).click();
      expect(component.find(LIST_ITEMS_SELECTOR).length).toBe(601); // List exhausted.
      expect(component.find(OPTION_LOAD_MORE_SELECTOR).length).toBe(0);
    });

    it('does not show a "..." when there aren\'t any more options to load', function () {
      $scope.options = OPTIONS_LONG.slice(0, 300);
      component = getComponent($scope, template);

      expect(component.find(LIST_ITEMS_SELECTOR).length).toBe(300);
      expect(component.find(OPTION_LOAD_MORE_SELECTOR).length).toBe(0);
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
      var template = " \
        <tw-select \
          options='options' \
          ng-model='ngModel' \
          filter='{{filter}}'> \
        </tw-select>";
      component = getComponent($scope, template);
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
      var template = " \
        <tw-select \
          options='options' \
          ng-model='ngModel' \
          filter='{{filter}}'> \
          <a href='' class='custom-action'> \
            Custom action \
          </a> \
        </tw-select>";
      component = getComponent($scope, template);
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

  describe('when selected option has', function() {
    beforeEach(function() {
      $scope.options = OPTIONS_EXTRAS;
      $scope.ngModel = null;
    });

    describe('note text', function() {
      var note;

      beforeEach(function() {
        $scope.ngModel = 'NOTE';
        note = getComponent($scope).find(SELECTED_NOTE_SELECTOR);
      });

      it('should be displayed', function() {
        expect(note.length).toBe(1);
        checkVisible(note);
      });
      it('should be possible to hide it', function() {
        $scope.hideNote = true;
        $scope.$digest();
        expect(note.hasClass('hidden')).toBe(true);
      });
      it('should be hideable for xs grid and narrower', function() {
        $scope.hideNote = 'xs';
        $scope.$digest();
        checkVisibilityAtBreakpoints(note, 'xs');
      });
      it('should be hideable for sm grid and narrower', function() {
        $scope.hideNote = 'sm';
        $scope.$digest();
        checkVisibilityAtBreakpoints(note, 'sm');
      });
      it('should be hideable for md grid and narrower', function() {
        $scope.hideNote = 'md';
        $scope.$digest();
        checkVisibilityAtBreakpoints(note, 'md');
      });
      it('should be hideable for lg grid and narrower', function() {
        $scope.hideNote = 'lg';
        $scope.$digest();
        checkVisibilityAtBreakpoints(note, 'lg');
      });
      it('should be hideable for xl grid and narrower', function() {
        $scope.hideNote = 'xl';
        $scope.$digest();
        checkVisibilityAtBreakpoints(note, 'xl');
      });
      it('should be hideable for supplied grid widths', function() {
        $scope.hideNote = 'xs,xl';
        $scope.$digest();
        checkVisibilityAtBreakpoints(note, 'xs,xl');

        $scope.hideNote = 'md,sm,lg';
        $scope.$digest();
        checkVisibilityAtBreakpoints(note, 'sm,md,lg');
      });
    });

    describe('secondary text', function() {
      var secondary;

      beforeEach(function() {
        $scope.ngModel = 'SECONDARY';
        secondary = getComponent($scope).find(SELECTED_SECONDARY_SELECTOR);
      });
      it('should be displayed', function() {
        expect(secondary.length).toBe(1);
        checkVisible(secondary);
      });
      it('should be possible to hide it', function() {
        $scope.hideSecondary = true;
        $scope.$digest();
        expect(secondary.hasClass('hidden')).toBe(true);
      });
      it('should be hideable for xs grid and narrower', function() {
        $scope.hideSecondary = 'xs';
        $scope.$digest();
        checkVisibilityAtBreakpoints(secondary, 'xs');
      });
      it('should be hideable for sm grid and narrower', function() {
        $scope.hideSecondary = 'sm';
        $scope.$digest();
        checkVisibilityAtBreakpoints(secondary, 'sm');
      });
      it('should be hideable for md grid and narrower', function() {
        $scope.hideSecondary = 'md';
        $scope.$digest();
        checkVisibilityAtBreakpoints(secondary, 'md');
      });
      it('should be hideable for lg grid and narrower', function() {
        $scope.hideSecondary = 'lg';
        $scope.$digest();
        checkVisibilityAtBreakpoints(secondary, 'lg');
      });
      it('should be hideable for xl grid and narrower', function() {
        $scope.hideSecondary = 'xl';
        $scope.$digest();
        checkVisibilityAtBreakpoints(secondary, 'xl');
      });
      it('should be hideable for supplied grid widths', function() {
        $scope.hideSecondary = 'xs,xl';
        $scope.$digest();
        checkVisibilityAtBreakpoints(secondary, 'xs,xl');

        $scope.hideSecondary = 'md,sm,lg';
        $scope.$digest();
        checkVisibilityAtBreakpoints(secondary, 'sm,md,lg');
      });
    });

    describe('icon', function() {
      var icon;

      beforeEach(function() {
        $scope.ngModel = 'ICON';
        icon = getComponent($scope).find(SELECTED_ICON_SELECTOR);
      });

      it('should be displayed', function() {
        expect(icon.length).toBe(1);
        checkVisible(icon);
      });
      it('should be possible to hide it', function() {
        $scope.hideIcon = true;
        $scope.$digest();
        expect(icon.hasClass('hidden')).toBe(true);
      });
      it('should be hideable for xs grid and narrower', function() {
        $scope.hideIcon = 'xs';
        $scope.$digest();
        checkVisibilityAtBreakpoints(icon, 'xs');
      });
      it('should be hideable for sm grid and narrower', function() {
        $scope.hideIcon = 'sm';
        $scope.$digest();
        checkVisibilityAtBreakpoints(icon, 'sm');
      });
      it('should be hideable for md grid and narrower', function() {
        $scope.hideIcon = 'md';
        $scope.$digest();
        checkVisibilityAtBreakpoints(icon, 'md');
      });
      it('should be hideable for lg grid and narrower', function() {
        $scope.hideIcon = 'lg';
        $scope.$digest();
        checkVisibilityAtBreakpoints(icon, 'lg');
      });
      it('should be hideable for xl grid and narrower', function() {
        $scope.hideIcon = 'xl';
        $scope.$digest();
        checkVisibilityAtBreakpoints(icon, 'xl');
      });
      it('should be hideable for supplied grid widths', function() {
        $scope.hideIcon = 'xs,xl';
        $scope.$digest();
        checkVisibilityAtBreakpoints(icon, 'xs,xl');

        $scope.hideIcon = 'md,sm,lg';
        $scope.$digest();
        checkVisibilityAtBreakpoints(icon, 'sm,md,lg');
      });
    });

    describe('currency flag', function() {
      var flag;

      beforeEach(function() {
        $scope.ngModel = 'CURRENCY_FLAG';
        flag = getComponent($scope).find(SELECTED_CURRENCY_FLAG_SELECTOR);
      });

      it('should be displayed', function() {
        $scope.$digest();
        expect(flag.length).toBe(1);
        checkVisible(flag);
      });
      it('should be possible to hide it', function() {
        $scope.hideCurrency = true;
        $scope.$digest();
        expect(flag.hasClass('hidden')).toBe(true);
      });
      it('should be hideable for xs grid and narrower', function() {
        $scope.hideCurrency = 'xs';
        $scope.$digest();
        checkVisibilityAtBreakpoints(flag, 'xs');
      });
      it('should be hideable for sm grid and narrower', function() {
        $scope.hideCurrency = 'sm';
        $scope.$digest();
        checkVisibilityAtBreakpoints(flag, 'sm');
      });
      it('should be hideable for md grid and narrower', function() {
        $scope.hideCurrency = 'md';
        $scope.$digest();
        checkVisibilityAtBreakpoints(flag, 'md');
      });
      it('should be hideable for lg grid and narrower', function() {
        $scope.hideCurrency = 'lg';
        $scope.$digest();
        checkVisibilityAtBreakpoints(flag, 'lg');
      });
      it('should be hideable for xl grid and narrower', function() {
        $scope.hideCurrency = 'xl';
        $scope.$digest();
        checkVisibilityAtBreakpoints(flag, 'xl');
      });
      it('should be hideable for supplied grid widths', function() {
        $scope.hideCurrency = 'xs,xl';
        $scope.$digest();
        checkVisibilityAtBreakpoints(flag, 'xs,xl');

        $scope.hideCurrency = 'md,sm,lg';
        $scope.$digest();
        checkVisibilityAtBreakpoints(flag, 'sm,md,lg');
      });
    });

    describe('circle icon', function() {
      var circle;

      beforeEach(function() {
        $scope.ngModel = 'CIRCLE_ICON';
        circle = getComponent($scope).find(SELECTED_CIRCLE_SELECTOR);
      });

      it('should be displayed', function() {
        expect(circle.length).toBe(1);
      });
      it('should be possible to hide it', function() {
        $scope.hideCircle = true;
        $scope.$digest();
        expect(circle.hasClass('hidden')).toBe(true);
      });
    });

    describe('label', function() {
      var label;
      beforeEach(function() {
        $scope.ngModel = 'CIRCLE_ICON';
        label = getComponent($scope).find(SELECTED_LABEL_SELECTOR);
      });
      it('should be displayed by default', function() {
        expect(label.length).toBe(1);
      });
      it('can be hidden', function() {
        $scope.hideLabel = true;
        $scope.$digest();
        expect(label.hasClass('hidden')).toBe(true);
      });
    });

    describe('circle image', function() {
      var circle;
      beforeEach(function() {
        $scope.ngModel = 'CIRCLE_IMAGE';
        circle = getComponent($scope).find(SELECTED_CIRCLE_SELECTOR);
      });
      it('should be displayed', function() {
        expect(circle.length).toBe(1);
      });
      it('should be possible to hide it', function() {
        $scope.hideCircle = true;
        $scope.$digest();
        expect(circle.hasClass('hidden')).toBe(true);
      });
    });
    describe('circle text', function() {
      var circle;
      beforeEach(function() {
        $scope.ngModel = 'CIRCLE_TEXT';
        circle = getComponent($scope).find(SELECTED_CIRCLE_SELECTOR);
      });
      it('should be displayed', function() {
        expect(circle.length).toBe(1);
      });
      it('should be possible to hide it', function() {
        $scope.hideCircle = true;
        $scope.$digest();
        expect(circle.hasClass('hidden')).toBe(true);
      });
    });
  });

  describe('when special options are supplied', function() {
    beforeEach(function() {
      $scope.options = OPTIONS_EXTRAS;
      $scope.ngModel = null;
      component = getComponent($scope);
    });
    it('should show note text', function() {
      var el = component.find(OPTION_NOTE_SELECTOR);
      expect(el.length).toBe(1);
    });
    it('should show secondary text', function() {
      var el = component.find(OPTION_SECONDARY_SELECTOR);
      expect(el.length).toBe(1);
    });
    it('should show currency flag', function() {
      var el = component.find(OPTION_CURRENCY_FLAG_SELECTOR);
      expect(el.length).toBe(1);
    });
    it('should show icon', function() {
      var el = component.find(OPTION_ICON_SELECTOR);
      expect(el.length).toBe(1);
    });
    it('should show circle image', function() {
      var el = component.find(OPTION_CIRCLE_IMAGE_SELECTOR);
      expect(el.length).toBe(1);
    });
    it('should show circle text', function() {
      var el = component.find(OPTION_CIRCLE_TEXT_SELECTOR);
      expect(el.length).toBe(1);
    });
    it('should show circle icon', function() {
      var el = component.find(OPTION_CIRCLE_ICON_SELECTOR);
      expect(el.length).toBe(1);
    });
    it('should show disabled option', function() {
      var el = component.find(OPTION_DISABLED_SELECTOR);
      expect(el.length).toBe(1);
    });
  });

  describe('when visual configuration is supplied', function() {
    beforeEach(function() {
      $scope.options = OPTIONS;
      $scope.ngModel = null;
      component = getComponent($scope);
    });
    it('should show small selct', function() {
      $scope.size = 'sm';
      $scope.$digest();
      var el = component.find('.btn-sm');
      expect(el.length).toBe(1);
    });
    it('should show large select', function() {
      $scope.size = 'lg';
      $scope.$digest();
      var el = component.find('.btn-lg');
      expect(el.length).toBe(1);
    });
    it('should show inverse select', function() {
      $scope.inverse = true;
      $scope.$digest();
      var el = component.find('.btn-input-inverse');
      expect(el.length).toBe(1);
    });

    it('should dropdown right aligned on xs small screens and wider', function() {
      $scope.dropdownRight = 'xs';
      $scope.$digest();
      var el = component.find('.dropdown-menu-xs-right');
      expect(el.length).toBe(1);
    });
    it('should dropdown right aligned on sm small screens and wider', function() {
      $scope.dropdownRight = 'sm';
      $scope.$digest();
      var el = component.find('.dropdown-menu-sm-right');
      expect(el.length).toBe(1);
    });
    it('should dropdown right aligned on md small screens and wider', function() {
      $scope.dropdownRight = 'md';
      $scope.$digest();
      var el = component.find('.dropdown-menu-md-right');
      expect(el.length).toBe(1);
    });
    it('should dropdown right aligned on lg small screens and wider', function() {
      $scope.dropdownRight = 'lg';
      $scope.$digest();
      var el = component.find('.dropdown-menu-lg-right');
      expect(el.length).toBe(1);
    });
    it('should dropdown right aligned on xl small screens and wider', function() {
      $scope.dropdownRight = 'xl';
      $scope.$digest();
      var el = component.find('.dropdown-menu-xl-right');
      expect(el.length).toBe(1);
    });

    it('should show sm dropdown width', function() {
      $scope.dropdownWidth = 'sm';
      $scope.$digest();
      var el = component.find('.dropdown-menu-sm');
      expect(el.length).toBe(1);
    });
    it('should show md dropdown width', function() {
      $scope.dropdownWidth = 'md';
      $scope.$digest();
      var el = component.find('.dropdown-menu-md');
      expect(el.length).toBe(1);
    });
    it('should show lg dropdown width', function() {
      $scope.dropdownWidth = 'lg';
      $scope.$digest();
      var el = component.find('.dropdown-menu-lg');
      expect(el.length).toBe(1);
    });

    it('should open upwards', function() {
      var el = component.find('.tw-select');
      expect(el.hasClass('dropdown')).toBe(true);
      expect(el.hasClass('dropup')).toBe(false);
      $scope.dropdownUp = true;
      $scope.$digest();
      var el = component.find('.tw-select');
      expect(el.hasClass('dropdown')).toBe(false);
      expect(el.hasClass('dropup')).toBe(true);
    });
  });

  describe('filter duplicates with same label and value', function() {
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
      var template = " \
        <tw-select \
          options='options' \
          ng-model='ngModel' \
          filter='{{filter}}'> \
          <a href='' class='custom-action'> \
              Custom action \
          </a> \
        </tw-select>";
      component = getComponent($scope, template);
      $filterInput = component.find(FILTER_INPUT_SELECTOR);
    });

    it('should show one result, removing duplicates', function() {
      $filterInput.val("ca").trigger('change');
      var options = component.find(LIST_ITEMS_SELECTOR);
      expect(options.length).toBe(1);
      expect(optionText(options[0])).toBe('Cain');
    });
  });

  describe('render options with same label but different value', function() {
    var $filterInput;
    beforeEach(function () {
      $scope.options = [{
        value: '1',
        label: 'Cain'
      },{
        value: '0',
        label: 'Abel'
      },{
        value: '2',
        label: 'Cain'
      }];
      $scope.filter = 'Search';
      var template = " \
        <tw-select \
          options='options' \
          ng-model='ngModel' \
          filter='{{filter}}'> \
          <a href='' class='custom-action'> \
              Custom action \
          </a> \
        </tw-select>";
      component = getComponent($scope, template);
      $filterInput = component.find(FILTER_INPUT_SELECTOR);
    });

    it('should show two results', function() {
      $filterInput.val("ca").trigger('change');
      var options = component.find(LIST_ITEMS_SELECTOR);
      expect(options.length).toBe(2);
      expect(optionText(options[0])).toBe('Cain');
      expect(optionText(options[1])).toBe('Cain');
    });
  });

  function getComponent($scope, template) {
    if (!template) {
      template = " \
        <tw-select \
          name='{{name}}' \
          options='options' \
          placeholder='{{placeholder}}' \
          ng-model='ngModel' \
          ng-required='ngRequired' \
          size='{{size}}' \
          dropdown-right='{{dropdownRight}}' \
          dropdown-up='{{dropdownUp}}'\
          dropdown-width='{{dropdownWidth}}' \
          inverse='inverse' \
          hide-note='{{hideNote}}' \
          hide-secondary='{{hideSecondary}}' \
          hide-icon='{{hideIcon}}' \
          hide-currency='{{hideCurrency}}' \
          hide-circle='{{hideCircle}}' \
          hide-label='{{hideLabel}}'> \
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

  function triggerKeypress(target, letter) {
    triggerKeyCode(target, letter.charCodeAt(0));
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

  function checkVisible(el) {
    expect(el.hasClass('hidden')).toBe(false);
    expect(el.hasClass('hidden-xs')).toBe(false);
    expect(el.hasClass('hidden-sm')).toBe(false);
    expect(el.hasClass('hidden-md')).toBe(false);
    expect(el.hasClass('hidden-lg')).toBe(false);
    expect(el.hasClass('hidden-xl')).toBe(false);
  }

  function checkVisibilityAtBreakpoints(el, breakpoint) {
    var breakpoints = breakpoint.split(',');
    expect(el.hasClass('hidden-xs')).toBe(breakpoints.indexOf('xs') > -1);
    expect(el.hasClass('hidden-sm')).toBe(breakpoints.indexOf('sm') > -1);
    expect(el.hasClass('hidden-md')).toBe(breakpoints.indexOf('md') > -1);
    expect(el.hasClass('hidden-lg')).toBe(breakpoints.indexOf('lg') > -1);
    expect(el.hasClass('hidden-xl')).toBe(breakpoints.indexOf('xl') > -1);
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

  var OPTIONS_NUMERIC = [{
    value: 0,
    label: 'Zero'
  },{
    value: 1,
    label: 'One'
  },{
    value: 2,
    label: 'Two'
  },{
    value: 3,
    label: 'Three'
  }];

  var OPTIONS_OBJECTS = [{
    value: {id: 1},
    label: 'One'
  },{
    value: {id: 2},
    label: 'Two'
  },{
    value: {id: 3},
    label: 'Three'
  }];

  var OPTIONS_DISABLED = [{
    value: 1,
    label: 'One'
  },{
    value: 2,
    label: 'Two',
    disabled: true
  },{
    value: 3,
    label: 'Three'
  }];

  var OPTIONS_HEADER = [{
    value: 1,
    label: 'One'
  },{
    header: 'Header'
  },{
    value: 3,
    label: 'Three'
  }];


  var OPTIONS_EXTRAS = [{
    header: "header"
  },{
    value: 'NOTE',
    label: 'Note text',
    note: 'Note text'
  },{
    value: 'DISABLED',
    label: 'Disabled',
    disabled: true
  },{
    value: 'SECONDARY',
    label: 'Secondary text',
    secondary: "Secondary text"
  },{
    value: "ICON",
    label: 'Icon',
    icon: "bank"
  },{
    value: "CURRENCY_FLAG",
    label: 'Currency flag',
    currency: "USD"
  },{
    value: "CIRCLE_IMAGE",
    label: 'Circle image',
    circleImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
  },{
    value: "CIRCLE_ICON",
    label: 'Circle icon',
    circleIcon: "bank"
  },{
    value: "CIRCLE_TEXT",
    label: 'Circle text',
    circleText: "AZ"
  },{
    value: "SEARCHABLE",
    label: "Unrelated",
    searchable: "Searchable"
  }];

  // 601 options.
  var OPTIONS_LONG = (function () {
    var options = [];

    for (var i = 1; i <= 601; ++i) {
      options.push({ value: '' + i, label: 'Optiony Option ' + i });
    }

    return options;
  })();
});
