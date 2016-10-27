(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twAmountCurrencySelect', TwAmountCurrencySelectDirective);

	function TwAmountCurrencySelectDirective() {
		return {
			require: 'ngModel',
			bindToController: true,
			controller: 'TwAmountCurrencySelectController',
			controllerAs: '$ctrl',
			replace: false,
			restrict: 'E',
			template: templateAsString,
			scope: {
				ngModel: '=',
				ngMin: '=',
				ngMax: '=',
				ngRequired: '=',

				label: '=',
				amountReadOnly: '=',
				onAmountChange: '&',

				currency: '=',
				currencies: '=',
				onCurrencyChange: '&',

				customActionLabel: '=',
				onCustomAction: '&',

				error: '='
			},
		};
	}

	var templateAsString = '\
	<div class="form-group form-group-lg" ng-class="{ \'has-error\': $ctrl.error }"> \
		<label class="control-label">{{ $ctrl.label }}</label> \
		<div class="input-group input-group-lg">  \
			<input \
				type="tel"  \
				autocomplete="off"  \
				name="amount"  \
				step="any"  \
				class="form-control"  \
				tw-focusable  \
				tw-number-input-formatter  \
				ng-change="$ctrl.changedAmount()"  \
				ng-model="$ctrl.ngModel" \
				ng-disabled="$ctrl.amountReadOnly" /> \
			<span class="input-group-btn">  \
				<tw-select \
					ng-model="$ctrl.currency" \
					ng-required="true" \
					size="lg" \
					inverse="true" \
					dropdown-right="xs" \
					dropdown-width="lg" \
					hide-note="true" \
					hide-secondary="true" \
					options="$ctrl.currencies" \
					ng-change="$ctrl.changedCurrency()"> \
						<a ng-if="!!$ctrl.customActionLabel" ng-click="$ctrl.onCustomAction()">{{ $ctrl.customActionLabel }}</a> \
				</tw-select> \
			</span>  \
		</div>  \
	</div>';

})(window.angular);
