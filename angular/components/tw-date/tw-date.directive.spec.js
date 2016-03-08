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
        describe('date model', function() {
            it('should stay undefined when no date model is passed', function() {
                var directiveElement = getCompiledDirectiveElement();

                expectDateModelToBe(directiveElement, undefined);
            });
            it('should stay untouched when incorrect string date model is passed', function() {
                var date = 'snake';
                var directiveElement = getCompiledDirectiveElement({date: date});

                expectDateModelToBe(directiveElement, date);
            });
            it('should stay untouched when incorrect Date date model is passed', function() {
                var date = new Date('snake');
                var directiveElement = getCompiledDirectiveElement({date: date});

                expectDateModelToBe(directiveElement, date);
            });
            it('should stay untouched when correct ISO8601 date model is passed', function() {
                var iso8601Date = "1990-02-12T00:00:00.000Z";
                var directiveElement = getCompiledDirectiveElement({date: iso8601Date});

                expectDateModelToBe(directiveElement, iso8601Date);
            });
            it('should stay untouched when correct Date date model is passed', function() {
                var date = new Date(1995, 10, 30);
                var directiveElement = getCompiledDirectiveElement({date: date});

                expectDateModelToBe(directiveElement, date);
            });
        });
        describe('exploded date', function() {
            it('should be default when no date model is passed', function() {
                var directiveElement = getCompiledDirectiveElement();

                expectExplodedDateToBeDefault(directiveElement);
            });
            it('should be default when incorrect string date model is passed', function() {
                var date = 'snake';
                var directiveElement = getCompiledDirectiveElement({date: date});

                expectExplodedDateToBeDefault(directiveElement);
            });
            it('should be default when incorrect Date date model is passed', function() {
                var date = new Date('snake');
                var directiveElement = getCompiledDirectiveElement({date: date});

                expectExplodedDateToBeDefault(directiveElement);
            });
            it('should be correct when correct ISO8601 date model is passed', function() {
                var iso8601Date = "1990-02-12T00:00:00.000Z";
                var directiveElement = getCompiledDirectiveElement({date: iso8601Date});

                expectExplodedDateToBe(directiveElement, 1990, 1, 12);
            });
            it('should be correct when correct Date date model is passed', function() {
                var date = new Date(1995, 10, 30);
                var directiveElement = getCompiledDirectiveElement({date: date});

                expectExplodedDateToBe(directiveElement, 1995, 10, 30);
            });
        });
        describe('vm.ngRequired', function() {
            it('should be set to false if no vm.ngRequired nor vm.required are passed', function() {
                var directiveElement = getCompiledDirectiveElement();
                var vm = getViewModel(directiveElement);

                expect(vm.ngRequired).toBe(false);
            });
            it('should be set to true if vm.ngRequired not passed but vm.required passed', function() {
                var directiveElement = getCompiledDirectiveElement({}, ['required']);
                var vm = getViewModel(directiveElement);

                expect(vm.ngRequired).toBe(true);
            });
            it('should be set to value passed and ignore vm.required passed', function() {
                var directiveElement = getCompiledDirectiveElement({ngRequired: false}, ['required']);
                var vm = getViewModel(directiveElement);

                expect(vm.ngRequired).toBe(false);
            });
        });
        describe('vm.ngDisabled', function() {
            it('should be set to false if no vm.ngDisabled nor vm.disabled are passed', function() {
                var directiveElement = getCompiledDirectiveElement();
                var vm = getViewModel(directiveElement);

                expect(vm.ngDisabled).toBe(false);
            });
            it('should be set to true if vm.ngDisabled not passed but vm.disabled passed', function() {
                var directiveElement = getCompiledDirectiveElement({}, ['disabled']);
                var vm = getViewModel(directiveElement);

                expect(vm.ngDisabled).toBe(true);
            });
            it('should be set to value passed and ignore vm.disabled passed', function() {
                var directiveElement = getCompiledDirectiveElement({ngDisabled: false}, ['disabled']);
                var vm = getViewModel(directiveElement);

                expect(vm.ngDisabled).toBe(false);
            });
        });
        describe('vm.required & vm.disabled', function() {
            it('should set vm.ngDisabled and vm.ngDisabled if both present', function() {
                var directiveElement = getCompiledDirectiveElement({}, ['required', 'disabled']);
                var vm = getViewModel(directiveElement);

                expect(vm.ngRequired).toBe(true);
                expect(vm.ngDisabled).toBe(true);
            });
        });
        describe('vm.locale', function() {
            it('should be set to en-GB by default if no vm.locale passed', function() {
                var directiveElement = getCompiledDirectiveElement();
                var vm = getViewModel(directiveElement);

                expect(vm.locale).toBe(LOCALES.en);
            });
            it('should be set with value passed', function() {
                var directiveElement = getCompiledDirectiveElement({locale: LOCALES.fr});
                var vm = getViewModel(directiveElement);

                expect(vm.locale).toBe(LOCALES.fr);
            });
        });
        describe('vm.months', function() {
            var frenchLocale = 'fr-FR';
            var directiveElement, vm;
            beforeEach(function() {
                directiveElement = getCompiledDirectiveElement({locale: frenchLocale});
                vm = getViewModel(directiveElement);
            });
            if (isIntlSupportedForLocale(frenchLocale)) {
                it('should populate vm.months based on vm.locale', function () {
                    FRENCH_MONTHS.forEach(function(monthName, index) {
                        expect(vm.months[index].id).toBe(index);
                        expect(vm.months[index].name).toBe(monthName);
                    });
                });
            } else {
                it('should populate vm.months with default English months', function () {
                    ENGLISH_MONTHS.forEach(function(monthName, index) {
                        expect(vm.months[index].id).toBe(index);
                        expect(vm.months[index].name).toBe(monthName);
                    });
                });
            }
        });
    });

    describe('watchers on shared scope', function() {
        describe('vm.date', function() {
            var oldDate, directiveElement;
            beforeEach(function() {
                oldDate = new Date("1989-02-20");
                directiveElement = getCompiledDirectiveElement({date: oldDate});
            });
            it('should re-explode date correctly if new date is valid', function() {
                var newDate = new Date("1990-01-12");
                inputScope.date = newDate;
                inputScope.$digest();

                expectExplodedDateToBe(directiveElement, newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate());
            });
            it('should not re-explode date if new date is not valid', function() {
                inputScope.date = new Date('snake');
                inputScope.$digest();

                expectExplodedDateToBe(directiveElement, oldDate.getUTCFullYear(), oldDate.getUTCMonth(), oldDate.getUTCDate());
            });
        });
        describe('vm.locale', function() {
            var oldLocale, directiveElement;
            beforeEach(function() {
                oldLocale = LOCALES.es;
                directiveElement = getCompiledDirectiveElement({locale: oldLocale});
            });
            it('should update months correctly based on Intl support', function() {
                var newLocale = LOCALES.fr;
                inputScope.locale = newLocale;
                inputScope.$digest();

                var isolatedScope = directiveElement.isolateScope();
                expect(isolatedScope.vm.locale).toBe(newLocale);

                if (isIntlSupportedForLocale(newLocale)) {
                    expect(isolatedScope.vm.months[0].name).toBe('Janvier');
                } else {
                    expect(isolatedScope.vm.months[0].name).toBe('January');
                }
            });
        });
    });
    describe('watchers on isolated scope', function() {
        describe('vm.month', function() {
            var oldDate, directiveElement, isolatedScope;
            beforeEach(function() {
                oldDate = new Date("1989-01-31");
                directiveElement = getCompiledDirectiveElement({date: oldDate});
                isolatedScope = getCompiledDirectiveElement().isolateScope();
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

    function isIntlSupportedForLocale(locale) {
        return window.Intl &&
            typeof window.Intl === 'object' &&
            window.Intl.DateTimeFormat.supportedLocalesOf([locale]).length > 0;
    }

    function getCompiledDirectiveElement(injectedViewModel, attributes) {
        angular.forEach(injectedViewModel, function(value, key) {
           inputScope[key] = value;
        });

        var elementAsString = '<tw-date ng-model="date" locale="locale" ng-required="ngRequired" ng-disabled="ngDisabled"';
        if (Array.isArray(attributes)) {
            elementAsString += attributes.join(' ');
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