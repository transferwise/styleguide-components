(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twDate', TwDateDirective);

	function TwDateDirective() {
		var directive = {
			require: 'ngModel',
			bindToController: true,
			controller: "TwDateController",
			controllerAs: 'vm',
			replace: false,
			restrict: 'E',
			scope: {
				ngModel: '=',
				required: '@',
				ngRequired: '=',
				disabled: '@',
				ngDisabled: '=',
				locale: '@',
				twLocale: '=',
				min: '@',
				ngMin: '=',
				max: '@',
				ngMax: '=',
				modelType: '@'
			},
			template: templateAsString,
			link: TwDateLink
		};

		return directive;
	}

	function TwDateLink(scope, element, attrs, ngModel) {
		// Done in controller
		//scope.$watch('vm.ngModel', function(newValue, oldValue) {
		//	if (newValue !== oldValue) {
		//		ngModel.$setDirty();
		//	}
		//});

		element.find('input').on('blur', function() {
			ngModel.$setTouched();
		});
		/**
		ngModel.$formatters.push(function(value) {
			if (scope.vm.validDate(value)) {
			return null;
		}
			scope.vm.explodeDateModel(value);
			return value;
		});

		element.find('input').on('change', function() {
			var dateObject = scope.vm.combineDate();
			if (!dateObject) {
				return;
			}
			if (scope.vm.format === "string") {
				// TODO cast to string
				var dateString = dateObject;
				ngModel.$setViewValue(dateString);
			} else {
				ngModel.$setViewValue(dateObject);
			}
		});
		ngModel.$validators.min = function(value) {
			var min = scope.vm.ngMin ? scope.vm.ngMin : scope.vm.min;
			min = typeof min === 'string' ? new Date(min) : min;
			var dateValue = typeof value === 'string' ? new Date(value) : value;
			return !min || dateValue >= min;
		};
		ngModel.$validators.max = function(value) {
			var max = scope.vm.ngMax ? scope.vm.ngMax : scope.vm.max;
			max = typeof max === 'string' ? new Date(max) : max;
			var dateValue = typeof value === 'string' ? new Date(value) : value;
			return !max || dateValue >= max;
		};
		/**/
	}

	var templateAsString = " \
			<div class='row'> \
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
						tw-focusable /> \
				</div> \
				<div class='col-sm-5'> \
					<label class='sr-only' for='month-{{::uniqueId}}'>Month</label> \
					<select name='month' \
						id='month-{{::uniqueId}}' \
						class='form-control tw-date-month' \
						ng-model='vm.month' \
						ng-change='vm.updateDateModelAndValidationClasses()' \
						ng-options='month.value as month.label for month in vm.dateMonths' \
						ng-disabled='vm.dateDisabled' \
						ng-required='vm.dateRequired' \
						autocomplete='off'> \
					</select> \
				</div> \
				<div class='col-sm-4'> \
					<label class='sr-only' for='year-{{::uniqueId}}'>Year</label> \
					<input type='number' \
						id='year-{{::uniqueId}}' \
						name='year' \
						class='form-control tw-date-year' \
						placeholder='YYYY' \
						ng-model='vm.year' \
						ng-change='vm.updateDateModelAndValidationClasses()' \
						ng-min='vm.dateRange.min.getFullYear()' \
						ng-max='vm.dateRange.max.getFullYear()' \
						maxlength='4' \
						ng-maxlength='4' \
						ng-disabled='vm.dateDisabled' \
						ng-required='vm.dateRequired' \
						tw-focusable /> \
				</div> \
			</div>";

	/*

<tw-select \
	name='month' \
	class='tw-date-month' \
	id='month-{{::uniqueId}}' \
	ng-model='vm.month' \
	ng-change='vm.updateDateModelAndValidationClasses()' \
	ng-required='vm.dateRequired' \
	ng-disabled='vm.dateDisabled' \
	tw-options='vm.dateMonths'> \
</tw-select> \

<select name='month' \
	id='month-{{::uniqueId}}' \
	class='form-control tw-date-month' \
	ng-model='vm.month' \
	ng-change='vm.updateDateModelAndValidationClasses()' \
	ng-options='month.value as month.label for month in vm.dateMonths' \
	ng-disabled='vm.dateDisabled' \
	ng-required='vm.dateRequired' \
	autocomplete='off'> \
</select> \
	*/
})(window.angular);
