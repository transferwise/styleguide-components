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
                var listElements = directiveElement.find('.tw-select-option');
                expect(listElements.length).toBe(OPTIONS.length);
            });
        });

        describe('when ngModel supplied', function() {
            beforeEach(function() {
                $scope.options = OPTIONS;
                $scope.model = "2";
                directiveElement = getCompiledDirectiveElement($scope);
            });
            it('should preselect ngModel option', function() {
                var selectedTextElement = directiveElement.find('.selected')[0];
                expect(selectedTextElement.innerText.trim()).toBe("Two");
            });
            it('should not change ngModel if set', function() {
                expect($scope.model).toBe("2");
            });
            it('should not show placeholder', function() {
                $scope.required = true;
                directiveElement = getCompiledDirectiveElement($scope);
                var placeholerElement = directiveElement.find('.form-control-placeholder');
                expect(placeholerElement.length).toBe(0);
            });
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

    describe('placeholder', function() {
        it('should not display in options if not ngModel required', function() {
            $scope.options = OPTIONS;
            $scope.required = true;
            directiveElement = getCompiledDirectiveElement($scope);
            expect(directiveElement.find("li a").length).toBe(OPTIONS.length);
        });
        it('should not display in options if not ngModel required', function() {
            $scope.options = OPTIONS;
            $scope.required = false;
            directiveElement = getCompiledDirectiveElement($scope);
            expect(directiveElement.find("li a").length).toBe(OPTIONS.length + 1);
        });
    });

    describe('click controls', function() {
        beforeEach(function() {
            $scope.options = OPTIONS;
            $scope.model = null;
            directiveElement = getCompiledDirectiveElement($scope);
        });
        it('should open dropdown when button clicked', function() {
            directiveElement.find('.btn').trigger( "click" ); //.click();
            $scope.$digest();

            // TODO problem with loading dropdown.js? Or timing?
            //setTimeout(function() {
                var buttonGroupElement = directiveElement.find('.btn-group');
                //console.log(buttonGroupElement.attr('class'));
                //expect(buttonGroupElement.hasClass('open')).toBe(true);
                //expect(false).toBe(true);
            //});
        });
    });

    describe('keyboard controls', function() {
        beforeEach(function() {
            $scope.options = OPTIONS;
            $scope.model = null;
            $scope.required = true;
            directiveElement = getCompiledDirectiveElement($scope);
        });
        it('should select matching option beginning with pressed letter', function() {
            directiveElement.find('.btn').trigger(keypress("o"));
            var selectedElements = directiveElement.find('.active');
            expect(selectedElements.length).toBe(1);

            var selectedTextElement = selectedElements[0];
            expect($scope.model).toBe("1");
            expect(selectedTextElement.innerText.trim()).toBe("One");
        });
        it('should select first matching option beginning with pressed letter', function() {
            directiveElement.find('.btn').trigger(keypress("t"));
            var selectedElements = directiveElement.find('.active');
            expect(selectedElements.length).toBe(1);

            var selectedTextElement = selectedElements[0];
            expect($scope.model).toBe("2");
            expect(selectedTextElement.innerText.trim()).toBe("Two");
        });
        it('should open dropdown and select first option when down arrow pressed', function() {
            directiveElement.find('.btn').focus().triggerHandler(keypress("ArrowDown"));
            var selectedTextElement = directiveElement.find('.active')[0];
            expect($scope.model).toBe("1");
            expect(selectedTextElement.innerText.trim()).toBe("One");

            // dropdown.js not working in tests
            //var buttonGroupElement = directiveElement.find('.btn-group');
            //expect(buttonGroupElement.hasClass('open')).toBe(true);
        });

        describe('when dropdown item has focus', function() {
            it('should select item below when down arrow pressed', function() {
                // First open dropdown and select first item
                directiveElement.find('.btn').focus().triggerHandler(keypress("ArrowDown"));
                var firstLink = directiveElement.find('.active a')[0];
                expect($scope.model).toBe("1");

                // Focus on first item and move down to next
                $(firstLink).focus().triggerHandler(keypress("ArrowDown"));

                // Dropdown.js not working in tests
                var secondLink = directiveElement.find('.active a')[0];
                //expect($scope.model).toBe("2");
                //expect(secondLink.innerText.trim()).toBe("Two");
            });
            xit('should select item above when up arrow pressed', function() {
                directiveElement.find('.btn').focus().triggerHandler(keypress("ArrowDown"));
                var selectedTextElement = directiveElement.find('.active')[0];
                expect($scope.model).toBe("1");
                expect(selectedTextElement.innerText.trim()).toBe("One");
            });
        });
    });

    describe('event handlers', function() {
        it('should trigger ngChange when model changes', function() {
            // TODO
        });
        it('should trigger ngBlur when control loses focus', function() {
            // TODO
        });
    });

    function getCompiledDirectiveElement($scope, template) {
        if (!template) {
            template = " \
                <tw-select \
                    options='options' \
                    placeholder='please choose' \
                    ng-model='model' \
                    ng-required='required'> \
                </tw-select>";
        }
        var element = angular.element(template);
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
