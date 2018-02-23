import angular from 'angular';
import template from './demo.html';

import Process from './process/process.demo.js';
import Loader from './loader/loader.demo.js';

export default angular.module('tw.styleguide.demo.loading', [
  Process,
  Loader
]).component('loadingComponents', { template }).name;
