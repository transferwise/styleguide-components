(function(angular) {
	'use strict';

	angular
		.module('tw.layout-components')
		.directive('twExpandableCards', TwExpandableCards);

	function TwExpandableCards() {
		return {
			restrict: 'E',
			scope: {
				tabs: '=',
				active: '=',
				onChange: '&'
			},
			controller: TwExpandableCardsController,
			controllerAs : '$ctrl',
			bindToController: true,
			template: " \
			<ul ng-if='$ctrl.tabs.length > 0' \
				class='nav nav-tabs m-b-3'> \
				<li ng-repeat='tab in $ctrl.tabs track by $index' \
					ng-class='{\"active\": $ctrl.active === tab.type}'> \
					<a href='' ng-click='$ctrl.switchTab(tab.type)'> \
						{{tab.label}} \
					</a> \
				</li> \
			</ul>"
		};
	}

	function TwExpandableCardsController() {
		var $ctrl = this;
		$ctrl.switchTab = switchTab;

		if (!$ctrl.active && $ctrl.tabs.length) {
			$ctrl.active = $ctrl.tabs[0].type;
		}

		function switchTab(tab) {
			$ctrl.active = tab;
			if ($ctrl.onChange) {
				$ctrl.onChange(tab);
			}
		}
	}
})(window.angular);
