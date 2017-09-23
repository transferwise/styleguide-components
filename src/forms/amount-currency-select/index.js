import angular from 'angular';
import Select from '../select/';
import AmountCurrencySelect from './amount-currency-select.component.js';
import CurrencyService from '../../services/currency/';


export default angular
  .module('tw.styleguide.forms.amount-currency-select', [
    Select,
    CurrencyService
  ])
  .component('twAmountCurrencySelect', AmountCurrencySelect).name;
