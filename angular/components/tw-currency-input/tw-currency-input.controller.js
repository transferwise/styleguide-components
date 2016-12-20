(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.controller('TwCurrencyInputController', TwCurrencyInputController);

	TwCurrencyInputController.$inject = [
		'$element',
		'$scope',
		'$timeout',
		'TwCurrencyData'
	];

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
		$scope.$watch('$ctrl.locked', function(newValue, oldValue) {
			$ctrl.showLock = (typeof $ctrl.locked !== 'undefined');
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

		$ctrl.lockClick = function() {
			if ($ctrl.onLockedChange) {
				$timeout($ctrl.onLockedChange);
			}
		};

		function isNumber(value) {
			return !isNaN(parseFloat(value));
		}
	}

})(window.angular);
