'use strict';

describe('RequirementsForm', function() {
  var $compile,
    $rootScope,
    $scope,
    component;

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
      component = getComponent($scope);
    });

    describe('in tab navigation', function() {
      var navWrapper, navTabs;

      beforeEach(function() {
        navWrapper = component.querySelector('.nav.nav-tabs');
        navTabs = navWrapper.querySelectorAll('li');
      });

      it('shows a tab for every requirement', function() {
        expect(navWrapper).toBeTruthy();
        expect(navTabs.length).toBe($scope.requirements.length);
      });

      it('should use label as tab name', function() {
        var tab = navTabs[0];
        expect(tab.innerText.trim()).toBe($scope.requirements[0].label);
      });

      it('adds an active class to a tab if the model type matches the requirement type', function() {
        for (var i = 0; i < $scope.requirements.length; i++) {
          var tab = navTabs[i];
          if ($scope.model.type === $scope.requirements[i].type) {
            expect(tab.classList).toContain('active');
          } else {
            expect(tab.classList).not.toContain('active');
          }
        }
      });
    });

    describe('in the content area', function() {
      var activePane, ibanFields, formGroups;

      beforeEach(function() {
        activePane = component.querySelector('.tab-content .tab-pane.active');
        ibanFields = $scope.requirements[1].properties;
      });

      it('has an active pane', function() {
        expect(activePane).toBeTruthy();
      });

      it('has a description paragraph', function() {
        var paragraph = activePane.querySelector('p');
        expect(paragraph.innerText.trim()).toBe($scope.requirements[1].description);
      });

      it('has a tw-fieldset for the fields', function() {
        var fieldset = activePane.querySelector('tw-fieldset');
        expect(fieldset).toBeTruthy();
      });
    });
  });

  describe('when the model is valid', function() {
    beforeEach(function() {
      $scope.model = {
        type: 'sort_code',
        legalType: 'PRIVATE',
        sortCode: '101010',
        accountNumber: '12345678'
      }
      $scope.requirements = getMultipleRequirements();
      $scope.isValid = null;
      component = getComponent($scope);
    });

    it('should set isValid true', function() {
      expect($scope.isValid).toBe(true);
    });
  });
  describe('when the model is invalid', function() {
    beforeEach(function() {
      $scope.model = {
        type: 'sort_code',
        legalType: 'PRIVATE'
      }
      $scope.requirements = getMultipleRequirements();
      $scope.isValid = null;
      component = getComponent($scope);
    });

    it('should set isValid false', function() {
      expect($scope.isValid).toBe(false);
    });
  });

  function getComponent($scope) {
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
    return compiledElement[0];
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
        "properties": {
          "legalType": {
            "title": "Legal type",
            "type": "string",
            "required": true,
            "values": [
              {
                "value": "PRIVATE",
                "label": "Private"
              },
              {
                "value": "BUSINESS",
                "label": "Business"
              }
            ]
          },
          "sortCode": {
            "title": "UK Sort code",
            "type": "string",
            "required": true,
            "displayFormat": "**-**-**",
            "placeholder": "40-30-20",
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
          },
          "accountNumber": {
            "title": "Account number",
            "type": "string",
            "required": true,
            "placeholder": "12345678",
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
        }
      },
      {
        "type": "iban_With_unDerscOres",
        "description": "IBAN description",
        "properties": {
          "legalType": {
            "title": "Legal type",
            "type": "string",
            "required": true,
            "values": [
              {
                "value": "PRIVATE",
                "label": "Private"
              },
              {
                "value": "BUSINESS",
                "label": "Business"
              }
            ],
            "helpText": "I am a nice tooltip that was created by fingers pressing buttons"
          },
          "IBAN": {
            "title": "IBAN",
            "type": "text",
            "required": true,
            "displayFormat": "**** **** **** **** **** **** **** ****",
            "placeholder": "GB89370400440532013000",
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
          },
          "BIC": {
            "title": "Bank code (BIC/SWIFT)",
            "type": "string",
            "placeholder": "ABCDDE22 (Optional)",
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
            }
          }
        }
      }
    ];
  }
});
