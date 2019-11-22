import angular from 'angular';
import AsyncTasksConfig from './asyncTasksConfig.service';

export default angular
  .module('tw.styleguide.services.async-tasks-config', [])
  .service('AsyncTasksConfig', AsyncTasksConfig).name;
