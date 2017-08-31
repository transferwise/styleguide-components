
function TwUndoStackFactory() {
  this.new = function() {
    return new UndoStack();
  };
}

/**
 * Browsers seem to implement undo as an async function, it wasn't
 * possible to get adequate behaviour using the default event, so we build
 * our own undo stack.
 */
function UndoStack() {
  var pointer = 0;
  var stack = [];

  this.reset = function(value) {
    stack = [value];
    pointer = 0;
  };

  this.add = function(value) {
    if (stack.length - 1 > pointer) {
      stack = stack.slice(0, pointer + 1);
    }
    if (stack[pointer] !== value) {
      stack.push(value);
      pointer++;
    }
  };

  this.undo = function() {
    if (pointer >= 0 &&
      typeof stack[pointer - 1] !== "undefined") {
      pointer--;
    }
    return stack[pointer];
  };

  this.redo = function() {
    if (pointer < stack.length &&
      typeof stack[pointer + 1] !== "undefined") {
      pointer++;
    }
    return stack[pointer];
  };
}

export default TwUndoStackFactory;
