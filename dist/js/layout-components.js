angular.module("tw.layout-components", []);
!function(angular) {
    "use strict";
    function CollExample() {
        return {
            transclude: {
                collBody: "?middle",
                collRight: "right"
            },
            template: '                 <div class="media">                     <div class="media-body" ng-transclude="collBody"></div>                     <div class="media-right text-xs-right" ng-transclude="collRight"></div>                 </div>'
        };
    }
    function ExpExample() {
        return {
            transclude: {
                expHead: "heading",
                expBody: "?middle",
                expButt: "buttons"
            },
            template: '                 <div>                     <div class="m-t-1 m-b-3 visible-xs-block visible-sm-block" ng-transclude="expHead"></div>                     <div ng-transclude="expBody"></div>                     <hr class="hidden-xs hidden-sm hidden-md">                     <div class="m-t-2 btn-toolbar" ng-transclude="expButt"></div>                 </div>'
        };
    }
    function FrmExample() {
        return {
            template: '                 <div class="row ">                     <div class="col-sm-6 col-lg-4">                         <div class="form-group m-b-0">                             <label class="control-label">Send</label>                             <div class="input-group">                                 <span class="input-group-addon ">£</span>                                 <input class="form-control text-xs-right p-r-0" type="text">                                 <span class="input-group-addon p-l-1 ">USD</span>                             </div>                             <div class="help-block m-b-0 ">Rate £1 = £1.2345</div>                         </div>                     </div>                     <div class="col-sm-6 col-lg-4 m-b-0">                         <div class="form-group m-b-0">                             <label class="control-label">Receive about </label>                             <div class="input-group">                                 <span class="input-group-addon ">£</span>                                 <input class="form-control text-xs-right p-r-0" type="text">                                 <span class="input-group-addon p-l-1 ">USD</span>                             </div>                             <div class="help-block m-b-0 ">Fee £1.00 USD</div>                         </div>                     </div>                     <div class="col-sm-12 col-lg-4 p-t-3 m-b-0">                         <button class="btn btn-success btn-block">Repeat transfer</button>                     </div>                 </div>'
        };
    }
    function CardController($transclude, TwCardsService) {
        var $ctrl = this;
        $ctrl.hasForm = $transclude.isSlotFilled("cardForm"), $ctrl.toggle = TwCardsService.toggle, 
        $ctrl.addCard = TwCardsService.addCard, $ctrl.getExpandedIndex = TwCardsService.getExpandedIndex, 
        $ctrl.updateExpandedIndex = TwCardsService.updateExpandedIndex, $ctrl.getCard = TwCardsService.getCard, 
        $ctrl.getLength = TwCardsService.getLength;
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
                state: "@",
                index: "<",
                enlarged: "<?",
                disabled: "=?",
                inactive: "<"
            },
            transclude: {
                collapsedCard: "collapsed",
                expandedCard: "expanded",
                cardForm: "?cardForm",
                cardIcon: "cardIcon"
            },
            controller: [ "$transclude", "TwCardsService", CardController ],
            template: templateStr,
            link: function($scope, $element, $attrs, $ctrl) {
                var crdctrl = $scope.$ctrl;
                crdctrl.addCard(crdctrl), crdctrl.index = crdctrl.getLength() - 1, crdctrl.inactive = $ctrl.cardContainerController.inactive, 
                crdctrl.enlarged === !0 && crdctrl.getExpandedIndex() === -1 ? crdctrl.updateExpandedIndex(crdctrl.index) : crdctrl.enlarged = !1, 
                null == crdctrl.disabled && (crdctrl.disabled = !1);
            }
        };
    }
    function CardContainerController() {}
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
    angular.module("tw.layout-components").directive("twCards", CardContainer).directive("twCard", Card).directive("formExample", FrmExample).directive("expandExample", ExpExample).directive("collapseExample", CollExample);
    var collapsedCardTemplate = '<div class="p-a-panel" role="button" ng-click="$ctrl.toggle($ctrl.index)">             <div class="media">                 <div class="media-left">                     <div class="circle circle-sm circle-responsive" ng-class="{                             \'circle-inverse\': !$ctrl.inactive }">                         <div ng-transclude="cardIcon"></div>                     </div>                 </div>                 <div class="media-body" ng-transclude="collapsedCard"></div>             </div>         </div>', expandedCardTemplate = '<div   class="collapse"                 ng-attr-aria-expanded="{{ $ctrl.enlarged }}"                 ng-class="{\'in\': $ctrl.enlarged }"                 ng-if="$ctrl.enlarged" >             <div class="p-l-panel p-r-panel p-b-panel">                 <div class="media">                     <div class="media-left">                         <div class="circle circle-sm circle-inverse circle-responsive invisible"></div>                     </div>                 <div class="media-body">                     <hr class="m-t-0 hidden-xs hidden-sm" />                     <a  href="" ng-click="$ctrl.toggle($ctrl.index)"                         class="visible-xs-inline-block visible-sm-inline-block text-no-decoration m-t-1"                         style="margin-left: -8px;">                         <i class="icon icon-left-arrow icon-xxl"></i>                     </a>                     <div ng-transclude="expandedCard"></div>                 </div>             </div>         </div>', cardFormTemplate = '<div class="well p-l-panel p-r-panel" ng-if="$ctrl.hasForm">             <div class="media">                 <div class="media-left">                     <div class="circle circle-sm circle-responsive invisible"></div>                 </div>                 <div class="media-body" ng-transclude="cardForm"></div>             </div>         </div>', templateStr = "<li    class=\"list-group-item p-a-0 list-group-item-{{$ctrl.state}}\"                 ng-class=\"{                     'active': $ctrl.enlarged,                     'disabled': $ctrl.disabled                 }\">" + collapsedCardTemplate + expandedCardTemplate + cardFormTemplate + "</li>";
}(window.angular);