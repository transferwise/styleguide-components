(function(angular) {
	'use strict';

	angular
		.module('tw.styleguide-components')
		.directive('formControl', TwFormControlValidation);

	function checkValid(formControl, formGroup) {
		// Allow time for angular to apply ng-invalid
		setTimeout(function() {
			if (formControl.hasClass("ng-invalid")) {
				if (formControl.hasClass("ng-touched")) {
					formGroup.addClass("has-error");
				}
				// don't remove class until touched, so don't fall into 'else'
			} else {
				formGroup.removeClass("has-error");
			}
		});
	}

	function TwFormControlValidation(FileUrlService) {
		return {
			restrict: 'C',
			link: function(scope, element, attrs, ctrl) {
				var potentialParents = '.form-group, .checkbox > label, .radio > label';
				var formControl = $(element);
				var formGroup = formControl.closest('.form-group');
				var label = formControl.closest('.checkbox > label, .radio > label');

				formControl
					.on('focus', function() {
						formControl.parents(potentialParents).addClass('focus');
					})
					.on('blur', function() {
						formControl.parents(potentialParents).removeClass('focus');

						// Check on blur as well,
						// ng-touched not present during first change events
						checkValid(formControl, formGroup);
					})
					.on("keyup", function() {
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
