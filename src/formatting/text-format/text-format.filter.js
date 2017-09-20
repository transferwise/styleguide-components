import angular from 'angular';
import TextFormatService from './text-format.service.js';

function TextFormatFilter(TwTextFormatService) {
  return (input, pattern) => {
    input = input || '';
    if (!pattern) {
      return input;
    }
    return TwTextFormatService.formatUsingPattern(input, pattern);
  };
}

TextFormatFilter.$inject = ['TwTextFormatService'];

export default angular
  .module('tw.styleguide.formatting.text-format', [
    TextFormatService
  ])
  .filter('twTextFormat', TextFormatFilter).name;
