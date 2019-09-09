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
  var OPTION_LOAD_MORE_SELECTOR = '.dropdown-menu .tw-select-load-more';

  beforeEach(function() {
    angular.mock.module('tw.styleguide.forms.select');

    angular.mock.inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();
    });
  });

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
          var placeholderElement = component.find('.form-control-placeholder');
          expect(placeholderElement.length).toBe(0);
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
          var placeholderElement = component.find('.form-control-placeholder');
          expect(placeholderElement.length).toBe(0);
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
          var placeholderElement = component.find('.form-control-placeholder');
          expect(placeholderElement.length).toBe(0);
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
        var placeholderElement = component.find('.form-control-placeholder');
        expect(placeholderElement.length).toBe(1);
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
        $scope.options = OPTIONS_HEADER;
        $scope.ngModel = null;
        $scope.ngRequired = true;
        component = getComponent($scope);
      });
      it('should select first option with a value', function() {
        expect($scope.ngModel).toBe(OPTIONS_HEADER[0].value);
      });
      it('should show selected text', function() {
        var selectedTextElement = component.find(SELECTED_LABEL_SELECTOR)[0];
        expect($(selectedTextElement).text().trim()).toBe(OPTIONS_HEADER[0].label);
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
    // TODO problem with loading dropdown.js? Or timing?
    // it('should open dropdown when button clicked', function() {
    //   button.trigger('click');
    //   $scope.$digest();
    //
    //   setTimeout(function() {
    //     var buttonGroupElement = component.find('.btn-group');
    //     console.log(buttonGroupElement.attr('class'));
    //     expect(buttonGroupElement.hasClass('open')).toBe(true);
    //     expect(false).toBe(true);
    //   });
    // });
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
      // Dropdown.js not working in tests
      // it('should select item below when down arrow pressed', function() {
      //   $scope.ngModel = OPTIONS[1].value;
      //   $scope.$digest();
      //
      //   var secondLink = component.find('.active a')[0];
      //   $(secondLink).focus();
      //   triggerKeyCode(secondLink, SPECIAL_KEYS.down);
      //
      //   var thirdLink = component.find('.active a')[0];
      //   expect($scope.ngModel).toBe(OPTIONS[2].value);
      //   expect($(thirdLink).text().trim()).toBe(OPTIONS[2].label);
      // });
      // it('should select item above when up arrow pressed', function() {
      //   $scope.ngModel = OPTIONS[2].value;
      //   $scope.$digest();
      //
      //   var thirdLink = component.find('.active a')[0];
      //   $(thirdLink).focus();
      //   triggerKeyCode(thirdLink, SPECIAL_KEYS.up);
      //
      //
      //   var secondLink = component.find('.active a')[0];
      //   expect($scope.ngModel).toBe(OPTIONS[1].value);
      //   expect($(secondLink).text().trim()).toBe(OPTIONS[1].label);
      // });

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

      // TODO Dropdown.js not working in tests
      // it('should skip next option if header', function() {
      //   $scope.options = OPTIONS_HEADER;
      //   $scope.ngModel = 1;
      //   $scope.$digest();
      //
      //   var firstLink = component.find('.active a')[0];
      //   $(firstLink).focus();
      //   triggerKeyCode(firstLink, SPECIAL_KEYS.down);
      //
      //   var activeLink = component.find('.active a')[0];
      //
      //   expect($scope.ngModel).toBe(3);
      //   expect($(activeLink).text().trim()).toBe('Three');
      // });
      // it('should skip next option if disabled', function() {
      //   $scope.options = OPTIONS_DISABLED;
      //   $scope.ngModel = 1;
      //   $scope.$digest();
      //
      //   var firstLink = component.find('.active a')[0];
      //   $(firstLink).focus();
      //   triggerKeyCode(firstLink, SPECIAL_KEYS.down);
      //
      //   var activeLink = component.find('.active a')[0];
      //   expect($scope.ngModel).toBe(3);
      //   expect($(activeLink).text().trim()).toBe('Three');
      // });
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

  describe('when two options have the same label but different values', function() {
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

  describe('when multiple headers are passed', function() {
    beforeEach(function () {
      $scope.options = [
        { header: 'First' },
        {
          value: '1',
          label: 'Cain'
        },
        {
          value: '0',
          label: 'Abel'
        },
        { header: 'Second' },
        {
          value: '1',
          label: 'Cain'
        }
      ];
      var template = " \
        <tw-select \
          options='options' \
          ng-model='ngModel'> \
        </tw-select>";
      component = getComponent($scope, template);
    });

    it('should show two header options', function() {
      var options = component.find('span[ng-if="option.header"]');
      expect(options.length).toBe(2);
      expect(optionText(options[0])).toBe('First');
      expect(optionText(options[1])).toBe('Second');
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

  // 601 options.
  var OPTIONS_LONG = (function () {
    var options = [];

    for (var i = 1; i <= 601; ++i) {
      options.push({ value: '' + i, label: 'Optiony Option ' + i });
    }

    return options;
  })();
});
