'use strict';

describe('Directive: TwCards', function() {
    var $compile,
        $rootScope,
        $scope,
        isolateScope,
        directiveElement;

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