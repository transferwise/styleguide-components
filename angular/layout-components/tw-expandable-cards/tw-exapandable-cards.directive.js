(function(angular) {
	'use strict';

	angular
		.module('tw.layout-components')
		.directive('twExpandableCard', Card)
		.directive('twExpandableCards', CardContainer);

	function Card() {
		return {
			restrict: 'E',
			scope: {},
			require: '^CardContainer',
			transclude: true,
			template: ' \
				<div class="card"> \
					<div ng-translude></div> \
				</div> \
			',
			link: function($scope, $element, $attrs, $ctrl) {
				$scope.card = {
					content = $scope.content;
				};
				$ctrl.addCard($scope.card);
			}
		};
	}

	function CardContainer() {
		return {
			restrict: 'E',
			scope: {},
			transclude: true,
			controller: function() {
				this.cards = [];
				this.addCard = function addCard(card) {
					this.cards.push(card);
				};
			},
			controllerAs: 'ContainerController',
			template: ' \
				<div class="card-container"> \
					<ul class="card-list"> \
						<li ng-repeat="card in ContainerController.cards"> \
            				<h6 href="" ng-bind="tab.label" \
            					ng-click="ContainerController.expand($index);">boop</h6> \
          				</li> \
					</ul>	\
				</div> \
			'
		};
	}

})(window.angular);
