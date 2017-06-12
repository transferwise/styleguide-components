(function(angular) {
  'use strict';

  angular
    .module('tw.form-styling')
    .directive('twPresentationPattern', TwPresentationPattern);

  function TwPresentationPattern() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        twPresentationPattern: '@'
      },
      controller: ['$element', '$timeout', '$scope', '$attrs', '$parse', 'TwTextFormatting',
        function($element, $timeout, $scope, $attrs, $parse, TwTextFormatting) {
        var $ctrl = this;
        var ngModelController = $element.controller('ngModel');

        $scope.$watch($scope.twPresentationPattern, function(newValue, oldValue) {
          console.log(newValue);
          //reformatControl($element)
        });

        ngModelController.$render = function() {
          console.log("render");
          $element.val(format(ngModelController.$viewValue));
        };

        // Need formatter for external model changes
        ngModelController.$formatters.push(function(value) {
          console.log("formatters");
          return format(value);
        });
        ngModelController.$parsers.push(function(value) {
          console.log("parsers");

          //reformatControl($element)
          return unformat(value);
        });

        // min/max length validators use viewValue which is still formatted.
        // After instantiation override them, to unformat view value.
        $timeout(function () {
          var originalMinLength = ngModelController.$validators.minlength,
              originalMaxLength = ngModelController.$validators.maxlength;

          if (originalMinLength) {
            ngModelController.$validators.minlength = function(modelValue, viewValue) {
              console.log("minlength");
              return originalMinLength(modelValue, unformat(viewValue));
            };
          }
          if (originalMaxLength) {
            ngModelController.$validators.maxlength = function(modelValue, viewValue) {
              console.log("maxlength");
              return originalMaxLength(modelValue, unformat(viewValue));
            };
          }
        });

        // Used on change and paste
        function listener() {
          // We want visible value to change so we set val rather than $setViewValue
          console.log("listener");
          reformatControl($element);
        }


        function reformatControl($element, originalValue) {
          if (!originalValue) {
            originalValue = $element.val();
          }
          var newValue = format(unformat(originalValue));
          // Don't reset value unless we need to.
          if (newValue !== originalValue) {
            $element.val(newValue);
          }
          return newValue;
        }

        function unformat(value) {
          console.log("unformat: " + value);
          if (!value) {
            return value;
          }
          var pattern = $element.attr('tw-presentation-pattern');
          return TwTextFormatting.unformatUsingPattern(value, pattern);
        }

        function format(value) {
          console.log("format: " + value);
          if (!value) {
            return "";
          }
          var pattern = $element.attr('tw-presentation-pattern');
          return TwTextFormatting.formatUsingPattern(value, pattern);
        }

        $element.bind('change', listener);
        $element.bind('keydown', function(event) {
          modifyValue(event);
        });

        $element.bind('paste', function(event) {
          var selectionStart = $element[0].selectionStart;
          var originalLength = $element.val().length;
          $timeout(function() {
            console.log('paste');
            // TODO is separators are inserted into pasted value, curso won't
            // be in quite the right place, tricky to solve...
            var newLength = $element.val().length;
            var newPosition = selectionStart + (newLength - originalLength);
            $element[0].setSelectionRange(newPosition, newPosition);
            listener();
          });
        });

        $element.bind('cut', function() {
          // Reset cursor position
          var selectionStart = $element[0].selectionStart;
          $timeout(function() {
            listener();
            // TODO could move the cursor right if there are following separators
            $element[0].setSelectionRange(selectionStart, selectionStart);
          });
        });


        $element.bind('copy', function() {
          // Reset selection as otherwise lost
          var selectionStart = $element[0].selectionStart;
          var selectionEnd = $element[0].selectionEnd;

          $timeout(function() {
            $element[0].setSelectionRange(selectionStart, selectionEnd);
          });
        });

        function modifyValue(event) {
          var key = event.keyCode || event.which;

          // If the keys include the CTRL, CMD, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
          // This lets us support copy and paste too
          //if (key === 91 || key === 224 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
          if (reservedKeys.indexOf(key) >= 0 || event.metaKey || event.ctrlKey) {
            return;
          }

          var selectionStart = getCursorPosition(event.target);
          var selectionEnd = event.target.selectionEnd;

          var isRange = (selectionStart !== selectionEnd);

          var pattern = $element.attr('tw-presentation-pattern');
          var separators = countSeparatorsBeforeCursor(pattern, selectionStart);

          // timeout runs after native input behaviour completed
          $timeout(function() {
            var value = $element.val();

            // If deleting move back
            if (key === keys.backspace) {
              var newVal = value;
              if (separators) {
                // If we have more separators, we must remove one less character
                var adjust = (separators > 1 ? 1 : 0);
                if (isRange) {
                  newVal = removeCharacters(value, selectionStart - separators + 1, selectionStart - adjust);
                } else {
                  newVal = removeCharacters(value, selectionStart - separators, selectionStart - adjust);
                }
              }
              $element.val(format(unformat(newVal)));

              // Also trigger model update, not sure why necessary...
              ngModelController.$setViewValue(newVal);

              setCursorPosition(
                event.target,
                getPositionAfterBackspace(pattern, $element[0], selectionStart, selectionEnd)
              );
            } else {
              // The parser has already called this, but doing it after appends the next separator
              reformatControl($element);

              var newPosition = getPositionAfterKeypress(pattern, $element[0], selectionStart + 1);

              setCursorPosition(event.target, newPosition);
            }
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
      }]
    };


    function getPositionAfterBackspace(pattern, element, selectionStart, selectionEnd) {
      var separatorsBefore = countSeparatorsBeforeCursor(pattern, selectionStart);
      var isRange = (selectionStart !== selectionEnd);
      // If a range was selected, we don't delete a character before cursor
      var proposedPosition = selectionStart - separatorsBefore - (isRange ? 0 : 1);
      var separatorsAfter = countSeparatorsAfterCursor(pattern, proposedPosition);
      return proposedPosition + separatorsAfter;
    }
    function getPositionAfterKeypress(pattern, element, position) {
      var separatorsAfter = countSeparatorsAfterCursor(pattern, position);
      return position + separatorsAfter + 1;
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

    function removeCharacter(value, position) {
      return value.substring(0, position - 1) +
        value.substring(position, value.length);
    }
    function removeCharacters(value, first, last) {
      return value.substring(0, first - 1) +
        value.substring(last - 1, value.length);
    }

    function getCursorPosition(element) {
      return element.selectionStart;
    }
    function setCursorPosition(element, position) {
      element.setSelectionRange(position, position);
    }

  }
})(window.angular);
