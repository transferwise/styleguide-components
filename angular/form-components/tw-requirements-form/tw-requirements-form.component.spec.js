'use strict';

describe('Directive: TwRequirementsForm', function() {
  var $compile,
    $rootScope,
    $scope,
    directiveElement;

  beforeEach(module('tw.styleguide-components'));

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
    it('should show error state on the field associated with supplied error key', function() {
      var sortFormGroup = directiveElement.find('.tw-form-group-sortCode');
      expect(sortFormGroup.hasClass('has-error')).toBe(true);
    });
    it('should not show error state on other fields', function() {
      expect(directiveElement.find('.has-error').length).toBe(1);
    });
    it('should show supplied error message on the correct field', function() {
      var errorBlock =
        directiveElement.find('.tw-form-group-sortCode .error-provided');
      expect(errorBlock.text().trim()).toBe($scope.errorMessages.sortCode);
    });
    it('should not show provided errors on other fields', function() {
      expect(directiveElement.find('.error-provided').length).toBe(1);
    });
    it('should set isValid false if not all fields are valid', function() {
      expect($scope.isValid).toBe(false);
    });
    it('should set isValid true when all fields are valid', function() {
      var accountNumberInput = directiveElement.find('.tw-form-group-accountNumber input');
      accountNumberInput.val('12345677').trigger('input');
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
