(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.controller('TwCurrencyInputController', TwCurrencyInputController);

	TwCurrencyInputController.$inject = ['$element', '$scope'];

	function TwCurrencyInputController($element, $scope) {
		var vm = this;
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
			if (typeof $scope.vm.ngMin === "undefined" || !viewValue) {
				return true;
			}

			return viewValue >= $scope.vm.ngMin;
		};

		$ngModel.$validators.max = function(modelValue, viewValue) {
			if (typeof $scope.vm.ngMax === "undefined" || !viewValue) {
				return true;
			}

			return viewValue <= $scope.vm.ngMax;
		};
	}
})(window.angular);
