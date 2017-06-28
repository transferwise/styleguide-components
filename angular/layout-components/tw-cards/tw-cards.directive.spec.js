'use strict';

fdescribe('Directive: TwCards', function() {
    var $compile,
        $rootScope,
        $scope,
        isolateScope,
        directiveElement;

    beforeEach(module('tw.layout-components'));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
        $scope = $rootScope.$new();
    }));

    var template = " \
        <tw-cards> \
            <tw-card \
                icon='TRANSFER' \
                colour='blue' \
                expanded='expanded'> \
                <collapsed> \
                    <a class='collapsed-content'></a> \
                </collapsed> \
                <expandin> \
                    <a class='expanded-content'></a> \
                </expandin> \
            </tw-card> \
        </tw-cards>";

    describe('transclusion of collapsed content', function() {
        beforeEach(function() { 
            $scope.expanded = false;
            directiveElement = getCompiledDirectiveElement($scope, template);
        });
        it('should render transcluded only content of collapsed card', function() {
            var collapsed = directiveElement.find('.collapsed-content');
            expect(collapsed.length).toBe(1);
        });
    });

    describe('transclusion of expanded & collapsed content', function() {
        beforeEach(function() {
            $scope.expanded = true;
            directiveElement = getCompiledDirectiveElement($scope, template);
        });
        it('should render transcluded content of fully expanded card', function() {
            var collapsed = directiveElement.find('.collapsed-content');
            expect(collapsed.length).toBe(1);
            var expanded = directiveElement.find('.expanded-content');
            expect(expanded.length).toBe(1);
        });
    });

    function getCompiledDirectiveElement($scope, template) {
        var element = angular.element(template);
        // append to document so we can test document.activeElement
        angular.element(document.body).append(element);
        var compiledElement = $compile(element)($scope);

        $scope.$digest();
        return compiledElement;
    }
});