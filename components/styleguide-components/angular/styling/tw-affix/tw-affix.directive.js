(function(angular) {
	angular
		.module('tw.form-styling')
		.directive('twAffix', TwAffix);

	function TwAffix() {
		return {
			restrict: 'A',
			link: function(scope, element) {
				if (!element.affix) {
					console.log('twAffix requires bootstrap.js');
					return;
				}
				var tag = element[0];
				var options = {};
				if (tag.getAttribute('data-offset-top') || tag.getAttribute('data-offset-bottom')) {
					options.offset = {};
				}
				if (tag.getAttribute('data-offset-top') &&
						Number(tag.getAttribute('data-offset-top'))) {
					options.offset.top = Number(tag.getAttribute('data-offset-top'));
				}
				if (tag.getAttribute('data-offset-bottom') &&
						Number(tag.getAttribute('data-offset-bottom'))) {
					options.offset.bottom = Number(tag.getAttribute('data-offset-bottom'));
				}
				element.affix(options);
			}
		};
	}

})(window.angular);
