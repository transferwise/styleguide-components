(function(angular) {
  'use strict';

  angular
    .module('tw.form-styling')
    .directive('twPresentationPattern', TwPresentationPattern);

  function TwPresentationPattern() {
    return {
      restrict: 'A',
      require: 'ngModel',
      controller: ['$element', '$timeout', function($element, $timeout) {
        var ngModelController = $element.controller('ngModel');

        var pattern = $element.attr('tw-presentation-pattern');   // '2-2-2'
        // TODO multi-character separators, custom separators
        var separator = '-';
        var sectionLengths = pattern.split('-').map(function(val) {
          return parseInt(val, 10);
        });

        console.log(pattern);
        console.log(separator);
        console.log(sectionLengths);

        ngModelController.$render = function() {
          $element.val(format(ngModelController.$viewValue));
        };

        /*
        ngModelController.$formatters.push(function(value) {
          console.log("formatting, " + value + " - " + unformat(value));
          return format(value);
        });
        ngModelController.$parsers.push(function(value) {
          //console.log("parsing, " + value + " - " + unformat(value));
          return unformat(value);
        });
        */

        // Need formatter for external model changes
        ngModelController.$formatters.push(format);
        ngModelController.$parsers.push(unformat);

        // min/max length validators use viewValue which is still formatted.
        // After instantiation override them, to unformat view value.
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

        function listener() {
          var rawValue = $element.val();
          // We want visible value to change so we set val rather than $setViewValue
          $element.val(format(rawValue));
        }

        function unformat(value) {
          if (!value) {
            return value;
          }
          var regex = new RegExp(separator, "g");
          return value.replace(regex, '');
        }

        function format(value) {
          value = unformat(value);
          if (!value) {
            return "";
          }

          var presentationValue = "";
          sectionLengths.forEach(function(sectionLength, index) {
            presentationValue += value.substring(0, sectionLength);
            value = value.substring(sectionLength, value.length);
            if (index + 1 < sectionLengths.length && value.length) {
              presentationValue += separator;
            }
          });
          presentationValue += value;
          return presentationValue;
        }

        function separatorsBeforeCursor(value, cursorPosition, separator) {
          var charsBeforeCursor = value.substring(0, cursorPosition);
          var charsWithoutSeparators = unformat(charsBeforeCursor);
          return ((charsBeforeCursor.length - charsWithoutSeparators.length) / separator.length);
        }

        function getCursorPosition(element) {
          return element.selectionStart;
        }
        function setCursorPosition(element, position) {
          element.setSelectionRange(position, position);
        }

        $element.bind('change', listener);
        $element.bind('keydown', function(event) {
          modifyValue(event);
        });

        // keypress is not triggered by special keys
        $element.bind('keypress', function(event) {
          //virtualDomApproach($element, event);
        });

        $element.bind('keyup', function(event) {
          //console.log("keyup: " + event.keyCode);
        });

        $element.bind('paste cut', function() {
          $timeout(function() {
            listener();
            setCursorPosition($element[0], $element.val().length); // TODO check this
          });
        });
        $element.bind('copy', function() {
          $timeout(function() {
            setCursorPosition($element[0], $element.val().length); // TODO check this
          });
        });

        function modifyValue(event) {
          var key = event.keyCode || event.which;
          var pos = getCursorPosition(event.target);
          var separatorsBeforeChange = separatorsBeforeCursor(
            $element.val(), pos, separator
          );

          // If the keys include the CTRL, CMD, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
          // This lets us support copy and paste too
          //if (key === 91 || key === 224 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
          if (reservedKeys.indexOf(key) >= 0) {
            return;
          }

          $timeout(function() {
            //listener();
            $element.val(format(unformat($element.val())));

            // If deleting move back
            var nextPos = key === keys.backspace ? pos - separator.length : pos + separator.length;
            var value = $element.val();
            var separatorsAfterChange = separatorsBeforeCursor(
              $element.val(), nextPos, separator
            );

            if (key === keys.backspace) {
              if (cursorIsAfterSeparatorPlusOne(value, pos, separator)) {
                // TODO this case actually fires when cursor straight after separator
                // Probably because we formatted already

                // Remove another char
                var newVal = removeCharacterAndSeparator(value, pos - 1, separator);
                newVal = format(unformat(newVal));
                $element.val(newVal);
                // Also trigger model update, not sure why necessary...
                ngModelController.$setViewValue(newVal);
              }
            } else {
              // We want visible value to change so we set val rather than $setViewValue
              //$element.val(format(unformat($element.val())));
            }
            setCursorPosition(
              event.target,
              nextPos + ((separatorsAfterChange - separatorsBeforeChange) * separator.length)
            );
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

    function cursorIsAfterSeparator(value, position, separator) {
      return value.substring(position - separator.length - 1, position - 1) === separator;
    }
    function cursorIsAfterSeparatorPlusOne(value, position, separator) {
      return cursorIsAfterSeparator(value, position + 1, separator);
    }
    function removeCharacterAndSeparator(value, position, separator) {
      return value.substring(0, position - separator.length) +
        value.substring(position, value.length);
    }
    /*
    function virtualDomApproach($element, event) {
      var oldVal = $element.val();
      if (event.charCode) {
        var newChar = String.fromCharCode(event.charCode);
        $element.val(oldVal + newChar);
        event.preventDefault();
      } else if (event.charCode === 0) {
        // 0 for special keys
        if (event.keyCode === keys.backspace) {
          $element.val(oldVal.substring(0, oldVal.length - 1));
          event.preventDefault();
        }
      }
    }
    */
  }
})(window.angular);
