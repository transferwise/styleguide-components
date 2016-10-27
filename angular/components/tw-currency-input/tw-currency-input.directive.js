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
			controllerAs: '$ctrl',
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
				size: '@'
			},
		};
	}

	var templateAsString = " \
		<div class='input-group' \
			ng-class='{ \
				\"input-group-sm\": $ctrl.size === \"sm\", \
				\"input-group-lg\": $ctrl.size === \"lg\" \
			}'> \
			<span class='input-group-addon tw-currency-input-symbol'>{{ $ctrl.currencySymbol }}</span> \
			<input \
				type='tel' \
				autocomplete='off' \
				name='amount' \
				step='any' \
				class='form-control text-xs-right p-r-0' \
				show-decimals=''$ctrl.showDecimals' \
				tw-focusable \
				tw-number-input-formatter \
				ng-change='$ctrl.changedInputValue()' \
				ng-model='$ctrl.ngModel' /> \
			<span class='input-group-addon tw-currency-input-code p-l-1'> \
				{{ $ctrl.currencyCode }} \
			</span> \
		</div>";

})(window.angular);
