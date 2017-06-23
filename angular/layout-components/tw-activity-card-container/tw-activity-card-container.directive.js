(function(angular) {
	'use strict';

	angular
		.module('tw.layout-components')
		.directive('twActivityCardRepeat', Repeat)
		.directive('twActivityCardExpanded', Expanded)
		.directive('twActivityCardCollapsed', Collapsed)
		.directive('twActivityCard', Card)
		.directive('twActivityCardContainer', CardContainer);

	function Repeat() {
		return {
			transclude: true,
			template: ' \
				<div class="well p-l-panel p-r-panel" \ ' +
						// ng-if="$ctrl.canRepeat(transfer)"> \ <-- original line, below for testing
						'ng-if="true"> \
					<div class="media"> \
						<div class="media-left"> \
							<div class="circle circle-sm circle-responsive invisible"> \
								<i class="icon icon-transfer"></i> \
							</div> \
						</div> \
						<div class="media-body"> \
							<repeat-transfer \
								source="transfer.source" \
								target="transfer.target" \
								source-amount="{{transfer.sourceAmount}}" \
								target-amount="{{transfer.targetAmount}}" \
								receiving-account="transfer.account.id" \
								currencies="$ctrl.currencies"> \
							</repeat-transfer> \
							<div ng-transclude></div> \
						</div> \
					</div> \
				</div>',
		};
	}

	function Expanded() {
		return {
			transclude: true,
			template: ' \
				<div 	class="collapse" \
						ng-attr-aria-expanded="{{$ctrl.active === transfer.id}}" \
						ng-class="{\'in\': $ctrl.active === transfer.id}" \
						ng-if="$ctrl.active === transfer.id"> \
					<div class="p-l-panel p-r-panel p-b-panel"> \
						<div class="media"> \
							<div class="media-left"> \
								<div class="circle circle-sm circle-inverse circle-responsive invisible"> \
									<transfer-type-icon type="transfer.type"></transfer-type-icon> \
								</div> \
							</div> \
						<div class="media-body"> \
							<hr class="m-t-0 hidden-xs hidden-sm" /> \
							<a 	href="" ng-click="$ctrl.close(transfer.id)" \
								class="visible-xs-inline-block visible-sm-inline-block text-no-decoration m-t-1" \
								style="margin-left: -8px;"> \
							<i class="icon icon-left-arrow icon-xxl"></i> \
							</a> \
							<div ng-transclude></div> \
						</div> \
					</div> \
				</div>',
		};
	}

	function Collapsed() {
		return {
			transclude: true,
			template: ' \
				<div class="p-a-panel" role="button" \
					ng-click="$ctrl.activate(transfer.id, $event)"> \
					<div class="media"> \
						<div class="media-left"> \
							<div class="circle circle-sm circle-responsive" ng-class="{ \
								\'circle-inverse\': !$ctrl.inactive || (transfer.id === $ctrl.active)}"> \
									<transfer-type-icon type="transfer.type"></transfer-type-icon> \
							</div> \
						</div> \
						<div class="media-body" ng-transclude></div> \
						<div class="media-right hidden-xs hidden"> \
							<div class="btn-group pull-xs-right"> \
								<a href="" role="button" class="dropdown-toggle" \
									data-toggle="dropdown" aria-expanded="false"> \
									<div class="pips"> \
										<div class="pip"></div> \
										<div class="pip"></div> \
										<div class="pip"></div> \
									</div> \
								</a> \
								<ul class="dropdown-menu dropdown-menu-right" role="menu"> \
									<li><a href="">Repeat</a></li> \
									<li><a href="">View details</a></li> \
								</ul> \
							</div> \
						</div> \
					</div> \
				</div>',
		};
	}

	function Card() {
		return {
			// require: '^ContainerController',
			transclude: true,
			template: ' \
			<li 	class="list-group-item p-a-0" \
					ng-class="{ \
						\'list-group-item-danger\': transfer.status === \'PAUSED\', \
						\'list-group-item-warning\': transfer.status === \'AWAITING_FUNDS\', \
						\'list-group-item-info\': transfer.status === \'PROCESSING\' || transfer.status === \'FUNDED\', \
						\'list-group-item-success\': transfer.status === \'PAID_OUT\', \
						\'active\': $ctrl.active === transfer.id, \
						\'disabled\': transfer.status === \'CANCELLED\' \
					}"> \
				<div ng-transclude></div> \
			</li>',
		};
	}

	function CardContainer() {
		return {
			controllerAs: 'ContainerController',
			bindToController: true,
			transclude: true,
			template: '<div ng-transclude class="list-group panel-list-group list-group-slide-out" \
							ng-class="{\'list-group-inactive\': $ctrl.inactive}"></div>',
		};
	}

})(window.angular);
