import angular from 'angular';

class SelectController {
  constructor($element, $scope, $transclude, $timeout, $attrs, TwDomService) {
    this.$ngModel = $element.controller('ngModel');
    this.$scope = $scope;
    this.$element = $element;
    this.$attrs = $attrs;
    this.$timeout = $timeout;
    this.$transclude = $transclude;
    this.dom = TwDomService;

    this.element = $element[0];
  }

  $onInit() {
    this.button = this.element.getElementsByClassName('btn')[0];
    this.search = '';

    preSelectModelValue(this.$ngModel, this);
    setDefaultIfRequired(this.$ngModel, this, this.$element, this.$attrs);

    addWatchers(this, this.$scope, this.$ngModel, this.$element);
    addEventHandlers(this, this.$element, this.$ngModel, this.options, this.$timeout);

    checkForTranscludedContent(this.$transclude, this);

    this.responsiveClasses = responsiveClasses;

    this.filterString = '';
    this.filteredOptions = this.getFilteredOptions();
  }

  circleClasses(responsiveOption) {
    let classes = responsiveClasses(responsiveOption);
    const secondaryClasses = responsiveClasses(this.hideSecondary);
    // If secondary text line, and it won't be hidden at some point, use larger circle
    if (this.selected.secondary && secondaryClasses.length === 0) {
      classes += ' circle-sm';
    } else {
      classes += ' circle-xs';
    }
    return classes;
  }

  buttonFocus() {
    this.element.dispatchEvent(new CustomEvent('focus'));
  }

  optionClick(option, $event) {
    if (option.disabled) {
      $event.stopPropagation();
      return;
    }
    selectOption(this.$ngModel, this, option);
    this.button.focus();
  }

  optionFocus(option) {
    selectOption(this.$ngModel, this, option);
  }

  optionKeypress(event) {
    // If we're in the filter don't allow normal behaviour
    if (event.target.classList.contains('tw-select-filter')) {
      return;
    }

    // Prevent delete taking us back
    const characterCode = getCharacterCodeFromKeypress(event);
    if (characterCode === 8) {
      event.preventDefault();
      return;
    }

    // Search for option based on character
    const character = getCharacterFromKeypress(event);
    continueSearchAndSelectMatch(
      this.$ngModel,
      this,
      this.options,
      character
    );
    focusOnActiveLink(this.element);
  }

  placeholderClick() {
    resetOption(this.$ngModel, this);
    this.button.focus();
  }
  placeholderFocus() {
    resetOption(this.$ngModel, this);
  }

  getFilteredOptions() {
    if (!this.options || !this.options.filter) {
      return [];
    }

    const filteredLabels = [];
    return this.options.filter((option) => {
      const filterStringLower =
        this.filterString && escapeRegExp(this.filterString.toLowerCase());

      if (!filterStringLower) {
        return true;
      }

      let duplicate = false;
      if (filteredLabels.indexOf(option.label) > -1) {
        duplicate = true;
      }

      const addOption = (
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

  focusOnFilterInput() {
    const filterInput = this.element.getElementsByClassName('tw-select-filter')[0];
    if (filterInput) {
      filterInput.focus();
    }
  }
  filterChange() {
    this.filteredOptions = this.getFilteredOptions();
    const selectedOption = findSelected(this.filteredOptions, this.selected);

    // Choose a new selected value if the old one was hidden
    if (!selectedOption && this.filteredOptions.length) {
      selectOption(this.$ngModel, this, this.filteredOptions[0]);
    }
  }

  // Keydown as keypress did not work in chrome/safari
  filterKeydown(event) {
    const characterCode = event.which || event.charCode || event.keyCode;
    const activeOption = this.element.getElementsByClassName('active')[0];
    const activeLink = activeOption ? activeOption.getElementsByTagName('a')[0] : false;
    const optionLinks = this.element.getElementsByClassName('tw-select-option-link');

    if (characterCode === keys.down) {
      this.moveDownOneOption(activeOption, activeLink, optionLinks);
      event.preventDefault(); // Prevent cursor jumping around in input
    } else if (characterCode === keys.up) {
      this.moveUpOneOption(activeOption, activeLink, optionLinks);
      event.preventDefault(); // Prevent cursor jumping in input
    } else if (characterCode === keys.return) {
      activeOption.click();
      this.button.focus();
      event.preventDefault(); // Prevent form action as input active
    }
    return true;
  }

  selectOptionUsingLink(link) {
    const option = this.filteredOptions[link.getAttribute('index')];
    selectOption(this.$ngModel, this, option);
  }

  moveUpOneOption(activeOption, activeLink, optionLinks) {
    // If none active, select last
    if (!activeOption && optionLinks.length) {
      this.selectOptionUsingLink(optionLinks[optionLinks.length - 1]);
      return;
    }

    // If active option not first, move up
    if (activeLink !== optionLinks[0]) {
      const previousOption = this.dom.getPreviousSiblingWithClassName(
        activeOption,
        'tw-select-option'
      );
      if (previousOption) {
        const previousOptionLink = previousOption.getElementsByTagName('a')[0];
        this.selectOptionUsingLink(previousOptionLink);
      }
    }
  }

  moveDownOneOption(activeOption, activeLink, optionLinks) {
    // If none active, select first
    if (!activeOption && optionLinks.length) {
      this.selectOptionUsingLink(optionLinks[0]);
      return;
    }
    // If active option not last, move down
    if (activeLink !== optionLinks[optionLinks.length - 1]) {
      const nextOption = this.dom.getNextSiblingWithClassName(
        activeOption,
        'tw-select-option'
      );
      if (nextOption) {
        const nextOptionLink = nextOption.getElementsByTagName('a')[0];
        this.selectOptionUsingLink(nextOptionLink);
        return;
      }
    }
    // If active is last and custom action, focus on it
    const transcludedOption =
      this.element.getElementsByClassName('tw-select-transcluded');

    if (transcludedOption.length) {
      transcludedOption[0].getElementsByTagName('a')[0].focus();
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

  /*
   * Trigger watch if options value changed or values
   * are the same but the filteredOptions is empty.
  */
  $scope.$watch('$ctrl.options', (newValue, oldValue) => {
    if (newValue !== oldValue
      || (newValue && !$ctrl.filteredOptions.length)) {
      preSelectModelValue($ngModel, $ctrl);
      setDefaultIfRequired($ngModel, $ctrl, $element, $ctrl);

      $ctrl.filteredOptions = $ctrl.getFilteredOptions();
    }
  });
}

function addEventHandlers($ctrl, $element, $ngModel, options, $timeout) {
  const element = $element[0];
  const button = element.getElementsByClassName('btn')[0];
  const buttonGroup = element.getElementsByClassName('btn-group')[0];
  const dropdown = element.getElementsByClassName('dropdown-menu')[0];

  const onFocusOut = () => {
    $timeout(() => {
      // If button isn't focused and dropdown not open, blur
      if (button !== document.activeElement &&
        !buttonGroup.classList.contains('open')) {
        element.dispatchEvent(new CustomEvent('blur'));
      }
    }, 150); // need timeout because using dropdown.js,
  };

  const onButtonClick = () => {
    $timeout(() => {
      if (element.getAttribute('filter')) {
        // If filter in use, focus on that
        const filterInput = element.getElementsByClassName('tw-select-filter')[0];
        filterInput.focus();
      } else {
        // Otherwise focus on selected option
        focusOnActiveLink(element);
      }
    });
  };

  const onButtonKeypress = (event) => {
    $ctrl.optionKeypress(event);
  };

  const onDrodownKeypress = (event) => {
    if (event.target.tagName.toLowerCase() === 'a') {
      $ctrl.optionKeypress(event);
    }
  };

  const onComponentBlur = () => {
    $ngModel.$setTouched();
  };

  element.addEventListener('blur', onComponentBlur);
  button.addEventListener('keypress', onButtonKeypress);
  button.addEventListener('click', onButtonClick);
  button.addEventListener('focusout', onFocusOut);
  dropdown.addEventListener('focusout', onFocusOut);
  dropdown.addEventListener('keypress', onDrodownKeypress);
}

function focusOnActiveLink(element) {
  const activeOption = element.getElementsByClassName('active')[0];
  if (activeOption) {
    activeOption.getElementsByTagName('a')[0].focus();
  }
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
  // eslint-disable-next-line no-useless-escape
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function preSelectModelValue($ngModel, $ctrl) {
  if (isValidModel($ctrl.ngModel)) {
    const option = findOptionFromValue($ctrl.options, $ctrl.ngModel);
    selectOption($ngModel, $ctrl, option);
  }
}

function modelChange(newVal, oldVal, $ctrl) {
  if (newVal === oldVal) {
    return;
  }

  const option = findOptionFromValue($ctrl.options, newVal);
  if (option) {
    $ctrl.selected = option;
  } else {
    $ctrl.selected = null;
  }
}

function findOptionFromValue(options, value) {
  let optionMatch = false;
  options.forEach((option) => {
    if (angular.equals(option.value, value)) {
      optionMatch = option;
    }
  });
  return optionMatch;
}

function setDefaultIfRequired($ngModel, $ctrl, $element, $attrs) {
  // If required and model empty, select first option with value
  if (($ctrl.ngRequired || $attrs.required) && !isValidModel($ctrl.ngModel) && !$ctrl.placeholder) {
    for (let i = 0; i < $ctrl.options.length; i++) {
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
  let selectedOption;
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
  let found = searchAndSelect($ngModel, $ctrl, options, $ctrl.search + letter);
  if (found) {
    $ctrl.search += letter;
  } else {
    $ctrl.search = letter;
    found = searchAndSelect($ngModel, $ctrl, options, $ctrl.search);
  }
  return found;
}

function searchAndSelect($ngModel, $ctrl, options, term) {
  let found = false;
  const searchTerm = term.toLowerCase();

  options.forEach((option) => {
    if (found) {
      return;
    }
    if (containsSearch(option.label, searchTerm) ||
      containsSearch(option.note, searchTerm) ||
      containsSearch(option.secondary, searchTerm) ||
      containsSearch(option.searchable, searchTerm)) {
      selectOption($ngModel, $ctrl, option);
      found = true;
    }
  });
  return found;
}

function containsSearch(term, search) {
  return term && term.toLowerCase().indexOf(search) === 0;
}

function isValidModel(value) {
  return value || value === 0 || value === false;
}

function responsiveClasses(value) {
  let classes = '';
  let breakpoints = [];
  const validBreakpoints = {
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true
  };

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
      classes += `hidden-${breakpoint} `;
    }
  });

  return classes;
}

const keys = {
  up: 38,
  down: 40,
  return: 13
};

SelectController.$inject = [
  '$element',
  '$scope',
  '$transclude',
  '$timeout',
  '$attrs',
  'TwDomService'
];

export default SelectController;
