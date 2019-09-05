import angular from 'angular';
import DateFormat from './date-format.component';
import DateFilter from './date-format.filter';
import DateService from '../../services/date';

export default angular
  .module('tw.styleguide.formatting.date', [
    DateService
  ])
  .component('twDateFormat', DateFormat)
  .filter('twDateFormat', DateFilter)
  .name;
