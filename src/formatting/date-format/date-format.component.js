import template from './date-format.html';

const DateDisplay = {
  template,
  bindings: {
    date: '<',
    locale: '<',
    format: '<'
  }
};

export default DateDisplay;
