import angular from 'angular';
import DateService from './date.service.js';

export default angular
  .module('tw.styleguide.services.date', [])
  .service('TwDateService', DateService).name;
