import angular from 'angular';
import CurrencyService from './currency.service.js';

export default angular
  .module('tw.styleguide.services.currency', [])
  .service('TwCurrencyService', CurrencyService).name;
