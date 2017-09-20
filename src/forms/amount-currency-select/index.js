import angular from 'angular';
import Select from '../select/';
import AmountCurrencySelect from './amount-currency-select.component.js';

export default angular
  .module('tw.styleguide.forms.amount-currency-select', [
    Select
  ])
  .component('twAmountCurrencySelect', AmountCurrencySelect).name;
