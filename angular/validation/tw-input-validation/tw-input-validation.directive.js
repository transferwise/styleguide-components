
(function(angular) {
	//'use strict';

	angular
		.module('tw.form-validation')
		.directive('input', TwInputValidation);

	function TwInputValidation() {
		var labelSelector = '.checkbox > label, .radio > label';

		function checkValid(input, label, formGroup) {
			setTimeout(function() {
				if (input.hasClass("ng-invalid")) {
					label.addClass("has-error");
					formGroup.addClass("has-error");
				} else {
					label.removeClass("has-error");
					checkFormGroup(formGroup);
				}
			});
		}

		function checkFormGroup(formGroup) {
			var formGroupInvalidInputs = formGroup.find('input.ng-invalid');
			var formGroupValidInputsContainers =
				formGroup.find('input.ng-valid').closest('.checkbox, .radio');

			setTimeout(function() {
				// Remove validation from any valid input containers
				formGroupValidInputsContainers.removeClass('has-error');

				// Only remove formGroup class if all inputs valid
				if (formGroupInvalidInputs.length === 0) {
					formGroup.removeClass("has-error");
				}
			});
		}

		function link(scope, element, attrs, ctrl) {
			if (!attrs.type) {
				return;
			}

			var type = attrs.type.toLowerCase();
			if (type !== "radio" &&
				type !== "checkbox") {
				return;
			}

			// don't affect non-bootstrap controls
			if ($(element).closest(labelSelector).length === 0) {
				return;
			}

			var formControl = $(element);
			var label = formControl.closest('label');

			// Clicks on label do not trigger input.change
			label.on('click', function() {
				checkValid(
					formControl,
					formControl.closest('.checkbox, .radio'),
					formControl.closest('.form-group')
				);
			});
		}

		return {
			restrict: 'E',
			link: link
		};
	}
})(window.angular);
