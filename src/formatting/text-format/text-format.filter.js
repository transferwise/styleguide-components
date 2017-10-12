import angular from 'angular';
import TextFormatService from './text-format.service.js';

function TextFormatFilter(TwTextFormatService) {
  return (input, pattern) => {
    input = input || '';
    if (!pattern) {
      return input;
    }
    if (pattern.indexOf('||') > 0) {
      pattern = pattern.substring(0, pattern.indexOf('||'));
    }
    return TwTextFormatService.formatUsingPattern(input, pattern);
  };
}

TextFormatFilter.$inject = ['TwTextFormatService'];

export default angular
  .module('tw.styleguide.formatting.text-format.filter', [
    TextFormatService
  ])
  .filter('twTextFormat', TextFormatFilter).name;
