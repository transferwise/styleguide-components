  import TwCurrencyData from '../../services/tw-currency-data/tw-currency-data.service.js';

  function TwCurrencyInputController($element, $scope, $timeout, TwCurrencyData) {
    var $ctrl = this;
    var $ngModel = $element.controller('ngModel');

    $ctrl.showDecimals = true;

    $scope.$watch('$ctrl.ngModel', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        $ngModel.$setDirty();
      }
    });
    $scope.$watch('$ctrl.currency', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        $ctrl.showDecimals = TwCurrencyData.getDecimals(newValue) > 0;
      }
    });

    $element.find('input').on('blur', function() {
      $ngModel.$setTouched();
      $element.triggerHandler('blur');
    });

    if ($ctrl.currencyCode && console && console.log) {
      console.log('currency code is deprecated in twCurrencyInput, please use currency.');
    }

    $ngModel.$validators.min = function(modelValue, viewValue) {
      if (typeof $ctrl.ngMin === 'undefined' || $ctrl.ngMin === null || !isNumber(viewValue)) {
        return true;
      }

      return viewValue >= $ctrl.ngMin;
    };

    $ngModel.$validators.max = function(modelValue, viewValue) {
      if (typeof $ctrl.ngMax === 'undefined' || $ctrl.ngMax === null || !isNumber(viewValue)) {
        return true;
      }

      return viewValue <= $ctrl.ngMax;
    };

    $ctrl.changedInputValue = function() {
      if ($ctrl.ngChange) {
        // $timeout is needed to get the last ngModel value.
        // See: https://github.com/angular/angular.js/issues/4558
        $timeout($ctrl.ngChange);
      }
    };

    function isNumber(value) {
      return !isNaN(parseFloat(value));
    }
  }

  TwCurrencyInputController.$inject = [
    '$element',
    '$scope',
    '$timeout',
    'TwCurrencyData'
  ];

  export default TwCurrencyInputController;
