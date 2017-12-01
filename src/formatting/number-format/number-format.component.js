import template from './number-format.html';

const NumberDisplay = {
  template,
  bindings: {
    amount: '<',
    precision: '<',
    locale: '<'
  }
};

export default NumberDisplay;
