'use strict';

describe('Directive: TwDateLookup', function() {
    var $compile,
        $rootScope,
        $scope,
        element;

    beforeEach(module('tw.form-components'));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
        $scope = $rootScope.$new();
    }));

    var ENGLISH_MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    var LOCALES = {
        en: 'en-GB',
        fr: 'fr-FR',
        es: 'es-ES',
        us: 'en-US'
    };

    var BUTTON_SELECTOR = '.tw-date-lookup-button',
      MODEL_DATE_SELECTOR = '.tw-date-lookup-selected',
      PLACEHOLDER_SELECTOR = '.tw-date-lookup-placeholder';

    describe('init', function() {
        describe('when empty input $scope is passed', function () {
            beforeEach(function () {
                $scope.ngModel = null;
                element = getCompiledDirectiveElement($scope);
            });
            it('should leave date model undefined', function () {
                expect($scope.ngModel).toBe(null);
            });
            it('should show not show selected date', function () {
                expect(element.find(MODEL_DATE_SELECTOR).length).toBe(0);
            });
            it('should show placeholder', function () {
                expect(element.find(PLACEHOLDER_SELECTOR).length).toBe(1);
            });
            it('should default to English day/month names', function () {
                // TODO
            });
            it('should open on current month', function () {
                // TODO
            });
            it('should open on current year', function () {
                // TODO
            });
        });
        describe('when date model input $scope is passed', function () {
            describe('as valid Date instance', function () {
                var dateModel;
                beforeEach(function () {
                    dateModel = getUTCDate(1990, 7, 21);
                    $scope.ngModel = dateModel;
                    element = getCompiledDirectiveElement($scope);
                });
                it('should select correct date in calendar', function () {
                  // TODO
                });
                it('should open on the month containing selected date', function () {
                  // TODO
                });
                it('should leave date model as it was defined', function () {
                    expect($scope.ngModel).toBe(dateModel);
                });
            });
            describe('as something other than valid Date instance', function () {
                it('should ...', function () {
                    // TODO
                });
            });
        });

        describe('when ngRequired==true', function () {
            var ngModelController;
            it('and model is null, should be $invalid', function () {
                $scope.ngModel = null;
                $scope.ngRequired = true;
                element = getCompiledDirectiveElement($scope);
                ngModelController = element.controller('ngModel');

                expect(ngModelController.$invalid).toBe(true);
                expect(element.hasClass('ng-valid')).toBe(false);
                expect(element.hasClass('ng-invalid')).toBe(true);
                expect(element.hasClass('ng-invalid-required')).toBe(true);
            });
            it('and model is valid, should be $valid', function () {
                $scope.ngModel = '2000-01-01';
                $scope.ngRequired = true;
                element = getCompiledDirectiveElement($scope);
                ngModelController = element.controller('ngModel');

                expect(ngModelController.$valid).toBe(true);
                expect(element.hasClass('ng-valid')).toBe(true);
                expect(element.hasClass('ng-invalid')).toBe(false);
                expect(element.hasClass('ng-invalid-required')).toBe(false);
            });
        });
        describe('when ngDisabled==true', function () {
            it('should be disabled', function () {
                $scope.ngModel = null;
                $scope.ngDisabled = true
                element = getCompiledDirectiveElement($scope);
                expect(element.find(BUTTON_SELECTOR).attr('disabled')).toBeDefined();
            });
        });
        describe('when ngDisabled==false', function () {
            it('should not be disabled', function () {
                $scope.ngModel = null;
                $scope.ngDisabled = false;
                element = getCompiledDirectiveElement($scope);
                expect(element.find(BUTTON_SELECTOR).attr('disabled')).toBeUndefined();
            });
        });

        describe('when locale attribute is passed', function () {
            var twLocale = 'fr';
            beforeEach(function () {
                $scope.ngModel = null;
                $scope.locale = twLocale;
                element = getCompiledDirectiveElement($scope);
            });

            if (isIntlSupportedForLocale(twLocale)) {
                it('should populate vm.months based on vm.locale', function () {
                    expectDateMonthsToBeLocalized(element, twLocale);
                });
            } else {
                it('should populate vm.months with default English months', function () {
                    expectDateMonthsToBeDefault(element);
                });
            }
        });

        describe('when ngMin and ngMax are supplied', function () {
            var ngModelController;
            describe('as valid date object', function () {
                beforeEach(function() {
                    $scope.ngModel = null;
                    $scope.ngMin = new Date(1990, 0, 1);
                    $scope.ngMax = new Date(2015, 11, 31);
                    element = getCompiledDirectiveElement($scope);
                    ngModelController = element.controller('ngModel');
                });
                it('and ngModel is null, should not set invalid min/max', function() {
                    expect(ngModelController.$invalid).toBe(false);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);
                });
                it('and ngModel is earlier than min, should set ngModel to invalid ', function() {
                    $scope.ngModel = new Date('1980-01-01');
                    $scope.$digest();
                    expect(ngModelController.$invalid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(true);
                    expect(element.hasClass('ng-invalid-min')).toBe(true);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);
                });
                it('and ngModel is later than max, should set ngModel to invalid', function() {
                    $scope.ngModel = new Date('2020-01-01');
                    $scope.$digest();
                    expect(ngModelController.$invalid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(true);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(true);
                });
                it('and ngModel is between min and max, should set ngModel to valid', function() {
                    $scope.ngModel = new Date('2000-01-01');
                    $scope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(false);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);
                });
            });
            describe('as invalid Date objects', function () {
                beforeEach(function() {
                    $scope.ngModel = null;
                    $scope.ngMin = new Date('invalid');
                    $scope.ngMax = new Date('invalid');
                    element = getCompiledDirectiveElement($scope);
                    ngModelController = element.controller('ngModel');
                })
                it('should set ngModel to valid', function() {
                    $scope.ngModel = new Date('2000-01-01');
                    $scope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(false);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);
                });
            });
        });
    });

    describe('watchers on shared $scope', function() {
        describe(', change to ngModel', function() {
            var dayInput, monthInput, yearInput,
                monthModelController;

            beforeEach(function() {
                $scope.ngModel = new Date('1989-02-20');
                element = getCompiledDirectiveElement($scope);
            });
            it('should update selected date if valid', function() {
                $scope.ngModel = new Date('1990-01-12');
                $scope.$digest();
                // TODO
            });
            it('should null value if invalid', function() {
                $scope.ngModel = new Date('invalid');
                $scope.$digest();
                // TODO
            });
        });
        /*
        describe('ngRequired', function() {
            var dayInput, monthInput, yearInput;
            beforeEach(function() {
                $scope.ngModel = null;
                $scope.ngRequired = true;
                element = getCompiledDirectiveElement($scope);
                dayInput = element.find(DAY_SELECTOR);
                monthInput = element.find(MONTH_SELECTOR);
                yearInput = element.find(YEAR_SELECTOR);
            });
            it('should require controls', function() {
                expect(dayInput.is(':required')).toBe(true);
                //expect(monthInput.is(':required')).toBe(true);
                expect(yearInput.is(':required')).toBe(true);
            });

            it('should not require controls on change', function() {
                $scope.ngRequired = false;
                $scope.$digest();

                expect(dayInput.is(':required')).toBe(false);
                //expect(monthInput.is(':required')).toBe(false);
                expect(yearInput.is(':required')).toBe(false);
            });
        });
        */
        describe('ngDisabled', function() {
            var buttonInput;
            beforeEach(function() {
                $scope.ngModel = null;
                $scope.ngDisabled = true;
                element = getCompiledDirectiveElement($scope);
                buttonInput = element.find(BUTTON_SELECTOR);
            });
            it('should disable controls', function() {
                expect(buttonInput.is(':disabled')).toBe(true);
            });
            it('should reenable controls on change', function() {
                $scope.ngDisabled = false;
                $scope.$digest();
                expect(buttonInput.is(':disabled')).toBe(false);
            });
        });
        /*
        describe('twLocale', function() {
            var oldLocale = LOCALES.es,
                newLocale = LOCALES.fr;

            beforeEach(function() {
                $scope.ngModel = null;
                $scope.locale = oldLocale;
                element = getCompiledDirectiveElement($scope);

                $scope.locale = newLocale;
                $scope.$digest();
            });

            if (isIntlSupportedForLocale(newLocale)) {
                it('should update vm.dateMonths based on vm.locale', function () {
                    expectDateMonthsToBeLocalized(element, newLocale);
                });
            } else {
                it('should populate vm.dateMonths with default English months', function () {
                    expectDateMonthsToBeDefault(element);
                });
            }

            it('should show day before month if locale not US', function () {
                $scope.locale = LOCALES.fr;
                $scope.$digest();
                var dayInput = element.find('.tw-date-day-column'),
                    monthInput = element.find('.tw-date-month-column');

                expect(dayInput.index()).toBeLessThan(monthInput.index());
            });
            it('should show month before day if locale is US', function () {
                $scope.locale = LOCALES.us;
                $scope.$digest();
                var dayInput = element.find('.tw-date-day-column'),
                    monthInput = element.find('.tw-date-month-column');

                expect(dayInput.index()).toBeGreaterThan(monthInput.index());
            });
        });
        */
    });

    describe('user interactions', function() {
        var element, ngModelController,
            buttonInput, monthInput, yearInput;

        beforeEach(function() {
            $scope.ngModel = '2001-01-01';
            element = getCompiledDirectiveElement($scope);
            ngModelController = element.controller('ngModel');

            dayInput = element.find(DAY_SELECTOR);
            monthInput = element.find(MONTH_SELECTOR);
            yearInput = element.find(YEAR_SELECTOR);
        });
    });

    function getUTCDate(year, month, day) {
      var dateModel = new Date();
      dateModel.setUTCFullYear(year, month, day);
      dateModel.setUTCHours(0);
      dateModel.setUTCMinutes(0);
      dateModel.setUTCSeconds(0);
      dateModel.setUTCMilliseconds(0);
      return dateModel;
    }

    function expectDateMonthsToBeLocalized(element, locale) {
        var vm = getViewModel(element);
        var localizedMonthNames = getMonthNamesForLocale(locale);
        localizedMonthNames.forEach(function(monthName, index) {
            expect(vm.dateMonths[index].value).toBe(index);

            var upperCaseMonthName = monthName[0].toUpperCase() + monthName.substring(1);
            expect(vm.dateMonths[index].label).toBe(upperCaseMonthName);
        });
    }
    function expectDateMonthsToBeDefault(element) {
        var vm = getViewModel(element);
        ENGLISH_MONTHS.forEach(function(monthName, index) {
            expect(vm.dateMonths[index].value).toBe(index);
            expect(vm.dateMonths[index].label).toBe(monthName);
        });
    }

    function isIntlSupportedForLocale(locale) {
        return window.Intl &&
            typeof window.Intl === 'object' &&
            window.Intl.DateTimeFormat.supportedLocalesOf([locale]).length > 0;
    }

    function getMonthNamesForLocale(locale) {
        var monthNames = [], date = new Date(1990, 0, 14);
        if (isIntlSupportedForLocale(locale)) {
            for (var i=0; i<12; i++) {
                date.setMonth(i);
                monthNames.push(date.toLocaleDateString(locale, {month: 'long'}));
            }
        }
        return monthNames;
    }

    function getCompiledDirectiveElement(scope, template) {
        if (!template) {
            template = " \
                <tw-date-lookup \
                    ng-model='ngModel' \
                    ng-required='ngRequired' \
                    ng-disabled='ngDisabled' \
                    ng-min='ngMin' \
                    ng-max='ngMax' \
                    locale='{{locale}}'> \
                </tw-date-lookup>";
        }

        var element = angular.element(template);
        var compiledElement = $compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }

    function getViewModel(element) {
        return element.isolateScope().vm;
    }
});
