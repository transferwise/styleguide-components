import angular from 'angular';
import FormValidation from './form-validation.directive.js';

export default angular
  .module('tw.styleguide.validation.form', [])
  .directive('form', FormValidation).name;
