import angular from 'angular';

import Loader from './loader/tw-loader.component.js';
import Process from './process/tw-process.component.js';

export default angular.module('tw.styleguide.loading', [
  Loader,
  Process
]).name;
