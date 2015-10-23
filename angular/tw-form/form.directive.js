
(function(angular) {
	'use strict';

	angular
		.module('tw.styleguide-components')
		.directive('form', TwFormValidation);

	function TwFormValidation() {
		return {
			restrict: 'E',
			link: function(scope, element, attrs, ctrl) {
				$(element).on('submit', function() {
					// Submitting the form won't trigger form controls own validation
					var invalid = $(element).find(".form-control.ng-invalid");
					invalid.parents(".form-group").addClass("has-error");

					var invalidCheckbox = $(element).find(
						"input[type=checkbox].ng-invalid, input[type=radio].ng-invalid"
					);

					invalidCheckbox
						.parents(".form-group, .checkbox, .radio")
						.addClass("has-error");

					return true;
				});
			}
		};
	}
})(window.angular);
