import TwDynamicFormControlController from './tw-dynamic-form-control.controller.js';

const TwDynamicFormControl = {
  require: 'ngModel',
  transclude: true,
  controller: TwDynamicFormControlController,
  bindings: {
    type: "@",
    name: "@",
    id: "@",
    label: "@",
    placeholder: "@",
    helpText: "@",
    step: "@",
    locale: "@",
    uploadAccept: "@",
    uploadIcon: "@",
    uploadTooLargeMessage: "@",
    options: "<",
    ngModel: "=",
    ngChange: "&",
    ngRequired: "<",
    ngDisabled: "<",
    // ngMinlength/ngMaxlength have default behaviour that cannot be overridden
    ngMinlength: "<twMinlength",
    ngMaxlength: "<twMaxlength",
    ngMin: "<",
    ngMax: "<",
    ngPattern: "<",
    uploadOptions: "<",
    textFormat: "<"
  },
  template:
  "<div ng-switch='$ctrl.type'> \
    <input ng-switch-when='text'  \
      name='{{$ctrl.name}}'  \
      type='text' \
      class='form-control' \
      placeholder='{{$ctrl.placeholder}}' \
      ng-model='$ctrl.ngModel' \
      ng-model-options='{ allowInvalid: true }' \
      ng-required='$ctrl.ngRequired' \
      ng-disabled='$ctrl.ngDisabled' \
      ng-pattern='$ctrl.ngPattern' \
      ng-change='$ctrl.change()' \
      ng-focus='$ctrl.focus()' \
      ng-blur='$ctrl.blur()' \
      ng-minlength='$ctrl.ngMinlength' \
      ng-maxlength='$ctrl.ngMaxlength' \
      tw-text-format='{{$ctrl.textFormat}}' />  \
    <input ng-switch-when='password'  \
      name='{{$ctrl.name}}'  \
      type='password' \
      class='form-control' \
      placeholder='{{$ctrl.placeholder}}' \
      ng-model='$ctrl.ngModel' \
      ng-model-options='{ allowInvalid: true }' \
      ng-required='$ctrl.ngRequired' \
      ng-disabled='$ctrl.ngDisabled' \
      ng-change='$ctrl.change()' \
      ng-focus='$ctrl.focus()' \
      ng-blur='$ctrl.blur()' \
      ng-minlength='$ctrl.ngMinlength' \
      ng-maxlength='$ctrl.ngMaxlength' />  \
    <input ng-switch-when='number'  \
      name='{{$ctrl.name}}'  \
      type='number' \
      step='{{$ctrl.step}}' \
      class='form-control' \
      placeholder='{{$ctrl.placeholder}}' \
      ng-model='$ctrl.ngModel' \
      ng-model-options='{ allowInvalid: true }' \
      ng-required='$ctrl.ngRequired' \
      ng-disabled='$ctrl.ngDisabled' \
      ng-change='$ctrl.change()' \
      ng-focus='$ctrl.focus()' \
      ng-blur='$ctrl.blur()' \
      ng-min='$ctrl.ngMin' \
      ng-max='$ctrl.ngMax' />  \
    <div ng-switch-when='radio' \
      class='radio' \
      ng-class='{disabled: $ctrl.ngDisabled}' \
      ng-repeat='option in $ctrl.options'> \
      <label> \
        <tw-radio \
          name='{{$ctrl.name}}' \
          ng-value='option.value' \
          ng-model='$ctrl.ngModel' \
          ng-required='$ctrl.ngRequired' \
          ng-disabled='$ctrl.ngDisabled' \
          ng-change='$ctrl.change()' \
          ng-click='$ctrl.change()' \
          ng-focus='$ctrl.focus()' \
          ng-blur='$ctrl.blur()' /> \
        {{option.label}} \
      </label> \
    </div> \
    <div ng-switch-when='checkbox' \
      class='checkbox' \
      ng-class='{disabled: $ctrl.ngDisabled}'> \
      <label> \
        <tw-checkbox \
          name='{{$ctrl.name}}' \
          ng-model='$ctrl.ngModel' \
          ng-required='$ctrl.ngRequired' \
          ng-disabled='$ctrl.ngDisabled' \
          ng-change='$ctrl.change()' \
          ng-click='$ctrl.change()' \
          ng-focus='$ctrl.focus()' \
          ng-blur='$ctrl.blur()' /> \
        {{$ctrl.placeholder}} \
      </label> \
    </div> \
    <div ng-switch-when='select'> \
      <tw-select \
        name='{{$ctrl.name}}' \
        options='$ctrl.options' \
        placeholder='{{$ctrl.placeholder}}' \
        ng-model='$ctrl.ngModel' \
        ng-required='$ctrl.ngRequired' \
        ng-disabled='$ctrl.ngDisabled' \
        ng-change='$ctrl.change()' \
        ng-focus='$ctrl.focus()' \
        ng-blur='$ctrl.blur()' /> \
    </div> \
    <div ng-switch-when='upload'> \
      <tw-upload \
        name='{{$ctrl.name}}' \
        label='{{$ctrl.label}}' \
        icon='{{$ctrl.uploadIcon}}' \
        placeholder='{{$ctrl.placeholder}}' \
        accept='{{$ctrl.uploadAccept}}' \
        complete-text='{{$ctrl.label}}' \
        button-text='{{$ctrl.uploadOptions.buttonText}}' \
        cancel-text='{{$ctrl.uploadOptions.cancelText}}' \
        too-large-message='{{$ctrl.uploadTooLargeMessage}}' \
        max-size='$ctrl.ngMax' \
        ng-model='$ctrl.ngModel' \
        ng-required='$ctrl.ngRequired' \
        ng-disabled='$ctrl.ngDisabled' \
        ng-change='$ctrl.change()' \
        ng-focus='$ctrl.focus()' \
        ng-blur='$ctrl.blur()' /> \
    </div> \
    <div ng-switch-when='date'> \
      <tw-date \
        name='{{$ctrl.name}}' \
        locale='{{$ctrl.locale}}' \
        ng-min='$ctrl.ngMin' \
        ng-max='$ctrl.ngMax' \
        ng-model='$ctrl.ngModel' \
        ng-required='$ctrl.ngRequired' \
        ng-disabled='$ctrl.ngDisabled' \
        ng-change='$ctrl.change()' \
        ng-focus='$ctrl.focus()' \
        ng-blur='$ctrl.blur()' /> \
    </div> \
    <ng-transclude class='error-messages'></ng-transclude> \
  </div>"
};

export default TwDynamicFormControl;
