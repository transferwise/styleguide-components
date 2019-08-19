import angular from 'angular';

import Loader from './loader';
import Process from './process';

export default angular.module('tw.styleguide.loading', [
  Loader,
  Process
]).name;
