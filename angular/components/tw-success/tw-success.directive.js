(function(angular) {
	'use strict';

	angular
		.module('tw.form-components')
		.directive('twSuccess', twSuccessDirective);

	function twSuccessDirective() {
		return {
			restrict: 'E',
			replace: true,
			template: "\
			<div class='tick-container'>\
				<div class='tick-arm-container'>\
					<div class='tick-arm-1'></div>\
					<div class='tick-arm-2'></div>\
				</div>\
				<svg version='1.1'\
					xmlns='http://www.w3.org/2000/svg'\
					x='0px' y='0px'\
					width='136px' height='136px'\
					viewBox='0 0 136 136'\
					enable-background='new 0 0 136 136' xml:space='preserve'>\
					<circle class='tick-circle-animate'\
						fill-opacity='0.0'\
						stroke='#2ED06E'\
						stroke-width='3'\
						stroke-linejoin='miter'\
						stroke-linecap='round'\
						stroke-miterlimit='10'\
						stroke-opacity='1'\
						cx='68'\
						cy='68'\
						r='63'\
						transform='rotate(-90 68 68)'/>\
				</svg>\
			</div>"
		};
	}
})(window.angular);