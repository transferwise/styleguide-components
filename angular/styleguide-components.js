import angular from 'angular';

import TwFormComponents from './form-components/form-components.js';
import TwFormStyling from './styling/styling.js';
import TwFormValidation from './validation/validation.js';
import TwLayoutComponents from './layout-components/layout-components.js';
/*
const styleguideComponents = angular.module('tw.styleguide-components');

styleguideComponents.requires.push(TwFormValidation);
styleguideComponents.requires.push(TwFormComponents);
styleguideComponents.requires.push(TwFormStyling);
styleguideComponents.requires.push(TwLayoutComponents);

export default styleguideComponents.name;

*/
export default angular.module('tw.styleguide-components', [
  TwFormValidation,
  TwFormComponents,
  TwFormStyling,
  TwLayoutComponents
]).name;
