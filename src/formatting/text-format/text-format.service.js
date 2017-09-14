
function TwTextFormatService() {
  this.formatUsingPattern = (value, pattern) => {
    if (!value) {
      value = '';
    }
    if (typeof pattern !== 'string') {
      return value;
    }

    let newValue = '';
    let separators = 0;
    let charactersToAllocate = value.length;
    let position = 0;

    while (charactersToAllocate) {
      if (positionIsSeparator(pattern, position)) {
        newValue += pattern[position];
        separators++;
      } else {
        newValue += value[position - separators];
        charactersToAllocate--;
      }
      position++;
    }

    const separatorsAfterCursor = this.countSeparatorsAfterCursor(pattern, position);
    if (separatorsAfterCursor) {
      newValue += pattern.substr(position, separatorsAfterCursor);
    }
    return newValue;
  };

  this.unformatUsingPattern = (value, pattern) => {
    if (!value) {
      return '';
    }
    if (typeof pattern !== 'string') {
      return value;
    }
    for (let i = 0; i < pattern.length; i++) {
      if (positionIsSeparator(pattern, i)) {
        // Not very efficient, but regex tricky because of special characters
        while (value.indexOf(pattern[i]) >= 0) {
          value = value.replace(pattern[i], '');
        }
      }
    }
    return value;
  };

  this.reformatUsingPattern = (value, newPattern, oldPattern) => {
    if (typeof oldPattern === 'undefined') {
      oldPattern = newPattern;
    }
    return this.formatUsingPattern(
      this.unformatUsingPattern(value, oldPattern),
      newPattern
    );
  };

  this.countSeparatorsBeforeCursor = (pattern, position) => {
    let separators = 0;
    while (positionIsSeparator(pattern, position - separators - 1)) {
      separators++;
    }
    return separators;
  };

  this.countSeparatorsAfterCursor = (pattern, position) => {
    let separators = 0;
    while (positionIsSeparator(pattern, position + separators)) {
      separators++;
    }
    return separators;
  };

  // How long will a value be after separators have been inserted
  this.countSeparatorsInAppendedValue = (pattern, position, value) => {
    let separators = 0;
    let i = 0;
    let toAllocate = value.length;
    while (toAllocate) {
      if (positionIsSeparator(pattern, position + i)) {
        separators++;
      } else {
        toAllocate--;
      }
      i++;
    }
    return separators;
  };

  this.countSeparatorsInPattern = (pattern) => {
    let separators = 0;
    for (let i = 0; i < pattern.length; i++) {
      if (positionIsSeparator(pattern, i)) {
        separators++;
      }
    }
    return separators;
  };

  function positionIsSeparator(pattern, position) {
    return pattern[position] && pattern[position] !== '*';
  }
}

export default TwTextFormatService;
