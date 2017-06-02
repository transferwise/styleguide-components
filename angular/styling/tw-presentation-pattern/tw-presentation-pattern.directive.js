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
        console.log("presentation pattern");

        var pattern = $element.attr('tw-presentation-pattern');   // '2-2-2'
        var separator = '-/';
        var sectionLengths = pattern.split('-').map(function(val) {
          return parseInt(val, 10);
        });

        console.log(pattern);
        console.log(separator);
        console.log(sectionLengths);

        //ngModelController.$formatters.push(format);

        ngModelController.$render = function() {
          $element.val(format(ngModelController.$viewValue));
        };

        ngModelController.$parsers.push(function(value) {
          return unformat(value);
        });

        ngModelController.$validators.custom = function(newValue) {
          console.log("Validating: " + newValue);
          return true;
        };
        // Override maxlength
        $timeout(function () {
          ngModelController.$validators.maxlength = function(newValue) {
            console.log("Max Validating: " + newValue);
            return newValue.length <= 9; // TODO
          };
        });


        function listener() {
          var rawValue = $element.val();
          //ngModelController.$setViewValue(rawValue);
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
              console.log("ADD");
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
          console.log("keydown: " + event.which);
          console.log(ngModelController.$modelValue);
          console.log(ngModelController.$viewValue);
          console.log(ngModelController.$valid);

          modifyValue(event);
        });

        $element.bind('keypress', function(event) {
          console.log("keypress");
          console.log(ngModelController.$modelValue);
          console.log(ngModelController.$viewValue);
          console.log(ngModelController.$valid);
        });

        $element.bind('keyup', function(event) {
          console.log("keyup");
          console.log(ngModelController.$modelValue);
          console.log(ngModelController.$viewValue);
          console.log(ngModelController.$valid);
          //modifyValue(event);
          //ngModelController.$setViewValue(format(ngModelController.$modelValue));
        });

        $element.bind('paste cut', function() {
          $timeout(listener);
          setCursorPosition($element[0], $element.val().length); // TODO check this
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
            console.log("reserved!");
            return;
          }
          // TODO problem: validators receive separators, so they belive value is too long
          $timeout(function() {
            listener();
            // If deleting move back
            var nextPos = key === 8 ? pos - separator.length : pos + separator.length;
            var value = $element.val();
            var separatorsAfterChange = separatorsBeforeCursor(
              $element.val(), nextPos, separator
            );
            if (key === 8) {
              if (cursorIsAfterSeparator(value, pos, separator)) {
                //ngModelController.$setViewValue(
                //  format(removeCharacterAndSeparator(value, pos, separator))
                //);
                $element.val(
                  format(removeCharacterAndSeparator(value, pos, separator))
                );
              } else if (cursorIsAfterSeparatorPlusOne(value, pos, separator)) {
                //ngModelController.$setViewValue(
                //  format(removeCharacterAndSeparator(value, pos, separator))
                //)
                $element.val(
                  format(removeCharacterAndSeparator(value, pos - 1, separator))
                );
              }
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

  }
})(window.angular);
