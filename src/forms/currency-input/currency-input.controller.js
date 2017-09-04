import CurrencyService from '../../services/currency/';

class CurrencyInputController {
  constructor($element, $scope, $timeout, TwCurrencyService) {
    const $ngModel = $element.controller('ngModel');

    this.CurrencyService = TwCurrencyService;
    this.$timeout = $timeout;
    this.showDecimals = true;

    $scope.$watch('$ctrl.ngModel', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        $ngModel.$setDirty();
      }
    });
    $scope.$watch('$ctrl.currency', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.showDecimals = this.CurrencyService.getDecimals(newValue) > 0;
      }
    });

    $element.find('input').on('blur', () => {
      $ngModel.$setTouched();
      $element.triggerHandler('blur');
    });

    // eslint-disable-next-line no-console
    if ($element[0].getAttribute('currency-code') && console && console.log) {
      // eslint-disable-next-line no-console
      console.log('currency code is deprecated in twCurrencyInput, please use currency.');
    }

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
  }

  changedInputValue() {
    if (this.ngChange) {
      // $timeout is needed to get the last ngModel value.
      // See: https://github.com/angular/angular.js/issues/4558
      this.$timeout(this.ngChange);
    }
  }
}

function isNumber(value) {
  return !isNaN(parseFloat(value)); // eslint-disable-line no-restricted-globals
}

CurrencyInputController.$inject = [
  '$element',
  '$scope',
  '$timeout',
  CurrencyService
];

export default CurrencyInputController;
