(function(angular) {
	'use strict';

	angular
		.module('tw.layout-components')
		.directive('twExpandableCards', TwExpandableCards);

	function TwExpandableCards() {
		return {
		   	restrict: 'E',
		   	scope: {},
		   	transclude: true,
		   	controller: function () {
		   		this.tabs = [];
		   	},
		   	controllerAs: 'tabs',
		   	template: ' \
		   	  	<div class="tabs"> \
		   	  	  	<ul class="tabs__list"></ul> \
		   	  	  	<div class="tabs__content" ng-transclude></div> \
		   	  	</div> \
		   	'
		};
	}

	function TwExpandableCardsController() {
		this.tabs = [];
	}
})(window.angular);
