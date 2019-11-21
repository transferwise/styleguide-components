import angular from 'angular';
import AsyncTasks from './asyncTasks.service';

export default angular
  .module('tw.styleguide.services.asynctasks', [])
  .service('TwAsyncTasksService', AsyncTasks).name;
