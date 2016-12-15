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
    var SELECTED_NOTE_SELECTOR = '.tw-select-selected .tw-select-note';
    var SELECTED_SECONDARY_SELECTOR = '.tw-select-selected .tw-select-secondary';
    var SELECTED_CURRENCY_FLAG_SELECTOR = '.tw-select-selected .currency-flag';
    var SELECTED_ICON_SELECTOR = '.tw-select-selected .icon';
    var SELECTED_CIRCLE_SELECTOR = '.tw-select-selected .circle';

    var OPTION_NOTE_SELECTOR = '.dropdown-menu .tw-select-note';
    var OPTION_SECONDARY_SELECTOR = '.dropdown-menu .tw-select-secondary';
    var OPTION_CURRENCY_FLAG_SELECTOR = '.dropdown-menu .currency-flag';
    var OPTION_ICON_SELECTOR = '.dropdown-menu a > .icon';
    var OPTION_CIRCLE_IMAGE_SELECTOR = '.dropdown-menu .circle img';
    var OPTION_CIRCLE_TEXT_SELECTOR = '.dropdown-menu .tw-select-circle-text';
    var OPTION_CIRCLE_ICON_SELECTOR = '.dropdown-menu .circle .icon';
    var OPTION_DISABLED_SELECTOR = '.dropdown-menu .disabled';

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

        describe('when intialised with an ngModel', function() {
            describe('as non-empty string that matches an option', function() {
                beforeEach(function() {
                    $scope.options = OPTIONS;
                    $scope.ngModel = '2';
                    directiveElement = getCompiledDirectiveElement($scope);
                });
                it('should show selected text', function() {
                    var selectedTextElement = directiveElement.find(SELECTED_LABEL_SELECTOR)[0];
                    expect($(selectedTextElement).text().trim()).toBe('Two');
                });
                it('should not show placeholder', function() {
                    $scope.ngRequired = true;
                    directiveElement = getCompiledDirectiveElement($scope);
                    var placeholerElement = directiveElement.find('.form-control-placeholder');
                    expect(placeholerElement.length).toBe(0);
                });
                it('should not change ngModel', function() {
                    expect($scope.ngModel).toBe('2');
                });
                it('should set the value of hidden control', function() {
                    expect(directiveElement.find(SELECT_SELECTOR).val()).toBe('2');
                });
            });
            describe('as empty string', function() {
                beforeEach(function() {
                    $scope.options = OPTIONS;
                    $scope.ngModel = '';
                    directiveElement = getCompiledDirectiveElement($scope);
                });
                it('should not show selected text', function() {
                    var selectedElement = directiveElement.find(SELECTED_LABEL_SELECTOR);
                    expect(selectedElement.length).toBe(0);
                });
                it('should show placeholder', function() {
                    var placeholderElement = directiveElement.find('.form-control-placeholder');
                    expect(placeholderElement.length).toBe(1);
                });
                it('should not change ngModel', function() {
                    expect($scope.ngModel).toBe('');
                });
            });
            describe('as string that does not match an option', function() {
                beforeEach(function() {
                    $scope.options = OPTIONS;
                    $scope.ngModel = '99';
                    directiveElement = getCompiledDirectiveElement($scope);
                });
                it('should not show selected text', function() {
                    var selectedElement = directiveElement.find(SELECTED_LABEL_SELECTOR);
                    expect(selectedElement.length).toBe(0);
                });
                it('should show placeholder', function() {
                    var placeholderElement = directiveElement.find('.form-control-placeholder');
                    expect(placeholderElement.length).toBe(1);
                });
                it('should not change ngModel', function() {
                    expect($scope.ngModel).toBe('99');
                });
                it('should not change ngModel even if ngRequired', function() {
                    $scope.ngModel = '99';
                    $scope.$digest();
                    expect($scope.ngModel).toBe('99');
                });
            });
            describe('as non-zero number that matches an option', function() {
                beforeEach(function() {
                    $scope.options = OPTIONS_NUMERIC;
                    $scope.ngModel = 2;
                    directiveElement = getCompiledDirectiveElement($scope);
                });
                it('should show selected text', function() {
                    var selectedTextElement = directiveElement.find(SELECTED_LABEL_SELECTOR)[0];
                    expect($(selectedTextElement).text().trim()).toBe('Two');
                });
                it('should not change ngModel if set', function() {
                    expect($scope.ngModel).toBe(2);
                });
                it('should not show placeholder', function() {
                    var placeholerElement = directiveElement.find('.form-control-placeholder');
                    expect(placeholerElement.length).toBe(0);
                });
                it('should set the value of hidden control', function() {
                    // always string...
                    expect(directiveElement.find(SELECT_SELECTOR).val()).toBe('2');
                });
            });
            describe('as numeric zero that matches an option', function() {
                beforeEach(function() {
                    $scope.options = OPTIONS_NUMERIC;
                    $scope.ngModel = 0;
                    directiveElement = getCompiledDirectiveElement($scope);
                });
                it('should show matching option label', function() {
                    var selectedTextElement = directiveElement.find(SELECTED_LABEL_SELECTOR)[0];
                    expect($(selectedTextElement).text().trim()).toBe(OPTIONS_NUMERIC[0].label);
                });
                it('should not show placeholder', function() {
                    var placeholderElement = directiveElement.find('.form-control-placeholder');
                    expect(placeholderElement.length).toBe(0);
                });
                it('should not change to a non-zero value', function() {
                    expect($scope.ngModel).toBe(0);
                });
            });

            describe('as object that matches an option', function() {
                beforeEach(function() {
                    $scope.options = OPTIONS_OBJECTS;
                    $scope.ngModel = {id: 2};
                    directiveElement = getCompiledDirectiveElement($scope);
                });
                it('should show selected text', function() {
                    var selectedTextElement = directiveElement.find(SELECTED_LABEL_SELECTOR)[0];
                    expect($(selectedTextElement).text().trim()).toBe('Two');
                });
                it('should not show placeholder', function() {
                    directiveElement = getCompiledDirectiveElement($scope);
                    var placeholerElement = directiveElement.find('.form-control-placeholder');
                    expect(placeholerElement.length).toBe(0);
                });
                it('should not change ngModel', function() {
                    expect($scope.ngModel).toEqual({id: 2});
                });
                it('should set the value of hidden control', function() {
                    // always string...
                    expect(directiveElement.find(SELECT_SELECTOR).val()).toBe(JSON.stringify({id: 2}));
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
            it('should not show selected text', function() {
                var selectedElement = directiveElement.find(SELECTED_LABEL_SELECTOR);
                expect(selectedElement.length).toBe(0);
            });
        });

        describe('when ngModel not supplied but ngRequired', function() {
            beforeEach(function() {
                $scope.options = OPTIONS_EXTRAS;
                $scope.ngModel = null;
                $scope.ngRequired = true;
                directiveElement = getCompiledDirectiveElement($scope);
            });
            it('should select first option with a value', function() {
                expect($scope.ngModel).toBe(OPTIONS_EXTRAS[1].value);
            });
            it('should show selected text', function() {
                var selectedTextElement = directiveElement.find(SELECTED_LABEL_SELECTOR)[0];
                expect($(selectedTextElement).text().trim()).toBe(OPTIONS_EXTRAS[1].label);
            });
            it('should select first value even if 0', function() {
                $scope.options = OPTIONS_NUMERIC;
                $scope.ngModel = 0;
                directiveElement = getCompiledDirectiveElement($scope);
                expect($scope.ngModel).toBe(OPTIONS_NUMERIC[0].value);
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
            var OptionOne = OPTIONS[1];
            expect($scope.ngModel).toBe(OptionOne.value);
            expect($(selectedOptionElement).text().trim()).toBe(OptionOne.label);
        });
        it('should select first matching option beginning with pressed letter', function() {
            directiveElement.find('.btn').trigger(keypress('T'));
            var selectedElements = directiveElement.find('.active');
            expect(selectedElements.length).toBe(1);

            var selectedOptionElement = selectedElements[0];
            expect($scope.ngModel).toBe('2');
            expect($(selectedOptionElement).text().trim()).toBe('Two');
        });
        it('should select option beginning with pressed letter case insensitively', function() {
            directiveElement.find('.btn').trigger(keypress('t'));
            var selectedElements = directiveElement.find('.active');
            expect(selectedElements.length).toBe(1);

            var selectedOptionElement = selectedElements[0];
            expect($scope.ngModel).toBe('2');
            expect($(selectedOptionElement).text().trim()).toBe('Two');
        });
        it('should append to existing search string to match on subsequent letters', function() {
            directiveElement.find('.btn').trigger(keypress('T')).trigger(keypress('h'));
            var selectedElements = directiveElement.find('.active');
            expect(selectedElements.length).toBe(1);

            var selectedOptionElement = selectedElements[0];
            expect($scope.ngModel).toBe('3');
            expect($(selectedOptionElement).text().trim()).toBe('Three');
        });
        it('should try a new search if appending to existing search produces no match', function() {
            directiveElement.find('.btn').trigger(keypress('T')).trigger(keypress('o'));
            var selectedElements = directiveElement.find('.active');
            expect(selectedElements.length).toBe(1);

            var selectedOptionElement = selectedElements[0];
            expect($scope.ngModel).toBe('1');
            expect($(selectedOptionElement).text().trim()).toBe('One');
        });
        it('should not use new search if appending to existing search still produces a match', function() {
            directiveElement.find('.btn').trigger(keypress('T')).trigger(keypress('w')).trigger(keypress('o'));
            var selectedElements = directiveElement.find('.active');
            expect(selectedElements.length).toBe(1);

            var selectedOptionElement = selectedElements[0];
            expect($scope.ngModel).not.toBe('1');
            expect($(selectedOptionElement).text().trim()).not.toBe('One');
        });
        it('should open dropdown and select first option when down arrow pressed', function() {
            directiveElement.find('.btn').focus().triggerHandler(keydownCode(SPECIAL_KEYS.down));
            var selectedOptionElement = directiveElement.find('.active')[0];
            var firstOption = OPTIONS[0];
            expect($scope.ngModel).toBe(firstOption.value);
            expect($(selectedOptionElement).text().trim()).toBe(firstOption.label);

            // dropdown.js not working in tests
            //var buttonGroupElement = directiveElement.find('.btn-group');
            //expect(buttonGroupElement.hasClass('open')).toBe(true);
        });

        describe('when dropdown item has focus', function() {
            it('should select item below when down arrow pressed', function() {
                $scope.ngModel = OPTIONS[1].value;
                $scope.$digest();

                var secondLink = directiveElement.find('.active a')[0];
                $(secondLink).focus().trigger(keydownCode(SPECIAL_KEYS.down));

                // Dropdown.js not working in tests
                var thirdLink = directiveElement.find('.active a')[0];
                //expect($scope.ngModel).toBe(OPTIONS[2].value);
                //expect($(thirdLink).text().trim()).toBe(OPTIONS[2].label);
            });
            it('should select item above when up arrow pressed', function() {
                $scope.ngModel = OPTIONS[2].value;
                $scope.$digest();

                var thirdLink = directiveElement.find('.active a')[0];
                $(thirdLink).focus().triggerHandler(keydownCode(SPECIAL_KEYS.up));

                // Dropdown.js not working in tests
                var secondLink = directiveElement.find('.active a')[0];
                //expect($scope.ngModel).toBe(OPTIONS[1].value);
                //expect($(secondLink).text().trim()).toBe(OPTIONS[1].label);
            });
            it('should not select next option when tab presses', function() {
                var firstLink = directiveElement.find('.active a')[0];
                $(firstLink).focus().triggerHandler(keydownCode(SPECIAL_KEYS.down));
                var activeLink = directiveElement.find('.active a')[0];
                // TODO this test is correct, but as dropdown.js not working,
                // not testing much right now
                expect($scope.ngModel).toBe(OPTIONS[0].value);
                expect($(activeLink).text().trim()).toBe('Zero');
            });
            it('should skip next option if header', function() {
                $scope.options = OPTIONS_HEADER;
                $scope.ngModel = 1;
                $scope.$digest();

                var firstLink = directiveElement.find('.active a')[0];
                $(firstLink).focus().triggerHandler(keydownCode(SPECIAL_KEYS.down));
                var activeLink = directiveElement.find('.active a')[0];
                // TODO Dropdown.js not working in tests
                //expect($scope.ngModel).toBe(3);
                //expect($(activeLink).text().trim()).toBe('Three');
            });
            it('should skip next option if disabled', function() {
                $scope.options = OPTIONS_DISABLED;
                $scope.ngModel = 1;
                $scope.$digest();

                var firstLink = directiveElement.find('.active a')[0];
                $(firstLink).focus().triggerHandler(keydownCode(SPECIAL_KEYS.down));
                var activeLink = directiveElement.find('.active a')[0];
                // TODO Dropdown.js not working in tests
                //expect($scope.ngModel).toBe(3);
                //expect($(activeLink).text().trim()).toBe('Three');
            });

        });
    });

    describe('event handlers', function() {
        beforeEach(function() {
            $scope.options = OPTIONS;
            $scope.ngModel = '1';
            $scope.onChange = function(newVale, oldVal) {};
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
        // TODO Fix this
        xit('should trigger ngChange with new and old values', function() {
            spyOn($scope, 'onChange');
            directiveElement.controller('ngModel').$setViewValue('2');
            expect($scope.onChange).toHaveBeenCalledWith('2', '1');
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
        // TODO digest is not updating options, but this works in browser
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
            expect($scope.ngModel).toBe(OPTIONS[0].value);
        });
        it('should move to the last option when up arrow pressed and nothing active', function() {
            $scope.ngModel = '99';
            $scope.$digest();
            filterInput.trigger(keydownCode(SPECIAL_KEYS.up));
            expect($scope.ngModel).toBe(OPTIONS[OPTIONS.length - 1].value);
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

    describe('when selected option has', function() {
        beforeEach(function() {
            $scope.options = OPTIONS_EXTRAS;
            $scope.ngModel = null;
            directiveElement = getCompiledDirectiveElement($scope);
        });
        describe('note text', function() {
            it('should be displayed', function() {
                $scope.ngModel = 'NOTE';
                $scope.$digest();
                var el = directiveElement.find(SELECTED_NOTE_SELECTOR)
                expect(el.length).toBe(1);
            });
            it('should be possible to hide it', function() {
                $scope.ngModel = 'NOTE';
                $scope.hideNote = true;
                $scope.$digest();
                var el = directiveElement.find(SELECTED_NOTE_SELECTOR)
                expect(el.length).toBe(0);
            });
        });
        describe('secondary text', function() {
            it('should be displayed', function() {
                $scope.ngModel = 'SECONDARY';
                $scope.$digest();
                var el = directiveElement.find(SELECTED_SECONDARY_SELECTOR)
                expect(el.length).toBe(1);
            });
            it('should be possible to hide it', function() {
                $scope.ngModel = 'SECONDARY';
                $scope.hideSecondary = true;
                $scope.$digest();
                var el = directiveElement.find(SELECTED_SECONDARY_SELECTOR)
                expect(el.length).toBe(0);
            });
        });
        describe('icon', function() {
            it('should be displayed', function() {
                $scope.ngModel = 'ICON';
                $scope.$digest();
                var el = directiveElement.find(SELECTED_ICON_SELECTOR)
                expect(el.length).toBe(1);

            });
            it('should be possible to hide it', function() {
                $scope.ngModel = 'ICON';
                $scope.hideIcon = true;
                $scope.$digest();
                var el = directiveElement.find(SELECTED_ICON_SELECTOR)
                expect(el.length).toBe(0);
            });
        });
        describe('currency flag', function() {
            it('should be displayed', function() {
                $scope.ngModel = 'CURRENCY_FLAG';
                $scope.$digest();
                var el = directiveElement.find(SELECTED_CURRENCY_FLAG_SELECTOR)
                expect(el.length).toBe(1);

            });
            it('should be possible to hide it', function() {
                $scope.ngModel = 'CURRENCY_FLAG';
                $scope.hideCurrency = true;
                $scope.$digest();
                var el = directiveElement.find(SELECTED_CURRENCY_FLAG_SELECTOR)
                expect(el.length).toBe(0);
            });
        });
        describe('circle icon', function() {
            it('should be displayed', function() {
                $scope.ngModel = 'CIRCLE_ICON';
                $scope.$digest();
                var el = directiveElement.find(SELECTED_CIRCLE_SELECTOR)
                expect(el.length).toBe(1);
            });
            it('should be possible to hide it', function() {
                $scope.ngModel = 'CIRCLE_ICON';
                $scope.hideCircle = true;
                $scope.$digest();
                var el = directiveElement.find(SELECTED_CIRCLE_SELECTOR)
                expect(el.length).toBe(0);
            });
        });
        describe('circle image', function() {
            it('should be displayed', function() {
                $scope.ngModel = 'CIRCLE_IMAGE';
                $scope.$digest();
                var el = directiveElement.find(SELECTED_CIRCLE_SELECTOR)
                expect(el.length).toBe(1);
            });
            it('should be possible to hide it', function() {
                $scope.ngModel = 'CIRCLE_IMAGE';
                $scope.hideCircle = true;
                $scope.$digest();
                var el = directiveElement.find(SELECTED_CIRCLE_SELECTOR)
                expect(el.length).toBe(0);
            });
        });
        describe('circle text', function() {
            it('should be displayed', function() {
                $scope.ngModel = 'CIRCLE_TEXT';
                $scope.$digest();
                var el = directiveElement.find(SELECTED_CIRCLE_SELECTOR)
                expect(el.length).toBe(1);
            });
            it('should be possible to hide it', function() {
                $scope.ngModel = 'CIRCLE_TEXT';
                $scope.hideCircle = true;
                $scope.$digest();
                var el = directiveElement.find(SELECTED_CIRCLE_SELECTOR)
                expect(el.length).toBe(0);
            });
        });
    });

    describe('when special options are supplied', function() {
        beforeEach(function() {
            $scope.options = OPTIONS_EXTRAS;
            $scope.ngModel = null;
            directiveElement = getCompiledDirectiveElement($scope);
        });
        it('should show note text', function() {
            var el = directiveElement.find(OPTION_NOTE_SELECTOR)
            expect(el.length).toBe(1);
        });
        it('should show secondary text', function() {
            var el = directiveElement.find(OPTION_SECONDARY_SELECTOR)
            expect(el.length).toBe(1);
        });
        it('should show currency flag', function() {
            var el = directiveElement.find(OPTION_CURRENCY_FLAG_SELECTOR)
            expect(el.length).toBe(1);
        });
        it('should show icon', function() {
            var el = directiveElement.find(OPTION_ICON_SELECTOR)
            expect(el.length).toBe(1);
        });
        it('should show circle image', function() {
            var el = directiveElement.find(OPTION_CIRCLE_IMAGE_SELECTOR)
            expect(el.length).toBe(1);
        });
        it('should show circle text', function() {
            var el = directiveElement.find(OPTION_CIRCLE_TEXT_SELECTOR)
            expect(el.length).toBe(1);
        });
        it('should show circle icon', function() {
            var el = directiveElement.find(OPTION_CIRCLE_ICON_SELECTOR)
            expect(el.length).toBe(1);
        });
        it('should show disabled option', function() {
            var el = directiveElement.find(OPTION_DISABLED_SELECTOR)
            expect(el.length).toBe(1);
        });

    });

    describe('when visual configuration is supplied', function() {
        beforeEach(function() {
            $scope.options = OPTIONS;
            $scope.ngModel = null;
            directiveElement = getCompiledDirectiveElement($scope);
        });
        it('should show small selct', function() {
            $scope.size = 'sm';
            $scope.$digest();
            var el = directiveElement.find('.btn-sm')
            expect(el.length).toBe(1);
        });
        it('should show large select', function() {
            $scope.size = 'lg';
            $scope.$digest();
            var el = directiveElement.find('.btn-lg')
            expect(el.length).toBe(1);
        });
        it('should show inverse select', function() {
            $scope.inverse = true;
            $scope.$digest();
            var el = directiveElement.find('.btn-input-inverse')
            expect(el.length).toBe(1);
        });

        it('should dropdown right aligned on xs small screens and wider', function() {
            $scope.dropdownRight = 'xs';
            $scope.$digest();
            var el = directiveElement.find('.dropdown-menu-xs-right')
            expect(el.length).toBe(1);
        });
        it('should dropdown right aligned on sm small screens and wider', function() {
            $scope.dropdownRight = 'sm';
            $scope.$digest();
            var el = directiveElement.find('.dropdown-menu-sm-right')
            expect(el.length).toBe(1);
        });
        it('should dropdown right aligned on md small screens and wider', function() {
            $scope.dropdownRight = 'md';
            $scope.$digest();
            var el = directiveElement.find('.dropdown-menu-md-right')
            expect(el.length).toBe(1);
        });
        it('should dropdown right aligned on lg small screens and wider', function() {
            $scope.dropdownRight = 'lg';
            $scope.$digest();
            var el = directiveElement.find('.dropdown-menu-lg-right')
            expect(el.length).toBe(1);
        });
        it('should dropdown right aligned on xl small screens and wider', function() {
            $scope.dropdownRight = 'xl';
            $scope.$digest();
            var el = directiveElement.find('.dropdown-menu-xl-right')
            expect(el.length).toBe(1);
        });

        it('should show sm dropdown width', function() {
            $scope.dropdownWidth = 'sm';
            $scope.$digest();
            var el = directiveElement.find('.dropdown-menu-sm')
            expect(el.length).toBe(1);
        });
        it('should show md dropdown width', function() {
            $scope.dropdownWidth = 'md';
            $scope.$digest();
            var el = directiveElement.find('.dropdown-menu-md')
            expect(el.length).toBe(1);
        });
        it('should show lg dropdown width', function() {
            $scope.dropdownWidth = 'lg';
            $scope.$digest();
            var el = directiveElement.find('.dropdown-menu-lg')
            expect(el.length).toBe(1);
        });
    });

	describe('filter duplicates', function() {
		var filterInput;
		beforeEach(function () {
			$scope.options = [{
				value: '0',
				label: 'Abel'
			},{
				value: '1',
				label: 'Cain'
			},{
			    value: '1',
                label: 'Cain'
            }];
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

		it('should show one result, removing dupliactes', function() {
			filterInput.val("ca").trigger('change');
			var options = directiveElement.find(LIST_ITEMS_SELECTOR)
			expect(options.length).toBe(1);
			expect(optionText(options[0])).toBe('Cain');
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
                    ng-required='ngRequired' \
                    size='{{size}}' \
                    dropdown-right='{{dropdownRight}}' \
                    dropdown-width='{{dropdownWidth}}' \
                    inverse='inverse' \
                    hide-note='hideNote' \
                    hide-secondary='hideSecondary' \
                    hide-icon='hideIcon' \
                    hide-currency='hideCurrency' \
                    hide-circle='hideCircle'> \
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
        return: 13,
        tab: 9
    }

    var OPTIONS = [{
        value: '0',
        label: 'Zero'
    },{
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
        value: 0,
        label: 'Zero'
    },{
        value: 1,
        label: 'One'
    },{
        value: 2,
        label: 'Two'
    },{
        value: 3,
        label: 'Three'
    }];

    var OPTIONS_OBJECTS = [{
        value: {id: 1},
        label: 'One'
    },{
        value: {id: 2},
        label: 'Two'
    },{
        value: {id: 3},
        label: 'Three'
    }];

    var OPTIONS_DISABLED = [{
        value: 1,
        label: 'One'
    },{
        value: 2,
        label: 'Two',
        disabled: true
    },{
        value: 3,
        label: 'Three'
    }];

    var OPTIONS_HEADER = [{
        value: 1,
        label: 'One'
    },{
        header: 'Header'
    },{
        value: 3,
        label: 'Three'
    }];


    var OPTIONS_EXTRAS = [{
        header: "header"
    },{
        value: 'NOTE',
        label: 'Note text',
        note: 'Note text'
    },{
        value: 'DISABLED',
        label: 'Disabled',
        disabled: true
    },{
        value: 'SECONDARY',
        label: 'Secondary text',
        secondary: "Secondary text"
    },{
        value: "ICON",
        label: 'Icon',
        icon: "bank"
    },{
        value: "CURRENCY_FLAG",
        label: 'Currency flag',
        currency: "USD"
    },{
        value: "CIRCLE_IMAGE",
        label: 'Circle image',
        circleImage: "images/mike.jpg"
    },{
        value: "CIRCLE_ICON",
        label: 'Circle icon',
        circleIcon: "bank"
    },{
        value: "CIRCLE_TEXT",
        label: 'Circle text',
        circleText: "AZ"
    },{
        value: "SEARCHABLE",
        label: "Unrelated",
        searchable: "Searchable"
    }];
});
