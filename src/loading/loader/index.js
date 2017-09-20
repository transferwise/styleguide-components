import angular from 'angular';
import Loader from './loader.component.js';

export default angular
  .module('tw.styleguide.loading.loader', [])
  .component('twLoader', Loader).name;
