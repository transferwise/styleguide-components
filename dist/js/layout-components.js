angular.module("tw.layout-components", []);
!function(angular) {
    "use strict";
    function Repeat() {
        return {
            transclude: !0,
            template: ' \t\t\t\t<div class="well p-l-panel p-r-panel"  > \t\t\t\t\t<div class="media"> \t\t\t\t\t\t<div class="media-left"> \t\t\t\t\t\t\t<div class="circle circle-sm circle-responsive invisible"> \t\t\t\t\t\t\t\t<i class="icon icon-transfer"></i> \t\t\t\t\t\t\t</div> \t\t\t\t\t\t</div> \t\t\t\t\t\t<div class="media-body"> \t\t\t\t\t\t\t<repeat-transfer \t\t\t\t\t\t\t\tsource="transfer.source" \t\t\t\t\t\t\t\ttarget="transfer.target" \t\t\t\t\t\t\t\tsource-amount="{{transfer.sourceAmount}}" \t\t\t\t\t\t\t\ttarget-amount="{{transfer.targetAmount}}" \t\t\t\t\t\t\t\treceiving-account="transfer.account.id" \t\t\t\t\t\t\t\tcurrencies="$ctrl.currencies"> \t\t\t\t\t\t\t</repeat-transfer> \t\t\t\t\t\t\t<div ng-transclude></div> \t\t\t\t\t\t</div> \t\t\t\t\t</div> \t\t\t\t</div>'
        };
    }
    function Expanded() {
        return {
            transclude: !0,
            template: ' \t\t\t\t<div \tclass="collapse" \t\t\t\t\t\tng-attr-aria-expanded="{{$ctrl.active === transfer.id}}" \t\t\t\t\t\tng-class="{\'in\': $ctrl.active === transfer.id}" \t\t\t\t\t\tng-if="$ctrl.active === transfer.id"> \t\t\t\t\t<div class="p-l-panel p-r-panel p-b-panel"> \t\t\t\t\t\t<div class="media"> \t\t\t\t\t\t\t<div class="media-left"> \t\t\t\t\t\t\t\t<div class="circle circle-sm circle-inverse circle-responsive invisible"> \t\t\t\t\t\t\t\t\t<transfer-type-icon type="transfer.type"></transfer-type-icon> \t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t</div> \t\t\t\t\t\t<div class="media-body"> \t\t\t\t\t\t\t<hr class="m-t-0 hidden-xs hidden-sm" /> \t\t\t\t\t\t\t<a \thref="" ng-click="$ctrl.close(transfer.id)" \t\t\t\t\t\t\t\tclass="visible-xs-inline-block visible-sm-inline-block text-no-decoration m-t-1" \t\t\t\t\t\t\t\tstyle="margin-left: -8px;"> \t\t\t\t\t\t\t<i class="icon icon-left-arrow icon-xxl"></i> \t\t\t\t\t\t\t</a> \t\t\t\t\t\t\t<div ng-transclude></div> \t\t\t\t\t\t</div> \t\t\t\t\t</div> \t\t\t\t</div>'
        };
    }
    function Collapsed() {
        return {
            transclude: !0,
            template: ' \t\t\t\t<div class="p-a-panel" role="button" \t\t\t\t\tng-click="$ctrl.activate(transfer.id, $event)"> \t\t\t\t\t<div class="media"> \t\t\t\t\t\t<div class="media-left"> \t\t\t\t\t\t\t<div class="circle circle-sm circle-responsive" ng-class="{ \t\t\t\t\t\t\t\t\'circle-inverse\': !$ctrl.inactive || (transfer.id === $ctrl.active)}"> \t\t\t\t\t\t\t\t\t<transfer-type-icon type="transfer.type"></transfer-type-icon> \t\t\t\t\t\t\t</div> \t\t\t\t\t\t</div> \t\t\t\t\t\t<div class="media-body" ng-transclude></div> \t\t\t\t\t\t<div class="media-right hidden-xs hidden"> \t\t\t\t\t\t\t<div class="btn-group pull-xs-right"> \t\t\t\t\t\t\t\t<a href="" role="button" class="dropdown-toggle" \t\t\t\t\t\t\t\t\tdata-toggle="dropdown" aria-expanded="false"> \t\t\t\t\t\t\t\t\t<div class="pips"> \t\t\t\t\t\t\t\t\t\t<div class="pip"></div> \t\t\t\t\t\t\t\t\t\t<div class="pip"></div> \t\t\t\t\t\t\t\t\t\t<div class="pip"></div> \t\t\t\t\t\t\t\t\t</div> \t\t\t\t\t\t\t\t</a> \t\t\t\t\t\t\t\t<ul class="dropdown-menu dropdown-menu-right" role="menu"> \t\t\t\t\t\t\t\t\t<li><a href="">Repeat</a></li> \t\t\t\t\t\t\t\t\t<li><a href="">View details</a></li> \t\t\t\t\t\t\t\t</ul> \t\t\t\t\t\t\t</div> \t\t\t\t\t\t</div> \t\t\t\t\t</div> \t\t\t\t</div>'
        };
    }
    function Card() {
        return {
            transclude: !0,
            template: " \t\t\t<li \tclass=\"list-group-item p-a-0\" \t\t\t\t\tng-class=\"{ \t\t\t\t\t\t'list-group-item-danger': transfer.status === 'PAUSED', \t\t\t\t\t\t'list-group-item-warning': transfer.status === 'AWAITING_FUNDS', \t\t\t\t\t\t'list-group-item-info': transfer.status === 'PROCESSING' || transfer.status === 'FUNDED', \t\t\t\t\t\t'list-group-item-success': transfer.status === 'PAID_OUT', \t\t\t\t\t\t'active': $ctrl.active === transfer.id, \t\t\t\t\t\t'disabled': transfer.status === 'CANCELLED' \t\t\t\t\t}\"> \t\t\t\t<div ng-transclude></div> \t\t\t</li>"
        };
    }
    function CardContainer() {
        return {
            controllerAs: "ContainerController",
            bindToController: !0,
            transclude: !0,
            template: '<div ng-transclude class="list-group panel-list-group list-group-slide-out" \t\t\t\t\t\t\tng-class="{\'list-group-inactive\': $ctrl.inactive}"></div>'
        };
    }
    angular.module("tw.layout-components").directive("twActivityCardRepeat", Repeat).directive("twActivityCardExpanded", Expanded).directive("twActivityCardCollapsed", Collapsed).directive("twActivityCard", Card).directive("twActivityCardContainer", CardContainer);
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