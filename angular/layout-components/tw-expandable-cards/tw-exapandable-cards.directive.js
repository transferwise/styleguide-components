(function(angular) {
	'use strict';

	angular
		.module('tw.layout-components')
		.directive('twExpandableCard', Card)
		.directive('twExpandableCards', CardContainer);
		// .service('TransferService', ['$q', TransferService]);

	function Card() {
		return {
			restrict: 'E',
			scope: {
				label: '@'
			},
			require: '^twExpandableCards',
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
				</div> \
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
				</div> \
				<div 	class="well p-l-panel p-r-panel" \
						ng-if="$ctrl.canRepeat(transfer)"> \
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
						</div> \
					</div> \
				</div> \
			</li>',

			link: function($scope, $element, $attrs, $ctrl) {
				$scope.card = {
					label: $scope.label
				};
				$ctrl.addCard($scope.card);
			}
		};
	}

	function CardContainer() {
		return {
			restrict: 'E',
			controllerAs: '$ctrl',
			replace: false,
			scope: {
				transfers: "=",
				currencies: "=",
				inactive: "="
			},
			transclude: true,
			// controllerAs: 'ContainerController',
			template: '<div ng-transclude class="list-group panel-list-group list-group-slide-out" \
				ng-class="{\'list-group-inactive\': $ctrl.inactive}"></div>',
			bindToController: true,
			controller: ['$scope', '$window', '$location', '$rootScope', '$timeout',
			function($scope, $window, $location, $rootScope, $timeout) {
				this.cards = [];
				this.addCard = function addCard(card) {
					this.cards.push(card);
				};

				var $ctrl = this;

				$ctrl.activate = function(id, $event) {
					$ctrl.updateHash(id);
				};

				$ctrl.close = function(id) {
					$ctrl.updateHash(id);
				};

				$ctrl.updateHash = function(id) {
					if ($ctrl.active === id) {
						$location.hash('');
					} else {
						$location.hash(id);
					}
				};
				$ctrl.updateOpenItem = function(id) {
					id = isNaN(parseInt(id)) ? false : parseInt(id);
					if ($ctrl.active === id) {
						$ctrl.active = false;
					} else {
						$ctrl.active = id;
					}
				};

				// Each list must check the hash to see if it should open an item
				$rootScope.$on('$locationChangeSuccess', function(event) {
					$ctrl.updateOpenItem($location.hash());
				});

				$ctrl.canRepeat = function(transfer) {
					return transfer.type !== 'CARD' && transfer.type !== 'REQUEST' &&
						(transfer.status === 'CANCELLED' || transfer.status === 'COMPLETED');
				};
			}],
		};
	}

	// function TransferService($q) {
	// 	this.list = function(filters) {
	// 		var transfers = this.transfers;
	// 		angular.forEach(filters, function(filterValue, filterKey) {
	// 			transfers = transfers.filter(function(transfer) {
	// 				if (angular.isArray(filterValue)) {
	// 					return transfer[filterKey] &&
	// 						filterValue.indexOf(transfer[filterKey]) >= 0;
	// 				} else {
	// 					return transfer[filterKey] === filterValue;
	// 				}
	// 			});
	// 		});
	// 		return $q.when(transfers);
	// 	};

	// 	this.transfers = [{
	// 		id: 1,
	// 		type: "REQUEST",
	// 		source: "GBP",
	// 		target: "USD",
	// 		fixed: "RATE",
	// 		sourceAmount: 10.00,
	// 		targetAmount: 12.34,
	// 		sourceAccount: {
	// 			name: "Mike Marter",
	// 			shortString: "Account ending 1234"
	// 		},
	// 		targetAccount: {
	// 			name: "Steve Pole",
	// 			shortString: "Account ending 1234"
	// 		},
	// 		status: "PAUSED",
	// 		reason: "We received your money. There was a problem with your documents.",
	// 		reference: "Ref123",
	// 		fee: 0.50,
	// 		rate: 1.2345,
	// 		created: "2016-06-30T12:34:56Z",
	// 		updated: "2016-07-01T12:34:56Z",
	// 	},{
	// 		id: 2,
	// 		type: "TRANSFER",
	// 		source: "GBP",
	// 		target: "USD",
	// 		fixed: "TARGET",
	// 		sourceAmount: 10.00,
	// 		targetAmount: 12.34,
	// 		sourceAccount: {
	// 			name: "Steve Pole",
	// 			type: "CARD",
	// 			shortString: "Debit card ending 4321"
	// 		},
	// 		targetAccount: {
	// 			name: "Steve Pole",
	// 			type: "WALLET",
	// 			shortString: "USD balance"
	// 		},
	// 		status: "PROCESSING",
	// 		reason: "We received your money. We're processing your transfer.",
	// 		reference: "Ref123",
	// 		fee: 0.50,
	// 		rate: 1.2345,
	// 		created: "2016-06-30T12:34:56Z",
	// 		updated: "2016-07-01T12:34:56Z",
	// 	},{
	// 		id: 3,
	// 		type: "TRANSFER",
	// 		source: "GBP",
	// 		target: "USD",
	// 		fixed: "SOURCE",
	// 		sourceAmount: 10.00,
	// 		targetAmount: 12.34,
	// 		sourceAccount: {
	// 			name: "Steve Pole",
	// 			type: "CARD",
	// 			shortString: "Debit card ending 4321"
	// 		},
	// 		targetAccount: {
	// 			name: "Steve Pole",
	// 			type: "WALLET",
	// 			shortString: "USD balance"
	// 		},
	// 		status: "CONVERTING",
	// 		reason: "Converting",
	// 		reference: "Ref123",
	// 		fee: 5.50,
	// 		rate: 1.2345,
	// 		created: "2016-06-30T12:34:56Z",
	// 		updated: "2016-07-01T12:34:56Z",
	// 	},{
	// 		id: 4,
	// 		type: "TRANSFER",
	// 		source: "GBP",
	// 		target: "USD",
	// 		fixed: "SOURCE",
	// 		sourceAmount: 10.00,
	// 		targetAmount: 12.34,
	// 		sourceAccount: {
	// 			name: "Steve Pole",
	// 			type: "ACCOUNT",
	// 			shortString: "Account ending 9876"
	// 		},
	// 		targetAccount: {
	// 			name: "Mike Marter",
	// 			shortString: "Account ending 1234"
	// 		},
	// 		status: "AWAITING_FUNDS",
	// 		reason: "Waiting for you to pay in.",
	// 		reference: "Ref123",
	// 		fee: 0.50,
	// 		rate: 1.2345,
	// 		created: "2016-06-30T12:34:56Z",
	// 		updated: "2016-07-01T12:34:56Z",
	// 		batch: 1
	// 	},{
	// 		id: 5,
	// 		type: "TRANSFER",
	// 		source: "GBP",
	// 		target: "USD",
	// 		fixed: "SOURCE",
	// 		sourceAmount: 10000000.00,
	// 		targetAmount: 12345000.00,
	// 		sourceAccount: {
	// 			name: "Steve Pole",
	// 			type: "ACCOUNT",
	// 			shortString: "Account ending 9876"
	// 		},
	// 		targetAccount: {
	// 			name: "Mike Marter",
	// 			shortString: "Account ending 1234"
	// 		},
	// 		status: "FUNDED",
	// 		reason: "We're waiting for your money to arrive in our account.",
	// 		reference: "Ref123",
	// 		fee: 50.00,
	// 		rate: 1.2345,
	// 		created: "2016-06-30T12:34:56Z",
	// 		updated: "2016-07-01T12:34:56Z",
	// 		batch: 1
	// 	},{
	// 		id: 6,
	// 		type: "TRANSFER",
	// 		source: "GBP",
	// 		target: "USD",
	// 		fixed: "SOURCE",
	// 		sourceAmount: 100.00,
	// 		targetAmount: 123.45,
	// 		sourceAccount: {
	// 			name: "Steve Pole",
	// 			type: "CARD",
	// 			shortString: "Debite card ending 4321"
	// 		},
	// 		targetAccount: {
	// 			name: "Steve Pole",
	// 			type: "ACCOUNT",
	// 			shortString: "Account ending 1234"
	// 		},
	// 		status: "PAID_OUT",
	// 		reason: "We've sent out your money, it may take some time to arrive in the account.",
	// 		reference: "Ref123",
	// 		fee: 0.50,
	// 		rate: 1.2345,
	// 		created: "2016-06-30T12:34:56Z",
	// 		updated: "2016-07-01T12:34:56Z",
	// 		completed: "2016-07-01T12:34:56Z"
	// 	},{
	// 		id: 7,
	// 		type: "TRANSFER",
	// 		source: "GBP",
	// 		target: "GBP",
	// 		fixed: "SOURCE",
	// 		sourceAmount: 2.50,
	// 		targetAmount: 2.50,
	// 		sourceAccount: {
	// 			name: "Steve Pole",
	// 			type: "CARD",
	// 			shortString: "Debit card ending 4321"
	// 		},
	// 		targetAccount: {
	// 			name: "Peet's coffee",
	// 			type: "MERCHANT",
	// 			shortString: "Merchant account"
	// 		},
	// 		status: "COMPLETED",
	// 		reference: "Ref123",
	// 		fee: 0.00,
	// 		rate: 1.0000,
	// 		created: "2016-06-30T12:34:56Z",
	// 		updated: "2016-07-01T12:34:56Z",
	// 		completed: "2016-07-01T12:34:56Z"
	// 	},{
	// 		id: 8,
	// 		type: "REQUEST",
	// 		source: "GBP",
	// 		target: "GBP",
	// 		fixed: "SOURCE",
	// 		sourceAmount: 2.50,
	// 		targetAmount: 2.50,
	// 		sourceAccount: {
	// 			name: "Kish Patel",
	// 			type: "ACCOUNT",
	// 			shortString: "Account ending 1234"
	// 		},
	// 		targetAccount: {
	// 			name: "Steve Pole",
	// 			type: "WALLET",
	// 			shortString: "GBP balance"
	// 		},
	// 		status: "COMPLETED",
	// 		reference: "Ref123",
	// 		fee: 0.00,
	// 		rate: 1.0000,
	// 		created: "2016-06-12T12:34:56Z",
	// 		updated: "2016-06-12T12:34:56Z",
	// 		completed: "2016-06-12T12:34:56Z"
	// 	},{
	// 		id: 9,
	// 		type: "TRANSFER",
	// 		source: "GBP",
	// 		target: "EUR",
	// 		fixed: "SOURCE",
	// 		sourceAmount: 10000000.00,
	// 		targetAmount: 11987000.00,
	// 		sourceAccount: {
	// 			name: "Steve Pole",
	// 			type: "ACCOUNT",
	// 			shortString: "Account ending 9876"
	// 		},
	// 		targetAccount: {
	// 			name: "Steve Pole",
	// 			type: "ACCOUNT",
	// 			shortString: "Account ending 1234"
	// 		},
	// 		status: "CANCELLED",
	// 		reference: "NewHouse",
	// 		fee: 500.00,
	// 		rate: 1.1987,
	// 		created: "2016-06-09T12:34:56Z",
	// 		updated: "2016-06-10T12:34:56Z"
	// 	},{
	// 		id: 10,
	// 		type: "TRANSFER",
	// 		source: "GBP",
	// 		target: "GBP",
	// 		fixed: "SOURCE",
	// 		sourceAmount: 100.00,
	// 		targetAmount: 100.00,
	// 		sourceAccount: {
	// 			name: "Steve Pole",
	// 			type: "CARD",
	// 			shortString: "Debit card ending 4321"
	// 		},
	// 		targetAccount: {
	// 			name: "Steve Pole",
	// 			type: "WALLET",
	// 			shortString: "GBP balance"
	// 		},
	// 		status: "COMPLETED",
	// 		reference: "Ref123",
	// 		fee: 0.00,
	// 		rate: 1.0000,
	// 		created: "2016-03-30T12:34:56Z",
	// 		updated: "2016-04-01T12:34:56Z",
	// 		completed: "2016-04-01T12:34:56Z"
	// 	},{
	// 		id: 11,
	// 		type: "TRANSFER",
	// 		source: "EUR",
	// 		target: "GBP",
	// 		fixed: "SOURCE",
	// 		sourceAmount: 100.00,
	// 		targetAmount: 91.23,
	// 		sourceAccount: {
	// 			name: "Steve Pole",
	// 			type: "WALLET",
	// 			shortString: "EUR balance"
	// 		},
	// 		targetAccount: {
	// 			name: "Steve Pole",
	// 			type: "WALLET",
	// 			shortString: "GBP balance"
	// 		},
	// 		status: "COMPLETED",
	// 		reference: "Ref123",
	// 		fee: 0.50,
	// 		rate: 0.9123,
	// 		created: "2016-03-30T12:34:56Z",
	// 		updated: "2016-04-01T12:34:56Z",
	// 		completed: "2016-04-01T12:34:56Z"
	// 	},{
	// 		id: 12,
	// 		type: "REWARD",
	// 		source: "GBP",
	// 		target: "GBP",
	// 		fixed: "SOURCE",
	// 		sourceAmount: 10.00,
	// 		targetAmount: 10.00,
	// 		sourceAccount: {
	// 			name: "TransferWise",
	// 			type: "WALLET",
	// 			shortString: "Referral program"
	// 		},
	// 		targetAccount: {
	// 			name: "Steve Pole",
	// 			type: "WALLET",
	// 			shortString: "GBP balance"
	// 		},
	// 		status: "COMPLETED",
	// 		reference: "Referral Bonus",
	// 		fee: 0.00,
	// 		rate: 1.0000,
	// 		created: "2016-03-30T12:34:56Z",
	// 		updated: "2016-04-01T12:34:56Z",
	// 		completed: "2016-04-01T12:34:56Z"
	// 	}];

	// 	/*
	// 	{
	// 		id: 2,
	// 		type: "TOPUP",
	// 		source: "GBP",
	// 		target: "USD",
	// 		fixed: "SOURCE",
	// 		sourceAmount: 10.00,
	// 		targetAmount: 12.34,
	// 		sourceAccount: {
	// 			name: "Steve Pole",
	// 			type: "CARD",
	// 			shortString: "Debit card ending 4321"
	// 		},
	// 		targetAccount: {
	// 			name: "Steve Pole",
	// 			type: "WALLET",
	// 			shortString: "USD balance"
	// 		},
	// 		status: "PROCESSING",
	// 		reason: "We received your money. We're processing your transfer.",
	// 		reference: "Ref123",
	// 		fee: 0.50,
	// 		rate: 1.2345,
	// 		created: "2016-06-30T12:34:56Z",
	// 		updated: "2016-07-01T12:34:56Z",
	// 	},{
	// 		id: 3,
	// 		type: "TOPUP",
	// 		source: "GBP",
	// 		target: "USD",
	// 		fixed: "SOURCE",
	// 		sourceAmount: 10.00,
	// 		targetAmount: 12.34,
	// 		sourceAccount: {
	// 			name: "Steve Pole",
	// 			type: "CARD",
	// 			shortString: "Debit card ending 4321"
	// 		},
	// 		targetAccount: {
	// 			name: "Steve Pole",
	// 			type: "WALLET",
	// 			shortString: "USD balance"
	// 		},
	// 		status: "CONVERTING",
	// 		reason: "Converting",
	// 		reference: "Ref123",
	// 		fee: 5.50,
	// 		rate: 1.2345,
	// 		created: "2016-06-30T12:34:56Z",
	// 		updated: "2016-07-01T12:34:56Z",
	// 	},{
	// 		id: 7,
	// 		type: "CARD",
	// 		source: "GBP",
	// 		target: "GBP",
	// 		fixed: "SOURCE",
	// 		sourceAmount: 2.50,
	// 		targetAmount: 2.50,
	// 		sourceAccount: {
	// 			name: "Steve Pole",
	// 			type: "CARD",
	// 			shortString: "Debit card ending 4321"
	// 		},
	// 		targetAccount: {
	// 			name: "Peet's coffee",
	// 			type: "MERCHANT",
	// 			shortString: "Merchant account"
	// 		},
	// 		status: "COMPLETED",
	// 		reference: "Ref123",
	// 		fee: 0.00,
	// 		rate: 1.0000,
	// 		created: "2016-06-30T12:34:56Z",
	// 		updated: "2016-07-01T12:34:56Z",
	// 		completed: "2016-07-01T12:34:56Z"
	// 	},{
	// 		id: 10,
	// 		type: "TOPUP",
	// 		source: "GBP",
	// 		target: "GBP",
	// 		fixed: "SOURCE",
	// 		sourceAmount: 100.00,
	// 		targetAmount: 100.00,
	// 		sourceAccount: {
	// 			name: "Steve Pole",
	// 			type: "CARD",
	// 			shortString: "Debit card ending 4321"
	// 		},
	// 		targetAccount: {
	// 			name: "Steve Pole",
	// 			type: "WALLET",
	// 			shortString: "GBP balance"
	// 		},
	// 		status: "COMPLETED",
	// 		reference: "Ref123",
	// 		fee: 0.00,
	// 		rate: 1.0000,
	// 		created: "2016-03-30T12:34:56Z",
	// 		updated: "2016-04-01T12:34:56Z",
	// 		completed: "2016-04-01T12:34:56Z"
	// 	},{
	// 		id: 11,
	// 		type: "CONVERSION",
	// 		source: "EUR",
	// 		target: "GBP",
	// 		fixed: "SOURCE",
	// 		sourceAmount: 100.00,
	// 		targetAmount: 91.23,
	// 		sourceAccount: {
	// 			name: "Steve Pole",
	// 			type: "WALLET",
	// 			shortString: "EUR balance"
	// 		},
	// 		targetAccount: {
	// 			name: "Steve Pole",
	// 			type: "WALLET",
	// 			shortString: "GBP balance"
	// 		},
	// 		status: "COMPLETED",
	// 		reference: "Ref123",
	// 		fee: 0.50,
	// 		rate: 0.9123,
	// 		created: "2016-03-30T12:34:56Z",
	// 		updated: "2016-04-01T12:34:56Z",
	// 		completed: "2016-04-01T12:34:56Z"
	// 	},
	// 	*/
	// }

})(window.angular);
