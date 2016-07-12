(function(angular) {
	'use strict';

	angular
		.module('tw.form-validation')
		.directive('twValidation', TwValidation);

	function TwValidation() {
		return {
			restrict: 'AC',
			require: 'ngModel',
			link: validationLink
		};
	}

	function validationLink(scope, element, attrs, ngModel) {
		var formGroup = element.closest('.form-group');

		element.on("invalid", function(event) {
			// Prevent default validation tooltips
			event.preventDefault();
		});

		// We could do this in $validators but includes unnecessary DOM manipulation
		ngModel.$validators.validation = function() {
			// Evaluate after ngModel updates, we are still in validation chain
			scope.$evalAsync(function() {
				checkModelAndUpdate(ngModel, formGroup, element);
			});
			return true;
		};

		// The first time we blur, still pristine when model validation occurs, so perform again.
		element.on("blur", function() {
			// Custom elements must trigger blur manually for correct behaviour
			scope.$evalAsync(function() {
				checkModelAndUpdate(ngModel, formGroup, element);
			});
		});
	}

	function checkModelAndUpdate(ngModel, formGroup, element) {
		if (ngModel.$valid) {
			formGroup.removeClass("has-error");
			element.removeAttr("aria-invalid");
			return;
		}
		if (ngModel.$touched && ngModel.$dirty) {
			formGroup.addClass("has-error");
			// Set aria invalid for screen readers
			element.attr("aria-invalid", true);
		}
	}
})(window.angular);
