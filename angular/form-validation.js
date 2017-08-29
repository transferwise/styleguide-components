import angular from 'angular';

import FormValidation         from './validation/form-validation/';
import Validation             from './validation/control-validation/';
import DynamicAsyncValidator  from './validation/async-validation/';

export default angular.module('tw.form-validation', [
  FormValidation,
  Validation,
  DynamicAsyncValidator
]).name;
