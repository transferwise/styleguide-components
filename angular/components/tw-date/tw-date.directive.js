(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twDate', TwDateDirective);

	function TwDateDirective() {
		var directive = {
			bindToController: true,
			controller: "TwDateController",
			controllerAs: 'vm',
			replace: true,
			restrict: 'E',
			scope: {
				date: '=ngModel',
				required: '@',
				ngRequired: '=',
				disabled: '@',
				ngDisabled: '=',
				locale: '@',
				ngLocale: '=',
				minDateString: '@min',
				ngMin: '=',
				maxDateString: '@max',
				ngMax: '='
			},
			template: templateAsString
		};

		return directive;
	}

	var templateAsString = "<div class='row'> \
				<div class='col-sm-3'> \
					<label class='sr-only' for='day-{{::uniqueId}}'>Day</label> \
					<input type='number' \
						name='day' \
						id='day-{{::uniqueId}}' \
						class='form-control tw-date-day' \
						ng-model='vm.day' \
						ng-change='vm.updateDateModelAndValidationClasses()' \
						placeholder='DD' \
						min='1' \
						max='31' \
						maxlength='2' \
						ng-min='1' \
						ng-max='31' \
						ng-maxlength='2' \
						ng-disabled='vm.dateDisabled' \
						ng-required='vm.dateRequired' \
						tw-validation /> \
				</div> \
				<div class='col-sm-5'> \
					<label class='sr-only' for='month-{{::uniqueId}}'>Month</label> \
					<select name='month' \
						id='month-{{::uniqueId}}' \
						class='form-control' \
						ng-model='vm.month' \
						ng-change='vm.updateDateModelAndValidationClasses()' \
						ng-options='month.id as month.name for month in vm.dateMonths' \
						ng-disabled='vm.dateDisabled' \
						ng-required='vm.dateRequired' \
						autocomplete='off' \
						tw-validation> \
					</select> \
				</div> \
				<div class='col-sm-4'> \
					<label class='sr-only' for='year-{{::uniqueId}}'>Year</label> \
					<input type='number' \
						id='year-{{::uniqueId}}' \
						name='year' \
						class='form-control' \
						placeholder='YYYY' \
						ng-model='vm.year' \
						ng-change='vm.updateDateModelAndValidationClasses()' \
						ng-min='vm.dateRange.min.getFullYear()' \
						ng-max='vm.dateRange.max.getFullYear()' \
						maxlength='4' \
						ng-maxlength='4' \
						ng-disabled='vm.dateDisabled' \
						ng-required='vm.dateRequired' \
						tw-validation /> \
				</div> \
			</div>";
})(window.angular);
