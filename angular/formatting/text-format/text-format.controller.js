
class TextFormatController {
  constructor(
    $element,
    $timeout,
    $scope,
    TwTextFormatService,
    TwUndoStackFactory
  ) {
    this.keydownCount = 0;
    this.pattern = "";

    this.undoStack = TwUndoStackFactory.new();
    this.$ngModel = $element.controller('ngModel');
    this.$timeout = $timeout;
    this.TextFormatService = TwTextFormatService;

    this.element = $element[0];

    // We need the formatter for external model changes
    this.$ngModel.$formatters.push((value) => {
      return this.TextFormatService.formatUsingPattern(value, this.pattern);
    });
    this.$ngModel.$parsers.push((value) => {
      return this.TextFormatService.unformatUsingPattern(value, this.pattern);
    });

    this.element.addEventListener('change', (event) => {
      this.onChange(event);
    });
    this.element.addEventListener('keydown', (event) => {
      this.onKeydown(event);
    });
    this.element.addEventListener('paste', (event) => {
      this.onPaste(event);
    });
    this.element.addEventListener('cut', (event) => {
      this.onCut(event);
    });
    this.element.addEventListener('copy', (event) => {
      this.onCopy(event);
    });

    // min/max length validators use viewValue which is still formatted.
    // After instantiation override them to unformat view value.
    this.replaceLengthValidators(
      this.$ngModel,
      this.TextFormatService,
      this.$timeout
    );

    $scope.$watch('$ctrl.twTextFormat', (newValue, oldValue) => {
      this.onPatternChange(newValue);
    });
    $scope.$watch('$ctrl.ngModel', (newValue, oldValue) => {
      this.onModelChange(newValue, oldValue);
    });

    this.undoStack.reset(this.element.value);
  }

  onModelChange(newModel, oldModel) {
    if (newModel === oldModel) {
      return;
    }

    // Preserve selection range after formatting
    var selectionStart = this.element.selectionStart,
      selectionEnd = this.element.selectionEnd;
    this.reformatControl(this.element, newModel);
    this.setSelection(selectionStart, selectionEnd);
  }

  onPatternChange(newPattern, oldPattern) {
    if (newPattern === oldPattern) {
      this.pattern = newPattern;
      return;
    }

    if (newPattern && newPattern.indexOf('||') > 0) {
      this.pattern = newPattern.substring(0, newPattern.indexOf('||'));
    } else {
      this.pattern = newPattern;
    }

    var viewValue = this.element.value;
    if (oldPattern) {
      viewValue = this.TextFormatService.unformatUsingPattern(viewValue, oldPattern);
    }
    if (newPattern) {
      // this.pattern is correct here as we process the newPattern
      viewValue = this.TextFormatService.formatUsingPattern(viewValue, this.pattern);
    }

    this.undoStack.reset(viewValue);
    this.element.value = viewValue;
  }

  reformatControl(element, originalValue) {
    if (!originalValue) {
      originalValue = element.value;
    }

    var newValue = this.TextFormatService.reformatUsingPattern(
      originalValue,
      this.pattern
    );

    // Don't reset value unless we need to.
    if (newValue !== originalValue) {
      element.value = newValue;
    }
  }

  onChange() {
    this.reformatControl(this.element);
    this.undoStack.add(this.element.value);
  }

  onPaste(event) {
    var selectionStart = this.element.selectionStart;
    var originalLength = this.element.value.length;

    var clipboardData = event.clipboardData || window.clipboardData;
    var pastedData = clipboardData.getData('Text');

    var separatorsInPaste = this.TextFormatService.countSeparatorsInAppendedValue(
      this.pattern, selectionStart, pastedData
    );

    this.$timeout(() => {
      var newPosition = selectionStart + pastedData.length + separatorsInPaste;
      this.reformatControl(this.element);
      this.undoStack.add(this.element.value);
      this.setSelection(newPosition, newPosition);
    });
  }

  onKeydown(event) {
    this.keydownCount++;
    var currentKeydownCount = this.keydownCount,
      key = event.keyCode || event.which,
      selectionStart = event.target.selectionStart,
      selectionEnd = event.target.selectionEnd;

    if (reservedKeys.indexOf(key) >= 0 || event.metaKey || event.ctrlKey) {
      if (key === keys.z && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        event.stopPropagation();
        this.element.value = this.undoStack.undo();
      }
      if (key === keys.y && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        event.stopPropagation();
        this.element.value = this.undoStack.redo();
      }
      return;
    }

    this.$timeout(() => {
      this.afterKeydown(
        key,
        currentKeydownCount,
        this.element,
        this.pattern,
        selectionStart,
        selectionEnd
      );
    });
  }

  afterKeydown(key, currentKeydownCount, element, pattern, selectionStart, selectionEnd) {
    var newVal;
    // If deleting move back
    if (key === keys.backspace) {
      newVal = this.doBackspace(element, pattern, selectionStart, selectionEnd);

      // Also trigger model update, not sure why necessary...
      this.$ngModel.$setViewValue(newVal);
    } else if (key === keys.delete) {
      newVal = this.doDelete(element, pattern, selectionStart, selectionEnd);

      // Also trigger model update, not sure why necessary...
      this.$ngModel.$setViewValue(newVal);
    } else {
      // If another keydown occurred before we were able to reposition the
      // cursor, we do not want to set it to an out of date value.
      if (this.keydownCount === currentKeydownCount) {
        this.doKeypress(element, pattern, selectionStart, selectionEnd);
      }
    }
  }

  doBackspace(element, pattern, selectionStart, selectionEnd) {
    element.value = this.getFormattedValueAfterBackspace(
      element, pattern, selectionStart, selectionEnd
    );

    this.undoStack.add(element.value);

    var newPosition = this.getPositionAfterBackspace(
      pattern, element, selectionStart, selectionEnd
    );

    this.setSelection(newPosition, newPosition);

    return element.value;
  }

  getFormattedValueAfterBackspace(element, pattern, selectionStart, selectionEnd) {
    var removeStart,
      removeEnd,
      newVal = element.value,
      separatorsBeforeCursor = this.TextFormatService.countSeparatorsBeforeCursor(
        pattern,
        selectionStart
      );

    if (separatorsBeforeCursor) {
      // If we have more separators, we must remove one less character
      var adjust = (separatorsBeforeCursor > 1 ? 1 : 0);

      if (selectionStart !== selectionEnd) {
        // A range is selected, remove one less character from start
        removeStart = selectionStart - separatorsBeforeCursor + 1;
        removeEnd = selectionStart - adjust;
      } else {
        removeStart = selectionStart - separatorsBeforeCursor;
        removeEnd = selectionStart - adjust;
      }
      newVal = this.removeCharacters(element.value, removeStart, removeEnd);
    }

    return this.TextFormatService.reformatUsingPattern(newVal, pattern);
  }

  doDelete(element, pattern, selectionStart, selectionEnd) {
    element.value = this.getFormattedValueAfterDelete(
      element, pattern, selectionStart, selectionEnd
    );

    this.undoStack.add(element.value);
    // Put cursor back where it started
    this.setSelection(selectionStart, selectionStart);

    return element.value;
  }

  setSelection(start, end) {
    this.element.setSelectionRange(start, end);
  }

  getFormattedValueAfterDelete(element, pattern, selectionStart, selectionEnd) {
    var removeStart,
      removeEnd,
      newVal = element.value,
      separatorsAfterCursor = this.TextFormatService.countSeparatorsAfterCursor(
        pattern,
        selectionStart
      );

    if (separatorsAfterCursor) {
      // If we have more separators, we must remove one less character
      var adjust = (separatorsAfterCursor > 1 ? 0 : 1);

      if (selectionStart !== selectionEnd) {
        // A range is selected, remove one less character from start
        removeStart = selectionStart + adjust;
        removeEnd = selectionStart + separatorsAfterCursor + adjust;
      } else {
        // Remove the character after the separators
        removeStart = selectionStart + separatorsAfterCursor;
        removeEnd = selectionStart + separatorsAfterCursor + 1;
      }

      newVal = this.removeCharacters(element.value, removeStart, removeEnd);
    }
    return this.TextFormatService.reformatUsingPattern(newVal, pattern);
  }

  doKeypress(element, pattern, selectionStart, selectionEnd) {
    // The parser already called this, but doing it after appends the next separator
    this.reformatControl(element);
    this.undoStack.add(element.value);

    var newPosition = this.getPositionAfterKeypress(
      pattern, element, selectionStart, selectionEnd
    );
    this.setSelection(newPosition, newPosition);
  }

  getPositionAfterBackspace(pattern, element, selectionStart, selectionEnd) {
    var separatorsBefore = this.TextFormatService.countSeparatorsBeforeCursor(
      pattern,
      selectionStart
    );
    var isRange = (selectionStart !== selectionEnd);
    // If a range was selected, we don't delete a character before cursor
    var proposedPosition = selectionStart - separatorsBefore - (isRange ? 0 : 1);
    return proposedPosition + this.TextFormatService.countSeparatorsAfterCursor(
      pattern,
      proposedPosition
    );
  }

  getPositionAfterKeypress(pattern, element, selectionStart, selectionEnd) {
    var separatorsAfter;
    if (selectionStart !== selectionEnd) {
      separatorsAfter = this.TextFormatService.countSeparatorsAfterCursor(
        pattern,
        selectionStart
      );
    } else {
      // TODO this works but is hard to understand
      separatorsAfter = this.TextFormatService.countSeparatorsAfterCursor(
        pattern,
        selectionStart
      );
      if (separatorsAfter === 0) {
        separatorsAfter = this.TextFormatService.countSeparatorsAfterCursor(
          pattern,
          selectionStart + 1
        );
      }
    }
    return selectionStart + 1 + separatorsAfter;
  }

  removeCharacters(value, first, last) {
    return value.substring(0, first - 1) +
      value.substring(last - 1, value.length);
  }

  onCut(event) {
    var selectionStart = this.element.selectionStart;
    this.$timeout(() => {
      this.reformatControl(this.element);
      this.undoStack.add(this.element.value);

      // Also move cursor to the right of any separators
      var newPosition = selectionStart +
        this.TextFormatService.countSeparatorsAfterCursor(
          this.pattern,
          selectionStart
        );
      this.setSelection(newPosition, newPosition);
    });
  }

  onCopy(event) {
    // Reset selection as otherwise lost
    var selectionStart = this.element.selectionStart;
    var selectionEnd = this.element.selectionEnd;

    this.$timeout(() => {
      this.setSelection(selectionStart, selectionEnd);
    });
  }

  replaceLengthValidators($ngModel, TextFormatService, $timeout) {
    // We must wait until the default directives have loaded before replacing
    $timeout(() => {
      var originalMinLength = $ngModel.$validators.minlength,
          originalMaxLength = $ngModel.$validators.maxlength;

      if (originalMinLength) {
        $ngModel.$validators.minlength = (modelValue, viewValue) => {
          return originalMinLength(
            modelValue,
            TextFormatService.unformatUsingPattern(viewValue, this.pattern)
          );
        };
      }
      if (originalMaxLength) {
        $ngModel.$validators.maxlength = (modelValue, viewValue) => {
          return originalMaxLength(
            modelValue,
            TextFormatService.unformatUsingPattern(viewValue, this.pattern)
          );
        };
      }
    });
  }
}

const keys = {
  cmd: 224,
  cmdLeft: 91,
  cmdRight: 93,
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  delete: 46,
  y: 89,
  z: 90
};

const reservedKeys = [
  keys.cmd,
  keys.cmdLeft,
  keys.cmdRight,
  keys.enter,
  keys.shift,
  keys.ctrl,
  keys.alt,
  keys.left,
  keys.up,
  keys.right,
  keys.down
];

TextFormatController.$inject = [
  '$element',
  '$timeout',
  '$scope',
  'TwTextFormatService',
  'TwUndoStackFactory',
];

export default TextFormatController;
