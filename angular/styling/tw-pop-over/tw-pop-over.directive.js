(function(angular) {
	angular
		.module('tw.form-styling')
		.directive('twPopOver', TwPopOver);

	function TwPopOver() {
		return {
			restrict: 'A',
			link: function(scope, element) {
				if (!element.popover) {
					console.log("twPopOver requires tooltip from bootstrap.js");
					return;
				}
				var options = {};

				if (!element.attr('data-trigger')) {
					options.trigger = 'focus';
				} else if (element.attr('data-trigger') === 'hover') {
					options.trigger = 'hover focus';
				}
				if (!element.attr('data-placement')) {
					options.placement = 'top';
				}
				if (element.attr('data-content-html')) {
					options.html = true;
				}

				element.popover(options);

				element.prop('tabindex', '0').prop('role', 'button');
			}
		};
	}
})(window.angular);
