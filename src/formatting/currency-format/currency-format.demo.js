import angular from 'angular';
import template from './currency-format.demo.html';

export default angular
  .module('tw.styleguide.demo.formatting.currency-format', [])
  .component('twCurrencyFormatDocs', {
    bindings: {
      locales: '<'
    },
    controller() {
      this.number = 123456.78;
      this.locale = 'en-GB';
      this.currency = 'GBP';
      this.currencies = [{
        value: 'GBP',
        label: 'Great British Pound',
        note: '2 decimals'
      }, {
        value: 'JPY',
        label: 'Japanese Yen',
        note: '0 decimals'
      }, {
        value: 'JOD',
        label: 'Jordanian Dinar',
        note: '3 decimals'
      }];
    },
    template
  }).name;
