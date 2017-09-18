import ControlValidation from './control-validation.directive.js';

export default angular
  .module('tw.stylguide.validation.control', [])
  .directive('twValidation', ControlValidation).name;
