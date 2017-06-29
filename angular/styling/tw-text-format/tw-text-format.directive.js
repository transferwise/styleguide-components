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
        TwTextFormatController
      ]
    };
  }

  function TwTextFormatController($element, $timeout, $scope, TwTextFormatService) {
    var ngModelController, element, undoStack, $ctrl = this;

    function init() {
      undoStack = new UndoStack();

      ngModelController = $element.controller('ngModel');
      element = $element[0];

      $scope.$watch('$ctrl.twTextFormat', function(newPattern, oldPattern) {
        if (newPattern === oldPattern) {
          return;
        }
        var viewValue = element.value;
        if (oldPattern) {
          viewValue = TwTextFormatService.unformatUsingPattern(viewValue, oldPattern);
        }
        if (newPattern) {
          viewValue = TwTextFormatService.formatUsingPattern(viewValue, newPattern);
        }
        undoStack.reset(viewValue);
        element.value = viewValue;
      });

      $scope.$watch('$ctrl.ngModel', function(newModel, oldModel) {
        if (newModel === oldModel) {
          return;
        }
        // Preserve selection range after formatting
        var selectionStart = element.selectionStart,
          selectionEnd = element.selectionEnd;
        reformatControl(element, newModel, true);
        element.setSelectionRange(selectionStart, selectionEnd);
      });

      // We need the formatter for external model changes
      ngModelController.$formatters.push(format);
      ngModelController.$parsers.push(unformat);

      element.addEventListener('change', onChange);
      element.addEventListener('keydown', onKeydown);
      element.addEventListener('paste', onPaste);
      element.addEventListener('cut', onCut);
      element.addEventListener('copy', onCopy);

      // min/max length validators use viewValue which is still formatted.
      // After instantiation override them to unformat view value.
      $timeout(function () {
        var originalMinLength = ngModelController.$validators.minlength,
            originalMaxLength = ngModelController.$validators.maxlength;

        if (originalMinLength) {
          ngModelController.$validators.minlength = function(modelValue, viewValue) {
            return originalMinLength(modelValue, unformat(viewValue));
          };
        }
        if (originalMaxLength) {
          ngModelController.$validators.maxlength = function(modelValue, viewValue) {
            return originalMaxLength(modelValue, unformat(viewValue));
          };
        }
      });

      undoStack.reset(element.value);
    }

    function reformatControl(element, originalValue) {
      if (!originalValue) {
        originalValue = element.value;
      }
      var newValue = format(unformat(originalValue));

      // Don't reset value unless we need to.
      if (newValue !== originalValue) {
        element.value = newValue;
      }
      return newValue;
    }

    function unformat(value) {
      if (!value) {
        return value;
      }
      return TwTextFormatService.unformatUsingPattern(value, $ctrl.twTextFormat);
    }

    function format(value) {
      if (!value) {
        return "";
      }
      var formatted = TwTextFormatService.formatUsingPattern(value, $ctrl.twTextFormat);
      return formatted;
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

      var separatorsInPaste = countSeparatorsInPaste(
        $ctrl.twTextFormat, selectionStart, selectionStart, pastedData
      );

      $timeout(function() {
        var newPosition = selectionStart + pastedData.length + separatorsInPaste;
        var formatted = reformatControl(element);
        undoStack.add(formatted);
        element.setSelectionRange(newPosition, newPosition);
      });
    }

    function onKeydown(event) {
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

      var pattern = $ctrl.twTextFormat;

      // timeout runs after native input behaviour completed
      $timeout(function() {
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
          doKeypress(element, pattern, selectionStart, selectionEnd);
        }
      });
    }

    function doBackspace(element, pattern, selectionStart, selectionEnd) {
      var removeStart, removeEnd,
        newVal = element.value,
        separatorsBeforeCursor = countSeparatorsBeforeCursor(pattern, selectionStart);

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

      element.value = format(unformat(newVal));
      undoStack.add(element.value);

      var newPosition = getPositionAfterBackspace(
        pattern, element, selectionStart, selectionEnd
      );

      element.setSelectionRange(newPosition, newPosition);

      return newVal;
    }

    function doDelete(element, pattern, selectionStart, selectionEnd) {
      var removeStart, removeEnd,
        newVal = element.value,
        separatorsAfterCursor = countSeparatorsAfterCursor(pattern, selectionStart);

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

      element.value = format(unformat(newVal));
      undoStack.add(element.value);
      element.setSelectionRange(selectionStart, selectionStart);

      return newVal;
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
        var newPosition = selectionStart + countSeparatorsAfterCursor(
          $ctrl.twTextFormat,
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
  }

  function getPositionAfterBackspace(pattern, element, selectionStart, selectionEnd) {
    var separatorsBefore = countSeparatorsBeforeCursor(pattern, selectionStart);
    var isRange = (selectionStart !== selectionEnd);
    // If a range was selected, we don't delete a character before cursor
    var proposedPosition = selectionStart - separatorsBefore - (isRange ? 0 : 1);
    return proposedPosition + countSeparatorsAfterCursor(pattern, proposedPosition);
  }

  function getPositionAfterKeypress(pattern, element, selectionStart, selectionEnd) {
    var separatorsAfter;
    if (selectionStart !== selectionEnd) {
      separatorsAfter = countSeparatorsAfterCursor(pattern, selectionStart);
    } else {
      // TODO this works but is hard to understand
      separatorsAfter = countSeparatorsAfterCursor(pattern, selectionStart);
      if (separatorsAfter === 0) {
        separatorsAfter = countSeparatorsAfterCursor(pattern, selectionStart + 1);
      }
    }
    return selectionStart + 1 + separatorsAfter;
  }

  function countSeparatorsInPaste(pattern, selectionStart, selectionEnd, pasteData) {
    var separators = 0;
    var i = 0;
    var toAllocate = pasteData.length;
    while(toAllocate) {
      if (pattern[selectionStart + i] === "*" ||
        typeof pattern[selectionStart + i] === "undefined") {
        toAllocate--;
      } else {
        separators++;
      }
      i++;
    }
    return separators;
  }

  function countSeparatorsAfterCursor(pattern, position) {
    var separators = 0;
    while (pattern[position + separators] &&
      pattern[position + separators] !== "*") {
      separators++;
    }
    return separators;
  }

  function countSeparatorsBeforeCursor(pattern, position) {
    var separators = 0;
    while (pattern[position - separators - 1] &&
      pattern[position - separators - 1] !== "*") {
      separators++;
    }
    return separators;
  }

  function removeCharacters(value, first, last) {
    return value.substring(0, first - 1) +
      value.substring(last - 1, value.length);
  }


  /**
   * Browsers seem to implement undo as an async function, it wasn't
   * possible to get adequate behaviour using the default event, so we build
   * our own undo stack.
   */
  function UndoStack() {
    var pointer = 0;
    var stack = [];

    this.reset = function(value) {
      stack = [value];
      pointer = 0;
    };

    this.add = function(value) {
      if (stack.length - 1 > pointer) {
        stack = stack.slice(0, pointer + 1);
      }
      if (stack[pointer] !== value) {
        stack.push(value);
        pointer++;
      }
    };

    this.undo = function() {
      if (pointer >= 0 &&
        typeof stack[pointer - 1] !== "undefined") {
        pointer--;
      }
      return stack[pointer];
    };

    this.redo = function() {
      if (pointer < stack.length &&
        typeof stack[pointer + 1] !== "undefined") {
        pointer++;
      }
      return stack[pointer];
    };
  }

})(window.angular);
