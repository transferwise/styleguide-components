import TwDynamicAsyncValidator from './tw-async-validation.directive.js';

export default angular
  .module('tw.styleguide.validation.async', [])
  .directive('twDynamicAsyncValidator', TwDynamicAsyncValidator).name;
