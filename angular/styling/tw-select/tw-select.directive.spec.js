'use strict';

describe('Directive: TwDate', function() {
    var $compile,
        $rootScope,
        inputScope;

    beforeEach(module('tw.form-components'));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');

        inputScope = $rootScope.$new();

        inputScope.options = [{
            value: "1",
            label: "one"
        }];
        inputScope.model = 1;
    }));

    describe('init', function() {
        var directiveElement, viewModel;
        beforeEach(function () {
            directiveElement = getCompiledDirectiveElement();
            viewModel = getViewModel(directiveElement);
        });
        it('true should be true', function () {
            expect(true).toBe(true);
        });
    });

    function getCompiledDirectiveElement() {
        var elementAsString = " \
            <tw-select \
                options='options' \
                ng-model='model'> \
            </tw-select>";

        var element = angular.element(elementAsString);
        var compiledElement = $compile(element)(inputScope);
        inputScope.$digest();
        return compiledElement;
    }

    function getViewModel(directiveElement) {
        return directiveElement.isolateScope().vm;
    }
});
