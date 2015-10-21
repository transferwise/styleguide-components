
(function(angular) {
	'use strict';

	angular
		.module('tw.styleguide-components')
		.directive('formGroup', TwFormGroup);

	function checkValid(formControl, formGroup) {
		if (formControl.hasClass("ng-invalid") &&
			formControl.hasClass("ng-touched")) {
			formGroup.addClass("has-error");
		} else {
			formGroup.removeClass("has-error");
		}
	}

	function TwFormGroup() {
		return {
			restrict: 'C',
			link: function(scope, formGroup, attrs, ctrl) {
				var potentialParents = '.form-group, .checkbox > label, .radio > label';
				var formControls = $(formGroup).find(".form-control");

				formControls
					.on('focus', function() {
						var formControl = $(this);
						formControl.parents(potentialParents).addClass('focus');
					})
					.on('blur', function() {
						var formControl = $(this);
						formControl.parents(potentialParents).removeClass('focus');

						// Check on blur as well, ng-touched will not be present
						// during first change events
						checkValid(formControl, formGroup);
					})
					.on("keyup", function() {
						var formControl = $(this);
						// Allow time for angular to apply ng-invalid
						setTimeout(function() {
							checkValid(formControl, formGroup);
						});
					})
					.on("invalid", function(event) {
						// Prevent default validation tooltips
						event.preventDefault();
					});
			}
		};
	}
})(window.angular);
