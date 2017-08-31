
class SelectController {
  constructor($element, $scope, $transclude, $timeout, $attrs) {

    this.$ngModel = $element.controller('ngModel');
    this.$element = $element;
    this.search = "";

    preSelectModelValue(this.$ngModel, this, this.options);
    setDefaultIfRequired(this.$ngModel, this, $element, $attrs);

    addWatchers(this, $scope, this.$ngModel, $element);
    addEventHandlers(this, $element, this.$ngModel, this.options, $timeout);

    checkForTranscludedContent($transclude, this);

    this.responsiveClasses = responsiveClasses;

    this.filterString = "";
    this.filteredOptions = this.getFilteredOptions();
  }

  circleClasses(responsiveOption) {
    var classes = responsiveClasses(responsiveOption);
    var secondaryClasses = responsiveClasses(this.hideSecondary);
    // If secondary text line, and it won't be hidden at some point, use larger circle
    if (this.selected.secondary && secondaryClasses.length === 0) {
      classes += " circle-sm";
    } else {
      classes += " circle-xs";
    }
    return classes;
  }

  buttonFocus() {
    this.$element.triggerHandler('focus');
  }

  optionClick(option, $event) {
    if (option.disabled) {
      $event.stopPropagation();
      return;
    }
    selectOption(this.$ngModel, this, option);
    this.$element.find('.btn').focus();
  }

  optionFocus(option) {
    selectOption(this.$ngModel, this, option);
  }

  optionKeypress(event) {
    // If we're in the filter don't allow normal behaviour
    if ($(event.target).hasClass('tw-select-filter')) {
      return;
    }

    // Prevent delete taking us back
    var characterCode = getCharacterCodeFromKeypress(event);
    if (characterCode === 8) {
      event.preventDefault();
      return false;
    }

    // Search for option based on character
    var character = getCharacterFromKeypress(event);
    continueSearchAndSelectMatch(
      this.$ngModel, this, this.options, character
    );
    this.$element.find('.active a').focus();
  }

  placeholderClick(option) {
    resetOption(this.$ngModel, this);
    this.$element.find('.btn').focus();
  }
  placeholderFocus() {
    resetOption(this.$ngModel, this);
  }

  getFilteredOptions() {
    if (!this.options || !this.options.filter) {
      return [];
    }

    var filteredLabels = [];
    return this.options.filter((option) => {
      var filterStringLower =
        this.filterString && escapeRegExp(this.filterString.toLowerCase());

      if (!filterStringLower) {
        return true;
      }

      var duplicate = false;
      if (filteredLabels.indexOf(option.label) > -1) {
        duplicate = true;
      }

      var addOption = (
        labelMatches(option, filterStringLower) ||
        noteMatches(option, filterStringLower) ||
        secondaryMatches(option, filterStringLower) ||
        searchableMatches(option, filterStringLower)
      ) && !duplicate;

      if (addOption) {
        filteredLabels.push(option.label);
      }
      return addOption;
    });
  }

  filterFocus() {
    this.$element.find('.tw-select-filter').focus();
  }
  filterChange() {
    this.filteredOptions = this.getFilteredOptions();
    var selectedOption = findSelected(this.filteredOptions, this.selected);

    // Choose a new selected value if the old one was hidden
    if (!selectedOption && this.filteredOptions.length) {
      selectOption(this.$ngModel, this, this.filteredOptions[0]);
    }
  }

  // Keydown as keypress did not work in chrome/safari
  filterKeydown(event) {
    var characterCode = event.which || event.charCode || event.keyCode,
      activeOption = this.$element.find('.active'),
      activeLink = activeOption.find('a'),
      optionLinks = this.$element.find(".tw-select-option-link");

    if (characterCode === 40) { // Down arrow key
      this.moveDownOneOption(activeOption, activeLink, optionLinks);
      event.preventDefault(); // Prevent cursor jumping around in input
    } else if (characterCode === 38) { // Up arrow key
      this.moveUpOneOption(activeOption, activeLink, optionLinks);
      event.preventDefault(); // Prevent cursor jumping in input
    } else if (characterCode === 13) { // Return key
      activeOption.click();
      this.$element.find('.btn').focus();
      event.preventDefault(); // Prevent form action as input active
    }
    return true;
  }

  selectOptionUsingLink(link) {
    var option = this.filteredOptions[link.attr('index')];
    selectOption(this.$ngModel, this, option);
  }

  moveUpOneOption(activeOption, activeLink, optionLinks) {
    // If none active, select last
    if (!activeOption.length && optionLinks.length) {
      this.selectOptionUsingLink($(optionLinks[optionLinks.length - 1]));
      return;
    }
    // If active option not first, move up
    if (activeLink[0] !== optionLinks[0]) {
      // TODO prevAll is ineffeccient for longer lists
      var previousOptions = activeOption.prevAll('.tw-select-option');
      this.selectOptionUsingLink($(previousOptions[0]).find('a'));
      return;
    }
  }

  moveDownOneOption(activeOption, activeLink, optionLinks) {
    // If none active, select first
    if (!activeOption.length && optionLinks.length) {
      this.selectOptionUsingLink($(optionLinks[0]));
      return;
    }
    // If active option not last, move down
    if (activeLink[0] !== optionLinks[optionLinks.length - 1]) {
      // TODO nextAll is ineffeccient for longer lists
      var nextOptions = activeOption.nextAll('.tw-select-option');
      this.selectOptionUsingLink($(nextOptions[0]).find('a'));
      return;
    }
    // If active is last and custom action, focus on it
    var transcludedOption = $('.tw-select-transcluded');
    if (transcludedOption.length) {
      transcludedOption.find('a').focus();
      return;
    }
  }
}

function labelMatches(option, search) {
  return option.label && option.label.toLowerCase().search(search) >= 0;
}
function noteMatches(option, search) {
  return option.note && option.note.toLowerCase().search(search) >= 0;
}
function secondaryMatches(option, search) {
  return option.secondary && option.secondary.toLowerCase().search(search) >= 0;
}
function searchableMatches(option, search) {
  return option.searchable && option.searchable.toLowerCase().search(search) >= 0;
}


function addWatchers($ctrl, $scope, $ngModel, $element) {
  $scope.$watch('$ctrl.ngModel', (newValue, oldValue) => {
    if ((newValue || oldValue) && newValue !== oldValue) {
      $ngModel.$setDirty();
    }

    modelChange(newValue, oldValue, $ctrl);
  });

  $scope.$watch('$ctrl.options', (newValue, oldValue) => {
    if (newValue !== oldValue) {
      // Reinitialise selected valus
      preSelectModelValue($ngModel, $ctrl, $ctrl.options);
      setDefaultIfRequired($ngModel, $ctrl, $element, $ctrl);

      $ctrl.filteredOptions = $ctrl.getFilteredOptions();
    }
  });
}

function addEventHandlers($ctrl, $element, $ngModel, options, $timeout) {
  $element.find('.btn, .dropdown-menu').on('focusout', () => {
    $timeout(() => {
      // If button isn't focused and dropdown not open, blur
      if ($element.find('.btn:focus').length === 0 &&
        !$element.find('.btn-group').hasClass('open')) {
        $element.trigger('blur');
      }
    }, 150);   // need timeout because using dropdown.js,
  });

  $element.on('blur', (event) => {
    $ngModel.$setTouched();
  });

  $element.find('.btn').on('keypress', (event) => {
    $ctrl.optionKeypress(event);
  });

  $element.find('.btn').on('click', () => {
    // Once dropdown is open, focus on active/selected option for keyboard support
    $timeout(() => {
      if ($element.attr('filter')) {
        $element.find('.tw-select-filter').focus();
      } else {
        $element.find('.active a').focus();
      }
    });
  });

  $element.find('ul').on('keypress', 'a', (event) => {
    $ctrl.optionKeypress(event);
  });
}

function checkForTranscludedContent($transclude, $ctrl) {
  $transclude((clone) => {
    if (clone.length > 1 || clone.text().trim() !== '') {
      $ctrl.hasTranscluded = true;
    }
  });
}

function getCharacterCodeFromKeypress(event) {
  return event.which || event.charCode || event.keyCode;
}
function getCharacterFromKeypress(event) {
  return String.fromCharCode(getCharacterCodeFromKeypress(event));
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function preSelectModelValue($ngModel, $ctrl, options) {
  if (isValidModel($ctrl.ngModel)) {
    var option = findOptionFromValue($ctrl.options, $ctrl.ngModel);
    selectOption($ngModel, $ctrl, option);
  }
}

function modelChange(newVal, oldVal, $ctrl) {
  if (newVal === oldVal) {
    return;
  }

  var option = findOptionFromValue($ctrl.options, newVal);
  if (option) {
    $ctrl.selected = option;
  } else {
    $ctrl.selected = null;
  }
}

function findOptionFromValue(options, value) {
  var optionMatch = false;
  options.forEach(function(option) {
    if (angular.equals(option.value, value)) {
      optionMatch = option;
    }
  });
  return optionMatch;
}

function setDefaultIfRequired($ngModel, $ctrl, $element, $attrs) {
  // If required and model empty, select first option with value
  if (($ctrl.ngRequired || $attrs.required) && !isValidModel($ctrl.ngModel) && !$ctrl.placeholder) {
    for (var i = 0; i < $ctrl.options.length; i++) {
      if (isValidModel($ctrl.options[i].value)) {
        selectOption($ngModel, $ctrl, $ctrl.options[i]);
        break;
      }
    }
  }
}

function selectOption($ngModel, $ctrl, option) {
  if (option.disabled) {
    return;
  }
  $ngModel.$setViewValue(option.value);
  // Force commit so that ng-change always has new value
  $ngModel.$commitViewValue();
  $ctrl.selected = option;
}

function findSelected(options, selected) {
  // Prefer forEach over find for browser support
  var selectedOption;
  options.forEach((option) => {
    if (selected && angular.equals(selected.value, option.value)) {
      selectedOption = selected;
    }
  });
  return selectedOption;
}

function resetOption($ngModel, $ctrl) {
  $ngModel.$setViewValue(null);
  // Force commit so that ng-change always has new value
  $ngModel.$commitViewValue();
  $ctrl.selected = false;
}

function continueSearchAndSelectMatch($ngModel, $ctrl, options, letter) {
  var found = searchAndSelect($ngModel, $ctrl, options, $ctrl.search + letter);
  if (found) {
    $ctrl.search += letter;
  } else {
    $ctrl.search = letter;
    found = searchAndSelect($ngModel, $ctrl, options, $ctrl.search);
  }
  return found;
}

function searchAndSelect($ngModel, $ctrl, options, term) {
  var found = false,
    searchTerm = term.toLowerCase();

  options.forEach((option) => {
    if (found || !option.label) {
      return;
    }
    if (option.label.toLowerCase().indexOf(searchTerm) === 0 ||
      option.note && option.note.toLowerCase().indexOf(searchTerm) === 0 ||
      option.secondary && option.secondary.toLowerCase().indexOf(searchTerm) === 0||
      option.searchable && option.searchable.toLowerCase().indexOf(searchTerm) === 0) {
      selectOption($ngModel, $ctrl, option);
      found = true;
    }
  });
  return found;
}

function isValidModel(value) {
  return value || value === 0 || value === false;
}

function responsiveClasses(value) {
  var classes = '',
    validBreakpoints = {xs:true, sm:true, md:true, lg:true, xl:true},
    breakpoints = [];

  if (typeof value === 'boolean' && value) {
    return 'hidden';
  }

  if (value && value.toLowerCase && value.toLowerCase() === 'true') {
    return 'hidden';
  }

  if (value) {
    breakpoints = value.split(',');
  }

  breakpoints.forEach((breakpoint) => {
    if (validBreakpoints[breakpoint]) {
      classes += 'hidden-' + breakpoint + ' ';
    }
  });

  return classes;
}

SelectController.$inject = [
  '$element',
  '$scope',
  '$transclude',
  '$timeout',
  '$attrs'
];

export default SelectController;
