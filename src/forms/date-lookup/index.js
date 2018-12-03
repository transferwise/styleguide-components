import angular from 'angular';
import DateLookup from './date-lookup.component.js';
import DateService from '../../services/date/';
import DomService from '../../services/dom/';

import YearCalendar from './year-calendar/index.js';

export default angular
  .module('tw.styleguide.forms.date-lookup', [
    DateService,
    DomService,
    YearCalendar
  ])
  .component('twDateLookup', DateLookup).name;
