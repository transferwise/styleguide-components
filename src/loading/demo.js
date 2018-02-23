import angular from 'angular';

import Process from './process/process.demo.js';
import Loader from './loader/loader.demo.js';

export default angular.module('tw.styleguide.demo.loading', [
  Process,
  Loader
]).name;
