import TwRadioController from './tw-radio.controller.js';

const TwRadio = {
  require: 'ngModel',
  controller: TwRadioController,
  bindings: {
    name: "@",
    value: "@",
    ngModel: '=',
    ngValue: '<',
    ngRequired: '<',
    ngDisabled: '<',
    ngChange: '&'
  },
  template: " \
    <input type='radio' class='sr-only' \
      name='{{$ctrl.name}}' \
      ng-value='$ctrl.ngValue || $ctrl.value' \
      ng-model='$ctrl.ngModel' \
      ng-disabled='$ctrl.ngDisabled' \
      ng-change='$ctrl.hiddenInputChange()' \
      tabindex='-1' /> \
    <button type='button' class='tw-radio-button' tw-focusable \
      ng-click='$ctrl.buttonClick($event)' \
      ng-focus='$ctrl.buttonFocus()' \
      ng-blur='$ctrl.buttonBlur()' \
      ng-disabled='$ctrl.ngDisabled' \
      ng-class='{checked: $ctrl.checked}' \
      aria-pressed='{{$ctrl.checked}}'> \
      <span class='tw-radio-check'></span> \
    </button>"
};

export default TwRadio;
