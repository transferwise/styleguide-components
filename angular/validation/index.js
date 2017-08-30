import angular from 'angular';

import FormValidation from './form-validation/';
import ControlValidation from './control-validation/';
import AsyncValidation from './async-validation/';

export default angular.module('tw.styleguide.validation', [
  FormValidation,
  ControlValidation,
  AsyncValidation

]).name;
