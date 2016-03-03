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
				ngMin: '=ngMin',
				ngMax: '=ngMax',
				disabled: '@',
				required: '@',
				locale: '@'
			},
			template: templateAsString,
			link: TwDateLink
		};

		return directive;
	}

	function TwDateLink(scope, element, attrs, ctrl) {
		if (attrs.ngDisabled) {
			scope.$parent.$watch(attrs.ngDisabled, function(isDisabled) {
				scope.disabled = isDisabled;
			});
		}

		if (attrs.ngRequired) {
			scope.$parent.$watch(attrs.ngRequired, function(isRequired) {
				scope.required = isRequired;
			});
		}

		element.find("[name=month]").change(function() {
			element.find("[name=day]").focus().blur();
		});
	}

	var templateAsString = "<div class='row'> \
				<div class='col-sm-3'> \
					<label class='sr-only' for='day-{{::uniqueId}}'>Day</label> \
					<input type='number' \
						name='day' \
						id='day-{{::uniqueId}}' \
						class='form-control' \
						ng-model='vm.day' \
						ng-change='vm.updateDate()' \
						placeholder='DD' \
						min='1' \
						max='31' \
						maxlength='2' \
						ng-min='1' \
						ng-max='31' \
						ng-maxlength='2' \
						ng-disabled='vm.disabled' \
						ng-required='vm.required' \
						tw-validation /> \
				</div> \
				<div class='col-sm-5'> \
					<label class='sr-only' for='month-{{::uniqueId}}'>Month</label> \
					<select name='month' \
						id='month-{{::uniqueId}}' \
						class='form-control' \
						ng-model='vm.month' \
						ng-change='vm.updateDate()' \
						ng-options='month.id as month.name for month in vm.months' \
						ng-disabled='vm.disabled' \
						required \
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
						ng-change='vm.updateDate()' \
						min='1900' \
						max='2015' \
						maxlength='4' \
						ng-maxlength='4' \
						ng-disabled='vm.disabled' \
						ng-required='vm.required' \
						tw-validation /> \
				</div> \
			</div>";
})(window.angular);
