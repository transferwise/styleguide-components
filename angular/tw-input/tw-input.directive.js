
(function(angular) {
	//'use strict';

	angular
		.module('tw.styleguide-components')
		.directive('input', TwInputValidation);

	function TwInputValidation() {
		var parents = '.form-group, .checkbox > label, .radio > label';
		var labelContainer = '.checkbox > label, .radio > label';

		function onFocus() {
			$(this).parents(parents).addClass('focus');
		}
		function onBlur() {
			$(this).parents(parents).removeClass('focus');
		}
		function onClick(event) {
			fakeClick(this);
			event.stopPropagation();
		}
		function fakeClick(buttonReplacement) {
			var formControl = $(buttonReplacement).closest('label').find('input');
			formControl.click();
			checkValid(
				formControl,
				formControl.closest(".checkbox, .radio"),
				formControl.closest('.form-group')
			);
		}
		function onKeypress(event) {
			if ((event.keyCode ? event.keyCode : event.which) === 13) { // Space
				fakeClick(this);
			}
		}
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
				formGroup.find('input.ng-valid').closest('checkbox, .radio');

			setTimeout(function() {
				// Remove validation from any valid input containers
				formGroupValidInputsContainers.removeClass('has-error');

				// Only remove formGroup class if all inputs valid
				if (formGroupInvalidInputs.length === 0) {
					formGroup.removeClass("has-error");
				}
			});
		}

		var checkboxTemplate =
			"<button type='button' class='input-replacement'>" +
				"<span class='glyphicon glyphicon-ok'></span>" +
			"</button>";

		var radioTemplate =
			"<button type='button' class='input-replacement'>" +
				"<span></span>" +
			"</button>";

		var disabledReplacement =
			"<span class='disabled-replacement input-replacement'>" +
				"<span><span>" +
			"</span>";

		function link(scope, element, attrs, ctrl) {
			if (!attrs.type) {
				return;
			}

			var type = attrs.type.toLowerCase();
			if (type !== "radio" && type !== "checkbox") {
				return;
			}

			// don't affect non-bootstrap controls
			if ($(element).parents(parents).length === 0) {
				return;
			}

			var replacement;

			if (type === "radio") {
				replacement = $(radioTemplate);
			} else {
				replacement = $(checkboxTemplate);
			}

			replacement.keypress(onKeypress)
				.click(onClick)
				.focus(onFocus)
				.blur(onBlur);

			$(element).hide().after(replacement);
			replacement.after(disabledReplacement);

			var formControl = $(element);
			var label = formControl.closest('label');
			var formGroup = formControl.closest('.form-group');
			var labelContainer = formControl.closest('.checkbox, .radio');

			// Clicks on label do not trigger input.change
			label.on('click', function() {
				checkValid(formControl, labelContainer, formGroup);
			});
		}

		return {
			restrict: 'E',
			link: link
		};
	}
})(window.angular);
