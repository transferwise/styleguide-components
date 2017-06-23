angular.module("tw.layout-components", []);
!function(angular) {
    "use strict";
    function Card() {
        return {
            restrict: "E",
            scope: {
                label: "@"
            },
            require: "^twExpandableCards",
            transclude: !0,
            template: " \t\t\t<div \tng-transclude class=\"list-group-item p-a-0\" \t\t\t\t\tng-class=\"{ \t\t\t\t\t\t'list-group-item-danger': transfer.status === 'PAUSED', \t\t\t\t\t\t'list-group-item-warning': transfer.status === 'AWAITING_FUNDS', \t\t\t\t\t\t'list-group-item-info': transfer.status === 'PROCESSING' || transfer.status === 'FUNDED', \t\t\t\t\t\t'list-group-item-success': transfer.status === 'PAID_OUT', \t\t\t\t\t\t'active': $ctrl.active === transfer.id, \t\t\t\t\t\t'disabled': transfer.status === 'CANCELLED' \t\t\t\t\t}\"> \t\t\t</div>",
            link: function($scope, $element, $attrs, $ctrl) {
                $scope.card = {
                    label: $scope.label
                }, $ctrl.addCard($scope.card);
            }
        };
    }
    function CardContainer() {
        return {
            restrict: "E",
            controllerAs: "$ctrl",
            replace: !1,
            scope: {
                transfers: "=",
                currencies: "=",
                inactive: "="
            },
            transclude: !0,
            template: '<div ng-transclude class="list-group panel-list-group list-group-slide-out" \t\t\t\tng-class="{\'list-group-inactive\': $ctrl.inactive}"></div>',
            bindToController: !0,
            controller: [ "$scope", "$window", "$location", "$rootScope", "$timeout", function($scope, $window, $location, $rootScope, $timeout) {
                this.cards = [], this.addCard = function(card) {
                    this.cards.push(card);
                };
                var $ctrl = this;
                $ctrl.activate = function(id, $event) {
                    $ctrl.updateHash(id);
                }, $ctrl.close = function(id) {
                    $ctrl.updateHash(id);
                }, $ctrl.updateHash = function(id) {
                    $ctrl.active === id ? $location.hash("") : $location.hash(id);
                }, $ctrl.updateOpenItem = function(id) {
                    id = !isNaN(parseInt(id)) && parseInt(id), $ctrl.active === id ? $ctrl.active = !1 : $ctrl.active = id;
                }, $rootScope.$on("$locationChangeSuccess", function(event) {
                    $ctrl.updateOpenItem($location.hash());
                }), $ctrl.canRepeat = function(transfer) {
                    return "CARD" !== transfer.type && "REQUEST" !== transfer.type && ("CANCELLED" === transfer.status || "COMPLETED" === transfer.status);
                };
            } ]
        };
    }
    function TransferService($q) {
        this.list = function(filters) {
            var transfers = this.transfers;
            return angular.forEach(filters, function(filterValue, filterKey) {
                transfers = transfers.filter(function(transfer) {
                    return angular.isArray(filterValue) ? transfer[filterKey] && filterValue.indexOf(transfer[filterKey]) >= 0 : transfer[filterKey] === filterValue;
                });
            }), $q.when(transfers);
        }, this.transfers = [ {
            id: 1,
            type: "REQUEST",
            source: "GBP",
            target: "USD",
            fixed: "RATE",
            sourceAmount: 10,
            targetAmount: 12.34,
            sourceAccount: {
                name: "Mike Marter",
                shortString: "Account ending 1234"
            },
            targetAccount: {
                name: "Steve Pole",
                shortString: "Account ending 1234"
            },
            status: "PAUSED",
            reason: "We received your money. There was a problem with your documents.",
            reference: "Ref123",
            fee: .5,
            rate: 1.2345,
            created: "2016-06-30T12:34:56Z",
            updated: "2016-07-01T12:34:56Z"
        }, {
            id: 2,
            type: "TRANSFER",
            source: "GBP",
            target: "USD",
            fixed: "TARGET",
            sourceAmount: 10,
            targetAmount: 12.34,
            sourceAccount: {
                name: "Steve Pole",
                type: "CARD",
                shortString: "Debit card ending 4321"
            },
            targetAccount: {
                name: "Steve Pole",
                type: "WALLET",
                shortString: "USD balance"
            },
            status: "PROCESSING",
            reason: "We received your money. We're processing your transfer.",
            reference: "Ref123",
            fee: .5,
            rate: 1.2345,
            created: "2016-06-30T12:34:56Z",
            updated: "2016-07-01T12:34:56Z"
        }, {
            id: 3,
            type: "TRANSFER",
            source: "GBP",
            target: "USD",
            fixed: "SOURCE",
            sourceAmount: 10,
            targetAmount: 12.34,
            sourceAccount: {
                name: "Steve Pole",
                type: "CARD",
                shortString: "Debit card ending 4321"
            },
            targetAccount: {
                name: "Steve Pole",
                type: "WALLET",
                shortString: "USD balance"
            },
            status: "CONVERTING",
            reason: "Converting",
            reference: "Ref123",
            fee: 5.5,
            rate: 1.2345,
            created: "2016-06-30T12:34:56Z",
            updated: "2016-07-01T12:34:56Z"
        }, {
            id: 4,
            type: "TRANSFER",
            source: "GBP",
            target: "USD",
            fixed: "SOURCE",
            sourceAmount: 10,
            targetAmount: 12.34,
            sourceAccount: {
                name: "Steve Pole",
                type: "ACCOUNT",
                shortString: "Account ending 9876"
            },
            targetAccount: {
                name: "Mike Marter",
                shortString: "Account ending 1234"
            },
            status: "AWAITING_FUNDS",
            reason: "Waiting for you to pay in.",
            reference: "Ref123",
            fee: .5,
            rate: 1.2345,
            created: "2016-06-30T12:34:56Z",
            updated: "2016-07-01T12:34:56Z",
            batch: 1
        }, {
            id: 5,
            type: "TRANSFER",
            source: "GBP",
            target: "USD",
            fixed: "SOURCE",
            sourceAmount: 1e7,
            targetAmount: 12345e3,
            sourceAccount: {
                name: "Steve Pole",
                type: "ACCOUNT",
                shortString: "Account ending 9876"
            },
            targetAccount: {
                name: "Mike Marter",
                shortString: "Account ending 1234"
            },
            status: "FUNDED",
            reason: "We're waiting for your money to arrive in our account.",
            reference: "Ref123",
            fee: 50,
            rate: 1.2345,
            created: "2016-06-30T12:34:56Z",
            updated: "2016-07-01T12:34:56Z",
            batch: 1
        }, {
            id: 6,
            type: "TRANSFER",
            source: "GBP",
            target: "USD",
            fixed: "SOURCE",
            sourceAmount: 100,
            targetAmount: 123.45,
            sourceAccount: {
                name: "Steve Pole",
                type: "CARD",
                shortString: "Debite card ending 4321"
            },
            targetAccount: {
                name: "Steve Pole",
                type: "ACCOUNT",
                shortString: "Account ending 1234"
            },
            status: "PAID_OUT",
            reason: "We've sent out your money, it may take some time to arrive in the account.",
            reference: "Ref123",
            fee: .5,
            rate: 1.2345,
            created: "2016-06-30T12:34:56Z",
            updated: "2016-07-01T12:34:56Z",
            completed: "2016-07-01T12:34:56Z"
        }, {
            id: 7,
            type: "TRANSFER",
            source: "GBP",
            target: "GBP",
            fixed: "SOURCE",
            sourceAmount: 2.5,
            targetAmount: 2.5,
            sourceAccount: {
                name: "Steve Pole",
                type: "CARD",
                shortString: "Debit card ending 4321"
            },
            targetAccount: {
                name: "Peet's coffee",
                type: "MERCHANT",
                shortString: "Merchant account"
            },
            status: "COMPLETED",
            reference: "Ref123",
            fee: 0,
            rate: 1,
            created: "2016-06-30T12:34:56Z",
            updated: "2016-07-01T12:34:56Z",
            completed: "2016-07-01T12:34:56Z"
        }, {
            id: 8,
            type: "REQUEST",
            source: "GBP",
            target: "GBP",
            fixed: "SOURCE",
            sourceAmount: 2.5,
            targetAmount: 2.5,
            sourceAccount: {
                name: "Kish Patel",
                type: "ACCOUNT",
                shortString: "Account ending 1234"
            },
            targetAccount: {
                name: "Steve Pole",
                type: "WALLET",
                shortString: "GBP balance"
            },
            status: "COMPLETED",
            reference: "Ref123",
            fee: 0,
            rate: 1,
            created: "2016-06-12T12:34:56Z",
            updated: "2016-06-12T12:34:56Z",
            completed: "2016-06-12T12:34:56Z"
        }, {
            id: 9,
            type: "TRANSFER",
            source: "GBP",
            target: "EUR",
            fixed: "SOURCE",
            sourceAmount: 1e7,
            targetAmount: 11987e3,
            sourceAccount: {
                name: "Steve Pole",
                type: "ACCOUNT",
                shortString: "Account ending 9876"
            },
            targetAccount: {
                name: "Steve Pole",
                type: "ACCOUNT",
                shortString: "Account ending 1234"
            },
            status: "CANCELLED",
            reference: "NewHouse",
            fee: 500,
            rate: 1.1987,
            created: "2016-06-09T12:34:56Z",
            updated: "2016-06-10T12:34:56Z"
        }, {
            id: 10,
            type: "TRANSFER",
            source: "GBP",
            target: "GBP",
            fixed: "SOURCE",
            sourceAmount: 100,
            targetAmount: 100,
            sourceAccount: {
                name: "Steve Pole",
                type: "CARD",
                shortString: "Debit card ending 4321"
            },
            targetAccount: {
                name: "Steve Pole",
                type: "WALLET",
                shortString: "GBP balance"
            },
            status: "COMPLETED",
            reference: "Ref123",
            fee: 0,
            rate: 1,
            created: "2016-03-30T12:34:56Z",
            updated: "2016-04-01T12:34:56Z",
            completed: "2016-04-01T12:34:56Z"
        }, {
            id: 11,
            type: "TRANSFER",
            source: "EUR",
            target: "GBP",
            fixed: "SOURCE",
            sourceAmount: 100,
            targetAmount: 91.23,
            sourceAccount: {
                name: "Steve Pole",
                type: "WALLET",
                shortString: "EUR balance"
            },
            targetAccount: {
                name: "Steve Pole",
                type: "WALLET",
                shortString: "GBP balance"
            },
            status: "COMPLETED",
            reference: "Ref123",
            fee: .5,
            rate: .9123,
            created: "2016-03-30T12:34:56Z",
            updated: "2016-04-01T12:34:56Z",
            completed: "2016-04-01T12:34:56Z"
        }, {
            id: 12,
            type: "REWARD",
            source: "GBP",
            target: "GBP",
            fixed: "SOURCE",
            sourceAmount: 10,
            targetAmount: 10,
            sourceAccount: {
                name: "TransferWise",
                type: "WALLET",
                shortString: "Referral program"
            },
            targetAccount: {
                name: "Steve Pole",
                type: "WALLET",
                shortString: "GBP balance"
            },
            status: "COMPLETED",
            reference: "Referral Bonus",
            fee: 0,
            rate: 1,
            created: "2016-03-30T12:34:56Z",
            updated: "2016-04-01T12:34:56Z",
            completed: "2016-04-01T12:34:56Z"
        } ];
    }
    angular.module("tw.layout-components").directive("twExpandableCard", Card).directive("twExpandableCards", CardContainer).service("TransferService", [ "$q", TransferService ]);
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