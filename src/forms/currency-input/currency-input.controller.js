import TwCurrencyService from '../../services/currency/';

class TwCurrencyInputController {
  constructor($element, $scope, $timeout, TwCurrencyService) {
    var $ngModel = $element.controller('ngModel');

    this.$timeout = $timeout;
    this.showDecimals = true;

    $scope.$watch('$ctrl.ngModel', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        $ngModel.$setDirty();
      }
    });
    $scope.$watch('$ctrl.currency', (newValue, oldValue) => {
      if (newValue !== oldValue) {
        this.showDecimals = TwCurrencyService.getDecimals(newValue) > 0;
      }
    });

    $element.find('input').on('blur', () => {
      $ngModel.$setTouched();
      $element.triggerHandler('blur');
    });

    if ($element[0].getAttribute('currency-code') && console && console.log) {
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
  return !isNaN(parseFloat(value));
}

TwCurrencyInputController.$inject = [
  '$element',
  '$scope',
  '$timeout',
  'TwCurrencyService'
];

export default TwCurrencyInputController;
