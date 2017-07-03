(function(angular) {
  'use strict';

  angular
    .module('tw.form-styling')
    .directive('twTextFormat', TwTextFormat);

  function TwTextFormat() {
    return {
      restrict: 'A',
      require: 'ngModel',
      bindToController: true,
      controllerAs: '$ctrl',
      scope: {
        ngModel: '<',
        twTextFormat: "@"
      },
      controller: [
        '$element',
        '$timeout',
        '$scope',
        'TwTextFormatService',
        'TwUndoStackFactory',
        TwTextFormatController
      ]
    };
  }

  function TwTextFormatController(
    $element,
    $timeout,
    $scope,
    TwTextFormatService,
    TwUndoStackFactory
  ) {
    var ngModelController, element, undoStack, keydownCount,
      pattern = "", $ctrl = this;

    function init() {
      undoStack = TwUndoStackFactory.new();
      keydownCount = 0;

      ngModelController = $element.controller('ngModel');
      element = $element[0];

      $scope.$watch('$ctrl.twTextFormat', onPatternChange);
      $scope.$watch('$ctrl.ngModel', onModelChange);

      // Make sure initial pattern is setup
      onPatternChange($ctrl.twTextFormat);

      // We need the formatter for external model changes
      ngModelController.$formatters.push(function(value) {
        return TwTextFormatService.formatUsingPattern(value, pattern); //$ctrl.twTextFormat);
      });
      ngModelController.$parsers.push(function(value) {
        return TwTextFormatService.unformatUsingPattern(value, pattern); //$ctrl.twTextFormat);
      });

      element.addEventListener('change', onChange);
      element.addEventListener('keydown', onKeydown);
      element.addEventListener('paste', onPaste);
      element.addEventListener('cut', onCut);
      element.addEventListener('copy', onCopy);

      // min/max length validators use viewValue which is still formatted.
      // After instantiation override them to unformat view value.
      replaceLengthValidators(ngModelController);

      undoStack.reset(element.value);
    }

    function onModelChange(newModel, oldModel) {
      if (newModel === oldModel) {
        return;
      }
      // Preserve selection range after formatting
      var selectionStart = element.selectionStart,
        selectionEnd = element.selectionEnd;
      reformatControl(element, newModel, true);
      element.setSelectionRange(selectionStart, selectionEnd);
    }

    function onPatternChange(newPattern, oldPattern) {
      if (newPattern === oldPattern) {
        pattern = newPattern;
        return;
      }
      if (newPattern && newPattern.indexOf('||') > 0) {
        var lengthPatterns = getLengthToPatternMap(newPattern);
        console.log(lengthPatterns);
        var modelLength = $ctrl.ngModel ? $ctrl.ngModel.length : 0;
        if (lengthPatterns[String(modelLength)]) {
          pattern = map[String($ctrl.ngModel.length)];
        } else {
          pattern = newPattern.substring(0, newPattern.indexOf('||'));
        }
      } else {
        pattern = newPattern;
      }
      var viewValue = element.value;
      if (oldPattern) {
        viewValue = TwTextFormatService.unformatUsingPattern(viewValue, oldPattern);
      }
      if (newPattern) {
        viewValue = TwTextFormatService.formatUsingPattern(viewValue, pattern);
      }
      undoStack.reset(viewValue);
      element.value = viewValue;
    }

    function replaceLengthValidators(ngModelController) {
      $timeout(function () {
        var originalMinLength = ngModelController.$validators.minlength,
            originalMaxLength = ngModelController.$validators.maxlength;

        if (originalMinLength) {
          ngModelController.$validators.minlength = function(modelValue, viewValue) {
            return originalMinLength(
              modelValue,
              TwTextFormatService.unformatUsingPattern(viewValue, pattern)
            );
          };
        }
        if (originalMaxLength) {
          ngModelController.$validators.maxlength = function(modelValue, viewValue) {
            return originalMaxLength(
              modelValue,
              TwTextFormatService.unformatUsingPattern(viewValue, pattern)
            );
          };
        }
      });
    }

    function reformatControl(element, originalValue) {
      if (!originalValue) {
        originalValue = element.value;
      }
      var newValue = TwTextFormatService.reformatUsingPattern(originalValue, pattern);

      // Don't reset value unless we need to.
      if (newValue !== originalValue) {
        element.value = newValue;
      }
      return newValue;
    }

    function onChange() {
      var formatted = reformatControl(element);
      undoStack.add(formatted);
    }

    function onPaste(event) {
      var selectionStart = element.selectionStart;
      var originalLength = element.value.length;

      var clipboardData = event.clipboardData || window.clipboardData;
      var pastedData = clipboardData.getData('Text');

      var separatorsInPaste = TwTextFormatService.countSeparatorsInAppendedValue(
        pattern, selectionStart, pastedData
      );

      $timeout(function() {
        var newPosition = selectionStart + pastedData.length + separatorsInPaste;
        var formatted = reformatControl(element);
        undoStack.add(formatted);
        element.setSelectionRange(newPosition, newPosition);
      });
    }

    function onKeydown(event) {
      keydownCount++;
      var currentKeydownCount = keydownCount;
      var key = event.keyCode || event.which;

      var selectionStart = event.target.selectionStart;
      var selectionEnd = event.target.selectionEnd;

      if (reservedKeys.indexOf(key) >= 0 || event.metaKey || event.ctrlKey) {
        if (key === keys.z && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          event.stopPropagation();
          element.value = undoStack.undo();
        }
        if (key === keys.y && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          event.stopPropagation();
          element.value = undoStack.redo();
        }
        return;
      }

      $timeout(function() {
        afterKeydown(
          key,
          currentKeydownCount,
          element,
          pattern,
          selectionStart,
          selectionEnd
        );
      });
    }

    function afterKeydown(key, currentKeydownCount, element, pattern, selectionStart, selectionEnd) {
      var newVal;
      // If deleting move back
      if (key === keys.backspace) {
        newVal = doBackspace(element, pattern, selectionStart, selectionEnd);

        // Also trigger model update, not sure why necessary...
        ngModelController.$setViewValue(newVal);
      } else if (key === keys.delete) {
        newVal = doDelete(element, pattern, selectionStart, selectionEnd);

        // Also trigger model update, not sure why necessary...
        ngModelController.$setViewValue(newVal);
      } else {
        // If another keydown occurred before we were able to reposition the
        // cursor, we do not want to set it to an out of date value.
        if (keydownCount === currentKeydownCount) {
          doKeypress(element, pattern, selectionStart, selectionEnd);
        }
      }
    }

    function doBackspace(element, pattern, selectionStart, selectionEnd) {
      element.value = getFormattedValueAfterBackspace(
        element, pattern, selectionStart, selectionEnd
      );

      undoStack.add(element.value);

      var newPosition = getPositionAfterBackspace(
        pattern, element, selectionStart, selectionEnd
      );

      element.setSelectionRange(newPosition, newPosition);

      return element.value;
    }

    function getFormattedValueAfterBackspace(element, pattern, selectionStart, selectionEnd) {
      var removeStart, removeEnd,
        newVal = element.value,
        separatorsBeforeCursor = TwTextFormatService.countSeparatorsBeforeCursor(
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
        newVal = removeCharacters(element.value, removeStart, removeEnd);
      }

      return TwTextFormatService.reformatUsingPattern(newVal, pattern);
    }

    function doDelete(element, pattern, selectionStart, selectionEnd) {
      element.value = getFormattedValueAfterDelete(
        element, pattern, selectionStart, selectionEnd
      );
      undoStack.add(element.value);
      // Put cursor back where it started
      element.setSelectionRange(selectionStart, selectionStart);

      return element.value;
    }

    function getFormattedValueAfterDelete(element, pattern, selectionStart, selectionEnd) {
      var removeStart, removeEnd,
        newVal = element.value,
        separatorsAfterCursor = TwTextFormatService.countSeparatorsAfterCursor(
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

        newVal = removeCharacters(element.value, removeStart, removeEnd);
      }
      return TwTextFormatService.reformatUsingPattern(newVal, pattern);
    }

    function doKeypress(element, pattern, selectionStart, selectionEnd) {
      // The parser already called this, but doing it after appends the next separator
      var formatted = reformatControl(element);
      undoStack.add(formatted);

      var newPosition = getPositionAfterKeypress(
        pattern, element, selectionStart, selectionEnd
      );
      element.setSelectionRange(newPosition, newPosition);
    }

    function onCut(event) {
      var selectionStart = element.selectionStart;
      $timeout(function() {
        var formatted = reformatControl(element);
        undoStack.add(formatted);

        // Also move cursor to the right of any separators
        var newPosition = selectionStart +
          TwTextFormatService.countSeparatorsAfterCursor(
            pattern,
            selectionStart
          );
        element.setSelectionRange(newPosition, newPosition);
      });
    }

    function onCopy(event) {
      // Reset selection as otherwise lost
      var selectionStart = element.selectionStart;
      var selectionEnd = element.selectionEnd;

      $timeout(function() {
        element.setSelectionRange(selectionStart, selectionEnd);
      });
    }

    var keys = {
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

    var reservedKeys = [
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

    init();

    function getPositionAfterBackspace(pattern, element, selectionStart, selectionEnd) {
      var separatorsBefore = TwTextFormatService.countSeparatorsBeforeCursor(
        pattern,
        selectionStart
      );
      var isRange = (selectionStart !== selectionEnd);
      // If a range was selected, we don't delete a character before cursor
      var proposedPosition = selectionStart - separatorsBefore - (isRange ? 0 : 1);
      return proposedPosition + TwTextFormatService.countSeparatorsAfterCursor(
        pattern,
        proposedPosition
      );
    }

    function getPositionAfterKeypress(pattern, element, selectionStart, selectionEnd) {
      var separatorsAfter;
      if (selectionStart !== selectionEnd) {
        separatorsAfter = TwTextFormatService.countSeparatorsAfterCursor(
          pattern,
          selectionStart
        );
      } else {
        // TODO this works but is hard to understand
        separatorsAfter = TwTextFormatService.countSeparatorsAfterCursor(
          pattern,
          selectionStart
        );
        if (separatorsAfter === 0) {
          separatorsAfter = TwTextFormatService.countSeparatorsAfterCursor(
            pattern,
            selectionStart + 1
          );
        }
      }
      return selectionStart + 1 + separatorsAfter;
    }

    function removeCharacters(value, first, last) {
      return value.substring(0, first - 1) +
        value.substring(last - 1, value.length);
    }

    function getLengthToPatternMap(pattern) {
      var patterns = pattern.split('||'), lengthToPatternMap = {};
      patterns.forEach(function(patternIter) {
        console.log(patternIter);
        var lengthString = String(
          TwTextFormatService.countCharactersInPattern(patternIter)
        );
        lengthToPatternMap[lengthString] = patternIter;
      });
      return lengthToPatternMap;
    }
  }

})(window.angular);
