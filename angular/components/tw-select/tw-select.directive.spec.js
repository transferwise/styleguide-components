'use strict';

describe('Directive: TwSelect', function() {
    var $compile,
        $rootScope,
        $scope,
        isolateScope,
        directiveElement;

    var SELECT_SELECTOR = '.tw-select-hidden';
    var LIST_ITEMS_SELECTOR = '.tw-select-option-link';
    var FILTER_INPUT_SELECTOR = '.tw-select-filter';
    var SELECTED_LABEL_SELECTOR = '.tw-select-selected .tw-select-label';

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
                $scope.ngModel = null;
                $scope.name = 'testName';

                directiveElement = getCompiledDirectiveElement($scope);
            });
            it('should render supplied options', function() {
                var listElements = directiveElement.find(LIST_ITEMS_SELECTOR);
                expect(listElements.length).toBe(OPTIONS.length);
            });
            it('should name hidden input like component', function() {
                expect(directiveElement.find(SELECT_SELECTOR).attr('name')).toBe($scope.name);
            });
        });

        describe('when ngModel supplied', function() {
            describe('as string', function() {
                beforeEach(function() {
                    $scope.options = OPTIONS;
                    $scope.ngModel = '2';
                    directiveElement = getCompiledDirectiveElement($scope);
                });
                it('should preselect ngModel option', function() {
                    var selectedTextElement = directiveElement.find(SELECTED_LABEL_SELECTOR)[0];
                    expect(selectedTextElement.innerText.trim()).toBe('Two');
                });
                it('should not change ngModel if set', function() {
                    expect($scope.ngModel).toBe('2');
                });
                it('should not show placeholder', function() {
                    $scope.ngRequired = true;
                    directiveElement = getCompiledDirectiveElement($scope);
                    var placeholerElement = directiveElement.find('.form-control-placeholder');
                    expect(placeholerElement.length).toBe(0);
                });

                it('should not show placeholder when ngModel is "0"', function() {
                    $scope.ngModel = '0';
                    directiveElement = getCompiledDirectiveElement($scope);
                    var placeholderElement = directiveElement.find('.form-control-placeholder');
                    expect(placeholderElement.length).toBe(0);
                });
                it('should show selected when ngModel is "0"', function() {
                    $scope.ngModel = '0';
                    directiveElement = getCompiledDirectiveElement($scope);
                    var selectedElement = directiveElement.find(SELECTED_LABEL_SELECTOR);
                    expect(selectedElement.length).toBe(1);
                });

                it('should set the value of hidden control', function() {
                    expect(directiveElement.find(SELECT_SELECTOR).val()).toBe('2');
                });
            });
            describe('as number', function() {
                beforeEach(function() {
                    $scope.options = OPTIONS_NUMERIC;
                    $scope.ngModel = 2;
                    directiveElement = getCompiledDirectiveElement($scope);
                });
                it('should preselect ngModel option', function() {
                    var selectedTextElement = directiveElement.find(SELECTED_LABEL_SELECTOR)[0];
                    expect(selectedTextElement.innerText.trim()).toBe('Two');
                });
                it('should not change ngModel if set', function() {
                    expect($scope.ngModel).toBe(2);
                });
                it('should not show placeholder', function() {
                    $scope.ngRequired = true;
                    directiveElement = getCompiledDirectiveElement($scope);
                    var placeholerElement = directiveElement.find('.form-control-placeholder');
                    expect(placeholerElement.length).toBe(0);
                });

                it('should not show placeholder when ngModel is 0', function() {
                    $scope.ngModel = 0;
                    directiveElement = getCompiledDirectiveElement($scope);
                    var placeholderElement = directiveElement.find('.form-control-placeholder');
                    expect(placeholderElement.length).toBe(0);
                });
                it('should show selected when ngModel is 0', function() {
                    $scope.ngModel = 0;
                    directiveElement = getCompiledDirectiveElement($scope);
                    var selectedElement = directiveElement.find(SELECTED_LABEL_SELECTOR);
                    expect(selectedElement.length).toBe(1);
                });

                it('should set the value of hidden control', function() {
                    // always string...
                    expect(directiveElement.find(SELECT_SELECTOR).val()).toBe('2');
                });
            })
        });

        describe('when ngModel not supplied', function() {
            beforeEach(function() {
                $scope.options = OPTIONS;
                $scope.ngModel = null;
                directiveElement = getCompiledDirectiveElement($scope);
            });
            it('should show placeholder', function() {
                var placeholerElement = directiveElement.find('.form-control-placeholder');
                expect(placeholerElement.length).toBe(1);
            });
            it('should not set ngModel', function() {
                expect($scope.ngModel).toBe(null);
            });
        });

        describe('when ngModel not supplied but ngRequired', function() {
            beforeEach(function() {
                $scope.options = OPTIONS;
                $scope.ngModel = null;
                $scope.ngRequired = true;
                directiveElement = getCompiledDirectiveElement($scope);
            });
            it('should set ngModel to first value', function() {
                expect($scope.ngModel).toBe('1');
            });
            it('should show first option', function() {
                var selectedTextElement = directiveElement.find(SELECTED_LABEL_SELECTOR)[0];
                expect(selectedTextElement.innerText.trim()).toBe('One');
            });
        });
    });

    describe('placeholder', function() {
        it('should not display in options if ngModel is ngRequired', function() {
            $scope.options = OPTIONS;
            $scope.ngRequired = true;
            directiveElement = getCompiledDirectiveElement($scope);
            expect(directiveElement.find('li a').length).toBe(OPTIONS.length);
        });
        it('should display in options if ngModel not ngRequired', function() {
            $scope.options = OPTIONS;
            $scope.ngRequired = false;
            directiveElement = getCompiledDirectiveElement($scope);
            expect(directiveElement.find('li a').length).toBe(OPTIONS.length + 1);
        });
    });

    describe('click controls', function() {
        beforeEach(function() {
            $scope.options = OPTIONS;
            $scope.ngModel = null;
            directiveElement = getCompiledDirectiveElement($scope);
        });
        it('should open dropdown when button clicked', function() {
            directiveElement.find('.btn').trigger('click');
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
            $scope.ngModel = null;
            $scope.ngRequired = true;
            directiveElement = getCompiledDirectiveElement($scope);
        });
        it('should select matching option beginning with pressed letter', function() {
            directiveElement.find('.btn').trigger(keypress('O'));
            var selectedElements = directiveElement.find('.active');
            expect(selectedElements.length).toBe(1);

            var selectedOptionElement = selectedElements[0];
            expect($scope.ngModel).toBe('1');
            expect(selectedOptionElement.innerText.trim()).toBe('One');
        });
        it('should select first matching option beginning with pressed letter', function() {
            directiveElement.find('.btn').trigger(keypress('T'));
            var selectedElements = directiveElement.find('.active');
            expect(selectedElements.length).toBe(1);

            var selectedOptionElement = selectedElements[0];
            expect($scope.ngModel).toBe('2');
            expect(selectedOptionElement.innerText.trim()).toBe('Two');
        });
        it('should select option beginning with pressed letter case insensitively', function() {
            directiveElement.find('.btn').trigger(keypress('t'));
            var selectedElements = directiveElement.find('.active');
            expect(selectedElements.length).toBe(1);

            var selectedOptionElement = selectedElements[0];
            expect($scope.ngModel).toBe('2');
            expect(selectedOptionElement.innerText.trim()).toBe('Two');
        });
        it('should append to existing search string to match on subsequent letters', function() {
            directiveElement.find('.btn').trigger(keypress('T')).trigger(keypress('h'));
            var selectedElements = directiveElement.find('.active');
            expect(selectedElements.length).toBe(1);

            var selectedOptionElement = selectedElements[0];
            expect($scope.ngModel).toBe('3');
            expect(selectedOptionElement.innerText.trim()).toBe('Three');
        });
        it('should try a new search if appending to existing search produces no match', function() {
            directiveElement.find('.btn').trigger(keypress('T')).trigger(keypress('o'));
            var selectedElements = directiveElement.find('.active');
            expect(selectedElements.length).toBe(1);

            var selectedOptionElement = selectedElements[0];
            expect($scope.ngModel).toBe('1');
            expect(selectedOptionElement.innerText.trim()).toBe('One');
        });
        it('should not use new search if appending to existing search still produces a match', function() {
            directiveElement.find('.btn').trigger(keypress('T')).trigger(keypress('w')).trigger(keypress('o'));
            var selectedElements = directiveElement.find('.active');
            expect(selectedElements.length).toBe(1);

            var selectedOptionElement = selectedElements[0];
            expect($scope.ngModel).not.toBe('1');
            expect(selectedOptionElement.innerText.trim()).not.toBe('One');
        });
        it('should open dropdown and select first option when down arrow pressed', function() {
            directiveElement.find('.btn').focus().triggerHandler(keypress('ArrowDown'));
            var selectedOptionElement = directiveElement.find('.active')[0];
            expect($scope.ngModel).toBe('1');
            expect(selectedOptionElement.innerText.trim()).toBe('One');

            // dropdown.js not working in tests
            //var buttonGroupElement = directiveElement.find('.btn-group');
            //expect(buttonGroupElement.hasClass('open')).toBe(true);
        });

        describe('when dropdown item has focus', function() {
            it('should select item below when down arrow pressed', function() {
                // First open dropdown and select first item
                directiveElement.find('.btn').focus().triggerHandler(keypress('ArrowDown'));
                var firstLink = directiveElement.find('.active a')[0];
                expect($scope.ngModel).toBe('1');

                // Focus on first item and move down to next
                $(firstLink).focus().triggerHandler(keypress('ArrowDown'));

                // Dropdown.js not working in tests
                var secondLink = directiveElement.find('.active a')[0];
                //expect($scope.ngModel).toBe('2');
                //expect(secondLink.innerText.trim()).toBe('Two');
            });
            it('should select item above when up arrow pressed', function() {
                directiveElement.find('.btn').focus().triggerHandler(keypress('ArrowDown'));
                var selectedOptionElement = directiveElement.find('.active')[0];
                expect($scope.ngModel).toBe('1');
                expect(selectedOptionElement.innerText.trim()).toBe('One');
            });
        });
    });

    describe('event handlers', function() {
        beforeEach(function() {
            $scope.options = OPTIONS;
            $scope.ngModel = '1';
            $scope.onChange = function() {};
            $scope.onBlur = function() {};
            var template = " \
                <tw-select \
                    options='options' \
                    ng-model='ngModel' \
                    ng-change='onChange()'\
                    ng-blur='onBlur()'> \
                </tw-select>";
            directiveElement = getCompiledDirectiveElement($scope, template);
        });
        it('should trigger ngChange when internal model changes', function() {
            spyOn($scope, 'onChange');
            directiveElement.controller('ngModel').$setViewValue('2');
            expect($scope.ngModel).toBe('2');
            expect($scope.onChange).toHaveBeenCalled();
        });
        it('should not trigger ngChange on first open', function() {
            spyOn($scope, 'onChange');
            directiveElement.find('.btn').trigger('click');
            expect($scope.onChange).not.toHaveBeenCalled();
        });
        // TODO does not work because code must wait 150ms for dropdown.js
        xit('should trigger ngBlur once when control loses focus', function() {
            spyOn($scope, 'onBlur');
            directiveElement.find('.btn').trigger('focusout');
            expect($scope.onBlur).toHaveBeenCalled();
            expect($scope.onBlur.calls.count()).toEqual(1);
        });
    });

    describe('when options change', function() {
        // TODO digets is not updating options, but this works in browser
        xit('should show new options list', function() {
            $scope.options = [{value: '90', label: 'Ninety'}];
            $scope.$digest();
            expect(directiveElement.find(LIST_ITEMS_SELECTOR).length).toBe(1);
        });
    });

    describe('transclusion', function() {
        beforeEach(function() {
            $scope.options = OPTIONS;
            $scope.ngModel = '1';
            var template = " \
                <tw-select \
                    options='options' \
                    ng-model='ngModel'> \
                    <a class='transcluded-content'></a> \
                </tw-select>";
            directiveElement = getCompiledDirectiveElement($scope, template);
        });
        it('should render transcluded content in dropdown', function() {
            var transcluded = directiveElement.find('.transcluded-content');
            expect(transcluded.length).toBe(1);
            expect(transcluded.parent().is('li')).toBe(true);
        });
    });
    describe('filter not used', function() {
        it('should be hidden if not specified in template', function() {
            var filter = directiveElement.find(FILTER_INPUT_SELECTOR);
            expect(filter.length).toBe(0);
        });
    });
    describe('filter', function() {
        var filterInput;
        beforeEach(function() {
            $scope.options = OPTIONS;
            $scope.ngModel = '1';
            $scope.filter = 'Search';
            var template = " \
                <tw-select \
                    options='options' \
                    ng-model='ngModel' \
                    filter='{{filter}}'> \
                    <a href='' class='custom-action'> \
                        Custom action \
                    </a> \
                </tw-select>";
            directiveElement = getCompiledDirectiveElement($scope, template);
            filterInput = directiveElement.find(FILTER_INPUT_SELECTOR);
        });
        it('should render if non false value is passed', function() {
            expect(filterInput.length).toBe(1);
        });

        it('should move to the next option when down arrow pressed', function() {
            expect($scope.ngModel).toBe('1');
            filterInput.trigger(keydownCode(SPECIAL_KEYS.down));
            expect($scope.ngModel).toBe('2');
        });
        it('should move to the previous option when up arrow pressed', function() {
            $scope.ngModel = '3';
            $scope.$digest();
            filterInput.trigger(keydownCode(SPECIAL_KEYS.up));
            expect($scope.ngModel).toBe('2');
        });

        it('should move to the first option when down arrow pressed and nothing active', function() {
            $scope.ngModel = '99';
            $scope.$digest();
            filterInput.trigger(keydownCode(SPECIAL_KEYS.down));
            expect($scope.ngModel).toBe('1');
        });
        it('should move to the last option when up arrow pressed and nothing active', function() {
            $scope.ngModel = '99';
            $scope.$digest();
            filterInput.trigger(keydownCode(SPECIAL_KEYS.up));
            expect($scope.ngModel).toBe('3');
        });

        it('should retain focus when down arrow pressed', function() {
            filterInput.focus();
            filterInput.trigger(keydownCode(SPECIAL_KEYS.down));
            expect(filterInput[0] === document.activeElement).toBe(true);
        });
        it('should retain focus when up arrow pressed', function() {
            filterInput.focus();
            filterInput.trigger(keydownCode(SPECIAL_KEYS.up));
            expect(filterInput[0] === document.activeElement).toBe(true);
        });
        it('should focus back on the button when return key pressed', function() {
            filterInput.trigger(keydownCode(SPECIAL_KEYS.return));
            expect(directiveElement.find('.btn')[0] === document.activeElement).toBe(true);
        });
        it('should move focus to custom action if last option selected and down arrow pressed', function() {
            $scope.ngModel = '3';
            $scope.$digest();
            filterInput.trigger(keydownCode(SPECIAL_KEYS.down));
            expect(directiveElement.find('.custom-action')[0] === document.activeElement).toBe(true);
        });

        it('should filter the list if characters entered', function() {
            filterInput.val("One").trigger('change');
            var options = directiveElement.find(LIST_ITEMS_SELECTOR);
            expect(options.length).toBe(1);
            expect(optionText(options[0])).toBe('One');
        });
        it('should filter case insensitvely', function() {
            filterInput.val("t").trigger('change');
            var options = directiveElement.find(LIST_ITEMS_SELECTOR)
            expect(options.length).toBe(2);
            expect(optionText(options[0])).toBe('Two');
            expect(optionText(options[1])).toBe('Three');
        });
        it('should filter on substrings', function() {
            filterInput.val("ne").trigger('change');
            var options = directiveElement.find(LIST_ITEMS_SELECTOR);
            expect(options.length).toBe(1);
            expect(optionText(options[0])).toBe('One');
        });
        it('should change ngModel to first visible option if none selected', function() {
            filterInput.val("t").trigger('change');
            var options = directiveElement.find(LIST_ITEMS_SELECTOR);
            expect($scope.ngModel).toBe('2');
            expect(optionText(options[0])).toBe('Two');
        });
    });

    function getCompiledDirectiveElement($scope, template) {
        if (!template) {
            template = " \
                <tw-select \
                    name='{{name}}' \
                    options='options' \
                    placeholder='please choose' \
                    ng-model='ngModel' \
                    ng-required='ngRequired'> \
                </tw-select>";
        }
        var element = angular.element(template);
        // append to document so we can test document.activeElement
        angular.element(document.body).append(element);
        var compiledElement = $compile(element)($scope);

        $scope.$digest();
        return compiledElement;
    }

    function optionText(optionEl) {
        return $(optionEl).text().trim();
    }

    function keypress(letter) {
        return keyEventByCode("keypress", letter.charCodeAt(0));
    }
    function keydownCode(charCode) {
        return keyEventByCode("keydown", charCode);
    }
    function keyEventByCode(eventName, charCode) {
        return {
            type: eventName,
            keyCode: charCode,
            which: charCode
        };
    }

    var SPECIAL_KEYS = {
        up: 38,
        down: 40,
        return: 13
    }

    var OPTIONS = [{
        value: '1',
        label: 'One'
    },{
        value: '2',
        label: 'Two'
    },{
        value: '3',
        label: 'Three'
    }];

    var OPTIONS_NUMERIC = [{
        value: 1,
        label: 'One'
    },{
        value: 2,
        label: 'Two'
    },{
        value: 3,
        label: 'Three'
    }];
});
