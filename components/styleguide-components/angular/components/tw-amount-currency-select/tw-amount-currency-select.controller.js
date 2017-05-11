(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.controller('TwAmountCurrencySelectController', TwAmountCurrencySelectController);

	TwAmountCurrencySelectController.$inject = [
		'$element',
		'$scope',
		'$timeout',
		'TwCurrencyData'
	];

	function TwAmountCurrencySelectController($element, $scope, $timeout, TwCurrencyData) {
		var $ctrl = this;
		var $ngModel = $element.controller('ngModel');

		$ctrl.showDecimals = true;

		$scope.$watch('$ctrl.ngModel', function(newValue, oldValue) {
			if (newValue !== oldValue) {
				$ngModel.$setDirty();
			}
		});
		
		$scope.$watch('$ctrl.currency', function(newValue, oldValue) {
			if (newValue && newValue !== oldValue) {
				$ctrl.showDecimals = TwCurrencyData.getDecimals(newValue) > 0;
			}
		});

		$element.find('input').on('blur', function() {
			$ngModel.$setTouched();
			$element.triggerHandler('blur');
		});

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

		$ctrl.changedAmount = function() {
			if ($ctrl.ngChange) {
				// $timeout is needed to get the last ngModel value.
				// See: https://github.com/angular/angular.js/issues/4558
				$timeout($ctrl.ngChange);
			}
			/* Deprecated */
			if ($ctrl.onAmountChange) {
				// $timeout is needed to get the last ngModel value.
				// See: https://github.com/angular/angular.js/issues/4558
				if (console & console.log) {
					console.log("onAmountChange is deprecated in twAmountCurrencySelect, please use ngChange.");
				}
				$timeout($ctrl.onAmountChange);
			}
		};

		$ctrl.changedCurrency = function() {
			if ($ctrl.onCurrencyChange) {
				$timeout($ctrl.onCurrencyChange);
			}
		};

		$ctrl.customAction = function() {
			if ($ctrl.onCustomAction) {
				$ctrl.onCustomAction();
			}
		};

		function isNumber(value) {
			return !isNaN(parseFloat(value));
		}
	}

})(window.angular);
