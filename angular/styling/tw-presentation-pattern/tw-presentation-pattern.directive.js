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
        var separator = '-';
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

        function separatorsBeforeCursor(value, cursorPosition) {
          var charsBeforeCursor = value.substring(0, cursorPosition);
          var charsWithoutSeparators = unformat(charsBeforeCursor);
          return charsBeforeCursor.length - charsWithoutSeparators.length;
        }

        function getCursorPosition(element) {
          return element.selectionStart;
        }
        function setCursorPosition(element, position) {
          element.setSelectionRange(position, position);
        }

        $element.bind('change', listener);
        $element.bind('keydown', function(event) {
          console.log("keydown");
          console.log(ngModelController.$modelValue);
          console.log(ngModelController.$viewValue);
          console.log(ngModelController.$valid);
          /*
          var key = event.keyCode || event.which;
          var pos = getCursorPosition(event.target);
          var separatorsBeforeChange = separatorsBeforeCursor($element.val(), pos);

          // If the keys include the CTRL, CMD, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
          // This lets us support copy and paste too
          if (key === 91 || key === 224 || (15 < key && key < 19) || (37 <= key && key <= 40)) {
            return;
          }
          // TODO problem: validators receive separators, so they belive value is too long
          $timeout(function() {
            listener();
            // If deleting move back
            var nextPos = key === 8 ? pos - 1 : pos + 1;
            var value = $element.val();
            var separatorsAfterChange = separatorsBeforeCursor($element.val(), nextPos);
            if (key === 8 && value[pos - 1] === separator) {
              // If preceding char was a separator, delete two chars (separator
              // and real char), new separator will be added
              var newVal = value.substring(0, pos - 2) + value.substring(pos, value.length);
              //ngModelController.$setViewValue(newVal);
              $element.val(format(newVal));
            }
            setCursorPosition(event.target, nextPos + (separatorsAfterChange - separatorsBeforeChange));
          }); // Have to do this or changes don't get picked up properly
          */
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
          ngModelController.$setViewValue(format(ngModelController.$modelValue));
        });

        $element.bind('paste cut', function() {
          $timeout(listener);
          setCursorPosition($element[0], $element.val().length); // TODO check this
        });
      }]
    };
  }
})(window.angular);
