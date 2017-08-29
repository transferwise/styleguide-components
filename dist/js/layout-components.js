!function(modules) {
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    var installedModules = {};
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.i = function(value) {
        return value;
    }, __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            configurable: !1,
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module["default"];
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 3);
}([ function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function TwCardController($transclude, TwCardsService) {
        var $ctrl = this;
        $ctrl.hasForm = $transclude.isSlotFilled("cardForm"), $ctrl.toggle = TwCardsService.toggle, 
        $ctrl.addCard = TwCardsService.addCard, $ctrl.getExpandedIndex = TwCardsService.getExpandedIndex, 
        $ctrl.updateExpandedIndex = TwCardsService.updateExpandedIndex, $ctrl.getCard = TwCardsService.getCard, 
        $ctrl.getLength = TwCardsService.getLength;
    }
    function TwCard() {
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
                open: "<?",
                disabled: "=?",
                inactive: "<"
            },
            transclude: {
                collapsedCard: "collapsed",
                expandedCard: "expanded",
                cardForm: "?cardForm",
                cardIcon: "cardIcon"
            },
            controller: TwCardController,
            template: twCardTemplate,
            link: function($scope, $element, $attrs, $ctrl) {
                var cardController = $scope.$ctrl;
                cardController.addCard(cardController), cardController.index = cardController.getLength() - 1, 
                cardController.inactive = $ctrl.cardContainerController.inactive, cardController.open === !0 && cardController.getExpandedIndex() === -1 ? cardController.updateExpandedIndex(cardController.index) : cardController.open = !1, 
                null == cardController.disabled && (cardController.disabled = !1);
            }
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _twCardsService = __webpack_require__(4), _twCardsService2 = _interopRequireDefault(_twCardsService);
    TwCardController.$inject = [ "$transclude", "TwCardsService" ];
    var collapsedCardTemplate = '   <div class="p-a-panel" role="button" ng-click="$ctrl.toggle($ctrl.index)">     <div class="media">       <div class="media-left">         <div class="circle circle-sm circle-responsive"           ng-class="{ \'circle-inverse\': !$ctrl.inactive }">           <div ng-transclude="cardIcon"></div>         </div>       </div>       <div class="media-body" ng-transclude="collapsedCard"></div>     </div>   </div>', expandedCardTemplate = '   <div class="collapse"     ng-attr-aria-expanded="{{ $ctrl.open }}"     ng-class="{\'in\': $ctrl.open }"     ng-if="$ctrl.open" >     <div class="p-l-panel p-r-panel p-b-panel">       <div class="media">         <div class="media-left">             <div class="circle circle-sm circle-inverse circle-responsive invisible"></div>         </div>         <div class="media-body">           <hr class="m-t-0 hidden-xs hidden-sm" />           <a  href="" ng-click="$ctrl.toggle($ctrl.index)"               class="visible-xs-inline-block visible-sm-inline-block text-no-decoration m-t-1"               style="margin-left: -8px;">               <i class="icon icon-left-arrow icon-xxl"></i>           </a>           <div ng-transclude="expandedCard"></div>         </div>       </div>     </div>   </div>', cardFormTemplate = '<div class="well p-l-panel p-r-panel" ng-if="$ctrl.hasForm">     <div class="media">       <div class="media-left">         <div class="circle circle-sm circle-responsive invisible"></div>       </div>       <div class="media-body" ng-transclude="cardForm"></div>     </div>   </div>', twCardTemplate = "<li class=\"list-group-item p-a-0 list-group-item-{{$ctrl.state}}\"     ng-class=\"{       'active': $ctrl.open,       'disabled': $ctrl.disabled     }\">" + collapsedCardTemplate + expandedCardTemplate + cardFormTemplate + "</li>";
    exports["default"] = angular.module("tw.styleguide.layout.card", []).service("TwCardsService", _twCardsService2["default"]).directive("twCard", TwCard).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var TwCards = {
        bindings: {
            inactive: "=?"
        },
        controller: function() {},
        transclude: !0,
        template: '     <ul ng-transclude       class="list-group panel-list-group list-group-slide-out"       ng-class="{\'list-group-inactive\': $ctrl.inactive}">     </ul>'
    };
    exports["default"] = angular.module("tw.styleguide.layout.cards", []).component("twCards", TwCards).name;
}, function(module, exports) {
    module.exports = angular;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var _angular = __webpack_require__(2), _angular2 = _interopRequireDefault(_angular), _twCardDirective = __webpack_require__(0), _twCardDirective2 = _interopRequireDefault(_twCardDirective), _twCardsComponent = __webpack_require__(1), _twCardsComponent2 = _interopRequireDefault(_twCardsComponent);
    exports["default"] = _angular2["default"].module("tw.layout-components", [ _twCardDirective2["default"], _twCardsComponent2["default"] ]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function TwCardsService() {
        var expandedIndex = -1, cards = [];
        this.toggle = function(index) {
            expandedIndex !== -1 && expandedIndex !== index && (cards[expandedIndex].open = !1, 
            expandedIndex = -1), cards[index].open ? cards[index].open = !1 : (expandedIndex = index, 
            cards[index].open = !0);
        }, this.addCard = function(scope) {
            cards.push(scope);
        }, this.getExpandedIndex = function() {
            return expandedIndex;
        }, this.updateExpandedIndex = function(newExpandedIndex) {
            expandedIndex = newExpandedIndex;
        }, this.getCard = function(index) {
            return cards[index];
        }, this.getLength = function() {
            return cards.length;
        };
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    }), exports["default"] = TwCardsService;
} ]);