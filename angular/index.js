import angular from 'angular';

import FormComponents from './form-components/';
import FormStyling from './styling/';
import FormValidation from './validation/';
import LayoutComponents from './layout-components/';

export default angular.module('tw.styleguide-components', [
  FormValidation,
  FormComponents,
  FormStyling,
  LayoutComponents
]).name;
