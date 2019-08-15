import angular from 'angular';
import FormValidation from './form-validation.directive.js';
import DomService from '../../services/dom';

export default angular
  .module('tw.styleguide.validation.form', [
    DomService
  ])
  .directive('form', FormValidation).name;
