
(function(angular) {
	//'use strict';

	angular
		.module('tw.form-styling')
		.directive('input', TwInputStyling);

	function TwInputStyling() {
		var labelSelector = '.checkbox > label, .radio > label';

		function onFocus() {
			$(this).closest('.form-group').addClass('focus');
			$(this).closest(labelSelector).addClass('focus');
		}
		function onBlur() {
			$(this).closest('.form-group').removeClass('focus');
			$(this).closest(labelSelector).removeClass('focus');
		}
		function onClick(event) {
			fakeClick(this);
			event.stopPropagation();
		}
		function fakeClick(buttonReplacement) {
			var formControl = $(buttonReplacement).closest('label').find('input');
			formControl.click();
		}
		function onKeypress(event) {
			if ((event.keyCode ? event.keyCode : event.which) === 13) { // Space
				fakeClick(this);
			}
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
			if (type !== "radio" &&
				type !== "checkbox") {
				return;
			}

			// don't affect non-bootstrap controls
			if ($(element).closest(labelSelector).length === 0) {
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
		}

		return {
			restrict: 'E',
			link: link
		};
	}
})(window.angular);
