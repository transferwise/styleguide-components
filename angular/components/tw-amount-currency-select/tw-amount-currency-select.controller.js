(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.controller('TwAmountCurrencySelectController', TwAmountCurrencySelectController);

	TwAmountCurrencySelectController.$inject = ['$element', '$scope', '$timeout'];

	function TwAmountCurrencySelectController($element, $scope, $timeout) {
		var $ctrl = this;
		var $ngModel = $element.controller('ngModel');

		$scope.$watch('$ctrl.ngModel', function(newValue, oldValue) {
			if (newValue !== oldValue) {
				$ngModel.$setDirty();
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
			if ($ctrl.onAmountChange) {
				// $timeout is needed to get the last ngModel value.
				// See: https://github.com/angular/angular.js/issues/4558
				$timeout($ctrl.onAmountChange);
			}
		};

		$ctrl.changedCurrency = function() {
			if ($ctrl.onCurrencyChange) {
				// $timeout is needed to get the last ngModel value.
				// See: https://github.com/angular/angular.js/issues/4558
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
