import angular from 'angular';

import FormValidation from './tw-form-validation/tw-form-validation.directive.js';
import Validation from './tw-validation/tw-validation.directive.js';
import DynamicAsyncValidator from './tw-dynamic-async-validator/tw-dynamic-async-validator.directive.js';

export default angular.module('tw.form-validation', [
  FormValidation,
  Validation,
  DynamicAsyncValidator
]).name;
