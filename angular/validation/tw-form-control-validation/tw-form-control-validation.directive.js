(function(angular) {
	'use strict';

	angular
		.module('tw.form-validation')
		.directive('formControl', TwFormControlValidation);

	function checkValid(formControl, formGroup) {
		// Allow time for angular to apply ng-invalid
		setTimeout(function() {
			if (!formControl.hasClass("ng-invalid")) {
				formGroup.removeClass("has-error");
				return;
			}
			if (formControl.hasClass("ng-touched")) {
				formGroup.addClass("has-error");
			}
		},10);
	}

	function TwFormControlValidation() {
		return {
			restrict: 'C',
			link: function(scope, element) {
				var formControl = $(element);
				var formGroup = formControl.closest('.form-group');

				formControl
					.on("blur keyup", function() {
						// Check on blur as well,
						// ng-touched not present during first change events
						checkValid(formControl, formGroup);
					})
					.on("invalid", function(event) {
						// Prevent default validation tooltips
						event.preventDefault();
					});

				// Change handler only needed for select.
				formControl.filter("select")
					.on("change", function() {
						checkValid(formControl, formGroup);
					});
			}
		};
	}
})(window.angular);
