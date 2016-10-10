'use strict';

describe('Directive: TwDynamicForm', function() {
    var $compile,
        $rootScope,
        $scope,
        directiveElement;

    var MODEL = getModel();
    var REQUIREMENTS = getRequirements();

    beforeEach(module('tw.form-components'));

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
        $scope = $rootScope.$new();
    }));

    describe('init', function() {
        describe('basics', function() {
            beforeEach(function() {
                $scope.model = MODEL;
                $scope.requirements = REQUIREMENTS
                directiveElement = getCompiledDirectiveElement();
            });

            it('shows tab navigation if there are multiple requirements', function() {
                var navWrapper = directiveElement.find('.nav.nav-tabs');
                var navTabs = navWrapper.find('li');
                expect(navWrapper.length).toBe(1);
                expect(navTabs.length).toBe(REQUIREMENTS.length);
            });

            it('shows an active tab', function() {
                var navWrapper = directiveElement.find('.nav.nav-tabs');
                var activeTab = navWrapper.find('li.active');
                expect(activeTab.length).toBe(1);

                var tabText = activeTab.find('a').text();
                expect(tabText.trim()).toBe('iban');
            });


        });
    });

    function getCompiledDirectiveElement() {
        var template = "<tw-dynamic-form model='model' requirements='requirements'></tw-dynamic-form-control>"
        var compiledElement = $compile(template)($scope);

        $scope.$digest();
        //console.log(compiledElement);
        return compiledElement;
    }

    function getModel() {
        return {
            type: "iban",
            legalType: "PRIVATE",
            IBAN: "ee1001010101010101",
            BIC: "3676543456"
        }
    }

    function getRequirements () {
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
                    ]
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
