(function(angular) {
	angular
		.module('tw.form-styling')
		.directive('twPopOver', TwPopOver);

	function TwPopOver() {
		return {
			restrict: 'A',
			link: function(scope, element) {
				if (!element.popover) {
					console.log("twPopover requires tooltip from bootstrap.js");
					return;
				}
				var options = {};

				if (element.attr('data-link-text') &&
						element.attr('data-link-target')) {
					// Custom template with link
					options.template = " \
						<div class='popover' role='tooltip'> \
							<div class='arrow'></div> \
							<h3 class='popover-title'></h3> \
							<div class='popover-content'></div> \
							<a href='" + element.attr('data-link-target') + "'>" +
								element.attr('data-link-text') +
							"</a> \
						</div>";
				}

				if (!element.attr('data-trigger')) {
					options.trigger = 'focus';
				}
				if (!element.attr('data-placement')) {
					options.placement = 'top';
				}

				element.popover(options);

				element.prop('tabindex', '0').prop('role', 'button');
			}
		};
	}
})(window.angular);
