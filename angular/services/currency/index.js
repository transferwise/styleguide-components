import CurrencyService from './tw-currency.service.js';

export default angular
  .module('tw.styleguide.services.currency', [])
  .service('TwCurrencyService', CurrencyService).name;
