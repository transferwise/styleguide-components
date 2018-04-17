import controller from './select.controller.js';
import template from './select.html';

const Select = {
  controller,
  template,
  require: 'ngModel',
  transclude: true,
  bindings: {
    ngModel: '=',
    ngRequired: '<',
    ngDisabled: '<',
    options: '<',
    name: '@',
    placeholder: '@',
    filter: '@',
    size: '@',
    dropdownRight: '@',
    dropdownUp: '@',
    dropdownWidth: '@',
    inverse: '<',
    dropdownShowNative: '<',
    hideNote: '@',
    hideSecondary: '@',
    hideIcon: '@',
    hideCurrency: '@',
    hideCircle: '@',
    hideLabel: '@',
  },
};

/*
// TODO may be better for accessibility to have hidden select?
<select name='{{$ctrl.name}}' class='sr-only tw-select-hidden' \
  ng-model='$ctrl.ngModel' \
  ng-options='option.value as option.label for option in $ctrl.options' \
  ng-disabled='$ctrl.ngDisabled' \
  ng-required='$ctrl.ngRequired'> \
</select>"
*/

export default Select;
