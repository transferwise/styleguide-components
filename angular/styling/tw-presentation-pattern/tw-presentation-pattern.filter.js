(function(angular) {
  'use strict';

  angular
    .module('tw.form-styling')
    .filter('twPresentationPattern', ['TwTextFormatting', function(TwTextFormatting) {
      return function(input, pattern) {
        input = input || '';
        if (!pattern) {
          return input;
        }
        return TwTextFormatting.formatUsingPattern(input, pattern);
      };
    }]);
})(window.angular);
