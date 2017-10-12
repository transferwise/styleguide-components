'use strict';

describe('Fieldset', function() {
  var $compile,
      $rootScope,
      $scope,
      directiveElement;

  beforeEach(module('tw.styleguide-components'));

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
    $scope = $rootScope.$new();
    $scope.onRefreshRequirements = function () {}
  }));

  describe('validation', function() {
    beforeEach(function() {
      $scope.model = {
        type: 'sort_code',
        sortCode: '101010'
      };
      $scope.fields = getRequirement()[0].fields;
      $scope.isValid = null;
      $scope.errorMessages = {
          sortCode: "Sort code not found"
      };
      directiveElement = getCompiledDirectiveElement();
    });
    it('should show supplied error message on the correct field', function() {
      var errorBlock = directiveElement.find('.tw-form-group-sortCode .error-provided');
      expect(errorBlock.text().trim()).toBe($scope.errorMessages.sortCode);
    });
    it('should remove supplied error message from the correct field onChange event', function() {
      var input = directiveElement.find('input');
      input.val('1010102').triggerHandler('input');

      var errorBlock = directiveElement.find('.tw-form-group-sortCode .error-provided');
      expect(errorBlock.text().trim()).not.toBeTruthy();
    });
    it('should remove supplied error message from the correct field onBlur event', function() {
      var formControl = directiveElement.find('.form-control');
      formControl.trigger('blur');

      var errorBlock = directiveElement.find('.tw-form-group-sortCode .error-provided');
      expect(errorBlock.text().trim()).toBe('');
    });
  });

  describe('onRefreshRequirements', function() {
    beforeEach(function() {
      $scope.fields = getRequirement()[0].fields;
      directiveElement = getCompiledDirectiveElement();
      spyOn($scope, 'onRefreshRequirements');
    });

    it('should be triggered onBlur', function() {
      var formControl = directiveElement.find('.form-control');
      formControl.trigger('blur');

      expect($scope.onRefreshRequirements).toHaveBeenCalled()
    });
  });

  describe('validationMessages', function() {
    beforeEach(function() {
      $scope.fields = getRequirement()[0].fields;
      $scope.validationMessages = {
        required: 'default required'
      };
      directiveElement = getCompiledDirectiveElement();
    });

    it('should contain custom messages', function() {
      var requiredErrorSortCode = directiveElement.find('.tw-form-group-sortCode .error-messages .error-required');
      var requiredErrorIBAN = directiveElement.find('.tw-form-group-iban .error-messages .error-required');

      expect(requiredErrorSortCode.text()).toContain('sortCode required');
      expect(requiredErrorIBAN.text()).toContain('default required');
    });
  });

  function getCompiledDirectiveElement() {
    var template = " \
      <tw-fieldset \
        model='model' \
        fields='fields' \
        validation-messages='validationMessages' \
        error-messages='errorMessages' \
        on-refresh-requirements='onRefreshRequirements()' \
        is-valid='isValid'> \
      </tw-fieldset>";
    var compiledElement = $compile(template)($scope);

    $scope.$digest();
    return compiledElement;
  }


  function getRequirement() {
    return [
      {
        "type": "sort_code",
        "label": "Use sort code",
        "fields": [
          {
            "name": "UK Sort code",
            "group": [
              {
                "key": "sortCode",
                "type": "text",
                "refreshRequirementsOnChange": true,
                "required": true,
                "displayFormat": "**-**-**",
                "example": "40-30-20",
                "minLength": 6,
                "maxLength": 8,
                "validationRegexp": null,
                "valuesAllowed": null,
                "validationMessages": {
                  "required": "sortCode required"
                }
              }
            ]
          },
          {
            "name": "IBAN",
            "group": [
              {
                "key": "iban",
                "type": "text",
                "refreshRequirementsOnChange": true,
                "required": true,
                "displayFormat": "**-**-**",
                "example": "40-30-20",
                "minLength": 6,
                "maxLength": 8,
                "validationRegexp": null,
                "valuesAllowed": null
              }
            ]
          }
        ]
      }
    ];
  }
});
