'use strict';

describe('Directive: TwUploadDroppable', function() {
    var $compile,
        $rootScope,
        $scope,
        isolateScope,
        directiveElement;

    var INPUT_SELECTOR = '.hidden';
    var LIST_ITEMS_SELECTOR = '.tw-select-option-link';
    var FILTER_INPUT_SELECTOR = '.tw-select-filter';

    beforeEach(module('tw.form-components'));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
        $scope = $rootScope.$new();
    }));

    describe('transclusion', function() {
        beforeEach(function() {
            $scope.options = OPTIONS;
            $scope.ngModel = '1';
            var template = " \
		                <tw-upload-droppable \
		                    title='Drag and drop here' \
		                    buttonText='or click here' \
		                    placeholder='please choose' \
		                    on-upload='uploadFunction' \
		                    ng-accept='csv'> \
												<a class='transcluded-content'></a> \
		                </tw-upload-droppable>";
            directiveElement = getCompiledDirectiveElement($scope, template);
        });
        it('should render transcluded content', function() {
            var transcluded = directiveElement.find('.transcluded-content');
            expect(transcluded.length).toBe(1);
        });
    });

    function getCompiledDirectiveElement($scope, template) {
        if (!template) {
            template = " \
                <tw-upload-droppable \
                    title='Drag and drop here' \
                    buttonText='or click here' \
                    placeholder='please choose' \
                    on-upload='uploadFunction' \
                    ng-accept='csv'> \
                </tw-upload-droppable>";
        }
        var element = angular.element(template);
        // append to document so we can test document.activeElement
        angular.element(document.body).append(element);
        var compiledElement = $compile(element)($scope);

        $scope.$digest();
        return compiledElement;
    }
});
