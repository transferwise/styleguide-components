import angular from 'angular';
import CurrencyInput from './currency-input.component.js';
import CurrencyService from '../../services/currency';

export default angular
  .module('tw.styleguide.forms.currency-input', [
    CurrencyService
  ])
  .component('twCurrencyInput', CurrencyInput).name;
