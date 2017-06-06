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
      controller: ['$element', '$timeout', '$scope', '$attrs', '$parse', function($element, $timeout, $scope, $attrs, $parse) {
        var $ctrl = this;
        var ngModelController = $element.controller('ngModel');

        //var pattern = $element.attr('tw-presentation-pattern');
        console.log($attrs);

        $scope.$watch($scope.twPresentationPattern, function(newValue, oldValue) {
          console.log(newValue);
          //var val = $element.val();
          //$element.val(patternise(new, unpatternise(old, val)));
        });



        //$scope.$watch('$attrs.twPresentationPattern', function(newValue, oldValue) {
          //var value = $element.val();
          /*
          console.log(newValue);
          console.log(oldValue);
          if (oldValue) {
            value = unpatternise(oldValue, value);
          }
          if (newValue) {
            value = patternise(newValue, value);
          }
          */
          //$element.val(value);
        //});


        ngModelController.$render = function() {
          $element.val(format(ngModelController.$viewValue));
        };

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
          console.log("listener");
          $element.val(format(rawValue));
        }

        function unformat(value) {
          if (!value) {
            return value;
          }
          var pattern = $element.attr('tw-presentation-pattern');
          return unpatternise(pattern, value);
        }

        function format(value) {
          value = unformat(value);
          if (!value) {
            return "";
          }
          var pattern = $element.attr('tw-presentation-pattern');
          return patternise(pattern, value);
        }

        function separatorsBeforeCursorPattern(pattern, position) {
          var separators = 0;
          for(var i = 0; i < position; i++) {
            if (i >= pattern.length) {
              continue;
            }
            if (pattern[i] !== "*") {
              separators++;
            }
          }
          return separators;
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
          var key = event.keyCode || event.which;
          var pos = getCursorPosition(event.target);

          var pattern = $element.attr('tw-presentation-pattern');
          var separatorsBeforeChange = separatorsBeforeCursorPattern(pattern, pos);

          // If the keys include the CTRL, CMD, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
          // This lets us support copy and paste too
          //if (key === 91 || key === 224 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
          if (reservedKeys.indexOf(key) >= 0) {
            return;
          }

          $timeout(function() {
            // If deleting move back
            //var nextPos = key === keys.backspace ? pos - separator.length : pos + separator.length;
            var nextPos = key === keys.backspace ? pos - 1 : pos + 1;
            var value = $element.val();

            var separatorsAfterChange = separatorsBeforeCursorPattern(pattern, nextPos);

            if (key === keys.backspace) {
              console.log("backspace");
              if (cursorIsAfterSeparatorPattern(pattern, pos)) {
                // Remove another char
                var newVal;
                // TODO need to go further if more than one separator in a row.
                newVal = removeCharacter(value, pos - 1);
                console.log("after remove: " + newVal);
                newVal = format(unformat(newVal));
                $element.val(newVal);
                // Also trigger model update, not sure why necessary...
                ngModelController.$setViewValue(newVal);
              }
            } else {
              console.log("timeout");
              // We want visible value to change so we set val rather than $setViewValue
              $element.val(format(unformat($element.val())));
            }

            // TODO if next two chars are separators this doesn't work.
            setCursorPosition(
              event.target,
              nextPos + (separatorsAfterChange - separatorsBeforeChange)
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

    function cursorIsAfterSeparatorPattern(pattern, pos) {
      return pattern[pos - 1] && pattern[pos - 1] !== "*";
    }

    function removeCharacter(value, position) {
      return value.substring(0, position - 1) +
        value.substring(position, value.length);
    }

    // TODO better approach
    function patternise(pattern, value) {
      console.log("patternise: "+ value);
      var newValue = "";
      var separators = 0;
      for(var i = 0; i < pattern.length; i++) {
        if (i >= value.length + separators) {
          continue;
        }

        if (pattern[i] === '*') {
          console.log("1 " + i + ", " + separators);
          //if (value[i - separators]) {
            newValue += value[i - separators];
          //}
        }	else {
          console.log("2");
          newValue += pattern[i];
          separators++;
        }
      }
      if (value.substring(pattern.length - separators, value.length)) {
        newValue += value.substring(pattern.length - separators, value.length);
      }
      console.log("patternise end: "+ newValue);
      return newValue;
    }
    function unpatternise(pattern, value) {
      console.log("unpatternise: "+ value);

      for(var i = 0; i < pattern.length; i++) {
        if (pattern[i] !== '*') {
          value = value.replace(pattern[i], "");
        }
      }

      return value;
    }

  }
})(window.angular);
