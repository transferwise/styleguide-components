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
				ngDisabled: '=',
				currency: '=',
				currencyCode: '@',
				placeholder: '@',
				size: '@',
				locale: '@',
				locked: '=',
				onLockedChange: '&'
			},
		};
	}

	var templateAsString = ' \
		<div class="input-group" ng-class="{ \
			\'input-group-sm\': $ctrl.size === \'sm\', \
			\'input-group-lg\': $ctrl.size === \'lg\', \
			disabled: $ctrl.ngDisabled \
		}"> \
			<input \
				type="tel" \
				autocomplete="off" \
				name="amount" \
				step="any" \
				class="form-control p-r-0" \
				placeholder="{{$ctrl.placeholder}}" \
				show-decimals="$ctrl.showDecimals" \
				tw-focusable \
				tw-number-input-formatter \
				ng-change="$ctrl.changedInputValue()" \
				ng-model="$ctrl.ngModel" \
				ng-disabled="$ctrl.ngDisabled" /> \
			<span class="input-group-addon tw-currency-input-code p-l-1"> \
				<a href=""  class="tw-rate-lock-link m-r-1" \
					ng-if="$ctrl.showLock" \
					ng-click="$ctrl.lockClick()"> \
					<i class="icon icon-lock" ng-if="$ctrl.locked"></i> \
					<i class="icon icon-unlock" ng-if="!$ctrl.locked"></i> \
				</a> \
				{{ $ctrl.currency || $ctrl.currencyCode }} \
			</span> \
		</div> \
	';

})(window.angular);
