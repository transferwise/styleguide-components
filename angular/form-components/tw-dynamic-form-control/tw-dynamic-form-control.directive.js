(function(angular) {

  const TwDynamicFormControl = {
    require: 'ngModel',
    transclude: true,
    controller: "TwDynamicFormControlController",
    scope: {
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

  angular
    .module('tw.form-components')
    .directive('twDynamicFormControl', TwDynamicFormControl);

  angular
    .module('tw.form-components')
    .controller('TwDynamicFormControlController', TwDynamicFormControlController);

  TwDynamicFormControlController.$inject = ['$element', '$scope'];

  function TwDynamicFormControlController($element, $scope) {
    var $ctrl = this;
    var ngModelController = $element.controller('ngModel');
    $ctrl.change = function() {
      ngModelController.$setDirty();
      if ($ctrl.ngChange) {
        $ctrl.ngChange();
      }
    };
    $ctrl.focus = function() {
      $element.triggerHandler('focus');
    };
    $ctrl.blur = function() {
      ngModelController.$setTouched();
      $element.triggerHandler('blur');
    };

    ngModelController.$validators.minlength = function(modelValue, viewValue) {
      var value = modelValue || viewValue;
      if ($ctrl.type !== 'text' || !$ctrl.ngMinlength) {
        return true;
      }
      return !value || value.length >= $ctrl.ngMinlength;
    };
    ngModelController.$validators.maxlength = function(modelValue, viewValue) {
      var value = modelValue || viewValue;
      if ($ctrl.type !== 'text' || !$ctrl.ngMaxlength) {
        return true;
      }
      return !value || value.length <= $ctrl.ngMaxlength;
    };

    // Min and max do not work on custom elements, add manual validators
    ngModelController.$validators.min = function(modelValue, viewValue) {
      var value = modelValue || viewValue;
      if (typeof $ctrl.ngMin === "undefined") {
        return true;
      }
      if (typeof value === "number" &&
        typeof $ctrl.ngMin === "number" &&
        value < $ctrl.ngMin) {
        return false;
      }
      if (value &&
        value.getUTCDate &&
        $ctrl.ngMin.getUTCDate &&
        value < $ctrl.ngMin) {
        return false;
      }
      return true;
    };
    ngModelController.$validators.max = function(modelValue, viewValue) {
      var value = modelValue || viewValue;
      if (typeof $ctrl.ngMax === "undefined") {
        return true;
      }
      if (typeof value === "number" &&
        typeof $ctrl.ngMax === "number" &&
        value > $ctrl.ngMax) {
        return false;
      }
      if (value &&
        viewValue.getUTCDate &&
        $ctrl.ngMax.getUTCDate &&
        value > $ctrl.ngMax) {
        return false;
      }
      return true;
    };
  }
})(window.angular);
