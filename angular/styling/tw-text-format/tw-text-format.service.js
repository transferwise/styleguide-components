(function(angular) {
  'use strict';

  angular
    .module('tw.form-styling')
    .service('TwTextFormatService', TwTextFormatService);

  function TwTextFormatService() {

    this.formatUsingPattern = function(value, pattern) {
      var newValue = "";
      var separators = 0;
      var moveCursor = 0;

      for(var i = 0; i < pattern.length && i <= value.length + separators; i++) {
        if (pattern[i] === '*') {
          if (value[i - separators]) {
            newValue += value[i - separators];
          }
        } else {
          newValue += pattern[i];
          separators++;
        }
      }
      // Add remaining characters on the end without formatting
      if (value.substring(pattern.length - separators, value.length)) {
        newValue += value.substring(pattern.length - separators, value.length);
      }
      return newValue;
    };

    this.unformatUsingPattern = function(value, pattern) {
      for(var i = 0; i < pattern.length; i++) {
        if (pattern[i] !== '*') {
          // TODO Not very efficient, regex tricky because of special characters
          while(value.indexOf(pattern[i]) >= 0) {
            value = value.replace(pattern[i], "");
          }
        }
      }
      return value;
    };

    this.countSeparatorsBeforeCursor = function(pattern, position) {
      var separators = 0;
      while (pattern[position - separators - 1] &&
        pattern[position - separators - 1] !== "*") {
        separators++;
      }
      return separators;
    };

    this.countSeparatorsAfterCursor = function(pattern, position) {
      var separators = 0;
      while (pattern[position + separators] &&
        pattern[position + separators] !== "*") {
        separators++;
      }
      return separators;
    };

    this.countSeparatorsInAppendedValue = function(pattern, position, value) {
      var separators = 0;
      var i = 0;
      var toAllocate = value.length;
      while(toAllocate) {
        if (pattern[position + i] === "*" ||
          typeof pattern[position + i] === "undefined") {
          toAllocate--;
        } else {
          separators++;
        }
        i++;
      }
      return separators;
    };
  }
})(window.angular);
