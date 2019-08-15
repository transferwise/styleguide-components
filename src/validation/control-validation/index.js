import angular from 'angular';
import ControlValidation from './control-validation.directive.js';
import DomService from '../../services/dom';

export default angular
  .module('tw.stylguide.validation.control', [
    DomService
  ])
  .directive('twValidation', ControlValidation).name;
