'use strict';

describe('Directive: TwCards', function() {
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

    var cardTemplate = "\
        <tw-card \
            state='info' \
            enlarged='enlarged'> \
            <card-icon>T</card-icon> \
            <collapsed> \
                <a class='collapsed-content'></a> \
            </collapsed> \
            <expanded> \
                <a class='expanded-content'></a> \
            </expanded> \
        </tw-card>";

    var cardSetTemplate = function(contents) {
        if(contents === undefined) return "<tw-cards>" + cardTemplate + "</tw-cards>";
        return "<tw-cards>" + contents + "</tw-cards>";
    }

    describe('transclusion of collapsed content', function() {
        beforeEach(function() { 
            $scope.enlarged = false;
            directiveElement = getCompiledDirectiveElement($scope, cardSetTemplate());
        });
        it('should render transcluded only content of collapsed card', function() {
            var collapsed = directiveElement.find('.collapsed-content');
            expect(collapsed.length).toBe(1);
        });
    });

    describe('transclusion of expanded & collapsed content', function() {
        beforeEach(function() {
            $scope.enlarged = true;
            directiveElement = getCompiledDirectiveElement($scope, cardSetTemplate());
        });
        it('should render transcluded content of fully expanded card', function() {
            var collapsed = directiveElement.find('.collapsed-content');
            expect(collapsed.length).toBe(1);
            var enlarged = directiveElement.find('.expanded-content');
            expect(enlarged.length).toBe(1);
        });
    });

    describe('expansion of one of two pre-expanded cards', function() {
        beforeEach(function() {
            $scope.enlarged = true;
            directiveElement = getCompiledDirectiveElement($scope, cardSetTemplate(cardTemplate + cardTemplate));
        });
        it('only expand one card', function() {
            var enlarged = directiveElement.find('.expanded-content');
            expect(enlarged.length).toBe(1); // as opposed to two
        });
    });

    describe('expansion of one of two pre-expanded cards in two different sets', function() {
        beforeEach(function() {
            $scope.enlarged = true;
            directiveElement = getCompiledDirectiveElement($scope, cardSetTemplate() + cardSetTemplate());
        });
        it('only expand one card', function() {
            var enlarged = directiveElement.find('.expanded-content');
            expect(enlarged.length).toBe(1); // as opposed to two
        });
    });

    function getCompiledDirectiveElement($scope, template) {
        var element = angular.element(cardSetTemplate());
        // append to document so we can test document.activeElement
        angular.element(document.body).append(element);
        var compiledElement = $compile(element)($scope);

        $scope.$digest();
        return compiledElement;
    }
});