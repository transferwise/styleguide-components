
function TwTextFormatService() {

  this.formatUsingPattern = function(value, pattern) {
    if (!value) {
      value = "";
    }
    if (typeof pattern !== "string") {
      return value;
    }
    var newValue = "",
      separators = 0;

    var charactersToAllocate = value.length;
    var position = 0;
    while(charactersToAllocate) {
      if (positionIsSeparator(pattern, position)) {
        newValue += pattern[position];
        separators++;
      } else {
        newValue += value[position - separators];
        charactersToAllocate--;
      }
      position++;
    }

    var separatorsAfterCursor = this.countSeparatorsAfterCursor(pattern, position);
    if (separatorsAfterCursor) {
      newValue += pattern.substr(position, separatorsAfterCursor);
    }
    return newValue;
  };

  this.unformatUsingPattern = function(value, pattern) {
    if (!value) {
      return "";
    }
    if (typeof pattern !== "string") {
      return value;
    }
    for(var i = 0; i < pattern.length; i++) {
      if (positionIsSeparator(pattern, i)) {
        // Not very efficient, but regex tricky because of special characters
        while(value.indexOf(pattern[i]) >= 0) {
          value = value.replace(pattern[i], "");
        }
      }
    }
    return value;
  };

  this.reformatUsingPattern = function(value, newPattern, oldPattern) {
    if (typeof oldPattern === "undefined") {
      oldPattern = newPattern;
    }
    return this.formatUsingPattern(
      this.unformatUsingPattern(value, oldPattern),
      newPattern
    );
  };

  this.countSeparatorsBeforeCursor = function(pattern, position) {
    var separators = 0;
    while (positionIsSeparator(pattern, position - separators - 1)) {
      separators++;
    }
    return separators;
  };

  this.countSeparatorsAfterCursor = function(pattern, position) {
    var separators = 0;
    while (positionIsSeparator(pattern, position + separators)) {
      separators++;
    }
    return separators;
  };

  // How long will a value be after separators have been inserted
  this.countSeparatorsInAppendedValue = function(pattern, position, value) {
    var separators = 0;
    var i = 0;
    var toAllocate = value.length;
    while(toAllocate) {
      if (positionIsSeparator(pattern, position + i)) {
        separators++;
      } else {
        toAllocate--;
      }
      i++;
    }
    return separators;
  };

  this.countSeparatorsInPattern = function(pattern) {
    var separators = 0;
    for(var i = 0; i < pattern.length; i++) {
      if (positionIsSeparator(pattern, i)) {
        separators++;
      }
    }
    return separators;
  };

  function positionIsSeparator(pattern, position) {
    return pattern[position] && pattern[position] !== "*";
  }
}

export default TwTextFormatService;
