import angular from 'angular';
import CurrencyInput from './currency-input.component.js';
import CurrencyService from '../../services/currency';
import Focusable from '../focusable';

export default angular
  .module('tw.styleguide.forms.currency-input', [
    CurrencyService,
    Focusable
  ])
  .component('twCurrencyInput', CurrencyInput).name;
