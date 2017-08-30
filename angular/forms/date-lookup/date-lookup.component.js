import DateLookupController from './date-lookup.controller.js';

const DateLookup = {
  require: 'ngModel',
  controller: DateLookupController,
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

export default DateLookup;
