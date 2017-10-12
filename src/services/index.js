import angular from 'angular';

import DateService from './date/';
import CurrencyService from './currency/';
import DomService from './dom/';
import RequirementsService from './requirements/';

export default angular.module('tw.styleguide.services', [
  DateService,
  CurrencyService,
  DomService,
  RequirementsService
]).name;
