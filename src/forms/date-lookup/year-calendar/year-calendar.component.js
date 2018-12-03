import controller from './year-calendar.controller.js';
import template from './year-calendar.html';

const YearCalendar = {
  controller,
  template,
  bindings: {
    startYear: '<',
    year: '<selectedYear',
    minYear: '<',
    maxYear: '<',
    onChange: '&'
  }
};

export default YearCalendar;
