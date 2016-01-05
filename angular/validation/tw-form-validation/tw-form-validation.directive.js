
(function(angular) {
	'use strict';

	angular
		.module('tw.form-validation')
		.directive('form', TwFormValidation);

	function TwFormValidation() {
		return {
			restrict: 'E',
			link: function(scope, element) {
				$(element).on('submit', function() {
					// Submitting the form won't trigger form controls own validation
					$(element)
						.find("[tw-validation].ng-invalid")
						.closest(".form-group")
						.addClass("has-error");

					var invalidControl = $(element).find(
						"input[type=checkbox].ng-invalid, input[type=radio].ng-invalid"
					);

					invalidControl
						.closest(".checkbox, .radio")
						.addClass("has-error");

					invalidControl
						.parents(".form-group")
						.addClass("has-error");

					return true;
				});
			}
		};
	}
})(window.angular);
