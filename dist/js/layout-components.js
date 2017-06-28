angular.module("tw.layout-components", []);
!function(angular) {
    "use strict";
    function CardController() {
        var $ctrl = this;
        $ctrl.toggle = function(index) {
            $ctrl.cardContainerController.toggle(index);
        };
    }
    function Card() {
        return {
            require: {
                cardContainerController: "^twCards"
            },
            controllerAs: "$ctrl",
            bindToController: !0,
            replace: !0,
            scope: {
                colour: "@",
                icon: "@",
                form: "<",
                index: "<",
                expanded: "=?",
                disabled: "=?",
                inactive: "<"
            },
            transclude: {
                collapsedCard: "collapsed",
                expandedCard: "expandin",
                formCard: "?cardForm"
            },
            controller: CardController,
            template: templateStr,
            link: function($scope, $element, $attrs, $ctrl) {
                $ctrl.cardContainerController.addCard($scope.$ctrl), $scope.$ctrl.index = $ctrl.cardContainerController.cards.length - 1, 
                $scope.$ctrl.inactive = $ctrl.cardContainerController.inactive, null == $scope.$ctrl.expanded ? $scope.$ctrl.expanded = !1 : $ctrl.cardContainerController.expandedIdx = $scope.$ctrl.index, 
                null == $scope.$ctrl.disabled && ($scope.$ctrl.disabled = !1);
            }
        };
    }
    function CardContainerController() {
        var $ctrl = this;
        $ctrl.cards = [], $ctrl.expandedIdx = null, $ctrl.addCard = function(expanded) {
            $ctrl.cards.push(expanded);
        }, $ctrl.toggle = function(index) {
            null != $ctrl.expandedIdx && $ctrl.expandedIdx !== index && ($ctrl.cards[$ctrl.expandedIdx].expanded = !1, 
            $ctrl.expandedIdx = null), $ctrl.cards[index].expanded ? $ctrl.cards[index].expanded = !1 : ($ctrl.expandedIdx = index, 
            $ctrl.cards[index].expanded = !0);
        };
    }
    function CardContainer() {
        return {
            scope: {
                inactive: "=?"
            },
            controllerAs: "$ctrl",
            controller: CardContainerController,
            bindToController: !0,
            transclude: !0,
            template: '<ul ng-transclude class="list-group panel-list-group list-group-slide-out"                             ng-class="{\'list-group-inactive\': $ctrl.inactive}">                         </ul>'
        };
    }
    angular.module("tw.layout-components").directive("twCards", CardContainer).directive("twCard", Card);
    var collapsedCardTemplate = '<div class="p-a-panel" role="button" ng-click="$ctrl.toggle($ctrl.index)">             <div class="media">                 <div class="media-left">                     <div class="circle circle-sm circle-responsive" ng-class="{                             \'circle-inverse\': !$ctrl.inactive }">                         <transfer-type-icon type="$ctrl.icon"></transfer-type-icon>                     </div>                 </div>                 <div class="media-body" ng-transclude="collapsedCard"></div>             </div>         </div>', expandedCardTemplate = '<div   class="collapse"                 ng-attr-aria-expanded="{{ $ctrl.expanded }}"                 ng-class="{\'in\': $ctrl.expanded }"                 ng-if="$ctrl.expanded" >             <div class="p-l-panel p-r-panel p-b-panel">                 <div class="media">                     <div class="media-left">                         <div class="circle circle-sm circle-inverse circle-responsive invisible">                             <transfer-type-icon type = "$ctrl.icon" ></transfer-type-icon>                         </div>                     </div>                 <div class="media-body">                     <hr class="m-t-0 hidden-xs hidden-sm" />                     <a  href="" ng-click="$ctrl.toggle($ctrl.index)"                         class="visible-xs-inline-block visible-sm-inline-block text-no-decoration m-t-1"                         style="margin-left: -8px;">                         <i class="icon icon-left-arrow icon-xxl"></i>                     </a>                     <div ng-transclude="expandedCard"></div>                 </div>             </div>         </div>', formCardTemplate = '<div class="well p-l-panel p-r-panel" ng-if="$ctrl.form">             <div class="media">                 <div class="media-left">                     <div class="circle circle-sm circle-responsive invisible">                         <i class="icon icon-transfer"></i>                     </div>                 </div>                 <div class="media-body" ng-transclude="formCard"></div>             </div>         </div>', templateStr = "<li    class=\"list-group-item p-a-0\"                 ng-class=\"{                     'list-group-item-danger': $ctrl.colour === 'red',                     'list-group-item-warning': $ctrl.colour === 'yellow',                     'list-group-item-info': $ctrl.colour === 'blue',                     'list-group-item-success': $ctrl.colour === 'green',                     'active': $ctrl.expanded,                     'disabled': $ctrl.disabled                 }\">" + collapsedCardTemplate + expandedCardTemplate + formCardTemplate + "</li>";
}(window.angular);