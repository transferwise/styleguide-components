import controller from './telephone.controller.js';
import template from './telephone.html';

const TelephoneControl = {
  controller,
  template,
  bindings: {
    ngModel: '<',
    ngRequired: '<',
    ngDisabled: '<',
    ngChange: '&',
    countries: '<',
    searchPlaceholder: '@',
  },
  transclude: true,
};

export default TelephoneControl;
