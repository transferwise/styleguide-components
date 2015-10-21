
(function(angular) {
	'use strict';

	angular
		.module('tw.styleguide-components')
		.directive('form', TwInvalid);

	function TwInvalid() {
		return {
			restrict: 'E',
			link: function(scope, element, attrs, ctrl) {
				$(element).on('submit', function() {
					// Submitting the form won't trigger form controls own validation
					var invalid = $(element).find(".form-control.ng-invalid");
					invalid.parents(".form-group").addClass("has-error");
					return true;
				});
			}
		};
	}
})(window.angular);
