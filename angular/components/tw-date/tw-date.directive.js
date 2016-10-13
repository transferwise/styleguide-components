(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twDate', TwDateDirective);

	function TwDateDirective() {
		var directive = {
			require: 'ngModel',
			bindToController: true,
			controller: 'TwDateController',
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
		var dayTouched, yearTouched;

		element.find('input[name=day]').on('blur', function() {
			dayTouched = true;
			if (dayTouched && yearTouched) {
				ngModel.$setTouched();
				element.triggerHandler('blur');
			}
		});
		element.find('input[name=year]').on('blur', function() {
			yearTouched = true;

			ngModel.$setTouched();
			element.triggerHandler('blur');
		});

		/*
		var dayModelController = element.find('.tw-date-day').controller('ngModel');
		dayModelController.$parsers.push(function(value) {
			return parseInt(value);
		});
		*/

		/**
		ngModel.$formatters.push(function(value) {
			if (scope.vm.validDate(value)) {
			return null;
		}
			scope.vm.explodeDateModel(value);
			return value;
		});
		dayModelController = element.find('.tw-date-day').controller('ngModel');
		monthModelController = element.find('.tw-date-month').controller('ngModel');
		yearModelController = element.find('.tw-date-year').controller('ngModel');

		function combiner(value) {
			vm.combineDate();
			return value;
		}

		dayModelController.$parsers.push(combiner);
		monthModelController.$parsers.push(combiner);
		yearModelController.$parsers.push(combiner);

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
		/**/
	}

	var templateAsString = " \
			<div class='row'> \
				<div class='col-sm-5 tw-date-month-column' ng-if='vm.monthBeforeDay'> \
					<label class='sr-only' for='month-{{::uniqueId}}'>Month</label> \
					<tw-select \
						name='month' \
						class='tw-date-month' \
						id='month-{{::uniqueId}}' \
						ng-model='vm.month' \
						ng-change='vm.updateDateModelAndValidationClasses()' \
						ng-required='vm.dateRequired' \
						ng-disabled='vm.dateDisabled' \
						options='vm.dateMonths'> \
					</tw-select> \
				</div> \
				<div class='col-sm-3 tw-date-day-column'> \
					<label class='sr-only' for='day-{{::uniqueId}}'>Day</label> \
					<input type='number' \
						name='day' \
						id='day-{{::uniqueId}}' \
						class='form-control tw-date-day' \
						ng-model='vm.day' \
						ng-change='vm.updateDateModelAndValidationClasses()' \
						placeholder='DD' \
						min='1' \
						ng-min='1' \
						ng-disabled='vm.dateDisabled' \
						ng-required='vm.dateRequired' \
						tw-focusable /> \
				</div> \
				<div class='col-sm-5 tw-date-month-column' ng-if='!vm.monthBeforeDay'> \
					<label class='sr-only' for='month-{{::uniqueId}}'>Month</label> \
					<tw-select \
						name='month' \
						class='tw-date-month' \
						id='month-{{::uniqueId}}' \
						ng-model='vm.month' \
						ng-change='vm.updateDateModelAndValidationClasses()' \
						ng-required='vm.dateRequired' \
						ng-disabled='vm.dateDisabled' \
						options='vm.dateMonths'> \
					</tw-select> \
				</div> \
				<div class='col-sm-4 tw-date-year-column'> \
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
})(window.angular);
