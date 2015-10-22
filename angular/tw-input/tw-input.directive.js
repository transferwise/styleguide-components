
(function(angular) {
	//'use strict';

	angular
		.module('tw.styleguide-components')
		.directive('input', TwInput);

	function TwInput() {
		var parents = '.form-group, .checkbox > label, .radio > label';

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
			var input = $(buttonReplacement).parents('label').find('input');
			input.click();
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

		return {
			restrict: 'E',
			link: function(scope, element, attrs, ctrl) {
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
			}
		};
	}
})(window.angular);
