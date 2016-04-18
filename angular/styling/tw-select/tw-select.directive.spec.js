'use strict';

describe('Directive: TwSelect', function() {
    var $compile,
        $rootScope,
        $scope,
        isolateScope,
        directiveElement;

    beforeEach(module('tw.form-components'));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
        $scope = $rootScope.$new();
    }));

    describe('init', function() {
        describe('basics', function() {
            beforeEach(function() {
                $scope.options = OPTIONS;
                $scope.model = null;

                directiveElement = getCompiledDirectiveElement($scope);
            });
            it('should render supplied options', function() {
                var listElements = directiveElement.find('li');
                expect(listElements.length).toBe(3);
            });
        })

        describe('when ngModel supplied', function() {
            beforeEach(function() {
                $scope.options = OPTIONS;
                $scope.model = "2";

                directiveElement = getCompiledDirectiveElement($scope);
            });
            /*
            it('should preselect ngModel option', function() {
                var selectedTextElement = directiveElement.find('.selected')[0];
                expect(selectedTextElement.innerText.trim()).toBe("Two");
            });
            it('should not change ngModel if set', function() {
                expect($scope.model).toBe("2");
            });
            /**/
        });

        describe('when ngModel not supplied', function() {
            beforeEach(function() {
                $scope.options = OPTIONS;
                $scope.model = null;

                directiveElement = getCompiledDirectiveElement($scope);
            });
            it('should show placeholder', function() {
                var placeholerElement = directiveElement.find('.form-control-placeholder');
                expect(placeholerElement.length).toBe(1);
            });
            it('should not set ngModel', function() {
                expect($scope.model).toBe(null);
            });
        });

        describe('when ngModel not supplied but required', function() {
            beforeEach(function() {
                $scope.options = OPTIONS;
                $scope.model = null;
                $scope.required = true;

                directiveElement = getCompiledDirectiveElement($scope);
            });
            it('should set ngModel to first value', function() {
                expect($scope.model).toBe("1");
            });
            it('should show first option', function() {
                var selectedTextElement = directiveElement.find('.selected')[0];
                expect(selectedTextElement.innerText.trim()).toBe("One");
            });
        });
    });

    describe('click controls', function() {
        beforeEach(function() {
            $scope.options = OPTIONS;
            $scope.model = null;

            directiveElement = getCompiledDirectiveElement($scope);
        });
        it('should open dropdown when button clicked', function() {
            directiveElement.find('.btn').click();
            $scope.$digest();
            var buttonGroupElement = directiveElement.find('.btn-group');
            //expect(buttonGroupElement.hasClass('open')).toBe(true);
        });
    });

    describe('keyboard controls', function() {
        beforeEach(function() {
            $scope.options = OPTIONS;
            $scope.model = null;

            directiveElement = getCompiledDirectiveElement($scope);
        });
        /**/
        it('should select matching option beginning with pressed letter', function() {
            //directiveElement.find('.btn').trigger(keypress("o"));
            var selectedTextElement = directiveElement.find('.selected')[0];
            //expect($scope.model).toBe("1");
            //expect(selectedTextElement.innerText.trim()).toBe("One");
        });
        it('should select first matching option beginning with pressed letter', function() {
            //directiveElement.find('button').triggerHandler(keypress("t"));
            //directiveElement.find('button').triggerHandler({
            //    type: "keypress",
            //    keyCode: KEYCODES['t'],
            //    which: KEYCODES['t']
            //});

            directiveElement.find('button').trigger(
                //jQuery.Event( 'keypress', {keyCode: KEYCODES.t, which: KEYCODES.t } )
                'click'
                //, {keyCode: KEYCODES.t, which: KEYCODES.t }
            );

            var selectedTextElement = directiveElement.find('.selected')[0];
            //expect($scope.model).toBe("2");
            //expect(selectedTextElement.innerText.trim()).toBe("Two");
        });
        /**/

        /**
        // Must load bootstrap dropdown.js
        it('should open dropdown and select first option when down arrow pressed', function() {
            directiveElement.find('.btn').focus().triggerHandler(keypress("ArrowDown"));
            //directiveElement.find('.btn').focus().triggerHandler(keypress("ArrowDown"));
            var selectedTextElement = directiveElement.find('.selected')[0];
            expect($scope.model).toBe("1");
            expect(selectedTextElement.innerText.trim()).toBe("One");
        });
        /**/
    });

    function getCompiledDirectiveElement($scope) {
        var element = angular.element(" \
            <tw-select \
                tw-options='options' \
                ng-model='model' \
                ng-required='required'> \
            </tw-select>");

        var compiledElement = $compile(element)($scope);
        $scope.$digest();
        return compiledElement;
    }

    function getIsolateScope(directiveElement) {
        return directiveElement.isolateScope().$ctrl;
    }

    function keypress(letter) {
        return {
            type: "keypress",
            key: letter,
            keyCode: KEYCODES[letter],
            which: KEYCODES[letter]
        };
    }

    var KEYCODES = {
        "o": 111,
        "t": 116,
        "ArrowUp": 38,
        "ArrowDown": 40
    };

    var OPTIONS = [{
        value: "1",
        label: "One"
    },{
        value: "2",
        label: "Two"
    },{
        value: "3",
        label: "Three"
    }];
});
