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
    var LOCALES = {
        en: 'en-GB',
        fr: 'fr-FR',
        es: 'es-ES'
    };

    describe('init', function() {
        describe('when empty input scope is passed', function () {
            var directiveElement, viewModel, initialModel = null;
            beforeEach(function () {
                directiveElement = getCompiledDirectiveElement({model: initialModel});
                viewModel = getViewModel(directiveElement);
            });
            it('should leave date model undefined', function () {
                expect(viewModel.ngModel).toBe(initialModel);
            });
            it('should set vm.dateModelType to "object"', function () {
                expect(viewModel.dateModelType).toBe('object');
            });
            it('should set exploded date to default', function () {
                expect(viewModel.year).toBe(null);
                expect(viewModel.month).toBe(0);
                expect(viewModel.day).toBe(null);
            });
            it('should set vm.dateRequired to false', function () {
                expect(viewModel.dateRequired).toBe(false);
            });
            it('should set vm.dateDisabled to false', function () {
                expect(viewModel.dateDisabled).toBe(false);
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
            describe('as valid short ISO8601 string', function () {
                var directiveElement, viewModel, dateModel, dateString;
                beforeEach(function () {
                    dateString = '1990-08-21';
                    directiveElement = getCompiledDirectiveElement({model: dateString});
                    viewModel = getViewModel(directiveElement);
                });
                it('should set vm.dateModelType to "string"', function () {
                    expect(viewModel.dateModelType).toBe('string');
                });
                it('should set exploded date correctly', function () {
                    expect(viewModel.year).toBe(1990);
                    expect(viewModel.month).toBe(7);
                    expect(viewModel.day).toBe(21);
                });
                it('should set control values correctly', function () {
                    var monthModelController = directiveElement.find('.tw-date-month').controller('ngModel');

                    expect(directiveElement.find("input[name=day]").val().toString()).toBe('21');
                    expect(monthModelController.$viewValue).toBe(7);
                    inputScope.$apply();
                    expect(directiveElement.find("input[name=year]").val().toString()).toBe('1990');
                });
                it('should leave date model as it was defined', function () {
                    expect(viewModel.ngModel).toBe(dateString);
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
                    expect(viewModel.year).toBe(1990);
                    expect(viewModel.month).toBe(7);
                    expect(viewModel.day).toBe(21);
                });
                it('should set control values correctly', function () {
                    var monthModelController = directiveElement.find('.tw-date-month').controller('ngModel');

                    expect(directiveElement.find("input[name=day]").val().toString()).toBe('21');
                    expect(monthModelController.$viewValue).toBe(7);
                    expect(directiveElement.find("input[name=year]").val().toString()).toBe('1990');
                });
                it('should leave date model as it was defined', function () {
                    expect(viewModel.ngModel).toBe(dateModel);
                });
            });
            describe('as valid long ISO8601 string', function () {
                var directiveElement, viewModel, dateModel, dateString;
                beforeEach(function () {
                    dateString = '1990-02-28T00:00:00.000Z';
                    directiveElement = getCompiledDirectiveElement({model: dateString});
                    viewModel = getViewModel(directiveElement);
                });
                it('should set vm.dateModelType to "string"', function () {
                    expect(viewModel.dateModelType).toBe('string');
                });
                it('should set exploded date correctly', function () {
                    expect(viewModel.year).toBe(1990);
                    expect(viewModel.month).toBe(1);
                    expect(viewModel.day).toBe(28);
                });
                it('should leave date model unchanged', function () {
                    expect(viewModel.ngModel).toBe(dateString);
                });
            });
            describe('as invalid ISO8601 string', function () {
                it('should throw error', function () {
                    expect(function () {
                        getCompiledDirectiveElement({model: 'invalid'});
                    }).toThrow();

                    // TODO Is this test desired behaviour?

                    //var viewModel = getViewModel(directiveElement);
                    //expect(viewModel.day).toBeNaN();
                    //expect(viewModel.month).toBe(0);
                    //expect(viewModel.year).toBeNaN();
                });
            });
            describe('as invalid Date instance', function () {
                it('should throw error', function () {
                    expect(function () {
                        getCompiledDirectiveElement({model: new Date('invalid')});
                    }).toThrow();

                    // TODO Is this test desired behaviour?

                    //expect(viewModel.day).toBeNaN();
                    //expect(viewModel.month).toBe(0);
                    //expect(viewModel.year).toBeNaN();
                });
            });
        });
        describe('when modelType attribute is passed', function () {
            var directiveElement, viewModel;
            describe('as "string"', function () {
                beforeEach(function() {
                    directiveElement = getCompiledDirectiveElement({model: null}, [['model-type', 'string']]);
                    viewModel = getViewModel(directiveElement);
                });
                it('should set vm.dateModelType to "string"', function () {
                    expect(viewModel.dateModelType).toBe('string');
                });
                it('should return updated date model correctly', function () {
                    viewModel.year = 1990;
                    viewModel.month = 1;

                    directiveElement.find('.tw-date-day')
                        .val(15)
                        .triggerHandler('input');

                    expect(viewModel.ngModel).toBe('1990-02-15');
                });
            });
            describe('as "object"', function () {
                beforeEach(function() {
                    directiveElement = getCompiledDirectiveElement({model: null}, [['model-type', 'object']]);
                    viewModel = getViewModel(directiveElement);
                });
                it('should set vm.dateModelType to "object"', function () {
                    expect(viewModel.dateModelType).toBe('object');
                });
                it('should return updated date model correctly', function () {
                    viewModel.year = 1990;
                    viewModel.month = 1;

                    directiveElement.find('.tw-date-day')
                        .val(15)
                        .triggerHandler('input');

                    expect(viewModel.ngModel).toEqual(new Date(1990, 1, 15));
                });
            });
            describe('as invalid model type', function () {
                it('should throw error', function () {
                    expect(function() {
                        directiveElement = getCompiledDirectiveElement({model: null}, [['model-type', 'pokemon']]);
                    }).toThrow();
                });
            });
        });
        describe('when ngRequired input scope is passed', function () {
            var directiveElement, viewModel, ngModelController;
            it('should be $invalid when model is null', function () {
                directiveElement = getCompiledDirectiveElement({model: null, required: true});
                viewModel = getViewModel(directiveElement);
                ngModelController = directiveElement.controller('ngModel');

                expect(ngModelController.$invalid).toBe(true);
            });
            it('should be $valid when model is valid date', function () {
                directiveElement = getCompiledDirectiveElement({model: '2000-01-01', required: true});
                viewModel = getViewModel(directiveElement);
                ngModelController = directiveElement.controller('ngModel');

                expect(ngModelController.$valid).toBe(true);
            });
        });
        describe('when required attribute is passed', function () {
            var directiveElement, ngModelController;
            it('should be $invalid when model is null', function () {
                directiveElement = getCompiledDirectiveElement({model: null}, [['required']]);
                ngModelController = directiveElement.controller('ngModel');

                expect(ngModelController.$invalid).toBe(true);
            });
            it('should be $valid when model is valid date', function () {
                directiveElement = getCompiledDirectiveElement({model: '2000-01-01'}, [['required']]);
                ngModelController = directiveElement.controller('ngModel');

                expect(ngModelController.$valid).toBe(true);
            });
        });
        describe('when ngDisabled=true', function () {
            it('should be disabled', function () {
                var directiveElement = getCompiledDirectiveElement({model: null, disabled: true});
                expect(directiveElement.attr("disabled")).toBeDefined();
                expect(directiveElement.find('.tw-date-day').attr("disabled")).toBeDefined();
                expect(directiveElement.find('.tw-date-month').attr("disabled")).toBeDefined();
                expect(directiveElement.find('.tw-date-year').attr("disabled")).toBeDefined();
            });
        });
        describe('when ngDisabled=false', function () {
            it('should not be disabled', function () {
                var directiveElement = getCompiledDirectiveElement({model: null, disabled: false});
                expect(directiveElement.attr("disabled")).not.toBeDefined();
                expect(directiveElement.find('.tw-date-day').attr("disabled")).not.toBeDefined();
                expect(directiveElement.find('.tw-date-month').attr("disabled")).not.toBeDefined();
                expect(directiveElement.find('.tw-date-year').attr("disabled")).not.toBeDefined();
            });
        });
        describe('when disabled=true', function () {
            it('should be disabled', function () {
                var directiveElement = getCompiledDirectiveElement({model: null}, [['disabled']]);
                expect(directiveElement.attr("disabled")).toBeDefined();
                expect(directiveElement.find('.tw-date-day').attr("disabled")).toBeDefined();
                expect(directiveElement.find('.tw-date-month').attr("disabled")).toBeDefined();
                expect(directiveElement.find('.tw-date-year').attr("disabled")).toBeDefined();
            });
        });
        describe('when disabled not set', function () {
            it('should not be disabled', function () {
                var directiveElement = getCompiledDirectiveElement({model: null}, [[]]);
                expect(directiveElement.find('.tw-date-day').attr("disabled")).not.toBeDefined();
                expect(directiveElement.find('.tw-date-month').attr("disabled")).not.toBeDefined();
                expect(directiveElement.find('.tw-date-year').attr("disabled")).not.toBeDefined();
            });
        });

        describe('when twLocale input scope is passed', function () {
            var twLocale = 'fr';
            var directiveElement, viewModel;
            beforeEach(function () {
                directiveElement = getCompiledDirectiveElement({model: null, 'locale': twLocale});
                viewModel = getViewModel(directiveElement);
            });

            if (isIntlSupportedForLocale(twLocale)) {
                it('should populate vm.months based on vm.locale', function () {
                    expectDateMonthsToBeLocalized(directiveElement, twLocale);
                });
            } else {
                it('should populate vm.months with default English months', function () {
                    expectDateMonthsToBeDefault(directiveElement);
                });
            }
        });
        describe('when locale attribute is passed', function () {
            var twLocale = 'fr';
            var directiveElement, viewModel;
            beforeEach(function () {
                directiveElement = getCompiledDirectiveElement({model: null}, [['locale', twLocale]]);
                viewModel = getViewModel(directiveElement);
            });

            if (isIntlSupportedForLocale(twLocale)) {
                it('should populate vm.months based on vm.locale', function () {
                    expectDateMonthsToBeLocalized(directiveElement, twLocale);
                });
            } else {
                it('should populate vm.months with default English months', function () {
                    expectDateMonthsToBeDefault(directiveElement);
                });
            }
        });

        describe('when ngMin, ngMax input scope are passed', function () {
            var directiveElement, viewModel, ngModelController;
            describe('as valid strings', function () {
                var dateMin = '1990-01-01',
                    dateMax = '2015-12-31';

                beforeEach(function() {
                    directiveElement = getCompiledDirectiveElement({model: null, min: dateMin, max: dateMax});
                    viewModel = getViewModel(directiveElement);
                    ngModelController = directiveElement.controller('ngModel');
                });
                it('should not set invalid when ngModel is null', function() {
                    expect(ngModelController.$invalid).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(false);
                });
                it('should set ngModel to invalid when date is earlier', function() {
                    inputScope.model = new Date('1980-01-01');
                    inputScope.$digest();
                    expect(ngModelController.$invalid).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid')).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(false);
                });
                it('should set ngModel to invalid when date is later', function() {
                    inputScope.model = new Date('2020-01-01');
                    inputScope.$digest();
                    expect(ngModelController.$invalid).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid')).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(true);
                });
                it('should set ngModel to valid when date is between min and max', function() {
                    inputScope.model = new Date('2000-01-01');
                    inputScope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(false);
                });
            });
            describe('as invalid strings', function () {
                beforeEach(function() {
                    directiveElement = getCompiledDirectiveElement({model: null, min: 'snake', max: 'snake2'});
                    viewModel = getViewModel(directiveElement);
                    ngModelController = directiveElement.controller('ngModel');
                });
                it('should set ngModel to valid when any date used', function() {
                    inputScope.model = new Date('1000-01-01');
                    inputScope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(false);

                    inputScope.model = new Date('9999-01-01');
                    inputScope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(false);
                });
            });
            describe('as valid dates', function () {
                var dateMin = new Date(1990, 0, 1),
                    dateMax = new Date(2015, 11, 31);

                beforeEach(function() {
                    directiveElement = getCompiledDirectiveElement({model: null, min: dateMin, max: dateMax});
                    viewModel = getViewModel(directiveElement);
                    ngModelController = directiveElement.controller('ngModel');
                });
                it('should not set invalid min/max when ngModel is null', function() {
                    expect(ngModelController.$invalid).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(false);
                });
                it('should set ngModel to invalid when date is earlier', function() {
                    inputScope.model = new Date('1980-01-01');
                    inputScope.$digest();
                    expect(ngModelController.$invalid).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid')).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(false);
                });
                it('should set ngModel to invalid when date is later', function() {
                    inputScope.model = new Date('2020-01-01');
                    inputScope.$digest();
                    expect(ngModelController.$invalid).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid')).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(true);
                });
                it('should set ngModel to valid when date is between min and max', function() {
                    inputScope.model = new Date('2000-01-01');
                    inputScope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(false);
                });
            });
            describe('as invalid Date objects', function () {
                it('should set ngModel to valid when any date used', function() {
                    directiveElement = getCompiledDirectiveElement({
                        model: null,
                        ngMin: new Date('snake'),
                        ngMax: new Date('snake2')
                    });
                    viewModel = getViewModel(directiveElement);
                    ngModelController = directiveElement.controller('ngModel');

                    inputScope.model = new Date('1000-01-01');
                    inputScope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(false);

                    inputScope.model = new Date('9999-01-01');
                    inputScope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(false);
                });
            });
        });
        describe('when min, max attributes are passed', function () {
            var directiveElement, viewModel, ngModelController;
            describe('as valid strings', function () {
                beforeEach(function () {
                    var dateMin = '1990-01-01',
                        dateMax = '2015-12-31';

                    directiveElement = getCompiledDirectiveElement({model: null}, [['min', dateMin], ['max', dateMax]]);
                    viewModel = getViewModel(directiveElement);
                    ngModelController = directiveElement.controller('ngModel');
                });
                it('should not set invalid min/max when ngModel is null', function() {
                    expect(ngModelController.$invalid).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(false);
                });
                it('should set ngModel to invalid when date is earlier', function() {
                    inputScope.model = new Date('1980-01-01');
                    inputScope.$digest();
                    expect(ngModelController.$invalid).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid')).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(false);
                });
                it('should set ngModel to invalid when date is later', function() {
                    inputScope.model = new Date('2020-01-01');
                    inputScope.$digest();
                    expect(ngModelController.$invalid).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid')).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(true);
                });
                it('should set ngModel to valid when date is between min and max', function() {
                    inputScope.model = new Date('2000-01-01');
                    inputScope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(false);
                });
            });
            describe('as invalid strings', function () {
                beforeEach(function () {
                    directiveElement = getCompiledDirectiveElement({model: null}, [['min', 'bla'], ['max', 'sss']]);
                    viewModel = getViewModel(directiveElement);
                    ngModelController = directiveElement.controller('ngModel');
                });

                it('should set ngModel to valid when any date used', function() {
                    inputScope.model = new Date('1000-01-01');
                    inputScope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(false);

                    inputScope.model = new Date('9999-01-01');
                    inputScope.$digest();
                    expect(ngModelController.$valid).toBe(true);
                    expect(directiveElement.hasClass('ng-invalid')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-min')).toBe(false);
                    expect(directiveElement.hasClass('ng-invalid-max')).toBe(false);
                });
            });
        });
        describe('when both ngMmin and min attributes are passed', function () {
            var directiveElement, viewModel, ngModelController;

            it('should set ngModel to valid when min > date > ngMin', function() {
                var ngMin = '2000-01-01',
                    min = '2010-01-01';

                directiveElement = getCompiledDirectiveElement({model: null, min: ngMin}, [['min', min]]);
                viewModel = getViewModel(directiveElement);
                ngModelController = directiveElement.controller('ngModel');

                inputScope.model = new Date('2005-01-01');
                inputScope.$digest();
                expect(ngModelController.$valid).toBe(true);
                expect(directiveElement.hasClass('ng-invalid')).toBe(false);
            });
            it('should set ngModel to invalid when ngMin > date > min', function() {
                var ngMin = '2010-01-01',
                    min = '2000-01-01';

                directiveElement = getCompiledDirectiveElement({model: null, min: ngMin}, [['min', min]]);
                viewModel = getViewModel(directiveElement);
                ngModelController = directiveElement.controller('ngModel');

                inputScope.model = new Date('2005-01-01');
                inputScope.$digest();
                expect(ngModelController.$invalid).toBe(true);
                expect(directiveElement.hasClass('ng-invalid')).toBe(true);
            });
        });
    });

    describe('watchers on shared scope', function() {
        describe('ngModel', function() {
            var oldDate, directiveElement, viewModel;
            beforeEach(function() {
                oldDate = new Date("1989-02-20");
                directiveElement = getCompiledDirectiveElement({model: oldDate});
                viewModel = getViewModel(directiveElement);
            });
            it('should re-explode date correctly if new date is valid', function() {
                var newDate = new Date("1990-01-12");
                inputScope.model = newDate;
                inputScope.$digest();

                expect(viewModel.year).toBe(newDate.getFullYear());
                expect(viewModel.month).toBe(newDate.getMonth());
                expect(viewModel.day).toBe(newDate.getDate());
            });
            it('should not re-explode date if new date is not valid', function() {
                inputScope.model = new Date('snake');
                inputScope.$digest();

                expect(viewModel.year).toBe(oldDate.getFullYear());
                expect(viewModel.month).toBe(oldDate.getMonth());
                expect(viewModel.day).toBe(oldDate.getDate());
            });
        });
        describe('ngRequired', function() {
            it('should update vm.dateRequired correctly', function() {
                var directiveElement = getCompiledDirectiveElement({model: null, required: true});
                var viewModel = getViewModel(directiveElement);

                inputScope.required = false;
                inputScope.$digest();

                expect(viewModel.dateRequired).toBe(false);
            });
        });
        describe('ngDisabled', function() {
            it('should update vm.dateDisabled correctly', function() {
                var directiveElement = getCompiledDirectiveElement({model: null, disabled: true});
                var viewModel = getViewModel(directiveElement);

                inputScope.disabled = false;
                inputScope.$digest();

                expect(viewModel.dateDisabled).toBe(false);
            });
        });
        describe('twLocale', function() {
            var directiveElement,
                viewModel,
                oldLocale = LOCALES.es,
                newLocale = LOCALES.fr;

            beforeEach(function() {
                directiveElement = getCompiledDirectiveElement({model: null, 'locale': oldLocale});
                viewModel = getViewModel(directiveElement);

                inputScope.locale = newLocale;
                inputScope.$digest();
            });

            it('should update vm.dateLocale correctly', function() {
                expect(viewModel.dateLocale).toBe(newLocale);
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
        });
    });

    describe('user interactions', function() {
        var directiveElement, isolatedScope, ngModelController;
        beforeEach(function() {
            directiveElement = getCompiledDirectiveElement({model: '2001-01-01'});
            isolatedScope = directiveElement.isolateScope();
            ngModelController = directiveElement.controller('ngModel');
        });

        describe('with day input', function() {
            var dayInput;
            beforeEach(function() {
                dayInput = directiveElement.find('.tw-date-day');
            });
            it('should update day and ngModel', function () {
                dayInput.val(15).triggerHandler('input');
                expect(isolatedScope.vm.day).toBe(15);
                expect(isolatedScope.vm.ngModel).toBe('2001-01-15');
                expect(inputScope.model).toBe('2001-01-15');
            });
            it('should update touched status on blur', function () {
                dayInput.focus().blur();
                expect(ngModelController.$touched).toBe(true);
            });
            it('should update pristine status on change', function () {
                dayInput.val(15).triggerHandler('input');
                expect(ngModelController.$pristine).toBe(false);
            });
            it('should null ngModel when invalid', function () {
                dayInput.val('a').triggerHandler('input');
                expect(isolatedScope.vm.ngModel).toBe(null);
            });
        });

        describe('with month select', function() {
            var monthModelController;
            beforeEach(function() {
                monthModelController = directiveElement.find('.tw-date-month').controller('ngModel');
            })

            it('should update month and ngModel', function () {
                // Months are 0 indexed, 2 = March
                monthModelController.$setViewValue('2');
                expect(isolatedScope.vm.month).toBe(2);
                expect(inputScope.model).toBe('2001-03-01');
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
                directiveElement.find('.tw-date-day').val(30).triggerHandler('input');
                expect(isolatedScope.vm.day).toBe(30);
                expect(inputScope.model).toBe('2001-01-30');

                // Months are 0 indexed, 1 = Feb
                monthModelController.$setViewValue('1');

                expect(isolatedScope.vm.day).toBe(28);
                expect(isolatedScope.vm.month).toBe(1);
                expect(inputScope.model).toBe('2001-02-28');
            });
            it('should correct days too high in February in a leap year', function() {
                directiveElement.find('.tw-date-day').val(30).triggerHandler('input');
                expect(isolatedScope.vm.day).toBe(30);
                expect(inputScope.model).toBe('2001-01-30');

                directiveElement.find('.tw-date-year').val(2000).triggerHandler('input');
                expect(isolatedScope.vm.year).toBe(2000);
                expect(inputScope.model).toBe('2000-01-30');

                // Months are 0 indexed, 1 = Feb
                monthModelController.$setViewValue('1');

                expect(isolatedScope.vm.day).toBe(29);
                expect(isolatedScope.vm.month).toBe(1);
                expect(inputScope.model).toBe('2000-02-29');
            });
            it('should correct days too high in April', function() {
                directiveElement.find('.tw-date-day').val(31).triggerHandler('input');
                expect(isolatedScope.vm.day).toBe(31);
                expect(inputScope.model).toBe('2001-01-31');

                // Months are 0 indexed, 3 = April
                monthModelController.$setViewValue('3');

                expect(isolatedScope.vm.day).toBe(30);
                expect(isolatedScope.vm.month).toBe(3);
                expect(inputScope.model).toBe('2001-04-30');
            });

            it('should null ngModel if days too high', function() {
                directiveElement.find('.tw-date-day').val(32).triggerHandler('input');
                expect(inputScope.model).toBe(null);
            });
        });

        describe('with year input', function() {
            var yearInput;
            beforeEach(function() {
                yearInput = directiveElement.find('.tw-date-year');
            });
            it('should update year and ngModel', function () {
                yearInput.val(1990).triggerHandler('input');
                expect(isolatedScope.vm.year).toBe(1990);
                expect(isolatedScope.vm.ngModel).toBe('1990-01-01');
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
                expect(isolatedScope.vm.ngModel).toBe(null);
            });
        });
    });
    describe('vm.updateDateModelAndValidationClasses()', function() {
        describe('when no constraints are passed', function() {
            var directiveElement,
                isolatedScope,
                dateModel = '1990-02-26';

            beforeEach(function() {
                directiveElement = getCompiledDirectiveElement({model: dateModel});
                isolatedScope = directiveElement.isolateScope();
            });
            it('should update day if new day is too high for new month and update pattern validation class correctly', function() {
                directiveElement.find('.tw-date-day')
                    .val(30)
                    .triggerHandler('input');

                expect(isolatedScope.vm.day).toBe(28);
            });
        });
    });

    // TODO test min/max validation when model is null - shouldn't be true
    // TODO test required validation
    // TODO test 'dirty' logic - should be dependent if we initialised with a value

    function expectDateMonthsToBeLocalized(directiveElement, locale) {
        var vm = getViewModel(directiveElement);
        var localizedMonthNames = getMonthNamesForLocale(locale);
        localizedMonthNames.forEach(function(monthName, index) {
            expect(vm.dateMonths[index].value).toBe(index);

            var upperCaseMonthName = monthName[0].toUpperCase() + monthName.substring(1);
            expect(vm.dateMonths[index].label).toBe(upperCaseMonthName);
        });
    }
    function expectDateMonthsToBeDefault(directiveElement) {
        var vm = getViewModel(directiveElement);
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
                monthNames.push(date.toLocaleDateString(locale, {month: "long"}));
            }
        }
        return monthNames;
    }

    function getCompiledDirectiveElement(injectedViewModel, attributes) {
        var nonAngularSpecific = ['locale'];

        var elementAsString = '<tw-date';

        angular.forEach(injectedViewModel, function(value, key) {
            // TODO Don't like the way this works through global scope
            inputScope[key] = value;
            if (nonAngularSpecific.indexOf(key) > -1) {
                elementAsString += ' tw-' + key + '="' + key +'"';
            } else {
                elementAsString += ' ng-' + key + '="' + key +'"';
            }
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

    function getViewModel(directiveElement) {
        return directiveElement.isolateScope().vm;
    }
});
