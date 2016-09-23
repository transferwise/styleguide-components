(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.controller('TwCurrencyInputController', TwCurrencyInputController);

	TwCurrencyInputController.$inject = ['$element', '$scope'];

	function TwCurrencyInputController($element, $scope) {
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
			if (typeof $scope.vm.ngMin === 'undefined' || viewValue === null) {
				return true;
			}

			return viewValue >= $scope.vm.ngMin;
		};

		$ngModel.$validators.max = function(modelValue, viewValue) {
			if (typeof $scope.vm.ngMax === 'undefined' || viewValue === null) {
				return true;
			}

			return viewValue <= $scope.vm.ngMax;
		};

		$ctrl.changedInputValue = function() {
			if ($ctrl.ngChange) {
				$ctrl.ngChange();
			}
		};
	}

})(window.angular);
