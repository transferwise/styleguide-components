(function(angular) {
    'use strict';

    angular
        .module('tw.layout-components')
        .directive('twCards', CardContainer)
        .directive('twCard', Card);

    function CardController() {
        var $ctrl = this;
        $ctrl.toggle = function(index) {
            $ctrl.cardContainerController.toggle(index);
        };
    }

    function Card() {
        return {
            require: {cardContainerController: '^twCards'},
            controllerAs: '$ctrl',
            bindToController: true,
            replace: true,
            scope: {
                colour: '@',
                icon: '@',
                form: '<',
                index: '<',
                expanded: '=?',
                disabled: '=?',
                inactive: '<'
            },
            transclude: {
                collapsedCard: 'collapsed',
                expandedCard: 'expandin',
                formCard: '?cardForm'
            },
            controller: [CardController],
            template: templateStr,
            link: function ($scope, $element, $attrs, $ctrl) {
                $ctrl.cardContainerController.addCard($scope.$ctrl);
                $scope.$ctrl.index = $ctrl.cardContainerController.cards.length - 1;
                $scope.$ctrl.inactive = $ctrl.cardContainerController.inactive;

                if($scope.$ctrl.expanded == null){
                    $scope.$ctrl.expanded = false;
                } else {
                    $ctrl.cardContainerController.expandedIdx = $scope.$ctrl.index;
                }
                if($scope.$ctrl.disabled == null){
                    $scope.$ctrl.disabled = false;
                }
            }
        };
    }

    var collapsedCardTemplate =
        '<div class="p-a-panel" role="button" ng-click="$ctrl.toggle($ctrl.index)"> \
            <div class="media"> \
                <div class="media-left"> \
                    <div class="circle circle-sm circle-responsive" ng-class="{ \
                            \'circle-inverse\': !$ctrl.inactive }"> \
                        <transfer-type-icon type="$ctrl.icon"></transfer-type-icon> \
                    </div> \
                </div> \
                <div class="media-body" ng-transclude="collapsedCard"></div> \
            </div> \
        </div>';

    var expandedCardTemplate = 
        '<div   class="collapse" \
                ng-attr-aria-expanded = { $ctrl.expanded } \
                ng-class="{\'in\': $ctrl.expanded }" \
                ng-if = "$ctrl.expanded" > \
            <div class="p-l-panel p-r-panel p-b-panel"> \
                <div class="media"> \
                    <div class="media-left"> \
                        <div class="circle circle-sm circle-inverse circle-responsive invisible"> \
                            <transfer-type-icon type = "$ctrl.icon" ></transfer-type-icon> \
                        </div> \
                    </div> \
                <div class="media-body"> \
                    <hr class="m-t-0 hidden-xs hidden-sm" /> \
                    <a  href="" ng-click="$ctrl.toggle($ctrl.index)" \
                        class="visible-xs-inline-block visible-sm-inline-block text-no-decoration m-t-1" \
                        style="margin-left: -8px;"> \
                        <i class="icon icon-left-arrow icon-xxl"></i> \
                    </a> \
                    <div ng-transclude="expandedCard"></div> \
                </div> \
            </div> \
        </div>';

    var formCardTemplate = 
        '<div class="well p-l-panel p-r-panel" ng-if="$ctrl.form"> \
            <div class="media"> \
                <div class="media-left"> \
                    <div class="circle circle-sm circle-responsive invisible"> \
                        <i class="icon icon-transfer"></i> \
                    </div> \
                </div> \
                <div class="media-body" ng-transclude="formCard"></div> \
            </div> \
        </div>';

    var templateStr = 
        '<li    class="list-group-item p-a-0" \
                ng-class="{ \
                    \'list-group-item-danger\': $ctrl.colour === \'red\', \
                    \'list-group-item-warning\': $ctrl.colour === \'yellow\', \
                    \'list-group-item-info\': $ctrl.colour === \'blue\', \
                    \'list-group-item-success\': $ctrl.colour === \'green\', \
                    \'active\': $ctrl.expanded, \
                    \'disabled\': $ctrl.disabled \
                }">'
            + collapsedCardTemplate + expandedCardTemplate + formCardTemplate + 
        '</li>';

    function CardContainerController(){

        var $ctrl = this;
        $ctrl.cards = [];
        $ctrl.expandedIdx = null; // tracks the expanded card
        $ctrl.addCard = function(expanded) {
            $ctrl.cards.push(expanded);
        };
        $ctrl.toggle = function(index) {
            if($ctrl.expandedIdx != null && $ctrl.expandedIdx !== index){
                $ctrl.cards[$ctrl.expandedIdx].expanded = false;
                $ctrl.expandedIdx = null;
            }
            if($ctrl.cards[index].expanded){
                $ctrl.cards[index].expanded = false;
            } else {
                $ctrl.expandedIdx = index;
                $ctrl.cards[index].expanded = true;
            }
        };
    }

    function CardContainer() {
        return {
            scope: {
                inactive: '=?'
            },
            controllerAs: '$ctrl',
            controller: [CardContainerController],
            bindToController: true,
            transclude: true,
            template:   '<ul ng-transclude class="list-group panel-list-group list-group-slide-out" \
                            ng-class="{\'list-group-inactive\': $ctrl.inactive}"> \
                        </ul>',
        };
    }

})(window.angular);