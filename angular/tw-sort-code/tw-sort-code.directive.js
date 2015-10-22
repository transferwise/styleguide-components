(function(angular) {
	'use strict';

	angular
		.module('tw.styleguide-components')
		.directive('twInputSortCode', TwSortCodeDirective);

	TwSortCodeDirective.$inject = [];

	function TwSortCodeDirective() {
		var directive = {
			bindToController: true,
			controller: "TwSortCodeController",
			controllerAs: 'vm',
			replace: true,
			restrict: 'E',
			scope: {
				sortCode: '=ngModel',
				disabled: '@',
				required: '@'
			},
			templateUrl: '../dist/templates/tw-sort-code.html',
			link: TwSortCodeLink
		};

		return directive;
	}

	function TwSortCodeLink(scope, element, attrs, ctrl) {
		if (attrs.ngDisabled) {
			scope.$parent.$watch(attrs.ngDisabled, function(isDisabled) {
				scope.disabled = isDisabled;
			});
		}

		if (attrs.ngRequired) {
			scope.$parent.$watch(attrs.ngRequired, function(isRequired) {
				scope.required = isRequired;
			});
		}

		if (attrs.required) {
			scope.required = true;
		}

		connectInputs(element);
	}

	function connectInputs(element) {
		var inputs = $(element).find("input");

		var keys = {
			delete: 8,
			tab: 9,
			left: 37,
			right: 39
		};

		connectForward(inputs[0], inputs[1]);
		connectForward(inputs[1], inputs[2]);
		connectBack(inputs[1], inputs[0]);
		connectBack(inputs[2], inputs[1]);

		function getCaretPosition(input) {
			if (typeof input.selectionStart === "number") {
				return input.selectionStart;
			}
			// Fallback for ie<8, assume at end of text
			return $(input).val().length;
		}

		function setCaretPositionStart(input) {
			setCaretPosition(input, 0);
		}

		function setCaretPosition(input, pos) {
			if (input.setSelectionRange) {
				input.setSelectionRange(pos, pos);
			} else if (input.createTextRange) {
				var range = input.createTextRange();
				range.collapse(true);
				if (pos < 0) {
					pos = $(input).val().length + pos;
				}
				range.moveEnd('character', pos);
				range.moveStart('character', pos);
				range.select();
			}
		}

		function textIsSelected(current) {
			return (typeof current.selectionStart !== "undefined" &&
				typeof current.selectionEnd !== "undefined" &&
				current.selectionStart !== current.selectionEnd);
		}

		var textWasSelected = false;

		function connectForward(current, next) {
			$(current).on("keyup", function(event) {
				if (textIsSelected(current)) {
					// Text is selected don't do anything fancy
					return true;
				}

				// If we're at the last position move forward on any key
				if (getCaretPosition(current) >= 2 ) {
					$(next).focus();
					setCaretPositionStart(next);
				}

				textWasSelected = false;
			});
		}

		function connectBack(current, previous) {
			$(current).on("keydown", function(event) {
				if (textIsSelected(current)) {
					// Text is selected don't do anything fancy
					return true;
				}

				// If we're at the first position move back on delete or left
				if (getCaretPosition(current) === 0 &&
					(event.which === keys.delete ||
					event.which === keys.left)) {
					$(previous).focus();
					return true;
				}
			});
		}

		// Prevent most keys when input is full
		$(inputs).on("keydown", function(event) {
			var input = this;
			if (textIsSelected(input)) {
				// Text is selected don't do anything fancy
				return true;
			}

			if ($(input).val().length >= 2 &&
				event.which !== keys.delete &&
				event.which !== keys.tab &&
				event.which !== keys.left &&
				event.which !== keys.right
				) {
				return false;
			}
		});
	}

})(window.angular);
