(function(angular) {
	'use strict';

	angular
		.module('tw.styleguide-components')
		.controller('TwSortCodeController', TwSortCodeController);

	TwSortCodeController.$inject = ['$scope'];

	function TwSortCodeController($scope) {
		var vm = this;

		vm.init = init;
		vm.explodeSortCode = explodeSortCode;
		vm.updateSortCode = updateSortCode;
		vm.validSortCode = validSortCode;

		vm.pattern = /^[0-9]{6}$/;
		vm.shortPattern = /^[0-9]{2}$/;

		function explodeSortCode(sortCode) {
			var sortCodeString = "" + sortCode;
			if (!sortCodeString ||
				!vm.validSortCode(sortCodeString)) {
				// Don't null componenents as might be progressive delete.
				return;
			}

			vm.firstTwo = sortCodeString.slice(0,2);
			vm.secondTwo = sortCodeString.slice(2,4);
			vm.thirdTwo = sortCodeString.slice(4,6);
		}

		function updateSortCode() {
			var sortCodeString, shortRegexp = new RegExp(vm.shortRegexp);
			sortCodeString = "" + vm.firstTwo + vm.secondTwo + vm.thirdTwo;

			if (!vm.validSortCode(sortCodeString)) {
				vm.sortCode = null;
				return;
			}

			vm.sortCode = sortCodeString;
		}

		function validSortCode(sortCodeString) {
			var reg = new RegExp(vm.pattern);
			return reg.test(sortCodeString);
		}

		function init() {
			$scope.$watch('vm.sortCode', function(sortCode) {
				vm.explodeSortCode(sortCode);
			});

			vm.explodeSortCode(vm.sortCode);
		}

		vm.init();
	}

})(window.angular);
