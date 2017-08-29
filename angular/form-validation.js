import angular from 'angular';

import FormValidation from './validation/form-validation/tw-form-validation.directive.js';
import Validation from './validation/control-validation/tw-validation.directive.js';
import DynamicAsyncValidator from './validation/async-validation/tw-async-validation.directive.js';

export default angular.module('tw.form-validation', [
  FormValidation,
  Validation,
  DynamicAsyncValidator
]).name;
