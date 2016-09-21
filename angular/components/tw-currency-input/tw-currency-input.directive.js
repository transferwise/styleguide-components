(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twCurrencyInput', TwCurrencyInputDirective);

	function TwCurrencyInputDirective() {
		var directive = {
			require: 'ngModel',
			bindToController: true,
			controller: 'TwCurrencyInputController',
			controllerAs: 'vm',
			replace: false,
			restrict: 'E',
			template: templateAsString,
			scope: {
				ngModel: '=',
				ngMin: '=',
				ngMax: '=',
				ngRequired: '=',
				currencySymbol: '@',
				currencyCode: '@',
			},
		};

		return directive;
	}

	var templateAsString = ' \
		<div class="input-group"> \
			<span class="input-group-addon tw-currency-input-symbol">{{ vm.currencySymbol }}</span> \
			<input \
				type="number" \
				autocomplete="off" \
				name="amount" \
				step="any" \
				class="form-control text-xs-right p-r-0" \
				tw-focusable \
				ng-model="vm.ngModel" /> \
			<span class="input-group-addon tw-currency-input-code p-l-1"> \
				{{ vm.currencyCode }} \
			</span> \
		</div> \
	';

})(window.angular);
