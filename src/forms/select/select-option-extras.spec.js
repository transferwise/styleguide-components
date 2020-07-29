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
  var SELECTED_ICON_SELECTOR = '.tw-select-selected tw-icon';
  var SELECTED_CIRCLE_SELECTOR = '.tw-select-selected .circle';

  var OPTION_NOTE_SELECTOR = '.dropdown-menu .tw-select-note';
  var OPTION_SECONDARY_SELECTOR = '.dropdown-menu .tw-select-secondary';
  var OPTION_CURRENCY_FLAG_SELECTOR = '.dropdown-menu .currency-flag';
  var OPTION_ICON_SELECTOR = '.dropdown-menu a > tw-icon';
  var OPTION_CIRCLE_IMAGE_SELECTOR = '.dropdown-menu .circle img';
  var OPTION_CIRCLE_TEXT_SELECTOR = '.dropdown-menu .tw-select-circle-text';
  var OPTION_CIRCLE_ICON_SELECTOR = '.dropdown-menu .circle tw-icon';
  var OPTION_DISABLED_SELECTOR = '.dropdown-menu .disabled';

  beforeEach(function() {
    angular.mock.module('tw.styleguide.forms.select');

    angular.mock.inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');
      $scope = $rootScope.$new();
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

});
