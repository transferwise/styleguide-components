(function(angular) {
	'use strict';

	angular
		.module('tw.styleguide-components')
		.directive('formControl', TwActiveFormControl);

	function checkValid(formControl, formGroup) {
		// Allow time for angular to apply ng-invalid
		setTimeout(function() {
			if (formControl.hasClass("ng-invalid") &&
				formControl.hasClass("ng-touched")) {
				formGroup.addClass("has-error");
			} else {
				formGroup.removeClass("has-error");
			}
		});
	}

	function TwActiveFormControl(FileUrlService) {
		return {
			restrict: 'C',
			link: function(scope, element, attrs, ctrl) {
				var potentialParents = '.form-group, .checkbox > label, .radio > label';
				var formControls = $(element);
				var formGroup = formControls.parents('.form-group');

				formControls
					.on('focus', function() {
						$(this).parents(potentialParents).addClass('focus');
					})
					.on('blur', function() {
						$(this).parents(potentialParents).removeClass('focus');

						// Check on blur as well, 
						// ng-touched not present during first change events
						checkValid(formControl, formGroup);
					})
					.on("keyup", function() {
						checkValid($(this), formGroup);
					})
					.on("invalid", function(event) {
						// Prevent default validation tooltips
						event.preventDefault();
					});

				formControls.filter("select")
					.on("change", function() {
						checkValid($(this), formGroup);
					});
			}
		};
	}
})(window.angular);
