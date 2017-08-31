import angular from 'angular';

import DateService from './date/';
import CurrencyService from './currency/';

export default angular.module('tw.styleguide.services', [
  DateService,
  CurrencyService
]).name;
