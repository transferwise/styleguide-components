
(function(angular) {
	//'use strict';

	angular
		.module('tw.styleguide-components')
		.directive('input', TwInput);

	function TwInput() {

		function onFocus() {
			$(this).parents('.form-group, .checkbox > label, .radio > label').addClass('focus');
		}
		function onBlur() {
			$(this).parents('.form-group, .checkbox > label, .radio > label').removeClass('focus');
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

				if (type === "radio") {
					var radioReplace = $(radioTemplate)
						.keypress(onKeypress)
						.click(onClick)
						.focus(onFocus)
						.blur(onBlur);

					$(element).hide().after(radioReplace);
					radioReplace.after(disabledReplacement);
				}

				if (type === "checkbox") {
					var checkReplace = $(checkboxTemplate)
						.keypress(onKeypress)
						.click(onClick)
						.focus(onFocus)
						.blur(onBlur);

					$(element).hide().after(checkReplace);
					checkReplace.after(disabledReplacement);
				}
			}
		};
	}
})(window.angular);
