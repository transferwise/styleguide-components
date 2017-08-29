import angular from 'angular';

import FormComponents from './form-components/form-components.js';
import FormStyling from './styling/styling.js';
import FormValidation from './validation/validation.js';
import LayoutComponents from './layout-components/layout-components.js';

export default angular.module('tw.styleguide-components', [
  FormValidation,
  FormComponents,
  FormStyling,
  LayoutComponents
]).name;
