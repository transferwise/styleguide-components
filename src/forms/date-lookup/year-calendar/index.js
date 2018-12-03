import angular from 'angular';
import YearCalendar from './year-calendar.component.js';
import DateService from '../../../services/date/';

export default angular
  .module('tw.styleguide.forms.year-calendar', [
    DateService
  ])
  .component('twYearCalendar', YearCalendar).name;
