import TwCurrencyService from '../../services/currency/';

class AmountCurrencySelectController {
  constructor($element, $scope, $timeout, TwCurrencyService) {
    const $ngModel = $element.controller('ngModel');

    this.$timeout = $timeout;
    this.showDecimals = true;
    this.CurrencyService = TwCurrencyService;

    $scope.$watch('$ctrl.ngModel', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        $ngModel.$setDirty();
      }
    });

    $scope.$watch('$ctrl.currency', (newValue, oldValue) => {
      if (newValue && newValue !== oldValue) {
        this.showDecimals = this.CurrencyService.getDecimals(newValue) > 0;
      }
    });

    $element.find('input').on('blur', () => {
      $ngModel.$setTouched();
      $element.triggerHandler('blur');
    });

    $ngModel.$validators.min = (modelValue, viewValue) => {
      if (typeof this.ngMin === 'undefined' || this.ngMin === null || !isNumber(viewValue)) {
        return true;
      }

      return viewValue >= this.ngMin;
    };

    $ngModel.$validators.max = (modelValue, viewValue) => {
      if (typeof this.ngMax === 'undefined' || this.ngMax === null || !isNumber(viewValue)) {
        return true;
      }

      return viewValue <= this.ngMax;
    };
    
    if ($element[0].getAttribute('on-amount-change') && console && console.log) {
      console.log('onAmountChange is deprecated in twAmountCurrencySelect, please use ngChange.');
    }
  }

  changedAmount() {
    if (this.ngChange) {
      // $timeout is needed to get the last ngModel value.
      // See: https://github.com/angular/angular.js/issues/4558
      this.$timeout(this.ngChange);
    }
    /* Deprecated */
    if (this.onAmountChange) {
      // $timeout is needed to get the last ngModel value.
      // See: https://github.com/angular/angular.js/issues/4558
      this.$timeout(this.onAmountChange);
    }
  }

  changedCurrency() {
    if (this.onCurrencyChange) {
      this.$timeout(this.onCurrencyChange);
    }
  }

  customAction() {
    if (this.onCustomAction) {
      this.onCustomAction();
    }
  }
}

function isNumber(value) {
  return !isNaN(parseFloat(value));
}

AmountCurrencySelectController.$inject = [
  '$element',
  '$scope',
  '$timeout',
  'TwCurrencyService'
];

export default AmountCurrencySelectController;
