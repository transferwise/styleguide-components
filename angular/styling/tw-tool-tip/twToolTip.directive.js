(function(angular) {
	angular
		.module('tw.form-styling')
		.directive('twToolTip', TwToolTip);

	function TwToolTip() {
		return {
			restrict: 'A',
			link: function(scope, element) {
				if (!element.tooltip) {
					console.log('twToolTip requires bootstrap.js');
					return;
				}
				var options = {};
				if (!element.attr('data-placement')) {
					options.placement = 'top';
				}
				element.tooltip(options);
				element.prop('tabindex', '0');
			}
		};
	}
})(window.angular);
