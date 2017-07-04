(function(angular) {
  'use strict';

  angular
    .module('tw.form-styling')
    .filter('twTextFormat', ['TwTextFormatService', function(TwTextFormatService) {
      return function(input, pattern) {
        input = input || '';
        if (!pattern) {
          return input;
        }
        return TwTextFormatService.formatUsingPattern(input, pattern);
      };
    }]);
})(window.angular);
