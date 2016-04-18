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

		ngModel.$validators.twValidation = function() {
			// Evaluate after ngModel updates
			scope.$evalAsync(function() {
				//console.log(ngModel);
				checkModelAndUpdate(ngModel, formGroup);
			});
			return true;
		};

		// The first time we blur, still pristine when model validation occurs, so perform again.
		element.on("blur", function() {
			scope.$evalAsync(function() {
				checkModelAndUpdate(ngModel, formGroup);
			});
		});
	}

	function checkModelAndUpdate(ngModel, formGroup) {
		if (ngModel.$valid) {
			formGroup.removeClass("has-error");
			return;
		}
		if (ngModel.$touched && ngModel.$dirty) {
			formGroup.addClass("has-error");
		}
	}
})(window.angular);
