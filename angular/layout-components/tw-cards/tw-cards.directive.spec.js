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

    describe('transclusion, collapsed', function() {
        beforeEach(function() {
            var template = " \
                <tw-cards> \
                    <tw-card \
                        icon='TRANSFER' \
                        colour='blue'> \
                        <collapsed> \
                            <a class='transcluded-content'></a> \
                        </collapsed> \
                        <expandin> \
                            <a class='transcluded-content'></a> \
                        </expandin> \
                    </tw-card> \
                </tw-cards>";
            directiveElement = getCompiledDirectiveElement($scope, template);
        });
        it('should render transcluded content of collapsed card', function() {
            var transcluded = directiveElement.find('.transcluded-content');
            expect(transcluded.length).toBe(1);
        });
    });

    describe('transclusion, expanded', function() {
        beforeEach(function() {
            var template = " \
                <tw-cards> \
                    <tw-card \
                        icon='TRANSFER' \
                        colour='blue' \
                        expanded='true'> \
                        <collapsed> \
                            <a class='transcluded-content'></a> \
                        </collapsed> \
                        <expandin> \
                            <a class='transcluded-content'></a> \
                        </expandin> \
                    </tw-card> \
                </tw-cards>";
            directiveElement = getCompiledDirectiveElement($scope, template);
        });
        it('should render transcluded content of fully expanded card', function() {
            var transcluded = directiveElement.find('.transcluded-content');
            expect(transcluded.length).toBe(2);
        });
    });

    function getCompiledDirectiveElement($scope, template) {
        if (!template) {
            template = ' \
                <tw-cards> \
                    <tw-card \
                    	icon = "TRANSFER" \
                    	colour = "blue" \
                    	form = "true" \
                    > \
                    	<collapsed>one</collapsed> \
                    	<expandin>two</expandin> \
                    	<card-form>three</card-form> \
                    </tw-card> \
                </tw-cards>';
        }
        var element = angular.element(template);
        // append to document so we can test document.activeElement
        angular.element(document.body).append(element);
        var compiledElement = $compile(element)($scope);

        $scope.$digest();
        return compiledElement;
    }
});