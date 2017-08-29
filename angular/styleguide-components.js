import angular from 'angular';

import TwFormComponents from './form-components/form-components.js';
import TwFormStyling from './styling/styling.js';
import TwFormValidation from './validation/validation.js';
import TwLayoutComponents from './layout-components/layout-components.js';

export default angular.module('tw.styleguide-components', [
  TwFormValidation,
  TwFormComponents,
  TwFormStyling,
  TwLayoutComponents
]).name;
