angular.module("tw.form-styling", []);
!function(angular) {
    "use strict";
    function TwCurrencyFormat() {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(scope, element, attrs, ngModel) {
                function formatCurrency(value) {
                    if (OSREC && value) {
                        var currency = getCurrencyCode(attrs);
                        return OSREC.CurrencyFormatter.format(value, {
                            currency: currency,
                            symbol: ""
                        }).trim();
                    }
                    return value;
                }
                function parseCurrency(value) {
                    if (OSREC && value) {
                        var currency = getCurrencyCode(attrs), decimalSeparator = getDecimalSeparator(currency);
                        return parseString(value, decimalSeparator);
                    }
                    return value;
                }
                function getCurrencyCode(attrs) {
                    return attrs.twCurrencyFormat ? attrs.twCurrencyFormat.toUpperCase() : "GBP";
                }
                function getDecimalSeparator(currency) {
                    var zeroCase = OSREC.CurrencyFormatter.getFormatter({
                        currency: currency,
                        symbol: ""
                    })(0).trim();
                    return zeroCase[1];
                }
                function parseString(amountString, decimalSeparator) {
                    var sections = amountString.split(decimalSeparator), integerString = sections[0].replace(/[^0-9]/g, ""), decimalString = sections[1] ? sections[1].trim() : "00", integerValue = Number(integerString), decimalValue = getDecimalValue(decimalString);
                    return integerValue + decimalValue;
                }
                function getDecimalValue(decimalString) {
                    return decimalString.length > 1 ? Number(decimalString.substring(0, 2)) / 100 : Number(decimalString) / 10;
                }
                ngModel.$formatters.push(formatCurrency), ngModel.$parsers.push(parseCurrency), 
                element.on("blur", function() {
                    ngModel.$setViewValue(formatCurrency(ngModel.$modelValue)), ngModel.$render();
                }), scope.$watch(function() {
                    return attrs.twCurrencyFormat;
                }, function(newVal) {
                    ngModel.$setViewValue(formatCurrency(ngModel.$modelValue)), ngModel.$render();
                });
            }
        };
    }
    angular.module("tw.form-styling").directive("twCurrencyFormat", TwCurrencyFormat);
}(window.angular), function(angular) {
    "use strict";
    function TwFormControlStyling() {
        return {
            restrict: "C",
            link: FocusableLink
        };
    }
    function TwFocusable() {
        return {
            restrict: "A",
            link: FocusableLink
        };
    }
    function FocusableLink(scope, element) {
        var formGroup = $(element).closest(".form-group");
        $(element).on("focus", function() {
            formGroup.addClass("focus");
        }).on("blur", function() {
            formGroup.removeClass("focus");
        });
    }
    angular.module("tw.form-styling").directive("formControl", TwFormControlStyling), 
    angular.module("tw.form-styling").directive("twFocusable", TwFocusable);
}(window.angular);