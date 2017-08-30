import TwDateLookupController from './tw-date-lookup.controller.js';
import template from './date-lookup.html';

const TwDateLookup = {
  require: 'ngModel',
  controller: TwDateLookupController,
  bindings: {
    ngModel: '=',
    ngChange: '&',
    ngMin: '=',
    ngMax: '=',
    ngRequired: '=',
    ngDisabled: '=',
    placeholder: '@',
    size: '@',
    locale: '@',
    label: '@',
    shortDate: '<'
  },
  template
};

export default TwDateLookup;
