import angular from 'angular';
import CurrencyFilter from './currency-format.filter';

export default angular
  .module('tw.styleguide.formatting.currency', [])
  .filter('twCurrencyFormat', CurrencyFilter)
  .name;
