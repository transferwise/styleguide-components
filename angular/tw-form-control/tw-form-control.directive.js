(function(angular) {
	'use strict';

	angular
		.module('tw.styleguide-components')
		.directive('formControl', TwActiveFormControl);

	function checkValid(formControl, formGroup) {
		if (formControl.hasClass("ng-invalid") &&
			formControl.hasClass("ng-touched")) {
			formGroup.addClass("has-error");
		} else {
			formGroup.removeClass("has-error");
		}
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

				/*
				$(element).focus(function() {
					$(this)
						.parents('.form-group, .checkbox > label, .radio > label')
						.addClass('focus');
				}).blur(function() {
					$(this)
						.parents('.form-group, .checkbox > label, .radio > label')
						.removeClass('focus');
				}).on("invalid", function(event) {
					// Prevent default validation tooltips
					event.preventDefault();
				});
				*/
			}
		};
	}
})(window.angular);
