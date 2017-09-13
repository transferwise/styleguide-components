function TestUtils() {
  this.compileTemplate = function($scope, $compile, template) {
    var element = angular.element(template);
    var compiledElement = $compile(element)($scope);

    $scope.$digest();
    return compiledElement;
  };

  this.typeCharacter= function(input, character) {
    var keyCode = character.charCodeAt(0);
    var selectionStart = input.selectionStart,
      selectionEnd = input.selectionEnd;
    var originalValue = input.value || '';

    input.dispatchEvent(this.getKeyEvent('keydown', keyCode));

    // Following works for range selections and nor range
    input.value =
      originalValue.substring(0, selectionStart) +
      character +
      originalValue.substring(selectionEnd, originalValue.length);

    input.setSelectionRange(selectionStart + 1, selectionStart + 1);

    input.dispatchEvent(this.getKeyEvent('keypress', keyCode));
    input.dispatchEvent(this.getKeyEvent('keyup', keyCode));
  };

  this.typeKeyCode = function(input, keyCode) {
    var keydown = this.getKeyEvent('keydown', keyCode);
    var keypress = this.getKeyEvent('keypress', keyCode);
    var keyup = this.getKeyEvent('keyup', keyCode);

    input.dispatchEvent(keydown);
    input.dispatchEvent(keypress);
    input.dispatchEvent(keyup);
    angular.element(input).trigger('input');
  };

  this.getKeyEvent = function(eventType, keyCode) {
    var keyboardEvent = new Event(eventType);
    keyboardEvent.which = String.fromCharCode(keyCode);
    keyboardEvent.keyCode = keyCode;
    keyboardEvent.charCode = keyCode;
    return keyboardEvent;
  };

  this.keys = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    return: 13,
    tab: 9
  };
}
