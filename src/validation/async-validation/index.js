import angular from 'angular';
import AsyncValidation from './async-validation.directive.js';

export default angular
  .module('tw.styleguide.validation.async', [])
  .directive('twAsyncValidation', AsyncValidation).name;
