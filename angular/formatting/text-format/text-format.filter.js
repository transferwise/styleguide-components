import TextFormatService from './text-format.service.js';

function TextFormatFilter(TwTextFormatService) {
  return function(input, pattern) {
    input = input || '';
    if (!pattern) {
      return input;
    }
    return TwTextFormatService.formatUsingPattern(input, pattern);
  };
}

TextFormatFilter.$inject = ['TwTextFormatService'];

export default angular
  .module('tw.styleguide.formatting.text-format')
  .filter('twTextFormat', TextFormatFilter).name;
