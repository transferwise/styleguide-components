(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.controller('TwCurrencyInputController', TwCurrencyInputController);

	TwCurrencyInputController.$inject = ['$element', '$scope', '$timeout'];

	function TwCurrencyInputController($element, $scope, $timeout) {
		var $ctrl = this;
		var $ngModel = $element.controller('ngModel');

		$scope.$watch('vm.ngModel', function(newValue, oldValue) {
			if (newValue !== oldValue) {
				$ngModel.$setDirty();
			}
		});

		$element.find('input').on('blur', function() {
			$ngModel.$setTouched();
			$element.triggerHandler('blur');
		});

		$ngModel.$validators.min = function(modelValue, viewValue) {
			if (typeof $scope.vm.ngMin === 'undefined' || $scope.vm.ngMin === null || !isNumber(viewValue)) {
				return true;
			}

			return viewValue >= $scope.vm.ngMin;
		};

		$ngModel.$validators.max = function(modelValue, viewValue) {
			if (typeof $scope.vm.ngMax === 'undefined' || $scope.vm.ngMax === null || !isNumber(viewValue)) {
				return true;
			}

			return viewValue <= $scope.vm.ngMax;
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

})(window.angular);
