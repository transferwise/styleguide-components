'use strict';

describe('Directive: TwCurrencyInput', function() {
    var $compile,
        $rootScope,
        $scope,
        $ngModel,
        templateElement,
        directiveElement,
        input;

    var DIRECTIVE_SELECTOR = 'tw-currency-input';
    var INPUT_SELECTOR = 'input';

    beforeEach(module('tw.form-components'));
    beforeEach(module('tw.form-styling'));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
        $scope = $rootScope.$new();
        $scope.ngModel = null;
        $scope.name = 'myCurrencyInput';
        $scope.ngClick = function() {};
        $scope.ngFocus = function() {};
        $scope.ngBlur = function() {};
    }));

    describe('init', function() {
        beforeEach(inject(function($injector) {
            templateElement = getCompiledTemplateElement($scope);
            directiveElement = templateElement.find(DIRECTIVE_SELECTOR);
            $ngModel = directiveElement.controller('ngModel');
            input = directiveElement.find(INPUT_SELECTOR);
        }));

        it('should be empty when ngModel is false', function() {
            expect(input.val()).toBe('');
        });

        it('should have the value when ngModel is set', function() {
            $scope.ngModel = 100;
            templateElement = getCompiledTemplateElement($scope);
            expect(templateElement.find(DIRECTIVE_SELECTOR).find(INPUT_SELECTOR).val()).toBe('100');
        });

        it('should have the currency code', function() {
            expect(input.siblings('.tw-currency-input-code').text().trim()).toBe('EUR');
        });

        it('should have the currency symbol', function() {
            expect(input.siblings('.tw-currency-input-symbol').text().trim()).toBe('€');
        });
    });

    describe('interactions', function() {
        beforeEach(inject(function($injector) {
            templateElement = getCompiledTemplateElement($scope);
            directiveElement = templateElement.find(DIRECTIVE_SELECTOR);
            $ngModel = directiveElement.controller('ngModel');
            input = directiveElement.find(INPUT_SELECTOR);
        }));

        it('should change ngModel when value is changed', function() {
            input.val('200.05').trigger('input');
            expect($scope.ngModel).toBe(200.05);
        });

        it('should set ngModel.$dirty when button clicked', function() {
            input.val('100').trigger('input');
            expect($ngModel.$dirty).toBe(true);
        });

        it('should set ngModel.$touched when blured', function() {
            input.triggerHandler('blur')
            expect($ngModel.$touched).toBe(true);
        });

        it('should style nearest parent form-group when focussed', function() {
            input.triggerHandler('focus');
            expect(directiveElement.closest('.form-group').hasClass('focus')).toBe(true);
        });
    });

    describe('validation', function() {
        beforeEach(inject(function($injector) {
            $scope.isRequired = true;
            $scope.minValue = 10;
            $scope.maxValue = 100;
            templateElement = getCompiledTemplateElement($scope);
            directiveElement = templateElement.find(DIRECTIVE_SELECTOR);
            $ngModel = directiveElement.controller('ngModel');
            input = directiveElement.find(INPUT_SELECTOR);
        }));

        it('should be valid when not required and empty', function() {
            $scope.isRequired = false;
            templateElement = getCompiledTemplateElement($scope);
            input.trigger('input');

            expect(templateElement.find(DIRECTIVE_SELECTOR).hasClass('ng-invalid')).toBe(false);
        });

        it('should be invalid when required and empty', function() {
            $scope.isRequired = true;
            input.trigger('input');

            expect(directiveElement.hasClass('ng-invalid')).toBe(true);
            expect(directiveElement.hasClass('ng-invalid-required')).toBe(true);
        });

        it('should be invalid when min is not reached', function() {
            input.val('5').trigger('input');

            expect(directiveElement.hasClass('ng-invalid')).toBe(true);
            expect(directiveElement.hasClass('ng-invalid-min')).toBe(true);
            expect(directiveElement.hasClass('ng-invalid-max')).toBe(false);
            expect(directiveElement.hasClass('ng-invalid-required')).toBe(false);
        });

        it('should be invalid when min is zero', function() {
            input.val('0').trigger('input');

            expect(directiveElement.hasClass('ng-invalid')).toBe(true);
            expect(directiveElement.hasClass('ng-invalid-min')).toBe(true);
        });

        it('should be invalid when max is not reached', function() {
            input.val('500').trigger('input');

            expect(directiveElement.hasClass('ng-invalid')).toBe(true);
            expect(directiveElement.hasClass('ng-invalid-min')).toBe(false);
            expect(directiveElement.hasClass('ng-invalid-max')).toBe(true);
            expect(directiveElement.hasClass('ng-invalid-required')).toBe(false);
        });

        it('should be valid when value is correct', function() {
            input.val('50').trigger('input');

            expect(templateElement.find(DIRECTIVE_SELECTOR).hasClass('ng-invalid')).toBe(false);
        });
    });

    function getCompiledTemplateElement($scope) {
        var element = angular.element(' \
            <div class="form-group"> \
                <label class="control-label"> \
                    Example currency input \
                </label> \
                <tw-currency-input \
    				tw-validation \
                    currency-symbol="€" \
                    currency-code="EUR" \
    			    ng-model="ngModel" \
                    ng-required="isRequired" \
                    ng-min="minValue" \
                    ng-max="maxValue" /> \
            </div> \
        ');

        var compiledElement = $compile(element)($scope);
        $scope.$digest();

        return compiledElement;
    }
});
