'use strict';

describe('Directive: TwDate', function() {
    var $compile,
        $rootScope;

    var inputScope;

    beforeEach(module('tw.form-components'));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');

        inputScope = $rootScope.$new();
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

    var FRENCH_MONTHS = [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ];

    var LOCALES = {
        en: 'en-GB',
        fr: 'fr-FR',
        es: 'es-ES'
    };

    describe('init', function() {
        describe('when empty input scope is passed', function () {
            var directiveElement, viewModel;
            beforeEach(function () {
                directiveElement = getCompiledDirectiveElement();
                viewModel = getViewModel(directiveElement);
            });
            it('should leave date model undefined', function () {
                expectDateModelToBe(directiveElement, undefined);
            });
            it('should set vm.dateModelType to "object"', function () {
                expect(viewModel.dateModelType).toBe('object');
            });
            it('should set exploded date to default', function () {
                expectExplodedDateToBeDefault(directiveElement);
            });
            it('should set vm.dateRequired to false', function () {
                expect(viewModel.dateRequired).toBe(false);
            });
            it('should set vm.dateDisabled to false', function () {
                expect(viewModel.dateDisabled).toBe(false);
            });
            it('should not set vm.dateRange', function () {
                expect(viewModel.dateRange).toEqual({});
            });
            it('should set vm.dateLocale to "en"', function () {
                expect(viewModel.dateLocale).toBe('en');
            });

            if (isIntlSupportedForLocale('en')) {
                it('should populate vm.months based on vm.locale', function () {
                    expectDateMonthsToBeLocalized(directiveElement, 'en');
                });
            } else {
                it('should populate vm.months with default English months', function () {
                    expectDateMonthsToBeDefault(directiveElement);
                });
            }
        });
        describe('when date model input scope is passed', function () {
            describe('as valid ISO8601 string', function () {
                var directiveElement, viewModel, dateModel;
                beforeEach(function () {
                    dateModel = '1990-08-21';
                    directiveElement = getCompiledDirectiveElement({model: dateModel});
                    viewModel = getViewModel(directiveElement);
                });
                it('should set vm.dateModelType to "string"', function () {
                    expect(viewModel.dateModelType).toBe('string');
                });
                it('should set exploded date correctly', function () {
                    expectExplodedDateToBe(directiveElement, 1990, 7, 21);
                });
                it('should leave date model as it was defined', function () {
                    expectDateModelToBe(directiveElement, dateModel);
                });
            });
            describe('as valid Date instance', function () {
                var directiveElement, viewModel, dateModel;
                beforeEach(function () {
                    dateModel = new Date(1990, 7, 21);
                    directiveElement = getCompiledDirectiveElement({model: dateModel});
                    viewModel = getViewModel(directiveElement);
                });
                it('should set vm.dateModelType to "string"', function () {
                    expect(viewModel.dateModelType).toBe('object');
                });
                it('should set exploded date correctly', function () {
                    expectExplodedDateToBe(directiveElement, 1990, 7, 21);
                });
                it('should leave date model as it was defined', function () {
                    expectDateModelToBe(directiveElement, dateModel);
                });
            });
            describe('as invalid ISO8601 string', function () {
                it('should throw error', function () {
                    expect(function () {
                        getCompiledDirectiveElement({model: 'snake'});
                    })
                        .toThrow();
                });
            });
            describe('as invalid Date instance', function () {
                it('should throw error', function () {
                    expect(function () {
                        getCompiledDirectiveElement({model: new Date('snake')});
                    })
                        .toThrow();
                });
            });
        });
        describe('when ngRequired input scope is passed', function () {
            var directiveElement, viewModel;
            it('should set vm.dateRequired to true', function () {
                directiveElement = getCompiledDirectiveElement({required: true});
                viewModel = getViewModel(directiveElement);

                expect(viewModel.dateRequired).toBe(true);
            });
            it('should set vm.dateRequired to false', function () {
                directiveElement = getCompiledDirectiveElement({required: false});
                viewModel = getViewModel(directiveElement);

                expect(viewModel.dateRequired).toBe(false);
            });
        });
        describe('when required attribute is passed', function () {
            var directiveElement, viewModel;
            it('should set vm.dateRequired to true', function () {
                directiveElement = getCompiledDirectiveElement({}, [['required']]);
                viewModel = getViewModel(directiveElement);

                expect(viewModel.dateRequired).toBe(true);
            });
        });
        describe('when ngDisabled input scope is passed', function () {
            var directiveElement, viewModel;
            it('should set vm.dateRequired to true', function () {
                directiveElement = getCompiledDirectiveElement({disabled: true});
                viewModel = getViewModel(directiveElement);

                expect(viewModel.dateDisabled).toBe(true);
            });
            it('should set vm.dateRequired to false', function () {
                directiveElement = getCompiledDirectiveElement({disabled: false});
                viewModel = getViewModel(directiveElement);

                expect(viewModel.dateDisabled).toBe(false);
            });
        });
        describe('when disabled attribute is passed', function () {
            var directiveElement, viewModel;
            it('should set vm.dateRequired to true', function () {
                directiveElement = getCompiledDirectiveElement({}, [['disabled']]);
                viewModel = getViewModel(directiveElement);

                expect(viewModel.dateDisabled).toBe(true);
            });
        });

        describe('when ngLocale input scope is passed', function () {
            var ngLocale = 'fr';
            var directiveElement, viewModel;
            beforeEach(function () {
                directiveElement = getCompiledDirectiveElement({locale: ngLocale});
                viewModel = getViewModel(directiveElement);
            });

            if (isIntlSupportedForLocale(ngLocale)) {
                it('should populate vm.months based on vm.locale', function () {
                    expectDateMonthsToBeLocalized(directiveElement, ngLocale);
                });
            } else {
                it('should populate vm.months with default English months', function () {
                    expectDateMonthsToBeDefault(directiveElement);
                });
            }
        });
        describe('when locale attribute is passed', function () {
            var ngLocale = 'fr';
            var directiveElement, viewModel;
            beforeEach(function () {
                directiveElement = getCompiledDirectiveElement({}, [['locale', ngLocale]]);
                viewModel = getViewModel(directiveElement);
            });

            if (isIntlSupportedForLocale(ngLocale)) {
                it('should populate vm.months based on vm.locale', function () {
                    expectDateMonthsToBeLocalized(directiveElement, ngLocale);
                });
            } else {
                it('should populate vm.months with default English months', function () {
                    expectDateMonthsToBeDefault(directiveElement);
                });
            }
        });

        describe('when ngMin, ngMax input scope are passed', function () {
            var directiveElement, viewModel;
            describe('as valid strings', function () {
                it('should set vm.dateRange correctly', function () {
                    var dateMin = '1990-01-01', dateMax = '2015-12-31';
                    directiveElement = getCompiledDirectiveElement({min: dateMin, max: dateMax});
                    viewModel = getViewModel(directiveElement);

                    expect(viewModel.dateRange.min).toEqual(new Date(dateMin));
                    expect(viewModel.dateRange.max).toEqual(new Date(dateMax));
                });
            });
            describe('as invalid strings', function () {
                it('should not set vm.dateRange', function () {
                    directiveElement = getCompiledDirectiveElement({min: 'snake', max: 'snake2'});
                    viewModel = getViewModel(directiveElement);

                    expect(viewModel.dateRange.min).toBeUndefined();
                    expect(viewModel.dateRange.max).toBeUndefined();
                });
            });
            describe('as valid dates', function () {
                it('should set vm.dateRange correctly', function () {
                    var dateMin = new Date(1990, 0, 1), dateMax = new Date(2015, 11, 31);
                    directiveElement = getCompiledDirectiveElement({min: dateMin, max: dateMax});
                    viewModel = getViewModel(directiveElement);

                    expect(viewModel.dateRange.min).toEqual(new Date(dateMin));
                    expect(viewModel.dateRange.max).toEqual(new Date(dateMax));
                });
            });
            describe('as invalid strings', function () {
                it('should not set vm.dateRange', function () {
                    directiveElement = getCompiledDirectiveElement({
                        ngMin: new Date('snake'),
                        ngMax: new Date('snake2')
                    });
                    viewModel = getViewModel(directiveElement);

                    expect(viewModel.dateRange.min).toBeUndefined();
                    expect(viewModel.dateRange.max).toBeUndefined();
                });
            });
        });
        describe('when min, max attributes are passed', function () {
            var directiveElement, viewModel;
            describe('as valid strings', function () {
                it('should set vm.dateRange correctly', function () {
                    var dateMin = '1990-01-01', dateMax = '2015-12-31';
                    directiveElement = getCompiledDirectiveElement({}, [['min', dateMin], ['max', dateMax]]);
                    viewModel = getViewModel(directiveElement);

                    expect(viewModel.dateRange.min).toEqual(new Date(dateMin));
                    expect(viewModel.dateRange.max).toEqual(new Date(dateMax));
                });
            });
            describe('as invalid strings', function () {
                it('should not set vm.dateRange', function () {
                    directiveElement = getCompiledDirectiveElement({}, [['min', 'bla'], ['max', 'sss']]);
                    viewModel = getViewModel(directiveElement);

                    expect(viewModel.dateRange.min).toBeUndefined();
                    expect(viewModel.dateRange.max).toBeUndefined();
                });
            });
        });
        describe('when both ngMmin and min attributes are passed', function () {
            var directiveElement, viewModel;
            it('ngMin should override min', function () {
                var ngMin = 'invalid', min = '2015-12-31';
                directiveElement = getCompiledDirectiveElement({min: ngMin}, [['min', ngMin]]);
                viewModel = getViewModel(directiveElement);

                expect(viewModel.dateRange.min).toBeUndefined();
            });
        });
    });

    describe('watchers on shared scope', function() {
        describe('ngModel', function() {
            var oldDate, directiveElement;
            beforeEach(function() {
                oldDate = new Date("1989-02-20");
                directiveElement = getCompiledDirectiveElement({model: oldDate});
            });
            it('should re-explode date correctly if new date is valid', function() {
                var newDate = new Date("1990-01-12");
                inputScope.model = newDate;
                inputScope.$digest();

                expectExplodedDateToBe(directiveElement, newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
            });
            it('should not re-explode date if new date is not valid', function() {
                inputScope.model = new Date('snake');
                inputScope.$digest();

                expectExplodedDateToBe(directiveElement, oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate());
            });
        });
        describe('ngRequired', function() {
            it('should update vm.dateRequired correctly', function() {
                var directiveElement = getCompiledDirectiveElement({required: true});
                inputScope.required = false;
                inputScope.$digest();

                var vm = getViewModel(directiveElement);
                expect(vm.dateRequired).toBe(false);
            });
        });
        describe('ngDisabled', function() {
            it('should update vm.dateDisabled correctly', function() {
                var directiveElement = getCompiledDirectiveElement({disabled: true});
                inputScope.disabled = false;
                inputScope.$digest();

                var vm = getViewModel(directiveElement);
                expect(vm.dateDisabled).toBe(false);
            });
        });
        describe('ngMin', function() {
            it('should update vm.dateRange correctly', function() {
                var directiveElement = getCompiledDirectiveElement({min: '1990-08-12'});
                var newDateString = '2000-01-01';
                inputScope.min = newDateString;
                inputScope.$digest();

                var vm = getViewModel(directiveElement);
                expect(vm.dateRange.min).toEqual(new Date(newDateString));
            });
        });
        describe('ngMax', function() {
            it('should update vm.dateRange correctly', function() {
                var directiveElement = getCompiledDirectiveElement({max: '1990-08-12'});
                var newDateString = '2000-01-01';
                inputScope.max = newDateString;
                inputScope.$digest();

                var vm = getViewModel(directiveElement);
                expect(vm.dateRange.max).toEqual(new Date(newDateString));
            });
        });
        describe('ngLocale', function() {
            var directiveElement;
            var oldLocale = LOCALES.es;
            var newLocale = LOCALES.fr;
            beforeEach(function() {
                directiveElement = getCompiledDirectiveElement({locale: oldLocale});
                inputScope.locale = newLocale;
                inputScope.$digest();
            });
            it('should update vm.dateLocale correctly', function() {
                var vm = getViewModel(directiveElement);
                expect(vm.dateLocale).toBe(newLocale);
            });
            if (isIntlSupportedForLocale(newLocale)) {
                it('should update vm.dateMonths based on vm.locale', function () {
                    expectDateMonthsToBeLocalized(directiveElement, newLocale);
                });
            } else {
                it('should populate vm.dateMonths with default English months', function () {
                    expectDateMonthsToBeDefault(directiveElement);
                });
            }
        });
    });
    describe('watchers on inner scope', function() {
        describe('vm.month', function() {
            var oldDate, directiveElement, isolatedScope;
            beforeEach(function() {
                oldDate = new Date("1989-01-31");
                directiveElement = getCompiledDirectiveElement({model: oldDate});
                isolatedScope = directiveElement.isolateScope();
            });
            it('should update highest day if month is different', function() {
                isolatedScope.vm.month = 1;
                isolatedScope.$apply();

                expect(isolatedScope.vm.day).toBe(28);
            });
            it('should not trigger re-evaluation of day input if month is same', function() {
                spyOn(isolatedScope.vm, 'adjustLastDay');

                isolatedScope.vm.month = 0;
                isolatedScope.$apply();

                expect(isolatedScope.vm.adjustLastDay).not.toHaveBeenCalled();
            });
        });
    });

    fdescribe('vm.updateDateModelAndValidationClasses()', function() {
        var directiveElement, isolatedScope;
        beforeEach(function() {
            directiveElement = getCompiledDirectiveElement();
            isolatedScope = directiveElement.isolateScope();
        });
        it('should be triggered when vm.day changes', function() {
            var vm = isolatedScope.vm;
            spyOn(vm, 'updateDateModelAndValidationClasses');
            vm.day = 12;
            isolatedScope.$apply();

            expect(vm.updateDateModelAndValidationClasses).toHaveBeenCalled();
        });
    });

    function expectDateMonthsToBeLocalized(directiveElement, locale) {
        var vm = getViewModel(directiveElement);
        var localizedMonthNames = getMonthNamesForLocale(locale);
        localizedMonthNames.forEach(function(monthName, index) {
            expect(vm.dateMonths[index].id).toBe(index);
            expect(vm.dateMonths[index].name).toBe(monthName);
        });
    }
    function expectDateMonthsToBeDefault(directiveElement) {
        var vm = getViewModel(directiveElement);
        ENGLISH_MONTHS.forEach(function(monthName, index) {
            expect(vm.dateMonths[index].id).toBe(index);
            expect(vm.dateMonths[index].name).toBe(monthName);
        });
    }

    function isIntlSupportedForLocale(locale) {
        return window.Intl &&
            typeof window.Intl === 'object' &&
            window.Intl.DateTimeFormat.supportedLocalesOf([locale]).length > 0;
    }

    function getMonthNamesForLocale(locale) {
        var monthNames = [], date = new Date();
        if (isIntlSupportedForLocale(locale)) {
            for (var i=0; i<12; i++) {
                date.setMonth(i);
                monthNames.push(date.toLocaleDateString(locale, {month: "long"}));
            }
        }
        return monthNames;
    }

    function getCompiledDirectiveElement(injectedViewModel, attributes) {
        // if both ng-min and min are present on element, ng-min's value is used to override min's value by angular
        // which results into attribute values passed to min not being used
        var elementAsString = '<tw-date';

        angular.forEach(injectedViewModel, function(value, key) {
            inputScope[key] = value;
            elementAsString += ' ng-' + key + '="' + key +'"';
        });

        if (Array.isArray(attributes)) {
            attributes.forEach(function(nameValuePair) {
                elementAsString += ' ' + nameValuePair[0];
                if (nameValuePair.length > 1) {
                    elementAsString += '=' + nameValuePair[1]
                }
            });
        }
        elementAsString += '></tw-date>';

        var element = angular.element(elementAsString);
        var compiledElement = $compile(element)(inputScope);
        inputScope.$digest();
        return compiledElement;
    }

    function expectDateModelToBe(directiveElement, expectedDateModel) {
        var viewModel = getViewModel(directiveElement);

        expect(viewModel.date).toBe(expectedDateModel);
    }

    function expectExplodedDateToBe(directiveElement, year, month, day) {
        var viewModel = getViewModel(directiveElement);

        expect(viewModel.year).toBe(year);
        expect(viewModel.month).toBe(month);
        expect(viewModel.day).toBe(day);
    }

    function expectExplodedDateToBeDefault(directiveElement) {
        expectExplodedDateToBe(directiveElement, null, 0, null);
    }

    function getViewModel(directiveElement) {
        return directiveElement.isolateScope().vm;
    }
});