import angular from 'angular';
import template from './amount-currency-select.demo.html';

export default angular
  .module('tw.styleguide.demo.forms.amount-currency-select', [])
  .component('twAmountCurrencySelectDocs', {
    bindings: {
      model: '=',
      currency: '<',
      sizes: '<'
    },
    controller() {
      this.currencySelect = [
        { header: 'Popular currencies' },
        {
          value: 'eur', label: 'EUR', note: 'Euro', currency: 'EUR', searchable: 'Spain, Germany, France, Austria, Estonia'
        },
        {
          value: 'gbp', label: 'GBP', note: 'Great British Pound', currency: 'GBP', searchable: 'England, Scotland, Wales'
        },
        {
          value: 'usd', label: 'USD', note: 'United States Dollar', currency: 'USD', searchable: 'Hong Kong, Saudi Arabia'
        },
        { header: 'All currencies' },
        {
          value: 'aud', label: 'AUD', note: 'Australian Dollar', currency: 'AUD'
        }
      ];

      this.currency = 'eur';

      this.amountCurrencySelect = {
        size: 'md',
        required: false,
        disabled: false,
        customActionLabel: 'Can\'t find your currency?',
        currencyFilterPlaceholder: 'Search...',
        lockTooltipTitle: 'some title',
        lockTooltipContent: 'some content'
      };

      this.log = function (message) { console.log(message); };
    },
    template
  }).name;
