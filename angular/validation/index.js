import angular from 'angular';

import FormValidation from './form-validation/tw-form-validation.directive.js';
import Validation from './control-validation/tw-validation.directive.js';
import DynamicAsyncValidator from './async-validation/tw-async-validation.directive.js';

export default angular.module('tw.styleguide.validation', [
  FormValidation,
  Validation,
  DynamicAsyncValidator
]).name;
