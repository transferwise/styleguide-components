'use strict';

describe('RequirementsForm', function() {
  var $compile,
    $rootScope,
    $scope,
    directiveElement;

  beforeEach(module('tw.styleguide.forms'));
  beforeEach(module('tw.styleguide.navigation'));
  beforeEach(module('tw.styleguide.services'));

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

      it('should use label as tab name if there is one', function() {
        var tab = navTabs.eq(0);
        expect(tab.text().trim()).toBe($scope.requirements[0].label);
      });
      it('should use (formatted) type name as tab name if there no label', function() {
        var tab = navTabs.eq(0);
        tab = navTabs.eq(1);
        expect(tab.text().trim()).toBe('Iban with underscores');
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

            var tooltipElement = fieldElement.find('.alert-focus');
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

  describe('validation', function() {
    beforeEach(function() {
      $scope.model = {
        type: 'sort_code',
        sortCode: '101010'
      }
      $scope.requirements = getMultipleRequirements();
      $scope.isValid = null;
      $scope.errorMessages = {
        sortCode: "Sort code not found"
      }
      directiveElement = getCompiledDirectiveElement();
    });

    it('should set isValid false if not all fields are valid', function() {
      expect($scope.isValid).toBe(false);
    });
    it('should set isValid true when all fields are valid', function() {
      var accountNumberInput = directiveElement.find('.tw-field-accountNumber input')[0];
      accountNumberInput.value = '12345678';
      accountNumberInput.dispatchEvent(new Event('input'));
      expect($scope.isValid).toBe(true);
    });
  });

  function getCompiledDirectiveElement() {
    var template = " \
      <tw-requirements-form \
        model='model' \
        requirements='requirements' \
        validation-messages='validationMessages' \
        error-messages='errorMessages' \
        is-valid='isValid'> \
      </tw-requirements-form>";
    var compiledElement = $compile(template)($scope);

    $scope.$digest();
    return compiledElement;
  }

  function getMultipleRequirementsModel() {
    return {
      type: "iban_With_unDerscOres",
      legalType: "PRIVATE",
      IBAN: "ee1001010101010101",
      BIC: "3676543456"
    }
  }

  function getMultipleRequirements() {
    return [
      {
        "type": "sort_code",
        "label": "Use sort code",
        "fields": [
          {
            "name": "Legal type",
            "group": [
              {
                "key": "legalType",
                "type": "select",
                "refreshRequirementsOnChange": false,
                "required": true,
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
                "validationAsync": {
                  "url": "https://api.transferwise.com/v1/validators/sort-code",
                  "params": [
                    {
                      "key": "sortCode",
                      "parameterName": "sortCode",
                      "required": true
                    }
                  ]
                }
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
                "example": "12345678",
                "minLength": 8,
                "maxLength": 8,
                "validationRegexp": "^[0-9]{8}$",
                "validationAsync": {
                  "url": "https://api.transferwise.com/v1/validators/sort-code-account-number",
                  "params": [
                    {
                      "key": "accountNumber",
                      "parameterName": "accountNumber",
                      "required": true
                    }
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        "type": "iban_With_unDerscOres",
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
                "validationAsync": {
                  "url": "https://api.transferwise.com/v1/validators/iban",
                  "params": [
                    {
                      "key": "iban",
                      "parameterName": "iban",
                      "required": true
                    }
                  ]
                }
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
                "example": "ABCDDE22 (Optional)",
                "validationRegexp": "^[A-Z]{6}[A-Z,0-9]{2}([A-Z,0-9]{3})?$",
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
