import angular from 'angular';
import Select from '../select';
import AmountCurrencySelect from './amount-currency-select.component.js';
import CurrencyService from '../../services/currency';
import Focusable from '../focusable';

export default angular
  .module('tw.styleguide.forms.amount-currency-select', [
    Select,
    CurrencyService,
    Focusable
  ])
  .component('twAmountCurrencySelect', AmountCurrencySelect).name;
