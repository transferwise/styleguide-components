import angular from 'angular';

function TwUndoStackFactory() {
  this.new = () => new UndoStack();
}

/**
 * Browsers seem to implement undo as an async function, it wasn't
 * possible to get adequate behaviour using the default event, so we build
 * our own undo stack.
 */
function UndoStack() {
  let pointer = 0;
  let stack = [];

  this.reset = (value) => {
    stack = [value];
    pointer = 0;
  };

  this.add = (value) => {
    if (stack.length - 1 > pointer) {
      stack = stack.slice(0, pointer + 1);
    }
    if (stack[pointer] !== value) {
      stack.push(value);
      pointer++;
    }
  };

  this.undo = () => {
    if (pointer >= 0 &&
      typeof stack[pointer - 1] !== 'undefined') {
      pointer--;
    }
    return stack[pointer];
  };

  this.redo = () => {
    if (pointer < stack.length &&
      typeof stack[pointer + 1] !== 'undefined') {
      pointer++;
    }
    return stack[pointer];
  };
}

export default angular
  .module('tw.styleguide.formatting.text-format.undo-stack', [])
  .service('TwUndoStackFactory', TwUndoStackFactory).name;
