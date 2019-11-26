import angular from 'angular';

import FormValidation from './form-validation';
import ControlValidation from './control-validation';

export default angular.module('tw.styleguide.validation', [
  FormValidation,
  ControlValidation
]).name;
