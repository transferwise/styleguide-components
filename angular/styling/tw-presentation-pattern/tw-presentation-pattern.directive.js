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
          //newCursorPosition($element[0], pattern, value);
          return TwTextFormatting.formatUsingPattern(value, pattern);
        }

        $element.bind('change', listener);
        $element.bind('keydown', function(event) {
          modifyValue(event);
        });

        $element.bind('paste cut', function() {
          $timeout(function() {
            listener();
            console.log('paste cut');
            setCursorPosition($element[0], $element.val().length); // TODO check this
          });
        });
        $element.bind('copy', function() {
          $timeout(function() {
            console.log('paste copy');
            setCursorPosition($element[0], $element.val().length); // TODO check this
          });
        });

        function modifyValue(event) {
          console.log("keypress");
          var key = event.keyCode || event.which;

          // If the keys include the CTRL, CMD, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
          // This lets us support copy and paste too
          //if (key === 91 || key === 224 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
          if (reservedKeys.indexOf(key) >= 0) {
            return;
          }

          var initialPosition = getCursorPosition(event.target);
          var initialSelectionEnd = event.target.selectionEnd;

          var isRange = (initialPosition !== initialSelectionEnd);

          var pattern = $element.attr('tw-presentation-pattern');
          var separators = separatorsBeforeCursor(pattern, initialPosition);

          console.log("initialPos: "+initialPosition);

          // timeout runs after native input behaviour completed
          $timeout(function() {

            console.log("timeout");
            var value = $element.val();

            // If deleting move back
            if (key === keys.backspace) {
              console.log("backspace");
              var newVal = value;
              // Remove preceding separators
              if (separators > 1) {
                if (isRange) {
                  newVal = removeCharacters(value, initialPosition - separators + 1, initialPosition - 1);
                } else {
                  newVal = removeCharacters(value, initialPosition - separators, initialPosition - 1);
                }
              } else if (separators === 1) {
                if (isRange) {
                  console.log('sep 1 range');
                  newVal = removeCharacters(value, initialPosition, initialPosition);
                } else {
                  console.log('sep 1 cursor');
                  // TODO if we're not at the end of the string, cursor goes to wrong place
                  newVal = removeCharacters(value, initialPosition - 1, initialPosition);
                }
              }
              $element.val(format(unformat(newVal)));

              // Also trigger model update, not sure why necessary...
              ngModelController.$setViewValue(newVal);

              setCursorPosition(
                event.target,
                getPositionAfterBackspace(pattern, $element[0], initialPosition, initialSelectionEnd)
              );
            } else {
              console.log("keyhandler");
              // The parser has already called this, but doing it after appends the next separator
              reformatControl($element);

              var newPosition = getPositionAfterKeypress(pattern, $element[0], initialPosition + 1);
              console.log("newPos: " + newPosition);
              setCursorPosition(event.target, newPosition);
            }
          }); // Have to do this or changes don't get picked up properly
        }

        var keys = {
          cmd: 224,
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


    function getPositionAfterBackspace(pattern, element, initialPosition, selectionEnd) {
      var separators = separatorsBeforeCursor(pattern, initialPosition);
      var isRange = (initialPosition !== selectionEnd);
      // If a range was selected, we don't delete a character before cursor
      var proposedPosition = initialPosition - separators - (isRange ? 0 : 1);
      var separatorsFollowing = separatorsAfterCursor(pattern, proposedPosition);
      return proposedPosition + separatorsFollowing;
    }
    function getPositionAfterKeypress(pattern, element, initialPosition) {
      var separators = separatorsAfterCursor(pattern, initialPosition);
      return initialPosition + separators + 1;
    }

    function separatorsAfterCursor(pattern, position) {
      var separators = 0;
      while (pattern[position + separators] &&
        pattern[position + separators] !== "*") {
        separators++;
      }
      return separators;
    }

    function separatorsBeforeCursor(pattern, position) {
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
      console.log("remove val " + value + " first " + first + " last " + last);
      return value.substring(0, first - 1) +
        value.substring(last - 1, value.length);
    }

    /*
    function newCursorPosition(element, pattern, value) {
      var separators = 0;
      var moveCursor = 0;
      var cursorPosition = getCursorPosition(element);

      for(var i = 0; i < pattern.length && i <= value.length + separators; i++) {
        if (pattern[i] === '*') {
          if (value[i - separators]) {
            moveCursor = 0;
          }
        }	else {
          separators++;
          if (i < cursorPosition) {
            moveCursor++;
          }
        }
      }

      if (moveCursor) {
        // TODO move this outside
        console.log("moveCursor");
        setCursorPosition(element, cursorPosition + moveCursor);
      }
    }
    */


    function getCursorPosition(element) {
      console.log("getPos " + element.selectionStart);
      return element.selectionStart;
    }
    function setCursorPosition(element, position) {
      console.log("setPos " + position);
      element.setSelectionRange(position, position);
    }

  }
})(window.angular);
