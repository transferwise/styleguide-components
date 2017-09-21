import angular from 'angular';
import DateLookup from './date-lookup.component.js';
import DateService from '../../services/date/';
import DomService from '../../services/dom/';

export default angular
  .module('tw.styleguide.forms.date-lookup', [
    DateService,
    DomService
  ])
  .component('twDateLookup', DateLookup).name;
