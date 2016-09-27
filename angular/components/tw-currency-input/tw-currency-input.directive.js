(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twCurrencyInput', TwCurrencyInputDirective);

	function TwCurrencyInputDirective() {
		return {
			require: 'ngModel',
			bindToController: true,
			controller: 'TwCurrencyInputController',
			controllerAs: 'vm',
			replace: false,
			restrict: 'E',
			template: templateAsString,
			scope: {
				ngModel: '=',
				ngChange: '&',
				ngMin: '=',
				ngMax: '=',
				ngRequired: '=',
				showDecimals: '=',
				currencySymbol: '@',
				currencyCode: '@',
			},
		};
	}

	var templateAsString = ' \
		<div class="input-group"> \
			<span class="input-group-addon tw-currency-input-symbol">{{ vm.currencySymbol }}</span> \
			<input \
				type="tel" \
				autocomplete="off" \
				name="amount" \
				step="any" \
				class="form-control text-xs-right p-r-0" \
				show-decimals="vm.showDecimals" \
				tw-focusable \
				tw-number-input-formatter \
				ng-change="vm.changedInputValue()" \
				ng-model="vm.ngModel" /> \
			<span class="input-group-addon tw-currency-input-code p-l-1"> \
				{{ vm.currencyCode }} \
			</span> \
		</div> \
	';

})(window.angular);
