'use strict';

fdescribe('Directive: TwDynamicForm', function() {
    var $compile,
        $rootScope,
        $scope,
        directiveElement;

    beforeEach(module('tw.form-components'));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
        $scope = $rootScope.$new();
    }));

    describe('with multiple requirements', function() {
        var MODEL = getMultipleRequirementsModel();
        var REQUIREMENTS = getMultipleRequirements();
        
        beforeEach(function() {
            $scope.model = MODEL;
            $scope.requirements = REQUIREMENTS
            directiveElement = getCompiledDirectiveElement();
        });

        describe('in tab navigation', function() {
            it('shows a tab for every requirement', function() {
                var navWrapper = directiveElement.find('.nav.nav-tabs');
                var navTabs = navWrapper.find('li');
                expect(navWrapper.length).toBe(1);
                expect(navTabs.length).toBe(REQUIREMENTS.length);

                for (var i = 0; i < REQUIREMENTS.length; i++) {
                    var tab = navTabs.eq(i);
                    expect(tab.text().trim()).toBe(REQUIREMENTS[i].type);
                }
            });

            it('shows second tab as active due to the model', function() {
                var navWrapper = directiveElement.find('.nav.nav-tabs');
                var navTabs = navWrapper.find('li');
                var activeTab = navTabs.eq(1);

                expect(activeTab.hasClass('active')).toBe(true);
            });
        }); 

        describe('in the content area', function() {
            var activePane, formGroups;
            var ibanFields = REQUIREMENTS[1].fields;

            beforeEach(function() {
                activePane = directiveElement.find('.tab-content .tab-pane.active');
            });

            it('has an active pane', function() {
                expect(activePane.length).toBe(1);
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
        var template = "<tw-dynamic-form model='model' requirements='requirements'></tw-dynamic-form-control>"
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
