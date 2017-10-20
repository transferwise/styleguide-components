import angular from 'angular';
import NumberFilter from './number-format.filter';

export default angular
  .module('tw.styleguide.formatting.number', [])
  .filter('twNumberFormat', NumberFilter)
  .name;
