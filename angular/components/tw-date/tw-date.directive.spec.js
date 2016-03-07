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
        {id: 1, name: "January"},
        {id: 2, name: "February"},
        {id: 3, name: "March"},
        {id: 4, name: "April"},
        {id: 5, name: "May"},
        {id: 6, name: "June"},
        {id: 7, name: "July"},
        {id: 8, name: "August"},
        {id: 9, name: "September"},
        {id: 10, name: "October"},
        {id: 11, name: "November"},
        {id: 12, name: "December"}
    ];

    describe('init', function() {
        describe('date model', function() {
            it('should stay undefined no date model is passed', function() {
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

                expectExplodedDateToBe(directiveElement, 1990, 2, 12);
            });
            it('should be correct when correct Date date model is passed', function() {
                var date = new Date(1995, 10, 30);
                var directiveElement = getCompiledDirectiveElement({date: date});

                expectExplodedDateToBe(directiveElement, 1995, 11, 30);
            });
        });
        fdescribe('vm.ngRequired', function() {
            it('should be set to false if vm.ngRequired nor vm.required are passed', function() {
                var directiveElement = getCompiledDirectiveElement();
                var isolatedScope = directiveElement.isolateScope();
                expect(isolatedScope.vm.ngRequired).toBe(false);
            });
            it('should be set to true if vm.ngRequired not passed but vm.required passed', function() {
                var directiveElement = getCompiledDirectiveElement({}, ['required']);
                var isolatedScope = directiveElement.isolateScope();
                expect(isolatedScope.vm.ngRequired).toBe(true);
            });
        });

        describe('vm.months', function() {
            it('should populate vm.months with default English months when browser does not support toLocalDateString correctly', function() {
                var englishLocale = 'en-GB';
                var directiveElement = getCompiledDirectiveElement({locale: englishLocale});
                var viewModel = getViewModel(directiveElement);

                ENGLISH_MONTHS.forEach(function(month, index) {
                    expect(viewModel.months[index].id).toBe(month.id);
                    expect(viewModel.months[index].name).toBe(month.name);
                });
            });
        });
    });

    describe('watchers', function() {
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

                expectExplodedDateToBe(directiveElement, newDate.getUTCFullYear(), newDate.getUTCMonth() + 1, newDate.getUTCDate());
            });
            it('should not re-explode date if new date is not valid', function() {
                inputScope.date = new Date('snake');
                inputScope.$digest();

                expectExplodedDateToBe(directiveElement, oldDate.getUTCFullYear(), oldDate.getUTCMonth() + 1, oldDate.getUTCDate());
            });
        });
        describe('vm.month', function() {
            var oldDate;
            var directiveElement, isolatedScope;
            beforeEach(function() {
                oldDate = new Date("1989-01-31");
                directiveElement = getCompiledDirectiveElement({date: oldDate});
                isolatedScope = directiveElement.isolateScope();
            });
            it('should trigger re-evaluation of day input if month is different', function() {
                isolatedScope.vm.month = 2;
                isolatedScope.$apply();

                expect(isolatedScope.vm.day).toBe(28);
            });
            it('should not trigger re-evaluation of day input if month is same', function() {
                spyOn(isolatedScope.vm, 'correctHighDay');

                isolatedScope.vm.month = 1;
                isolatedScope.$apply();

                expect(isolatedScope.vm.correctHighDay).not.toHaveBeenCalled();
            });
        });
    });

    function getCompiledDirectiveElement(injectedViewModel, attributes) {
        angular.forEach(injectedViewModel, function(value, key) {
           inputScope[key] = value;
        });

        var elementAsString = '<tw-date' + ' ng-model="date" ';
        if (Array.isArray(attributes)) {
            console.log(attributes);
            elementAsString += attributes.join(' ') +  ' ></tw-date>';
        }
        console.log(elementAsString);

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
        expectExplodedDateToBe(directiveElement, null, 1, null);
    }

    function getViewModel(directiveElement) {
        return directiveElement.isolateScope().vm;
    }
});