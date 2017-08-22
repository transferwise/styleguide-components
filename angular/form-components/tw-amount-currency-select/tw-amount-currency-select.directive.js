(function(angular) {

  const TwAmountCurrencySelect = {
    require: 'ngModel',
    controller: 'TwAmountCurrencySelectController',
    transclude: {
      'addon': '?addon'
    },
    bindings: {
      ngModel: '=',
      ngMin: '<',
      ngMax: '<',
      ngRequired: '<',
      ngDisabled: '<',
      ngChange: '&',

      /* Begin deprecated */
      amountReadOnly: '<',
      onAmountChange: '&',
      /* End deprecated */

      currency: '=',
      currencies: '<',
      onCurrencyChange: '&',
      currencyFilterPlaceholder: '@',

      customActionLabel: '<',
      onCustomAction: '&',

      placeholder: '@',

      size: '@',
      locale: '@'
    },
    template: '\
      <div class="input-group" ng-class="{ \
        \'input-group-sm\': $ctrl.size === \'sm\', \
        \'input-group-lg\': $ctrl.size === \'lg\', \
        disabled: $ctrl.ngDisabled \
      }">  \
        <input \
          type="tel"  \
          autocomplete="off"  \
          name="amount"  \
          step="any"  \
          class="form-control"  \
          placeholder="{{ $ctrl.placeholder }}" \
          tw-focusable  \
          show-decimals="$ctrl.showDecimals" \
          tw-number-input-formatter  \
          ng-change="$ctrl.changedAmount()"  \
          ng-model="$ctrl.ngModel" \
          ng-disabled="$ctrl.ngDisabled" /> \
        <span class="input-group-addon" \
          ng-class="{\'input-lg\': $ctrl.size === \'lg\'}" ng-transclude="addon"></span> \
        <span class="input-group-btn">  \
          <tw-select \
            ng-model="$ctrl.currency" \
            ng-required="true" \
            size="{{ $ctrl.size }}" \
            inverse="true" \
            dropdown-right="xs" \
            dropdown-width="lg" \
            hide-currency="xs" \
            hide-note="true" \
            hide-secondary="true" \
            options="$ctrl.currencies" \
            filter="{{ $ctrl.currencyFilterPlaceholder }}" \
            ng-change="$ctrl.changedCurrency()"> \
              <a href="" ng-if="!!$ctrl.customActionLabel" ng-click="$ctrl.onCustomAction()"> \
                {{ $ctrl.customActionLabel }} \
              </a> \
          </tw-select> \
        </span> \
      </div>',
  };

  angular
    .module('tw.form-components')
    .component('twAmountCurrencySelect', TwAmountCurrencySelect);

})(window.angular);
