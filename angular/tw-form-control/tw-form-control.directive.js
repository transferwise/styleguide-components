/*
(function(angular) {
	'use strict';

	angular
		.module('tw.styleguide-components')
		.directive('formControl', TwActiveFormControl);

	function TwActiveFormControl(FileUrlService) {
		return {
			restrict: 'C',
			link: function(scope, element, attrs, ctrl) {
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
			}
		};
	}
})(window.angular);
*/
