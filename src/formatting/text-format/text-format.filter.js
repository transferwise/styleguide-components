function TextFormatFilter(TextFormatService) {
  return (input, pattern) => {
    input = input || '';
    if (!pattern) {
      return input;
    }
    if (pattern.indexOf('||') > 0) {
      pattern = pattern.substring(0, pattern.indexOf('||'));
    }
    return TextFormatService.formatUsingPattern(input, pattern);
  };
}

TextFormatFilter.$inject = ['TwTextFormatService'];

export default TextFormatFilter;
