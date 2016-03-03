(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twInputDate', TwDateDirective);

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
			templateUrl: "tw-date.html",
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
})(window.angular);
