(function(angular) {
	'use strict';

	angular
		.module('tw.styleguide-components')
		.directive('twInputDate', TwDateDirective);

	TwDateDirective.$inject = [];

	function TwDateDirective() {
		var directive = {
			bindToController: true,
			controller: "TwDateController",
			controllerAs: 'vm',
			replace: true,
			restrict: 'E',
			scope: {
				date: '=ngModel',
				disabled: '@',
				required: '@'
			},
			templateUrl: '../dist/templates/tw-date.html',
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
	}
})(window.angular);
