import angular from 'angular';
import DateFormat from './date-format.component';
import DateFilter from './date-format.filter';

export default angular
  .module('tw.styleguide.formatting.date', [])
  .component('twDateFormat', DateFormat)
  .filter('twDateFormat', DateFilter)
  .name;
