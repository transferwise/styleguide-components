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
            scope: {
                colour: "@",
                icon: "@",
                form: "<",
                index: "<",
                expanded: "=?",
                disabled: "=?"
            },
            transclude: {
                collapsedCard: "collapsed",
                expandedCard: "expandin",
                formCard: "?cardForm"
            },
            controller: [ CardController ],
            template: templateStr,
            link: function($scope, $element, $attrs, $ctrl) {
                $ctrl.cardContainerController.addCard($scope.$ctrl), $scope.$ctrl.index = $ctrl.cardContainerController.cards.length - 1, 
                null == $scope.$ctrl.expanded ? $scope.$ctrl.expanded = !1 : $ctrl.cardContainerController.expandedIdx = $scope.$ctrl.index, 
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
            scope: {},
            controllerAs: "$ctrl",
            controller: [ CardContainerController ],
            bindToController: !0,
            transclude: !0,
            template: '<ul ng-transclude class="list-group panel-list-group list-group-slide-out"                             ng-class="{\'list-group-inactive\': $ctrl.inactive}">                         </ul>'
        };
    }
    angular.module("tw.layout-components").directive("twCards", CardContainer).directive("twCard", Card);
    var collapsedCardTemplate = '<div class="p-a-panel" role="button" ng-click="$ctrl.toggle($ctrl.index)">             <div class="media">                 <div class="media-left">                     <div class="circle circle-sm circle-responsive circle-inverse">                         <transfer-type-icon type="$ctrl.icon"></transfer-type-icon>                     </div>                 </div>                 <div class="media-body" ng-transclude="collapsedCard"></div>             </div>         </div>', expandedCardTemplate = '<div   class="collapse"                 ng-attr-aria-expanded = { $ctrl.expanded }                 ng-class="{\'in\': $ctrl.expanded }"                 ng-if = "$ctrl.expanded" >             <div class="p-l-panel p-r-panel p-b-panel">                 <div class="media">                     <div class="media-left">                         <div class="circle circle-sm circle-inverse circle-responsive invisible">                             <transfer-type-icon type = "$ctrl.icon" ></transfer-type-icon>                         </div>                     </div>                 <div class="media-body">                     <hr class="m-t-0 hidden-xs hidden-sm" />                     <a  href="" ng-click="$ctrl.toggle($ctrl.index)"                         class="visible-xs-inline-block visible-sm-inline-block text-no-decoration m-t-1"                         style="margin-left: -8px;">                         <i class="icon icon-left-arrow icon-xxl"></i>                     </a>                     <div ng-transclude="expandedCard"></div>                 </div>             </div>         </div>', formCardTemplate = '<div class="well p-l-panel p-r-panel" ng-if="$ctrl.form">             <div class="media">                 <div class="media-left">                     <div class="circle circle-sm circle-responsive invisible">                         <i class="icon icon-transfer"></i>                     </div>                 </div>                 <div class="media-body" ng-transclude="formCard"></div>             </div>         </div>', templateStr = "<li    class=\"list-group-item p-a-0\"                 ng-class=\"{                     'list-group-item-danger': $ctrl.colour === 'red',                     'list-group-item-warning': $ctrl.colour === 'yellow',                     'list-group-item-info': $ctrl.colour === 'blue',                     'list-group-item-success': $ctrl.colour === 'green',                     'active': $ctrl.expanded,                     'disabled': $ctrl.disabled                 }\">" + collapsedCardTemplate + expandedCardTemplate + formCardTemplate + "</li>";
}(window.angular), function(angular) {
    "use strict";
    function TwRequirementsService() {
        function getFieldNamesFromRequirement(modelRequirement) {
            if (!modelRequirement.fields) return [];
            var names = modelRequirement.fields.map(function(fieldGroup) {
                return fieldGroup.group.map(function(field) {
                    return field.key;
                });
            });
            return Array.prototype.concat.apply([], names);
        }
        function prepType(type) {
            type.label || (type.label = getTabName(type.type));
        }
        function getTabName(tabType) {
            if (tabType && tabType.length > 0) {
                var tabNameWithSpaces = tabType.toLowerCase().split("_").join(" ");
                return tabNameWithSpaces.charAt(0).toUpperCase() + tabNameWithSpaces.slice(1);
            }
            return "";
        }
        this.cleanRequirementsModel = function(model, oldRequirements, newRequirements) {
            var oldFieldNames = getFieldNamesFromRequirement(oldRequirements), newFieldNames = getFieldNamesFromRequirement(newRequirements), obsoleteFieldNames = oldFieldNames.filter(function(fieldName) {
                return newFieldNames.indexOf(fieldName) < 0;
            });
            obsoleteFieldNames.forEach(function(fieldName) {
                delete model[fieldName];
            });
        }, this.cleanModel = function(model, oldRequirements, oldType, newRequirements, newType) {
            var oldRequirementType = this.findRequirementByType(oldType, oldRequirements), newRequirementType = this.findRequirementByType(newType, newRequirements);
            this.cleanRequirementsModel(model, oldRequirementType, newRequirementType);
        }, this.findRequirementByType = function(type, requirements) {
            if (!requirements) return !1;
            for (var i = 0; i < requirements.length; i++) {
                var modelType = requirements[i];
                if (modelType.type === type) return modelType;
            }
            return !1;
        }, this.prepRequirements = function(types) {
            types.forEach(function(type) {
                prepType(type);
            });
        };
    }
    angular.module("tw.form-components").service("TwRequirementsService", TwRequirementsService);
}(window.angular), function(angular) {
    "use strict";
    function TwCurrencyData() {
        var currencyDecimals = {
            BIF: 0,
            BYR: 0,
            CLP: 0,
            DJF: 0,
            GNF: 0,
            JPY: 0,
            KMF: 0,
            KRW: 0,
            MGA: 0,
            PYG: 0,
            RWF: 0,
            VND: 0,
            VUV: 0,
            XAF: 0,
            XOF: 0,
            XPF: 0,
            HUF: 0,
            BHD: 3,
            JOD: 3,
            KWD: 3,
            OMR: 3,
            TND: 3
        };
        this.getDecimals = function(currency) {
            return currency.toUpperCase && "undefined" != typeof currencyDecimals[currency.toUpperCase()] ? currencyDecimals[currency.toUpperCase()] : 2;
        };
    }
    angular.module("tw.form-components").service("TwCurrencyData", TwCurrencyData);
}(window.angular), function(angular) {
    "use strict";
    function TwDateService() {
        function getLocalisedDateName(date, locale, formattingObject) {
            var name = date.toLocaleDateString(locale, formattingObject).replace(/[0-9]|\s/g, "");
            return name[0].toUpperCase() + name.substring(1);
        }
        function getValidDateFormat(format) {
            var validFormats = [ "narrow", "short", "long" ];
            return !format || validFormats.indexOf(format) < 0 ? "long" : format;
        }
        function getValidLocale(locale) {
            return isIntlSupportedForLocale(locale) ? locale : "en-GB";
        }
        function isIntlSupportedForLocale(locale) {
            try {
                var supportedLocales = window.Intl.DateTimeFormat.supportedLocalesOf([ locale ]);
                return supportedLocales.length > 0;
            } catch (error) {
                return !1;
            }
        }
        this.getLocaleDate = function(date) {
            return date || (date = new Date()), date.getDate();
        }, this.getLocaleMonth = function(date) {
            return date || (date = new Date()), date.getMonth();
        }, this.getLocaleFullYear = function(date) {
            return date || (date = new Date()), date.getFullYear();
        }, this.getLocaleToday = function() {
            var now = new Date();
            return this.getUTCDateFromParts(this.getLocaleFullYear(now), this.getLocaleMonth(now), this.getLocaleDate(now));
        }, this.getUTCDate = function(date) {
            return date || (date = new Date()), date.getUTCDate();
        }, this.getUTCMonth = function(date) {
            return date || (date = new Date()), date.getUTCMonth();
        }, this.getUTCFullYear = function(date) {
            return date || (date = new Date()), date.getUTCFullYear();
        }, this.getUTCToday = function() {
            var now = new Date();
            return this.getUTCDateFromParts(this.getUTCFullYear(now), this.getUTCMonth(now), this.getUTCDate(now));
        }, this.getLastDayOfMonth = function(year, month) {
            var lastDay = this.getUTCDateFromParts(year, month + 1, 0);
            return lastDay.getUTCDate();
        }, this.getUTCDateFromParts = function(year, month, day) {
            var date = new Date();
            return date.setUTCFullYear(year, month, day), date.setUTCHours(0), date.setUTCMinutes(0), 
            date.setUTCSeconds(0), date.setUTCMilliseconds(0), date;
        }, this.getDayNamesForLocale = function(locale, format) {
            format = getValidDateFormat(format), locale = getValidLocale(locale);
            for (var date, days = [], i = 1; i <= 7; i++) date = this.getUTCDateFromParts(2001, 0, i), 
            days.push(getLocalisedDateName(date, locale, {
                weekday: format
            }));
            return days;
        }, this.getMonthNamesForLocale = function(locale, format) {
            format = getValidDateFormat(format), locale = getValidLocale(locale);
            for (var date, months = [], i = 0; i < 12; i++) date = this.getUTCDateFromParts(2e3, i, 15), 
            months.push(getLocalisedDateName(date, locale, {
                month: format
            }));
            return months;
        }, this.getWeekday = function(year, month, day) {
            var utcDate = this.getUTCDateFromParts(year, month, day);
            return utcDate.getUTCDay();
        }, this.isMonthBeforeDay = function(locale) {
            return locale.indexOf("US", locale.length - 2) !== -1;
        }, this.addYears = function(date, years) {
            return this.addToDate(date, years, 0, 0);
        }, this.addMonths = function(date, months) {
            return this.addToDate(date, 0, months, 0);
        }, this.addDays = function(date, days) {
            return this.addToDate(date, 0, 0, days);
        }, this.addToDate = function(date, years, months, days) {
            return this.getUTCDateFromParts(date.getUTCFullYear() + years, date.getUTCMonth() + months, date.getUTCDate() + days);
        };
    }
    angular.module("tw.form-components").service("TwDateService", TwDateService);
}(window.angular);