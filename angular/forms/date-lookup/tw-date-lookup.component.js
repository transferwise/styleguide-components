import TwDateLookupController from './tw-date-lookup.controller.js';

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
  template: require('./date-lookup.html')
};

export default TwDateLookup;
