import TwTextFormatService from './tw-text-format.service.js';

function TwTextFormatFilter(TwTextFormatService) {
  return function(input, pattern) {
    input = input || '';
    if (!pattern) {
      return input;
    }
    return TwTextFormatService.formatUsingPattern(input, pattern);
  };
}

TwTextFormatFilter.$inject = ['TwTextFormatService'];

export default angular
  .module('tw.styleguide.styling.text-format')
  .filter('twTextFormat', TwTextFormatFilter).name;
