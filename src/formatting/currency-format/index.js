import angular from 'angular';
import CurrencyComponent from './currency-format.component';
import CurrencyFilter from './currency-format.filter';
import CurrencyService from '../../services/currency/';
import NumberFormat from '../number-format/';

export default angular
  .module('tw.styleguide.formatting.currency', [CurrencyService, NumberFormat])
  .component('twCurrencyFormat', CurrencyComponent)
  .filter('twCurrencyFormat', CurrencyFilter)
  .name;
