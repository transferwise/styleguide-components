import angular from 'angular';

import DateService from './date/';
import CurrencyService from './currency/';
import DomService from './dom/';

export default angular.module('tw.styleguide.services', [
  DateService,
  CurrencyService,
  DomService
]).name;
