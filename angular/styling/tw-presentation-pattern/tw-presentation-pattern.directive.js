(function(angular) {
  'use strict';

  angular
    .module('tw.form-styling')
    .directive('twPresentationPattern', TwPresentationPattern);

  function TwPresentationPattern() {
    return {
      restrict: 'A',
      require: 'ngModel',
      controller: [
        '$element',
        '$timeout',
        'TwTextFormatting',
        TwPresentationPatternController
      ]
    };
  }

  function TwPresentationPatternController($element, $timeout, TwTextFormatting) {
    var ngModelController = $element.controller('ngModel');
    var element = $element[0];

    ngModelController.$render = function() {
      element.value = format(ngModelController.$viewValue);
    };

    // We need the formatter for external model changes
    ngModelController.$formatters.push(format);
    ngModelController.$parsers.push(unformat);

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
      return TwTextFormatting.unformatUsingPattern(value, getPattern(element));
    }

    function format(value) {
      if (!value) {
        return "";
      }
      return TwTextFormatting.formatUsingPattern(value, getPattern(element));
    }

    element.addEventListener('change', onChange);
    element.addEventListener('keydown', onKeydown);
    element.addEventListener('paste', onPaste);
    element.addEventListener('cut', onCut);
    element.addEventListener('copy', onCopy);

    function onChange() {
      // We want visible value to change so we set val rather than $setViewValue
      reformatControl(element);
    }

    function onPaste(event) {
      var selectionStart = element.selectionStart;
      var originalLength = element.value.length;

      var clipboardData = event.clipboardData || window.clipboardData;
      var pastedData = clipboardData.getData('Text');
      var pattern = getPattern(element);

      var separatorsInPaste = countSeparatorsInRange(
        pattern, selectionStart, selectionStart + pastedData.length
      );

      $timeout(function() {
        var newPosition = selectionStart + pastedData.length + separatorsInPaste - 1;
        onChange();
        element.setSelectionRange(newPosition, newPosition);
      });
    }

    function onKeydown(event) {
      var key = event.keyCode || event.which;

      if (reservedKeys.indexOf(key) >= 0 || event.metaKey || event.ctrlKey) {
        // TODO undo can change value, we must reformat.
        return;
      }

      var selectionStart = event.target.selectionStart;
      var selectionEnd = event.target.selectionEnd;

      var pattern = getPattern(element);

      // timeout runs after native input behaviour completed
      $timeout(function() {
        // If deleting move back
        if (key === keys.backspace) {
          var newVal = doBackspace(element, pattern, selectionStart, selectionEnd);

          // Also trigger model update, not sure why necessary...
          ngModelController.$setViewValue(newVal);
        } else {
          doKeypress(element, pattern, selectionStart, selectionEnd);
        }
      });
    }

    function doBackspace(element, pattern, selectionStart, selectionEnd) {
      var separatorsBeforeCursor = countSeparatorsBeforeCursor(pattern, selectionStart);
      var newVal = element.value;
      if (separatorsBeforeCursor) {
        // If we have more separators, we must remove one less character
        var adjust = (separatorsBeforeCursor > 1 ? 1 : 0);

        if (selectionStart !== selectionEnd) {
          // A range is selected, remove one less character from start
          newVal = removeCharacters(
            element.value,
            selectionStart - separatorsBeforeCursor + 1,
            selectionStart - adjust
          );
        } else {
          newVal = removeCharacters(
            element.value,
            selectionStart - separatorsBeforeCursor,
            selectionStart - adjust
          );
        }
      }
      element.value = format(unformat(newVal));

      var newPosition = getPositionAfterBackspace(
        pattern, element, selectionStart, selectionEnd
      );

      element.setSelectionRange(newPosition, newPosition);

      return newVal;
    }

    function doKeypress(element, pattern, selectionStart, selectionEnd) {
      // The parser already called this, but doing it after appends the next separator
      reformatControl(element);

      var newPosition = getPositionAfterKeypress(
        pattern, element, selectionStart, selectionEnd
      );

      element.setSelectionRange(newPosition, newPosition);
    }

    function onCut(event) {
      // Reset cursor position
      var selectionStart = element.selectionStart;
      $timeout(function() {
        onChange();
        var pattern = getPattern(element);
        // Also move cursor to the right of any separators
        var newPosition = selectionStart + countSeparatorsAfterCursor(pattern, selectionStart);
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

    function getPattern(element) {
      return element.getAttribute('tw-presentation-pattern');
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
      separatorsAfter = countSeparatorsAfterCursor(pattern, selectionStart + 1);
    }
    return selectionStart + 1 + separatorsAfter;
  }

  function countSeparatorsInRange(pattern, selectionStart, selectionEnd) {
    var section = pattern.substring(selectionStart, selectionEnd);
    var separators = 0;
    for (var i = 0; i < section.length; i++) {
      if (section[i] !== "*") {
        separators++;
      }
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

})(window.angular);
