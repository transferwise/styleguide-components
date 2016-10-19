'use strict';

describe('Directive: TwDate', function() {
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

    var DAY_SELECTOR = 'input[name=day]';
    var MONTH_SELECTOR = 'input[name=month]';
    var YEAR_SELECTOR = 'input[name=year]';

    describe('init', function() {
        describe('when empty input $scope is passed', function () {
            beforeEach(function () {
                $scope.ngModel = null;
                element = getCompiledDirectiveElement($scope);
            });
            it('should leave date model undefined', function () {
                expect($scope.ngModel).toBe(null);
            });
            it('should set date control to empty', function () {
                expect(element.find(DAY_SELECTOR).val()).toBe('');
            });
            it('should set month control to first value', function () {
                expect(element.find(MONTH_SELECTOR).val()).toEqual('0');
                expect(element.find('.tw-select-selected').text().trim()).toEqual('January');
            });
            it('should set year control to empty', function () {
                expect(element.find(YEAR_SELECTOR).val()).toBe('');
            });
            it('should return an updated date as an object', function() {
                setDateUsingControls(element, '2000', '0', '1');
                expect($scope.ngModel).toEqual(new Date(Date.UTC(2000, 0, 1)));
            });
            it('should populate vm.months based on vm.locale if supported', function () {
                if (isIntlSupportedForLocale('en')) {
                    expectDateMonthsToBeLocalized(element, 'en');
                }
            });
            it('should populate vm.months with default English months', function () {
                if (!isIntlSupportedForLocale('en')) {
                    expectDateMonthsToBeDefault(element);
                }
            });
        });
        describe('when date model input $scope is passed', function () {
            describe('as valid short ISO8601 string', function () {
                beforeEach(function () {
                    $scope.ngModel = '1990-08-21';
                    element = getCompiledDirectiveElement($scope);
                });
                it('should set control values correctly', function () {
                    expect(element.find(DAY_SELECTOR).val()).toBe('21');
                    expect(element.find(MONTH_SELECTOR).val()).toBe('7');
                    expect(element.find(YEAR_SELECTOR).val()).toBe('1990');
                });
                it('should leave date model as it was defined', function () {
                    expect($scope.ngModel).toBe('1990-08-21');
                });
                it('should return an updated date as a string', function() {
                    setDateUsingControls(element, '2000', '0', '1');
                    expect(typeof $scope.ngModel).toBe('string');
                    //expect($scope.ngModel).toBe('2000-01-01');
                });
            });
            describe('as valid Date instance', function () {
                var dateModel;
                beforeEach(function () {
                    dateModel = new Date(1990, 7, 21);
                    $scope.ngModel = dateModel;
                    element = getCompiledDirectiveElement($scope);
                });
                it('should set control values correctly', function () {
                    expect(element.find(DAY_SELECTOR).val()).toBe('21');
                    expect(element.find(MONTH_SELECTOR).val()).toBe('7');
                    expect(element.find(YEAR_SELECTOR).val()).toBe('1990');
                });
                it('should leave date model as it was defined', function () {
                    expect($scope.ngModel).toBe(dateModel);
                });
                it('should return an updated date as an object', function() {
                    setDateUsingControls(element, '2000', '0', '1');
                    expect(typeof $scope.ngModel).toBe('object');
                    //expect($scope.ngModel).toEqual(new Date(2000, 0, 1));
                })
            });
            describe('as valid long ISO8601 string', function () {
                var dateString;
                beforeEach(function () {
                    dateString = '1990-02-28T00:00:00.000Z';
                    $scope.ngModel = dateString;
                    element = getCompiledDirectiveElement($scope);
                });
                it('should set control values correctly', function () {
                    expect(element.find(DAY_SELECTOR).val()).toBe('28');
                    expect(element.find(MONTH_SELECTOR).val()).toBe('1');
                    expect(element.find(YEAR_SELECTOR).val()).toBe('1990');
                });
                it('should leave date model unchanged', function () {
                    expect($scope.ngModel).toBe(dateString);
                });
                it('should return an updated date as a string', function() {
                    setDateUsingControls(element, '2000', '0', '1');
                    expect(typeof $scope.ngModel).toBe('string');
                    //expect($scope.ngModel).toEqual('2000-01-01');
                })
            });
            describe('as invalid ISO8601 string', function () {
                it('should throw error', function () {
                    expect(function () {
                        $scope.ngModel = 'invalid'
                        getCompiledDirectiveElement($scope);
                    }).toThrow();

                    // TODO Is this test desired behaviour?
                });
            });
            describe('as invalid Date instance', function () {
                it('should throw error', function () {
                    expect(function () {
                        $scope.ngModel = new Date('invalid');
                        getCompiledDirectiveElement($scope);
                    }).toThrow();

                    // TODO Is this test desired behaviour?
                });
            });
        });
        describe('when modelType attribute is passed', function () {
            var template = " \
                <tw-date \
                    ng-model='ngModel' \
                    model-type='{{modelType}}'> \
                </tw-date>";

            describe('as "string"', function () {
                beforeEach(function() {
                    $scope.ngModel = null;
                    $scope.modelType = 'string';
                    element = getCompiledDirectiveElement($scope, template);
                });
                it('should return updated date model correctly', function () {
                    setDateUsingControls(element, '1990', '6', '15');
                    expect($scope.ngModel).toEqual('1990-07-15');
                });
            });
            describe('as "object"', function () {
                beforeEach(function() {
                    $scope.ngModel = null;
                    $scope.modelType = 'object';
                    element = getCompiledDirectiveElement($scope, template);
                });
                it('should return updated date model correctly', function () {
                    setDateUsingControls(element, '1990', '6', '15');
                    expect($scope.ngModel).toEqual(new Date(Date.UTC(1990, 6, 15)));

                });
            });
            describe('as invalid model type', function () {
                it('should throw error', function () {
                    expect(function() {
                        $scope.ngModel = null;
                        $scope.modelType = 'pokemon';
                        element = getCompiledDirectiveElement($scope, template);
                    }).toThrow();
                });
            });
        });
        describe('when ngRequired input $scope is passed', function () {
            var ngModelController;
            it('should be $invalid when model is null', function () {
                $scope.ngModel = null;
                $scope.ngRequired = true;
                element = getCompiledDirectiveElement($scope);
                ngModelController = element.controller('ngModel');

                expect(ngModelController.$invalid).toBe(true);
                expect(element.hasClass('ng-valid')).toBe(false);
                expect(element.hasClass('ng-invalid')).toBe(true);
                expect(element.hasClass('ng-invalid-required')).toBe(true);
            });
            it('should be $valid when model is valid date', function () {
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
        describe('when required attribute is passed', function () {
            var ngModelController,
                template = "<tw-date ng-model='ngModel' required></tw-date>";

            it('should be $invalid when model is null', function () {
                $scope.ngModel = null;
                element = getCompiledDirectiveElement($scope, template);
                ngModelController = element.controller('ngModel');

                expect(ngModelController.$invalid).toBe(true);
                expect(element.hasClass('ng-valid')).toBe(false);
                expect(element.hasClass('ng-invalid')).toBe(true);
                expect(element.hasClass('ng-invalid-required')).toBe(true);
            });
            it('should be $valid when model is valid date', function () {
                $scope.ngModel = '2000-01-01';
                element = getCompiledDirectiveElement($scope, template);
                ngModelController = element.controller('ngModel');

                expect(ngModelController.$valid).toBe(true);
                expect(element.hasClass('ng-valid')).toBe(true);
                expect(element.hasClass('ng-invalid')).toBe(false);
                expect(element.hasClass('ng-invalid-required')).toBe(false);
            });
        });
        describe('when ngDisabled=true', function () {
            it('should be disabled', function () {
                $scope.ngModel = null;
                $scope.ngDisabled = true
                element = getCompiledDirectiveElement($scope);
                expect(element.find(DAY_SELECTOR).attr('disabled')).toBeDefined();
                expect(element.find(MONTH_SELECTOR).attr('disabled')).toBeDefined();
                expect(element.find(YEAR_SELECTOR).attr('disabled')).toBeDefined();
            });
        });
        describe('when ngDisabled=false', function () {
            it('should not be disabled', function () {
                $scope.ngModel = null;
                $scope.ngDisabled = false;
                element = getCompiledDirectiveElement($scope);
                expect(element.find(DAY_SELECTOR).attr('disabled')).not.toBeDefined();
                expect(element.find(MONTH_SELECTOR).attr('disabled')).not.toBeDefined();
                expect(element.find(YEAR_SELECTOR).attr('disabled')).not.toBeDefined();
            });
        });
        describe('when disabled=true', function () {
            it('should be disabled', function () {
                var template = "<tw-date ng-model='ngModel' disabled></tw-date>";
                $scope.ngModel = null;
                element = getCompiledDirectiveElement($scope, template);
                expect(element.find(DAY_SELECTOR).attr('disabled')).toBeDefined();
                expect(element.find(MONTH_SELECTOR).attr('disabled')).toBeDefined();
                expect(element.find(YEAR_SELECTOR).attr('disabled')).toBeDefined();
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

        describe('when ngMin, ngMax input $scope are passed', function () {
            var ngModelController;
            describe('as valid strings', function () {
                beforeEach(function() {
                    $scope.ngModel = null;
                    $scope.ngMin = '1990-01-01';
                    $scope.ngMax = '2015-12-31';
                    element = getCompiledDirectiveElement($scope);
                    ngModelController = element.controller('ngModel');
                });
                it('should not set invalid when ngModel is null', function() {
                    expect(ngModelController.$invalid).toBe(false);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);
                });
                it('should set ngModel to invalid when date is earlier', function() {
                    $scope.ngModel = new Date('1980-01-01');
                    $scope.$digest();
                    expect(ngModelController.$invalid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(true);
                    expect(element.hasClass('ng-invalid-min')).toBe(true);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);
                });
                it('should set ngModel to invalid when date is later', function() {
                    $scope.ngModel = new Date('2020-01-01');
                    $scope.$digest();
                    expect(ngModelController.$invalid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(true);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(true);
                });
                it('should set ngModel to valid when date is between min and max', function() {
                    $scope.ngModel = new Date('2000-01-01');
                    $scope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(false);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);
                });
            });
            describe('as invalid strings', function () {
                beforeEach(function() {
                    $scope.ngModel = null;
                    $scope.ngMin = 'invalid';
                    $scope.ngMax = 'invalid';
                    element = getCompiledDirectiveElement($scope);
                    ngModelController = element.controller('ngModel');
                });
                it('should set ngModel to valid when any date used', function() {
                    $scope.ngModel = new Date('1980-01-01');
                    $scope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(false);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);

                    $scope.ngModel = new Date('9999-01-01');
                    $scope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(false);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);
                });
            });
            describe('as valid dates', function () {
                beforeEach(function() {
                    $scope.ngModel = null;
                    $scope.ngMin = new Date(1990, 0, 1);
                    $scope.ngMax = new Date(2015, 11, 31);
                    element = getCompiledDirectiveElement($scope);
                    ngModelController = element.controller('ngModel');
                });
                it('should not set invalid min/max when ngModel is null', function() {
                    expect(ngModelController.$invalid).toBe(false);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);
                });
                it('should set ngModel to invalid when date is earlier', function() {
                    $scope.ngModel = new Date('1980-01-01');
                    $scope.$digest();
                    expect(ngModelController.$invalid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(true);
                    expect(element.hasClass('ng-invalid-min')).toBe(true);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);
                });
                it('should set ngModel to invalid when date is later', function() {
                    $scope.ngModel = new Date('2020-01-01');
                    $scope.$digest();
                    expect(ngModelController.$invalid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(true);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(true);
                });
                it('should set ngModel to valid when date is between min and max', function() {
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
                it('should set ngModel to valid when low date used', function() {
                    $scope.ngModel = new Date('2000-01-01');
                    $scope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(false);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);
                });
                it('should set ngModel to valid when high date used', function() {
                    $scope.ngModel = new Date('2000-01-01');
                    $scope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(false);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);
                });
            });
        });
        describe('when min, max attributes are passed', function () {
            var ngModelController;
            describe('as valid strings', function () {
                beforeEach(function () {
                    $scope.ngModel = null;
                    $scope.min = '1990-01-01';
                    $scope.max = '2015-12-31';

                    var template = "<tw-date ng-model='ngModel' min='{{min}}' max='{{max}}'></tw-date>";
                    element = getCompiledDirectiveElement($scope, template);
                    ngModelController = element.controller('ngModel');
                });
                it('should not set invalid min/max when ngModel is null', function() {
                    expect(ngModelController.$invalid).toBe(false);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);
                });
                it('should set ngModel to invalid when date is earlier', function() {
                    $scope.ngModel = new Date('1980-01-01');
                    $scope.$digest();
                    expect(ngModelController.$invalid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(true);
                    expect(element.hasClass('ng-invalid-min')).toBe(true);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);
                });
                it('should set ngModel to invalid when date is later', function() {
                    $scope.ngModel = new Date('2020-01-01');
                    $scope.$digest();
                    expect(ngModelController.$invalid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(true);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(true);
                });
                it('should set ngModel to valid when date is between min and max', function() {
                    $scope.ngModel = new Date('2000-01-01');
                    $scope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(false);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);
                });
            });
            describe('as invalid strings', function () {
                beforeEach(function () {
                    $scope.ngModel = null;
                    $scope.min = 'invalid';
                    $scope.max = 'invalid';
                    var template = "<tw-date ng-model='ngModel' min='{{min}}' max='{{max}}'></tw-date>";
                    element = getCompiledDirectiveElement($scope, template);
                    ngModelController = element.controller('ngModel');
                });

                it('should set ngModel to valid when any date used', function() {
                    $scope.ngModel = new Date('1000-01-01');
                    $scope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(false);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);

                    $scope.ngModel = new Date('9999-01-01');
                    $scope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(element.hasClass('ng-invalid')).toBe(false);
                    expect(element.hasClass('ng-invalid-min')).toBe(false);
                    expect(element.hasClass('ng-invalid-max')).toBe(false);
                });
            });
        });
        describe('when both ngMmin and min attributes are passed', function () {
            var ngModelController,
                template = "<tw-date ng-model='ngModel' ng-min='ngMin' min='{{min}}'></tw-date>";

            it('should set ngModel to valid when min > date > ngMin', function() {
                $scope.ngModel = null;
                $scope.ngMin = '2000-01-01';
                $scope.min = '2010-01-01';

                element = getCompiledDirectiveElement($scope, template);
                ngModelController = element.controller('ngModel');

                $scope.ngModel = new Date('2005-01-01');
                $scope.$digest();
                expect(ngModelController.$valid).toBe(true);
                expect(element.hasClass('ng-invalid')).toBe(false);
            });
            it('should set ngModel to invalid when ngMin > date > min', function() {
                $scope.ngModel = null;
                $scope.ngMin = '2010-01-01';
                $scope.min = '2000-01-01';

                element = getCompiledDirectiveElement($scope, template);
                ngModelController = element.controller('ngModel');

                $scope.ngModel = new Date('2005-01-01');
                $scope.$digest();
                expect(ngModelController.$invalid).toBe(true);
                expect(element.hasClass('ng-invalid')).toBe(true);
            });
        });
    });

    describe('watchers on shared $scope', function() {
        describe('ngModel', function() {
            var dayInput, monthInput, yearInput,
                monthModelController;

            beforeEach(function() {
                $scope.ngModel = new Date('1989-02-20');
                element = getCompiledDirectiveElement($scope);
                dayInput = element.find(DAY_SELECTOR);
                monthInput = element.find(MONTH_SELECTOR);
                yearInput = element.find(YEAR_SELECTOR);
            });
            it('should re-explode date correctly if new date is valid', function() {
                $scope.ngModel = new Date('1990-01-12');
                $scope.$digest();

                expect(dayInput.val()).toBe('12');
                expect(monthInput.val()).toBe('0');
                expect(yearInput.val()).toBe('1990');
            });
            it('should not re-explode date if new date is not valid', function() {
                $scope.ngModel = new Date('invalid');
                $scope.$digest();

                expect(dayInput.val()).toBe('20');
                expect(monthInput.val()).toBe('1');
                expect(yearInput.val()).toBe('1989');
            });
        });
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
        describe('ngDisabled', function() {
            var dayInput, monthInput, yearInput;
            beforeEach(function() {
                $scope.ngModel = null;
                $scope.ngDisabled = true;
                element = getCompiledDirectiveElement($scope);
                dayInput = element.find(DAY_SELECTOR);
                monthInput = element.find(MONTH_SELECTOR);
                yearInput = element.find(YEAR_SELECTOR);
            });
            it('should disable controls', function() {
                expect(dayInput.is(':disabled')).toBe(true);
                expect(monthInput.is(':disabled')).toBe(true);
                expect(yearInput.is(':disabled')).toBe(true);
            });
            it('should enable controls on change', function() {
                $scope.ngDisabled = false;
                $scope.$digest();

                expect(dayInput.is(':disabled')).toBe(false);
                expect(monthInput.is(':disabled')).toBe(false);
                expect(yearInput.is(':disabled')).toBe(false);
            });
        });
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
    });

    describe('user interactions', function() {
        var element, ngModelController,
            dayInput, monthInput, yearInput;

        beforeEach(function() {
            $scope.ngModel = '2001-01-01';
            element = getCompiledDirectiveElement($scope);
            ngModelController = element.controller('ngModel');

            dayInput = element.find(DAY_SELECTOR);
            monthInput = element.find(MONTH_SELECTOR);
            yearInput = element.find(YEAR_SELECTOR);
        });

        describe('with day input', function() {
            it('should update day and ngModel', function () {
                dayInput.val(15).triggerHandler('input');
                expect($scope.ngModel).toBe('2001-01-15');
            });
            it('should not update touched status on blur if year input not blurred', function () {
                dayInput.trigger('blur');
                expect(ngModelController.$touched).toBe(false);
            });
            it('should update touched status on blur if year input already blurred', function () {
                yearInput.trigger('blur');
                dayInput.trigger('blur');
                expect(ngModelController.$touched).toBe(true);
            });
            it('should update pristine status on change', function () {
                dayInput.val(15).triggerHandler('input');
                expect(ngModelController.$pristine).toBe(false);
            });
            it('should null ngModel when invalid', function () {
                dayInput.val('a').triggerHandler('input');
                expect($scope.ngModel).toBe(null);
            });
        });

        describe('with month select', function() {
            var monthModelController;
            beforeEach(function() {
                monthModelController = monthInput.controller('ngModel');
            })

            it('should update month and ngModel', function () {
                // Months are 0 indexed, 2 = March
                monthModelController.$setViewValue('2');
                expect($scope.ngModel).toBe('2001-03-01');
            });
            it('should update touched status on change', function () {
                monthModelController.$setViewValue('2');
                expect(ngModelController.$touched).toBe(true);
            });
            it('should update pristine status on change', function () {
                monthModelController.$setViewValue('2');
                expect(ngModelController.$pristine).toBe(false);
            });
            it('should correct days too high in February', function() {
                dayInput.val(30).triggerHandler('input');
                expect($scope.ngModel).toBe('2001-01-30');

                // Months are 0 indexed, 1 = Feb
                monthModelController.$setViewValue('1');

                expect(dayInput.val()).toBe('28');
                expect(monthInput.val()).toBe('1');
                expect($scope.ngModel).toBe('2001-02-28');
            });
            it('should correct days too high in February in a leap year', function() {
                dayInput.val(30).triggerHandler('input');
                expect($scope.ngModel).toBe('2001-01-30');

                yearInput.val(2000).triggerHandler('input');
                expect($scope.ngModel).toBe('2000-01-30');

                // Months are 0 indexed, 1 = Feb
                monthModelController.$setViewValue('1');

                expect(dayInput.val()).toBe('29');
                expect(monthInput.val()).toBe('1');
                expect($scope.ngModel).toBe('2000-02-29');
            });
            it('should correct days too high in April', function() {
                dayInput.val(31).triggerHandler('input');
                expect($scope.ngModel).toBe('2001-01-31');

                // Months are 0 indexed, 3 = April
                monthModelController.$setViewValue('3');

                expect(dayInput.val()).toBe('30');
                expect(monthInput.val()).toBe('3');
                expect($scope.ngModel).toBe('2001-04-30');
            });

            it('should lower days if value entered too high', function() {
                dayInput.val(32).triggerHandler('input');
                expect(dayInput.val()).toBe('31');

                dayInput.val(321).triggerHandler('input');
                expect(dayInput.val()).toBe('31');

                expect($scope.ngModel).toBe('2001-01-31');
            });
        });

        describe('with year input', function() {
            it('should update year and ngModel', function () {
                yearInput.val(1990).triggerHandler('input');
                expect($scope.ngModel).toBe('1990-01-01');
            });
            it('should update touched status on blur', function () {
                yearInput.focus().blur();
                expect(ngModelController.$touched).toBe(true);
            });
            it('should update pristine status on change', function () {
                yearInput.val(2000).triggerHandler('input');
                expect(ngModelController.$pristine).toBe(false);
            });
            it('should null ngModel when invalid', function () {
                yearInput.val('a').triggerHandler('input');
                expect($scope.ngModel).toBe(null);
            });
        });
    });

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

    function setDateUsingControls(element, year, month, day) {
        try {
            var monthModelController = element.find(MONTH_SELECTOR).controller('ngModel');
            element.find(DAY_SELECTOR).val(day).trigger('input');
            monthModelController.$setViewValue(month);
            //element.find(MONTH_SELECTOR).val(month).trigger('input');
            element.find(YEAR_SELECTOR).val(year).trigger('input');
        } catch(ex) {
            console.log(ex);
        }
    }

    function getCompiledDirectiveElement(scope, template) {
        if (!template) {
            template = " \
                <tw-date \
                    ng-model='ngModel' \
                    ng-required='ngRequired' \
                    ng-disabled='ngDisabled' \
                    ng-min='ngMin' \
                    ng-max='ngMax' \
                    locale='{{locale}}'> \
                </tw-date>";
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
