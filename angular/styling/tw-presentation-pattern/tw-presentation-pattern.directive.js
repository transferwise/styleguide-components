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

        //var pattern = $element.attr('tw-presentation-pattern');
        console.log($attrs);

        $scope.$watch($scope.twPresentationPattern, function(newValue, oldValue) {
          console.log(newValue);
          //var val = $element.val();
          //$element.val(format(new, unformat(old, val)));
        });



        //$scope.$watch('$attrs.twPresentationPattern', function(newValue, oldValue) {
          //var value = $element.val();
          /*
          console.log(newValue);
          console.log(oldValue);
          if (oldValue) {
            value = unformat(oldValue, value);
          }
          if (newValue) {
            value = format(newValue, value);
          }
          */
          //$element.val(value);
        //});


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
          //$element.val(format(unformat($element.val())));
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
          var rawValue = $element.val();
          // We want visible value to change so we set val rather than $setViewValue
          console.log("listener");
          $element.val(format(unformat(rawValue)));
        }

        function unformat(value) {
          console.log("unformat");
          if (!value) {
            return value;
          }
          var pattern = $element.attr('tw-presentation-pattern');
          return TwTextFormatting.unformatUsingPattern(value, pattern);
          //return unpatternise(TwTextFormatting, pattern, value);
        }

        function format(value) {
          console.log("format");
          if (!value) {
            return "";
          }
          var pattern = $element.attr('tw-presentation-pattern');

          var newValue = TwTextFormatting.formatUsingPattern(value, pattern);

          newCursorPosition($element[0], pattern, value);

          return newValue;
          //return patternise(TwTextFormatting, pattern, value, $element[0]);
        }


        $element.bind('change', listener);
        $element.bind('keydown', function(event) {
          modifyValue(event);
        });

        /*
        // keypress is not triggered by special keys
        $element.bind('keypress', function(event) {
          //virtualDomApproach($element, event);
          //modifyValue(event);
        });

        $element.bind('keyup', function(event) {
          //console.log("keyup: " + event.keyCode);
          //modifyValue(event);
        });
        */

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
          console.log("keypress");
          var key = event.keyCode || event.which;

          // If the keys include the CTRL, CMD, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
          // This lets us support copy and paste too
          //if (key === 91 || key === 224 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
          if (reservedKeys.indexOf(key) >= 0) {
            return;
          }

          var pos = getCursorPosition(event.target);
          console.log("initialPos: "+pos);

          $timeout(function() {
            var pattern = $element.attr('tw-presentation-pattern');
            var nextPos = key === keys.backspace ? pos - 1 : pos + 1;
            var value = $element.val();
            var newPos = getCursorPosition(event.target);

            // If deleting move back
            if (key === keys.backspace) {
              console.log("backspace");
              var separators = separatorsBeforeCursor(pattern, pos);
              var newVal = value;
              if (separators) {
                // Remove another char
                newVal = removeCharacters(value, pos - separators, pos);
                console.log("after remove: " + newVal);
              }

              newVal = format(unformat(newVal));
              $element.val(newVal);
              // Also trigger model update, not sure why necessary...
              ngModelController.$setViewValue(newVal);

              setCursorPosition(
                event.target,
                getPositionAfterBackspace(pattern, pos)
              );
            } else {
              console.log("timeout");
              // The parser has already called this, but doing it after appends the next separator
              $element.val(format(unformat($element.val())));

              console.log("newPos: " + getPositionAfterKeypress(pattern, pos));
              setCursorPosition(
                event.target,
                getPositionAfterKeypress(pattern, pos)
              );
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

    function getPositionAfterBackspace(pattern, position) {
      var separators = separatorsBeforeCursor(pattern, position);
      return position - separators - 1;
    }
    function getPositionAfterKeypress(pattern, position) {
      var separators = separatorsAfterCursor(pattern, position);
      return position + separators + 1;
    }

    function separatorsAfterCursor(pattern, position) {
      var separators = 0;
      for(var i = position; i < pattern.length; i++) {
        if (pattern[i] !== "*") {
          separators++;
        }
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
      return value.substring(0, first - 1) +
        value.substring(last - 1, value.length);
    }

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
