import angular from 'angular';
import LocaleService from './locale.service.js';

export default angular
  .module('tw.styleguide.services.locale', [])
  .service('TwLocaleService', LocaleService).name;
