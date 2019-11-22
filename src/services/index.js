import angular from 'angular';

import AsyncTasksConfig from './asyncTasksConfig';
import DateService from './date';
import CurrencyService from './currency';
import LocaleService from './locale';
import DomService from './dom';
import RequirementsService from './requirements';

export default angular.module('tw.styleguide.services', [
  AsyncTasksConfig,
  DateService,
  CurrencyService,
  LocaleService,
  DomService,
  RequirementsService
]).name;
