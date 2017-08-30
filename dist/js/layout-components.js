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
    var _cardsService = __webpack_require__(0), _cardsService2 = _interopRequireDefault(_cardsService), _cardDirective = __webpack_require__(5), _cardDirective2 = _interopRequireDefault(_cardDirective), _cardsComponent = __webpack_require__(6), _cardsComponent2 = _interopRequireDefault(_cardsComponent);
    exports["default"] = angular.module("tw.styleguide.layout.cards", []).service("TwCardsService", _cardsService2["default"]).component("twCards", _cardsComponent2["default"]).directive("twCard", _cardDirective2["default"]).name;
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
    var _angular = __webpack_require__(2), _angular2 = _interopRequireDefault(_angular), _cards = __webpack_require__(1), _cards2 = _interopRequireDefault(_cards);
    exports["default"] = _angular2["default"].module("tw.layout-components", [ _cards2["default"] ]).name;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    var CardController = function CardController($transclude, CardsService) {
        _classCallCheck(this, CardController), this.hasForm = $transclude.isSlotFilled("cardForm"), 
        this.toggle = CardsService.toggle, this.addCard = CardsService.addCard, this.getExpandedIndex = CardsService.getExpandedIndex, 
        this.updateExpandedIndex = CardsService.updateExpandedIndex, this.getCard = CardsService.getCard, 
        this.getLength = CardsService.getLength;
    };
    CardController.$inject = [ "$transclude", "TwCardsService" ], exports["default"] = CardController;
}, function(module, exports, __webpack_require__) {
    "use strict";
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            "default": obj
        };
    }
    function Card() {
        return {
            controller: _cardController2["default"],
            template: _card2["default"],
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
    var _cardsService = __webpack_require__(0), _cardController = (_interopRequireDefault(_cardsService), 
    __webpack_require__(4)), _cardController2 = _interopRequireDefault(_cardController), _card = __webpack_require__(7), _card2 = _interopRequireDefault(_card);
    exports["default"] = Card;
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
    var _cards = __webpack_require__(8), _cards2 = _interopRequireDefault(_cards), TwCards = {
        template: _cards2["default"],
        bindings: {
            inactive: "=?"
        },
        transclude: !0
    };
    exports["default"] = TwCards;
}, function(module, exports) {
    module.exports = '<li class="list-group-item p-a-0 list-group-item-{{$ctrl.state}}"\n  ng-class="{\n    \'active\': $ctrl.open,\n    \'disabled\': $ctrl.disabled\n  }">\n\n  <div class="p-a-panel" role="button" ng-click="$ctrl.toggle($ctrl.index)">\n    <div class="media">\n      <div class="media-left">\n        <div class="circle circle-sm circle-responsive"\n          ng-class="{\'circle-inverse\': !$ctrl.inactive }">\n          <div ng-transclude="cardIcon"></div>\n        </div>\n      </div>\n      <div class="media-body" ng-transclude="collapsedCard"></div>\n    </div>\n  </div>\n\n  <div class="collapse"\n    ng-attr-aria-expanded="{{ $ctrl.open }}"\n    ng-class="{\'in\': $ctrl.open }"\n    ng-if="$ctrl.open" >\n\n    <div class="p-l-panel p-r-panel p-b-panel">\n      <div class="media">\n        <div class="media-left">\n          <div class="circle circle-sm circle-inverse circle-responsive invisible"></div>\n        </div>\n        <div class="media-body">\n          <hr class="m-t-0 hidden-xs hidden-sm" />\n          <a href="" ng-click="$ctrl.toggle($ctrl.index)"\n            class="visible-xs-inline-block visible-sm-inline-block text-no-decoration m-t-1 tw-card-back">\n            <span class="icon icon-left-arrow icon-xxl"></span>\n          </a>\n          <div ng-transclude="expandedCard"></div>\n        </div>\n      </div>\n    </div>\n\n    <div class="well p-l-panel p-r-panel" ng-if="$ctrl.hasForm">\n      <div class="media">\n        <div class="media-left">\n          <div class="circle circle-sm circle-responsive invisible"></div>\n        </div>\n        <div class="media-body" ng-transclude="cardForm"></div>\n      </div>\n    </div>\n\n  </div>\n</li>\n';
}, function(module, exports) {
    module.exports = '<ul ng-transclude\n  class="list-group panel-list-group list-group-slide-out"\n  ng-class="{\'list-group-inactive\': $ctrl.inactive}">\n</ul>\n';
} ]);