import angular from 'angular';

import TwFormValidation from './tw-form-validation/tw-form-validation.directive.js';
import TwValidation from './tw-validation/tw-validation.directive.js';
import TwDynamicAsyncValidator from './tw-dynamic-async-validator/tw-dynamic-async-validator.directive.js';

export default angular.module('tw.form-validation', [
  TwFormValidation,
  TwValidation,
  TwDynamicAsyncValidator
]).name;
