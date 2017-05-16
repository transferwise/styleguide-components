'use strict';

describe('Directive: TwRequirementsForm', function() {
    var $compile,
        $rootScope,
        $scope,
        directiveElement,
        MODEL,
        REQUIREMENTS;

    beforeEach(module('tw.form-components'));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
        $scope = $rootScope.$new();
    }));

    describe('with multiple requirements', function() {
        beforeEach(function() {
            $scope.model = getMultipleRequirementsModel();
            $scope.requirements = getMultipleRequirements();
            directiveElement = getCompiledDirectiveElement();
        });

        describe('in tab navigation', function() {
            var navWrapper, navTabs;

            beforeEach(function() {
                navWrapper = directiveElement.find('.nav.nav-tabs');
                navTabs = navWrapper.find('li');
            });

            it('shows a tab for every requirement', function() {
                expect(navWrapper.length).toBe(1);
                expect(navTabs.length).toBe($scope.requirements.length);
            });

            it('use label as tab name if there is one', function() {
                expect(navWrapper.length).toBe(1);
                expect(navTabs.length).toBe($scope.requirements.length);

                var label = "tab label";

                var type1 = "Unused type";
                var type2 = "Used type";

                $scope.requirements[0].label = label;
                $scope.requirements[0].type = type1;
                $scope.requirements[1].type = type2;
                $scope.$digest();


                var tab = navTabs.eq(0);
                expect(tab.text().trim()).toBe(label);
                tab = navTabs.eq(1);
                expect(tab.text().trim()).toBe(type2);
            });

            it('formats the tab names correctly', function() {
                expect(navWrapper.length).toBe(1);
                expect(navTabs.length).toBe($scope.requirements.length);

                var testObjects = [
                    {
                      first: 'words_with_underscores',
                      firstResult: 'Words with underscores',
                      second: 'two_words',
                      secondResult: 'Two words'
                    },
                    {
                      first: 'woRds_With_underscores',
                      firstResult: 'Words with underscores',
                      second: 'two words',
                      secondResult: 'Two words'
                    },
                    {
                      first: '',
                      firstResult: '',
                      second: '_',
                      secondResult: ''
                    },
                ];

                testObjects.forEach(function(testObject) {
                    $scope.requirements[0].type = testObject.first;
                    $scope.requirements[1].type = testObject.second;

                    var expectedResults = [testObject.firstResult, testObject.secondResult];
                    $scope.$digest();

                    for (var i = 0; i < $scope.requirements.length; i++) {
                        var tab = navTabs.eq(i);
                        expect(tab.text().trim()).toBe(expectedResults[i]);
                    }
                });
            });

            it('adds an active class to a tab if the model type matches the requirement type', function() {
                for (var i = 0; i < $scope.requirements.length; i++) {
                    var tab = navTabs.eq(i);
                    if ($scope.model.type === $scope.requirements[i].type) {
                        expect(tab.hasClass('active')).toBe(true);
                    } else {
                        expect(tab.hasClass('active')).toBe(false);
                    }
                }


            });
        });

        describe('in the content area', function() {
            var activePane, ibanFields, formGroups;

            beforeEach(function() {
                activePane = directiveElement.find('.tab-content .tab-pane.active');
                ibanFields = $scope.requirements[1].fields;
            });

            it('has an active pane', function() {
                expect(activePane.length).toBe(1);
            });

            it('has a description paragraph', function() {
              var paragraph = activePane.find('p');
              expect(paragraph.text().trim()).toBe($scope.requirements[1].description);
            });

            describe('for form groups', function() {
                beforeEach(function() {
                    formGroups = activePane.find('.form-group');
                });

                it('shows one for every requirement field', function() {
                    expect(formGroups.length).toBe(ibanFields.length);
                });

                it ('shows labels in each group from requirements', function() {
                     for (var i = 0; i < ibanFields.length; i++) {
                        var ibanField = ibanFields[i];
                        var fieldElement = formGroups.eq(i);
                        expect(fieldElement.length).toBe(1);

                        var fieldLabel = fieldElement.find('label');
                        expect(fieldLabel.text().trim()).toBe(ibanField.name);
                    }
                });

                it('shows a tooltip if the field has it', function() {
                     for (var i = 0; i < ibanFields.length; i++) {
                        var ibanField = ibanFields[i];
                        var fieldElement = formGroups.eq(i);
                        expect(fieldElement.length).toBe(1);

                        var tooltipElement = fieldElement.find('.help-block');
                        if (ibanField.group[0].tooltip) {
                            expect(tooltipElement.length).toBe(1);
                        } else {
                            expect(tooltipElement.length).toBe(0);
                        }
                    }
                });
            });
        });


    });

    function getCompiledDirectiveElement() {
        var template = "<tw-requirements-form model='model' requirements='requirements'></tw-requirements-form>"
        var compiledElement = $compile(template)($scope);

        $scope.$digest();
        return compiledElement;
    }

    function getMultipleRequirementsModel() {
        return {
            type: "iban",
            legalType: "PRIVATE",
            IBAN: "ee1001010101010101",
            BIC: "3676543456"
        }
    }

    function getMultipleRequirements() {
        return [
          {
            "type": "sort_code",
            "fields": [
              {
                "name": "Legal type",
                "group": [
                  {
                    "key": "legalType",
                    "type": "select",
                    "refreshRequirementsOnChange": false,
                    "required": true,
                    "displayFormat": null,
                    "example": "",
                    "minLength": null,
                    "maxLength": null,
                    "validationRegexp": null,
                    "validationAsync": null,
                    "valuesAllowed": [
                      {
                        "key": "PRIVATE",
                        "name": "Private"
                      },
                      {
                        "key": "BUSINESS",
                        "name": "Business"
                      }
                    ]
                  }
                ]
              },
              {
                "name": "UK Sort code",
                "group": [
                  {
                    "key": "sortCode",
                    "type": "text",
                    "refreshRequirementsOnChange": false,
                    "required": true,
                    "displayFormat": "**-**-**",
                    "example": "40-30-20",
                    "minLength": 6,
                    "maxLength": 8,
                    "validationRegexp": null,
                    "validationAsync": {
                      "url": "https://api.transferwise.com/v1/validators/sort-code",
                      "params": [
                        {
                          "key": "sortCode",
                          "parameterName": "sortCode",
                          "required": true
                        }
                      ]
                    },
                    "valuesAllowed": null
                  }
                ]
              },
              {
                "name": "Account number",
                "group": [
                  {
                    "key": "accountNumber",
                    "type": "text",
                    "refreshRequirementsOnChange": false,
                    "required": true,
                    "displayFormat": null,
                    "example": "12345678",
                    "minLength": 8,
                    "maxLength": 8,
                    "validationRegexp": "[0-9]{8}",
                    "validationAsync": {
                      "url": "https://api.transferwise.com/v1/validators/sort-code-account-number",
                      "params": [
                        {
                          "key": "accountNumber",
                          "parameterName": "accountNumber",
                          "required": true
                        }
                      ]
                    },
                    "valuesAllowed": null
                  }
                ]
              }
            ]
          },
          {
            "type": "iban",
            "description": "IBAN description",
            "fields": [
              {
                "name": "Legal type",
                "group": [
                  {
                    "key": "legalType",
                    "type": "select",
                    "refreshRequirementsOnChange": false,
                    "required": true,
                    "displayFormat": null,
                    "example": "",
                    "minLength": null,
                    "maxLength": null,
                    "validationRegexp": null,
                    "validationAsync": null,
                    "valuesAllowed": [
                      {
                        "key": "PRIVATE",
                        "name": "Private"
                      },
                      {
                        "key": "BUSINESS",
                        "name": "Business"
                      }
                    ],
                    "tooltip": "I am a nice tooltip that was created by fingers pressing buttons"
                  }
                ]
              },
              {
                "name": "IBAN",
                "group": [
                  {
                    "key": "IBAN",
                    "type": "text",
                    "refreshRequirementsOnChange": false,
                    "required": true,
                    "displayFormat": "**** **** **** **** **** **** **** ****",
                    "example": "GB89370400440532013000",
                    "minLength": 2,
                    "maxLength": null,
                    "validationRegexp": null,
                    "validationAsync": {
                      "url": "https://api.transferwise.com/v1/validators/iban",
                      "params": [
                        {
                          "key": "iban",
                          "parameterName": "iban",
                          "required": true
                        }
                      ]
                    },
                    "valuesAllowed": null
                  }
                ]
              },
              {
                "name": "Bank code (BIC/SWIFT)",
                "group": [
                  {
                    "key": "BIC",
                    "type": "text",
                    "refreshRequirementsOnChange": false,
                    "required": false,
                    "displayFormat": null,
                    "example": "ABCDDE22 (Optional)",
                    "minLength": null,
                    "maxLength": null,
                    "validationRegexp": "[A-Z]",
                    "validationAsync": {
                      "url": "https://api.transferwise.com/v1/validators/bic",
                      "params": [
                        {
                          "key": "iban",
                          "parameterName": "iban",
                          "required": true
                        },
                        {
                          "key": "bic",
                          "parameterName": "bic",
                          "required": true
                        }
                      ]
                    },
                    "valuesAllowed": null
                  }
                ]
              }
            ]
          }
        ];
    }
});
