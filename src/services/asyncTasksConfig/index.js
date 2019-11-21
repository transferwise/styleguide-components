import angular from 'angular';
import AsyncTasksConfig from './asyncTasksConfig.service';

export default angular
  .module('tw.styleguide.services.asynctasksconfig', [])
  .service('AsyncTasksConfig', AsyncTasksConfig).name;
