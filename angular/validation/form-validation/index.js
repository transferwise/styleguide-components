import TwFormValidation from './tw-form-validation.directive.js';

export default angular
  .module('tw.styleguide.validation.form', [])
  .directive('form', TwFormValidation).name;
