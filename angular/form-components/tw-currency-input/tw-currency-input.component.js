  import TwCurrencyInputController from  './tw-currency-input.controller.js';

  const TwCurrencyInput = {
    require: 'ngModel',
    controller: TwCurrencyInputController,
    transclude: {
      'addon': '?addon'
    },
    bindings: {
      ngModel: '=',
      ngChange: '&',
      ngMin: '<',
      ngMax: '<',
      ngRequired: '<',
      ngDisabled: '<',
      currency: '=',
      currencyCode: '@',
      placeholder: '@',
      size: '@',
      locale: '@'
    },
    template: ' \
      <div class="input-group" ng-class="{ \
        \'input-group-sm\': $ctrl.size === \'sm\', \
        \'input-group-lg\': $ctrl.size === \'lg\', \
        disabled: $ctrl.ngDisabled \
      }"> \
        <input \
          type="tel" \
          autocomplete="off" \
          name="amount" \
          step="any" \
          class="form-control p-r-0" \
          placeholder="{{$ctrl.placeholder}}" \
          show-decimals="$ctrl.showDecimals" \
          tw-focusable \
          tw-number-input-formatter \
          ng-change="$ctrl.changedInputValue()" \
          ng-model="$ctrl.ngModel" \
          ng-disabled="$ctrl.ngDisabled" /> \
        <span class="hello-world input-group-addon tw-currency-input-code p-l-1"> \
          <span ng-transclude="addon"></span> \
          {{ $ctrl.currency || $ctrl.currencyCode }} \
        </span> \
      </div>',
  };

  export default angular
    .module('tw.styleguide.forms.currency-input', [])
    .component('twCurrencyInput', TwCurrencyInput).name;
